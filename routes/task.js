const { authenticateToken } = require("../middleware/authMiddleware");
const Task = require("../models/Task");
const router = require("express").Router();


router.post("/", authenticateToken, async (req, res) => {
    const { title } = req.body;
    try {
        const task = new Task({
            title: title,
            user_id: req.user.user_id
        });

        await task.save(); 

        res.status(201).json({
            status: true,
            message: "Task created successfully",
            data: task
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error
        });
    }
});


router.get("/", authenticateToken, async (req, res) => {
    try {
        const tasks = await Task.find({ user_id: req.user.user_id }); 
        res.status(200).json({
            status: true,
            data: tasks
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Error fetching tasks"
        });
    }
});


router.get("/:id", authenticateToken, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task || task.user_id.toString() !== req.user.user_id) { 
            return res.status(404).json({
                status: false,
                message: "Task not found"
            });
        }
        res.status(200).json({
            status: true,
            data: task
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Error fetching task"
        });
    }
});

router.put("/:id", authenticateToken, async (req, res) => {
    const { title, completed } = req.body;
    try {
        const task = await Task.findById(req.params.id);
        if (!task || task.user_id.toString() !== req.user.user_id) {
            return res.status(404).json({
                status: false,
                message: "Task not found"
            });
        }

        task.title = title !== undefined ? title : task.title;
        task.completed = completed !== undefined ? completed : task.completed;
        await task.save();

        res.json({
            status: true,
            message: "Task updated successfully",
            data: task
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Error updating task"
        });
    }
});


router.delete("/:id", authenticateToken, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task || task.user_id.toString() !== req.user.user_id) {
            return res.status(404).json({
                status: false,
                message: "Task not found"
            });
        }

        await task.deleteOne();

        res.json({
            status: true,
            message: "Task deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Error deleting task"
        });
    }
});

module.exports = router;
