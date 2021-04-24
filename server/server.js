const express = require("express");
const app = express();
const cors = require('cors')

if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
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
	console.error("lo siento",error);
}

app.use(express.static("server/public"));
app.use(express.static("client/build"));

//MIDDLEWARES
app.set("port", process.env.PORT || 3001);
app.use(cors())
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/customer", customerRouter);

app.get("/*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"));
});

app.listen(app.get("port"), () => {
	console.log(`Server on port ${app.get("port")}`);
});
