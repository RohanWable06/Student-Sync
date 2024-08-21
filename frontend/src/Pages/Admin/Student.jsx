import React, { useState } from "react";
import AddStudent from "./Student/AddStudent";
import EditStudent from "./Student/EditStudent";
import ViewStudents from "./Student/ViewStudents";

const Student = () => {
  const [selected, setSelected] = useState("add");

  return (
    <div className="container mt-4 mb-4">
      <div className="row mb-3">
        <div className="col-12 text-center">
          <div className="btn-group" role="group" aria-label="Student Actions">
            <button
              type="button"
              className={`btn ${selected === "add" ? "btn-primary active" : "btn-outline-primary"}`}
              onClick={() => setSelected("add")}
            >
              Add Student
            </button>
            <button
              type="button"
              className={`btn ${selected === "edit" ? "btn-primary active" : "btn-outline-primary"}`}
              onClick={() => setSelected("edit")}
            >
              Edit Student
            </button>
            <button
              type="button"
              className={`btn ${selected === "view" ? "btn-primary active" : "btn-outline-primary"}`}
              onClick={() => setSelected("view")}
            >
              View Students
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          {selected === "add" && <AddStudent />}
          {selected === "edit" && <EditStudent />}
          {selected === "view" && <ViewStudents />}
        </div>
      </div>
    </div>
  );
};

export default Student;
