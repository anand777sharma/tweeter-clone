import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import "../allStyle/tweetDetail.css"
// import Reply from './Reply'
import TweetCard from './TweetCard'
import axios from 'axios';
import Profile from './Profile';
import { toast } from 'react-toastify';
import { useAuth } from '../context/auth';


const TweetDetail = () => {
  const [tweet, setTweet] = useState();
  const [tweetr, setTweetr] = useState({ content: '', picture: '' });
  const [image, setImage] = useState({ preview: '', data: '' })
  const [auth, setAuth] = useAuth();
  const { id } = useParams();
  const [info, setInfo] = useState(null)

  const navigate = useNavigate();
  const replytweetModal = document.getElementById('replytweetModal')
  if (replytweetModal) {
    replytweetModal.addEventListener('show.bs.modal', event => {
      const button = event.relatedTarget
      setInfo(JSON.parse(button.getAttribute('info')))

    })
  }
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


  const viewprofile = (id) => {
    navigate('/profile/' + id);
  }
  const viewtweet = (id) => {
    fetchData();
    navigate('/detail/' + id);

  }
  const followuser = async (id) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/user/${id}/follow`,
        {},
        {
          headers: { Authorization: `Bearer ${auth?.token}` }
        }
      );
      if (data?.error) {
        toast.error(data?.error)
      }
      else {
        setAuth({ ...auth, user: data?.updateduser })
        let storage = localStorage.getItem("auth");
        storage = JSON.parse(storage);
        storage.user = data.updateduser;
        localStorage.setItem("auth", JSON.stringify(storage));
        toast.success(data.message)
        fetchData();
      }
    } catch (error) {

      toast.error(error)
    }

  }
  const unfollowuser = async (id) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/user/${id}/unfollow`,
        {},
        {
          headers: { Authorization: `Bearer ${auth?.token}` }
        }
      );
      if (data?.error) {
        toast.error(data?.error)
      }
      else {
        setAuth({ ...auth, user: data?.updateduser })
        let storage = localStorage.getItem("auth");
        storage = JSON.parse(storage);
        storage.user = data.updateduser;
        localStorage.setItem("auth", JSON.stringify(storage));
        toast.success(data.message)
        fetchData();
      }
    } catch (error) {

      toast.error(error)
    }

  }
  const deletetweet = async (id) => {
    try {
      const { data } = await axios.delete(
        'http://localhost:5000/api/tweet/' + id,
        // {},
        {
          headers: { Authorization: `Bearer ${auth?.token}` }
        }
      );
      if (data?.error) {
        toast.error(data?.error)
      }
      else {
        toast.success(data.message)
        fetchData();
      }
    } catch (error) {

      toast.error(error)
    }
  }
  const like = async (id) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/tweet/${id}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${auth?.token}` }
        }
      );
      if (data?.error) {
        toast.error(data?.error)
      }
      else {
        toast.success(data.message)
        fetchData();


      }
    } catch (error) {
      toast.error(error)
    }

  }
  const unlike = async (id) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/tweet/${id}/dislike`,
        {},
        {
          headers: { Authorization: `Bearer ${auth?.token}` }
        }
      );
      if (data?.error) {
        toast.error(data?.error)
      }
      else {
        toast.success(data.message)
        fetchData();

      }
    } catch (error) {
      toast.error(error)
    }

  }
  const fetchData = async () => {
    try {
      const resp = await axios.get('http://localhost:5000/api/tweet/' + id);
      const tdata = resp.data;
      setTweet(tdata);

    } catch (error) {
      console.log(error);
    }
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
     if (image.data !== '') {
        const imgRes = await handleImgUpload();
        url = "http://localhost:5000/api/file/files/" + imgRes.data.fileName


      }
      const data = { content: tweet.content, picture: url }
      console.log(data);
      const resp = await axios.post(`http://localhost:5000/api/tweet/${info?._id}/reply`, data, {
        headers: { Authorization: `Bearer ${auth?.token}` }
      })
      console.log(resp);
      if (resp.status === 201) {
        toast.success(resp.data.message);
        setTweetr({  content: '', picture: '' });
        fetchData();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);

    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  console.log(tweet);
  return (
    <div>
    {/* Header Section */}
    <div className="container-fluid d-flex bg-light align-items-center py-1 border border-2 border-bottom-0">
        <div>
            {/* Back Button */}
            <Link className="btn btn-light rounded-5" to="/home">
                <i className="fas fa-solid fa-arrow-left"></i>
            </Link>
        </div>
        {/* Title */}
        <div className="fs-5 fw-bold ">
            Tweet
        </div>
        {/* Tweet Button */}
        <button className="btn btn-primary btn-lg shadow m-1 px-5 rounded-5 ms-auto" data-bs-toggle="modal" data-bs-target="#createtweetModal">
            post
        </button>
    </div>

    {/* Individual Tweet Card */}
    <div className='card rounded-0'>
        <div className="card-body ps-3 pe-2 py-2 d-flex">
            {/* Profile Image */}
            <Profile source={tweet?.tweetedby?.profileImg} size="40px" alt="pic" />
            <div className='ps-2 w-100 '>
                <div className='d-flex align-items-center w-100'>
                    <div className='ps-0'>
                        {/* User Info */}
                        <button className='border-0 btn btn-lignt btn-lg p-0 fs-6' onClick={() => viewprofile(tweet?.tweetedby?._id)} >
                            <span className='fw-bold '>{tweet?.tweetedby?.name} <i className="fas fa-check-circle fa-md text-primary"></i></span>
                            &nbsp; @{tweet?.tweetedby?.username}
                        </button>
                        {/* Tweet Time */}
                        <span className="ps-2" style={{ fontSize: "12px" }}>
                            - {tweet?.createdAt}
                        </span>
                    </div>

                    <div className="ms-auto fs-4 text-muted ">
                        {/* Tweet Actions */}
                        {auth?.user?._id === tweet?.tweetedby?._id ?
                            (<button
                                className=" btn btn-light p-2 rounded-4"
                                onClick={() => deletetweet(tweet?._id)}
                            >
                                <i className="far fa-trash-alt fa-md"></i>
                            </button>)
                            :
                            (<>
                                {auth?.user?.following?.some(i => i === tweet?.tweetedby?._id) ? (
                                    <button
                                        className=" btn btn-light p-2 rounded-4"
                                        onClick={() => unfollowuser(tweet?.tweetedby?._id)}
                                    >
                                        <i className="fas fa-regular fa-user-minus fa-md"></i>
                                    </button>
                                ) : (
                                    <button
                                        className=" btn btn-light p-2 rounded-4"
                                        onClick={() => followuser(tweet?.tweetedby?._id)}
                                    >
                                        <i className="fas fa-regular fa-user-plus fa-md"></i>
                                    </button>
                                )}
                            </>
                            )
                        }
                    </div>
                </div>

                <div className="card border-0 " onClick={() => viewtweet(tweet?._id)}>
                    {/* Tweet Content */}
                    <p style={{ fontSize: "14px" }}>
                        {tweet?.content}
                    </p>
                    {/* Tweet Picture */}
                    {tweet?.picture === '' ?
                        ('') :
                        (
                            <>
                                <div>
                                    <img src={tweet?.picture}
                                        className=" rounded-4 border border-2" alt="pic" style={{ maxHeight: 400, maxWidth: 450 }} />
                                </div>
                            </>
                        )}
                </div>
                {/* Tweet Actions */}
                <div className="d-flex  px-3 pt-2">
                    <div className='pe-5'>
                        <>
                            {/* Like Button */}
                            {tweet?.likes?.some(i => i === auth?.user?._id) ? (
                                <button
                                    className="btn btn-light text-danger px-2 py-1 rounded-circle "
                                    onClick={() => unlike(tweet?._id)}
                                >
                                    <i className="fas fa-heart fa-md"></i>
                                </button>
                            ) : (
                                <button
                                    className="btn btn-light px-2 py-1 rounded-circle"
                                    onClick={() => like(tweet?._id)}
                                >
                                    <i className="far fa-heart fa-md"></i>
                                </button>
                            )}
                            {/* Like Count */}
                            {tweet?.likes?.length}
                        </>
                    </div>
                    <div className='text-primary pe-5'>
                        {/* Reply Button */}
                        <button
                            className="btn btn-light text-primary px-2 py-1 rounded-circle "
                            type="button" data-bs-toggle="modal"
                            info={JSON.stringify(tweet)}
                            data-bs-target="#replytweetModal"
                        >
                            <i className="far fa-comment fa-md"></i>
                        </button>
                        {/* Reply Count */}
                        {tweet?.replies?.length}
                    </div>
                    <div className='text-success pe-5'>
                        {/* Retweet Count */}
                        <i className="fas fa-retweet fa-md"></i> {tweet?.retweetedby?.length}
                    </div>
                </div>
            </div>
        </div>
        <div className='card-footer text-center fw-bold'>
            {/* Replies Header */}
            Replies
        </div>
    </div>

    {/* Reply Tweet Modal */}
    <div className="modal fade" id="replytweetModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        {/* Modal content */}
    </div>

    {/* Replies */}
    {tweet?.replies?.map((item) => (
        <div key={item._id} >
            {/* Individual Reply */}
            <div className="border border-2 border-bottom-0 ps-3 pe-2 py-2 d-flex">
                {/* Profile Image */}
                <Profile source={item?.tweetedby?.profileImg} size="40px" alt="pic" />
                <div className='ps-2 w-100 '>
                    <div className='d-flex align-items-center w-100'>
                        <div className='ps-0'>
                            {/* User Info */}
                            <button className='border-0 btn btn-lignt btn-lg p-0 fs-6' onClick={() => viewprofile(item?.tweetedby?._id)} >
                                <span className='fw-bold '>{item?.tweetedby?.name} <i className="fas fa-check-circle fa-md text-primary"></i></span>
                                &nbsp; @{item?.tweetedby?.username}
                            </button>
                            {/* Reply Time */}
                            <span className="ps-2" style={{ fontSize: "12px" }}>
                                - {item?.createdAt}
                            </span>
                            {/* Replying To */}
                            {item?.replyingto === null ? (<p>replying to @{item?.replyingto}</p>) : ('')}
                        </div>
                        <div className="ms-auto fs-4 text-muted ">
                            {/* Reply Actions */}
                            {auth?.user?._id === item?.tweetedby?._id ?
                                (<button
                                    className="dropdown-item btn btn-light p-2 rounded-4"
                                    onClick={() => deletetweet(item?._id)}
                                >
                                    <i className="far fa-trash-alt fa-md"></i>
                                </button>)
                                :
                                (<>
                                    {auth?.user?.following?.some(i => i === item?.tweetedby?._id) ? (
                                        <button
                                            className="dropdown-item btn btn-light p-2 rounded-4"
                                            onClick={() => unfollowuser(item?.tweetedby?._id)}
                                        >
                                            <i className="fas fa-regular fa-user-minus fa-md"></i>
                                        </button>
                                    ) : (
                                        <button
                                            className="dropdown-item btn btn-light p-2 rounded-4"
                                            onClick={() => followuser(item?.tweetedby?._id)}
                                        >
                                            <i className="fas fa-regular fa-user-plus fa-md"></i>
                                        </button>
                                    )}
                                </>
                                )
                            }
                        </div>
                    </div>
                    <div className="card border-0 " onClick={() => viewtweet(item?._id)}>
                        {/* Reply Content */}
                        <p style={{ fontSize: "14px" }}>
                            {item?.content}
                        </p>
                        {/* Reply Picture */}
                        {item?.picture === '' ?
                            ('') :
                            (
                                <>
                                    <div className=''>
                                        <img src={item?.picture}
                                            className=" rounded-4 border border-2" alt="pic" style={{ maxHeight: 400, maxWidth: 450 }} />
                                    </div>
                                </>
                            )}
                    </div>
                    {/* Reply Actions */}
                    <div className="d-flex  px-3 pt-2">
                        <div className='pe-5'>
                            <>
                                {/* Like Button */}
                                {item?.likes?.some(i => i === auth?.user?._id) ? (
                                    <button
                                        className="btn btn-light text-danger px-2 py-1 rounded-circle "
                                        onClick={() => unlike(item?._id)}
                                    >
                                        <i className="fas fa-heart fa-md"></i>
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-light px-2 py-1 rounded-circle"
                                        onClick={() => like(item?._id)}
                                    >
                                        <i className="far fa-heart fa-md"></i>
                                    </button>
                                )}
                                {/* Like Count */}
                                {item?.likes?.length}
                            </>
                        </div>
                        <div className='text-primary pe-5'>
                            {/* Reply Button */}
                            <button
                                className="btn btn-light text-primary px-2 py-1 rounded-circle "
                                type="button" data-bs-toggle="modal"
                                info={JSON.stringify(item)}
                                data-bs-target="#replytweetModal"
                            >
                                <i className="far fa-comment fa-md"></i>
                            </button>
                            {/* Reply Count */}
                            {item?.replies?.length}
                        </div>
                        <div className='text-success pe-5'>
                            {/* Retweet Count */}
                            <i className="fas fa-retweet fa-md"></i> {item?.retweetedby?.length}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ))}
</div>

  )
}

export default TweetDetail