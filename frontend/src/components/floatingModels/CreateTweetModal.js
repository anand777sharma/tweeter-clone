import React, { useState, useRef } from 'react'
import Profile from '../Profile';
import { toast } from 'react-toastify';
import "../../allStyle/createtweetmodal.css"
import { useAuth } from "../../context/auth";
import axios from "axios";
const CreateTweetModal = () => {
    // Initialize state variables
    const [auth] = useAuth(); // Assuming useAuth returns authentication information
    const [tweet, setTweet] = useState({ content: '', picture: '' });
    const [image, setImage] = useState({ preview: '', data: '' });
    const [loading, setLoading] = useState(false);

    let url = ''; // Initialize URL variable for storing image URL
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
        // Create FormData object to send file data to server
        let formData = new FormData();
        formData.append('file', image.data); // Append selected image file to FormData

        // Send POST request to server to upload image
        const response = await axios.post(`https://twitter-clone-h3u6.onrender.com/api/file/uploadFile`, formData);
        return response; // Return response from server
    };

    // Function to handle form submission
    const submitHandler = async (e) => {
        setLoading(true); // Set loading state to true to indicate submission is in progress
        e.preventDefault(); // Prevent default form submission behavior

        try {
            if (image.data !== '') {
                // If an image is selected, upload it to the server
                const imgRes = await handleImgUpload();
                url = "https://twitter-clone-h3u6.onrender.com/api/file/files/" + imgRes.data.fileName; // Construct image URL
            }

            // Prepare data object to send in POST request
            const data = { content: tweet.content, picture: url };
            console.log(data);

            // Send POST request to create a new tweet
            const resp = await axios.post('https://twitter-clone-h3u6.onrender.com/api/tweet/', data, {
                headers: { Authorization: `Bearer ${auth?.token}` } // Include authorization token in request headers
            });
            setLoading(false); // Set loading state to false after request is completed

            // If tweet creation is successful
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
            // Handle any errors that occur during the process
            console.log(error);
            toast.error(error.response.data.message); // Display error message in toast notification
        }
    };

    return (
        <div className="modal fade" id="createtweetModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        {/* The modal element for creating a tweet */}
            <div className="modal-dialog  rounded-4">
                <div className="modal-content rounded-4">
                    <div className="modal-header border-0"  >
                        {/* Close button for the modal */}
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={submitHandler}>
                    {/* Form for submitting the tweet */}
                        <div className="modal-body overflow-auto" style={{ maxHeight: "70vh", minHeight: 150 }}>
                        {/* Modal body for entering tweet content */}
                            <div className="d-flex">
                            {/* Container for profile image and tweet content */}
                                <Profile size="45px" source={auth?.user?.profileImg} alt="profile" />
                                <div className="mb-2" style={{ width: "100%" }}>
                                    <textarea className="form-control border-0" rows="1" placeholder='what is happening?!'
                                        value={tweet.content} onChange={(e) => setTweet({ ...tweet, content: e.target.value })}
                                    ></textarea>
                                    {/* Textarea for entering tweet content */}
                                </div>
                            </div>
                            <div className="card border-0"  >
                            {/* Card for displaying image preview */}
                                <img src={image.preview} className="card-img-top" alt={image.data} />
                                {/* Image preview */}
                            </div>
                        </div>
                        <div className="modal-footer d-block h-25 border-0" >
                        {/* Modal footer */}
                            <div className='ps-3'>
                            {/* Left aligned content */}
                                <span className="text-primary"><i className="fas fa-globe-americas fa-md"></i> Everyone can reply</span>
                                {/* Information about who can reply */}
                            </div>
                            <div className='d-flex'>
                            {/* Right aligned content */}
                                <button className="btn btn-light me-auto text-primary" type='button' onClick={handleFileButtonClick}>
                                    <i className="far fa-images fa-lg"></i>
                                    {/* Button for adding images */}
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept=".jpg,.png,.gif"
                                    style={{ display: 'none' }}
                                    onChange={handleFileSelect}
                                />
                                {/* Input for selecting images */}
                                {loading ?
                                    <div className='me-auto'>
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                    : ''}
                                    {/* Loading spinner */}
                                <button type="submit" className="btn btn-primary shadow rounded-5 py-2 px-4" data-bs-dismiss="modal" >Post</button>
                                {/* Button for posting the tweet */}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
    )
}

export default CreateTweetModal