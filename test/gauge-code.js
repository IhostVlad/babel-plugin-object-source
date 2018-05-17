"use strict";

exports.__esModule = true;

var _extends =
  Object.assign ||
  function(target) {
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

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _redux = require("redux");

var _resolveStorageLite = require("resolve-storage-lite");

var _resolveStorageLite2 = _interopRequireDefault(_resolveStorageLite);

var _resolveBusMemory = require("resolve-bus-memory");

var _resolveBusMemory2 = _interopRequireDefault(_resolveBusMemory);

var _RESOLVE_SERVER_CONFIG = require("RESOLVE_SERVER_CONFIG");

var _RESOLVE_SERVER_CONFIG2 = _interopRequireDefault(_RESOLVE_SERVER_CONFIG);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var emptyRootComponent = function emptyRootComponent() {
  return _react2.default.createElement(
    "div",
    null,
    "No root component provided! Please set it in resolve.server.config.js"
  );
};
var emptyCreateStore = function emptyCreateStore() {
  return (0, _redux.createStore)(function() {
    return {};
  }, {});
};

var defaultConfig = {
  entries: {
    rootComponent: emptyRootComponent,
    createStore: emptyCreateStore
  },
  bus: {
    adapter: _resolveBusMemory2.default
  },
  storage: {
    adapter: _resolveStorageLite2.default
  },
  initialState: function initialState() {
    return Promise.resolve({});
  },
  aggregates: [],
  initialSubscribedEvents: { types: [], ids: [] },
  filterSubscription: function filterSubscription(eventDescription) {
    return eventDescription;
  },
  jwt: {
    cookieName: "Jwt-Cookie",
    options: { maxAge: 1000 * 60 * 5 },
    secret: "Keyboard-Kat"
  },
  auth: {
    strategies: []
  },
  readModels: [],
  viewModels: [],
  extendExpress: null,
  sagas: []
};

function extendConfig(inputConfig, defaultConfig) {
  var config = _extends({}, inputConfig);

  Object.keys(defaultConfig).forEach(function(key) {
    if (!config[key]) {
      config[key] = defaultConfig[key];
    } else if (
      defaultConfig[key] !== null &&
      defaultConfig[key].constructor === Object
    ) {
      Object.keys(defaultConfig[key]).forEach(function(innerKey) {
        if (!config[key][innerKey]) {
          config[key][innerKey] = defaultConfig[key][innerKey];
        }
      });
    }
  });

  return config;
}

exports.default = extendConfig(_RESOLVE_SERVER_CONFIG2.default, defaultConfig);
