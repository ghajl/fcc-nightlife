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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/actions.js":
/*!************************!*\
  !*** ./src/actions.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.actionTypes = undefined;\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nexports.closeMessage = closeMessage;\nexports.openLoginDialog = openLoginDialog;\nexports.closeLoginDialog = closeLoginDialog;\nexports.openLoginMenu = openLoginMenu;\nexports.closeLoginMenu = closeLoginMenu;\nexports.manualLogin = manualLogin;\nexports.signUp = signUp;\nexports.logOut = logOut;\nexports.findLocation = findLocation;\nexports.showPlaces = showPlaces;\nexports.addToList = addToList;\nexports.removeFromList = removeFromList;\nexports.toLogIn = toLogIn;\nexports.toSignUp = toSignUp;\nexports.loginAndAdd = loginAndAdd;\nexports.setLocation = setLocation;\nexports.replaceLocation = replaceLocation;\nexports.setPlacesLocation = setPlacesLocation;\nexports.highlightPlace = highlightPlace;\nexports.footerHeight = footerHeight;\nexports.headerHeight = headerHeight;\n\nvar _reactRouterRedux = __webpack_require__(/*! react-router-redux */ \"react-router-redux\");\n\nvar _axios = __webpack_require__(/*! axios */ \"axios\");\n\nvar _axios2 = _interopRequireDefault(_axios);\n\nvar _store = __webpack_require__(/*! ./store */ \"./src/store.js\");\n\nvar _reactPlacesAutocomplete = __webpack_require__(/*! react-places-autocomplete */ \"react-places-autocomplete\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar actionTypes = exports.actionTypes = {\n\tMANUAL_LOGIN_USER: 'MANUAL_LOGIN_USER',\n\tLOGIN_SUCCESS_USER: 'LOGIN_SUCCESS_USER',\n\tLOGIN_ERROR_USER: 'LOGIN_ERROR_USER',\n\tSIGNUP_USER: 'SIGNUP_USER',\n\tSIGNUP_SUCCESS_USER: 'SIGNUP_SUCCESS_USER',\n\tSIGNUP_ERROR_USER: 'SIGNUP_ERROR_USER',\n\tLOGOUT_USER: 'LOGOUT_USER',\n\tLOGOUT_SUCCESS_USER: 'LOGOUT_SUCCESS_USER',\n\tLOGOUT_ERROR_USER: 'LOGOUT_ERROR_USER',\n\tFIND_LOCATION: 'FIND_LOCATION',\n\tFIND_LOCATION_SUCCESS: 'FIND_LOCATION_SUCCESS',\n\tFIND_LOCATION_ERROR: 'FIND_LOCATION_ERROR',\n\tFIND_PLACES: 'FIND_PLACES',\n\tFIND_PLACES_SUCCESS: 'FIND_PLACES_SUCCESS',\n\tFIND_PLACES_ERROR: 'FIND_PLACES_ERROR',\n\tADD_TO_LIST: 'ADD_TO_LIST',\n\tADD_TO_LIST_SUCCESS: 'ADD_TO_LIST_SUCCESS',\n\tADD_TO_LIST_ERROR: 'ADD_TO_LIST_ERROR',\n\tREMOVE_FROM_LIST: 'REMOVE_FROM_LIST',\n\tREMOVE_FROM_LIST_SUCCESS: 'REMOVE_FROM_LIST_SUCCESS',\n\tREMOVE_FROM_LIST_ERROR: 'REMOVE_FROM_LIST_ERROR',\n\tSAVE_PATH: 'SAVE_PATH',\n\tSAVE_GUEST_BAR: 'SAVE_GUEST_BAR',\n\tOPEN_LOGIN_DIALOG: 'OPEN_LOGIN_DIALOG',\n\tCLOSE_LOGIN_DIALOG: 'CLOSE_LOGIN_DIALOG',\n\tSHOW_MESSAGE_DIALOG: 'SHOW_MESSAGE_DIALOG',\n\tCLOSE_MESSAGE_DIALOG: 'CLOSE_MESSAGE_DIALOG',\n\tOPEN_LOGIN_MENU: 'OPEN_LOGIN_MENU',\n\tCLOSE_LOGIN_MENU: 'CLOSE_LOGIN_MENU',\n\tHIGHLIGHT_PLACE: 'HIGHLIGHT_PLACE',\n\tFOOTER_HEIGHT: 'FOOTER_HEIGHT',\n\tHEADER_HEIGHT: 'HEADER_HEIGHT'\n};\n\nfunction beginLogin() {\n\treturn { type: actionTypes.MANUAL_LOGIN_USER };\n}\n\nfunction loginSuccess(username, places, message) {\n\treturn {\n\t\ttype: actionTypes.LOGIN_SUCCESS_USER,\n\t\tmessage: message,\n\t\tusername: username,\n\t\tplaces: places\n\t};\n}\n\nfunction loginError(message) {\n\treturn {\n\t\ttype: actionTypes.LOGIN_ERROR_USER,\n\t\tmessage: message\n\t};\n}\n\nfunction signUpError(message) {\n\treturn {\n\t\ttype: actionTypes.SIGNUP_ERROR_USER,\n\t\tmessage: message\n\t};\n}\n\nfunction beginSignUp() {\n\treturn { type: actionTypes.SIGNUP_USER };\n}\n\nfunction signUpSuccess(username, places, message) {\n\treturn {\n\t\ttype: actionTypes.SIGNUP_SUCCESS_USER,\n\t\tmessage: message,\n\t\tusername: username,\n\t\tplaces: places\n\t};\n}\n\nfunction beginLogout() {\n\treturn { type: actionTypes.LOGOUT_USER };\n}\n\nfunction logoutSuccess() {\n\treturn { type: actionTypes.LOGOUT_SUCCESS_USER };\n}\n\nfunction logoutError() {\n\treturn { type: actionTypes.LOGOUT_ERROR_USER };\n}\n\nfunction beginLocationSearch() {\n\treturn { type: actionTypes.FIND_LOCATION };\n}\n\nfunction searchLocationSuccess(address, lat, lng) {\n\treturn { type: actionTypes.FIND_LOCATION_SUCCESS,\n\t\tlocation: address,\n\t\tlat: lat,\n\t\tlng: lng\n\t};\n}\n\nfunction searchLocationError(message) {\n\treturn { type: actionTypes.FIND_LOCATION_ERROR,\n\t\tmessage: message\n\t};\n}\n\nfunction beginPlacesSearch() {\n\treturn { type: actionTypes.FIND_PLACES };\n}\n\nfunction searchPlacesSuccess(data, address, lat, lng) {\n\treturn { type: actionTypes.FIND_PLACES_SUCCESS,\n\t\tdata: data,\n\t\taddress: address,\n\t\tlat: lat,\n\t\tlng: lng\n\t};\n}\n\nfunction searchPlacesError(message) {\n\treturn { type: actionTypes.FIND_PLACES_ERROR,\n\t\tmessage: message\n\t};\n}\n\nfunction beginAddToList() {\n\treturn { type: actionTypes.ADD_TO_LIST };\n}\n\nfunction addToListSuccess(placeID, message) {\n\treturn { type: actionTypes.ADD_TO_LIST_SUCCESS,\n\t\tplaceID: placeID,\n\t\tmessage: message\n\t};\n}\n\nfunction addToListError(message) {\n\treturn { type: actionTypes.ADD_TO_LIST_ERROR,\n\t\tmessage: message\n\t};\n}\n\nfunction beginRemoveFromList() {\n\treturn { type: actionTypes.REMOVE_FROM_LIST };\n}\n\nfunction removeFromListSuccess(placeID, message) {\n\tconsole.log(placeID);\n\treturn { type: actionTypes.REMOVE_FROM_LIST_SUCCESS,\n\t\tplaceID: placeID,\n\t\tmessage: message\n\t};\n}\n\nfunction removeFromListError(message) {\n\treturn { type: actionTypes.REMOVE_FROM_LIST_ERROR,\n\t\tmessage: message\n\t};\n}\n\nfunction saveCurrentPath(path) {\n\treturn {\n\t\ttype: actionTypes.SAVE_PATH,\n\t\tpath: path\n\t};\n}\n\nfunction saveGuestBar(placeID) {\n\treturn {\n\t\ttype: actionTypes.SAVE_GUEST_BAR,\n\t\tplaceID: placeID\n\t};\n}\n\nfunction showMessage(message) {\n\treturn {\n\t\ttype: actionTypes.SHOW_MESSAGE_DIALOG,\n\t\tmessage: message\n\t};\n}\n\nfunction closeMessage() {\n\treturn { type: actionTypes.CLOSE_MESSAGE_DIALOG\n\t};\n}\n\nfunction openLoginDialog() {\n\treturn { type: actionTypes.OPEN_LOGIN_DIALOG\n\t};\n}\n\nfunction closeLoginDialog() {\n\treturn { type: actionTypes.CLOSE_LOGIN_DIALOG\n\t};\n}\n\nfunction openLoginMenu() {\n\treturn { type: actionTypes.OPEN_LOGIN_MENU\n\t};\n}\n\nfunction closeLoginMenu() {\n\treturn { type: actionTypes.CLOSE_LOGIN_MENU\n\t};\n}\n\nfunction manualLogin(data) {\n\n\treturn function (dispatch, getState) {\n\t\tdispatch(beginLogin());\n\n\t\treturn _axios2.default.post('/login', data).then(function (response) {\n\t\t\tdispatch(loginSuccess(data.username, response.data.places, 'You have been successfully logged in!'));\n\n\t\t\t//add user to users list in Place if user came here from add button on place cart\n\t\t\tif (getState().user.guestBar) {\n\t\t\t\tvar addData = {\n\t\t\t\t\tplaceID: getState().user.guestBar,\n\t\t\t\t\tusername: data.username,\n\t\t\t\t\toperation: 'ADD'\n\t\t\t\t};\n\t\t\t\tdispatch(beginAddToList());\n\n\t\t\t\treturn _axios2.default.post('/places', addData).then(function (response) {\n\t\t\t\t\tdispatch(addToListSuccess(addData.placeID, 'You have successfully added to the list!'));\n\t\t\t\t}).catch(function (err) {\n\t\t\t\t\tdispatch(addToListError(\"Add to the bar request could not be completed\"));\n\t\t\t\t});\n\t\t\t}\n\t\t}).catch(function (err) {\n\t\t\tdispatch(loginError('Invalid username or password'));\n\t\t});\n\t};\n}\n\nfunction signUp(data) {\n\treturn function (dispatch, getState) {\n\t\tvar path = getState().user.signupReturnPath;\n\t\tdispatch(beginSignUp());\n\t\treturn _axios2.default.post('/signup', data).then(function (response) {\n\t\t\tdispatch(signUpSuccess(data.username, [], 'You have successfully registered an account!'));\n\t\t\t//add user to users list in Place if user came here from add button on place cart\n\t\t\tif (getState().user.guestBar) {\n\t\t\t\tvar addData = {\n\t\t\t\t\tplaceID: getState().user.guestBar,\n\t\t\t\t\tusername: data.username,\n\t\t\t\t\toperation: 'ADD'\n\t\t\t\t};\n\t\t\t\tdispatch(beginAddToList());\n\n\t\t\t\treturn _axios2.default.post('/places', addData).then(function (response) {\n\t\t\t\t\tdispatch(addToListSuccess(addData.placeID, 'You have successfully added to the list!'));\n\t\t\t\t\tdispatch((0, _reactRouterRedux.push)(path));\n\t\t\t\t}).catch(function (err) {\n\t\t\t\t\tdispatch(addToListError(\"Add to the bar request could not be completed\"));\n\t\t\t\t});\n\t\t\t} else {\n\n\t\t\t\tdispatch((0, _reactRouterRedux.push)(path));\n\t\t\t}\n\t\t}).catch(function (err) {\n\t\t\tdispatch(signUpError('Something went wrong when signing up'));\n\t\t});\n\t};\n}\n\nfunction logOut() {\n\n\treturn function (dispatch) {\n\n\t\tdispatch(beginLogout());\n\n\t\treturn _axios2.default.get('/logout').then(function (response) {\n\t\t\t(0, _store.getPersistor)().purge();\n\t\t\tdispatch(logoutSuccess());\n\t\t}).catch(function (err) {\n\n\t\t\tdispatch(logoutError());\n\t\t});\n\t};\n}\n\nfunction findLocation(address) {\n\treturn function (dispatch) {\n\n\t\tdispatch(beginLocationSearch());\n\n\t\treturn (0, _reactPlacesAutocomplete.geocodeByAddress)(address).then(function (results) {\n\t\t\treturn (0, _reactPlacesAutocomplete.getLatLng)(results[0]);\n\t\t}).then(function (_ref) {\n\t\t\tvar lat = _ref.lat,\n\t\t\t    lng = _ref.lng;\n\n\t\t\tdispatch(searchLocationSuccess(address, lat, lng));\n\t\t}).catch(function (err) {\n\t\t\tdispatch(searchLocationError(\"Your request could not be completed, something wrong with the address\"));\n\t\t});\n\t};\n}\n\nfunction showPlaces(service, address) {\n\treturn function (dispatch, getState) {\n\n\t\tdispatch(beginPlacesSearch());\n\n\t\treturn (0, _reactPlacesAutocomplete.geocodeByAddress)(address).then(function (results) {\n\t\t\treturn (0, _reactPlacesAutocomplete.getLatLng)(results[0]);\n\t\t}).then(function (_ref2) {\n\t\t\tvar lat = _ref2.lat,\n\t\t\t    lng = _ref2.lng;\n\t\t\tvar username = getState().user.username;\n\n\t\t\tvar loc = new google.maps.LatLng(lat, lng);\n\t\t\tvar request = {\n\t\t\t\tlocation: loc,\n\t\t\t\tradius: '3000',\n\t\t\t\ttype: ['bar']\n\t\t\t};\n\n\t\t\tservice.nearbySearch(request, function (results, status, pagination) {\n\t\t\t\tif (status == google.maps.places.PlacesServiceStatus.OK) {\n\t\t\t\t\treturn _axios2.default.get('/data', {\n\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\tbars: results.map(function (item) {\n\t\t\t\t\t\t\t\treturn item.id;\n\t\t\t\t\t\t\t})\n\t\t\t\t\t\t}\n\t\t\t\t\t}).then(function (response) {\n\t\t\t\t\t\tvar res = results.map(function (item) {\n\t\t\t\t\t\t\tvar photoUrl = item.photos && item.photos[0] && item.photos[0].getUrl && item.photos[0].getUrl instanceof Function && item.photos[0].getUrl({ 'maxWidth': 200, 'maxHeight': 200 });\n\t\t\t\t\t\t\treturn { id: item.id,\n\t\t\t\t\t\t\t\tname: item.name,\n\t\t\t\t\t\t\t\tphotoUrl: photoUrl,\n\t\t\t\t\t\t\t\trating: item.rating,\n\t\t\t\t\t\t\t\tlocation: item.geometry.location,\n\t\t\t\t\t\t\t\taddress: item.vicinity,\n\t\t\t\t\t\t\t\tusers: [],\n\t\t\t\t\t\t\t\thighlighted: false };\n\t\t\t\t\t\t});\n\t\t\t\t\t\tresponse.data.places.forEach(function (item) {\n\t\t\t\t\t\t\tfor (var i in res) {\n\t\t\t\t\t\t\t\tif (item.placeID === res[i].id) {\n\n\t\t\t\t\t\t\t\t\tres[i].users = item.users.slice(0);\n\t\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t});\n\t\t\t\t\t\tdispatch(searchPlacesSuccess(res, address, lat, lng));\n\t\t\t\t\t}).catch(function (err) {\n\t\t\t\t\t\tdispatch(searchPlacesError(\"Unable to show results\"));\n\t\t\t\t\t});\n\t\t\t\t} else {\n\t\t\t\t\tdispatch(searchPlacesError(\"Unable to show results\"));\n\t\t\t\t}\n\t\t\t});\n\t\t}).catch(function (err) {\n\t\t\tdispatch(searchPlacesError(\"Unable to show results\"));\n\t\t});\n\t};\n}\n\nfunction addToList(data) {\n\n\treturn function (dispatch) {\n\t\tvar addData = _extends({}, data, { operation: 'ADD' });\n\t\tdispatch(beginAddToList());\n\n\t\treturn _axios2.default.post('/places', addData).then(function (response) {\n\n\t\t\tdispatch(addToListSuccess(data.placeID, 'You have successfully added to the list!'));\n\t\t}).catch(function (err) {\n\t\t\tdispatch(addToListError('Add to the bar request could not be completed'));\n\t\t});\n\t};\n}\n\nfunction removeFromList(data) {\n\n\treturn function (dispatch) {\n\t\tvar removeData = _extends({}, data, { operation: 'REMOVE' });\n\t\tdispatch(beginRemoveFromList());\n\t\treturn _axios2.default.post('/places', removeData).then(function (response) {\n\t\t\tdispatch(removeFromListSuccess(data.placeID, 'You have successfully removed from the list!'));\n\t\t}).catch(function (err) {\n\t\t\tdispatch(removeFromListError('Remove from the bar request could not be completed'));\n\t\t});\n\t};\n}\n\nfunction toLogIn() {\n\treturn function (dispatch) {\n\t\tdispatch(openLoginDialog());\n\t};\n}\n\nfunction toSignUp(path) {\n\treturn function (dispatch) {\n\t\tdispatch(saveCurrentPath(path.pathname + path.search));\n\t\tdispatch((0, _reactRouterRedux.push)(\"/signup\"));\n\t};\n}\n\nfunction loginAndAdd(placeID) {\n\treturn function (dispatch) {\n\t\tdispatch(saveGuestBar(placeID));\n\t\tdispatch(toLogIn());\n\t};\n}\n\n//sets url for home page\nfunction setLocation(address, pathname) {\n\treturn function (dispatch) {\n\t\tdispatch((0, _reactRouterRedux.push)(pathname + '?loc=' + address));\n\t};\n}\n\nfunction replaceLocation(address, pathname) {\n\treturn function (dispatch) {\n\t\tdispatch((0, _reactRouterRedux.replace)(pathname + '?loc=' + address));\n\t};\n}\n\n//sets url for page that shows list of bars \nfunction setPlacesLocation(address) {\n\treturn function (dispatch) {\n\t\tdispatch((0, _reactRouterRedux.push)('/places?loc=' + address + '&bar=show'));\n\t};\n}\n\nfunction highlightPlace(placeID) {\n\treturn { type: actionTypes.HIGHLIGHT_PLACE,\n\t\tplaceID: placeID\n\t};\n}\n\nfunction footerHeight(height) {\n\treturn { type: actionTypes.FOOTER_HEIGHT,\n\t\theight: height\n\t};\n}\n\nfunction headerHeight(height) {\n\treturn { type: actionTypes.HEADER_HEIGHT,\n\t\theight: height\n\t};\n}\n\n//# sourceURL=webpack:///./src/actions.js?");

