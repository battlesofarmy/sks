"use client";

import { useState } from "react";

export default function CourseSelector() {
  const [selectedCourse, setSelectedCourse] = useState("");

  const handleSelectChange = (e) => {
    setSelectedCourse(e.target.value); // Get the selected value
    console.log("Selected Course:", e.target.value);
  };

  return (
    <div className="flex flex-col items-center p-4">

      <select
        id="course"
        className="border rounded-md p-2"
        value={selectedCourse} // Bind the value to state
        onChange={handleSelectChange} // Update state on selection
      >
        <option value="" disabled>
          - Course --
        </option>
        <option value="phy">Physics (phy)</option>
        <option value="eee">Electrical Engineering (eee)</option>
      </select>


    </div>
  );
}
