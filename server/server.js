const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = require("./routes/index.js");

app.set("port", process.env.PORT || 3001);

app.use(bodyParser.json());

if(!process.env.NODE_ENV){
	app.use((req,res,next)=>{
		res.header("Access-Control-Allow-Origin", "http://localhost:3000")
		res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept")
		next()
	})
}

app.use('/api',router);

app.listen(app.get("port"), () => {
	console.log(`Server on port ${app.get("port")}`);
});
