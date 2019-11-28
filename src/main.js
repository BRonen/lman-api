const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
 	useUnifiedTopology: true
}, (err) => {
	console.log(err? `error: `+err : "server connected");
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 5000, function(){
	console.log(`Your node js server is running in ${process.env.PORT? process.env.PORT : 5000}`);
});
