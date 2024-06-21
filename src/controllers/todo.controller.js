const fs = require("fs");
const { v4: uuidv4 } = require("uuid");


// Helper function to read todo from file
const readTasks = () => {
    const data = fs.readFileSync("./src/data/todo.json", "utf8");
    return JSON.parse(data);
};

// Helper function to write tasks to file
const writeTasks = (tasks) => {
    fs.writeFileSync("./src/data/todo.json", JSON.stringify(tasks, null, 2));
};

// 1. Add Task
const addTodo =  (req, res) => {
    const { title, description} = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: "Invalid request body" });
    }

    const tasks = readTasks();
    const newTask = {
        id: uuidv4(),
        title,
        description,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json(newTask);
};

// 2. Get All Tasks
const getTodo =  (req, res) => {
    const tasks = readTasks();
    res.status(200).json(tasks);
};

// 3. Get Single Task
const getTodoById = (req, res) => {
    const tasks = readTasks();
    const task = tasks.find(t => t.id === req.params.id);
    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
};

// 4. Update Task
const updateTodo =  (req, res) => {
    const { title, description} = req.body;
    const tasks = readTasks();
    const taskIndex = tasks.findIndex(t => t.id === req.params.id);
    if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found" });
    }
    if (!title || !description) {
        return res.status(400).json({ error: "Invalid request body" });
    }

    const updatedTask = {
        ...tasks[taskIndex],
        title,
        description,
        updatedAt: new Date().toISOString()
    };
    tasks[taskIndex] = updatedTask;
    writeTasks(tasks);
    res.status(200).json(updatedTask);
};

// 5. Delete Task
const deleteTodo =  (req, res) => {
    const tasks = readTasks();
    const taskIndex = tasks.findIndex(t => t.id === req.params.id);
    if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found" });
    }
    tasks.splice(taskIndex, 1);
    writeTasks(tasks);
    res.status(200).json({ message: "Task deleted successfully" });
};


module.exports = {addTodo, getTodo, getTodoById, updateTodo, deleteTodo}