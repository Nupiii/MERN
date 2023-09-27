import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {
  const { title, description } = req.body;

  try {
    await Task.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Task added successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const myTasks = async (req, res) => {
  const userid = req.user._id;

  try {
    const tasks = await Task.find({ user: userid });

    res.status(201).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }


};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new Error());
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(201).json({
      success: true,
      message: "task is updated",
    });
  } catch (error) {
    next(error);
  }
};
export const deleteTask = async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  try {
    if (!task) return next(new Error("task not found"));
    await task.deleteOne();

    res.status(201).json({
      success: true,
      message: "task is deleted",
    });
  } catch (error) {
    next(error);
  }
};
