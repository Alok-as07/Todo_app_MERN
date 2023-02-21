const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const Todo = require('./models/Todo');

app.use(express.json());
app.use(cors());

console.log("server started");

mongoose.connect('mongodb+srv://aloksahooas07:eMa4PN1WHpoJPhzH@cluster0.47sxnzx.mongodb.net/todoapp?retryWrites=true&w=majority',
{
  useNewUrlParser:true,
  useUnifiedTopology:true
} 
).then(()=>{console.log("connecting to mongoDb");})
.catch(console.error);

app.get('/todos', async(req,res)=>{
    const todo = await Todo.find();
    res.json(todo);
})

app.post('/todo/new',(req,res)=>{
  const todo = new Todo({
    text:req.body.text
  });
  todo.save();
  res.json(todo);
});

app.delete('/todo/delete/:id',async(req,res)=>{
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.json(result);
});

app.get('/todo/complete/:id',async (req,res)=>{
   var checkcomplete = Boolean(req.params.complete);
   if(checkcomplete == true){
    res.json(await Todo.findByIdAndUpdate(req.params.id,{complete:false})); 
   }
   else if(checkcomplete == false){
    res.json(await Todo.findByIdAndUpdate(req.params.id,{complete:true})); 
   }
   
});

app.listen(4000,()=>{console.log("listening to 4000")});