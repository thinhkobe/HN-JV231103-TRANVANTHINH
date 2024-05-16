import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import Todo from "./assets/Todo";

function App() {
  const [jobs, setJobs] = useState(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    return storedJobs;
  });
  const [job, setJob] = useState({ id: null, name: "", completed: false });
  const [isAdd, setIsAdd] = useState(true);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    setJob({ ...job, name: e.target.value });
  };
  useEffect(() => {
    inputRef.current.focus();
    const storedJobs = localStorage.getItem("jobs");
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const doAdd = () => {
    if (job.name.trim() === "") {
      alert("Công việc không được để trống");
      return;
    }
    if (isAdd) {
      setJobs([...jobs, { ...job, id: Date.now() }]);
    } else {
      setJobs(jobs.map((j) => (j.id === job.id ? job : j)));
      setIsAdd(true);
    }
    setJob({ id: null, name: "", completed: false });
    inputRef.current.focus();
  };

  const handleEdit = (jobToEdit) => {
    setJob(jobToEdit);
    setShowUpdate(true);
  };

  const handleUpdate = () => {
    if (job.name.trim() === "") {
      alert("Công việc không được để trống");
      return;
    }
    setJobs(jobs.map((j) => (j.id === job.id ? job : j)));
    setShowUpdate(false);
    setJob({ id: null, name: "", completed: false });
  };
  const showconfirm = (jobToDelete) => {
    setJob(jobToDelete);
    setShowConfirm(true);
  };

  const handleDelete = (id) => {
    setJobs(jobs.filter((j) => j.id !== id));
    setShowConfirm(false);
    setJob({ id: null, name: "", completed: false });
  };

  const toggleComplete = (id) => {
    setJobs(
      jobs.map((j) => (j.id === id ? { ...j, completed: !j.completed } : j))
    );
  };

  return (
    <div className="App">
      <h1>Danh sách công việc</h1>
      <div className="input-container">
        <input
          ref={inputRef}
          type="text"
          placeholder="Nhập tên công việc"
          value={job.name}
          onChange={handleChange}
        />
        <button type="button" onClick={doAdd}>
          {isAdd ? "Thêm" : "Cập nhật"}
        </button>
      </div>
      <div className="todo-list">
        {jobs.length === 0 ? (
          <p>No jobs available</p>
        ) : (
          jobs.map((job) => (
            <Todo
              toggleComplete={toggleComplete}
              key={job.id}
              job={job}
              handleDelete={showconfirm}
              handleEdit={handleEdit}
            />
          ))
        )}
      </div>
      <p>
        Công việc đã hoàn thành: {jobs.filter((task) => task.completed).length}{" "}
        / {jobs.length}
      </p>
      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <h2>Xác nhận</h2>
            <p>
              Bạn có xác nhận xóa công việc <strong>{job.name}</strong> không?
            </p>
            <div className="confirm-buttons">
              <button onClick={() => setShowConfirm(false)}>Hủy</button>
              <button onClick={() => handleDelete(job.id)}>Đồng ý</button>
            </div>
          </div>
        </div>
      )}

      {showUpdate && (
        <div className="update-overlay">
          <div className="update-box">
            <h2>Cập nhật công việc</h2>
            <label>
              <input type="text" value={job.name} onChange={handleChange} />
            </label>
            <div className="update-buttons">
              <button onClick={() => setShowUpdate(false)}>Hủy</button>
              <button onClick={handleUpdate}>Đồng ý</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
