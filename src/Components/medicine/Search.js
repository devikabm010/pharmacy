import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import checkAuth from "../store/checkAuth";

function Search() {
  const user = useSelector(store => store.auth.user);
  const [search, setSearch] = useState([]);
  const [keyword, setKeyword] = useState("");
  const config = {
    headers: {
      'Authorization': 'Bearer ' + user.token
    }
  }

  useEffect(() => {
    axios.get(`https://medicalstore.mashupstack.com/api/medicine/search?keyword=${keyword}`, config)
      .then(response => {
        console.log(response.data, "response in")
        setSearch(response.data)
      })
  }, [keyword, user.token])

  const isExpired = (expiryDate) => {
    const currentDate = new Date();
    const medExpiryDate = new Date(expiryDate);
    return medExpiryDate < currentDate;
  }

  return (
    <div>
      <form>
        <input
          type="text" placeholder="Search here " value={keyword} onChange={event => setKeyword(event.target.value)} />
      </form>
      <div>
        {search.map((medicine) => (
          <div key={medicine.id}>
            <h3>{medicine.name}</h3>
            <p>Company: {medicine.company}</p>
            <p className={isExpired(medicine.expiry_date) ? "text-danger" : "text-success"}>
              Expiry date: {medicine.expiry_date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default checkAuth(Search);