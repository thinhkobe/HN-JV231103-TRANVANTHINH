import React from "react";
import "../App.css";

function Todo({ job, handleDelete, handleEdit, toggleComplete }) {
  return (
    <div className={`Todo ${job.completed ? "complice" : ""}`}>
      <div key={job.id} className="form-check todo-input">
        <div>
          <input
            className="form-check-input h-4 w-4 cursor-pointer "
            type="checkbox"
            checked={job.completed}
            onChange={() => toggleComplete(job.id)}
          />
          <label className="form-check-label ">{job.name}</label>
        </div>
        <div className="Todo-buttons">
          <button
            className="btn btn-primary edit"
            onClick={() => handleEdit(job)}
          >
            <i className="fa-solid fa-pen cursor-pointer hover:bg-gray-300 p-2 rounded-full text-orange-500"></i>
          </button>
          <button
            className="btn btn-danger delete"
            onClick={() => handleDelete(job)}
          >
            <i className="fa-solid fa-trash cursor-pointer hover:bg-gray-300 p-2 rounded-full text-red-500"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Todo;
