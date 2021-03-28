const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require('cors')
const app = express();

const userRouter = require("./routes/user.js");
const customerRouter = require("./routes/customer.js");
const config = require("./config/config").get(process.env.NODE_ENV);

try {
	mongoose.connect(config.DATABASE, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	});
} catch (error) {
	console.error(error);
}

//MIDDLEWARES
app.set("port", process.env.PORT || 3001);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors())

app.use("/api/user", userRouter);
app.use("/api/customer", customerRouter);

app.use(express.static("client/build"));
app.use(express.static("server/templates"));

const path = require("path");
app.get("/*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
});


app.listen(app.get("port"), () => {
	console.log(`Server on port ${app.get("port")}`);
});
