"use client";

import axios from "axios";
import { Tiro_Devanagari_Sanskrit } from "next/font/google";
import { useEffect, useState } from "react";
import styles from '@/app/academics/components/table.css'
import { FaRegCalendarDays } from "react-icons/fa6";

export default function ClickTracker() {
  const [students, setStudents] = useState([]); // Initialize as an empty array
  const [clickCounts, setClickCounts] = useState([]); // Initialize as an empty array
  const [selectedDate, setSelectedDate] = useState("");
  const [dayName, setDayName] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [courseName, setCourseName] = useState("");



  // Fetch students from the API
  useEffect(() => {
    axios
      // .get("http://192.168.0.194:5000/student")
      .get("https://present.muntasir3301.xyz/student")
      .then((res) => {
        setStudents(res.data); // Set fetched students
        setClickCounts(Array(res.data.length).fill("a")); // Initialize attendance as "a"
      })
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  // Handle click to mark attendance
  const handleClick = (index) => {
    const updatedCounts = [...clickCounts];
    updatedCounts[index] = (updatedCounts[index] === "p") ?  "a" : "p"; // Mark as present
    setClickCounts(updatedCounts);
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);

    const day = new Date(date).toLocaleDateString("en-US", {
      weekday: "short",  // Day name (e.g., "Fri")
      day: "2-digit",    // Day number with two digits (e.g., "21")
      month: "short"     // Abbreviated month name (e.g., "Jan")
    });
    setDayName(day);
  };

  // const myObj = {
  //   "course": "eee",
  //   "date": {
  //     "day": "fri",
  //     "month": "24jan"
  //   },
  // }
  
  // Submit attendance (example function)
  const handleAddPresents = () => {
    setErrorMsg("");
    setSuccessMsg("");

    console.log(dayName.slice(5))

    if(!courseName){
      setErrorMsg("Select a Course Name");
      return;
    }
    
    if(!selectedDate){
      setErrorMsg("Choice the Attendance Date");
      return;
    }
    console.log(clickCounts); // Log the attendance array

    const presentObj = {
      "course" : courseName,
      "date" : {
        "day" : dayName.slice(0,3),
        "month": dayName.slice(5),
      }
    }
 

    presentObj.present = clickCounts;
    console.log(presentObj)

    axios
      // .post("http://192.168.0.194:5000/present", presentObj)
      .post("https://present.muntasir3301.xyz/present", presentObj)
      .then((res) => {
        console.log(res.data);
        setSuccessMsg("Successfully Attendence taken")
      })
      .catch((err) => setErrorMsg("Error fetching students: ", err));
    

  };
  

  return (
    <section className="py-10">
      <div className="container">
      
       {/* Header  */}
      <div className="flex justify-between items-center mb-4">
          <h3 className='text-xl border-l-blue-800 border-l-4 pl-2'>Attendence Sheet</h3>
          <p>
              <select
                id="course"
                className="border rounded-md md:px-4 px-0 py-1 text-sm"
                value={courseName} // Bind the value to state
                onChange={(e)=> setCourseName(e.target.value)}
              >
                <option value="" disabled>
                  Course
                </option>
                <option value="phy">Phy</option>
                <option value="eee">EEE</option>
              </select>
          </p>
          {/* Hidden but focusable input */}
          <div className="flex gap-2 items-center">
          <span className="mx-2 text-sm font-medium"> {dayName}</span>

            <input
              type="date"
              id="date"
              className="absolute top-0 left-0 w-10 opacity-0 pointer-events-none"
              onChange={handleDateChange}
            />
          
            {/* Calendar icon as button */}
            <button
              onClick={() => document.getElementById("date").showPicker()} // Use showPicker for better compatibility
              className="border rounded-md px-3 py-2 text-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              <FaRegCalendarDays/>
            </button>
          </div>
      </div>

      {/* Body  */}
       <table>
        {students?.map((student, index) => (
            <tr
              key={student.id} // Use a unique key (like student.id)
              className="cursor-pointer"
              onClick={() => handleClick(index)}
              style={{backgroundColor:  clickCounts[index] === "p" && "#ECFFDC" }}
            >
            <td>{student.id}</td>
            <td className="text-left md:text-center pl-4">{student.name}</td>
            <td>
                {/* <button className="bg-blue-500 px-3 py-1 text-white text-sm">{clickCounts[index] === "p" ? "Present" : "Absent"}</button> */}
                {
                   clickCounts[index] === "p" ? 
                   <button className="bg-green-600 px-3 py-1  text-white text-[13px]">Present</button>
                   :
                   <button className="bg-red-600  px-3 py-1 text-white text-xs">Absent</button>
                }
            </td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td></td>
            <td>
              Total Presents: {clickCounts.filter(ele=> ele === "p").length} 
            </td>
          </tr>
       </table>

        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded text-right"
          onClick={handleAddPresents}
        >
          Submit Attendance
        </button>

      <div>
      {
        errorMsg&& <p className="text-red-600 mt-2">{errorMsg}</p>
      }
      {
        successMsg&& <p className="text-green-600 mt-2">{successMsg}</p>
      }
      </div>


      </div>
    </section>
  );
}