/***/ }),

/***/ "./src/client/components/Footer.js":
/*!*****************************************!*\
  !*** ./src/client/components/Footer.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"prop-types\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _reactJss = __webpack_require__(/*! react-jss */ \"react-jss\");\n\nvar _reactJss2 = _interopRequireDefault(_reactJss);\n\nvar _compose = __webpack_require__(/*! recompose/compose */ \"recompose/compose\");\n\nvar _compose2 = _interopRequireDefault(_compose);\n\nvar _withWidth = __webpack_require__(/*! material-ui/utils/withWidth */ \"material-ui/utils/withWidth\");\n\nvar _withWidth2 = _interopRequireDefault(_withWidth);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar styles = {\n\twrapper: {\n\t\ttextAlign: 'center',\n\t\tbackgroundColor: 'white',\n\t\tboxShadow: '0 -3px 7px -6px #222'\n\t},\n\telement: {\n\t\tdisplay: 'inline-block',\n\t\tmaxWidth: '160px',\n\t\ttextAlign: 'center'\n\t},\n\tcontainer: {\n\t\tdisplay: 'inline-block',\n\t\twidth: 'auto',\n\t\ttextAlign: 'center'\n\t},\n\ticon: {\n\t\ttransition: '.4s',\n\t\tborderRadius: '50%',\n\t\tborder: '1px solid',\n\t\tborderColor: 'gray',\n\t\tpadding: '5px',\n\t\tmargin: '.5em',\n\t\twidth: '24px',\n\t\theight: '24px',\n\t\t'&:hover': {\n\t\t\tborderColor: 'black',\n\t\t\tbackgroundColor: 'black',\n\t\t\tfill: 'white'\n\t\t}\n\t},\n\ta: {\n\t\tcolor: 'gray',\n\t\tfill: 'gray',\n\n\t\t'&:hover': {\n\t\t\tcolor: 'black'\n\t\t}\n\t},\n\titem: {\n\t\tdisplay: 'flex',\n\t\tflexDirection: 'column',\n\t\talignItems: 'center',\n\t\tminWidth: '130px',\n\t\tfontSize: '.9em'\n\t},\n\tlink: {\n\t\tmargin: '5px auto 5px'\n\t}\n};\n\nvar Footer = function Footer(props) {\n\tvar classes = props.classes;\n\n\n\treturn _react2.default.createElement(\n\t\t'div',\n\t\t{ className: classes.wrapper, ref: function ref(elem) {\n\t\t\t\tif (elem) props.footerHeight(elem.offsetHeight + 1);\n\t\t\t} },\n\t\t_react2.default.createElement(\n\t\t\t'div',\n\t\t\t{ className: classes.container },\n\t\t\t_react2.default.createElement(\n\t\t\t\t'div',\n\t\t\t\t{ className: classes.element },\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\t{ className: classes.link },\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t'div',\n\t\t\t\t\t\tnull,\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t'a',\n\t\t\t\t\t\t\t{ href: 'https://github.com/ghajl/fcc-nightlife', target: '_blank', className: classes.a },\n\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t\t{ className: classes.item },\n\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\t'svg',\n\t\t\t\t\t\t\t\t\t{ className: classes.icon },\n\t\t\t\t\t\t\t\t\t_react2.default.createElement('path', { d: 'M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z' })\n\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t)\n\t\t\t\t\t)\n\t\t\t\t)\n\t\t\t),\n\t\t\t_react2.default.createElement(\n\t\t\t\t'div',\n\t\t\t\t{ className: classes.element },\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\t{ className: classes.link },\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t'div',\n\t\t\t\t\t\tnull,\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t'a',\n\t\t\t\t\t\t\t{ href: 'mailto:michaelknn@gmail.com?subject=Mail from BC', target: '_blank', className: classes.a },\n\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t\t{ className: classes.item },\n\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\t'svg',\n\t\t\t\t\t\t\t\t\t{ className: classes.icon },\n\t\t\t\t\t\t\t\t\t_react2.default.createElement('path', { d: 'M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z' })\n\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t)\n\t\t\t\t\t)\n\t\t\t\t)\n\t\t\t)\n\t\t)\n\t);\n};\n\nexports.default = (0, _compose2.default)((0, _reactJss2.default)(styles), (0, _withWidth2.default)())(Footer);\n\n//# sourceURL=webpack:///./src/client/components/Footer.js?");

/***/ }),

/***/ "./src/client/components/Header.js":
/*!*****************************************!*\
  !*** ./src/client/components/Header.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"prop-types\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _Button = __webpack_require__(/*! material-ui/Button */ \"material-ui/Button\");\n\nvar _Button2 = _interopRequireDefault(_Button);\n\nvar _AppBar = __webpack_require__(/*! material-ui/AppBar */ \"material-ui/AppBar\");\n\nvar _AppBar2 = _interopRequireDefault(_AppBar);\n\nvar _Toolbar = __webpack_require__(/*! material-ui/Toolbar */ \"material-ui/Toolbar\");\n\nvar _Toolbar2 = _interopRequireDefault(_Toolbar);\n\nvar _Typography = __webpack_require__(/*! material-ui/Typography */ \"material-ui/Typography\");\n\nvar _Typography2 = _interopRequireDefault(_Typography);\n\nvar _IconButton = __webpack_require__(/*! material-ui/IconButton */ \"material-ui/IconButton\");\n\nvar _IconButton2 = _interopRequireDefault(_IconButton);\n\nvar _AccountBox = __webpack_require__(/*! material-ui-icons/AccountBox */ \"material-ui-icons/AccountBox\");\n\nvar _AccountBox2 = _interopRequireDefault(_AccountBox);\n\nvar _styles = __webpack_require__(/*! material-ui/styles */ \"material-ui/styles\");\n\nvar _withWidth = __webpack_require__(/*! material-ui/utils/withWidth */ \"material-ui/utils/withWidth\");\n\nvar _withWidth2 = _interopRequireDefault(_withWidth);\n\nvar _compose = __webpack_require__(/*! recompose/compose */ \"recompose/compose\");\n\nvar _compose2 = _interopRequireDefault(_compose);\n\nvar _Menu = __webpack_require__(/*! material-ui/Menu */ \"material-ui/Menu\");\n\nvar _Menu2 = _interopRequireDefault(_Menu);\n\nvar _List = __webpack_require__(/*! material-ui/List */ \"material-ui/List\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar styles = function styles(theme) {\n    return {\n        nav: {\n            overflow: 'hidden'\n        },\n        logo: {\n            flex: 1,\n            'text-transform': 'none',\n            fontWeight: 900,\n            fontSize: '1.5em'\n        },\n        login: {\n            margin: 5\n\n        },\n        text: theme.typography.button,\n        title: {\n            color: theme.palette.text.secondary\n        }\n    };\n};\n\nvar Header = function (_Component) {\n    _inherits(Header, _Component);\n\n    function Header() {\n        _classCallCheck(this, Header);\n\n        var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this));\n\n        _this.handleMenu = function (event) {\n            event.preventDefault();\n            _this.props.openLoginMenu();\n        };\n\n        _this.handleMenuClose = function () {\n            _this.props.closeLoginMenu();\n        };\n\n        _this.logout = function (event) {\n\n            event.preventDefault();\n            _this.handleMenuClose();\n            _this.props.logOut();\n        };\n\n        _this.toLogIn = function (event) {\n\n            event.preventDefault();\n            _this.handleMenuClose();\n            _this.props.openLoginDialog();\n        };\n\n        _this.signUp = function (event) {\n\n            event.preventDefault();\n            console.log(_this.props);\n            _this.handleMenuClose();\n            if (_this.props.path.pathname != '/signup') _this.props.toSignUp(_this.props.path);\n        };\n\n        _this.menuAnchorEl = null;\n        return _this;\n    }\n\n    _createClass(Header, [{\n        key: 'render',\n        value: function render() {\n            var _this2 = this;\n\n            var _props = this.props,\n                classes = _props.classes,\n                isAuthenticated = _props.isAuthenticated,\n                username = _props.username,\n                props = _objectWithoutProperties(_props, ['classes', 'isAuthenticated', 'username']);\n\n            var open = props.loginMenuOpen;\n            return _react2.default.createElement(\n                'div',\n                { className: classes.nav },\n                _react2.default.createElement(\n                    _AppBar2.default,\n                    { color: 'secondary' },\n                    _react2.default.createElement(\n                        _Toolbar2.default,\n                        null,\n                        _react2.default.createElement(\n                            _Typography2.default,\n                            { color: 'secondary', component: _reactRouterDom.Link, to: '/', type: 'title', className: classes.logo },\n                            'BarCoordinator'\n                        ),\n                        props.width == 'xs' ? _react2.default.createElement(\n                            _IconButton2.default,\n                            {\n                                'aria-owns': open ? 'menu-appbar' : null,\n                                'aria-haspopup': 'true',\n                                onClick: this.handleMenu,\n                                buttonRef: function buttonRef(el) {\n                                    _this2.menuAnchorEl = el;\n                                },\n                                color: 'inherit'\n                            },\n                            _react2.default.createElement(_AccountBox2.default, null)\n                        ) : _react2.default.createElement(\n                            _react2.default.Fragment,\n                            null,\n                            _react2.default.createElement(\n                                'div',\n                                { className: classes.text },\n                                'Hello, ',\n                                username,\n                                '!'\n                            ),\n                            _react2.default.createElement(\n                                'div',\n                                { className: classes.login },\n                                isAuthenticated ? _react2.default.createElement(\n                                    _Button2.default,\n                                    { component: _reactRouterDom.Link, to: '/logout', onClick: this.logout },\n                                    'LOG OUT'\n                                ) : _react2.default.createElement(\n                                    _react2.default.Fragment,\n                                    null,\n                                    _react2.default.createElement(\n                                        _Button2.default,\n                                        { onClick: this.toLogIn },\n                                        'LOG IN'\n                                    ),\n                                    _react2.default.createElement(\n                                        _Button2.default,\n                                        { component: _reactRouterDom.Link, to: '/signup', onClick: this.signUp },\n                                        'SIGN UP'\n                                    )\n                                )\n                            )\n                        ),\n                        _react2.default.createElement(\n                            _Menu2.default,\n                            {\n                                id: 'menu-appbar',\n                                anchorEl: this.menuAnchorEl,\n                                anchorOrigin: {\n                                    vertical: 'top',\n                                    horizontal: 'right'\n                                },\n                                transformOrigin: {\n                                    vertical: 'top',\n                                    horizontal: 'right'\n                                },\n                                open: open,\n                                onClose: this.handleMenuClose\n\n                            },\n                            _react2.default.createElement(\n                                _List.ListItem,\n                                { className: classes.text },\n                                username\n                            ),\n                            isAuthenticated ? _react2.default.createElement(\n                                _Menu.MenuItem,\n                                { component: _reactRouterDom.Link, to: '/logout', onClick: this.logout, className: classes.text },\n                                'LOG OUT'\n                            ) : _react2.default.createElement(\n                                'div',\n                                null,\n                                _react2.default.createElement(\n                                    _Menu.MenuItem,\n                                    { onClick: this.toLogIn, className: classes.text },\n                                    'LOG IN'\n                                ),\n                                _react2.default.createElement(\n                                    _Menu.MenuItem,\n                                    { component: _reactRouterDom.Link, to: '/signup', onClick: this.signUp, className: classes.text },\n                                    'SIGN UP'\n                                )\n                            )\n                        )\n                    )\n                )\n            );\n        }\n    }]);\n\n    return Header;\n}(_react.Component);\n\nexports.default = (0, _compose2.default)((0, _styles.withStyles)(styles), (0, _withWidth2.default)())(Header);\n\n//# sourceURL=webpack:///./src/client/components/Header.js?");

/***/ }),

/***/ "./src/client/components/Home.js":
/*!***************************************!*\
  !*** ./src/client/components/Home.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _Page = __webpack_require__(/*! ./Page */ \"./src/client/components/Page.js\");\n\nvar _Page2 = _interopRequireDefault(_Page);\n\nvar _HomeMap = __webpack_require__(/*! ../containers/HomeMap */ \"./src/client/containers/HomeMap.js\");\n\nvar _HomeMap2 = _interopRequireDefault(_HomeMap);\n\nvar _reactJss = __webpack_require__(/*! react-jss */ \"react-jss\");\n\nvar _reactJss2 = _interopRequireDefault(_reactJss);\n\nvar _SearchForm = __webpack_require__(/*! ../containers/SearchForm */ \"./src/client/containers/SearchForm.js\");\n\nvar _SearchForm2 = _interopRequireDefault(_SearchForm);\n\nvar _queryString = __webpack_require__(/*! query-string */ \"query-string\");\n\nvar _queryString2 = _interopRequireDefault(_queryString);\n\nvar _locations = __webpack_require__(/*! ../../util/locations */ \"./src/util/locations.js\");\n\nvar _withWidth = __webpack_require__(/*! material-ui/utils/withWidth */ \"material-ui/utils/withWidth\");\n\nvar _withWidth2 = _interopRequireDefault(_withWidth);\n\nvar _compose = __webpack_require__(/*! recompose/compose */ \"recompose/compose\");\n\nvar _compose2 = _interopRequireDefault(_compose);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar styles = {\n\tsearchBar: {\n\t\twidth: '400px',\n\t\tmaxWidth: '80%',\n\t\theight: '120px',\n\t\tposition: 'absolute',\n\t\tbackgroundColor: 'white',\n\t\topacity: '.9',\n\t\ttop: '170px',\n\t\tleft: '50%',\n\t\tboxShadow: '5px 1px 10px #888888',\n\t\ttransform: 'translate(-50%, -50%)'\n\n\t},\n\tform: {\n\t\twidth: '80%',\n\t\tpadding: '10px'\n\n\t},\n\tmap: {\n\t\tmarginTop: '60px',\n\t\t'@media (max-width: 600px)': {\n\t\t\tmarginTop: '50px'\n\t\t},\n\t\tflex: '1 0 auto',\n\t\tdisplay: 'flex',\n\t\tflexDirection: 'column'\n\t}\n};\n\nvar Home = function (_Component) {\n\t_inherits(Home, _Component);\n\n\tfunction Home(props) {\n\t\t_classCallCheck(this, Home);\n\n\t\tvar _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));\n\n\t\t_this.getMargin = function () {\n\t\t\treturn _this.props.width == 'xs' ? 150 : 160;\n\t\t};\n\n\t\t_this.handleWindowSizeChange = function () {\n\n\t\t\t_this.setState({\n\t\t\t\theight: window.innerHeight - _this.getMargin()\n\t\t\t});\n\t\t};\n\n\t\t_this.location = _queryString2.default.parse(props.location.search);\n\n\t\t//set location from url\n\t\tif (!_this.location.loc) {\n\t\t\tprops.replaceLocation(_locations.defaultLocation.address, props.location.pathname);\n\t\t} else {\n\t\t\tprops.findLocation(_this.location.loc);\n\t\t}\n\t\t_this.state = {\n\t\t\theight: window.innerHeight - _this.getMargin()\n\t\t};\n\t\treturn _this;\n\t}\n\n\t_createClass(Home, [{\n\t\tkey: 'componentWillReceiveProps',\n\t\tvalue: function componentWillReceiveProps(nextProps) {\n\t\t\tif (this.props.location.search != nextProps.location.search) {\n\n\t\t\t\tthis.location = _queryString2.default.parse(nextProps.location.search);\n\n\t\t\t\t//set location from url\n\t\t\t\tif (!this.location.loc) {\n\t\t\t\t\tthis.props.replaceLocation(_locations.defaultLocation.address, this.props.location.pathname);\n\t\t\t\t} else {\n\t\t\t\t\tthis.props.findLocation(this.location.loc);\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: 'componentWillMount',\n\t\tvalue: function componentWillMount() {\n\t\t\twindow.addEventListener('resize', this.handleWindowSizeChange);\n\t\t}\n\t}, {\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\t// console.log(this.props)\n\t\t\treturn _react2.default.createElement(\n\t\t\t\t_Page2.default,\n\t\t\t\t{ location: this.props.location },\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\t{ id: 'content', className: this.props.classes.map },\n\t\t\t\t\t_react2.default.createElement(_HomeMap2.default, {\n\t\t\t\t\t\tisMarkerShown: true,\n\t\t\t\t\t\tcontainerElement: _react2.default.createElement('div', { style: { flex: '1 0 auto', display: 'flex',\n\t\t\t\t\t\t\t\t'flex-direction': 'column' } })\n\t\t\t\t\t})\n\t\t\t\t),\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\t{ className: this.props.classes.searchBar },\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t'div',\n\t\t\t\t\t\t{ className: this.props.classes.form },\n\t\t\t\t\t\t_react2.default.createElement(_SearchForm2.default, { urlLocation: this.props.location, path: this.props.match.path, placeLocation: this.location.loc })\n\t\t\t\t\t)\n\t\t\t\t)\n\t\t\t);\n\t\t}\n\t}], [{\n\t\tkey: 'fetchData',\n\t\tvalue: function fetchData(store) {\n\t\t\treturn new Promise(function (resolve, reject) {\n\t\t\t\tconsole.log(\"home\");\n\t\t\t});\n\t\t}\n\t}]);\n\n\treturn Home;\n}(_react.Component);\n\nexports.default = (0, _compose2.default)((0, _reactJss2.default)(styles), (0, _withWidth2.default)())(Home);\n\n//# sourceURL=webpack:///./src/client/components/Home.js?");

