var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('relationlist',['relationlist']);
var bodyParser= require('body-parser');

app.use(express.static(__dirname+"/public"));
app.use('/controllers', express.static(__dirname+"/controllers"));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(bodyParser.json());

//service to  retrieve all the relation
app.get('/relationList', function(req,res){
	db.relationlist.find(function(err,docs){
		res.json(docs);
	});	
});

//service to create a new relation
app.post('/relationList',function(req,res){
	var parentCharacter ="";
	var childCharacter ="";
	db.relationlist.insert(req.body,function(err,doc){
			res.json(doc);
	});
});

//service to get one relation
app.get('/getRelation', function(req,res){
	db.relationlist.findOne({parent: req.query.parent, child: req.query.child},function(err,docs){
		res.json(docs);
	});	
});

//service to update the relation
app.put('/relationList/:id',function(req,res){
	var id = req.params.id;
	db.relationlist.findAndModify({
		query:{_id:mongojs.ObjectId(id)},
		update: {$set:{parent:req.body.parent, child:req.body.child, relation:req.body.relation}},
		new: true
	},function(err,doc,lastErrorObject){
		res.json(doc);
	})

});

app.listen(3000);

console.log("Server running on port 3000");
