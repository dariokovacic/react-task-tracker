import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import Header from './components/Header'
import Tasks from './components/Tasks'
import About from './components/About'

function App() {

  const [showAddTask, setShowAddTask] = useState(false);
  
  const [tasks, setTasks] = useState([]);

  const dataUri = 'http://localhost:5000/tasks';

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }

    getTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch(dataUri);
    const data = await res.json();

    return data;
  }

  const fetchTask = async (id) => {
    const res = await fetch(`${dataUri}/${id}`);
    const data = await res.json();

    return data;
  }
  
  const deleteTask = async (id) => {
    await fetch(`${dataUri}/${id}`, {
      method: 'DELETE'
    });

    setTasks(tasks.filter((task) => {
       return task.id !== id;
    }));
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {
      ...taskToToggle,
      reminder: !taskToToggle.reminder
    }

    const res = await fetch(`${dataUri}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(updTask)
    });

    const data = await res.json();

    setTasks(tasks.map((task) => {
      if (task.id === id) {
        return {...task, reminder: data.reminder};
      }
      return task;
    }));
  }
  
  const addTask = async (task) => {
    // const id = Math.floor(Math.random() * 1000);
    // const newTask = {
    //   id,
    //   ...task
    // }
    // setTasks([newTask, ...tasks]);

    const res = await fetch(dataUri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });

    const data = await res.json();

    setTasks([data, ...tasks]);
  }
  

  return (
    <Router>
      <div className="container">      
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAddTask={showAddTask} />
      <Route path="/" exact render={(props) => (
        <>
          {showAddTask && <AddTask addTask={addTask} />}
          {tasks.length > 0 ? <Tasks tasks={tasks} deleteTask={deleteTask} toggleReminder={toggleReminder} /> : 'No task to show'}
        </>
      )} />
      <Route path="/about" component={About} />
      <Footer />
    </div>
    </Router>
  );
}

export default App;
