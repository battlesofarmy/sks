import PresentDisplay from '../components/PresentDisplay'
import axios from 'axios';

export default async function PhyPresnt() {
  const res = await axios.get("http://localhost:5000/present/phy");
  const phypresent = await res.data;

  return (
    <>
            <PresentDisplay presents={phypresent} title={"Physics Lab Attendence"}/>
      
    </>
  )
}
