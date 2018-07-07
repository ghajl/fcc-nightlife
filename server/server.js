/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/server/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./server/config.js":
/*!**************************!*\
  !*** ./server/config.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar config = {\n  MONGOLAB_URI: 'mongodb://ghajl:tosha46@ds133127.mlab.com:33127/fcc-urlsm',\n  FACEBOOK_APP_ID: '232975173926881',\n  FACEBOOK_APP_SECRET: 'f51dda20c94aa9aaa830c3d83addc4da',\n  SESSION_SECRET: 'adfs2345hjoiu8798'\n};\n\nexports.default = config;\n\n//# sourceURL=webpack:///./server/config.js?");

/***/ }),

/***/ "./server/controllers/users.js":
/*!*************************************!*\
  !*** ./server/controllers/users.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.getUsersList = exports.getUsersBarsData = exports.register = undefined;\n\n// TODO: two phase commit\nvar addUserToBar = function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {\n    var _req$body, userID, placeID;\n\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _req$body = req.body, userID = _req$body.userID, placeID = _req$body.placeID;\n            _context.prev = 1;\n            _context.next = 4;\n            return _place2.default.findOneAndUpdate({ placeID: placeID }, { $addToSet: { users: userID } }, { upsert: true });\n\n          case 4:\n            _context.next = 6;\n            return _user2.default.findByIdAndUpdate(req.user.id, { $addToSet: { places: placeID } });\n\n          case 6:\n            return _context.abrupt('return', res.sendStatus(200));\n\n          case 9:\n            _context.prev = 9;\n            _context.t0 = _context['catch'](1);\n            _context.prev = 11;\n            _context.next = 14;\n            return _place2.default.findOneAndUpdate({ placeID: placeID }, { $pull: { users: userID } });\n\n          case 14:\n            _context.next = 16;\n            return _user2.default.findByIdAndUpdate(req.user.id, { $pull: { places: placeID } });\n\n          case 16:\n            return _context.abrupt('return', res.sendStatus(409));\n\n          case 19:\n            _context.prev = 19;\n            _context.t1 = _context['catch'](11);\n            return _context.abrupt('return', res.sendStatus(409));\n\n          case 22:\n          case 'end':\n            return _context.stop();\n        }\n      }\n    }, _callee, this, [[1, 9], [11, 19]]);\n  }));\n\n  return function addUserToBar(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nvar removeUserFromBar = function () {\n  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {\n    var _req$body2, userID, placeID;\n\n    return regeneratorRuntime.wrap(function _callee2$(_context2) {\n      while (1) {\n        switch (_context2.prev = _context2.next) {\n          case 0:\n            _req$body2 = req.body, userID = _req$body2.userID, placeID = _req$body2.placeID;\n            _context2.prev = 1;\n            _context2.next = 4;\n            return _place2.default.findOneAndUpdate({ placeID: placeID }, { $pull: { users: userID } });\n\n          case 4:\n            _context2.next = 6;\n            return _user2.default.findByIdAndUpdate(req.user.id, { $pull: { places: placeID } });\n\n          case 6:\n            return _context2.abrupt('return', res.sendStatus(200));\n\n          case 9:\n            _context2.prev = 9;\n            _context2.t0 = _context2['catch'](1);\n            _context2.prev = 11;\n            _context2.next = 14;\n            return _place2.default.findOneAndUpdate({ placeID: placeID }, { $addToSet: { users: userID } });\n\n          case 14:\n            _context2.next = 16;\n            return _user2.default.findByIdAndUpdate(req.user.id, { $addToSet: { places: placeID } });\n\n          case 16:\n            return _context2.abrupt('return', res.sendStatus(409));\n\n          case 19:\n            _context2.prev = 19;\n            _context2.t1 = _context2['catch'](11);\n            return _context2.abrupt('return', res.sendStatus(409));\n\n          case 22:\n          case 'end':\n            return _context2.stop();\n        }\n      }\n    }, _callee2, this, [[1, 9], [11, 19]]);\n  }));\n\n  return function removeUserFromBar(_x3, _x4) {\n    return _ref2.apply(this, arguments);\n  };\n}();\n\n// user adds/removes himself to/from the list of users that are going to the bar -\n// add/remove username to/from list of users in Place and\n// add/remove place id to/from list of places in User\n\n\nvar register = exports.register = function () {\n  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {\n    var _req$body3, username, password, newUser, user, newuser;\n\n    return regeneratorRuntime.wrap(function _callee3$(_context3) {\n      while (1) {\n        switch (_context3.prev = _context3.next) {\n          case 0:\n            _req$body3 = req.body, username = _req$body3.username, password = _req$body3.password;\n            newUser = new _user2.default({ username: username, password: password });\n            _context3.prev = 2;\n            _context3.next = 5;\n            return _user2.default.findOne({ username: username });\n\n          case 5:\n            user = _context3.sent;\n\n            if (!user) {\n              _context3.next = 8;\n              break;\n            }\n\n            return _context3.abrupt('return', res.sendStatus(409));\n\n          case 8:\n            _context3.next = 10;\n            return newUser.save();\n\n          case 10:\n            newuser = _context3.sent;\n            return _context3.abrupt('return', req.logIn(newuser, function (loginErr) {\n              if (loginErr) {\n                return res.sendStatus(401);\n              }\n              return res.json({ userID: newuser.id });\n            }));\n\n          case 14:\n            _context3.prev = 14;\n            _context3.t0 = _context3['catch'](2);\n            return _context3.abrupt('return', res.sendStatus(401));\n\n          case 17:\n          case 'end':\n            return _context3.stop();\n        }\n      }\n    }, _callee3, this, [[2, 14]]);\n  }));\n\n  return function register(_x5, _x6) {\n    return _ref3.apply(this, arguments);\n  };\n}();\n\n// returns - if exist - list of guests of bars on page\n\n\nvar getUsersBarsData = exports.getUsersBarsData = function () {\n  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {\n    var bars, locationPlaces, currentUserBars, _req$user, _req$user$username, username, _req$user$profile, profile, id, placesUsersData;\n\n    return regeneratorRuntime.wrap(function _callee4$(_context4) {\n      while (1) {\n        switch (_context4.prev = _context4.next) {\n          case 0:\n            bars = req.query.bars;\n\n            if (!(bars == null)) {\n              _context4.next = 3;\n              break;\n            }\n\n            return _context4.abrupt('return', res.sendStatus(400));\n\n          case 3:\n            if (!(req.user == null)) {\n              _context4.next = 5;\n              break;\n            }\n\n            return _context4.abrupt('return', res.sendStatus(401));\n\n          case 5:\n            _context4.prev = 5;\n            _context4.next = 8;\n            return _place2.default.find({ placeID: { $in: bars } }, 'placeID users');\n\n          case 8:\n            locationPlaces = _context4.sent;\n            currentUserBars = [];\n\n            currentUserBars = bars.filter(function (barID) {\n              return req.user.places.indexOf(barID) !== -1;\n            });\n            _req$user = req.user, _req$user$username = _req$user.username, username = _req$user$username === undefined ? null : _req$user$username, _req$user$profile = _req$user.profile, profile = _req$user$profile === undefined ? null : _req$user$profile, id = _req$user.id;\n            placesUsersData = locationPlaces.map(function (place) {\n              return { placeID: place.placeID, users: place.users.length };\n            });\n            return _context4.abrupt('return', res.json({\n              placesUsersData: placesUsersData,\n              currentUserBars: currentUserBars,\n              username: username,\n              profile: profile,\n              userID: id\n            }));\n\n          case 16:\n            _context4.prev = 16;\n            _context4.t0 = _context4['catch'](5);\n            return _context4.abrupt('return', res.sendStatus(409));\n\n          case 19:\n          case 'end':\n            return _context4.stop();\n        }\n      }\n    }, _callee4, this, [[5, 16]]);\n  }));\n\n  return function getUsersBarsData(_x7, _x8) {\n    return _ref4.apply(this, arguments);\n  };\n}();\n\nvar getUsersList = exports.getUsersList = function () {\n  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {\n    var placeID, data, users, result;\n    return regeneratorRuntime.wrap(function _callee5$(_context5) {\n      while (1) {\n        switch (_context5.prev = _context5.next) {\n          case 0:\n            placeID = req.query.placeID;\n\n            if (!(placeID == null)) {\n              _context5.next = 3;\n              break;\n            }\n\n            return _context5.abrupt('return', res.sendStatus(400));\n\n          case 3:\n            _context5.prev = 3;\n            _context5.next = 6;\n            return _place2.default.findOne({ placeID: placeID }, 'users');\n\n          case 6:\n            data = _context5.sent;\n\n            if (!(data.users == null || data.users.length === 0)) {\n              _context5.next = 9;\n              break;\n            }\n\n            throw new Error('no data');\n\n          case 9:\n            _context5.next = 11;\n            return _user2.default.find({ _id: { $in: data.users } });\n\n          case 11:\n            users = _context5.sent;\n            result = users.map(function (userdata) {\n              if (userdata.profile != null && (userdata.profile.givenName != null || userdata.profile.familyName != null)) {\n                return userdata.profile.givenName + ' ' + userdata.profile.familyName;\n              }\n              if (userdata.username != null) {\n                return userdata.username;\n              }\n              return 'guest';\n            });\n            return _context5.abrupt('return', res.json({ users: result }));\n\n          case 16:\n            _context5.prev = 16;\n            _context5.t0 = _context5['catch'](3);\n            return _context5.abrupt('return', res.sendStatus(409));\n\n          case 19:\n          case 'end':\n            return _context5.stop();\n        }\n      }\n    }, _callee5, this, [[3, 16]]);\n  }));\n\n  return function getUsersList(_x9, _x10) {\n    return _ref5.apply(this, arguments);\n  };\n}();\n\nexports.login = login;\nexports.logout = logout;\nexports.modifyPlaceList = modifyPlaceList;\nexports.getUserData = getUserData;\n\nvar _passport = __webpack_require__(/*! passport */ \"passport\");\n\nvar _passport2 = _interopRequireDefault(_passport);\n\nvar _user = __webpack_require__(/*! ../models/user */ \"./server/models/user.js\");\n\nvar _user2 = _interopRequireDefault(_user);\n\nvar _place = __webpack_require__(/*! ../models/place */ \"./server/models/place.js\");\n\nvar _place2 = _interopRequireDefault(_place);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\nfunction login(req, res, next) {\n  _passport2.default.authenticate('local', function (err, user) {\n    if (err) return next(err);\n    if (!user) {\n      return res.sendStatus(401);\n    }\n    return req.logIn(user, function (loginErr) {\n      if (loginErr) {\n        return res.sendStatus(401);\n      }\n      var currentBars = req.body.places;\n      var currentUserBars = currentBars.filter(function (barID) {\n        return user.places.indexOf(barID) !== -1;\n      });\n      return res.json({ places: currentUserBars, userID: user.id });\n    });\n  })(req, res, next);\n}\n\n// -------------------------------------------\n\nfunction logout(req, res) {\n  // the logout method is added to the request object automatically by Passport\n  req.logout();\n  return res.sendStatus(200);\n}function modifyPlaceList(req, res) {\n  if (!req.isAuthenticated()) return res.sendStatus(401); // user logged out on another tab\n  if (req.user.id !== req.body.userID) {\n    return res.sendStatus(403); // user logged in to another account on different tab\n  }\n  if (req.body.operation === 'ADD') {\n    return addUserToBar(req, res);\n  }\n  if (req.body.operation === 'REMOVE') {\n    return removeUserFromBar(req, res);\n  }\n  return res.sendStatus(400);\n}\n\nfunction getUserData(req, res) {\n  if (!req.user) {\n    return res.sendStatus(401);\n  }\n  var _req$user2 = req.user,\n      username = _req$user2.username,\n      profile = _req$user2.profile,\n      id = _req$user2.id;\n\n  return res.json({ username: username, profile: profile, userID: id });\n}\n\n//# sourceURL=webpack:///./server/controllers/users.js?");

