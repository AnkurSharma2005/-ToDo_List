"use client"

import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
  
function page() {

  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [mainTask, setmainTask] = useState([]);
  
  let renderTask = <div className='flex w-full items-center justify-center'><h3 className='p-8 text-xl'>No List Available</h3></div>
  

  const submitHandler = (e)=>{
    e.preventDefault();//this helps in preventing the reloading of the page after submitting  
    setmainTask([...mainTask,{title , desc , completed:false}]);
    settitle("");
    setdesc("");
    console.log(mainTask);
  }
  const deleteTask = (i)=>{
    let copyTask = [...mainTask];
    copyTask.splice(i,1);
    setmainTask(copyTask);
  }
  const completeTask = (i)=>{
    const updatedTasks = [...mainTask];
    updatedTasks[i].completed = true;
    setmainTask(updatedTasks);
    notify();
    setTimeout(() => {
    deleteTask(i);
  }, 3000);
  }
  const notify = ()=>{
    toast("Task is marked as Completed!");
  }
  const deletenotify = ()=>{
    toast("Task is deleted successfully!");
  }
  if(mainTask.length>0){
    renderTask = mainTask.map((e,i)=>{
    return (
      <li key={i} className={` flex items-center w-full justify-between ${e.completed ? "bg-green-300" :"bg-inherit"}  `}>
      <div className='flex items-center m-3 justify-center w-1/5  font-bold text-2xl whitespace-normal break-word'>{e.title}</div>
      <div className='flex grow items-center justify-center w-3/5 font-semibold text-xl'>{e.desc}</div>
      <div className='Buttons flex items-center justify-around w-1/5 py-3 px-6'><button 
        onClick={()=>{
          deleteTask(i);
          deletenotify(); 
        }}
        className='bg-red-400 text-white hover:cursor-pointer hover:bg-red-600 px-4 py-2 rounded font-bold m-5'>Delete</button>
      <button 
        onClick={()=>{
          completeTask(i);
          
        }}
        className={`transition-all ${e.completed ?"bg-green-600 cursor-pointer":"bg-green-400 hover:bg-green-500 hover:cursor-pointer" } text-white   px-4 py-2 rounded font-bold m-5`}>{e.completed ? "Completed ✅" : "Complete"}</button>
        </div>
    </li>
  
    )

  })
  }

  return (
    <>
    <h1 className='bg-black text-white p-5 font-bold text-center text-3xl'>Ankur's ToDo</h1>
    <form className='w-full p-5 flex items-center justify-between '
      onSubmit={submitHandler}
    >
        <input type='text' className='p-2 border-4 border-black w-2/6 mx-2 text-2xl rounded' placeholder='Enter Your Task'
               value = {title}
               onChange={(e)=>{
                settitle(e.target.value)
               }}
               required 
        />
        <input type='text' className='p-2 border-4 border-black  w-3/6 mx-2 text-2xl rounded' placeholder='Enter Description here'
              value={desc}
              onChange={(e)=>{
                setdesc(e.target.value)
              }}
        />
        <div className='flex items-center justify-center  w-1/6 '>
        <button className='bg-black text-white font-bold px-5 py-3 rounded-2xl' >Add Task</button>
        </div>
    </form>
    <div className='header border-2 border-black h-15 mx-5 flex '> 
        <div className='title border-2 border-black w-1/5 h-full flex items-center justify-center text-3xl font-bold '>TITLE</div>
        <div className='title border-2 border-black w-3/5 h-full flex items-center justify-center text-3xl font-bold '>DESCRIPTION</div>
        <div className='title border-2 border-black w-1/5 h-full flex items-center justify-center text-3xl font-bold '>ACTION </div>
      </div>
    <div className=" bg-gray-200 mx-5">
      <ul className=''>
        {renderTask}
      </ul>
    </div>
    <ToastContainer position='top-center' />
    </>
  )
}

export default page

// if(mainTask.length>0){
//     renderTask = mainTask.map((e,i)=>{
//     return (
//       <li key={i} className='mb-4 flex items-center justify-around border-2 border-amber-400'>
//       <div className='flex items-center justify-between w-2/3 border-2 border-black'>
//         <h5 className="text-2xl font-bold ">{e.title}</h5>
//         <h6 className='text-xl font-semibold'>{e.desc}</h6>
//       </div>
//       <button 
//         onClick={()=>{
//           deleteTask(i)
//         }}
//         className='bg-red-400 text-white   px-4 py-2 rounded font-bold'>Delete</button>
//     </li>
  
//     )

//   })
//   }