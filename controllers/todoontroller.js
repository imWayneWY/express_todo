var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://todoUser:todoUser@localhost:27017/todos',{useNewUrlParser: true});
var urlencodedParser = bodyParser.urlencoded({extended: false});

//var data = [{item: "jogging"},{item: "study nodejs"},{item: "study express"}];
var todoSchema = new mongoose.Schema({
    item: String
},{collection: "todolist"});
var Todo = mongoose.model('todolist',todoSchema);
  
module.exports = function(app){
    app.get('/todo',function(req,res){
        Todo.find({},function(err,data){
            console.log(data);
            if(err){ throw err; }
            res.render('todo',{todos: data});
        })
    });
    app.post('/todo', urlencodedParser, function(req,res){
        Todo(req.body).save(function(err,data){
            if(err) throw err;
            res.json(data);
        });
    });
    app.delete('/todo/:item',function(req,res){
        Todo.find({item: req.params.item.replace(/-/g, " ")}).remove(function(err,data){
            if(err) throw err;
            res.json(data);
        });
    });
};