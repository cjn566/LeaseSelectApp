/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	/// <reference path="../interfaces.d.ts"/>
	//TODO how to bundle libraries so they dont have to be individually downloaded?
	import * as React from "react";
	import * as ReactDOM from "react-dom";
	import SearchBar from './searchBar';
	import SliderBlock from './sliderBlock';
	import AcceptedSet from './acceptSet';
	import Suggestion from './suggestion';
	import Service from '../appService';
	//require('bootstrap');
	class GroupSelectTool extends React.Component {
	    constructor(props) {
	        super(props);
	        this.prevTextLen = 0;
	        this.depletedResults = false;
	        this.omissions = [];
	        this.suggestionCount = 10;
	        this.acceptMax = 10;
	        this.poolMax = 100;
	        this.recentWeight = 0;
	        this.mostWeight = 0;
	        this.relatedWeight = 0;
	        this.mostUsed = 0;
	        this.lastUseIdx = 0;
	        this.mostRelated = 0;
	        this.filterText = "";
	        // destination.concat(target.splice(start,1));
	        this.calcScoresAndSort = function () {
	            this.suggestionPool.forEach((el) => {
	                el.score = (((el.lastUseIdx) / this.lastUseIdx) * this.recentWeight)
	                    + (((el.totalUses) / this.mostUsed) * this.mostWeight)
	                    + (((el.associations) / this.mostRelated) * this.relatedWeight);
	            });
	            this.suggestionPool.sort((a, b) => {
	                return b.score - a.score;
	            });
	        };
	        this.updateWeights = function (related, recent, most) {
	            if (recent != this.recentWeight || most != this.mostWeight || related != this.relatedWeight) {
	                this.mostWeight = most;
	                this.relatedWeight = related;
	                this.recentWeight = recent;
	                this.calcScoresAndSort();
	                this.setState({ suggestionList: this.combineLists() });
	            }
	        };
	        this.combineLists = function () {
	            return this.relatedPool
	                .concat(this.suggestionPool)
	                .filter((el) => {
	                return !this.relatedPool.some((el2) => {
	                    return (el.name == el2.name && !el.associations);
	                });
	            })
	                .sort((a, b) => {
	                return b.score - a.score;
	            })
	                .slice(0, this.suggestionCount);
	        };
	        // Filter the current set of available numbers on the text.
	        // If the resulting set is less than the S
	        this.onTextChange = function (allText) {
	            this.filterText = allText;
	            this.forceUpdate();
	            let text = allText.split('\n').slice(-1)[0];
	            console.log('filter text =' + text);
	            let oldLen = this.prevTextLen;
	            this.prevTextLen = text.length;
	            // Filter the current set of condensed suggestions on the text
	            let regEx = new RegExp(text);
	            let tempSuggestions = this.suggestionPool.filter((el) => {
	                return regEx.test(el.name);
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
	                        Service.getLeases({
	                            recentRatio: this.recentWeight,
	                            mostRatio: this.mostWeight,
	                            limit: deficit,
	                            omissions: this.omissions,
	                            filterText: text
	                        }, (data) => {
	                            // Indicate if the server depleted all suggestions for this  string
	                            this.depletedResults = data.length < deficit;
	                            if (data.length) {
	                                // Add the new data to the suggestions and the suggestion pool
	                                tempSuggestions = tempSuggestions.concat(data);
	                                this.suggestionPool = this.suggestionPool.concat(data);
	                                // Remove extra suggestions from the pool
	                                let tooMany = Math.min(this.poolMax - this.suggestionPool.length, 0);
	                                if (tooMany) {
	                                    this.suggestionPool.splice(tooMany);
	                                }
	                            }
	                            finish();
	                        });
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
	        };
	        // Remove already accepted leases from the suggestion set
	        this.cleanSuggestions = function () {
	            //let before = this.suggestionPool.length;
	            this.suggestionPool = this.suggestionPool.filter((suggestion) => {
	                return !this.state.accepteds.some((accept) => {
	                    return suggestion.name === accept.name;
	                });
	            });
	        };
	        // Add a lease to the accepted set, clean the suggestion set, and
	        this.acceptLease = function (text) {
	            let that = this;
	            let set = text.split('\n');
	            set.forEach(function (text) {
	                // Check if is blank or it has already been accepted
	                if (text && !that.state.accepteds.some((el) => {
	                    return el.name === text;
	                })) {
	                    that.state.accepteds.unshift({ name: text, stale: false });
	                }
	            });
	            that.checkOverflowAccepteds();
	            that.cleanSuggestions();
	            that.getRelations();
	            that.filterText = "";
	        };
	        this.checkOverflowAccepteds = function () {
	            let acc = this.state.accepteds;
	            if ((acc.length > this.acceptMax)
	                && acc[acc.length - 1].stale) {
	                acc.pop();
	            }
	        };
	        this.toggleStale = function (index) {
	            this.state.accepteds[index].stale ^= 1;
	            this.state.accepteds.sort((a, b) => {
	                return b.stale ? -1 : 1;
	            });
	            this.checkOverflowAccepteds();
	            this.cleanSuggestions();
	            this.getRelations();
	        };
	        this.getRelations = function () {
	            let _app = this;
	            let fin = function () {
	                // Find most associations
	                _app.mostRelated = _app.relatedPool.reduce((max, curr) => {
	                    return Math.max(max, curr.associations);
	                }, -Infinity);
	                // Find weighted score for each lease
	                _app.calcScores();
	                _app.setState({ suggestionList: _app.combineLists() });
	            };
	            let filteredByStale = this.state.accepteds.filter(el => !el.stale);
	            if (filteredByStale.length) {
	                Service.getRelatedData({
	                    list: filteredByStale.map(el => el.name),
	                    limit: this.suggestionCount,
	                }, (data) => {
	                    this.relatedPool = data || [];
	                    fin();
	                });
	            }
	            else {
	                this.relatedPool = [];
	                fin();
	            }
	        };
	        // Use the current set of accepted leases (create associations)
	        this.commit = function () {
	            // If there were no leases to commit, return
	            let filteredByStale = this.state.accepteds.filter(el => !el.stale);
	            if (!filteredByStale.length) {
	                alert("Nothing to commit");
	                return;
	            }
	            // Filter out leases that were stale TODO: only filter leases when exceeding accept max
	            this.state.accepteds = filteredByStale;
	            Service.commit({
	                'list': this.state.accepteds.map(el => el.name)
	            }, (data) => {
	                // Mark all leases as stale
	                this.state.accepteds.forEach((el) => {
	                    el.stale = true;
	                });
	                this.forceUpdate();
	                Service.getMaxValues({}, (data) => {
	                    this.lastUseIdx = data.lastUseIdx;
	                    this.mostUsed = data.mostUsed;
	                });
	            });
	        };
	        this.handleHotkey = function (e) {
	            let num = parseInt(e.key);
	            if (num >= 1 && num <= this.state.suggestionList.length && e.altKey) {
	                this.acceptLease(this.state.suggestionList[num - 1].name);
	            }
	        };
	        // Update the ommission list
	        this.updateOmissions = function () {
	            // We don't want anything from the accepted list or the suggestion pool;
	            this.omissions = this.suggestionPool.map(el => el.name);
	            this.omissions = this.omissions.concat(this.state.accepteds.map(el => el.name));
	        };
	        // Initialize the App by setting the state to all empty arrays
	        this.getInitialState = function () {
	            return {
	                suggestionList: [],
	                accepteds: [],
	            };
	        };
	        // Initialize the App by getting the most used and recently used leases
	        this.componentDidMount = function () {
	            Service.getLeases({
	                limit: this.suggestionCount,
	            }, (data) => {
	                this.suggestionPool = data;
	                this.setState({
	                    suggestionList: this.suggestionPool.slice(0, this.suggestionCount)
	                });
	            });
	            this.getMaxValues();
	            document.addEventListener('keydown', this.handleHotkey, false);
	        };
	        this.getMaxValues = function () {
	            Service.getMaxValues({}, (data) => {
	                this.lastUseIdx = data.lastUseIdx;
	                this.mostUsed = data.mostUsed;
	            });
	        };
	        this.calcScoresAndSort = this.calcScoresAndSort.bind(this);
	        this.updateWeights = this.updateWeights.bind(this);
	    }
	    render() {
	        let suggestions = this.state.suggestionList.map((result, i) => {
	            return React.createElement(Suggestion, { key: i, data: result, idx: i + 1, acceptLease: this.acceptLease });
	        });
	        return (React.createElement("div", { className: "app col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 col-xs-12" },
	            React.createElement(SearchBar, { acceptLease: this.acceptLease, handleTextChange: this.onTextChange, text: this.filterText }),
	            React.createElement("div", { className: "search-and-suggest" },
	                React.createElement("div", { className: "suggest" },
	                    React.createElement("div", { className: "list-group" }, suggestions),
	                    !this.state.suggestionList.length &&
	                        React.createElement("h2", null, "No Matches")),
	                React.createElement(SliderBlock, { updateWeights: this.updateWeights })),
	            React.createElement(AcceptedSet, { data: this.state.accepteds, commit: this.commit, toggleStale: this.toggleStale })));
	    }
	}
	ReactDOM.render(React.createElement(GroupSelectTool, null), document.getElementById('content'));
	// WEBPACK FOOTER //
	// ./src/components/app.tsx 


/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map