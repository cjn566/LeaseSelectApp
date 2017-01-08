
//TODO how to bundle libraries so they dont have to be individually downloaded?

import * as React        from "react";
import * as ReactDOM     from "react-dom";

import SearchBar   from './SearchBar';
import SliderBlock from './sliderBlock';
import AcceptedSet from './acceptSet';
import Service     from '../appService';

//require('bootstrap');


let Suggestion = function (props) {
    let onClick = function (e) {
        props.acceptLease(props.data.number);
    };
    return (
        <button type="button" className="list-group-item suggestion" onClick={onClick}>
        <span className="badge">
            {props.idx}
        </span>
            {props.data.number}
        </button>
    )
};


let GroupSelectTool = React.createClass({
    prevTextLen: 0,
    depletedResults: false,
    omissions: [],
    suggestionPool: [],
    relatedPool: [],
    suggestionCount: 10,
    acceptMax: 10,
    poolMax: 100,
    recentWeight: 0,
    mostWeight: 0,
    relatedWeight: 0,
    mostUsed: 0,
    lastUseIdx: 0,
    mostRelated: 0,
    filterText: "",


    calcRelatedScores: function () {
        let _app = this;
        _app.relatedPool.forEach((el) => {
            el.score = (((el.lastUse ) / _app.lastUseIdx) * _app.recentWeight)
                + (((el.count ) / _app.mostUsed) * _app.mostWeight)
                + (((el.assocs ) / _app.mostRelated) * _app.relatedWeight);
        });
    },

    calcNonRelatedScores: function () {
        let _app = this;
        _app.suggestionPool.forEach((el) => {
            el.score = (((el.lastUse ) / _app.lastUseIdx) * _app.recentWeight)
                + (((el.count ) / _app.mostUsed) * _app.mostWeight);
        });
    },

    updateWeights: function (related, recent, most) {
        if (related != this.relatedWeight) {
            this.relatedWeight = related;
        }
        if (recent != this.recentWeight || most != this.mostWeight) {
            this.mostWeight = most;
            this.recentWeight = recent;
            this.calcNonRelatedScores();
        }
        this.calcRelatedScores();
        this.setState({suggestionList: this.combineLists()});
    },

    combineLists: function () {
        return this.relatedPool
            .concat(this.suggestionPool)
            .filter((el) => {
                return !this.relatedPool.some((el2) => {
                    return (el.number == el2.number && !el.assocs)
                })
            })
            .sort((a, b) => {
                return b.score - a.score
            })
            .slice(0, this.suggestionCount);
    },

    // Filter the current set of available numbers on the text.
    // If the resulting set is less than the S
    onTextChange: function (allText: string) {
        this.filterText = allText;

        let text = allText.split('\n').slice(-1)[0];
        console.log('filter text =' + text);

        let oldLen = this.prevTextLen;
        this.prevTextLen = text.length;

        // Filter the current set of condensed suggestions on the text
        let regEx = new RegExp(text);
        let tempSuggestions = this.suggestionPool.filter((el) => {
            return regEx.test(el.number);
        }).slice(0, this.suggestionCount);

        let finish = () => {
            // Sort the pool by score
            tempSuggestions.sort((a, b) => {
                return b.score - a.score;
            });

            this.setState({
                suggestionList: tempSuggestions
            });
        };

        // If this text is longer that the previous text,
        // and the previous search returned less than the request amount,
        // don't bother searching. There wont be any new data.
        if (text.length > oldLen) {
            if (this.depletedResults) {
                finish();
            }
            else {
                // If there are not enough leases, get more
                let deficit = this.suggestionCount - tempSuggestions.length;
                if (deficit) {
                    this.updateOmissions();
                    Service.getLeases(
                        {
                            recentRatio: this.recentWeight,
                            mostRatio: this.mostWeight,
                            limit: deficit,
                            omissions: this.omissions,
                            filterText: text
                        },
                        (data) => {

                            // Indicate if the server depleted all suggestions for this  string
                            this.depletedResults = data.length < deficit;

                            if (data.length) {

                                // Add the new data to the suggestions and the suggestion pool
                                tempSuggestions = tempSuggestions.concat(data);
                                this.suggestionPool = this.suggestionPool.concat(data);

                                // Remove extra suggestions from the pool
                                let tooMany = Math.min(this.poolMax - this.suggestionPool.length, 0);
                                if (tooMany) {
                                    this.suggestionPool.splice(tooMany)
                                }

                            }
                            finish();
                        }
                    );
                }
                else {
                    finish();
                }
            }
        }
        else {
            this.depletedResults = false;
            finish();
        }
    },

    // Remove already accepted leases from the suggestion set
    cleanSuggestions: function () {
        //let before = this.suggestionPool.length;
        this.suggestionPool = this.suggestionPool.filter((suggestion) => {
            return !this.state.accepteds.some((accept) => {
                return suggestion.number === accept.number;
            });
        });
    },

    // Add a lease to the accepted set, clean the suggestion set, and
    acceptLease: function (text) {
        let that = this;
        let set = text.split('\n');

        set.forEach(function (text) {
            // Check if is blank or it has already been accepted
            if (text && !that.state.accepteds.some((el) => {
                    return el.number === text;
                })) {
                that.state.accepteds.unshift({number: text, stale: false});
            }
        });
        that.checkOverflowAccepteds();
        that.cleanSuggestions();
        that.getRelations();
        that.filterText="";
    },

    checkOverflowAccepteds: function () {
        let acc = this.state.accepteds;
        if ((acc.length > this.acceptMax)
            && acc[acc.length - 1].stale) {
            acc.pop();
        }
    },

    toggleStale: function (idx) {
        this.state.accepteds[idx].stale ^= 1;
        this.state.accepteds.sort((a, b) => {
            return b.stale ? -1 : 1
        });
        this.checkOverflowAccepteds();
        this.cleanSuggestions();
        this.getRelations();
    },

    getRelations: function () {
        let _app = this;
        let fin = function () {

            // Find most associations
            _app.mostRelated = _app.relatedPool.reduce((max, curr) => {
                return Math.max(max, curr.assocs)
            }, -Infinity);

            // Find weighted score for each lease
            _app.calcRelatedScores();
            _app.setState({suggestionList: _app.combineLists()});
        };

        let filteredByStale = this.state.accepteds.filter(el => !el.stale);
        if (filteredByStale.length) {
            Service.getRelatedData(
                {
                    list: filteredByStale.map(el => el.number),
                    limit: this.suggestionCount,
                },
                (data) => {
                    this.relatedPool = data;
                    fin();
                }
            );
        }
        else {
            this.relatedPool = [];
            fin();
        }
    },

    // Use the current set of accepted leases (create associations)
    commit: function () {
        // If there were no leases to commit, return
        let filteredByStale = this.state.accepteds.filter(el => !el.stale);
        if (!filteredByStale.length) {
            alert("Nothing to commit");
            return;
        }

        // Filter out leases that were stale TODO: only filter leases when exceeding accept max
        this.state.accepteds = filteredByStale;

        Service.commit(
            {
                'list': this.state.accepteds.map(el => el.number)
            },
            (data) => {
                // Mark all leases as stale
                this.state.accepteds.forEach((el) => {
                    el.stale = true;
                });
                this.forceUpdate();

                Service.getMaxValues({}, (data) => {
                    this.lastUseIdx = data.lastUseIdx;
                    this.mostUsed = data.mostUsed;
            });
        })
    },

    handleHotkey: function (e: KeyboardEvent) {
        let num = parseInt(e.key);
        if (num >= 1 && num <= this.state.suggestionList.length && e.altKey) {
            this.acceptLease(this.state.suggestionList[num - 1].number)
        }
    },

    // Update the ommission list
    updateOmissions: function () {
        // We don't want anything from the accepted list or the suggestion pool;
        this.omissions = this.suggestionPool.map(el => el.number);
        this.omissions = this.omissions.concat(this.state.accepteds.map(el => el.number));
    },

    // Initialize the App by setting the state to all empty arrays
    getInitialState: function () {
        return {
            suggestionList: [],
            accepteds: [],
        };
    },

    // Initialize the App by getting the most used and recently used leases
    componentDidMount: function () {
        Service.getLeases({
            limit: this.suggestionCount,
        }, (data) => {
            this.suggestionPool = data;
            this.setState({
                suggestionList: this.suggestionPool.slice(0, this.suggestionCount)
            });
        });
        this.getMaxValues();
        document.addEventListener('keydown',this.handleHotkey,false);
    },
    getMaxValues: function () {
        Service.getMaxValues({}, (data) => {
            this.lastUseIdx = data.lastUseIdx;
            this.mostUsed = data.mostUsed;
        });
    },
    render: function () {
        let suggestions = this.state.suggestionList.map((result, i) => {
            return <Suggestion key={i} data={result} idx={i+1} acceptLease={this.acceptLease}/>
        });
        return (
            <div className="app col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 col-xs-12">
                <SearchBar acceptLease={this.acceptLease} handleTextChange={this.onTextChange} text={this.filterText}/>

                <div className="search-and-suggest">
                    <div className="suggest">
                        <div className="list-group">
                            {suggestions}
                        </div>
                        {!this.state.suggestionList.length &&
                        <h2>
                            No Matches
                        </h2>
                        }
                    </div>

                    <SliderBlock updateWeights={this.updateWeights}/>
                </div>

                <AcceptedSet
                    data={this.state.accepteds}
                    commit={this.commit}
                    toggleStale={this.toggleStale}
                />
            </div>
        );
    }
});

ReactDOM.render(
    <GroupSelectTool/>,
    document.getElementById('content')
);




// WEBPACK FOOTER //
// ./src/components/app.tsx