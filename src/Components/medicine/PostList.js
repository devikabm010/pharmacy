import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import checkAuth from "../store/checkAuth";
import { useState } from "react";

function PostList(props) {
    const user = useSelector((store) => store.auth.user);
    const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

    function deletePost() {
        axios.delete(`https://medicalstore.mashupstack.com/api/medicine/${props.post.id}`, {
            headers: {
                Authorization: 'Bearer ' + user.token,
            },
        })
        .then(() => {
            // Show alert indicating post is deleted
            window.alert('Post has been deleted successfully!');
            props.refresh();
            setDeleteConfirmationOpen(false);
        })
        .catch((error) => {
            console.error("Error deleting post:", error);
        });
    }
    

    return (  
        <div>    
            <div className="card">
                <div className="card-body">
                    {props.post.name}
                    <Link to={`/medicine/list/${props.post.id}`} className="btn btn-info float-right">View</Link>
                    <Link to={`/medicine/list/${props.post.id}/edit`} className="btn btn-primary float-right">Edit</Link>
                    <button className="btn btn-danger float-right" onClick={() => setDeleteConfirmationOpen(true)}>
                        Delete
                    </button>
                </div>
            </div>
            {isDeleteConfirmationOpen && (
                <div className="confirmation-dialog">
                    <p>Are you sure you want to delete this post?</p>
                    <button className="btn btn-danger" onClick={deletePost}>
                        Yes, Delete
                    </button>
                    <button className="btn btn-secondary" onClick={() => setDeleteConfirmationOpen(false)}>
                        Cancel
                    </button>
                </div>
            )}
        </div> 
    );
}

export default checkAuth(PostList);