import PresentDisplay from '../components/PresentDisplay'
import axios from 'axios';

export default async function PhyPresnt() {
  const res = await axios.get("https://present.muntasir3301.xyz/present/phy");
  const phypresent = await res.data;

  return (
    <>
            <PresentDisplay presents={phypresent} title={"Physics Lab Attendence"}/>
      
    </>
  )
}