/***/ }),

/***/ "./src/client/components/HomeMap.js":
/*!******************************************!*\
  !*** ./src/client/components/HomeMap.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _recompose = __webpack_require__(/*! recompose */ \"recompose\");\n\nvar _reactGoogleMaps = __webpack_require__(/*! react-google-maps */ \"react-google-maps\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar HomeMap = (0, _recompose.compose)((0, _recompose.withProps)({\n    loadingElement: _react2.default.createElement(\"div\", { style: { flex: '1 0 auto', display: 'flex',\n            'flex-direction': 'column' } }),\n    mapElement: _react2.default.createElement(\"div\", { style: { flex: '1 0 auto', opacity: '.8' } })\n}), _reactGoogleMaps.withGoogleMap)(function (props) {\n\n    return _react2.default.createElement(\n        _reactGoogleMaps.GoogleMap,\n        {\n            defaultZoom: 13,\n            defaultCenter: { lat: +props.lat, lng: +props.lng },\n            center: { lat: +props.lat, lng: +props.lng }\n        },\n        _react2.default.createElement(_reactGoogleMaps.Marker, { position: { lat: +props.lat, lng: +props.lng } })\n    );\n});\n\nexports.default = HomeMap;\n\n//# sourceURL=webpack:///./src/client/components/HomeMap.js?");

/***/ }),

/***/ "./src/client/components/LoginDialog.js":
/*!**********************************************!*\
  !*** ./src/client/components/LoginDialog.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _Button = __webpack_require__(/*! material-ui/Button */ \"material-ui/Button\");\n\nvar _Button2 = _interopRequireDefault(_Button);\n\nvar _TextField = __webpack_require__(/*! material-ui/TextField */ \"material-ui/TextField\");\n\nvar _TextField2 = _interopRequireDefault(_TextField);\n\nvar _Dialog = __webpack_require__(/*! material-ui/Dialog */ \"material-ui/Dialog\");\n\nvar _Dialog2 = _interopRequireDefault(_Dialog);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar LoginDialog = function (_Component) {\n    _inherits(LoginDialog, _Component);\n\n    function LoginDialog() {\n        _classCallCheck(this, LoginDialog);\n\n        var _this = _possibleConstructorReturn(this, (LoginDialog.__proto__ || Object.getPrototypeOf(LoginDialog)).call(this));\n\n        _this.submit = function (event) {\n            event.preventDefault();\n\n            var data = {\n                username: _this.usernameInput.value,\n                password: _this.passwordInput.value\n            };\n\n            _this.props.onSubmit(data);\n        };\n\n        _this.handleKeyPress = function (event) {\n            if (event.key === 'Enter') {\n                _this.submit(event);\n            }\n        };\n\n        _this.usernameInput = null;\n        _this.passwordInput = null;\n        return _this;\n    }\n\n    _createClass(LoginDialog, [{\n        key: 'render',\n        value: function render() {\n            var _this2 = this;\n\n            return _react2.default.createElement(\n                'div',\n                null,\n                _react2.default.createElement(\n                    _Dialog2.default,\n                    {\n                        open: this.props.open,\n                        onClose: this.props.onClose,\n                        'aria-labelledby': 'form-dialog-title'\n\n                    },\n                    _react2.default.createElement(\n                        _Dialog.DialogTitle,\n                        { id: 'form-dialog-title' },\n                        'Log in'\n                    ),\n                    _react2.default.createElement(\n                        _Dialog.DialogContent,\n                        null,\n                        _react2.default.createElement(\n                            'form',\n                            null,\n                            _react2.default.createElement(_TextField2.default, {\n                                required: true,\n                                error: this.props.usernameErrorText.length > 0,\n                                margin: 'dense',\n                                id: 'username',\n                                label: 'Username',\n                                type: 'username',\n                                helperText: this.props.usernameErrorText,\n                                inputRef: function inputRef(input) {\n                                    if (input) {\n                                        _this2.usernameInput = input;setTimeout(function () {\n                                            _this2.usernameInput.focus();\n                                        }, 300);\n                                    }\n                                },\n                                fullWidth: true,\n                                onKeyPress: this.handleKeyPress\n                            }),\n                            _react2.default.createElement(_TextField2.default, {\n                                required: true,\n                                error: this.props.passwordErrorText.length > 0,\n                                margin: 'dense',\n                                id: 'password',\n                                label: 'Password',\n                                type: 'password',\n                                helperText: this.props.passwordErrorText,\n                                inputRef: function inputRef(input) {\n                                    _this2.passwordInput = input;\n                                },\n                                fullWidth: true,\n                                onKeyPress: this.handleKeyPress\n                            })\n                        )\n                    ),\n                    _react2.default.createElement(\n                        _Dialog.DialogActions,\n                        null,\n                        _react2.default.createElement(\n                            _Button2.default,\n                            { onClick: this.submit, color: 'primary' },\n                            'Log in'\n                        ),\n                        _react2.default.createElement(\n                            _Button2.default,\n                            { onClick: this.props.onSignUp, color: 'primary' },\n                            'Or, sign up'\n                        ),\n                        _react2.default.createElement(\n                            _Button2.default,\n                            { onClick: this.props.onClose, color: 'primary' },\n                            'Cancel'\n                        )\n                    )\n                )\n            );\n        }\n    }]);\n\n    return LoginDialog;\n}(_react.Component);\n\nexports.default = LoginDialog;\n\n//# sourceURL=webpack:///./src/client/components/LoginDialog.js?");

/***/ }),

/***/ "./src/client/components/MapComponent.js":
/*!***********************************************!*\
  !*** ./src/client/components/MapComponent.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _recompose = __webpack_require__(/*! recompose */ \"recompose\");\n\nvar _reactGoogleMaps = __webpack_require__(/*! react-google-maps */ \"react-google-maps\");\n\nvar _MarkerComponent = __webpack_require__(/*! ../containers/MarkerComponent */ \"./src/client/containers/MarkerComponent.js\");\n\nvar _MarkerComponent2 = _interopRequireDefault(_MarkerComponent);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar MapComponent = (0, _recompose.compose)((0, _recompose.withProps)({\n    loadingElement: _react2.default.createElement(\"div\", { style: { height: \"100%\" } }),\n    mapElement: _react2.default.createElement(\"div\", { style: { height: \"100%\", opacity: '.8' } })\n}), _reactGoogleMaps.withGoogleMap)(function (props) {\n    return _react2.default.createElement(\n        _reactGoogleMaps.GoogleMap,\n        {\n            defaultZoom: 13,\n            defaultCenter: { lat: +props.lat, lng: +props.lng },\n            center: { lat: +props.lat, lng: +props.lng },\n            ref: props.mapRef\n        },\n        props.markers ? props.markers.map(function (marker, index) {\n            //check because redux-persist\n            var lat = isNaN(marker.location.lat) ? marker.location.lat() : marker.location.lat;\n            var lng = isNaN(marker.location.lng) ? marker.location.lng() : marker.location.lng;\n            var placeID = marker.id;\n            return _react2.default.createElement(_MarkerComponent2.default, { key: index, lat: lat, lng: lng, placeID: placeID, markerClick: function markerClick() {\n                    return props.markerClick(placeID);\n                } });\n        }) : _react2.default.createElement(_reactGoogleMaps.Marker, { position: { lat: +props.lat, lng: +props.lng } })\n    );\n});\n\nexports.default = MapComponent;\n\n//# sourceURL=webpack:///./src/client/components/MapComponent.js?");

/***/ }),

/***/ "./src/client/components/MarkerComponent.js":
/*!**************************************************!*\
  !*** ./src/client/components/MarkerComponent.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactGoogleMaps = __webpack_require__(/*! react-google-maps */ \"react-google-maps\");\n\nvar _icons = __webpack_require__(/*! ../../util/icons */ \"./src/util/icons.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar MarkerComponent = function (_Component) {\n\t_inherits(MarkerComponent, _Component);\n\n\tfunction MarkerComponent() {\n\t\t_classCallCheck(this, MarkerComponent);\n\n\t\tvar _this = _possibleConstructorReturn(this, (MarkerComponent.__proto__ || Object.getPrototypeOf(MarkerComponent)).call(this));\n\n\t\t_this.state = {\n\t\t\tanimation: null\n\t\t};\n\t\treturn _this;\n\t}\n\n\t_createClass(MarkerComponent, [{\n\t\tkey: 'componentWillReceiveProps',\n\t\tvalue: function componentWillReceiveProps(nextProps) {\n\t\t\tvar _this2 = this;\n\n\t\t\tif (nextProps.isHighlighted && !this.props.isHighlighted) {\n\n\t\t\t\tthis.setState({\n\t\t\t\t\tanimation: google.maps.Animation.BOUNCE\n\t\t\t\t}, function () {\n\t\t\t\t\tsetTimeout(function () {\n\t\t\t\t\t\treturn _this2.setState({\n\t\t\t\t\t\t\tanimation: null\n\t\t\t\t\t\t});\n\t\t\t\t\t}, 1000);\n\t\t\t\t});\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\tvar markerIcon = this.props.isHighlighted ? _icons.RED_MARKER : _icons.BLUE_MARKER;\n\t\t\treturn _react2.default.createElement(_reactGoogleMaps.Marker, {\n\t\t\t\tposition: { lat: this.props.lat, lng: this.props.lng },\n\t\t\t\tonClick: this.props.markerClick,\n\t\t\t\ticon: markerIcon,\n\t\t\t\tanimation: this.state.animation\n\t\t\t});\n\t\t}\n\t}]);\n\n\treturn MarkerComponent;\n}(_react.Component);\n\nexports.default = MarkerComponent;\n\n//# sourceURL=webpack:///./src/client/components/MarkerComponent.js?");

/***/ }),

/***/ "./src/client/components/MessageDialog.js":
/*!************************************************!*\
  !*** ./src/client/components/MessageDialog.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _Button = __webpack_require__(/*! material-ui/Button */ \"material-ui/Button\");\n\nvar _Button2 = _interopRequireDefault(_Button);\n\nvar _TextField = __webpack_require__(/*! material-ui/TextField */ \"material-ui/TextField\");\n\nvar _TextField2 = _interopRequireDefault(_TextField);\n\nvar _Dialog = __webpack_require__(/*! material-ui/Dialog */ \"material-ui/Dialog\");\n\nvar _Dialog2 = _interopRequireDefault(_Dialog);\n\nvar _styles = __webpack_require__(/*! material-ui/styles */ \"material-ui/styles\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar styles = {\n    button: {\n        alignSelf: 'center'\n    }\n};\n\nvar MessageDialog = function (_Component) {\n    _inherits(MessageDialog, _Component);\n\n    function MessageDialog() {\n        _classCallCheck(this, MessageDialog);\n\n        return _possibleConstructorReturn(this, (MessageDialog.__proto__ || Object.getPrototypeOf(MessageDialog)).apply(this, arguments));\n    }\n\n    _createClass(MessageDialog, [{\n        key: 'render',\n        value: function render() {\n            var classes = this.props.classes;\n\n            return _react2.default.createElement(\n                _Dialog2.default,\n                {\n                    open: this.props.open,\n                    onClose: this.props.onClose\n\n                },\n                _react2.default.createElement(\n                    _Dialog.DialogContent,\n                    null,\n                    this.props.message.map(function (msg, index) {\n                        return _react2.default.createElement(\n                            _Dialog.DialogContentText,\n                            { key: index, id: 'alert-dialog-description' },\n                            msg\n                        );\n                    })\n                ),\n                _react2.default.createElement(\n                    _Dialog.DialogActions,\n                    { className: classes.button },\n                    _react2.default.createElement(\n                        _Button2.default,\n                        { raised: true, onClick: this.props.onClose, color: 'primary' },\n                        'Ok'\n                    )\n                )\n            );\n        }\n    }]);\n\n    return MessageDialog;\n}(_react.Component);\n\nexports.default = (0, _styles.withStyles)(styles)(MessageDialog);\n\n//# sourceURL=webpack:///./src/client/components/MessageDialog.js?");

/***/ }),

/***/ "./src/client/components/NotFound.js":
/*!*******************************************!*\
  !*** ./src/client/components/NotFound.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = function () {\n\treturn _react2.default.createElement(\n\t\t'div',\n\t\tnull,\n\t\t_react2.default.createElement(\n\t\t\t'h1',\n\t\t\tnull,\n\t\t\t'Page Not Found'\n\t\t)\n\t);\n};\n\n//# sourceURL=webpack:///./src/client/components/NotFound.js?");

/***/ }),

/***/ "./src/client/components/Page.js":
/*!***************************************!*\
  !*** ./src/client/components/Page.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _Header = __webpack_require__(/*! ../containers/Header */ \"./src/client/containers/Header.js\");\n\nvar _Header2 = _interopRequireDefault(_Header);\n\nvar _Footer = __webpack_require__(/*! ../containers/Footer */ \"./src/client/containers/Footer.js\");\n\nvar _Footer2 = _interopRequireDefault(_Footer);\n\nvar _reactJss = __webpack_require__(/*! react-jss */ \"react-jss\");\n\nvar _reactJss2 = _interopRequireDefault(_reactJss);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar styles = {\n    app: {\n        display: 'flex',\n        'flex-direction': 'column',\n        height: '100%'\n    },\n    content: {\n        flex: '1 0 auto',\n        width: '100%',\n        display: 'flex',\n        'flex-direction': 'column'\n        // height: '100%',\n    }\n};\n\nvar Page = function Page(props) {\n    return _react2.default.createElement(\n        'div',\n        { className: props.classes.app },\n        _react2.default.createElement(_Header2.default, {\n            path: props.location\n\n        }),\n        _react2.default.createElement(\n            'div',\n            { className: props.classes.content },\n            props.children\n        ),\n        _react2.default.createElement(_Footer2.default, null)\n    );\n};\n\nexports.default = (0, _reactJss2.default)(styles)(Page);\n\n//# sourceURL=webpack:///./src/client/components/Page.js?");

/***/ }),

