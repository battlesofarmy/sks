import axios from 'axios';
import styles  from './table.css'

import { FaRegCheckCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";


export default async function PresentDisplay({title, presents}) {

  // const stuRes = await axios.get("http://192.168.0.194:5000/student");
  const stuRes = await axios.get("https://present.muntasir3301.xyz/student");
  const students = await stuRes.data;

  
  return (
    <>
      <section className="py-20">
        <div className="md:container px-2">
          <h3 className='text-2xl mb-6 border-l-blue-800 border-l-4 pl-3'>{title}</h3>
        <table className="">
          {
            <tr className='text-center'>
              <td>Id</td>
              <td>Name</td>
              {
                presents?.map(ele=>
                  <td key={ele.date.month}>
                    <p className='capitalize'>{ele.date.day}</p>
                    <p className='text-xs'>{ele.date.month}</p>
                  </td>
                )
              }
              <td>
                <p>Total</p>
                <p className="text-xs">Outof {presents.length}</p>
              </td>
              <td>
                <p>Marks</p>
                <p className="text-xs">10%</p>
              </td>
            </tr>
          }
        {
          students?.map((ele, i)=>
            <tr style={{
              backgroundColor: presents.reduceRight((acc, data, j) => {
                if (acc.stopped) return acc; 
                if (data.present[i] === "p") acc.stopped = true; 
                else if (data.present[i] === "a") acc.count++; 
                return acc;
              }, { count: 0, stopped: false }).count>2 && "#ff6666"}} key={ele.name}>
              


              <td className="">{students[i].id}</td>
              <td width={150} className='text-left'>{students[i].name}</td>
              {
                presents?.map((data, j)=>
                  <td key={data.name}>{presents[j]?.present[i]=== "p" ? <FaRegCheckCircle className='text-green-700 mx-auto'/> : <RxCross2 className='text-red-700 mx-auto'/>}</td>
                )
              }
                
              <td>{presents?.reverse().filter((data) => data.present[i] === "p" ).length}</td>
                
              <td>{Math.ceil((presents?.reverse().filter((data) => data.present[i] === "p" ).length/presents.length) * 10)}</td>
            </tr>
          )
        }
        </table>



        </div>
      </section>
    </>
  );
}
