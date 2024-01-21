import React, { useState, useEffect, useRef } from 'react'
import Profile from '../Profile';
import { toast } from 'react-toastify';
import "../../allStyle/createtweetmodal.css"
import { useAuth } from "../../context/auth";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const ReplyTweetModal = () => {

    const [auth] = useAuth()
    const [tweet, setTweet] = useState({ content: '' });
    // const [tweetid, setTweetid] = useState('')
    const [item, setItem] = useState(null)
    // const [tweetcontent, setTweetcontent] = useState("")
    const navigate = useNavigate();

    const replytweetModal = document.getElementById('replytweetModal')
    if (replytweetModal) {
        replytweetModal.addEventListener('show.bs.modal', event => {
            const button = event.relatedTarget
            setItem(JSON.parse(button.getAttribute('info')))

        })
    }
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };
    const viewprofile = (id) => {
        navigate('/profile/' + id);
    }
    const viewtweet = (id) => {
        navigate('/detail/' + id);
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const resp = await axios.post(`http://localhost:5000/api/tweet/${item?._id}/reply`, tweet, {
                headers: { Authorization: `Bearer ${auth?.token}` }
            });
            console.log(resp);
            if (resp.status === 201) {
                toast.success(resp.data.message);
                setTweet({ content: '' });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);

        }
    }

    return (
        <div className="modal fade" id="replytweetModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog rounded-4">
                <div className="modal-content rounded-4">
                    <div className="modal-header border-0"  >
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    {item === null
                        ? ('') : (
                            <>
                                <div className=" border-0 ps-3 pe-2 py-0  d-flex">
                                    <Profile source={item?.tweetedby?.profileImg} size="45px" alt="pic" />
                                    <div className='ps-2 w-100 '>
                                        <div className='d-flex align-items-center w-100'>
                                            <div className='ps-0 d-flex align-items-center'>
                                                <button className='border-0 btn btn-lignt btn-lg p-0' style={{ fontSize: "17px" }} onClick={() => viewprofile(item?.tweetedby?._id)} data-bs-dismiss="modal" >
                                                    <span className='' style={{ fontWeight: 600 }}>{item?.tweetedby?.name} <i className="fas fa-check-circle fa-md text-primary"></i></span>
                                                    &nbsp;@{item?.tweetedby?.username}
                                                </button>

                                                <span className="ps-2 " style={{ fontSize: "14px" }}>
                                                    - {item?.createdAt}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="card border-0 " onClick={() => viewtweet(item?._id)} data-bs-dismiss="modal">
                                            <p style={{ fontSize: "17px" }}>
                                                {item?.content?.substring(0, 40)}...
                                            </p>
                                        </div>
                                        <p className='py-0 mt-0' style={{ fontSize: "18px" }}>Replying to  <span className='text-primary'>@{item?.tweetedby?.username}</span></p>
                                    </div>
                                </div>
                                <span className='border border-2 replyline' ></span>
                            </>

                        )}


                    <form onSubmit={submitHandler}>
                        <div className="modal-body">
                            <div className="d-flex">
                                <Profile size="45px" source={auth?.user?.profileImg} alt="profile" />
                                <div className="mb-2" style={{ width: "100%" }}>
                                    <textarea className="form-control border-0 " rows="3" placeholder='Post your Reply'
                                        value={tweet.content} onChange={(e) => setTweet({ ...tweet, content: e.target.value })}
                                    ></textarea>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer" >
                            <button className="btn btn-light me-auto text-primary" type='button' onClick={handleButtonClick}>
                                <i className="far fa-images fa-lg"></i>
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                            // onChange={handleFileChange}
                            />
                            <button type="submit" className="btn btn-primary shadow rounded-5 py-2 px-4" data-bs-dismiss="modal" >Reply</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default ReplyTweetModal;