/***/ "./src/client/components/PlaceComponent.js":
/*!*************************************************!*\
  !*** ./src/client/components/PlaceComponent.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactJss = __webpack_require__(/*! react-jss */ \"react-jss\");\n\nvar _reactJss2 = _interopRequireDefault(_reactJss);\n\nvar _Button = __webpack_require__(/*! material-ui/Button */ \"material-ui/Button\");\n\nvar _Button2 = _interopRequireDefault(_Button);\n\nvar _styles = __webpack_require__(/*! material-ui/styles */ \"material-ui/styles\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nvar styles = function styles(theme) {\n\treturn {\n\t\tplaceCart: {\n\t\t\tmaxWidth: '100%',\n\t\t\topacity: '.9',\n\t\t\tboxShadow: '1px 1px 10px #888888',\n\t\t\tmargin: '5px',\n\t\t\tpadding: '10px',\n\t\t\tcolor: \"#673AB7\",\n\t\t\tcursor: 'pointer'\n\t\t},\n\t\tbutton: {\n\t\t\tmarginTop: \"5px\"\n\t\t},\n\t\ttext: theme.typography.button,\n\t\tme: {\n\t\t\tcolor: 'red'\n\t\t}\n\n\t};\n};\n\nvar PlaceComponent = function PlaceComponent(props) {\n\n\tvar add = function add(event) {\n\n\t\tevent.preventDefault();\n\t\tevent.stopPropagation();\n\t\tvar data = {\n\t\t\tplaceID: props.placeID,\n\t\t\tusername: props.username\n\n\t\t};\n\t\tprops.addToList(data);\n\t};\n\n\tvar remove = function remove(event) {\n\n\t\tevent.preventDefault();\n\t\tevent.stopPropagation();\n\t\tvar data = {\n\t\t\tplaceID: props.placeID,\n\t\t\tusername: props.username\n\n\t\t};\n\t\tprops.removeFromList(data);\n\t};\n\n\tvar usersList = function usersList() {\n\t\tif (props.isUserGoing) {\n\t\t\tvar i = props.usersInBar.indexOf(props.username);\n\t\t\tvar list = [].concat(_toConsumableArray(props.usersInBar));\n\t\t\tlist.splice(i, 1);\n\t\t\treturn list;\n\t\t} else return props.usersInBar;\n\t};\n\n\tvar showList = function showList(event) {\n\t\tevent.preventDefault();\n\t\tevent.stopPropagation();\n\t\tprops.openShowListDialog(usersList());\n\t};\n\tvar loginAndAdd = function loginAndAdd(event) {\n\n\t\tevent.preventDefault();\n\t\tevent.stopPropagation();\n\t\tprops.loginAndAdd(props.placeID);\n\t};\n\tvar cartClick = function cartClick() {\n\n\t\tprops.markerClick(props.placeID);\n\t};\n\n\t//make label about how many people are going to specific bar\n\t//if current user also is going - subtract from  the number and add label 'and me' or just 'me' \n\t//if only he is only one in the list\n\tvar goingNumber = props.isUserGoing ? props.usersInBar.length - 1 : props.usersInBar.length;\n\tvar GoingLabel = function GoingLabel() {\n\n\t\treturn props.isUserGoing ? goingNumber <= 0 ? _react2.default.createElement(\n\t\t\t'span',\n\t\t\t{ className: props.classes.me },\n\t\t\t'me'\n\t\t) : _react2.default.createElement(\n\t\t\t_react2.default.Fragment,\n\t\t\tnull,\n\t\t\tgoingNumber,\n\t\t\t' ',\n\t\t\t_react2.default.createElement(\n\t\t\t\t'span',\n\t\t\t\t{ className: props.classes.me },\n\t\t\t\t' and me'\n\t\t\t)\n\t\t) : _react2.default.createElement(\n\t\t\t'span',\n\t\t\tnull,\n\t\t\tgoingNumber\n\t\t);\n\t};\n\n\treturn _react2.default.createElement(\n\t\t'div',\n\t\t{ onClick: cartClick, className: props.classes.placeCart + ' ' + props.classes.text, style: props.isHighlighted ? { boxShadow: '1px 1px 20px #1A237E' } : { boxShadow: '1px 1px 10px #888888' } },\n\t\tprops.photo && _react2.default.createElement('img', { src: props.photo }),\n\t\t_react2.default.createElement(\n\t\t\t'div',\n\t\t\tnull,\n\t\t\tprops.name\n\t\t),\n\t\t_react2.default.createElement(\n\t\t\t'div',\n\t\t\tnull,\n\t\t\t'Address: ',\n\t\t\tprops.address\n\t\t),\n\t\tprops.rating && _react2.default.createElement(\n\t\t\t'div',\n\t\t\tnull,\n\t\t\t'Rating: ',\n\t\t\tprops.rating\n\t\t),\n\t\t_react2.default.createElement(\n\t\t\t'div',\n\t\t\tnull,\n\t\t\t'Going: ',\n\t\t\t_react2.default.createElement(GoingLabel, null)\n\t\t),\n\t\tprops.authenticated ? _react2.default.createElement(\n\t\t\t'div',\n\t\t\tnull,\n\t\t\tprops.isUserGoing ? _react2.default.createElement(\n\t\t\t\t'div',\n\t\t\t\t{ className: props.classes.button },\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t_Button2.default,\n\t\t\t\t\t{ raised: true, color: 'accent', dense: true, onClick: remove },\n\t\t\t\t\t'Remove'\n\t\t\t\t)\n\t\t\t) : _react2.default.createElement(\n\t\t\t\t'div',\n\t\t\t\t{ className: props.classes.button },\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t_Button2.default,\n\t\t\t\t\t{ raised: true, color: 'accent', dense: true, onClick: add },\n\t\t\t\t\t'Add'\n\t\t\t\t)\n\t\t\t),\n\t\t\tgoingNumber > 0 && _react2.default.createElement(\n\t\t\t\t'div',\n\t\t\t\t{ className: props.classes.button },\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t_Button2.default,\n\t\t\t\t\t{ raised: true, color: 'accent', dense: true, onClick: showList },\n\t\t\t\t\t'List'\n\t\t\t\t)\n\t\t\t)\n\t\t) : _react2.default.createElement(\n\t\t\t'div',\n\t\t\tnull,\n\t\t\t_react2.default.createElement(\n\t\t\t\t_Button2.default,\n\t\t\t\t{ raised: true, color: 'accent', dense: true, onClick: loginAndAdd },\n\t\t\t\t'Add'\n\t\t\t)\n\t\t)\n\t);\n};\n\nexports.default = (0, _styles.withStyles)(styles)(PlaceComponent);\n\n//# sourceURL=webpack:///./src/client/components/PlaceComponent.js?");

/***/ }),

/***/ "./src/client/components/Places.js":
/*!*****************************************!*\
  !*** ./src/client/components/Places.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _Header = __webpack_require__(/*! ../containers/Header */ \"./src/client/containers/Header.js\");\n\nvar _Header2 = _interopRequireDefault(_Header);\n\nvar _MapComponent = __webpack_require__(/*! ../containers/MapComponent */ \"./src/client/containers/MapComponent.js\");\n\nvar _MapComponent2 = _interopRequireDefault(_MapComponent);\n\nvar _PlaceComponent = __webpack_require__(/*! ../containers/PlaceComponent */ \"./src/client/containers/PlaceComponent.js\");\n\nvar _PlaceComponent2 = _interopRequireDefault(_PlaceComponent);\n\nvar _reactJss = __webpack_require__(/*! react-jss */ \"react-jss\");\n\nvar _reactJss2 = _interopRequireDefault(_reactJss);\n\nvar _SearchForm = __webpack_require__(/*! ../containers/SearchForm */ \"./src/client/containers/SearchForm.js\");\n\nvar _SearchForm2 = _interopRequireDefault(_SearchForm);\n\nvar _UsersListDialog = __webpack_require__(/*! ./UsersListDialog */ \"./src/client/components/UsersListDialog.js\");\n\nvar _UsersListDialog2 = _interopRequireDefault(_UsersListDialog);\n\nvar _queryString = __webpack_require__(/*! query-string */ \"query-string\");\n\nvar _queryString2 = _interopRequireDefault(_queryString);\n\nvar _locations = __webpack_require__(/*! ../../util/locations */ \"./src/util/locations.js\");\n\nvar _Grid = __webpack_require__(/*! material-ui/Grid */ \"material-ui/Grid\");\n\nvar _Grid2 = _interopRequireDefault(_Grid);\n\nvar _withWidth = __webpack_require__(/*! material-ui/utils/withWidth */ \"material-ui/utils/withWidth\");\n\nvar _withWidth2 = _interopRequireDefault(_withWidth);\n\nvar _compose = __webpack_require__(/*! recompose/compose */ \"recompose/compose\");\n\nvar _compose2 = _interopRequireDefault(_compose);\n\nvar _Page = __webpack_require__(/*! ./Page */ \"./src/client/components/Page.js\");\n\nvar _Page2 = _interopRequireDefault(_Page);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar styles = {\n\troot: {\n\t\tflex: '1 0 auto',\n\t\tdisplay: 'flex',\n\t\t'@media (max-width: 640px)': {\n\t\t\tflexDirection: 'column'\n\t\t},\n\t\tmarginTop: '60px',\n\t\t'@media (max-width: 600px)': {\n\t\t\tmarginTop: '50px'\n\t\t}\n\t\t// alignItems: 'stretch'\n\t\t//       \n\t},\n\tplacesList: {\n\t\tmaxWidth: '100%',\n\n\t\t'@media (min-width: 641px)': {\n\t\t\tborderRight: '.5rem solid #A8C256',\n\t\t\twidth: '400px'\n\t\t},\n\t\t'@media (max-width: 640px)': {\n\t\t\twidth: '100%',\n\t\t\tflex: '1 0 auto'\n\t\t}\n\t},\n\tcarts: {\n\t\tmarginTop: '125px',\n\t\t'@media (min-width: 641px)': {\n\t\t\t'overflow-y': 'scroll',\n\t\t\tmarginTop: '120px'\n\t\t},\n\t\t'@media (max-width: 640px)': {\n\t\t\tmarginTop: 0\n\t\t}\n\t},\n\titem: {\n\t\tmargin: '20px'\n\t},\n\tmap: {\n\t\tflexGrow: 1,\n\t\t// marginTop: '60px',\n\t\t'@media (max-width: 640px)': {\n\t\t\twidth: 0,\n\t\t\theight: 0\n\t\t}\n\t},\n\tsearchBar: {\n\t\twidth: '100%',\n\t\theight: '120px',\n\t\tposition: 'fixed',\n\t\tbackgroundColor: 'white',\n\t\tmaxWidth: '100%',\n\t\ttop: '50px',\n\t\t'z-index': 1000,\n\t\tboxShadow: '1px 1px 10px #888888',\n\t\t'@media (min-width: 600px)': {\n\t\t\ttop: '60px'\n\t\t},\n\t\t'@media (min-width: 641px)': {\n\t\t\twidth: 'inherit'\n\t\t},\n\t\t'@media (max-width: 640px)': {\n\t\t\tposition: 'relative',\n\t\t\ttop: 0\n\t\t}\n\t},\n\tform: {\n\t\twidth: '80%',\n\t\tpadding: '10px'\n\t}\n};\n\nvar Places = function (_Component) {\n\t_inherits(Places, _Component);\n\n\tfunction Places(props) {\n\t\t_classCallCheck(this, Places);\n\n\t\tvar _this = _possibleConstructorReturn(this, (Places.__proto__ || Object.getPrototypeOf(Places)).call(this, props));\n\n\t\t_this.handleClickOpen = function (list) {\n\t\t\t_this.setState({\n\t\t\t\topen: true,\n\t\t\t\tlist: list\n\t\t\t});\n\t\t};\n\n\t\t_this.handleClose = function () {\n\t\t\t_this.setState({ open: false, list: [] });\n\t\t};\n\n\t\t_this.markerClick = function (placeID) {\n\t\t\t_this.props.highlightPlace(placeID);\n\t\t};\n\n\t\t_this.getMargin = function () {\n\t\t\treturn _this.props.width == 'xs' ? 50 : 60;\n\t\t};\n\n\t\t_this.setMap = function (el) {\n\t\t\tif (!_this.map) {\n\t\t\t\t_this.map = el;\n\t\t\t\t_this.service = new google.maps.places.PlacesService(_this.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);\n\t\t\t\t_this.placeLocation = _queryString2.default.parse(_this.props.location.search);\n\t\t\t\tif (_this.placeLocation.bar && _this.placeLocation.loc) {\n\t\t\t\t\t_this.props.showPlaces(_this.service, _this.placeLocation.loc);\n\t\t\t\t}\n\t\t\t}\n\t\t};\n\n\t\t_this.handleWindowSizeChange = function () {\n\t\t\t_this.setState({\n\t\t\t\theight: window.innerHeight - _this.getMargin()\n\t\t\t});\n\t\t};\n\n\t\t_this.placeLocation = _queryString2.default.parse(props.location.search);\n\t\t//if there isn't parameter 'loc' in the url - replace url with default location\n\t\tif (!_this.placeLocation.loc) {\n\t\t\tprops.replaceLocation(_locations.defaultLocation.address, props.location.pathname);\n\t\t}\n\n\t\t_this.state = {\n\t\t\topen: false,\n\t\t\tlist: [],\n\t\t\theight: window.innerHeight - _this.getMargin()\n\t\t};\n\t\treturn _this;\n\t}\n\n\t//dialog with list of users that are going to the bar\n\n\n\t//show choosed bar on map and in list of bar cards\n\n\n\t_createClass(Places, [{\n\t\tkey: 'componentWillReceiveProps',\n\t\tvalue: function componentWillReceiveProps(nextProps) {\n\t\t\tif (this.props.location.search != nextProps.location.search) {\n\n\t\t\t\tthis.placeLocation = _queryString2.default.parse(nextProps.location.search);\n\t\t\t\t//if there is 'bar' parameter in url - show list of bars\n\t\t\t\t//if there is only 'loc' parameter - show location on the map\n\t\t\t\tif (!this.placeLocation.bar && this.placeLocation.loc) {\n\t\t\t\t\tthis.props.findLocation(this.placeLocation.loc);\n\t\t\t\t} else if (this.placeLocation.bar && this.placeLocation.loc) {\n\t\t\t\t\tthis.props.showPlaces(this.service, this.placeLocation.loc);\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: 'componentWillMount',\n\t\tvalue: function componentWillMount() {\n\t\t\twindow.addEventListener('resize', this.handleWindowSizeChange);\n\t\t}\n\t}, {\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\tvar _this2 = this;\n\n\t\t\tvar _props = this.props,\n\t\t\t    classes = _props.classes,\n\t\t\t    bars = _props.bars,\n\t\t\t    location = _props.location;\n\t\t\tvar height = this.state.height;\n\n\t\t\tvar sectionStyle = window.innerWidth <= 640 ? { flex: '1 0 auto', display: 'flex', flexDirection: 'column' } : { height: height - this.props.footerHeight };\n\t\t\tvar listStyle = window.innerWidth <= 640 ? { flex: '1 0 auto' } : { height: height - 120 - this.props.footerHeight };\n\t\t\tvar mapStyle = window.innerWidth <= 640 ? { height: 0 } : { height: height - this.props.footerHeight };\n\t\t\treturn _react2.default.createElement(\n\t\t\t\t_Page2.default,\n\t\t\t\t{ location: location },\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\t{ className: classes.root },\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t'div',\n\t\t\t\t\t\t{ className: classes.placesList, style: sectionStyle },\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t{ className: classes.searchBar },\n\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t\t{ className: classes.form },\n\t\t\t\t\t\t\t\t_react2.default.createElement(_SearchForm2.default, { urlLocation: location, path: this.props.match.path, placeLocation: this.placeLocation.loc })\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t),\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t{ className: classes.carts, style: listStyle },\n\t\t\t\t\t\t\tbars && bars.map(function (item, index) {\n\t\t\t\t\t\t\t\treturn _react2.default.createElement(_PlaceComponent2.default, {\n\t\t\t\t\t\t\t\t\tkey: index,\n\t\t\t\t\t\t\t\t\tdata: item,\n\t\t\t\t\t\t\t\t\tpath: _this2.props.match.url,\n\t\t\t\t\t\t\t\t\topenShowListDialog: _this2.handleClickOpen,\n\t\t\t\t\t\t\t\t\tmarkerClick: _this2.markerClick\n\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t})\n\t\t\t\t\t\t)\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t'div',\n\t\t\t\t\t\t{ className: classes.map, style: mapStyle },\n\t\t\t\t\t\t_react2.default.createElement(_MapComponent2.default, {\n\t\t\t\t\t\t\tisMarkerShown: true,\n\t\t\t\t\t\t\tmarkers: bars,\n\t\t\t\t\t\t\tmapRef: function mapRef(el) {\n\t\t\t\t\t\t\t\treturn _this2.setMap(el);\n\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\tmarkerClick: this.markerClick,\n\t\t\t\t\t\t\tcontainerElement: _react2.default.createElement('div', { style: { height: 'inherit', width: 'inherit' } })\n\t\t\t\t\t\t})\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(_UsersListDialog2.default, {\n\t\t\t\t\t\tusersList: this.state.list,\n\t\t\t\t\t\topen: this.state.open,\n\t\t\t\t\t\tonClose: this.handleClose\n\t\t\t\t\t})\n\t\t\t\t)\n\t\t\t);\n\t\t}\n\t}]);\n\n\treturn Places;\n}(_react.Component);\n\nexports.default = (0, _compose2.default)((0, _reactJss2.default)(styles), (0, _withWidth2.default)())(Places);\n\n//# sourceURL=webpack:///./src/client/components/Places.js?");

/***/ }),

/***/ "./src/client/components/SearchForm.js":
/*!*********************************************!*\
  !*** ./src/client/components/SearchForm.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactPlacesAutocomplete = __webpack_require__(/*! react-places-autocomplete */ \"react-places-autocomplete\");\n\nvar _reactPlacesAutocomplete2 = _interopRequireDefault(_reactPlacesAutocomplete);\n\nvar _Button = __webpack_require__(/*! material-ui/Button */ \"material-ui/Button\");\n\nvar _Button2 = _interopRequireDefault(_Button);\n\nvar _styles = __webpack_require__(/*! material-ui/styles */ \"material-ui/styles\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar styles = function styles(theme) {\n    return {\n\n        text: theme.typography.button\n    };\n};\n\nvar SearchForm = function (_Component) {\n    _inherits(SearchForm, _Component);\n\n    function SearchForm(props) {\n        _classCallCheck(this, SearchForm);\n\n        var _this = _possibleConstructorReturn(this, (SearchForm.__proto__ || Object.getPrototypeOf(SearchForm)).call(this, props));\n\n        _this.handleSelect = function (address, placeId) {\n            _this.setState({ address: address });\n\n            if (_this.props.urlLocation.pathname == '/location' || _this.props.urlLocation.pathname == '/places') {\n                //set url to show selected location on map\n                _this.props.setLocation(address, _this.props.urlLocation.pathname);\n            }\n        };\n\n        _this.handleFormSubmit = function (event) {\n            event.preventDefault();\n            //set url to show bars on map\n            _this.props.setPlacesLocation(_this.state.address);\n        };\n\n        _this.state = { address: props.placeLocation };\n        _this.onChange = function (address) {\n            return _this.setState({ address: address });\n        };\n\n        return _this;\n    }\n\n    _createClass(SearchForm, [{\n        key: 'componentWillReceiveProps',\n        value: function componentWillReceiveProps(nextProps) {\n            if (this.props.placeLocation != nextProps.placeLocation) {\n                this.setState({ address: nextProps.placeLocation });\n            }\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            var inputProps = {\n                value: this.state.address,\n                onChange: this.onChange\n            };\n            var myStyles = {\n                autocompleteContainer: { zIndex: 1000 }\n\n            };\n            return _react2.default.createElement(\n                _react2.default.Fragment,\n                null,\n                _react2.default.createElement(\n                    'div',\n                    { style: { margin: 5 }, className: this.props.classes.text },\n                    'Enter location:'\n                ),\n                _react2.default.createElement(_reactPlacesAutocomplete2.default, { inputProps: inputProps, styles: myStyles, onSelect: this.handleSelect }),\n                _react2.default.createElement(\n                    'div',\n                    { style: { margin: 5 } },\n                    _react2.default.createElement(\n                        _Button2.default,\n                        { raised: true, color: 'primary', dense: true, onClick: this.handleFormSubmit },\n                        'Show bars'\n                    )\n                )\n            );\n        }\n    }]);\n\n    return SearchForm;\n}(_react.Component);\n\nexports.default = (0, _styles.withStyles)(styles)(SearchForm);\n\n//# sourceURL=webpack:///./src/client/components/SearchForm.js?");