/***/ }),

/***/ "./server/index.js":
/*!*************************!*\
  !*** ./server/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nvar _webpack = __webpack_require__(/*! webpack */ \"webpack\");\n\nvar _webpack2 = _interopRequireDefault(_webpack);\n\nvar _passport = __webpack_require__(/*! passport */ \"passport\");\n\nvar _passport2 = _interopRequireDefault(_passport);\n\nvar _passportLocal = __webpack_require__(/*! passport-local */ \"passport-local\");\n\nvar _passportFacebook = __webpack_require__(/*! passport-facebook */ \"passport-facebook\");\n\nvar _expressSession = __webpack_require__(/*! express-session */ \"express-session\");\n\nvar _expressSession2 = _interopRequireDefault(_expressSession);\n\nvar _bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nvar _bodyParser2 = _interopRequireDefault(_bodyParser);\n\nvar _connectMongo = __webpack_require__(/*! connect-mongo */ \"connect-mongo\");\n\nvar _connectMongo2 = _interopRequireDefault(_connectMongo);\n\nvar _routes = __webpack_require__(/*! ./init/routes */ \"./server/init/routes.js\");\n\nvar _routes2 = _interopRequireDefault(_routes);\n\nvar _user = __webpack_require__(/*! ./models/user */ \"./server/models/user.js\");\n\nvar _user2 = _interopRequireDefault(_user);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// import webpackDevMiddleware from 'webpack-dev-middleware';\n// import webpackHotMiddleware from 'webpack-hot-middleware';\n// import webpackConfig from '../../webpack.config.js';\nvar app = (0, _express2.default)();\n// const compiler = webpack(webpackConfig);\nvar cors = __webpack_require__(/*! cors */ \"cors\");\nvar config = null;\nvar isDev = \"development\" === \"development\";\nif (isDev) {\n  config = __webpack_require__(/*! ./config */ \"./server/config.js\").default;\n\n  // app.use(webpackDevMiddleware(compiler, {\n  //     publicPath: webpackConfig.output.publicPath\n  // }));\n  // app.use(webpackHotMiddleware(compiler));\n  // app.use(cors({\n  //     origin: 'http://localhost:3000/',\n  //     credentials: true\n  // }));\n}\n\napp.use('/public', _express2.default.static(process.cwd() + '/public'));\napp.use('/dist', _express2.default.static(process.cwd() + '/dist'));\nvar mongoDB = process.env.MONGOLAB_URI || config.MONGOLAB_URI;\nvar mongoOptions = {\n  useMongoClient: true,\n  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect\n  reconnectInterval: 500 // Reconnect every 500ms\n};\nvar connect = function connect() {\n  _mongoose2.default.connect(mongoDB, mongoOptions, function (err, res) {\n    if (err) {\n      console.log(\"Error connecting\");\n    } else {\n      console.log(\"Successfully connected\");\n    }\n  });\n};\nconnect();\n_mongoose2.default.Promise = global.Promise;\nvar db = _mongoose2.default.connection;\ndb.on(\"error\", console.error);\ndb.on(\"disconnected\", connect);\n\n_passport2.default.use(new _passportLocal.Strategy(function (username, password, cb) {\n  _user2.default.findOne({ username: username }, function (err, user) {\n    if (err) {\n      return cb(err);\n    }\n    if (!user) return cb(null, false, { message: \"User not found\" });\n    user.comparePassword(password, function (err, isMatch) {\n      if (isMatch) {\n        return cb(null, user);\n      } else {\n        return cb(null, false, { message: \"Invalid username or password\" });\n      }\n    });\n  });\n}));\nvar facebookId = process.env.FACEBOOK_APP_ID || config.FACEBOOK_APP_ID;\nvar facebookSecret = process.env.FACEBOOK_APP_SECRET || config.FACEBOOK_APP_SECRET;\n_passport2.default.use(new _passportFacebook.Strategy({\n  clientID: facebookId,\n  clientSecret: facebookSecret,\n  callbackURL: 'https://fcc-barcoordinator.herokuapp.com/auth/facebook/callback',\n  profileFields: ['id', 'name']\n}, function (accessToken, refreshToken, profile, cb) {\n  _user2.default.findOne({ facebookID: profile.id }, function (err, user) {\n    if (err) {\n      console.log(err);\n      return cb(err);\n    }\n    if (user) {\n      return cb(null, user);\n    }\n    var newUser = new _user2.default();\n    newUser.facebookID = profile.id;\n    newUser.profile.givenName = profile.name && profile.name.givenName || '';\n    newUser.profile.familyName = profile.name && profile.name.familyName || '';\n    newUser.save(function (err) {\n      cb(err, newUser);\n    });\n  });\n}));\n\n_passport2.default.serializeUser(function (user, done) {\n  done(null, user.id);\n});\n\n_passport2.default.deserializeUser(function (id, done) {\n  _user2.default.findById(id, function (err, user) {\n    done(err, user);\n  });\n});\n\nvar MongoStore = (0, _connectMongo2.default)(_expressSession2.default);\n\napp.use(__webpack_require__(/*! cookie-parser */ \"cookie-parser\")());\napp.use(_bodyParser2.default.json());\napp.use(_bodyParser2.default.urlencoded({ extended: true }));\n\nvar sessionSecret = process.env.SESSION_SECRET || config.SESSION_SECRET;\napp.use((0, _expressSession2.default)({\n  secret: sessionSecret,\n  resave: false,\n  saveUninitialized: false,\n  cookie: { maxAge: 24 * 60 * 60 * 1000 },\n  store: new MongoStore({\n    url: mongoDB,\n    autoReconnect: true\n  })\n}));\n\n// Initialize Passport and restore authentication state, if any, from the\n// session.\napp.use(_passport2.default.initialize());\napp.use(_passport2.default.session());\napp.options('*', cors());\n\napp.get('/privacypolicy', function (req, res) {\n  res.sendFile(process.cwd() + \"/public/privacypolicy.htm\");\n});\n\n(0, _routes2.default)(app, _passport2.default);\nvar bundlePath = \"/dist/bundle.js\";\napp.all(\"*\", function (req, res, next) {\n\n  var appHTML = \"<!doctype html>\\n  <html lang=\\\"\\\">\\n  <head>\\n    <meta http-equiv=\\\"Content-Type\\\" content=\\\"text/html;charset=utf-8\\\" />\\n    <meta name=\\\"viewport\\\" content=\\\"user-scalable=0, initial-scale=1, minimum-scale=1, width=device-width, height=device-height\\\">\\n    <link type=\\\"text/css\\\" rel=\\\"stylesheet\\\" href=\\\"public/main.css\\\">\\n      <link rel=\\\"stylesheet\\\" href=\\\"https://fonts.googleapis.com/css?family=Roboto:300,400,500|Patrick+Hand+SC\\\"/>\\n      <script type=\\\"text/javascript\\\" src=\\\"https://maps.googleapis.com/maps/api/js?key=AIzaSyBPQYCvM0i495Py8i7GV3wn2odaGbwGPPo&libraries=geometry,drawing,places\\\"></script>\\n\\n      <title>freeCodeCamp - Nightlife Coordination App</title>\\n    \\n  </head>\\n  <body>\\n    <div id=\\\"root\\\"></div>\\n\\n    <script src=\" + bundlePath + \"></script>\\n  </body>\\n  </html>\";\n\n  res.status(200).end(appHTML);\n});\nvar port = process.env.PORT || 3000;\napp.listen(port, function () {\n  console.log('app listening on port ' + port + '\\n');\n});\n\n//# sourceURL=webpack:///./server/index.js?");

