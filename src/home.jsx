import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';

export default function Home() {
  const [data, setData] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);

    useEffect(() => {
  const getData = async () => {
    try {
      const request = await axios.get("https://restcountries.com/v3.1/all?fields=flags,name");
      if (data.length === 0) { 
        setData(request.data.slice(0, 20));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  getData();
}, [data.length]); 

  

  const handleCheckboxChange = (countryName, isChecked) => {
    if (isChecked) {
      setSelectedCountries((prev) => [...prev, countryName]);
    } else {
      setSelectedCountries((prev) => prev.filter((name) => name !== countryName));
    }
  };

  const handleDelete = () => {
    setData((prevData) => prevData.filter((country) => !selectedCountries.includes(country.name.common)));
    setSelectedCountries([]); 
  };

  return (
    <div className="container p-3">
      <h1 className="text-center mb-5">Countries List</h1>
      <div className="row">
        {data.map((country, index) => (
          <div key={index} className="col-md-3 mb-3 mb-4">
            <div className="card custom-card">
              <input 
                type="checkbox" 
                id={country.name.common} 
                checked={selectedCountries.includes(country.name.common)} // Dynamically check the checkbox
                onChange={(e) => handleCheckboxChange(country.name.common, e.target.checked)} 
              />
              <img src={country.flags.svg} alt={country.name.common} className="card-img-top custom-card-img" />
              <div className="card-body">
                <h5 className="card-title custom-card-title">{country.name.common}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="btn btn-success" onClick={handleDelete}>
        Increment <span className='badge bg-danger'>{selectedCountries.length}</span>
      </button>
    </div>
  );
}
