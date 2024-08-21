import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdOutlineDelete } from "react-icons/md";

const Material = () => {
  const baseApiURL = "http://localhost:8080";
  const [data, setData] = useState({
    name: "",
    description: "",
    link: ""
  });
  const [materials, setMaterials] = useState([]);
  const [selected, setSelected] = useState("view");

  useEffect(() => {
    getMaterialsHandler();
  }, []);

  const getMaterialsHandler = () => {
    axios
      .get(`${baseApiURL}/materials`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setMaterials(response.data);
        } else {
          toast.error("Unexpected response format");
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || error.message);
      });
  };

  const addMaterialHandler = () => {
    toast.loading("Adding Material");
    axios
      .post(`${baseApiURL}/materials`, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        toast.dismiss();
        toast.success("Material added successfully");
        setData({ name: "", description: "", link: "" });
        getMaterialsHandler();
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response?.data?.message || error.message);
      });
  };

  const deleteMaterialHandler = (id) => {
    const confirm = window.prompt("Are you sure? Type CONFIRM to continue");
    if (confirm === "CONFIRM") {
      toast.loading("Deleting Material");
      axios
        .delete(`${baseApiURL}/materials/${id}`, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          toast.dismiss();
          toast.success("Material deleted successfully");
          getMaterialsHandler();
        })
        .catch((error) => {
          toast.dismiss();
          toast.error(error.response?.data?.message || error.message);
        });
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-3">
        <button
          className={`btn ${selected === "add" ? "btn-primary" : "btn-outline-primary"} mr-2`}
          onClick={() => setSelected("add")}
        >
          Add Material
        </button>
        <button
          className={`btn ${selected === "view" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setSelected("view")}
        >
          View Materials
        </button>
      </div>

      {selected === "add" && (
        <div className="mt-4">
          <div className="form-group mb-3">
            <label htmlFor="name">Material Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              className="form-control"
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="link">Link</label>
            <input
              type="text"
              id="link"
              className="form-control"
              value={data.link}
              onChange={(e) => setData({ ...data, link: e.target.value })}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={addMaterialHandler}
          >
            Add Material
          </button>
        </div>
      )}

      {selected === "view" && (
        <div className="mt-4">
          <ul className="list-group">
            {materials.length > 0 ? (
              materials.map((material) => (
                <li
                  key={material.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <h5>{material.name}</h5>
                    <p>{material.description}</p>
                    <a href={material.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                      View Material
                    </a>
                  </div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteMaterialHandler(material.id)}
                  >
                    <MdOutlineDelete />
                  </button>
                </li>
              ))
            ) : (
              <li className="list-group-item">No materials available</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Material;