/***/ }),

/***/ "./server/init/routes.js":
/*!*******************************!*\
  !*** ./server/init/routes.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _users = __webpack_require__(/*! ../controllers/users */ \"./server/controllers/users.js\");\n\nexports.default = function (app, passport) {\n  app.post('/login', _users.login);\n  app.get('/logout', _users.logout);\n  app.post('/signup', _users.register);\n  app.post('/places', _users.modifyPlaceList);\n  app.get('/data', _users.getUsersBarsData);\n  app.get('/user', _users.getUserData);\n  app.get('/userslist', _users.getUsersList);\n  app.get('/auth/facebook', passport.authenticate('facebook'));\n  app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/signup' }), function (req, res) {\n    res.redirect('/return-from-success-login');\n  });\n};\n\n//# sourceURL=webpack:///./server/init/routes.js?");

/***/ }),

/***/ "./server/models/place.js":
/*!********************************!*\
  !*** ./server/models/place.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar PlaceSchema = new _mongoose2.default.Schema({\n  placeID: {\n    type: String,\n    unique: true\n  },\n  users: [String]\n});\n\nvar Place = _mongoose2.default.model('Place', PlaceSchema);\nexports.default = Place;\n\n//# sourceURL=webpack:///./server/models/place.js?");

/***/ }),

