"use strict";

import Item from './item';
declare let require: any;
declare let __dirname: any;

const MAX_ROWS = 50;

let fs = require('fs');
let path = require('path');
let bodyParser = require('body-parser');
let sqlite3 = require('sqlite3').verbose();
let express = require('express');
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static(path.join(__dirname, 'public')));

let db = new sqlite3.Database('leases');
let lastUseIdx = 0;
let mostUsed = 0;

// Log what the current last use index is
let logLastUseIdx = () => {
    console.log("Current Last Use Index: " + lastUseIdx);
};

// Return a set of relations that contain the given lease number in either of the columns
let getRelationsForLease = function (lease, limit, callback) {
    db.all(
        "SELECT * FROM relation WHERE first = $query OR second = $query ORDER BY count DESC LIMIT $limit",
        {
            $query: lease,
            $limit: limit
        },
        function (err, rows) {
            if (err) {
                console.log(err);
            }
            else {
                callback(rows);
            }
        }
    );
};

// API: Receive a list of leases, return a list of most related leases
app.get('/getRelated', function (req, res) {
    if (!req.query.list) {
        res.json([]);
    }
    let ret = [];
    let finalists = [];
    let rem = req.query.list.length;
    let limit = req.query.limit || MAX_ROWS;
    let acceptList = req.query.list;

    console.log("list: ", req.query.list);

    // For each lease supplied...
    acceptList.forEach(function (accept) {

        // Get n relations, sorted by most frequently related
        getRelationsForLease(accept, limit, function (rows) {

            // For each relation to the lease...
            rows.forEach(function (row) {

                // Get the related lease number
                let relatedLease = (accept === row.first) ? row.second : row.first;
                let existingFinalist = finalists.find((lease) => {
                    return lease.number === relatedLease
                });

                // If the related lease is not in the finalists already, add it with the relation count
                if (!existingFinalist) {
                    finalists.push({
                        number: relatedLease,
                        numRelations: row.count,
                    });
                }

                // Otherwise, the related lease is found in the finalists, so just increment its count
                else {
                    existingFinalist.numRelations += row.count;
                }
            });

            console.log("finalists after each loop: ", finalists);

            // When there are no more leases to process...
            if (!--rem) {

                // If there were no relations
                if (!finalists.length) {
                    console.log("no related leases. returning: ", ret);
                    res.json(ret);
                    return;
                }

                // Filter out the already accepted leases from the finalists
                finalists = finalists.filter(function (finalist) {
                    return !acceptList.some((accept) => {
                        return finalist.number === accept;
                    });

                    // and truncates to {limit} finalists
                }).slice(0, limit + 1);

                console.log("finalists after processing: ", finalists);

                // Get a list of lease objects from the finalists
                let omissions = req.body.omissions || [];
                let omitStr = omissions.map(() => '?').join(',');
                rem = finalists.length;
                finalists.forEach((el) => {
                    let params = [el.number].concat(omissions);
                    db.get("SELECT * FROM lease WHERE number = ? AND number NOT IN (" + omitStr + ")", params, function (err, item) {
                        if (item) {
                            ret.push(new Item(item.name, item.totalUses, item.lastUseIdx, el.numRelations));
                        }
                        if (!--rem) {
                            res.json(ret);
                            return;
                        }
                    });
                });
            }
        });
    });
});

// API: Get top {limit} of the most used leases
app.get('/getLeases', function (req, res) {
    let omissions = req.query.omissions || [];
    let limit = parseInt(req.query.limit) || MAX_ROWS;

    let finish = function (results) {
        let response: Item[] = [];
        results.forEach((el)=>{
            response.push(new Item(el.name, el.totalUses, el.lastUseIdx));
        });
        res.json(response);
    };

    let omitPlaceholders = omissions.map(() => '?').join(',');
    let SQLparams = omissions.concat([
        '%' + (req.query.filterText || "") + '%',
        limit
    ]);

    db.all("SELECT * FROM lease WHERE number NOT IN (" + omitPlaceholders + ") AND number LIKE ? ORDER BY count DESC LIMIT ?",
        SQLparams,
        function (err, mostRows) {
            if (err) {
                console.log(err);
                return;
            }

            // If the result is less than the limit, we know that there are no more matches, can return as is.
            if (mostRows.length < limit) {
                finish(mostRows);
                return;
            }
            else {
                // Append ommissions with new data
                omissions = omissions.concat(mostRows.map((el) => {
                    return el.number
                }));
                omitPlaceholders = omissions.map(() => '?').join(',');
                SQLparams = omissions.concat(SQLparams.slice(-2));
                db.all("SELECT * FROM lease WHERE number NOT IN (" + omitPlaceholders + ") AND number LIKE ? ORDER BY lastUse DESC LIMIT ?",
                    SQLparams,
                    function (err, recentRows) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        finish(recentRows.concat(mostRows));
                    }
                );
            }
        });
});

// Upsert a lease (create if it doesn't exist, or update it's last use index if it does)
let addLeaseToDB = function (lease) {
    db.run(
        "INSERT OR REPLACE INTO lease(lastUse, count, number) VALUES ( $lastUse, COALESCE((SELECT count+1 FROM lease WHERE number=$number), 1), $number);",
        {
            $lastUse: lastUseIdx,
            $number: lease
        });
};

// Upsert a relation (create if it doesn't exist, or increment it's count if it does)
let addRelationToDB = function (first, second) {
    db.run(
        "INSERT OR REPLACE INTO relation(first, second, count) VALUES ( $first, $second, COALESCE((SELECT count+1 FROM relation WHERE first=$first AND second=$second), 1));",
        {
            $first: first,
            $second: second
        });
};

// API: Process all lease numbers that were used (upsert all leases and all relations between them)
app.post('/commit', function (req, res) {
    let list = req.body.list;
    list.sort();
    lastUseIdx++;
    logLastUseIdx();
    for (let i = 0, len = list.length; i < len; i++) {
        addLeaseToDB(list[i]);
    }
    for (let i = 0, len = list.length; i < (len - 1); i++) {
        for (let j = i + 1; j < len; j++) {
            addRelationToDB(list[i], list[j])
        }
    }

    // Refresh most used
    updateMostUsed();

    res.end();
});

app.get('/getMaxValues', function (req, res) {
    res.json({lastUseIdx: lastUseIdx, mostUsed: mostUsed});
});

// Initialize the last use index.
db.get("SELECT max(lastUse) AS max FROM lease", {}, function (err, data) {
    lastUseIdx = data.max;
    logLastUseIdx();
});

// Initialize the most used index.
let updateMostUsed = function () {
    db.get("SELECT max(count) AS max FROM lease", {}, function (err, data) {
        mostUsed = data.max;
        console.log("Currently most used: " + mostUsed);
    });
};


let i;
for(i=0; i<1000000; i++){
    db.run(
        "INSERT INTO lease(lastUse, count, number) VALUES ( $lastUse, $count, $number);",
        {
            $lastUse: 0,
            $count: 0,
            $number: i
        });
    if(!(i%50000))
        console.log(i);
}


updateMostUsed();
// Start the server
app.listen(3000);
console.log("READY");