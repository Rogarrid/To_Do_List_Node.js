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
	Item.find({}).then ((foundItems) => {
		res.render('index', {todaysDate: dateComplet, addTask: foundItems});
	});
});

app.get("/:customList", function(req, res){
	let newNameList = req.params.customList;
	let dateComplet = functions.date();
	Item.find({category: newNameList}).then ((foundItems) => {

		res.render('list', {nameList: newNameList, todaysDate: dateComplet, addTask: foundItems});
	});
});

app.post("/:customList", function(req, res){

	let NameListAdd = req.params.customList;
	if (NameListAdd != "delete" && NameListAdd != "deleteIndex") {
		const task = new Item({
			nameTask: req.body.newItem,
			category: NameListAdd
		});
		task.save();
		res.redirect("/" + NameListAdd);
	} else if (NameListAdd == "deleteIndex"){
		let idDelete = req.body.buttonDelete;
		Item.findByIdAndRemove(idDelete).then ((del) => {
			if (del)
				console.log("Tarea eliminada");
			else
				console.log("Error al eliminar la tarea");
		});
		res.redirect("/");
	}else {
		let nameDelete = req.body.listDelete;
		let idDelete = req.body.buttonDelete;
		Item.findByIdAndRemove(idDelete).then ((del) => {
			if (del)
				console.log("Tarea eliminada");
			else
				console.log("Error al eliminar la tarea");
		});
		res.redirect("/" + nameDelete);
	}
});

app.listen(3000, function()
{
	console.log("Start port 3000");
});
