import React, { useState, useEffect, useRef } from 'react'
import Profile from '../Profile';
import { toast } from 'react-toastify';
import "../../allStyle/createtweetmodal.css"
import { useAuth } from "../../context/auth";
import axios from "axios";
const CreateTweetModal = () => {
    const [auth] = useAuth()
    const [tweet, setTweet] = useState({ content: '', picture: '' });
    const [image, setImage] = useState({ preview: '', data: '' })
    const [loading, setLoading] = useState(false);

    let url = '';
    const fileInputRef = useRef(null);

    const handleFileButtonClick = () => {
        fileInputRef.current.click();
    };
    const handleFileSelect = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0]
        }
        setImage(img);

    };
    const handleImgUpload = async () => {
        let formData = new FormData();
        formData.append('file', image.data);

        const response = await axios.post(`http://localhost:5000/api/file/uploadFile`, formData)
        return response;
    }


    const submitHandler = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            if (image.data !== '') {
                const imgRes = await handleImgUpload();
                url = "http://localhost:5000/api/file/files/" + imgRes.data.fileName
                //"http://localhost:5000/api/file/files/file-1705648616517-0.8677161598305487.png"

            }

            const data = { content: tweet.content, picture: url }
            console.log(data);
            const resp = await axios.post('http://localhost:5000/api/tweet/', data, {
                headers: { Authorization: `Bearer ${auth?.token}` }
            });
            setLoading(false);
            // console.log(resp);
            if (resp.status === 201) {
                toast.success(resp.data.message);
                setTweet({ content: '', picture: '' });
                setTimeout(() => {
                    window.location.reload()
                }, 3000);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);

        }
    }

    return (
        <div className="modal fade" id="createtweetModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog  rounded-4">
                <div className="modal-content rounded-4">
                    <div className="modal-header border-0"  >
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={submitHandler}>
                        <div className="modal-body overflow-auto" style={{ maxHeight: "70vh", minHeight: 150 }}>
                            <div className="d-flex">
                                <Profile size="45px" source={auth?.user?.profileImg} alt="profile" />
                                <div className="mb-2" style={{ width: "100%" }}>
                                    <textarea className="form-control border-0" rows="1" placeholder='what is happening?!'
                                        value={tweet.content} onChange={(e) => setTweet({ ...tweet, content: e.target.value })}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="card border-0"  >
                                <img src={image.preview} className="card-img-top" alt={image.data} />
                            </div>

                        </div>
                        <div className="modal-footer d-block h-25 border-0" >
                            <div className='ps-3'>
                                <span className="text-primary"><i className="fas fa-globe-americas fa-md"></i> Everyone can reply</span>

                            </div>
                            <div className='d-flex'>
                                <button className="btn btn-light me-auto text-primary" type='button' onClick={handleFileButtonClick}>
                                    <i className="far fa-images fa-lg"></i>
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept=".jpg,.png,.gif"
                                    style={{ display: 'none' }}
                                    onChange={handleFileSelect}
                                />
                                {loading ?
                                    <div className='me-auto'>
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                    : ''}
                                <button type="submit" className="btn btn-primary shadow rounded-5 py-2 px-4" data-bs-dismiss="modal" >Post</button>

                            </div>
                        </div>
                    </form>

                </div>
            </div>



        </div>
    )
}

export default CreateTweetModal