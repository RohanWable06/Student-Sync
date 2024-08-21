import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";

const Marks = () => {
  const baseApiURL = "http://localhost:8080";
  const [exams, setExams] = useState([]);
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState({
    studentId: "",
    examId: "",
    marks: "",
    examName: "",
    examType: "",
  });
  const [marksInput, setMarksInput] = useState({});

  const loadStudentDetails = () => {
    const { examType, examName } = selected;

    if (examType && examName) {
      axios.get(`${baseApiURL}/students`)
        .then(response => setStudents(response.data))
        .catch(error => {
          console.error(error);
          toast.error(error.message);
        });
    } else {
      toast.error("Please select both Exam and Exam Type");
    }
  };

  const submitMarksHandler = (studentId, marks) => {
    axios.post(
      `${baseApiURL}/marks`,
      { studentId, examId: selected.examId, marks },
      { headers: { "Content-Type": "application/json" } }
    )
      .then(response => {
        if (response.data != null) {
          console.log("sucess")
          toast.success(response.data.message);
        } else {
          console.log("fail")
          toast.error(response.data.message);
        }
      })
      .catch(error => {
        console.error(error);
        toast.error(error.message);
      });
  };

  const submitAllMarksHandler = () => {
    Object.keys(marksInput).forEach(studentId => {
      const marks = marksInput[studentId];
      submitMarksHandler(studentId, marks);
    });
  };

  const getExamData = () => {
    axios.get(`${baseApiURL}/exams`)
      .then(response => setExams(response.data))
      .catch(error => {
        toast.error(error.message);
      });
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    const maxMarks = selected.examType === "internal" ? 40 : 60;

    if (value >= 0 && value <= maxMarks) {
      setMarksInput(prev => ({ ...prev, [id]: value }));
    } else {
      toast.error(`Marks should be between 0 and ${maxMarks}`);
    }
  };

  useEffect(() => {
    getExamData();
  }, []);

  const resetValueHandler = () => setStudents([]);

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3">Upload Marks</h1>
        {students.length > 0 && (
          <button
            className="btn btn-outline-danger d-flex align-items-center"
            onClick={resetValueHandler}
          >
            <BiArrowBack className="me-2" />
            Close
          </button>
        )}
      </div>

      {students.length === 0 ? (
        <>
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="exam" className="form-label">
                Select Exam
              </label>
              <select
                id="exam"
                className="form-select"
                value={selected.examName}
                onChange={(e) => setSelected({ ...selected, examName: e.target.value })}
              >
                <option defaultValue>-- Select --</option>
                {exams.map(exam => (
                  <option value={exam.examName} key={exam.id}>
                    {exam.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="examType" className="form-label">
                Select Exam Type
              </label>
              <select
                id="examType"
                className="form-select"
                value={selected}
                onChange={(e) => {
                  const examType = e.target.options[e.target.selectedIndex].text.toLowerCase();
                  setSelected({
                    ...selected,
                    examId: e.target.value,
                    examType
                  });
                }}
              >
                <option defaultValue>-- Select --</option>
                <option value="1">Internal</option>
                <option value="2">External</option>
              </select>
            </div>
          </div>
          <button className="btn btn-primary" onClick={loadStudentDetails}>
            Load Student Data
          </button>
        </>
      ) : (
        <>
          <p className="mt-4 text-lg">
            Upload {selected.examType} Marks For {selected.examName}
          </p>
          <div
            className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-3"
            id="markContainer"
          >
            {students.map(student => (
              <div
                key={student.id}
                className="col"
                id={student.id}
              >
                <div className="card border-primary">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <p className="mb-0">{student.rollN}</p>
                    <input
                      type="number"
                      className="form-control me-2"
                      placeholder="Enter Marks"
                      id={student.id}
                      value={marksInput[student.id]}
                      onChange={handleChange}
                      required
                    />
                    <button
                      className="btn btn-warning"
                      onClick={() => submitMarksHandler(student.id, marksInput[student.id])}
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            className="btn btn-success mt-4"
            onClick={submitAllMarksHandler}
          >
            Upload All Marks
          </button>
        </>
      )}
    </div>
  );
};

export default Marks;