/***/ }),

/***/ "./src/client/components/Signup.js":
/*!*****************************************!*\
  !*** ./src/client/components/Signup.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _Header = __webpack_require__(/*! ../containers/Header */ \"./src/client/containers/Header.js\");\n\nvar _Header2 = _interopRequireDefault(_Header);\n\nvar _Button = __webpack_require__(/*! material-ui/Button */ \"material-ui/Button\");\n\nvar _Button2 = _interopRequireDefault(_Button);\n\nvar _TextField = __webpack_require__(/*! material-ui/TextField */ \"material-ui/TextField\");\n\nvar _TextField2 = _interopRequireDefault(_TextField);\n\nvar _styles = __webpack_require__(/*! material-ui/styles */ \"material-ui/styles\");\n\nvar _InputCheck = __webpack_require__(/*! ../helpers/InputCheck */ \"./src/client/helpers/InputCheck.js\");\n\nvar _InputCheck2 = _interopRequireDefault(_InputCheck);\n\nvar _Page = __webpack_require__(/*! ./Page */ \"./src/client/components/Page.js\");\n\nvar _Page2 = _interopRequireDefault(_Page);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar styles = function styles(theme) {\n\treturn {\n\t\troot: {\n\t\t\tdisplay: 'flex',\n\t\t\tjustifyContent: 'center',\n\t\t\talignItems: 'center',\n\t\t\tflex: '1 0 auto',\n\t\t\tmarginTop: '60px',\n\t\t\t'@media (max-width: 600px)': {\n\t\t\t\tmarginTop: '50px'\n\t\t\t}\n\t\t},\n\t\tcontainer: {\n\t\t\tdisplay: 'flex',\n\t\t\tflexDirection: 'column',\n\t\t\talignItems: 'center',\n\t\t\twidth: 500,\n\t\t\tmaxWidth: '100%'\n\t\t},\n\t\tform: {\n\t\t\tdisplay: 'flex',\n\t\t\tflexDirection: 'column',\n\t\t\talignItems: 'center',\n\t\t\twidth: 500,\n\t\t\tmaxWidth: '100%'\n\t\t},\n\t\ttextField: {\n\t\t\tmarginLeft: theme.spacing.unit,\n\t\t\tmarginRight: theme.spacing.unit,\n\t\t\twidth: 300,\n\t\t\tmaxWidth: '100%'\n\t\t},\n\t\tmenu: {\n\t\t\twidth: 200\n\t\t},\n\t\tbutton: {\n\t\t\tmarginTop: 50\n\t\t}\n\t};\n};\n\nvar Signup = function (_Component) {\n\t_inherits(Signup, _Component);\n\n\tfunction Signup() {\n\t\t_classCallCheck(this, Signup);\n\n\t\tvar _this = _possibleConstructorReturn(this, (Signup.__proto__ || Object.getPrototypeOf(Signup)).call(this));\n\n\t\t_this.handleKeyPress = function (event) {\n\t\t\tif (event.key === 'Enter') {\n\t\t\t\t_this.onSignupSubmit(event);\n\t\t\t}\n\t\t};\n\n\t\t_this.onSignupSubmit = function (event) {\n\t\t\tevent.preventDefault();\n\t\t\tvar username = _this.usernameInput.value;\n\t\t\tvar password = _this.passwordInput.value;\n\n\t\t\tvar _getErrorMessages = (0, _InputCheck2.default)(username, password),\n\t\t\t    usernameError = _getErrorMessages.usernameError,\n\t\t\t    passwordError = _getErrorMessages.passwordError;\n\n\t\t\tif (usernameError || passwordError) {\n\t\t\t\t_this.setState({\n\t\t\t\t\tusernameErrorMessage: usernameError,\n\t\t\t\t\tpasswordErrorMessage: passwordError\n\t\t\t\t});\n\t\t\t} else {\n\t\t\t\t_this.props.signUp({\n\t\t\t\t\tusername: username,\n\t\t\t\t\tpassword: password\n\t\t\t\t});\n\t\t\t}\n\t\t};\n\n\t\t_this.usernameInput = null;\n\t\t_this.passwordInput = null;\n\t\t_this.state = {\n\t\t\tusernameErrorMessage: \"\",\n\t\t\tpasswordErrorMessage: \"\"\n\t\t};\n\t\treturn _this;\n\t}\n\n\t_createClass(Signup, [{\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\tvar _this2 = this,\n\t\t\t    _React$createElement,\n\t\t\t    _React$createElement2;\n\n\t\t\tvar classes = this.props.classes;\n\n\t\t\treturn _react2.default.createElement(\n\t\t\t\t_Page2.default,\n\t\t\t\t{ location: this.props.location },\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\t{ className: classes.root },\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t'div',\n\t\t\t\t\t\t{ className: classes.container },\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t'form',\n\t\t\t\t\t\t\t{ className: classes.form },\n\t\t\t\t\t\t\t_react2.default.createElement(_TextField2.default, (_React$createElement = {\n\t\t\t\t\t\t\t\tclassName: classes.textField,\n\t\t\t\t\t\t\t\trequired: true,\n\t\t\t\t\t\t\t\terror: this.state.usernameErrorMessage.length > 0,\n\t\t\t\t\t\t\t\tmargin: 'dense',\n\t\t\t\t\t\t\t\tid: 'username',\n\t\t\t\t\t\t\t\tlabel: 'Username',\n\t\t\t\t\t\t\t\ttype: 'username',\n\t\t\t\t\t\t\t\thelperText: this.state.usernameErrorMessage,\n\t\t\t\t\t\t\t\tinputRef: function inputRef(input) {\n\t\t\t\t\t\t\t\t\tif (input) {\n\t\t\t\t\t\t\t\t\t\t_this2.usernameInput = input;setTimeout(function () {\n\t\t\t\t\t\t\t\t\t\t\t_this2.usernameInput.focus();\n\t\t\t\t\t\t\t\t\t\t}, 300);\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}, _defineProperty(_React$createElement, 'margin', 'normal'), _defineProperty(_React$createElement, 'onKeyPress', this.handleKeyPress), _React$createElement)),\n\t\t\t\t\t\t\t_react2.default.createElement(_TextField2.default, (_React$createElement2 = {\n\t\t\t\t\t\t\t\tclassName: classes.textField,\n\t\t\t\t\t\t\t\trequired: true,\n\t\t\t\t\t\t\t\terror: this.state.passwordErrorMessage.length > 0,\n\t\t\t\t\t\t\t\tmargin: 'dense',\n\t\t\t\t\t\t\t\tid: 'password',\n\t\t\t\t\t\t\t\tlabel: 'Password',\n\t\t\t\t\t\t\t\ttype: 'password',\n\t\t\t\t\t\t\t\thelperText: this.state.passwordErrorMessage,\n\t\t\t\t\t\t\t\tinputRef: function inputRef(input) {\n\t\t\t\t\t\t\t\t\t_this2.passwordInput = input;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}, _defineProperty(_React$createElement2, 'margin', 'normal'), _defineProperty(_React$createElement2, 'onKeyPress', this.handleKeyPress), _React$createElement2))\n\t\t\t\t\t\t),\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t{ className: classes.button },\n\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t_Button2.default,\n\t\t\t\t\t\t\t\t{ raised: true, color: 'accent', onClick: this.onSignupSubmit },\n\t\t\t\t\t\t\t\t'sign up'\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t)\n\t\t\t\t\t)\n\t\t\t\t)\n\t\t\t);\n\t\t}\n\t}]);\n\n\treturn Signup;\n}(_react.Component);\n\nexports.default = (0, _styles.withStyles)(styles)(Signup);\n\n//# sourceURL=webpack:///./src/client/components/Signup.js?");

/***/ }),

/***/ "./src/client/components/UsersListDialog.js":
/*!**************************************************!*\
  !*** ./src/client/components/UsersListDialog.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _List = __webpack_require__(/*! material-ui/List */ \"material-ui/List\");\n\nvar _List2 = _interopRequireDefault(_List);\n\nvar _Dialog = __webpack_require__(/*! material-ui/Dialog */ \"material-ui/Dialog\");\n\nvar _Dialog2 = _interopRequireDefault(_Dialog);\n\nvar _Button = __webpack_require__(/*! material-ui/Button */ \"material-ui/Button\");\n\nvar _Button2 = _interopRequireDefault(_Button);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }\n\nvar UsersListDialog = function UsersListDialog(props) {\n  var usersList = props.usersList,\n      other = _objectWithoutProperties(props, ['usersList']);\n\n  return _react2.default.createElement(\n    _Dialog2.default,\n    _extends({ onClose: props.onClose }, other),\n    _react2.default.createElement(\n      _Dialog.DialogTitle,\n      { id: 'going-list' },\n      'Who is going:'\n    ),\n    _react2.default.createElement(\n      'div',\n      null,\n      _react2.default.createElement(\n        _List2.default,\n        null,\n        usersList.map(function (user) {\n          return _react2.default.createElement(\n            _List.ListItem,\n            { key: user },\n            _react2.default.createElement(_List.ListItemText, { primary: user })\n          );\n        })\n      )\n    ),\n    _react2.default.createElement(\n      _Dialog.DialogActions,\n      null,\n      _react2.default.createElement(\n        _Button2.default,\n        { onClick: props.onClose, color: 'primary' },\n        'Ok'\n      )\n    )\n  );\n};\n\nexports.default = UsersListDialog;\n\n//# sourceURL=webpack:///./src/client/components/UsersListDialog.js?");

/***/ }),

/***/ "./src/client/containers/Footer.js":
/*!*****************************************!*\
  !*** ./src/client/containers/Footer.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _Footer = __webpack_require__(/*! ../components/Footer */ \"./src/client/components/Footer.js\");\n\nvar _Footer2 = _interopRequireDefault(_Footer);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _actions = __webpack_require__(/*! ../../actions */ \"./src/actions.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// let arr = new Array(1);\n// let x = 2\n// if(x == 2){\n// \tx = 3;\n// \tconsole.log(2)\n// } else if (x == 3){\n// \tconsole.log(3)\n// }\n// arr.push(1, 2, 3);\n// alert(arr);\n\nexports.default = (0, _reactRedux.connect)(function () {\n  return {};\n}, { footerHeight: _actions.footerHeight, headerHeight: _actions.headerHeight })(_Footer2.default);\n\n//# sourceURL=webpack:///./src/client/containers/Footer.js?");

/***/ }),

/***/ "./src/client/containers/Header.js":
/*!*****************************************!*\
  !*** ./src/client/containers/Header.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _Header = __webpack_require__(/*! ../components/Header */ \"./src/client/components/Header.js\");\n\nvar _Header2 = _interopRequireDefault(_Header);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _actions = __webpack_require__(/*! ../../actions */ \"./src/actions.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar mapStateToProps = function mapStateToProps(reducer) {\n\treturn {\n\t\tusername: reducer.user.username,\n\t\tisAuthenticated: reducer.user.authenticated,\n\t\tloginMenuOpen: reducer.user.loginMenuOpen\n\t};\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps, { logOut: _actions.logOut, toSignUp: _actions.toSignUp, openLoginDialog: _actions.openLoginDialog, openLoginMenu: _actions.openLoginMenu, closeLoginMenu: _actions.closeLoginMenu })(_Header2.default);\n\n//# sourceURL=webpack:///./src/client/containers/Header.js?");

/***/ }),

/***/ "./src/client/containers/Home.js":
/*!***************************************!*\
  !*** ./src/client/containers/Home.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _Home = __webpack_require__(/*! ../components/Home */ \"./src/client/components/Home.js\");\n\nvar _Home2 = _interopRequireDefault(_Home);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _actions = __webpack_require__(/*! ../../actions */ \"./src/actions.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = (0, _reactRedux.connect)(function () {\n  return {};\n}, { findLocation: _actions.findLocation, showPlaces: _actions.showPlaces, replaceLocation: _actions.replaceLocation })(_Home2.default);\n\n//# sourceURL=webpack:///./src/client/containers/Home.js?");

/***/ }),

/***/ "./src/client/containers/HomeMap.js":
/*!******************************************!*\
  !*** ./src/client/containers/HomeMap.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _HomeMap = __webpack_require__(/*! ../components/HomeMap */ \"./src/client/components/HomeMap.js\");\n\nvar _HomeMap2 = _interopRequireDefault(_HomeMap);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar mapStateToProps = function mapStateToProps(reducer) {\n  return { lat: reducer.user.lat, lng: reducer.user.lng };\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps)(_HomeMap2.default);\n\n//# sourceURL=webpack:///./src/client/containers/HomeMap.js?");

/***/ }),

/***/ "./src/client/containers/MapComponent.js":
/*!***********************************************!*\
  !*** ./src/client/containers/MapComponent.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _MapComponent = __webpack_require__(/*! ../components/MapComponent */ \"./src/client/components/MapComponent.js\");\n\nvar _MapComponent2 = _interopRequireDefault(_MapComponent);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar mapStateToProps = function mapStateToProps(reducer) {\n  return { lat: reducer.user.lat, lng: reducer.user.lng };\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps)(_MapComponent2.default);\n\n//# sourceURL=webpack:///./src/client/containers/MapComponent.js?");

/***/ }),

/***/ "./src/client/containers/MarkerComponent.js":
/*!**************************************************!*\
  !*** ./src/client/containers/MarkerComponent.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _MarkerComponent = __webpack_require__(/*! ../components/MarkerComponent */ \"./src/client/components/MarkerComponent.js\");\n\nvar _MarkerComponent2 = _interopRequireDefault(_MarkerComponent);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar isHighlighted = function isHighlighted(placeID, highlightedID) {\n\treturn placeID == highlightedID;\n};\n\nvar mapStateToProps = function mapStateToProps(reducer, _ref) {\n\tvar placeID = _ref.placeID;\n\treturn {\n\t\tisHighlighted: isHighlighted(placeID, reducer.user.highlighted)\n\t};\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps)(_MarkerComponent2.default);\n\n//# sourceURL=webpack:///./src/client/containers/MarkerComponent.js?");

/***/ }),

/***/ "./src/client/containers/PlaceComponent.js":
/*!*************************************************!*\
  !*** ./src/client/containers/PlaceComponent.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _PlaceComponent = __webpack_require__(/*! ../components/PlaceComponent */ \"./src/client/components/PlaceComponent.js\");\n\nvar _PlaceComponent2 = _interopRequireDefault(_PlaceComponent);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _actions = __webpack_require__(/*! ../../actions */ \"./src/actions.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar currentIsGoing = function currentIsGoing(barsOfUser, barID) {\n\treturn ~barsOfUser.indexOf(barID);\n};\n\nvar isHighlighted = function isHighlighted(placeID, highlightedID) {\n\treturn placeID == highlightedID;\n};\n\nvar mapStateToProps = function mapStateToProps(reducer, _ref) {\n\tvar data = _ref.data;\n\n\treturn {\n\t\tplaceID: data.id,\n\t\tphoto: data.photoUrl,\n\t\tname: data.name,\n\t\taddress: data.address,\n\t\trating: data.rating,\n\t\tusersInBar: data.users,\n\t\tisUserGoing: currentIsGoing(reducer.user.userBars, data.id),\n\t\tauthenticated: reducer.user.authenticated,\n\t\tusername: reducer.user.username,\n\t\tisHighlighted: isHighlighted(data.id, reducer.user.highlighted)\n\t};\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps, { showPlaces: _actions.showPlaces, addToList: _actions.addToList, removeFromList: _actions.removeFromList, loginAndAdd: _actions.loginAndAdd, openLoginDialog: _actions.openLoginDialog })(_PlaceComponent2.default);\n\n//# sourceURL=webpack:///./src/client/containers/PlaceComponent.js?");

/***/ }),

/***/ "./src/client/containers/Places.js":
/*!*****************************************!*\
  !*** ./src/client/containers/Places.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _Places = __webpack_require__(/*! ../components/Places */ \"./src/client/components/Places.js\");\n\nvar _Places2 = _interopRequireDefault(_Places);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _actions = __webpack_require__(/*! ../../actions */ \"./src/actions.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar mapStateToProps = function mapStateToProps(reducer) {\n\treturn {\n\t\tbars: reducer.user.bars,\n\t\tlat: reducer.user.lat,\n\t\tlng: reducer.user.lng,\n\t\tfooterHeight: reducer.user.footerHeight\n\t};\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps, { findLocation: _actions.findLocation, showPlaces: _actions.showPlaces, setHeight: _actions.setHeight, highlightPlace: _actions.highlightPlace, replaceLocation: _actions.replaceLocation })(_Places2.default);\n\n//# sourceURL=webpack:///./src/client/containers/Places.js?");

/***/ }),

