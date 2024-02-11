import React from 'react'
import "../allStyle/profilesection.css"
import SideBar from '../components/SideBar'
import Topbar from '../components/Topbar'
import CreateTweetModal from '../components/floatingModels/CreateTweetModal'
import axios from 'axios';
import { useEffect, useCallback, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { toast } from 'react-toastify';
import Profile from '../components/Profile'
import TweetCard from '../components/TweetCard'


const OtherProfile = () => {

  const [auth, setAuth] = useAuth();
  const [profile, setProfile] = useState(null);
  const [tweets, setTweets] = useState([]);
  const { id } = useParams();

  const navigate = useNavigate();

  const viewProfile = (id) => {
    navigate('/myprofile/' + id);
  }
  const fetchData = useCallback(async () => {
    try {
      const resp = await axios.get('http://localhost:5000/api/user/' + id);
      const Pdata = resp.data;
      setProfile(Pdata);

    } catch (error) {
      console.log(error);
    }
  },[id])
  const fetchTweet = useCallback(async () => {
    try {
      const resp = await axios.get(`http://localhost:5000/api/user/${id}/tweets`);
      setTweets(resp.data);
    } catch (error) {
      console.log(error);
    }
  },[id])

  useEffect(() => {
    fetchData();
    fetchTweet();
  }, [fetchData,fetchTweet])
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
        fetchTweet();
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
        fetchData();
        fetchTweet();
      }
      else {
        setAuth({ ...auth, user: data?.updateduser })
        let storage = localStorage.getItem("auth");
        storage = JSON.parse(storage);
        storage.user = data.updateduser;
        localStorage.setItem("auth", JSON.stringify(storage));
        toast.success(data.message)
        fetchData();
        fetchTweet();
      }
    } catch (error) {

      toast.error(error)
    }

  }
  console.log(profile);
  return (
    <div className="container">
      {/* Topbar component */}
      <Topbar />
      <div className="row">
        {/* Sidebar component */}
        <div className="col-lg-3 d-none d-lg-block">
          <SideBar />
        </div>
        <div className="col-lg-6 overflow-auto" style={{ height: "100vh" }}>
          <div>
            {/* Profile header */}
            <div className="container-fluid d-flex align-items-center bg-white border border-2 border-bottom-0 py-1">
              {/* Back button */}
              <Link className="btn btn-light rounded-5" to="/home">
                <i className="fas fa-arrow-left"></i>
              </Link>
              {/* Profile name and post count */}
              &nbsp;&nbsp;&nbsp;
              <div className="fs-5 mt-1">
                <span className="fw-bold">
                  {profile?.name}
                </span>
                <div className="post-count">
                  3 posts
                </div>
              </div>
            </div>
            {/* Profile details */}
            <div className="card rounded-0">
              <div className="card-header border-0 shadow-none rounded-0">
                {/* Profile picture */}
                <div className="profilePicture d-flex justify-content-center align-items-center">
                  <Profile size="140px" source={profile?.profileImg} alt="profile" />
                </div>
              </div>
              <div className="ms-auto">
                {/* Follow/Unfollow button */}
                {auth?.user?._id === profile?._id ?
                  (
                    <button className="btn btn-outline-secondary rounded-5 m-3 fw-bold" type="button" onClick={() => viewProfile(auth.user?._id)}>go to Profile</button>
                  ) : (
                    <>
                      {auth?.user?.following?.some(i => i === profile?._id) ? (
                        <button className="btn btn-outline-secondary rounded-5 m-3 fw-bold" onClick={() => unfollowuser(profile?._id)}>
                          <i className="fas fa-user-minus fa-md"></i> unfollow
                        </button>
                      ) : (
                        <button className="btn btn-outline-secondary rounded-5 m-3 px-4 fw-bold" onClick={() => followuser(profile?._id)}>
                          <i className="fas fa-user-plus fa-md"></i> follow
                        </button>
                      )}
                    </>
                  )
                }
              </div>
              {/* Profile information */}
              <div className='card-body'>
                <p className='ps-4 text-secondary'>
                  <span className="fs-5 fw-bold text-dark">
                    {profile?.name}
                  </span>
                  <br />
                  <span className='username text-secondary'>
                    @{profile?.username}
                  </span>
                </p>
                <p className='ps-4 text-secondary'>
                  <p className='mb-2'>
                    <i className="far fa-calendar-alt fa-lg"></i>
                    &nbsp;&nbsp;joined {profile?.createdAt}
                  </p>
                  {/* Following and Followers count */}
                  <span>
                    <span className="fw-bold">{profile?.following.length}</span> Following
                  </span>
                  &nbsp;&nbsp;
                  <span>
                    <span className="fw-bold">{profile?.followers.length}</span> Followers
                  </span>
                </p>
              </div>
              {/* Footer */}
              <div className="card-footer text-center fw-bold fs-6">
                Tweet and Replies
              </div>
            </div>
            {/* Displaying tweets */}
            {tweets.map((item) => (
              <TweetCard item={item} />
            ))}
          </div>
          {/* Create Tweet Modal component */}
          <CreateTweetModal />
        </div>
        <div className="col-lg-3 d-none d-lg-block ps-3"></div>
      </div>
    </div>

  )
}

export default OtherProfile