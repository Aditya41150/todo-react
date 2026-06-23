import { useState, useEffect } from 'react';


function App() {


  const [task, setTask] = useState("") // for a single task


  // this is lazy initialization(good practice) using useState renders only once
  const [todos, setTodos] = useState(() => {
    const storedTodos =
      localStorage.getItem('todos');

      // null check
    if (storedTodos) {
      return JSON.parse(storedTodos);
    }

    return [];
  });

  // save todos use effect
  useEffect(() => {

    localStorage.setItem('todos', JSON.stringify(todos));

  }, [todos])


  const handleAddTask = () => {
    // early return taaki empty input add na ho sake
    if (task.trim() === "") {
      return;
    }

    // new to do object
    const newTodo = {
      text: task,
      completed: false
    };


    setTodos([...todos, newTodo]); // purane task wale array me naya task add kardo
    setTask("") // clear the input field
  }



  const deleteTask = (indexToDelete) => {
    const updatedTodos = todos.filter((todo, index) => index !== indexToDelete)
    setTodos(updatedTodos);
  }

  const toggleComplete = (indexToToggle) => {

    const updatedTodos = todos.map((todo, index) =>
      index === indexToToggle
        ? { ...todo, completed: !todo.completed }
        : todo
    );

    setTodos(updatedTodos);
  }

  return (
    <>

      <div className="main flex justify-center items-center flex-col min-h-screen  border-2 rounded-2xl">
        <input type="text" placeholder='Enter a new task...' value={task} onKeyDown={(e) => {
          if (e.key == "Enter") {
            handleAddTask();
          }
        }} onChange={(e) => setTask(e.target.value)} className='border-2 rounded-[10px] p-1.25' />

        {/* 
        
        1) Input is a controlled component because
        its value comes from React state.
        
        value={task}
        
        When setTask("") runs:
        task becomes ""
        
        React re-renders
        value={task}
        becomes
        
        value=""
        
        so the input box becomes empty.


        2) onChange={(e) => setTask(e.target.value) => Ye line har key stroke par Task ki value ko update karega

       # onChange fires every time the input changes.
        
       # e = event object
       # e.target = input element
       # e.target.value = current text inside input

        Example:

        type: A

        setTask()=> A

        type: AD

        setTask()=> AD
        ....
        
        finally 
        type: ADITYA
        setTask()=> ADITYA

        */}

        {/* button to add task  */}
        <button className='border-2  mt-5 rounded-full p-1' onClick={handleAddTask}> Add Task</button>

        <h1 className='p-2'>Todos:</h1>

        {/* rendering list */}

        <ul>
          {todos.map((task, index) => (
            <div key={index} className='flex items-center gap-3 m-2'>

              <input type="checkbox" checked={task.completed} onChange={() => toggleComplete(index)} />
              <li className={task.completed ? "line-through" : ""}>{task.text}</li>
              <button className='border-2 rounded-full px-1 py-0.5' onClick={() => { deleteTask(index) }}>Delete</button>
            </div>
          ))}
        </ul>

        
      </div>
    </>
  )
}

export default App
