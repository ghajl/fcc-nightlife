require('babel-register');
var React = require("react");
var Home = require("./containers/Home");
var Signup = require("./containers/Signup");
var Places = require("./containers/Places");
var NotFound = require("./components/NotFound");
var defaultLocation = require("../util/locations").defaultLocation;
var Route = require("react-router-dom").Route;
var Switch = require("react-router-dom").Switch;
var Redirect = require("react-router-dom").Redirect;

module.exports.default = function (store) {
	var state = store.getState();
	var authenticated = state.reducer.user.authenticated;

	return React.createElement(
		Switch,
		null,
		React.createElement(Route, { exact: true, path: "/", render: function render() {
				return React.createElement(Redirect, { to: "/location?loc=" + defaultLocation.address });
			} }),
		React.createElement(Route, { path: "/location", component: Home }),
		React.createElement(Route, { path: "/signup", render: function render(props) {
				return authenticated ? React.createElement(Redirect, { to: '/' }) : React.createElement(Signup, props);
			} }),
		React.createElement(Route, { path: "/places", component: Places }),
		React.createElement(Route, { component: NotFound })
	);
};