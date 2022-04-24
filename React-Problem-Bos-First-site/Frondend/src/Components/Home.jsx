import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  const [data, setData] = useState([]);
  const [sortdata, setSortdata] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8081/Lists/`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setSortdata(res);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const handleSort = () => {
    let temp = [...data];
    temp.sort((a, b) => a.CostPerDay - b.CostPerDay);
    setSortdata(temp);
  };
  const handleRating = () => {
    let temp = [...data];
    temp.sort((a, b) => b.Rating - a.Rating);
    setSortdata(temp);
  };
  const handleVerified = () => {
    let temp = data.filter((e) => e.Verified == "true");
    setSortdata(temp);
  };
  const handleReset = () => {
    setSortdata(data);
  };

  const handleSearch = () => {
    let temp = data.filter((e) => e.City == "Bangalore");
    setSortdata(temp);
  };

  return (
    <div>
      <input type="text" placeholder="City" />
      <button onClick={handleSearch}>Submit</button>
      <br />
      <br />
      <button onClick={handleSort}>Sort by Cost per day</button>
      <button onClick={handleRating}>Sort by Rating</button>
      <button onClick={handleVerified}>Filter by Verified</button>
      <button>Filter by City</button>
      <button onClick={handleReset}>Reset</button>

      {/* {sortdata.map((e) => (
        <div key={e.id} style={{ border: "1px solid red" }}>
          <p>Name : {e.Name}</p>
          <p>City : {e.City}</p>
          <p>Address : {e.Address}</p>
          <p>Capacity : {e.Capacity}</p>
          <p>CostPerDay : {e.CostPerDay}</p>
          <p>Rating : {e.Rating}</p>
          <p>Verified : {e.Verified}</p>
        </div>
      ))} */}

      <table style={{ border: "1.5px solid black" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid gray" }}>S.No</th>
            <th style={{ border: "1px solid gray" }}>Name</th>
            <th style={{ border: "1px solid gray" }}>City</th>
            <th style={{ border: "1px solid gray" }}>Address</th>
            <th style={{ border: "1px solid gray" }}>Capacity</th>
            <th style={{ border: "1px solid gray" }}>Cost Per Day</th>
            <th style={{ border: "1px solid gray" }}>Verified</th>
            <th style={{ border: "1px solid gray" }}>Rating</th>
            <th style={{ border: "1px solid gray" }}>Details Page</th>
          </tr>
        </thead>

        <tbody>
          {sortdata.map((e, i) => (
            <tr key={e.id}>
              <td style={{ border: "1px solid gray" }}>{i + 1}.</td>
              <td style={{ border: "1px solid gray" }}>{e.Name}</td>
              <td style={{ border: "1px solid gray" }}>{e.City}</td>
              <td style={{ border: "1px solid gray" }}>{e.Address}</td>
              <td style={{ border: "1px solid gray" }}>{e.Capacity}</td>
              <td style={{ border: "1px solid gray" }}>{e.CostPerDay}</td>
              <td style={{ border: "1px solid gray" }}>{e.Verified}</td>
              <td style={{ border: "1px solid gray" }}>{e.Rating}</td>
              <Link to={`/listing/${e.id}`}>
                <td style={{ border: "1px solid gray" }}>Details</td>
              </Link>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
