import React, { useState } from "react";
import AddFaculty from "./Faculty/AddFaculty";
import EditFaculty from "./Faculty/EditFaculty";
import ViewFaculty from "./Faculty/ViewFaculty";

const Faculty = () => {
  const [selected, setSelected] = useState("add");

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center mb-4">
        <div className="btn-group">
          <button
            className={`btn ${selected === "add" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setSelected("add")}
          >
            Add Faculty
          </button>
          <button
            className={`btn ${selected === "edit" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setSelected("edit")}
          >
            Edit Faculty
          </button>
          <button
            className={`btn ${selected === "view" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setSelected("view")}
          >
            View Faculty
          </button>
        </div>
      </div>
      {selected === "add" && <AddFaculty />}
      {selected === "edit" && <EditFaculty />}
      {selected === "view" && <ViewFaculty />}
    </div>
  );
};

export default Faculty;
