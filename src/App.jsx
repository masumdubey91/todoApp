import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Navbar from './comonents/Navbar'

function App() {
  const [count, setCount] = useState(0)
  const [task,setTask]=useState("")
  const [tasks,setTasks]=useState([]);
  // return data? JSON.parse(data):[];
useEffect(() => {

   const savedTask=JSON.parse(localStorage.getItem("tasks"));
   if(savedTask) setTasks(savedTask);

}, []);

useEffect(() => {
  console.log("SAVE RUNNING",tasks);

  localStorage.setItem("tasks",JSON.stringify(tasks));
}, [tasks])
;


  const handleAdd=()=>{
  if(task.trim()==="")return;
  setTasks([...tasks,
    {
    text:task,
  isCompleted:false,
}]);
  setTask("");
 };

  const handleCheck=(index)=>
    {
      let newTasks=[...tasks];

      newTasks[index].isCompleted=!newTasks[index].isCompleted;
      setTasks(newTasks)

  }
  const handleDelete=(index)=>{
    let newTasks=tasks.filter((item,i)=>i!==index)
      setTasks(newTasks);

    
    

  }
 
  const handleEdit =(index)=>{
    setTask(tasks[index].text);
    let newTasks=tasks.filter((item,i)=>i!==index);
    setTasks(newTasks);


  }

  return (
    <>
    <Navbar/>
    <div className='bg-fuchsia-200 h-screen text-fuchsia-700'>
<div className='h-10/12 w-3xl m-80 mt-0 bg-fuchsia-300'>
<div className='text-center items-center justify-center '>
  <input value={task} onChange={(e)=>setTask(e.target.value)} className='bg-fuchsia-200 h-10 w-10/12 m-4 ml-0 left-0 rounded-lg mx-auto  items-center justify-center' type="text"  placeholder='Enter new task'/>
  <div><button type='button' onClick={handleAdd} className='bg-fuchsia-500 h-10 w-10/12 m-2 rounded-lg ml-0 left-0 cursor-pointer mx-auto  items-center justify-center font-extrabold'>ADD</button></div>
</div>
<div className='flex flex-col gap-3'>
{
  tasks.map((item,index)=>(
<div key={index} className='flex text-2xl ml-15 gap-4'>
  <input onChange={()=>handleCheck(index)} type="checkbox" checked={item.isCompleted} />
 <span className={`flex-1/2 ${item.isCompleted ? "line-through":""}`}> {item.text}</span>
 <div>
 <button onClick={()=>handleEdit(index)} className='bg-fuchsia-600 text-white cursor-pointer'><CiEdit /></button>
</div>
<div>
 <button onClick={()=>handleDelete(index)} className='bg-fuchsia-600 text-white  cursor-pointer gap-2'><MdDelete /></button>
  </div></div>

  ))
}
</div>
</div>
</div>



    </>
  )
}

export default App
