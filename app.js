const express = require("express");
const bodyParser = require("body-parser");
const functions = require(__dirname + "/function.js")

const app = express();
let addListHome = [];
let addListShop = [];
let addListWork = [];
let addListLeisure = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res){
	let dateComplet = functions();
	res.render('index', {todaysDate: dateComplet, addTask: addListHome});
});

app.post("/", function(req, res){
	item = req.body.newItem;
	addListHome.push(item);
	res.redirect("/");
});

app.get("/compras", function(req, res){
	let dateComplet = functions();
	res.render('shop', {todaysDate: dateComplet, addTask: addListShop});
});

app.post("/compras", function(req, res){
	item = req.body.newItem;
	addListShop.push(item);

	res.redirect("/compras");
});

app.get("/trabajo", function(req, res){

	let dateComplet = functions();
	res.render('work', {todaysDate: dateComplet, addTask: addListWork});
});

app.post("/trabajo", function(req, res){
	item = req.body.newItem;
	addListWork.push(item);

	res.redirect("/trabajo");
});

app.get("/ocio", function(req, res){

	let dateComplet = functions();
	res.render('leisure', {todaysDate: dateComplet, addTask: addListLeisure});
});

app.post("/ocio", function(req, res){
	item = req.body.newItem;
	addListLeisure.push(item);
	res.redirect("/ocio");
});

app.listen(3000, function()
{
	console.log("Start port 3000");
});
