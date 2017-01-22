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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var doPOST = function (url, options, callback) {
    $.ajax({
        type: "POST",
        url: url,
        data: options,
        cache: false,
        success: function (data) {
            callback(data);
        },
        error: function (xhr, status, err) {
            console.error(status, err.toString());
        }
    });
};
var doGET = function (url, options, callback) {
    $.ajax({
        type: "GET",
        url: url,
        data: options,
        cache: false,
        success: function (data) {
            callback(data);
        },
        error: function (xhr, status, err) {
            console.error(status, err.toString());
        }
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getLeases: function (options, callback) {
        doGET("/getLeases", options, callback);
    },
    getRelatedData: function (options, callback) {
        doGET("/getRelated", options, callback);
    },
    getMaxValues: function (options, callback) {
        doGET('/getMaxValues', options, callback);
    },
    commit: function (options, callback) {
        doPOST('/commit', options, callback);
    }
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var React = __webpack_require__(0);
var ClipboardBtn = __webpack_require__(15);
var Acceptance = function (props) {
    var toggleStale = function (e) {
        console.log("Toggling " + e.target.id);
        props.toggleStale(e.target.id);
    };
    return (React.createElement("li", { className: "item" },
        React.createElement("div", { className: "", onClick: toggleStale, id: props.id.toString() }, props.data.name)));
};
// AcceptSet
function default_1(props) {
    var copytext = props.data.filter(function (el) { return !el.stale; }).map(function (el) { return el.number; }).join('\n');
    var enableButton = props.data.some(function (el) { return !el.stale; });
    return (React.createElement("div", { className: "accepted" },
        React.createElement("ol", null, props.data.map(function (accept, i) {
            return React.createElement(Acceptance, { key: i, data: accept, toggleStale: props.toggleStale, id: i });
        })),
        React.createElement(ClipboardBtn, { "button-className": "btn btn-primary", "button-onClick": props.commit, "data-clipboard-text": copytext, "button-disabled": !enableButton }, "Kermit")));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var React = __webpack_require__(0);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (props) {
    var handleTextChange = function (e) {
        props.handleTextChange(e.target.value);
    };
    var acceptLease = function () {
        props.acceptLease(props.text);
    };
    return (React.createElement("div", { className: "form-inline" },
        React.createElement("textarea", { className: "form-control", type: "text", value: props.text, onChange: handleTextChange, placeholder: "Lease Number" }),
        React.createElement("button", { className: "btn btn-success", disabled: props.text == "", onClick: acceptLease }, "Add")));
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = __webpack_require__(0);
var Slider = function (props) {
    return (React.createElement("div", null,
        React.createElement("label", null, props.desc),
        React.createElement("input", { className: "slider", id: props.id, type: "range", onChange: props.onAdjust, value: props.value, width: "90%" }),
        React.createElement("span", null, props.value)));
};
;
;
var default_1 = (function (_super) {
    __extends(default_1, _super);
    function default_1(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            // TODO: move these default values to somewhere that makes sense
            relations: 100,
            recent: 70,
            totalUse: 40
        };
        _this.componentDidMount = _this.componentDidMount.bind(_this);
        _this.onAdjust = _this.onAdjust.bind(_this);
        return _this;
    }
    default_1.prototype.componentDidMount = function () {
        this.props.updateWeights(this.state.relations, this.state.recent, this.state.totalUse);
    };
    default_1.prototype.onAdjust = function (e) {
        clearTimeout(this.timeoutID);
        this.state[e.target.id] = parseInt(e.target.value);
        this.forceUpdate(function () {
            this.timeoutID = setTimeout(this.props.updateWeights, 150, this.state.relations, this.state.recent, this.state.totalUse);
        });
    };
    default_1.prototype.render = function () {
        return (React.createElement("form", null,
            React.createElement(Slider, { id: "relations", desc: "Most historically associated with currently selected leases", value: this.state.relations, onAdjust: this.onAdjust }),
            React.createElement(Slider, { id: "recent", desc: "Most recently used", value: this.state.recent, onAdjust: this.onAdjust }),
            React.createElement(Slider, { id: "totalUse", desc: "Most used", value: this.state.totalUse, onAdjust: this.onAdjust })));
    };
    return default_1;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var React = __webpack_require__(0);
function default_1(props) {
    var onClick = function (e) {
        props.acceptLease(props.data.name);
    };
    return (React.createElement("button", { type: "button", className: "list-group-item suggestion", onClick: onClick },
        React.createElement("span", { className: "badge" }, props.idx),
        props.data.name));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, __webpack_require__(13)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(module, require('select'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, global.select);
        global.clipboardAction = mod.exports;
    }
})(this, function (module, _select) {
    'use strict';

    var _select2 = _interopRequireDefault(_select);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var ClipboardAction = function () {
        /**
         * @param {Object} options
         */
        function ClipboardAction(options) {
            _classCallCheck(this, ClipboardAction);

            this.resolveOptions(options);
            this.initSelection();
        }

        /**
         * Defines base properties passed from constructor.
         * @param {Object} options
         */


        _createClass(ClipboardAction, [{
            key: 'resolveOptions',
            value: function resolveOptions() {
                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                this.action = options.action;
                this.emitter = options.emitter;
                this.target = options.target;
                this.text = options.text;
                this.trigger = options.trigger;

                this.selectedText = '';
            }
        }, {
            key: 'initSelection',
            value: function initSelection() {
                if (this.text) {
                    this.selectFake();
                } else if (this.target) {
                    this.selectTarget();
                }
            }
        }, {
            key: 'selectFake',
            value: function selectFake() {
                var _this = this;

                var isRTL = document.documentElement.getAttribute('dir') == 'rtl';

                this.removeFake();

                this.fakeHandlerCallback = function () {
                    return _this.removeFake();
                };
                this.fakeHandler = document.body.addEventListener('click', this.fakeHandlerCallback) || true;

                this.fakeElem = document.createElement('textarea');
                // Prevent zooming on iOS
                this.fakeElem.style.fontSize = '12pt';
                // Reset box model
                this.fakeElem.style.border = '0';
                this.fakeElem.style.padding = '0';
                this.fakeElem.style.margin = '0';
                // Move element out of screen horizontally
                this.fakeElem.style.position = 'absolute';
                this.fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px';
                // Move element to the same position vertically
                var yPosition = window.pageYOffset || document.documentElement.scrollTop;
                this.fakeElem.addEventListener('focus', window.scrollTo(0, yPosition));
                this.fakeElem.style.top = yPosition + 'px';

                this.fakeElem.setAttribute('readonly', '');
                this.fakeElem.value = this.text;

                document.body.appendChild(this.fakeElem);

                this.selectedText = (0, _select2.default)(this.fakeElem);
                this.copyText();
            }
        }, {
            key: 'removeFake',
            value: function removeFake() {
                if (this.fakeHandler) {
                    document.body.removeEventListener('click', this.fakeHandlerCallback);
                    this.fakeHandler = null;
                    this.fakeHandlerCallback = null;
                }

                if (this.fakeElem) {
                    document.body.removeChild(this.fakeElem);
                    this.fakeElem = null;
                }
            }
        }, {
            key: 'selectTarget',
            value: function selectTarget() {
                this.selectedText = (0, _select2.default)(this.target);
                this.copyText();
            }
        }, {
            key: 'copyText',
            value: function copyText() {
                var succeeded = void 0;

                try {
                    succeeded = document.execCommand(this.action);
                } catch (err) {
                    succeeded = false;
                }

                this.handleResult(succeeded);
            }
        }, {
            key: 'handleResult',
            value: function handleResult(succeeded) {
                this.emitter.emit(succeeded ? 'success' : 'error', {
                    action: this.action,
                    text: this.selectedText,
                    trigger: this.trigger,
                    clearSelection: this.clearSelection.bind(this)
                });
            }
        }, {
            key: 'clearSelection',
            value: function clearSelection() {
                if (this.target) {
                    this.target.blur();
                }

                window.getSelection().removeAllRanges();
            }
        }, {
            key: 'destroy',
            value: function destroy() {
                this.removeFake();
            }
        }, {
            key: 'action',
            set: function set() {
                var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'copy';

                this._action = action;

                if (this._action !== 'copy' && this._action !== 'cut') {
                    throw new Error('Invalid "action" value, use either "copy" or "cut"');
                }
            },
            get: function get() {
                return this._action;
            }
        }, {
            key: 'target',
            set: function set(target) {
                if (target !== undefined) {
                    if (target && (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && target.nodeType === 1) {
                        if (this.action === 'copy' && target.hasAttribute('disabled')) {
                            throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                        }

                        if (this.action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {
                            throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                        }

                        this._target = target;
                    } else {
                        throw new Error('Invalid "target" value, use a valid Element');
                    }
                }
            },
            get: function get() {
                return this._target;
            }
        }]);

        return ClipboardAction;
    }();

    module.exports = ClipboardAction;
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, __webpack_require__(7), __webpack_require__(14), __webpack_require__(12)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(module, require('./clipboard-action'), require('tiny-emitter'), require('good-listener'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, global.clipboardAction, global.tinyEmitter, global.goodListener);
        global.clipboard = mod.exports;
    }
})(this, function (module, _clipboardAction, _tinyEmitter, _goodListener) {
    'use strict';

    var _clipboardAction2 = _interopRequireDefault(_clipboardAction);

    var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

    var _goodListener2 = _interopRequireDefault(_goodListener);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var Clipboard = function (_Emitter) {
        _inherits(Clipboard, _Emitter);

        /**
         * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
         * @param {Object} options
         */
        function Clipboard(trigger, options) {
            _classCallCheck(this, Clipboard);

            var _this = _possibleConstructorReturn(this, (Clipboard.__proto__ || Object.getPrototypeOf(Clipboard)).call(this));

            _this.resolveOptions(options);
            _this.listenClick(trigger);
            return _this;
        }

        /**
         * Defines if attributes would be resolved using internal setter functions
         * or custom functions that were passed in the constructor.
         * @param {Object} options
         */


        _createClass(Clipboard, [{
            key: 'resolveOptions',
            value: function resolveOptions() {
                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
                this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
                this.text = typeof options.text === 'function' ? options.text : this.defaultText;
            }
        }, {
            key: 'listenClick',
            value: function listenClick(trigger) {
                var _this2 = this;

                this.listener = (0, _goodListener2.default)(trigger, 'click', function (e) {
                    return _this2.onClick(e);
                });
            }
        }, {
            key: 'onClick',
            value: function onClick(e) {
                var trigger = e.delegateTarget || e.currentTarget;

                if (this.clipboardAction) {
                    this.clipboardAction = null;
                }

                this.clipboardAction = new _clipboardAction2.default({
                    action: this.action(trigger),
                    target: this.target(trigger),
                    text: this.text(trigger),
                    trigger: trigger,
                    emitter: this
                });
            }
        }, {
            key: 'defaultAction',
            value: function defaultAction(trigger) {
                return getAttributeValue('action', trigger);
            }
        }, {
            key: 'defaultTarget',
            value: function defaultTarget(trigger) {
                var selector = getAttributeValue('target', trigger);

                if (selector) {
                    return document.querySelector(selector);
                }
            }
        }, {
            key: 'defaultText',
            value: function defaultText(trigger) {
                return getAttributeValue('text', trigger);
            }
        }, {
            key: 'destroy',
            value: function destroy() {
                this.listener.destroy();

                if (this.clipboardAction) {
                    this.clipboardAction.destroy();
                    this.clipboardAction = null;
                }
            }
        }]);

        return Clipboard;
    }(_tinyEmitter2.default);

    /**
     * Helper function to retrieve attribute value.
     * @param {String} suffix
     * @param {Element} element
     */
    function getAttributeValue(suffix, element) {
        var attribute = 'data-clipboard-' + suffix;

        if (!element.hasAttribute(attribute)) {
            return;
        }

        return element.getAttribute(attribute);
    }

    module.exports = Clipboard;
});

/***/ }),
/* 9 */
/***/ (function(module, exports) {

var DOCUMENT_NODE_TYPE = 9;

/**
 * A polyfill for Element.matches()
 */
if (Element && !Element.prototype.matches) {
    var proto = Element.prototype;

    proto.matches = proto.matchesSelector ||
                    proto.mozMatchesSelector ||
                    proto.msMatchesSelector ||
                    proto.oMatchesSelector ||
                    proto.webkitMatchesSelector;
}

/**
 * Finds the closest parent that matches a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Function}
 */
function closest (element, selector) {
    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
        if (element.matches(selector)) return element;
        element = element.parentNode;
    }
}

module.exports = closest;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var closest = __webpack_require__(9);

/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function delegate(element, selector, type, callback, useCapture) {
    var listenerFn = listener.apply(this, arguments);

    element.addEventListener(type, listenerFn, useCapture);

    return {
        destroy: function() {
            element.removeEventListener(type, listenerFn, useCapture);
        }
    }
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Function}
 */
function listener(element, selector, type, callback) {
    return function(e) {
        e.delegateTarget = closest(e.target, selector);

        if (e.delegateTarget) {
            callback.call(element, e);
        }
    }
}

module.exports = delegate;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

/**
 * Check if argument is a HTML element.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.node = function(value) {
    return value !== undefined
        && value instanceof HTMLElement
        && value.nodeType === 1;
};

/**
 * Check if argument is a list of HTML elements.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.nodeList = function(value) {
    var type = Object.prototype.toString.call(value);

    return value !== undefined
        && (type === '[object NodeList]' || type === '[object HTMLCollection]')
        && ('length' in value)
        && (value.length === 0 || exports.node(value[0]));
};

/**
 * Check if argument is a string.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.string = function(value) {
    return typeof value === 'string'
        || value instanceof String;
};

/**
 * Check if argument is a function.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.fn = function(value) {
    var type = Object.prototype.toString.call(value);

    return type === '[object Function]';
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var is = __webpack_require__(11);
var delegate = __webpack_require__(10);

/**
 * Validates all params and calls the right
 * listener function based on its target type.
 *
 * @param {String|HTMLElement|HTMLCollection|NodeList} target
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listen(target, type, callback) {
    if (!target && !type && !callback) {
        throw new Error('Missing required arguments');
    }

    if (!is.string(type)) {
        throw new TypeError('Second argument must be a String');
    }

    if (!is.fn(callback)) {
        throw new TypeError('Third argument must be a Function');
    }

    if (is.node(target)) {
        return listenNode(target, type, callback);
    }
    else if (is.nodeList(target)) {
        return listenNodeList(target, type, callback);
    }
    else if (is.string(target)) {
        return listenSelector(target, type, callback);
    }
    else {
        throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
    }
}

/**
 * Adds an event listener to a HTML element
 * and returns a remove listener function.
 *
 * @param {HTMLElement} node
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNode(node, type, callback) {
    node.addEventListener(type, callback);

    return {
        destroy: function() {
            node.removeEventListener(type, callback);
        }
    }
}

/**
 * Add an event listener to a list of HTML elements
 * and returns a remove listener function.
 *
 * @param {NodeList|HTMLCollection} nodeList
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNodeList(nodeList, type, callback) {
    Array.prototype.forEach.call(nodeList, function(node) {
        node.addEventListener(type, callback);
    });

    return {
        destroy: function() {
            Array.prototype.forEach.call(nodeList, function(node) {
                node.removeEventListener(type, callback);
            });
        }
    }
}

/**
 * Add an event listener to a selector
 * and returns a remove listener function.
 *
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenSelector(selector, type, callback) {
    return delegate(document.body, selector, type, callback);
}

module.exports = listen;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

function select(element) {
    var selectedText;

    if (element.nodeName === 'SELECT') {
        element.focus();

        selectedText = element.value;
    }
    else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
        element.focus();
        element.setSelectionRange(0, element.value.length);

        selectedText = element.value;
    }
    else {
        if (element.hasAttribute('contenteditable')) {
            element.focus();
        }

        var selection = window.getSelection();
        var range = document.createRange();

        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);

        selectedText = selection.toString();
    }

    return selectedText;
}

module.exports = select;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    };

    listener._ = callback
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

module.exports = E;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory(__webpack_require__(0), __webpack_require__(8));
	else if(typeof define === 'function' && define.amd)
		define(["react", "clipboard"], factory);
	else if(typeof exports === 'object')
		exports["ReactClipboard"] = factory(require("react"), require("clipboard"));
	else
		root["ReactClipboard"] = factory(root["React"], root["Clipboard"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_40__, __WEBPACK_EXTERNAL_MODULE_41__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(1)['default'];

	var _inherits = __webpack_require__(17)['default'];

	var _createClass = __webpack_require__(26)['default'];

	var _classCallCheck = __webpack_require__(29)['default'];

	var _extends = __webpack_require__(30)['default'];

	var _Object$keys = __webpack_require__(36)['default'];

	var _interopRequireDefault = __webpack_require__(39)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _react = __webpack_require__(40);

	var _react2 = _interopRequireDefault(_react);

	var ClipboardButton = (function (_React$Component) {
	  _inherits(ClipboardButton, _React$Component);

	  function ClipboardButton() {
	    _classCallCheck(this, ClipboardButton);

	    _get(Object.getPrototypeOf(ClipboardButton.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(ClipboardButton, [{
	    key: 'propsWith',

	    /* Returns a object with all props that fulfill a certain naming pattern
	     *
	     * @param {RegExp} regexp - Regular expression representing which pattern
	     *                          you'll be searching for.
	     * @param {Boolean} remove - Determines if the regular expression should be
	     *                           removed when transmitting the key from the props
	     *                           to the new object.
	     *
	     * e.g:
	     *
	     * // Considering:
	     * // this.props = {option-foo: 1, onBar: 2, data-foobar: 3 data-baz: 4};
	     *
	     * // *RegExps not using // so that this comment doesn't break up
	     * this.propsWith(option-*, true); // returns {foo: 1}
	     * this.propsWith(on*, true); // returns {Bar: 2}
	     * this.propsWith(data-*); // returns {data-foobar: 1, data-baz: 4}
	     */
	    value: function propsWith(regexp) {
	      var remove = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	      var object = {};

	      _Object$keys(this.props).forEach(function (key) {
	        if (key.search(regexp) !== -1) {
	          var objectKey = remove ? key.replace(regexp, '') : key;
	          object[objectKey] = this.props[key];
	        }
	      }, this);

	      return object;
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.clipboard && this.clipboard.destroy();
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      // Support old API by trying to assign this.props.options first;
	      var options = this.props.options || this.propsWith(/^option-/, true);
	      var element = _react2['default'].version.match(/0\.13(.*)/) ? this.refs.element.getDOMNode() : this.refs.element;
	      var Clipboard = __webpack_require__(41);
	      this.clipboard = new Clipboard(element, options);

	      var callbacks = this.propsWith(/^on/, true);
	      _Object$keys(callbacks).forEach(function (callback) {
	        this.clipboard.on(callback.toLowerCase(), this.props['on' + callback]);
	      }, this);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var attributes = _extends({
	        type: this.getType(),
	        className: this.props.className || '',
	        style: this.props.style || {},
	        ref: 'element',
	        onClick: this.props.onClick
	      }, this.propsWith(/^data-/), this.propsWith(/^button-/, true));

	      return _react2['default'].createElement(this.getComponent(), attributes, this.props.children);
	    }
	  }, {
	    key: 'getType',
	    value: function getType() {
	      if (this.getComponent() === 'button' || this.getComponent() === 'input') {
	        return this.props.type || 'button';
	      } else {
	        return undefined;
	      }
	    }
	  }, {
	    key: 'getComponent',
	    value: function getComponent() {
	      return this.props.component || 'button';
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      options: _react2['default'].PropTypes.object,
	      type: _react2['default'].PropTypes.string,
	      className: _react2['default'].PropTypes.string,
	      style: _react2['default'].PropTypes.object,
	      component: _react2['default'].PropTypes.string,
	      children: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.element, _react2['default'].PropTypes.string, _react2['default'].PropTypes.number, _react2['default'].PropTypes.object])
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      onClick: function onClick() {}
	    },
	    enumerable: true
	  }]);

	  return ClipboardButton;
	})(_react2['default'].Component);

	exports['default'] = ClipboardButton;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$getOwnPropertyDescriptor = __webpack_require__(2)["default"];

	exports["default"] = function get(_x, _x2, _x3) {
	  var _again = true;

	  _function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;
	    _again = false;
	    if (object === null) object = Function.prototype;

	    var desc = _Object$getOwnPropertyDescriptor(object, property);

	    if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);

	      if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;
	        _x2 = property;
	        _x3 = receiver;
	        _again = true;
	        desc = parent = undefined;
	        continue _function;
	      }
	    } else if ("value" in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;

	      if (getter === undefined) {
	        return undefined;
	      }

	      return getter.call(receiver);
	    }
	  }
	};

	exports.__esModule = true;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(4);
	__webpack_require__(5);
	module.exports = function getOwnPropertyDescriptor(it, key){
	  return $.getDesc(it, key);
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject = __webpack_require__(6);

	__webpack_require__(10)('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(7)
	  , defined = __webpack_require__(9);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(8);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(11)
	  , core    = __webpack_require__(13)
	  , fails   = __webpack_require__(16);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(12)
	  , core      = __webpack_require__(13)
	  , ctx       = __webpack_require__(14)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 12 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 13 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(15);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$create = __webpack_require__(18)["default"];

	var _Object$setPrototypeOf = __webpack_require__(20)["default"];

	exports["default"] = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }

	  subClass.prototype = _Object$create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};

	exports.__esModule = true;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(19), __esModule: true };

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(4);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(21), __esModule: true };

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(22);
	module.exports = __webpack_require__(13).Object.setPrototypeOf;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(11);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(23).set});

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(4).getDesc
	  , isObject = __webpack_require__(24)
	  , anObject = __webpack_require__(25);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(14)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(24);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$defineProperty = __webpack_require__(27)["default"];

	exports["default"] = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;

	      _Object$defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	})();

	exports.__esModule = true;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(28), __esModule: true };

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(4);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	exports.__esModule = true;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$assign = __webpack_require__(31)["default"];

	exports["default"] = _Object$assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

	exports.__esModule = true;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(32), __esModule: true };

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(33);
	module.exports = __webpack_require__(13).Object.assign;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(11);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(34)});

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var $        = __webpack_require__(4)
	  , toObject = __webpack_require__(35)
	  , IObject  = __webpack_require__(7);

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__(16)(function(){
	  var a = Object.assign
	    , A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , $$    = arguments
	    , $$len = $$.length
	    , index = 1
	    , getKeys    = $.getKeys
	    , getSymbols = $.getSymbols
	    , isEnum     = $.isEnum;
	  while($$len > index){
	    var S      = IObject($$[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  }
	  return T;
	} : Object.assign;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(9);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(37), __esModule: true };

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(38);
	module.exports = __webpack_require__(13).Object.keys;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(35);

	__webpack_require__(10)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 39 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_40__;

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_41__;

/***/ }
/******/ ])
});
;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/// <reference path="../interfaces.d.ts"/>

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//TODO how to bundle libraries so they dont have to be individually downloaded?
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(6);
var searchBar_1 = __webpack_require__(3);
var sliderBlock_1 = __webpack_require__(4);
var acceptSet_1 = __webpack_require__(2);
var suggestion_1 = __webpack_require__(5);
var appService_1 = __webpack_require__(1);
//require('bootstrap');
var GroupSelectTool = (function (_super) {
    __extends(GroupSelectTool, _super);
    function GroupSelectTool(props) {
        var _this = _super.call(this, props) || this;
        _this.prevTextLen = 0;
        _this.depletedResults = false;
        _this.omissions = [];
        _this.suggestionPool = [];
        _this.relatedPool = [];
        _this.suggestionCount = 10;
        _this.acceptMax = 10;
        _this.poolMax = 100;
        _this.recentWeight = 0;
        _this.mostWeight = 0;
        _this.relatedWeight = 0;
        _this.mostUsed = 0;
        _this.lastUseIdx = 0;
        _this.mostRelated = 0;
        _this.filterText = "";
        // destination.concat(target.splice(start,1));
        _this.calcScoresAndSort = function () {
            var _this = this;
            this.suggestionPool.forEach(function (el) {
                el.score = (((el.lastUseIdx) / _this.lastUseIdx) * _this.recentWeight)
                    + (((el.totalUses) / _this.mostUsed) * _this.mostWeight)
                    + (((el.associations) / _this.mostRelated) * _this.relatedWeight);
            });
            this.suggestionPool.sort(function (a, b) {
                return b.score - a.score;
            });
        };
        _this.updateWeights = function (related, recent, most) {
            if (recent != this.recentWeight || most != this.mostWeight || related != this.relatedWeight) {
                this.mostWeight = most;
                this.relatedWeight = related;
                this.recentWeight = recent;
                this.calcScoresAndSort();
                this.setState({ suggestionList: this.combineLists() });
            }
        };
        _this.combineLists = function () {
            var _this = this;
            return this.relatedPool
                .concat(this.suggestionPool)
                .filter(function (el) {
                return !_this.relatedPool.some(function (el2) {
                    return (el.name == el2.name && !el.associations);
                });
            })
                .sort(function (a, b) {
                return b.score - a.score;
            })
                .slice(0, this.suggestionCount);
        };
        // Filter the current set of available numbers on the text.
        // If the resulting set is less than the S
        _this.onTextChange = function (allText) {
            var _this = this;
            this.filterText = allText;
            this.forceUpdate();
            var text = allText.split('\n').slice(-1)[0];
            console.log('filter text =' + text);
            var oldLen = this.prevTextLen;
            this.prevTextLen = text.length;
            // Filter the current set of condensed suggestions on the text
            var regEx = new RegExp(text);
            var tempSuggestions = this.suggestionPool.filter(function (el) {
                return regEx.test(el.name);
            }).slice(0, this.suggestionCount);
            var finish = function () {
                // Sort the pool by score
                tempSuggestions.sort(function (a, b) {
                    return b.score - a.score;
                });
                _this.setState({
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
                    var deficit_1 = this.suggestionCount - tempSuggestions.length;
                    if (deficit_1) {
                        this.updateOmissions();
                        appService_1.default.getLeases({
                            recentRatio: this.recentWeight,
                            mostRatio: this.mostWeight,
                            limit: deficit_1,
                            omissions: this.omissions,
                            filterText: text
                        }, function (data) {
                            // Indicate if the server depleted all suggestions for this  string
                            _this.depletedResults = data.length < deficit_1;
                            if (data.length) {
                                // Add the new data to the suggestions and the suggestion pool
                                tempSuggestions = tempSuggestions.concat(data);
                                _this.suggestionPool = _this.suggestionPool.concat(data);
                                // Remove extra suggestions from the pool
                                var tooMany = Math.min(_this.poolMax - _this.suggestionPool.length, 0);
                                if (tooMany) {
                                    _this.suggestionPool.splice(tooMany);
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
        _this.cleanSuggestions = function () {
            var _this = this;
            //let before = this.suggestionPool.length;
            this.suggestionPool = this.suggestionPool.filter(function (suggestion) {
                return !_this.state.accepteds.some(function (accept) {
                    return suggestion.name === accept.name;
                });
            });
        };
        // Add a lease to the accepted set, clean the suggestion set, and
        _this.acceptLease = function (text) {
            var that = this;
            var set = text.split('\n');
            set.forEach(function (text) {
                // Check if is blank or it has already been accepted
                if (text && !that.state.accepteds.some(function (el) {
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
        _this.checkOverflowAccepteds = function () {
            var acc = this.state.accepteds;
            if ((acc.length > this.acceptMax)
                && acc[acc.length - 1].stale) {
                acc.pop();
            }
        };
        _this.toggleStale = function (index) {
            this.state.accepteds[index].stale ^= 1;
            this.state.accepteds.sort(function (a, b) {
                return b.stale ? -1 : 1;
            });
            this.checkOverflowAccepteds();
            this.cleanSuggestions();
            this.getRelations();
        };
        _this.getRelations = function () {
            var _this = this;
            var _app = this;
            var fin = function () {
                // Find most associations
                _app.mostRelated = _app.relatedPool.reduce(function (max, curr) {
                    return Math.max(max, curr.associations);
                }, -Infinity);
                // Find weighted score for each lease
                _app.calcScores();
                _app.setState({ suggestionList: _app.combineLists() });
            };
            var filteredByStale = this.state.accepteds.filter(function (el) { return !el.stale; });
            if (filteredByStale.length) {
                appService_1.default.getRelatedData({
                    list: filteredByStale.map(function (el) { return el.name; }),
                    limit: this.suggestionCount,
                }, function (data) {
                    _this.relatedPool = data || [];
                    fin();
                });
            }
            else {
                this.relatedPool = [];
                fin();
            }
        };
        // Use the current set of accepted leases (create associations)
        _this.commit = function () {
            var _this = this;
            // If there were no leases to commit, return
            var filteredByStale = this.state.accepteds.filter(function (el) { return !el.stale; });
            if (!filteredByStale.length) {
                alert("Nothing to commit");
                return;
            }
            // Filter out leases that were stale TODO: only filter leases when exceeding accept max
            this.state.accepteds = filteredByStale;
            appService_1.default.commit({
                'list': this.state.accepteds.map(function (el) { return el.name; })
            }, function (data) {
                // Mark all leases as stale
                _this.state.accepteds.forEach(function (el) {
                    el.stale = true;
                });
                _this.forceUpdate();
                appService_1.default.getMaxValues({}, function (data) {
                    _this.lastUseIdx = data.lastUseIdx;
                    _this.mostUsed = data.mostUsed;
                });
            });
        };
        _this.handleHotkey = function (e) {
            var num = parseInt(e.key);
            if (num >= 1 && num <= this.state.suggestionList.length && e.altKey) {
                this.acceptLease(this.state.suggestionList[num - 1].name);
            }
        };
        // Update the ommission list
        _this.updateOmissions = function () {
            // We don't want anything from the accepted list or the suggestion pool;
            this.omissions = this.suggestionPool.map(function (el) { return el.name; });
            this.omissions = this.omissions.concat(this.state.accepteds.map(function (el) { return el.name; }));
        };
        // Initialize the App by getting the most used and recently used leases
        _this.componentDidMount = function () {
            var _this = this;
            appService_1.default.getLeases({
                limit: this.suggestionCount,
            }, function (data) {
                _this.suggestionPool = data;
                _this.setState({
                    suggestionList: _this.suggestionPool.slice(0, _this.suggestionCount)
                });
            });
            this.getMaxValues();
            document.addEventListener('keydown', this.handleHotkey, false);
        };
        _this.getMaxValues = function () {
            var _this = this;
            appService_1.default.getMaxValues({}, function (data) {
                _this.lastUseIdx = data.lastUseIdx;
                _this.mostUsed = data.mostUsed;
            });
        };
        _this.state = {
            suggestionList: [],
            accepteds: [],
        };
        _this.calcScoresAndSort = _this.calcScoresAndSort.bind(_this);
        _this.updateWeights = _this.updateWeights.bind(_this);
        return _this;
    }
    GroupSelectTool.prototype.render = function () {
        var _this = this;
        var suggestions = this.state.suggestionList.map(function (result, i) {
            return React.createElement(suggestion_1.default, { key: i, data: result, idx: i + 1, acceptLease: _this.acceptLease });
        });
        return (React.createElement("div", { className: "app col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 col-xs-12" },
            React.createElement(searchBar_1.default, { acceptLease: this.acceptLease, handleTextChange: this.onTextChange, text: this.filterText }),
            React.createElement("div", { className: "search-and-suggest" },
                React.createElement("div", { className: "suggest" },
                    React.createElement("div", { className: "list-group" }, suggestions),
                    !this.state.suggestionList.length &&
                        React.createElement("h2", null, "No Matches")),
                React.createElement(sliderBlock_1.default, { updateWeights: this.updateWeights })),
            React.createElement(acceptSet_1.default, { data: this.state.accepteds, commit: this.commit, toggleStale: this.toggleStale })));
    };
    return GroupSelectTool;
}(React.Component));
ReactDOM.render(React.createElement(GroupSelectTool, null), document.getElementById('content'));
// WEBPACK FOOTER //
// ./src/components/app.tsx 


/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map