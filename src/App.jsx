import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Navbar from './comonents/Navbar'
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0)
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isEditting, setIsEditing] = useState(false);



    const fetchTodos = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/todos");
        setTasks(res.data);
      }
      catch (error) {
        console.log(error);

      }
    }
useEffect(() => {
  fetchTodos();

  
}, [])










  const handleAdd = async() => {
    if (task.trim() === "") return;
    try {
      await axios.post(
        "http://localhost:3000/api/todos",
        {
          tittle: task
        }

      );
      fetchTodos();
      setTask("");
    }
    catch (error) {
      console.log(error)
    }

  };

  const handleCheck =async (id, completed) => {
    try {
      await axios.put(
        `http://localhost:3000/api/todos/${id}`,
        {
          completed: !completed,
        }
      );
      fetchTodos();

    }
    catch (error) {
      console.log(error);
    }


    // let newTasks=[...tasks];

    // newTasks[index].isCompleted=!newTasks[index].isCompleted;
    // setTasks(newTasks)

  }
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/todos/${id}`)
      fetchTodos();

    } catch (error) {
      console.log(error);

    }




  }

  const handleEdit = (item) => {
    setTask(item.tittle);
    setEditId(item._id);
    setIsEditing(true);




    // setTask(tasks[index].text);
    // let newTasks=tasks.filter((item,i)=>i!==index);
    // setTasks(newTasks);


  }
  const  handleUpdate=async()=>{
    try{
      await axios.put(
        `http://localhost:3000/api/todos/${editId}`,
        {
          tittle:task,
        }
      );
      fetchTodos();
      setTask("");
      setEditId(null);
      setIsEditing(false);

    }
    catch(error){
      console.log(error);

    }

  }

  return (
  <>
    <Navbar />

    <div className="min-h-screen bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 py-8 px-4">

      {/* Heading */}
      {/* <h1 className="text-5xl font-extrabold text-center text-white">
         Task Manager
      </h1> */}

      

      {/* Stats */}
      <div className="flex justify-center gap-6 mb-8">

        <div className="bg-white rounded-2xl p-4 w-24 h-24 text-center shadow">
          <h2 className="text-2xl font-bold text-violet-700">
            {tasks.length}
          </h2>
          <p>Total</p>
        </div>

        <div className="bg-white rounded-2xl p-4 w-24 h-24 text-center shadow">
          <h2 className="text-2xl font-bold text-green-600">
            {tasks.filter(task => task.completed).length}
          </h2>
          <p>Done</p>
        </div>

        <div className="bg-white rounded-2xl p-4 w-24 h-24 text-center shadow">
          <h2 className="text-2xl font-bold text-red-600">
            {tasks.filter(task => !task.completed).length}
          </h2>
          <p>Pending</p>
        </div>

      </div>

      {/* Main Card */}
      <div className="max-w-2xl mx-auto bg-white rounded-[30px]  hover:shadow-2xl duration-300 p-10">

        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          type="text"
          placeholder="Enter new task..."
          className="w-full h-12 border-2 border-violet-300 rounded-xl px-4 outline-none focus:border-violet-600"
        />

        <button
          type="button"
          onClick={isEditting ? handleUpdate : handleAdd}
          className="w-full h-12 mt-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold"
        >
          {isEditting ? "UPDATE TASK" : "ADD TASK"}
        </button>

        <div className="mt-6 flex flex-col gap-3">

          {tasks.map((item) => (

            <div
              key={item._id}
              className="flex items-center bg-violet-50 rounded-xl p-4 shadow hover:shadow-lg transition"
            >

              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => handleCheck(item._id, item.completed)}
                className="w-5 h-5 accent-violet-600"
              />

              <span
                className={`flex-1 ml-4 ${
                  item.completed
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                }`}
              >
                {item.tittle}
              </span>

              <button
                onClick={() => handleEdit(item)}
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
              >
                <CiEdit />
              </button>

              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg ml-2"
              >
                <MdDelete />
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  </>
);
//   return (
//     <>
//       <Navbar />
      
//       <div className=' min-h-screen bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500  py-8 px-4'>
//         <h1 className='text-4xl font-bold text-center text-white'> Task manager</h1>
//       <p className='text-center text-white mt-2 mb-8'> Organise your daily tasks efficiently</p>
//         <div className="flex justify-center gap-6  mb-8
//         ">

// <div className="bg-violet-100 rounded-xl p-4 w-32 text-center">
// <h2 className="text-xl font-bold">{tasks.length}</h2>
// <p>Total</p>
// </div>

// <div className="bg-green-100 rounded-xl p-4 w-32 text-center">
// <h2 className="text-xl font-bold">
// {tasks.filter(task=>task.completed).length}
// </h2>
// <p>Done</p>
// </div>

// <div className="bg-red-100 rounded-xl p-4 w-32 text-center">
// <h2 className="text-xl font-bold">
// {tasks.filter(task=>!task.completed).length}
// </h2>
// <p>Pending</p>
// </div>

// </div>
    
//         <div className=' w-[700px] bg-white rounded-3xl shadow-2xl p-8'>
//           <div className='text-center items-center justify-center '>
//             <input value={task} onChange={(e) => setTask(e.target.value)} className=' h-12 border-2 border-violet-300  w-full m-4 ml-0 left-0 rounded-xl px-4 outline-none focus:border-violet-600 mx-auto  ' type="text" placeholder='Enter new task' />
//             <div><button type='button' onClick={isEditting?handleUpdate: handleAdd} className='bg-violet-600 h-12 w-full mt-4 rounded-xl hover:bg-violet-700 text-white font-bold transition '>{isEditting?"UPDATE":"Add"}</button></div>
//           </div>
//           <div className='flex flex-col gap-3'>
//             {
//               tasks.map((item, index) => (
//                 <div key={item._id} className='flex items-center justify-between bg-violet-50 rounded-xl p-4 shadow hover:shadow-lg transition '>
//                   <input className='w-5 h-5 accent-violet-600' onChange={() => handleCheck(item._id,item.completed)} type="checkbox" checked={item.completed} />
//                   <span className={`flex-1 ml-4 text-lg  ${item.completed ? "line-through text-gray-400" : "text-gray-800"}`}> {item.tittle}</span>
//                   <div>
//                     <button onClick={() => handleEdit(item)} className='bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition '><CiEdit /></button>
//                   </div>
//                   <div>
//                     <button onClick={() => handleDelete(item._id)} className='bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg ml-2 transition'><MdDelete /></button>
//                   </div></div>

//               ))
//             }
//           </div>
//         </div>
//       </div>



//     </>
//   )
}

 export default App
