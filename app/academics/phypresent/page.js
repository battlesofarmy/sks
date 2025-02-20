
// import PresentDisplay from '../components/PresentDisplay'
// import axios from 'axios';

// export default async function PhyPresnt() {
//   const res = await axios.get("https://present.muntasir3301.xyz/present/phy");
//   const phypresent = await res.data;

//   return (
//     <>
//             <PresentDisplay presents={phypresent} title={"Physics Lab Attendence"}/>
      
//     </>
//   )
// }

"use client";

import { useEffect, useState } from "react";
import PresentDisplay from "../components/PresentDisplay";
import axios from "axios";

export default function PhyPresnt() {
  const [phypresent, setPhyPresent] = useState([]);

  useEffect(() => {
      axios.get("https://present.muntasir3301.xyz/present/phy")
      .then((res)=>setPhyPresent(res.data))
      .catch((err)=> console.log(err))
  }, []);

  return (
    <PresentDisplay presents={phypresent} title={"Physics Lab Attendance"} />
  );
}
