const mongoose = require("mongoose");

const SubtaskSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["toDo", "inProgress", "inReview", "done"],
      default: "toDo",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subtask", SubtaskSchema);