/***/ "./src/client/containers/Root.js":
/*!***************************************!*\
  !*** ./src/client/containers/Root.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"prop-types\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _Home = __webpack_require__(/*! ./Home */ \"./src/client/containers/Home.js\");\n\nvar _Home2 = _interopRequireDefault(_Home);\n\nvar _Header = __webpack_require__(/*! ./Header */ \"./src/client/containers/Header.js\");\n\nvar _Header2 = _interopRequireDefault(_Header);\n\nvar _Signup = __webpack_require__(/*! ./Signup */ \"./src/client/containers/Signup.js\");\n\nvar _Signup2 = _interopRequireDefault(_Signup);\n\nvar _Places = __webpack_require__(/*! ./Places */ \"./src/client/containers/Places.js\");\n\nvar _Places2 = _interopRequireDefault(_Places);\n\nvar _reactRouterRedux = __webpack_require__(/*! react-router-redux */ \"react-router-redux\");\n\nvar _react3 = __webpack_require__(/*! redux-persist/lib/integration/react */ \"redux-persist/lib/integration/react\");\n\nvar _LoginDialog = __webpack_require__(/*! ../components/LoginDialog */ \"./src/client/components/LoginDialog.js\");\n\nvar _LoginDialog2 = _interopRequireDefault(_LoginDialog);\n\nvar _NotFound = __webpack_require__(/*! ../components/NotFound */ \"./src/client/components/NotFound.js\");\n\nvar _NotFound2 = _interopRequireDefault(_NotFound);\n\nvar _MessageDialog = __webpack_require__(/*! ../components/MessageDialog */ \"./src/client/components/MessageDialog.js\");\n\nvar _MessageDialog2 = _interopRequireDefault(_MessageDialog);\n\nvar _actions = __webpack_require__(/*! ../../actions */ \"./src/actions.js\");\n\nvar _locations = __webpack_require__(/*! ../../util/locations */ \"./src/util/locations.js\");\n\nvar _styles = __webpack_require__(/*! material-ui/styles */ \"material-ui/styles\");\n\nvar _Progress = __webpack_require__(/*! material-ui/Progress */ \"material-ui/Progress\");\n\nvar _InputCheck = __webpack_require__(/*! ../helpers/InputCheck */ \"./src/client/helpers/InputCheck.js\");\n\nvar _InputCheck2 = _interopRequireDefault(_InputCheck);\n\nvar _reactRouterConfig = __webpack_require__(/*! react-router-config */ \"react-router-config\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar styles = function styles(theme) {\n  return {\n    buttonProgress: {\n      position: 'fixed',\n      top: '50%',\n      left: '50%',\n      transform: 'translate(-50%, -50%)',\n      zIndex: 2000\n    }\n  };\n};\n\nvar Root = function (_Component) {\n  _inherits(Root, _Component);\n\n  function Root() {\n    var _ref;\n\n    var _temp, _this, _ret;\n\n    _classCallCheck(this, Root);\n\n    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Root.__proto__ || Object.getPrototypeOf(Root)).call.apply(_ref, [this].concat(args))), _this), _this.state = {\n      usernameErrorText: \"\",\n      passwordErrorText: \"\"\n\n    }, _this.componentDidMount = function () {\n      console.log(\"asa\");\n    }, _this.handleClickOpen = function () {\n      _this.props.openLoginDialog();\n    }, _this.handleSubmit = function (data) {\n      var username = data && data.username || \"\";\n      var password = data && data.password || \"\";\n\n      var _getErrorMessages = (0, _InputCheck2.default)(username, password),\n          usernameError = _getErrorMessages.usernameError,\n          passwordError = _getErrorMessages.passwordError;\n\n      if (usernameError || passwordError) {\n        _this.setState({ usernameErrorText: usernameError, passwordErrorText: passwordError });\n      } else {\n        _this.setState({ usernameErrorText: \"\", passwordErrorText: \"\" });\n        _this.props.manualLogin({ // this function is passed in via react-redux\n          username: username,\n          password: password\n        });\n      }\n    }, _this.toSignUp = function (path) {\n      _this.props.closeLoginDialog();\n      _this.props.toSignUp(path);\n    }, _this.handleClose = function () {\n      _this.setState({ usernameErrorText: \"\", passwordErrorText: \"\" });\n      _this.props.closeLoginDialog();\n    }, _this.handleCloseMessage = function () {\n      _this.props.closeMessage();\n    }, _temp), _possibleConstructorReturn(_this, _ret);\n  }\n  //   static fetchData(store) {\n  //   return new Promise((resolve, reject) => {\n  //     console.log(\"home\")\n  //     resolve()\n  //   })\n  // }    \n\n\n  _createClass(Root, [{\n    key: 'render',\n    value: function render() {\n      var _this2 = this;\n\n      var classes = this.props.classes;\n      // const state = store.getState();\n      // const { user: {authenticated}} = state.reducer;\n      // const routes = createRoutes(store);\n\n\n      return _react2.default.createElement(\n        _react2.default.Fragment,\n        null,\n        (0, _reactRouterConfig.renderRoutes)(this.props.route.routes),\n        _react2.default.createElement(_reactRouterDom.Route, { render: function render(props) {\n            return _react2.default.createElement(_LoginDialog2.default, {\n              open: _this2.props.isOpen,\n              onSubmit: _this2.handleSubmit,\n              onSignUp: function onSignUp() {\n                return _this2.toSignUp(props.location);\n              },\n              onClose: _this2.handleClose,\n              usernameErrorText: _this2.state.usernameErrorText,\n              passwordErrorText: _this2.state.passwordErrorText\n            });\n          } }),\n        _react2.default.createElement(_MessageDialog2.default, {\n          open: this.props.isOpenMessage,\n          onClose: this.handleCloseMessage,\n          message: this.props.message\n        }),\n        this.props.loading && _react2.default.createElement(_Progress.CircularProgress, { size: 160, className: classes.buttonProgress })\n      );\n    }\n  }]);\n\n  return Root;\n}(_react.Component);\n\nexports.default = (0, _reactRedux.connect)(function (reducer) {\n\n  return {\n    isOpen: reducer.user.loginDialogOpen,\n    message: reducer.user.message,\n    isOpenMessage: reducer.user.messageDialogOpen,\n    loading: reducer.user.isWaiting\n  };\n}, { manualLogin: _actions.manualLogin, closeLoginDialog: _actions.closeLoginDialog, openLoginDialog: _actions.openLoginDialog, toSignUp: _actions.toSignUp, closeMessage: _actions.closeMessage })((0, _styles.withStyles)(styles)(Root));\n\n//# sourceURL=webpack:///./src/client/containers/Root.js?");

/***/ }),

/***/ "./src/client/containers/SearchForm.js":
/*!*********************************************!*\
  !*** ./src/client/containers/SearchForm.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _SearchForm = __webpack_require__(/*! ../components/SearchForm */ \"./src/client/components/SearchForm.js\");\n\nvar _SearchForm2 = _interopRequireDefault(_SearchForm);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _actions = __webpack_require__(/*! ../../actions */ \"./src/actions.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = (0, _reactRedux.connect)(function () {\n  return {};\n}, { showPlaces: _actions.showPlaces, setLocation: _actions.setLocation, setPlacesLocation: _actions.setPlacesLocation })(_SearchForm2.default);\n\n//# sourceURL=webpack:///./src/client/containers/SearchForm.js?");

/***/ }),

/***/ "./src/client/containers/Signup.js":
/*!*****************************************!*\
  !*** ./src/client/containers/Signup.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _Signup = __webpack_require__(/*! ../components/Signup */ \"./src/client/components/Signup.js\");\n\nvar _Signup2 = _interopRequireDefault(_Signup);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _actions = __webpack_require__(/*! ../../actions */ \"./src/actions.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = (0, _reactRedux.connect)(function () {\n  return {};\n}, { signUp: _actions.signUp })(_Signup2.default);\n\n//# sourceURL=webpack:///./src/client/containers/Signup.js?");

/***/ }),

/***/ "./src/client/helpers/InputCheck.js":
/*!******************************************!*\
  !*** ./src/client/helpers/InputCheck.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nexports.default = function () {\n\tvar username = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';\n\tvar password = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';\n\n\n\tvar _username = username.trim();\n\tvar _password = password.trim();\n\tvar usernameError = '';\n\tvar passwordError = '';\n\tif (_username == '') usernameError = 'Username is required';\n\tif (_password == '') passwordError = 'Password is required';\n\tif (/[^a-zA-Z0-9_\\-]/g.test(_username)) usernameError = 'Username must contain only letters, digits, underscore and hyphen';\n\tif (_username && !/[a-zA-Z0-9]/g.test(_username)) {\n\t\tusernameError = usernameError ? usernameError + ' and username ' : 'Username ';\n\t\tusernameError += 'must contain at least one letter or digit';\n\t}\n\tif (/[^a-zA-Z0-9]/g.test(_password)) passwordError = 'Password must contain only letters and digits';\n\treturn { usernameError: usernameError, passwordError: passwordError };\n};\n\n//# sourceURL=webpack:///./src/client/helpers/InputCheck.js?");

/***/ }),

/***/ "./src/client/routes.js":
/*!******************************!*\
  !*** ./src/client/routes.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _Root = __webpack_require__(/*! ./containers/Root */ \"./src/client/containers/Root.js\");\n\nvar _Root2 = _interopRequireDefault(_Root);\n\nvar _Home = __webpack_require__(/*! ./containers/Home */ \"./src/client/containers/Home.js\");\n\nvar _Home2 = _interopRequireDefault(_Home);\n\nvar _Signup = __webpack_require__(/*! ./containers/Signup */ \"./src/client/containers/Signup.js\");\n\nvar _Signup2 = _interopRequireDefault(_Signup);\n\nvar _Places = __webpack_require__(/*! ./containers/Places */ \"./src/client/containers/Places.js\");\n\nvar _Places2 = _interopRequireDefault(_Places);\n\nvar _reactRouter = __webpack_require__(/*! react-router */ \"react-router\");\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _locations = __webpack_require__(/*! ../../util/locations */ \"./util/locations.js\");\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = function (store) {\n\n  var redirectAuth = function redirectAuth(props, Component) {\n    console.log(store.getState().user);\n    var authenticated = store.getState().user.authenticated;\n\n    return authenticated ? _react2.default.createElement(_reactRouter.Redirect, { to: '/' }) : _react2.default.createElement(Component, props);\n  };\n\n  var routes = [{ component: _Root2.default,\n    routes: [{ path: '/',\n      exact: true,\n      component: function component() {\n        return _react2.default.createElement(_reactRouter.Redirect, { to: '/location?loc=' + _locations.defaultLocation.address });\n      },\n      fetch: 'Root'\n    }, { path: '/location',\n      component: function component(props) {\n        // this.props.saveReturnTo(props.location);\n        console.log('h');\n        return _react2.default.createElement(_Home2.default, props);\n      },\n      fetch: 'location'\n    }, { path: '/places',\n      component: _Places2.default,\n      fetch: 'Places'\n    }, {\n      path: '/signup',\n      component: function component(props) {\n        return redirectAuth(props, _Signup2.default);\n      },\n      fetch: 'signup'\n\n    }]\n  }];\n  return routes;\n};\n\n//# sourceURL=webpack:///./src/client/routes.js?");

/***/ }),

/***/ "./src/reducer.js":
/*!************************!*\
  !*** ./src/reducer.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.initialState = undefined;\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nexports.user = user;\n\nvar _actions = __webpack_require__(/*! ./actions */ \"./src/actions.js\");\n\nvar _locations = __webpack_require__(/*! ./util/locations */ \"./src/util/locations.js\");\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nvar initialState = exports.initialState = {\n    isWaiting: false,\n    authenticated: false,\n    username: \"Guest\",\n    userBars: [],\n    message: [],\n    router: null,\n    bars: null,\n    location: _locations.defaultLocation.address,\n    lat: _locations.defaultLocation.lat,\n    lng: _locations.defaultLocation.lng,\n    signupReturnPath: \"/\",\n    guestBar: null,\n    loginDialogOpen: false,\n    loginMenuOpen: false,\n    messageDialogOpen: false,\n    highlighted: null,\n    footerHeight: 0,\n    headerHeight: 0\n};\n\nfunction user() {\n    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;\n    var action = arguments[1];\n\n    switch (action.type) {\n        case _actions.actionTypes.REMOVE_FROM_LIST:\n        case _actions.actionTypes.ADD_TO_LIST:\n        case _actions.actionTypes.FIND_LOCATION:\n        case _actions.actionTypes.FIND_PLACES:\n        case _actions.actionTypes.LOGOUT_USER:\n        case _actions.actionTypes.SIGNUP_USER:\n        case _actions.actionTypes.MANUAL_LOGIN_USER:\n            return _extends({}, state, { isWaiting: true });\n        case _actions.actionTypes.LOGIN_SUCCESS_USER:\n        case _actions.actionTypes.SIGNUP_SUCCESS_USER:\n            return _extends({}, state, { isWaiting: false,\n                authenticated: true,\n                username: action.username,\n                userBars: action.places,\n                message: [].concat(_toConsumableArray(state.message), [action.message]),\n                messageDialogOpen: true,\n                loginDialogOpen: false\n            });\n        case _actions.actionTypes.SIGNUP_ERROR_USER:\n        case _actions.actionTypes.LOGIN_ERROR_USER:\n            return _extends({}, state, { isWaiting: false,\n                authenticated: false,\n                messageDialogOpen: true,\n                message: [].concat(_toConsumableArray(state.message), [action.message]) });\n        case _actions.actionTypes.LOGOUT_ERROR_USER:\n            return _extends({}, state, { isWaiting: false,\n                authenticated: true });\n        case _actions.actionTypes.LOGOUT_SUCCESS_USER:\n            return _extends({}, state, { isWaiting: false,\n                authenticated: false,\n                username: \"Guest\",\n                userBars: [],\n                highlighted: null,\n                guestBar: null });\n        case _actions.actionTypes.FIND_LOCATION_SUCCESS:\n            return _extends({}, state, { isWaiting: false,\n                location: action.location,\n                lat: action.lat,\n                lng: action.lng,\n                bars: null });\n        case _actions.actionTypes.FIND_PLACES_SUCCESS:\n            return _extends({}, state, { isWaiting: false,\n                bars: action.data,\n                location: action.address,\n                lat: action.lat,\n                lng: action.lng });\n        case _actions.actionTypes.REMOVE_FROM_LIST_ERROR:\n        case _actions.actionTypes.ADD_TO_LIST_ERROR:\n        case _actions.actionTypes.FIND_LOCATION_ERROR:\n        case _actions.actionTypes.FIND_PLACES_ERROR:\n            return _extends({}, state, { isWaiting: false,\n                messageDialogOpen: true,\n                message: [].concat(_toConsumableArray(state.message), [action.message]),\n                guestBar: null });\n        case _actions.actionTypes.ADD_TO_LIST_SUCCESS:\n            {\n                //get index of bar in current location bars list\n                var i = state.bars.reduce(function (acc, item, index) {\n                    return item.id === action.placeID ? index : acc;\n                }, -1);\n                var newBar = null;\n                //check if the current user already in the list\n                if (~state.bars[i].users.indexOf(state.username)) {\n                    return _extends({}, state, { isWaiting: false });\n                } else {\n                    newBar = _extends({}, state.bars[i], { users: [].concat(_toConsumableArray(state.bars[i].users), [state.username]) });\n\n                    var newPlaces = [].concat(_toConsumableArray(state.bars.slice(0, i)), [newBar], _toConsumableArray(state.bars.slice(i + 1)));\n\n                    return _extends({}, state, { isWaiting: false,\n                        message: [].concat(_toConsumableArray(state.message), [action.message]),\n                        messageDialogOpen: true,\n                        userBars: [].concat(_toConsumableArray(state.userBars), [action.placeID]),\n                        bars: newPlaces,\n                        guestBar: null });\n                }\n            }\n        case _actions.actionTypes.REMOVE_FROM_LIST_SUCCESS:\n            {\n                var placeIndex = state.bars.reduce(function (acc, item, index) {\n                    return item.id === action.placeID ? index : acc;\n                }, -1);\n                var usersListIndex = state.bars[placeIndex].users.indexOf(state.username);\n                //remove user from users array in bar\n                state.bars[placeIndex].users.splice(usersListIndex, 1);\n                var _newBar = _extends({}, state.bars[placeIndex], { users: [].concat(_toConsumableArray(state.bars[placeIndex].users)) });\n                var _newPlaces = [].concat(_toConsumableArray(state.bars.slice(0, placeIndex)), [_newBar], _toConsumableArray(state.bars.slice(placeIndex + 1)));\n                var newUserBars = [].concat(_toConsumableArray(state.userBars));\n                var index = newUserBars.indexOf(action.placeID);\n                //remove bar from bars array in user\n                if (index >= 0) {\n                    newUserBars.splice(index, 1);\n                }\n                return _extends({}, state, { isWaiting: false,\n                    message: [].concat(_toConsumableArray(state.message), [action.message]),\n                    messageDialogOpen: true,\n                    userBars: newUserBars,\n                    bars: _newPlaces });\n            }\n        case _actions.actionTypes.HIGHLIGHT_PLACE:\n            return _extends({}, state, {\n                highlighted: action.placeID\n            });\n\n        case _actions.actionTypes.SAVE_PATH:\n            return _extends({}, state, { signupReturnPath: action.path });\n        case _actions.actionTypes.SAVE_GUEST_BAR:\n            return _extends({}, state, { guestBar: action.placeID });\n        case _actions.actionTypes.OPEN_LOGIN_DIALOG:\n            return _extends({}, state, { loginDialogOpen: true });\n        case _actions.actionTypes.CLOSE_LOGIN_DIALOG:\n            return _extends({}, state, { loginDialogOpen: false });\n\n        case _actions.actionTypes.OPEN_LOGIN_MENU:\n            return _extends({}, state, { loginMenuOpen: true });\n\n        case _actions.actionTypes.CLOSE_LOGIN_MENU:\n            return _extends({}, state, { loginMenuOpen: false });\n\n        case _actions.actionTypes.SHOW_MESSAGE_DIALOG:\n            return _extends({}, state, { messageDialogOpen: true,\n                message: [].concat(_toConsumableArray(state.message), [action.message]) });\n        case _actions.actionTypes.CLOSE_MESSAGE_DIALOG:\n            return _extends({}, state, { messageDialogOpen: false,\n                message: [] });\n        case _actions.actionTypes.FOOTER_HEIGHT:\n            return _extends({}, state, { footerHeight: action.height });\n        case _actions.actionTypes.HEADER_HEIGHT:\n            return _extends({}, state, { headerHeight: action.height });\n        default:\n            return state;\n    }\n}\n\nexports.default = user;\n\n//# sourceURL=webpack:///./src/reducer.js?");

