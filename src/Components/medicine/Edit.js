import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import checkAuth from "../store/checkAuth";
import Navbar from "../Navbar";

function Edit() {
    const user = useSelector(store => store.auth.user);
    const { postId } = useParams();
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [expiry_date, setExpiry_date] = useState('');
    const config = {
        headers: {
            'Authorization': 'Bearer ' + user.token
        }
    }

    const navigate = useNavigate();
    const [isEditConfirmationOpen, setEditConfirmationOpen] = useState(false);

    useEffect(() => {
        axios.get(`https://medicalstore.mashupstack.com/api/medicine/${postId}`, config).then(response => {
            setName(response.data.name);
            setCompany(response.data.company);
            setExpiry_date(response.data.expiry_date);
        });
    }, [postId]);

    function updatePost() {
        setEditConfirmationOpen(true);
    }

    function confirmEdit() {
        axios.post(`https://medicalstore.mashupstack.com/api/medicine/${postId}`, {
            name: name,
            company: company,
            expiry_date: expiry_date
        }, config).then(response => {
            console.log(response.data.message);
            // Show alert indicating post is updated
            window.alert('Medicine has been updated successfully!');
            // Navigate to medicine list page
            navigate('/medicine/list');
        }).catch(error => {
            // Handle error if necessary
            console.error('Error updating medicine:', error);
        });
    }
    

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2">
                        <h1 className="text-center">Edit Medicine</h1>
                        <div className="form-group">
                            <label> Med Name:</label>
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
                            <textarea
                                className="form-control"
                                value={expiry_date}
                                onChange={(event) => { setExpiry_date(event.target.value) }}
                            />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary float-right" onClick={updatePost}>Edit</button>
                            {isEditConfirmationOpen && (
                                <div className="confirmation-dialog">
                                    <p>Are you sure you want to edit this medicine?</p>
                                    <button className="btn btn-primary" onClick={confirmEdit}>
                                        Yes, Edit
                                    </button>
                                    <button className="btn btn-secondary" onClick={() => setEditConfirmationOpen(false)}>
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(Edit);