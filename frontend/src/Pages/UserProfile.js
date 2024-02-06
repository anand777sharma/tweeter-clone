import React, { useRef } from 'react'
import "../allStyle/profilesection.css"
import SideBar from '../components/SideBar'
import Navbar from '../components/Navbar'
import Topbar from '../components/Topbar'
import CreateTweetModal from '../components/floatingModels/CreateTweetModal'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { toast } from 'react-toastify';
import EditProfileModal from "../components/floatingModels/EditProfileModal"
import Profile from '../components/Profile'
import TweetCard from '../components/TweetCard'


const UserProfile = () => {
  const [user, setUser] = useState({ profileImg: '' })
  const [auth, setAuth] = useAuth();
  const [profile, setProfile] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [retweets, setreTweets] = useState([]);
  const [profileimage, setProfileImage] = useState({ preview: '', data: '' })
  const { id } = useParams();

  let url = '';

  const profilepictureRef = useRef(null);

  const handleuploadprofile = () => {
    profilepictureRef.current.click();
  };
  const handleprofileSelect = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0]
    }
    setProfileImage(img);

  };
  const fetchData = async () => {
    try {
      const resp = await axios.get('http://localhost:5000/api/user/' + id);
      const Pdata = resp.data;
      setProfile(Pdata);

    } catch (error) {
      console.log(error);
    }
  }
  const handleImgUpload = async () => {
    let formData = new FormData();
    formData.append('file', profileimage.data);

    const response = await axios.post(`http://localhost:5000/api/file/uploadFile`, formData)
    return response;
  }
  const submitprofile = async (e) => {
    // setLoading(true);
    e.preventDefault();
    try {
      if (profileimage.data !== '') {
        const imgRes = await handleImgUpload();
        url = "http://localhost:5000/api/file/files/" + imgRes.data.fileName
        //"http://localhost:5000/api/file/files/file-1705648616517-0.8677161598305487.png"

      }

      const pic = { profileImg: url }
      // console.log(data);
      const {data} = await axios.post('http://localhost:5000/api/user/' + auth?.user?._id + "/uploadprofilepic",
      pic,
        {
          headers: { Authorization: `Bearer ${auth?.token}` }
        });
 
        // console.log(data);
        if (data?.error) {
          toast.error(data?.error)
        }
        else {
          setAuth({ ...auth, user: data?.updateduser })
          let storage = localStorage.getItem("auth");
          storage = JSON.parse(storage);
          storage.user = data.updateduser;
          localStorage.setItem("auth", JSON.stringify(storage));
          toast.success("user updated Succesfully")
          fetchTweet();
          fetchreTweet();
        }
      } catch (error) {
        console.log(error);
        toast.error("something went wrong");
  
      }
  }
  const fetchTweet = async () => {
    try {
      const resp = await axios.get(`http://localhost:5000/api/user/${id}/tweets`);
      setTweets(resp.data);
    } catch (error) {
      console.log(error);
    }
  }
  const fetchreTweet = async () => {
    try {
      const resp = await axios.get(`http://localhost:5000/api/user/${id}/retweets`);
      setreTweets(resp.data);
    } catch (error) {
      console.log(error);
    }
  }
  

  useEffect(() => {
    setUser({ profileImg:auth?.user?.profileImg })
    fetchData();
    fetchTweet();
    fetchreTweet();
  }, [auth?.user])
  console.log(retweets);
  return (
    <div className="container ">

      {/* edit profile picture model */}
      <div className="modal fade" id="editprofilepicture" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered rounded-4">
          <div className="modal-content rounded-4">
            <div className="modal-header border-0"  >
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={submitprofile}>
              <div className='d-flex justify-content-center align-items-center border border-2 rounded-4'
                onClick={handleuploadprofile}
                style={{ minHeight: 450, margin: "0 30px" }}>


                <div className='text-center mt-3'>
                  {profileimage.preview === '' ?
                    (<>
                      <p className='display-1 ms-5'><i className="fas fa-camera fa-lg">
                      </i><sup><i className="fas fa-plus fa-sm position-relative"
                        style={{ bottom: 25, right: 10 }}></i></sup>
                      </p>
                      <p className='fs-5'> press any where to <br />Upload Profile  Picture</p>
                    </>)
                    :
                    (<img src={profileimage.preview} className="card-img-top" alt={profileimage.data} style={{ maxHeight: 400 }} />
                    )}


                </div>

              </div>

              <input
                type="file"
                ref={profilepictureRef}
                accept=".jpg,.png,.gif"
                style={{ display: 'none' }}
                onChange={handleprofileSelect}
              />

              <div className="modal-footer d-block h-25 border-0" >

                <div className='d-flex justify-content-center'>

                  <button type="submit" className="btn btn-primary shadow rounded-5 py-2 px-4 my-3" data-bs-dismiss="modal" >Upload Profile Picture</button>

                </div>
              </div>
            </form>

          </div>
        </div>



      </div>
      {/* edit profile picture model */}


      <Topbar />
      <div className="row">
        <div className="col-lg-3 d-none d-lg-block">
          <SideBar />
        </div>
        <div className="col-lg-6 overflow-auto " style={{ height: "100vh" }}>
          <div>
            <EditProfileModal />
            <div className="container-fluid d-flex align-items-center bg-white border border-2 border-bottom-0 py-1">
              <Link className="btn btn-light rounded-5" to="/home">
                <i className=" fas fa-solid fa-arrow-left"></i>
              </Link>
              &nbsp;
              &nbsp;
              &nbsp;
              <div className="fs-5 mt-1 ">
                <span className="fw-bold">
                  {profile?.name}
                </span>

                <div className="post-count">
                  3 posts
                </div>
              </div>

            </div>
            <div className="card rounded-0" >
              <div className="card-header border-0 shadow-none rounded-0">
                <div className="profilePicture d-flex justify-content-center align-items-center">
                  <Profile size="140px" source={profile?.profileImg} alt="profile" />
                </div>
              </div>
              <div className="ms-auto">
                <button className="btn btn-outline-secondary rounded-5 my-3 fw-bold" type="button" data-bs-toggle="modal" data-bs-target="#editprofilepicture">Edit Profile Photo</button>
                <button className="btn btn-outline-secondary rounded-5 m-3 fw-bold" type="button" data-bs-toggle="modal" data-bs-target="#editProfileModal">Edit Profile</button>
              </div>
              <div className='card-body'>
                <p className='ps-4 text-secondary'>
                  <span className="fs-5 fw-bold text-dark">
                    {profile?.name}
                  </span> <br />
                  <span className='username text-secondary '>
                    @{profile?.username}
                  </span>
                </p>
                <p className='ps-4 text-secondary'>
                  <p className='mb-2'>
                    <i class="far fa-calendar-alt fa-lg mb-2"></i>
                    &nbsp;
                    joined {profile?.createdAt}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {profile?.location ? (<><i className="fas fa-map-marker-alt fa-lg"></i> {profile?.location}</>) : ('')}
                    <br />

                    {profile?.dateofbirth ? (<><i className="fas fa-map-marker-alt fa-lg mt-2"></i> {profile?.dateofbirth}</>) : ('')}

                  </p>

                  <span><span className="fw-bold"> {profile?.following.length} </span>Following  </span>
                  &nbsp;
                  &nbsp;
                  <span><span className="fw-bold">{profile?.followers.length}</span> Followers  </span>
                </p>
              </div>
              <div className="card-footer text-center fw-bold fs-6">
                Tweet and Replies
              </div>
            </div>
            {
              tweets.map((item) => (
                <>
                  <TweetCard item={item} />
                </>

              ))
            }

          </div>

          <CreateTweetModal />
        </div>
        <div className="col-lg-3 d-none d-lg-block ps-3">
          {/* <RightBar /> */}
        </div>
      </div>
      <Navbar />
    </div>
  )
}

export default UserProfile;