import React, { useState, useRef } from 'react'
import Profile from '../Profile';
import { toast } from 'react-toastify';
import "../../allStyle/createtweetmodal.css"
import { useAuth } from "../../context/auth";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const ReplyTweetModal = () => {

    // Initialize state variables
    const [auth] = useAuth();
    const [tweet, setTweet] = useState({ content: '', picture: '' });
    const [item, setItem] = useState(null); // Store item being replied to
    const [image, setImage] = useState({ preview: '', data: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Navigate to other routes

    // Add event listener when replytweetModal is shown
    const replytweetModal = document.getElementById('replytweetModal');
    if (replytweetModal) {
        replytweetModal.addEventListener('show.bs.modal', event => {
            const button = event.relatedTarget;
            setItem(JSON.parse(button.getAttribute('info'))); // Set item being replied to
        });
    }

    let url = ''; // Store image URL
    const fileInputRef = useRef(null); // Reference for file input element

    // Function to handle click event on file input button
    const handleFileButtonClick = () => {
        fileInputRef.current.click(); // Programmatically trigger click on file input
    };

    // Function to handle file selection
    const handleFileSelect = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]), // Create preview URL for selected image
            data: e.target.files[0] // Store selected image file object
        };
        setImage(img); // Update image state with selected image information
    };

    // Function to handle image upload to server
    const handleImgUpload = async () => {
        let formData = new FormData();
        formData.append('file', image.data);

        const response = await axios.post(`http://localhost:5000/api/file/uploadFile`, formData);
        return response;
    };

    // Function to view user profile
    const viewprofile = (id) => {
        navigate('/profile/' + id); // Navigate to user profile route
    };

    // Function to view tweet details
    const viewtweet = (id) => {
        navigate('/detail/' + id); // Navigate to tweet detail route
    };

    // Function to handle form submission
    const submitHandler = async (e) => {
        setLoading(true); // Set loading state to true to indicate submission is in progress
        e.preventDefault(); // Prevent default form submission behavior

        try {
            if (image.data !== '') {
                // If an image is selected, upload it to the server
                const imgRes = await handleImgUpload();
                url = "http://localhost:5000/api/file/files/" + imgRes.data.fileName; // Construct image URL
            }

            // Prepare data object to send in POST request
            const data = { content: tweet.content, picture: url };
            console.log(data);

            // Send POST request to reply to the tweet
            const resp = await axios.post(`http://localhost:5000/api/tweet/${item?._id}/reply`, data, {
                headers: { Authorization: `Bearer ${auth?.token}` } // Include authorization token in request headers
            });

            console.log(resp); // Log response to console

            // If reply is successful
            if (resp.status === 201) {
                // Display success toast notification
                toast.success(resp.data.message);
                // Reset tweet state to empty values
                setTweet({ content: '', picture: '' });
                // Reload the page after 3 seconds to reflect changes
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        } catch (error) {
            console.log(error); // Log error to console
            // Display error message in toast notification
            toast.error(error.response.data.message);
        } finally {
            setLoading(false); // Set loading state to false
        }
    };
    return (
        <div className="modal fade" id="replytweetModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog rounded-4">
                <div className="modal-content rounded-4">
                    {/* Modal Header */}
                    <div className="modal-header border-0"  >
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    {/* Modal Body */}
                    {item === null
                        ? ('') : (
                            <>
                                <div className=" border-0 ps-3 pe-2 py-0  d-flex">
                                    {/* Profile Section */}
                                    <Profile source={item?.tweetedby?.profileImg} size="45px" alt="pic" />
                                    <div className='ps-2 w-100 '>
                                        <div className='d-flex align-items-center w-100'>
                                            <div className='ps-0 d-flex align-items-center'>
                                                {/* User Info Section */}
                                                <button className='border-0 btn btn-lignt btn-lg p-0' style={{ fontSize: "17px" }} onClick={() => viewprofile(item?.tweetedby?._id)} data-bs-dismiss="modal" >
                                                    <span className='' style={{ fontWeight: 600 }}>{item?.tweetedby?.name} <i className="fas fa-check-circle fa-md text-primary"></i></span>
                                                    &nbsp;@{item?.tweetedby?.username}
                                                </button>

                                                <span className="ps-2 " style={{ fontSize: "14px" }}>
                                                    - {item?.createdAt}
                                                </span>
                                            </div>
                                        </div>
                                        {/* Tweet Content */}
                                        <div className="card border-0 " onClick={() => viewtweet(item?._id)} data-bs-dismiss="modal">
                                            <p style={{ fontSize: "17px" }}>
                                                {item?.content?.substring(0, 40)}...
                                            </p>
                                        </div>
                                        {/* Replying To Section */}
                                        <p className='py-0 mt-0' style={{ fontSize: "18px" }}>Replying to  <span className='text-primary'>@{item?.tweetedby?.username}</span></p>
                                    </div>
                                </div>
                                <span className='border border-2 replyline' ></span>
                            </>
                        )}


                    {/* Reply Form */}
                    <form onSubmit={submitHandler}>
                        <div className="modal-body">
                            <div className="d-flex">
                                {/* Current User's Profile Section */}
                                <Profile size="45px" source={auth?.user?.profileImg} alt="profile" />
                                <div className="mb-2" style={{ width: "100%" }}>
                                    {/* Textarea for Reply */}
                                    <textarea className="form-control border-0 " rows="3" placeholder='Post your Reply'
                                        value={tweet.content} onChange={(e) => setTweet({ ...tweet, content: e.target.value })}
                                    ></textarea>
                                </div>
                                {/* Image Preview Section */}
                                <div className="card border-0"  >
                                    <img src={image.preview} className="card-img-top" alt={image.data} />
                                </div>
                            </div>

                        </div>
                        {/* Modal Footer */}
                        <div className="modal-footer" >
                            {/* Button for Attaching Images */}
                            <button className="btn btn-light me-auto text-primary" type='button' onClick={handleFileButtonClick}>
                                <i className="far fa-images fa-lg"></i>
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileSelect}
                            />
                            {/* Button for Submitting Reply */}
                            <button type="submit" className="btn btn-primary shadow rounded-5 py-2 px-4" data-bs-dismiss="modal" >
                                {loading ? (<div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>) : ('')} Reply</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>

    )
}

export default ReplyTweetModal;