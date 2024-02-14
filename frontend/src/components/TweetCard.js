import React from 'react'
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { toast } from "react-toastify"
import axios from 'axios';

const TweetCard = (props) => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate()

  const viewprofile = () => {
    navigate('/profile/' + props?.item?.tweetedby?._id);
  }
  const followuser = async (id) => {
    try {
      const { data } = await axios.put(
        `https://twitter-clone-h3u6.onrender.com/api/user/${id}/follow`,
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
        window.location.reload()
      }
    } catch (error) {

      toast.error(error)
    }

  }
  const unfollowuser = async (id) => {
    try {
      const { data } = await axios.put(
        `https://twitter-clone-h3u6.onrender.com/api/user/${id}/unfollow`,
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
        window.location.reload()
      }
    } catch (error) {

      toast.error(error)
    }

  }
  const deletetweet = async (id) => {
    try {
      const { data } = await axios.delete(
        'https://twitter-clone-h3u6.onrender.com/api/tweet/' + id,
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
       window.location.reload()
      }
    } catch (error) {

      toast.error(error)
    }
  }
  const like = async (id) => {
    try {
      const { data } = await axios.put(
        `https://twitter-clone-h3u6.onrender.com/api/tweet/${id}/like`,
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
        console.log('Calling updatereload from like function');
        

        window.location.reload();
      }
    } catch (error) {
      toast.error(error)
    }

  }
  const unlike = async (id) => {
    try {
      const { data } = await axios.put(
        `https://twitter-clone-h3u6.onrender.com/api/tweet/${id}/dislike`,
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
      
        window.location.reload()

      }
    } catch (error) {
      toast.error(error)
    }

  }

  return (
    <div>
    {/* Individual Tweet Container */}
    <div className="border border-2 border-bottom-1 ps-3 pe-2 py-2 d-flex">
        {/* Profile Image */}
        <Profile source={props?.item?.tweetedby?.profileImg} size="40px" alt="pic" />
        <div className='ps-2 w-100 '>
            <div className='d-flex align-items-center w-100'>
                <div className='ps-0'>
                    {/* User Info */}
                    <button className='border-0 btn btn-lignt btn-lg p-0 fs-6' onClick={() => viewprofile()} >
                        <span className='fw-bold '>{props?.item?.tweetedby?.name} <i className="fas fa-check-circle fa-md text-primary"></i></span>
                        &nbsp; @{props?.item?.tweetedby?.username}</button>
                    {/* Tweet Time */}
                    <span className="ps-2" style={{ fontSize: "12px" }}>
                        - {props?.item?.createdAt}
                    </span>
                </div>
                {/* Tweet Actions */}
                <div className="ms-auto fs-4 text-muted ">
                    {auth?.user?._id === props?.item?.tweetedby?._id ?
                        (<button
                            className="dropdown-item btn btn-light p-2 rounded-4"
                            onClick={() => deletetweet(props?.item?._id)}
                        >
                            <i className="far fa-trash-alt fa-md"></i>
                        </button>)
                        :
                        (<>
                            {
                                auth?.user?.following?.some(i => i === props?.item?.tweetedby?._id) ? (
                                    <button
                                        className="dropdown-item btn btn-light p-2 rounded-4"
                                        onClick={() => unfollowuser(props?.item?.tweetedby?._id)}
                                    >
                                        <i className="fas fa-regular fa-user-minus fa-md"></i>
                                    </button>
                                ) : (
                                    <button
                                        className="dropdown-item btn btn-light p-2 rounded-4"
                                        onClick={() => followuser(props?.item?.tweetedby?._id)}
                                    >
                                        <i className="fas fa-regular fa-user-plus fa-md"></i>
                                    </button>
                                )
                            }
                        </>
                        )
                    }
                </div>
            </div>

            <div className="card border-0 " >
                {/* Tweet Content */}
                <p style={{ fontSize: "14px" }}>
                    {props.item?.content}
                </p>
                {/* Tweet Picture */}
                {props?.item?.picture === '' ?
                    ('') :
                    (
                        <>
                            <div className=''>
                                <img src={props?.item?.picture}
                                    className=" rounded-4 border border-2" alt="pic" style={{ maxHeight: 400, maxWidth: 450 }} />
                            </div>
                        </>
                    )}

                <div className="d-flex  px-3 pt-2">
                    <div className='pe-5'>
                        {/* Like Button */}
                        <>
                            {props?.item?.likes?.some(i => i === auth?.user?._id) ? (
                                <button
                                    className="btn btn-light text-danger px-2 py-1 rounded-circle "
                                    onClick={() => unlike(props?.item?._id)}
                                >
                                    <i className="fas fa-heart fa-md"></i>
                                </button>
                            ) : (
                                <button
                                    className="btn btn-light px-2 py-1 rounded-circle"
                                    onClick={() => like(props?.item?._id)}
                                >
                                    <i className="far fa-heart fa-md"></i>
                                </button>
                            )}
                            {/* Like Count */}
                            {props.item?.likes?.length}
                        </>
                    </div>
                    <div className='text-primary pe-5'>
                        {/* Reply Count */}
                        <i className="far fa-comment fa-md"></i> {props.item?.replies?.length}
                    </div>
                    <div className='text-success pe-5'>
                        {/* Retweet Count */}
                        <i className="fas fa-retweet fa-md"></i> {props.item?.retweetedby?.length}
                    </div>
                </div>
            </div>

        </div>

    </div>
</div>

  )
}

export default TweetCard;