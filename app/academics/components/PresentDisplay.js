"use client";  // To indicate that this component should only run on the client

import { useEffect, useState } from "react";
import axios from "axios";
import styles from './table.css';

import { FaRegCheckCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

export default function PresentDisplay({ title, presents }) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch students data when the component mounts
    const fetchData = async () => {
      try {
        const stuRes = await axios.get("https://present.muntasir3301.xyz/student");
        setStudents(stuRes.data);  // Set the fetched students data into state
      } catch (error) {
        console.error("Error fetching students data:", error);
      }
    };

    fetchData();
  }, []);  // Empty dependency array ensures this runs only once when the component mounts

  return (
    <section className="py-20">
      <div className="md:container px-2">
        <h3 className="text-2xl mb-6 border-l-blue-800 border-l-4 pl-3">{title}</h3>
        <table className="">
          <thead>
            <tr className="text-center">
              <td>Id</td>
              <td>Name</td>
              {presents?.map(ele => (
                <td key={ele.date.month}>
                  <p className="capitalize">{ele.date.day}</p>
                  <p className="text-xs">{ele.date.month}</p>
                </td>
              ))}
              <td>
                <p>Total</p>
                <p className="text-xs">Outof {presents.length}</p>
              </td>
              <td>
                <p>Marks</p>
                <p className="text-xs">10%</p>
              </td>
            </tr>
          </thead>
          <tbody>
            {students?.map((ele, i) => (
              <tr
                key={ele.name}
                style={{
                  backgroundColor:
                    presents.reduceRight(
                      (acc, data, j) => {
                        if (acc.stopped) return acc;
                        if (data.present[i] === "p") acc.stopped = true;
                        else if (data.present[i] === "a") acc.count++;
                        return acc;
                      },
                      { count: 0, stopped: false }
                    ).count > 2 && "#ff6666",
                }}
              >
                <td>{students[i].id}</td>
                <td width={150} className="text-left">
                  {students[i].name}
                </td>
                {presents?.map((data, j) => (
                  <td key={data.name}>
                    {presents[j]?.present[i] === "p" ? (
                      <FaRegCheckCircle className="text-green-700 mx-auto" />
                    ) : (
                      <RxCross2 className="text-red-700 mx-auto" />
                    )}
                  </td>
                ))}
                <td>
                  {presents
                    ?.reverse()
                    .filter((data) => data.present[i] === "p").length}
                </td>
                <td>
                  {Math.ceil(
                    (presents
                      ?.reverse()
                      .filter((data) => data.present[i] === "p")
                      .length /
                      presents.length) *
                      10
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
