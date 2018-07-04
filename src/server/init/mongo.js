import mongoose from "mongoose";

export default (uri) => {
	// let config = null;
	// const isDev = process.env.NODE_ENV === "development";
	// if(isDev) {
	//     config = require("../config").config;
	// // 	app.use(webpackDevMiddleware(compiler, {
	// // 	    publicPath: webpackConfig.output.publicPath
	// // 	}));
	// // 	app.use(webpackHotMiddleware(compiler));
	// // 	app.use(cors({
	// // 	    origin: 'http://localhost:3000/',
	// // 	    credentials: true
	// // 	}));
	// }
	// const mongoDB = process.env.MONGOLAB_URI || config.MONGOLAB_URI;
	const mongoOptions = {
	  useMongoClient: true,
	  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
	  reconnectInterval: 500, // Reconnect every 500ms
	};
	const connect = () => {
		mongoose.connect(uri, mongoOptions, (err, res) => {
			if (err) {
				console.log(`Error connecting`)
			} else {
				console.log(`Successfully connected`)
			}
		});
	}
	connect();
	mongoose.Promise = global.Promise;
	const db = mongoose.connection;
	db.on("error", console.error);
	db.on("disconnected", connect);
	
}