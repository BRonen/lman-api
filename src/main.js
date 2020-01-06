const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

mongoose.connect('mongodb+srv://Default:default@mong-gse0i.mongodb.net/test?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, (err) => {
	console.log(err? `error: `+err : "server connected");
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 5000;

app.listen(port, function(){
	console.log(`Your node js server is running in ${port}`);
});
