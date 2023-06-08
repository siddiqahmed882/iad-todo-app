const Task = require('../models/task.model.js');

const index = async (_, res) => {
  try {
    const tasks = await Task.find({}).sort({ createdAt: -1 });
    console.log({ tasks });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ erorr: error.message });
  }
};

const show = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ erorr: error.message });
  }
};

const create = async (req, res) => {
  try {
    const task = await Task.create({ title: req.body.title });
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ erorr: error.message });
  }
};

const update = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { isCompleted: req.body.isCompleted }, { new: true });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ erorr: error.message });
  }
};

const destroy = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ erorr: error.message });
  }
};

module.exports = { index, show, create, update, destroy };
