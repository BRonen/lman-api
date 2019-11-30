const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

mongoose.connect('mongodb+srv://Default:default@mong-gse0i.mongodb.net/test?retryWrites=true&w=majority', {
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