/***/ "./server/models/user.js":
/*!*******************************!*\
  !*** ./server/models/user.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _bcryptNodejs = __webpack_require__(/*! bcrypt-nodejs */ \"bcrypt-nodejs\");\n\nvar _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);\n\nvar _mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar UserSchema = new _mongoose2.default.Schema({\n  username: {\n    type: String,\n    unique: true,\n    sparse: true\n  },\n  password: String,\n  places: [String],\n  profile: {\n    givenName: String,\n    familyName: String\n  },\n  facebookID: {\n    type: String,\n    unique: true,\n    sparse: true\n  }\n});\n\nUserSchema.pre('save', function presave(next) {\n  var user = this;\n\n  if (!user.isModified('password')) {\n    next();\n    return;\n  }\n\n  _bcryptNodejs2.default.genSalt(10, function (err, salt) {\n    if (err) {\n      next(err);\n      return;\n    }\n    _bcryptNodejs2.default.hash(user.password, salt, null, function (herr, hash) {\n      if (herr) {\n        next(herr);\n        return;\n      }\n      user.password = hash;\n      next();\n    });\n  });\n});\n\nUserSchema.methods = {\n  comparePassword: function comparePassword(candidatePassword, cb) {\n    _bcryptNodejs2.default.compare(candidatePassword, this.password, function (err, isMatch) {\n      if (err) {\n        cb(err);\n        return;\n      }\n      cb(null, isMatch);\n    });\n  }\n};\n\nvar User = _mongoose2.default.model('User', UserSchema);\nexports.default = User;\n\n//# sourceURL=webpack:///./server/models/user.js?");

