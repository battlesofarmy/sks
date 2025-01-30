"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Blog() {
    const [students, setStudents] = useState(null);

      // Fetch students from the API
  useEffect(() => {
    axios
      .get("http://localhost:5000/student")
    //   .get("http://192.168.0.194:5000/student")
      .then((res) => {
        setStudents(res.data); // Set fetched students
      })
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  return (
    <div>
        {
            students?.map(ele=>
                <h2>hello world bro</h2>
            )
        }
    </div>
  )
}
