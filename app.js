const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const functions = require(__dirname + "/function.js");

const app = express();


mongoose.connect('mongodb://localhost:27017/todolistDB', { useNewUrlParser: true });

const itemSchema = new mongoose.Schema ({
	nameTask: {
		type: String,
		required: [true, "Inserta una tarea"],
		minLength: 3,
	},
	category: {
		type: String,
		required: [true]
	}
});

const Item = mongoose.model('Item', itemSchema);


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res){
	let dateComplet = functions.date();
	Item.find({category: 'home'}).then ((foundItems) => {

		res.render('index', {todaysDate: dateComplet, addTask: foundItems});
	});
});

app.post("/", function(req, res){
	const task = new Item({
		nameTask: req.body.newItem,
		category: "home"
	});
	task.save();
	res.redirect("/");
});

app.post("/deleteHome", function(req, res){
	let idDelete = req.body.buttonDelete;
	Item.findByIdAndRemove(idDelete).then ((del) => {
		if (del)
			console.log("Tarea de casa eliminada");
		else
			console.log("Error al eliminar la tarea de casa");
	});
	res.redirect("/");
});

app.get("/compras", function(req, res){
	let dateComplet = functions.date();
	Item.find({category: 'shop'}).then ((foundItems) => {

		res.render('shop', {todaysDate: dateComplet, addTask: foundItems});
	});
});

app.post("/compras", function(req, res){
	const task = new Item({
		nameTask: req.body.newItem,
		category: "shop"
	});
	task.save();
	res.redirect("/compras");
});

app.post("/deleteShop", function(req, res){
	let idDelete = req.body.buttonDelete;
	Item.findByIdAndRemove(idDelete).then ((del) => {
		if (del)
			console.log("Tarea de la compra eliminada");
		else
			console.log("Error al eliminar la tarea de compra");
	});
	res.redirect("/compras");
});

app.get("/trabajo", function(req, res){
	let dateComplet = functions.date();
	Item.find({category: 'work'}).then ((foundItems) => {

		res.render('work', {todaysDate: dateComplet, addTask: foundItems});
	});
});

app.post("/trabajo", function(req, res){
	const task = new Item({
		nameTask: req.body.newItem,
		category: "work"
	});
	task.save();
	res.redirect("/trabajo");
});

app.post("/deleteWork", function(req, res){
	let idDelete = req.body.buttonDelete;
	Item.findByIdAndRemove(idDelete).then ((del) => {
		if (del)
			console.log("Tarea del trabajo eliminada");
		else
			console.log("Error al eliminar la tarea de trabajo");
	});
	res.redirect("/trabajo");
});

app.get("/ocio", function(req, res){

	let dateComplet = functions.date();
	Item.find({category: 'leisure'}).then ((foundItems) => {

		res.render('leisure', {todaysDate: dateComplet, addTask: foundItems});
	});
});

app.post("/ocio", function(req, res){
	const task = new Item({
		nameTask: req.body.newItem,
		category: "leisure"
	});
	task.save();
	res.redirect("/ocio");
});

app.post("/deleteLeisure", function(req, res){
	let idDelete = req.body.buttonDelete;
	Item.findByIdAndRemove(idDelete).then ((del) => {
		if (del)
			console.log("Tarea de ocio eliminada");
		else
			console.log("Error al eliminar la tarea de ocio");
	});
	res.redirect("/ocio");
});

app.listen(3000, function()
{
	console.log("Start port 3000");
});
