const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var addList = "";

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res){
	const today = new Date();
	const options = {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	};
	const fullDate = today.toLocaleDateString("es-US",options);
	res.render('index', {todaysDate: fullDate, addTask: addList});
});

app.post("/", function(req, res){
	addList = req.body.newItem;
	res.redirect("/");
});


app.listen(3000, function()
{
	console.log("Start port 3000");
});
