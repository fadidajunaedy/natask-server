const Task = require("../models/taskModel.js");
const Subtask = require("../models/subtaskModel.js");
const ResponseError = require("../error/responseError.js");
const supabase = require("../utils/supabaseClient.js");

const create = async (request) => {
  const task = await Task.findById(request.taskId);
  if (!task) throw new ResponseError(404, "Task not found");

  const newSubtask = await Subtask.create(request);
  return newSubtask;
};

const update = async (_id, request) => {
  const subtask = await Subtask.findById(_id);
  if (!subtask) throw new ResponseError(404, "Subtask not found");

  await subtask.updateOne(request);
  const updatedSubtask = await Subtask.findById(_id);

  await supabase.channel(`subtask-${_id}`).send({
    type: "broadcast",
    event: "subtaskUpdated",
    payload: updatedSubtask,
  });

  return;
};

const getAll = async (queries) => {
  const subtasks = await Subtask.find(queries ? queries : {});
  return subtasks;
};

const get = async (_id) => {
  const subtask = await Subtask.findById(_id);
  if (!subtask) throw new ResponseError(404, "Subtask not found");

  return subtask;
};

const remove = async (_id) => {
  const subtask = await Subtask.findById(_id);
  if (!subtask) throw new ResponseError(404, "Subtask not found");

  await subtask.deleteOne();
  return;
};

module.exports = {
  create,
  update,
  getAll,
  get,
  remove,
};
