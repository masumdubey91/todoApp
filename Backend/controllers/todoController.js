const Todo=require("../models/Todo");

const createTodo=async(req,res)=>{
    try{

    
    const {tittle}= req.body;
    const todo=await Todo.create({
        tittle,
    });
    res.status(201).json(todo);

}
catch(error){
    res.status(500).json({
        message:error.message,
    })
}}

const getTodos=async(req,res)=>{
    try{
        const todos=await Todo.find();
        res.status(200).json(todos);

    }
    catch(error){
        res.status(500).json({
            message:error.message,
        })
    }
}
const updateTodo =async(req,res)=>{
    try{
 const {id}=req.params;
    const  updatedTodo=await Todo.findByIdAndUpdate(
        id,req.body,
        {new:true}
    )
    res.status(200).json(updatedTodo);
    }
   catch(error){
    res.status(500).json({
 message:error.message
    });
   
   }
}
const deleteTodo=async(req,res)=>{
    try{
        const{id}=req.params;
        const deletedTodo=await Todo.findByIdAndDelete(id);
        res.status(200).json(deletedTodo);

    }
    catch(error){
        res.status(500).json({
            message:error.message,        })
    }
}


module.exports={createTodo,getTodos,updateTodo,deleteTodo};