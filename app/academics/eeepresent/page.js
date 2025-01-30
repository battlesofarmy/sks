"use client";

import { useEffect, useState } from "react";
import PresentDisplay from "../components/PresentDisplay";
import axios from "axios";

export default function EEEpresent() {
  const [eeepresent, setEEEPresent] = useState([]);

  useEffect(() => {
    axios
      .get("https://present.muntasir3301.xyz/present/eee")
      .then((res) => {
        setEEEPresent(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []); // Empty dependency array ensures it runs once when component mounts

  return <PresentDisplay presents={eeepresent} title={"EEE Lab Attendance"} />;
}
