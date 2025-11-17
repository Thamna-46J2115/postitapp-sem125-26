import React, { useState, useEffect } from "react";
import axios from "axios";

const Location = () => {
  const [ip, setIp] = useState(null); // State to hold the IP address
  const [geoData, setGeoData] = useState(null); // State to hold geolocation data
  const [currency, setcurrency] = useState("");
  const [city, setcity] = useState("");
  const [Language, setLanguage] = useState();
  const fetchIpAddress = async () => {
    try {
      const response = await axios.get("https://api.ipify.org?format=json");
      setIp(response.data.ip); // Set the IP address in state
    } catch (error) {
      console.error("Error fetching IP address:", error.message);
    }
  };
  // Fetch geolocation data based on the IP
  const getGeoLocationData = async () => {
    if (!ip) return;

    try {
      const response = await axios.get(`http://ip-api.com/json/${ip}`);
      setGeoData(response.data); // Set geolocation data in state
      var country = geoData.country;
      if (geoData.country == "Oman") {
        setcurrency("OMR");
      }
      if (country == "AUE") {
        setcurrency("AED");
      }
      if (city == "Muscat") {
        setLanguage("arabic");
      }

      console.log("GeoLocation Data:", response.data);
    } catch (error) {
      console.error("Error fetching geolocation data:", error.message);
    }
  };
  // Fetch the IP address when the component is loaded
  useEffect(() => {
    fetchIpAddress();
  }, []);
  // Fetch geolocation data when the IP is updated
  useEffect(() => {
    if (ip) {
      getGeoLocationData();
    }
  }, [ip]);
  return (
    <div className="location">
      <p>Location Information</p>

      {ip ? <p>IP Address: {ip}</p> : <p>Loading IP address...</p>}

      {geoData ? (
        <div>
          <p>Country: {geoData.country}</p>
          <br />
          <p>Region: {geoData.region}</p>
          <p>currency:{currency}</p>
          <p>city:{city}</p>
          <p>Language:{Language}</p>
        </div>
      ) : (
        <p>Loading Geolocation Data...</p>
      )}
    </div>
  );
};

export default Location;