/***/ }),

/***/ "./src/server/config.js":
/*!******************************!*\
  !*** ./src/server/config.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nvar config = exports.config = {\n\tMONGOLAB_URI: 'mongodb://ghajl:tosha46@ds133127.mlab.com:33127/fcc-urlsm',\n\tFACEBOOK_APP_ID: '232975173926881',\n\tFACEBOOK_APP_SECRET: 'f51dda20c94aa9aaa830c3d83addc4da',\n\tSESSION_SECRET: 'adfs2345hjoiu8798'\n};\n\n//# sourceURL=webpack:///./src/server/config.js?");

/***/ }),

/***/ "./src/server/controllers/users.js":
/*!*****************************************!*\
  !*** ./src/server/controllers/users.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.login = login;\nexports.logout = logout;\nexports.modifyPlaceList = modifyPlaceList;\nexports.register = register;\nexports.getUsersBarsData = getUsersBarsData;\n\nvar _mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nvar _passport = __webpack_require__(/*! passport */ \"passport\");\n\nvar _passport2 = _interopRequireDefault(_passport);\n\nvar _user = __webpack_require__(/*! ../models/user */ \"./src/server/models/user.js\");\n\nvar _user2 = _interopRequireDefault(_user);\n\nvar _place = __webpack_require__(/*! ../models/place */ \"./src/server/models/place.js\");\n\nvar _place2 = _interopRequireDefault(_place);\n\nvar _axios = __webpack_require__(/*! axios */ \"axios\");\n\nvar _axios2 = _interopRequireDefault(_axios);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction login(req, res, next) {\n\t_passport2.default.authenticate(\"local\", function (err, user, info) {\n\t\tif (err) return next(err);\n\t\tif (!user) {\n\t\t\treturn res.sendStatus(401);\n\t\t}\n\t\treturn req.logIn(user, function (loginErr) {\n\t\t\tif (loginErr) {\n\t\t\t\treturn res.sendStatus(401);\n\t\t\t}\n\t\t\treturn res.json({ places: user.places });\n\t\t});\n\t})(req, res, next);\n}\n\n// -------------------------------------------\n\nfunction logout(req, res, next) {\n\t// the logout method is added to the request object automatically by Passport\n\treq.logout();\n\treturn res.sendStatus(200);\n}\n\n//user adds/removes himself to/from the list of users that are going to the bar -\n//add/remove username to/from list of users in Place and\n//add/remove place id to/from list of places in User\nfunction modifyPlaceList(req, res, next) {\n\n\tif (req.body.operation === 'ADD') {\n\t\t_place2.default.findOneAndUpdate({ placeID: req.body.placeID }, { $addToSet: { users: req.body.username } }, { upsert: true }, function (err) {\n\t\t\tif (err) {\n\t\t\t\treturn res.sendStatus(401);\n\t\t\t}\n\t\t\t_user2.default.update({ username: req.body.username }, { $addToSet: { places: req.body.placeID } }, function (err) {\n\t\t\t\tif (err) {\n\t\t\t\t\t_place2.default.update({ placeID: req.body.placeID }, { $pull: { users: req.body.username } }, function (err) {\n\t\t\t\t\t\tif (err) {\n\t\t\t\t\t\t\treturn res.sendStatus(401);\n\t\t\t\t\t\t}\n\t\t\t\t\t});\n\t\t\t\t\treturn res.sendStatus(401);\n\t\t\t\t}\n\t\t\t\treturn res.sendStatus(200);\n\t\t\t});\n\t\t});\n\t} else if (req.body.operation === 'REMOVE') {\n\t\t_place2.default.findOneAndUpdate({ placeID: req.body.placeID }, { $pull: { users: req.body.username } }, function (err) {\n\t\t\tif (err) {\n\t\t\t\treturn res.sendStatus(401);\n\t\t\t}\n\t\t\t_user2.default.update({ username: req.body.username }, { $pull: { places: req.body.placeID } }, function (err) {\n\t\t\t\tif (err) {\n\t\t\t\t\t_place2.default.update({ placeID: req.body.placeID }, { $addToSet: { users: req.body.username } }, function (err) {\n\t\t\t\t\t\tif (err) {\n\t\t\t\t\t\t\treturn res.sendStatus(401);\n\t\t\t\t\t\t}\n\t\t\t\t\t});\n\t\t\t\t\treturn res.sendStatus(401);\n\t\t\t\t}\n\t\t\t\treturn res.sendStatus(200);\n\t\t\t});\n\t\t});\n\t} else {\n\t\treturn res.sendStatus(401);\n\t}\n}\n\nfunction register(req, res, next) {\n\tvar newUser = new _user2.default({\n\t\tusername: req.body.username,\n\t\tpassword: req.body.password\n\t});\n\t_user2.default.findOne({ username: req.body.username }, function (err, user) {\n\t\t// is username already in use?\n\t\tif (user) {\n\n\t\t\treturn res.sendStatus(409);\n\t\t}\n\t\t// create the new user\n\n\t\treturn newUser.save(function (err, user) {\n\t\t\tif (err) {\n\n\t\t\t\treturn res.sendStatus(401);\n\t\t\t}\n\t\t\treturn req.logIn(user, function (loginErr) {\n\t\t\t\tif (loginErr) return res.sendStatus(401);\n\t\t\t\treturn res.sendStatus(200);\n\t\t\t});\n\t\t});\n\t});\n}\n\n//returns - if exist - users lists of bars currently found by search on client\nfunction getUsersBarsData(req, res, next) {\n\tif (!req.query.bars) return res.sendStatus(401);\n\tvar bars = req.query.bars;\n\n\t_place2.default.find({ placeID: { $in: bars } }, 'placeID users', function (err, docs) {\n\t\tif (err) {\n\t\t\treturn res.sendStatus(401);\n\t\t}\n\t\treturn res.json({ places: docs });\n\t});\n}\n\n//# sourceURL=webpack:///./src/server/controllers/users.js?");

/***/ }),

/***/ "./src/server/index.js":
/*!*****************************!*\
  !*** ./src/server/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _expressSession = __webpack_require__(/*! express-session */ \"express-session\");\n\nvar _expressSession2 = _interopRequireDefault(_expressSession);\n\nvar _bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nvar _bodyParser2 = _interopRequireDefault(_bodyParser);\n\nvar _connectMongo = __webpack_require__(/*! connect-mongo */ \"connect-mongo\");\n\nvar _connectMongo2 = _interopRequireDefault(_connectMongo);\n\nvar _mongo = __webpack_require__(/*! ./init/mongo */ \"./src/server/init/mongo.js\");\n\nvar _mongo2 = _interopRequireDefault(_mongo);\n\nvar _routes = __webpack_require__(/*! ./init/routes */ \"./src/server/init/routes.js\");\n\nvar _routes2 = _interopRequireDefault(_routes);\n\nvar _passport = __webpack_require__(/*! ./init/passport */ \"./src/server/init/passport.js\");\n\nvar _passport2 = _interopRequireDefault(_passport);\n\nvar _middleware = __webpack_require__(/*! ./render/middleware */ \"./src/server/render/middleware.js\");\n\nvar _middleware2 = _interopRequireDefault(_middleware);\n\nvar _passport3 = __webpack_require__(/*! passport */ \"passport\");\n\nvar _passport4 = _interopRequireDefault(_passport3);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// import webpack from 'webpack';\n// import webpackConfig from '../webpack.config.js';\nvar app = (0, _express2.default)();\n// const compiler = webpack(webpackConfig);\nvar cors = __webpack_require__(/*! cors */ \"cors\");\n\napp.use('/public', _express2.default.static(process.cwd() + '/public'));\napp.use('/dist', _express2.default.static(process.cwd() + '/dist'));\napp.use(__webpack_require__(/*! cookie-parser */ \"cookie-parser\")());\napp.use(_bodyParser2.default.json());\napp.use(_bodyParser2.default.urlencoded({ extended: true }));\n\nvar config = null;\nvar isDev = \"development\" === \"development\";\nif (isDev) {\n\tconfig = __webpack_require__(/*! ./config */ \"./src/server/config.js\").config;\n\t// \tapp.use(webpackDevMiddleware(compiler, {\n\t// \t    publicPath: webpackConfig.output.publicPath\n\t// \t}));\n\t// \tapp.use(webpackHotMiddleware(compiler));\n\t// \tapp.use(cors({\n\t// \t    origin: 'http://localhost:3000/',\n\t// \t    credentials: true\n\t// \t}));\n}\n\nvar mongoUri = process.env.MONGOLAB_URI || config.MONGOLAB_URI;\n\n(0, _mongo2.default)(mongoUri);\n\n(0, _passport2.default)(_passport4.default, config);\n\nvar MongoStore = (0, _connectMongo2.default)(_expressSession2.default);\nvar sessionSecret = process.env.SESSION_SECRET || config.SESSION_SECRET;\nvar sess = {\n\tsecret: sessionSecret,\n\tresave: false,\n\tsaveUninitialized: false,\n\tcookie: { maxAge: 24 * 60 * 60 * 1000 },\n\tstore: new MongoStore({\n\t\turl: mongoUri,\n\t\tautoReconnect: true\n\t})\n};\n\napp.use((0, _expressSession2.default)(sess));\n\n// // Initialize Passport and restore authentication state, if any, from the\n// // session.\napp.use(_passport4.default.initialize());\napp.use(_passport4.default.session());\napp.options('*', cors());\n//save url for redirecting after successful facebook authentication\napp.use(function (req, res, next) {\n\tif (req.path !== '/login' && req.path !== '/signup' && !req.path.match(/^\\/auth/) && !req.path.match(/^\\/data/) && !req.path.match(/\\./)) {\n\t\treq.session.returnTo = '/';\n\t}\n\tnext();\n});\n\napp.get('/privacypolicy', function (req, res) {\n\tres.sendFile(process.cwd() + \"/public/privacypolicy.htm\");\n});\napp.get('/favicon.ico', function (req, res) {\n\treturn res.status(204);\n});\n(0, _routes2.default)(app, _passport4.default);\napp.get('*', _middleware2.default);\n// const bundlePath = \"/dist/bundle.js\";\n// app.all(\"*\", (req, res, next) => {\t\n\n// \tconst appHTML = \n// \t`<!doctype html>\n// \t<html lang=\"\">\n// \t<head>\n// \t\t<meta http-equiv=\"Content-Type\" content=\"text/html;charset=utf-8\" />\n// \t\t<meta name=\"viewport\" content=\"user-scalable=0, initial-scale=1, minimum-scale=1, width=device-width, height=device-height\">\n// \t\t<link type=\"text/css\" rel=\"stylesheet\" href=\"public/main.css\">\n// \t    <link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=Roboto:300,400,500\"/>\n// \t    <script type=\"text/javascript\" src=\"https://maps.googleapis.com/maps/api/js?key=AIzaSyBPQYCvM0i495Py8i7GV3wn2odaGbwGPPo&libraries=geometry,drawing,places\"></script>\n\n// \t    <title>freeCodeCamp - Nightlife Coordination App</title>\n\n// \t</head>\n// \t<body>\n// \t\t<div id=\"root\"></div>\n\n// \t\t<script src=${bundlePath}></script>\n// \t</body>\n// \t</html>`\n\n// \tres.status(200).end(appHTML)\n\n// })\nvar port = process.env.PORT || 3000;\napp.listen(port, function () {\n\tconsole.log('app listening on port ' + port + '\\n');\n});\n\n//# sourceURL=webpack:///./src/server/index.js?");

/***/ }),

/***/ "./src/server/init/mongo.js":
/*!**********************************!*\
  !*** ./src/server/init/mongo.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = function (uri) {\n\t// let config = null;\n\t// const isDev = process.env.NODE_ENV === \"development\";\n\t// if(isDev) {\n\t//     config = require(\"../config\").config;\n\t// // \tapp.use(webpackDevMiddleware(compiler, {\n\t// // \t    publicPath: webpackConfig.output.publicPath\n\t// // \t}));\n\t// // \tapp.use(webpackHotMiddleware(compiler));\n\t// // \tapp.use(cors({\n\t// // \t    origin: 'http://localhost:3000/',\n\t// // \t    credentials: true\n\t// // \t}));\n\t// }\n\t// const mongoDB = process.env.MONGOLAB_URI || config.MONGOLAB_URI;\n\tvar mongoOptions = {\n\t\tuseMongoClient: true,\n\t\treconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect\n\t\treconnectInterval: 500 // Reconnect every 500ms\n\t};\n\tvar connect = function connect() {\n\t\t_mongoose2.default.connect(uri, mongoOptions, function (err, res) {\n\t\t\tif (err) {\n\t\t\t\tconsole.log(\"Error connecting\");\n\t\t\t} else {\n\t\t\t\tconsole.log(\"Successfully connected\");\n\t\t\t}\n\t\t});\n\t};\n\tconnect();\n\t_mongoose2.default.Promise = global.Promise;\n\tvar db = _mongoose2.default.connection;\n\tdb.on(\"error\", console.error);\n\tdb.on(\"disconnected\", connect);\n};\n\n//# sourceURL=webpack:///./src/server/init/mongo.js?");

/***/ }),

/***/ "./src/server/init/passport.js":
/*!*************************************!*\
  !*** ./src/server/init/passport.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _passportLocal = __webpack_require__(/*! passport-local */ \"passport-local\");\n\nvar _passportFacebook = __webpack_require__(/*! passport-facebook */ \"passport-facebook\");\n\nvar _user = __webpack_require__(/*! ../models/user */ \"./src/server/models/user.js\");\n\nvar _user2 = _interopRequireDefault(_user);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = function (passport, config) {\n  passport.use(new _passportLocal.Strategy(function (username, password, cb) {\n    _user2.default.findOne({ username: username }, function (err, user) {\n      if (err) {\n        return cb(err);\n      }\n      if (!user) return cb(null, false, { message: \"User not found\" });\n      user.comparePassword(password, function (err, isMatch) {\n        if (isMatch) {\n          return cb(null, user);\n        } else {\n          return cb(null, false, { message: \"Invalid username or password\" });\n        }\n      });\n    });\n  }));\n  var facebookId = process.env.FACEBOOK_APP_ID || config.FACEBOOK_APP_ID;\n  var facebookSecret = process.env.FACEBOOK_APP_SECRET || config.FACEBOOK_APP_SECRET;\n  passport.use(new _passportFacebook.Strategy({\n    clientID: facebookId,\n    clientSecret: facebookSecret,\n    callbackURL: 'https://fcc-barcoordinator.herokuapp.com/auth/facebook/callback',\n    profileFields: ['id', 'displayName', 'name', 'email']\n  }, function (accessToken, refreshToken, profile, cb) {\n    _user2.default.findOne({ fb: profile.id }, function (err, user) {\n      if (err) {\n        console.log(err);\n        return cb(err);\n      }\n      if (user) {\n        return cb(null, user);\n      }\n      var newUser = new _user2.default();\n      console.log(profile);\n      newUser.fb = profile.id;\n      newUser.profile.givenName = profile.name && profile.name.givenName || '';\n      newUser.profile.familyName = profile.name && profile.name.familyName || '';\n      newUser.profile.displayName = profile.displayName || 'Facebook User';\n      newUser.save(function (err) {\n        cb(err, newUser);\n      });\n    });\n  }));\n\n  passport.serializeUser(function (user, done) {\n    done(null, user.id);\n  });\n\n  passport.deserializeUser(function (id, done) {\n    _user2.default.findById(id, function (err, user) {\n      done(err, user);\n    });\n  });\n\n  // Initialize Passport and restore authentication state, if any, from the\n  // session.\n  // app.use(passport.initialize());\n\n};\n\n//# sourceURL=webpack:///./src/server/init/passport.js?");

/***/ }),

/***/ "./src/server/init/routes.js":
/*!***********************************!*\
  !*** ./src/server/init/routes.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _users = __webpack_require__(/*! ../controllers/users */ \"./src/server/controllers/users.js\");\n\nexports.default = function (app, passport) {\n\tapp.post(\"/login\", _users.login);\n\tapp.get(\"/logout\", _users.logout);\n\tapp.post(\"/signup\", _users.register);\n\tapp.post(\"/places\", _users.modifyPlaceList);\n\tapp.get(\"/data\", _users.getUsersBarsData);\n\n\tapp.get('/auth/facebook', passport.authenticate('facebook'));\n\tapp.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/signup' }), function (req, res) {\n\t\tconsole.log(req.session);\n\t\tres.redirect(req.session.returnTo || '/');\n\t});\n};\n\n//https://fcc-barcoordinator.herokuapp.com/auth/facebook/callback\n\n//# sourceURL=webpack:///./src/server/init/routes.js?");

/***/ }),

