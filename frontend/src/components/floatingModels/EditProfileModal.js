import React, { useEffect, useState } from 'react'
import Profile from '../Profile'
import "../../allStyle/createtweetmodal.css"
import axios from "axios";
import { useAuth } from "../../context/auth"
import {toast} from "react-toastify"
const EditProfileModal = () => {
    // Initialize state variables
    const [auth, setAuth] = useAuth();
    const [user, setUser] = useState({
        name: '', location: '', dateofbirth: ''
    });

    // useEffect hook to update user state when auth.user changes
    useEffect(() => {
        // Update user state with data from auth.user
        setUser({ 
            name: auth?.user?.name || '', 
            location: auth?.user?.location || '', 
            dateofbirth: auth?.user?.dateofbirth || '' 
        });
    }, [auth?.user]);

    // Function to handle form submission
    const submitHandler = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            // Send PUT request to update user data
            const { data } = await axios.put('http://localhost:5000/api/user/' + auth?.user?._id, user, {
                headers: { Authorization: `Bearer ${auth?.token}` } // Include authorization token in request headers
            });

            console.log(data); // Log response data to console

            // Check for errors in response data
            if (data?.error) {
                toast.error(data?.error); // Display error message in toast notification
            } else {
                // Update auth.user with updated user data
                setAuth({ ...auth, user: data?.updateduser });

                // Update user data in local storage
                let storage = localStorage.getItem("auth");
                storage = JSON.parse(storage);
                storage.user = data.updateduser;
                localStorage.setItem("auth", JSON.stringify(storage));

                // Display success message in toast notification
                toast.success("User updated successfully");
            }
        } catch (error) {
            console.log(error); // Log error to console
            toast.error("Something went wrong"); // Display generic error message in toast notification
        }
    };

    return (
        <div className="modal fade" id="editProfileModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        {/* Modal for editing user profile */}
            <div className="modal-dialog rounded-4">
                <div className="modal-content rounded-4">
                    <div className="modal-header border-0" style={{ height: 50 }} >
                        {/* Close button */}
                        <button type="button" className="btn btn-light rounded-5 btn-lg" data-bs-dismiss="modal" aria-label="Close">
                            <i className="fas fa-times fa-md"></i>
                        </button>
                        {/* Title */}
                        <p className="fw-bold fs-5 mt-4 mx-auto">Edit Profile</p>
                    </div>
                    <div className="modal-body">
                        {/* Profile editing form */}
                        <div className="card rounded-0">
                            <div className="card-header border-0 shadow-none rounded-0">
                                <div className="profilePicture d-flex justify-content-center align-items-center">
                                    {/* Profile picture */}
                                    <Profile size="140px" source="https://images.pexels.com/photos/1081685/pexels-photo-1081685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="profile" />
                                </div>
                            </div>
                            <div className='card-body'>
                                <br />
                                <br />
                                <br />
                                {/* Profile editing form */}
                                <form onSubmit={submitHandler}>
                                    {/* Name input field */}
                                    <div className="mb-3">
                                        <label htmlFor="nameInput" className="form-label">Name</label>
                                        <input type="text" className="form-control" placeholder="Enter name"
                                            value={user.name}
                                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                                        />
                                    </div>
                                    {/* Location input field */}
                                    <div className="mb-3">
                                        <label htmlFor="locationInput" className="form-label">Location</label>
                                        <input type="text" className="form-control" placeholder="Your Location"
                                            value={user.location}
                                            onChange={(e) => setUser({ ...user, location: e.target.value })}
                                        />
                                    </div>
                                    {/* Date of Birth input field */}
                                    <div className="mb-3">
                                        <label htmlFor="dobInput" className="form-label">Date Of Birth</label>
                                        <input type="date" className="form-control" placeholder="Date of birth"
                                            value={user.dateofbirth}
                                            onChange={(e) => setUser({ ...user, dateofbirth: e.target.value })}
                                        />
                                    </div>
                                    {/* Save button */}
                                    <div>
                                        <button className="btn btn-primary rounded-5 px-4" type='submit'>
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default EditProfileModal