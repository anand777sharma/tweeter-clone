import React from 'react'
import "../allStyle/profilesection.css"
import { Link } from "react-router-dom";
import Profile from './Profile';
import TweetCard from './TweetCard';
import EditProfileModal from './EditProfileModal';
const ProfileSection = () => {
    return (
        <div>
            <EditProfileModal/>
            <div className="container-fluid d-flex align-items-center bg-white border border-2 border-bottom-0 py-1">
                <Link className="btn btn-light rounded-5" to="/home">
                    <i className=" fas fa-solid fa-arrow-left"></i>
                </Link>
                &nbsp;
                &nbsp;
                &nbsp;
                <div className="fs-5 mt-1 ">
                    <span className="fw-bold">
                        Anand Sharma
                    </span>

                    <div className="post-count">
                        3 posts
                    </div>
                </div>

            </div>
            <div className="card rounded-0" >
                <div className="card-header border-0 shadow-none rounded-0">
                    <div className="profilePicture d-flex justify-content-center align-items-center">
                        <Profile size="140px" source="https://images.pexels.com/photos/1081685/pexels-photo-1081685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="profile" />
                    </div>
                </div>
                <div className="ms-auto">
                    <button className="btn btn-outline-secondary rounded-5 m-3 fw-bold" type="button" data-bs-toggle="modal" data-bs-target="#editProfileModal">Edit Profile</button>
                </div>
                <div className='card-body'>
                    <p className='ps-4 text-secondary'>
                        <span className="fs-5 fw-bold text-dark">
                            Anand Sharma
                        </span> <br />
                        <span className='username text-secondary '>
                            @Anand777Sharma
                        </span>
                    </p>
                    <p className='ps-4 text-secondary'>
                        <p className='mb-2'>
                            <i class="far fa-calendar-alt fa-lg"></i>
                            &nbsp;
                            &nbsp; joined December 2023
                        </p>

                        <span><span className="fw-bold"> 46 </span>Following  </span>
                        &nbsp;
                        &nbsp;
                        <span><span className="fw-bold">1652</span> Followers  </span>
                    </p>
                </div>
                <div className="card-footer text-center fw-bold fs-6">
                    Tweet and Replies
                </div>
            </div>
            <TweetCard />
            <TweetCard />
            <TweetCard />
            <TweetCard />
            <TweetCard />
            <TweetCard />
            <TweetCard />
            <TweetCard />
        </div>

    )
}

export default ProfileSection