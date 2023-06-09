const webpack = require("webpack");

webpack(require("./config")(true)).watch({}, (err, stats) => 
{
	if(stats)
		console.log(stats.toString("minimal"));

	if(err)
		console.error(err);
});