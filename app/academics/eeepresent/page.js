// import PresentDisplay from '../components/PresentDisplay'
// import axios from 'axios';

// export default async function EEEpresent() {
//   const res = await axios.get("https://present.muntasir3301.xyz/present/eee");
//   const phypresent = await res.data;

//   return (
//     <>
//         <PresentDisplay presents={phypresent} title={"EEE Lab Attendence"}/>
//     </>
//   )
// }



"use client";

import { useEffect, useState } from "react";
import PresentDisplay from "../components/PresentDisplay";
import axios from "axios";

export default function EEEpresent() {
  const [eeepresent, setEEEPresent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://present.muntasir3301.xyz/present/eee");
        setEEEPresent(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <PresentDisplay presents={eeepresent} title={"EEE Lab Attendance"} />
  );
}
