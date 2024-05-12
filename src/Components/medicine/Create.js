import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import checkAuth from "../store/checkAuth";
import Navbar from "../Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Create() {
    const user = useSelector(store => store.auth.user);
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [expiryDate, setExpiryDate] = useState(new Date()); // Default to today's date
    const navigate = useNavigate();

    const config = {
        headers: {
            'Authorization': 'Bearer ' + user.token
        }
    }

    const formatExpiryDate = (date) => {
        // Format the date to 'YYYY-MM-DD' string
        return date.toISOString().split('T')[0];
    }

    const body = {
        name: name,
        company: company,
        expiry_date: formatExpiryDate(expiryDate) 
    }

    function addPost() {
        axios.post('https://medicalstore.mashupstack.com/api/medicine', body, config)
            .then(response => {
                // Show alert indicating post is created
                window.alert('Post has been created successfully!');
                // Navigate to medicine list page
                navigate('/medicine/list');
            })
            .catch(error => {
                // Handle error if necessary
                console.error('Error creating post:', error);
            });
    }    

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2">
                        <h1 className="text-center">Create Medicine List</h1>
                        <div className="form-group">
                            <label>Medicine:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(event) => { setName(event.target.value) }}
                            />
                        </div>
                        <div className="form-group">
                            <label>Company:</label>
                            <textarea
                                className="form-control"
                                value={company}
                                onChange={(event) => { setCompany(event.target.value) }}
                            />
                        </div>
                        <div className="form-group">
                            <label>Expiry Date:</label>
                            <br />
                            <DatePicker
                                selected={expiryDate}
                                onChange={(date) => setExpiryDate(date)}
                                dateFormat="yyyy-MM-dd"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary float-right" onClick={addPost}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(Create);
