import { useState } from 'react'
import './App.css'
import AddTask from './components/AddTask';
import Header from './components/Header'
import Tasks from './components/Tasks'

function App() {

  const [showAddTask, setShowAddTask] = useState(false);
  
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Doctors Appoitment',
      day: 'Feb 5th at 2:30pm',
      reminder: true
    },
    {
      id: 2,
      text: 'Meeting at School',
      day: 'Feb 6th at 1:30pm',
      reminder: true
    },
    {
      id: 3,
      text: 'Food Shopping',
      day: 'Feb 5th at 2:30pm',
      reminder: false
    },
  ]);
  
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => {
       return task.id !== id;
    }));
  }

  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => {
      if (task.id === id) {
        return {...task, reminder: !task.reminder};
      }
      return task;
    }));
  }
  
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 1000);
    const newTask = {
      id,
      ...task
    }
    setTasks([newTask, ...tasks]);
  }
  

  return (
    <div className="container">      
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAddTask={showAddTask} />
      {showAddTask && <AddTask addTask={addTask} />}
      {tasks.length > 0 ? <Tasks tasks={tasks} deleteTask={deleteTask} toggleReminder={toggleReminder} /> : 'No task to show'}
    </div>
  );
}

export default App;