/***/ }),

/***/ 0:
/*!**********************************************!*\
  !*** multi babel-polyfill ./server/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! babel-polyfill */\"babel-polyfill\");\nmodule.exports = __webpack_require__(/*! ./server/index.js */\"./server/index.js\");\n\n\n//# sourceURL=webpack:///multi_babel-polyfill_./server/index.js?");

/***/ }),

/***/ "babel-polyfill":
/*!*********************************!*\
  !*** external "babel-polyfill" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"babel-polyfill\");\n\n//# sourceURL=webpack:///external_%22babel-polyfill%22?");

/***/ }),

/***/ "bcrypt-nodejs":
/*!********************************!*\
  !*** external "bcrypt-nodejs" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcrypt-nodejs\");\n\n//# sourceURL=webpack:///external_%22bcrypt-nodejs%22?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "connect-mongo":
/*!********************************!*\
  !*** external "connect-mongo" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"connect-mongo\");\n\n//# sourceURL=webpack:///external_%22connect-mongo%22?");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cookie-parser\");\n\n//# sourceURL=webpack:///external_%22cookie-parser%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-session\");\n\n//# sourceURL=webpack:///external_%22express-session%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport\");\n\n//# sourceURL=webpack:///external_%22passport%22?");

/***/ }),

/***/ "passport-facebook":
/*!************************************!*\
  !*** external "passport-facebook" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-facebook\");\n\n//# sourceURL=webpack:///external_%22passport-facebook%22?");

/***/ }),

/***/ "passport-local":
/*!*********************************!*\
  !*** external "passport-local" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-local\");\n\n//# sourceURL=webpack:///external_%22passport-local%22?");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack\");\n\n//# sourceURL=webpack:///external_%22webpack%22?");

/***/ })

/******/ });