/***/ "./src/server/models/place.js":
/*!************************************!*\
  !*** ./src/server/models/place.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _bcryptNodejs = __webpack_require__(/*! bcrypt-nodejs */ \"bcrypt-nodejs\");\n\nvar _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);\n\nvar _mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar ObjectId = _mongoose2.default.Schema.Types.ObjectId;\n\nvar PlaceSchema = new _mongoose2.default.Schema({\n\tplaceID: {\n\t\ttype: String,\n\t\tunique: true\n\t},\n\tusers: [String]\n});\n\n// UserSchema.pre(\"save\", function(next) {\n// \tvar user = this;\n\n// \tif (!user.isModified(\"password\")) return next()\n\n// \tbcrypt.genSalt(5, (err, salt) => {\n// \t\tif (err) return next(err);\n// \t\tbcrypt.hash(user.password, salt, null, (err, hash) => {\n// \t\t\tif (err) return next(err)\n// \t\t\t\tconsole.log(\"user\");\n// \t\t\tuser.password = hash\n\n// \t\t\tnext()\n// \t\t})\n// \t})\n// })\n// UserSchema.methods = {\n//  \tcomparePassword: function(candidatePassword, cb) {\n//  \t\tbcrypt.compare(candidatePassword, this.password, (err, isMatch) => {\n//  \t\t\tif (err) return cb(err)\n//  \t\t\tcb(null, isMatch)\n//  \t\t})\n//  \t}\n// }\n\n\nvar Place = _mongoose2.default.model('Place', PlaceSchema);\nexports.default = Place;\n\n//# sourceURL=webpack:///./src/server/models/place.js?");

/***/ }),

/***/ "./src/server/models/user.js":
/*!***********************************!*\
  !*** ./src/server/models/user.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _bcryptNodejs = __webpack_require__(/*! bcrypt-nodejs */ \"bcrypt-nodejs\");\n\nvar _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);\n\nvar _mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar UserSchema = new _mongoose2.default.Schema({\n\tusername: {\n\t\ttype: String,\n\t\tunique: true\n\t},\n\tpassword: String,\n\tplaces: [String],\n\tprofile: {\n\t\tgivenName: { type: String, default: '' },\n\t\tfamilyName: { type: String, default: '' }\n\t},\n\tfb: String\n});\n\nUserSchema.pre(\"save\", function (next) {\n\tvar user = this;\n\n\tif (!user.isModified(\"password\")) return next();\n\n\t_bcryptNodejs2.default.genSalt(10, function (err, salt) {\n\t\tif (err) return next(err);\n\t\t_bcryptNodejs2.default.hash(user.password, salt, null, function (err, hash) {\n\t\t\tif (err) return next(err);\n\t\t\t// console.log(\"user\");\n\t\t\tuser.password = hash;\n\n\t\t\tnext();\n\t\t});\n\t});\n});\nUserSchema.methods = {\n\tcomparePassword: function comparePassword(candidatePassword, cb) {\n\t\t_bcryptNodejs2.default.compare(candidatePassword, this.password, function (err, isMatch) {\n\t\t\tif (err) return cb(err);\n\t\t\tcb(null, isMatch);\n\t\t});\n\t}\n};\nvar User = _mongoose2.default.model('User', UserSchema);\nexports.default = User;\n\n//# sourceURL=webpack:///./src/server/models/user.js?");

/***/ }),

/***/ "./src/server/render/middleware.js":
/*!*****************************************!*\
  !*** ./src/server/render/middleware.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _server = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n\nvar _StaticRouter = __webpack_require__(/*! react-router-dom/StaticRouter */ \"react-router-dom/StaticRouter\");\n\nvar _StaticRouter2 = _interopRequireDefault(_StaticRouter);\n\nvar _redux = __webpack_require__(/*! redux */ \"redux\");\n\nvar _reactRouterRedux = __webpack_require__(/*! react-router-redux */ \"react-router-redux\");\n\nvar _reactRouterConfig = __webpack_require__(/*! react-router-config */ \"react-router-config\");\n\nvar _createMemoryHistory = __webpack_require__(/*! history/createMemoryHistory */ \"history/createMemoryHistory\");\n\nvar _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);\n\nvar _reduxThunk = __webpack_require__(/*! redux-thunk */ \"redux-thunk\");\n\nvar _reduxThunk2 = _interopRequireDefault(_reduxThunk);\n\nvar _reducer = __webpack_require__(/*! ../../reducer */ \"./src/reducer.js\");\n\nvar _reducer2 = _interopRequireDefault(_reducer);\n\nvar _routes = __webpack_require__(/*! ../../client/routes */ \"./src/client/routes.js\");\n\nvar _routes2 = _interopRequireDefault(_routes);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _serializeJavascript = __webpack_require__(/*! serialize-javascript */ \"serialize-javascript\");\n\nvar _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = function (req, res) {\n  var path = req.path || '/';\n  var combReducers = (0, _redux.combineReducers)({\n    user: _reducer2.default,\n    router: _reactRouterRedux.routerReducer\n  });\n  var history = (0, _createMemoryHistory2.default)({ initialEntries: [path] });\n  var middlewareHistory = (0, _reactRouterRedux.routerMiddleware)(history);\n  var store = (0, _redux.createStore)(combReducers, {}, (0, _redux.applyMiddleware)(middlewareHistory, _reduxThunk2.default));\n  var routes = (0, _routes2.default)(store);\n  var branch = (0, _reactRouterConfig.matchRoutes)(routes, req.url.slice(0, req.url.indexOf('?')));\n  var promises = branch.map(function (_ref) {\n    var route = _ref.route;\n\n    console.log(req.url);\n    console.log(branch);\n    console.log(route.fetch);\n\n    var fetchData = route.component.fetchData;\n    return fetchData instanceof Function ? fetchData(store) : Promise.resolve(null);\n  });\n\n  return Promise.all(promises).then(function (data) {\n    var context = {};\n    var content = (0, _server.renderToString)(_react2.default.createElement(\n      _reactRedux.Provider,\n      { store: store },\n      _react2.default.createElement(\n        _reactRouterRedux.ConnectedRouter,\n        { history: history },\n        (0, _reactRouterConfig.renderRoutes)(routes)\n      )\n    ));\n\n    res.send('\\n      <!DOCTYPE html>\\n      <html>\\n        <head>\\n          \\t\\t<meta http-equiv=\"Content-Type\" content=\"text/html;charset=utf-8\" />\\n\\t\\t<meta name=\"viewport\" content=\"user-scalable=0, initial-scale=1, minimum-scale=1, width=device-width, height=device-height\">\\n\\t\\t<link type=\"text/css\" rel=\"stylesheet\" href=\"public/main.css\">\\n\\t    <link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=Roboto:300,400,500\"/>\\n\\t    <script type=\"text/javascript\" src=\"https://maps.googleapis.com/maps/api/js?key=AIzaSyBPQYCvM0i495Py8i7GV3wn2odaGbwGPPo&libraries=geometry,drawing,places\"></script>\\n\\n\\t    <title>freeCodeCamp - Nightlife Coordination App</title>\\n          <script src=\"/dist/bundle.js\" defer></script>\\n          <script>window.__INITIAL_DATA__ = ' + (0, _serializeJavascript2.default)(data) + '</script>\\n        </head>\\n\\n        <body>\\n          <div id=\"root\">' + content + '</div>\\n        </body>\\n      </html>\\n    ');\n  });\n\n  // let context = {};\n  // const content = renderToString(\n  // \t<Provider store={store}>\n  // \t    <StaticRouter location={req.url} context={context}>\n  // \t\t    {routes}\n  // \t    </StaticRouter>\n  //     </Provider>,\n  // );\n  // res.render('index', {title: 'Express', data: false, content });\n};\n\n//# sourceURL=webpack:///./src/server/render/middleware.js?");

/***/ }),

/***/ "./src/store.js":
/*!**********************!*\
  !*** ./src/store.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.configureStore = configureStore;\nexports.getPersistor = getPersistor;\n\nvar _redux = __webpack_require__(/*! redux */ \"redux\");\n\nvar _reducer = __webpack_require__(/*! ./reducer */ \"./src/reducer.js\");\n\nvar _reducer2 = _interopRequireDefault(_reducer);\n\nvar _reactRouterRedux = __webpack_require__(/*! react-router-redux */ \"react-router-redux\");\n\nvar _reduxThunk = __webpack_require__(/*! redux-thunk */ \"redux-thunk\");\n\nvar _reduxThunk2 = _interopRequireDefault(_reduxThunk);\n\nvar _reduxPersist = __webpack_require__(/*! redux-persist */ \"redux-persist\");\n\nvar _storage = __webpack_require__(/*! redux-persist/lib/storage */ \"redux-persist/lib/storage\");\n\nvar _storage2 = _interopRequireDefault(_storage);\n\nvar _session = __webpack_require__(/*! redux-persist/lib/storage/session */ \"redux-persist/lib/storage/session\");\n\nvar _session2 = _interopRequireDefault(_session);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar config = {\n  key: 'root',\n  storage: _session2.default\n};\n\nvar combReducers = (0, _redux.combineReducers)({\n  user: _reducer2.default,\n  router: _reactRouterRedux.routerReducer\n});\n\nvar reducers = (0, _reduxPersist.persistCombineReducers)(config, { reducer: combReducers });\n\nvar persistor = null;\n\nfunction configureStore(history) {\n  var middleware = [_reduxThunk2.default, (0, _reactRouterRedux.routerMiddleware)(history)];\n  var store = (0, _redux.createStore)(reducers, undefined, _redux.applyMiddleware.apply(undefined, middleware));\n\n  persistor = (0, _reduxPersist.persistStore)(store);\n  return { store: store, persistor: persistor };\n}\n\nfunction getPersistor() {\n  return persistor;\n}\n\n//# sourceURL=webpack:///./src/store.js?");

/***/ }),

/***/ "./src/util/icons.js":
/*!***************************!*\
  !*** ./src/util/icons.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar RED_MARKER = exports.RED_MARKER = \"https://maps.google.com/mapfiles/ms/icons/red-dot.png\";\nvar BLUE_MARKER = exports.BLUE_MARKER = \"https://maps.google.com/mapfiles/ms/icons/blue-dot.png\";\n\n//# sourceURL=webpack:///./src/util/icons.js?");

/***/ }),

/***/ "./src/util/locations.js":
/*!*******************************!*\
  !*** ./src/util/locations.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nvar defaultLocation = exports.defaultLocation = {\n\taddress: \"San Francisco, CA\",\n\tlat: 37.774,\n\tlng: -122.4194\n};\n\n//# sourceURL=webpack:///./src/util/locations.js?");

/***/ }),

/***/ "./util/locations.js":
/*!***************************!*\
  !*** ./util/locations.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nvar defaultLocation = exports.defaultLocation = {\n\taddress: \"San Francisco, CA\",\n\tlat: 37.774,\n\tlng: -122.4194\n};\n\n//# sourceURL=webpack:///./util/locations.js?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");\n\n//# sourceURL=webpack:///external_%22axios%22?");

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

/***/ "history/createMemoryHistory":
/*!**********************************************!*\
  !*** external "history/createMemoryHistory" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"history/createMemoryHistory\");\n\n//# sourceURL=webpack:///external_%22history/createMemoryHistory%22?");

/***/ }),

/***/ "material-ui-icons/AccountBox":
/*!***********************************************!*\
  !*** external "material-ui-icons/AccountBox" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"material-ui-icons/AccountBox\");\n\n//# sourceURL=webpack:///external_%22material-ui-icons/AccountBox%22?");

/***/ }),

/***/ "material-ui/AppBar":
/*!*************************************!*\
  !*** external "material-ui/AppBar" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"material-ui/AppBar\");\n\n//# sourceURL=webpack:///external_%22material-ui/AppBar%22?");

/***/ }),

/***/ "material-ui/Button":
/*!*************************************!*\
  !*** external "material-ui/Button" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"material-ui/Button\");\n\n//# sourceURL=webpack:///external_%22material-ui/Button%22?");

/***/ }),

/***/ "material-ui/Dialog":
/*!*************************************!*\
  !*** external "material-ui/Dialog" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"material-ui/Dialog\");\n\n//# sourceURL=webpack:///external_%22material-ui/Dialog%22?");

/***/ }),

/***/ "material-ui/Grid":
/*!***********************************!*\
  !*** external "material-ui/Grid" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"material-ui/Grid\");\n\n//# sourceURL=webpack:///external_%22material-ui/Grid%22?");

/***/ }),

/***/ "material-ui/IconButton":
/*!*****************************************!*\
  !*** external "material-ui/IconButton" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"material-ui/IconButton\");\n\n//# sourceURL=webpack:///external_%22material-ui/IconButton%22?");

/***/ }),

/***/ "material-ui/List":
/*!***********************************!*\
  !*** external "material-ui/List" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"material-ui/List\");\n\n//# sourceURL=webpack:///external_%22material-ui/List%22?");

/***/ }),

/***/ "material-ui/Menu":
/*!***********************************!*\
  !*** external "material-ui/Menu" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"material-ui/Menu\");\n\n//# sourceURL=webpack:///external_%22material-ui/Menu%22?");

/***/ }),

/***/ "material-ui/Progress":
/*!***************************************!*\
  !*** external "material-ui/Progress" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"material-ui/Progress\");\n\n//# sourceURL=webpack:///external_%22material-ui/Progress%22?");

/***/ }),

/***/ "material-ui/TextField":
/*!****************************************!*\
  !*** external "material-ui/TextField" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"material-ui/TextField\");\n\n//# sourceURL=webpack:///external_%22material-ui/TextField%22?");

/***/ }),

/***/ "material-ui/Toolbar":
/*!**************************************!*\
  !*** external "material-ui/Toolbar" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"material-ui/Toolbar\");\n\n//# sourceURL=webpack:///external_%22material-ui/Toolbar%22?");

/***/ }),

/***/ "material-ui/Typography":
/*!*****************************************!*\
  !*** external "material-ui/Typography" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"material-ui/Typography\");\n\n//# sourceURL=webpack:///external_%22material-ui/Typography%22?");

/***/ }),

/***/ "material-ui/styles":
/*!*************************************!*\
  !*** external "material-ui/styles" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"material-ui/styles\");\n\n//# sourceURL=webpack:///external_%22material-ui/styles%22?");

/***/ }),

/***/ "material-ui/utils/withWidth":
/*!**********************************************!*\
  !*** external "material-ui/utils/withWidth" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"material-ui/utils/withWidth\");\n\n//# sourceURL=webpack:///external_%22material-ui/utils/withWidth%22?");

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

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"prop-types\");\n\n//# sourceURL=webpack:///external_%22prop-types%22?");

/***/ }),

/***/ "query-string":
/*!*******************************!*\
  !*** external "query-string" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"query-string\");\n\n//# sourceURL=webpack:///external_%22query-string%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom/server\");\n\n//# sourceURL=webpack:///external_%22react-dom/server%22?");

/***/ }),

/***/ "react-google-maps":
/*!************************************!*\
  !*** external "react-google-maps" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-google-maps\");\n\n//# sourceURL=webpack:///external_%22react-google-maps%22?");

/***/ }),

/***/ "react-jss":
/*!****************************!*\
  !*** external "react-jss" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-jss\");\n\n//# sourceURL=webpack:///external_%22react-jss%22?");

/***/ }),

/***/ "react-places-autocomplete":
/*!********************************************!*\
  !*** external "react-places-autocomplete" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-places-autocomplete\");\n\n//# sourceURL=webpack:///external_%22react-places-autocomplete%22?");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-redux\");\n\n//# sourceURL=webpack:///external_%22react-redux%22?");

/***/ }),

/***/ "react-router":
/*!*******************************!*\
  !*** external "react-router" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router\");\n\n//# sourceURL=webpack:///external_%22react-router%22?");

/***/ }),

/***/ "react-router-config":
/*!**************************************!*\
  !*** external "react-router-config" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-config\");\n\n//# sourceURL=webpack:///external_%22react-router-config%22?");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-dom\");\n\n//# sourceURL=webpack:///external_%22react-router-dom%22?");

/***/ }),

/***/ "react-router-dom/StaticRouter":
/*!************************************************!*\
  !*** external "react-router-dom/StaticRouter" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-dom/StaticRouter\");\n\n//# sourceURL=webpack:///external_%22react-router-dom/StaticRouter%22?");

/***/ }),

/***/ "react-router-redux":
/*!*************************************!*\
  !*** external "react-router-redux" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-redux\");\n\n//# sourceURL=webpack:///external_%22react-router-redux%22?");

/***/ }),

/***/ "recompose":
/*!****************************!*\
  !*** external "recompose" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"recompose\");\n\n//# sourceURL=webpack:///external_%22recompose%22?");

/***/ }),

/***/ "recompose/compose":
/*!************************************!*\
  !*** external "recompose/compose" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"recompose/compose\");\n\n//# sourceURL=webpack:///external_%22recompose/compose%22?");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux\");\n\n//# sourceURL=webpack:///external_%22redux%22?");

/***/ }),

/***/ "redux-persist":
/*!********************************!*\
  !*** external "redux-persist" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux-persist\");\n\n//# sourceURL=webpack:///external_%22redux-persist%22?");

/***/ }),

/***/ "redux-persist/lib/integration/react":
/*!******************************************************!*\
  !*** external "redux-persist/lib/integration/react" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux-persist/lib/integration/react\");\n\n//# sourceURL=webpack:///external_%22redux-persist/lib/integration/react%22?");

/***/ }),

/***/ "redux-persist/lib/storage":
/*!********************************************!*\
  !*** external "redux-persist/lib/storage" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux-persist/lib/storage\");\n\n//# sourceURL=webpack:///external_%22redux-persist/lib/storage%22?");

/***/ }),

/***/ "redux-persist/lib/storage/session":
/*!****************************************************!*\
  !*** external "redux-persist/lib/storage/session" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux-persist/lib/storage/session\");\n\n//# sourceURL=webpack:///external_%22redux-persist/lib/storage/session%22?");

/***/ }),

/***/ "redux-thunk":
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux-thunk\");\n\n//# sourceURL=webpack:///external_%22redux-thunk%22?");

/***/ }),

/***/ "serialize-javascript":
/*!***************************************!*\
  !*** external "serialize-javascript" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"serialize-javascript\");\n\n//# sourceURL=webpack:///external_%22serialize-javascript%22?");

/***/ })

/******/ });