import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Header from "./components/header";
import Task from "./components/Task";
import Footer from "./components/footer";
import About from "./components/about";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [task, setTask] = useState([]);

  useEffect(() => {
    const getTask = async () => {
      const taskFromSever = await fetchTasks();
      setTask(taskFromSever);
    };
    getTask();
  }, []);

  // fetchtask
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/task");
    const data = await res.json();
    return data;
  };

  // fetchtask
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/task/${id}`);
    const data = await res.json();
    return data;
  };

  // Add Task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/task", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    setTask([...task, data]);

    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id, ...task };

    // setTask({ ...task, newTask });
    // console.log(newTask);
  };

  // delete task

  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/task/${id}`, {
      method: "DELETE",
    });
    res.status === 200
      ? setTask(task.filter((task) => task.id !== id))
      : alert("error deleting task");
  };

  // ontoggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    const res = await fetch(`http://localhost:5000/task/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();
    setTask(
      task.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };
  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />

        <Route
          path="/"
          exact
          render={(props) => (
            <div>
              {showAddTask && <AddTask onAdd={addTask} />}
              {task.length > 0 ? (
                <Task
                  task={task}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                "no task to show"
              )}
            </div>
          )}
        />
        <Route path="/" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
