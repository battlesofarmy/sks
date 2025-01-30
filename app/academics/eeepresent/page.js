import PresentDisplay from '../components/PresentDisplay'
import axios from 'axios';

export default async function EEEpresent() {
  const res = await axios.get("http://localhost:5000/present/eee");
  const phypresent = await res.data;

  return (
    <>
        <PresentDisplay presents={phypresent} title={"EEE Lab Attendence"}/>
    </>
  )
}
