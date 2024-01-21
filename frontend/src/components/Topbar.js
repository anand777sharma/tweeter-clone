import React from 'react'
import Profile from './Profile'

const Topbar = () => {
    return (
        <div>
            <div className="container d-flex justify-content-between align-items-center px-1 bg-light py-2 d-lg-none ">
                <a className="text-decoration-none border-0 fs-5 mt-1 text-dark">
                    <Profile size="40px" source="https://images.pexels.com/photos/1081685/pexels-photo-1081685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="profile" /> </a>
                <a className="text-decoration-none border-0 fs-5 mt-1 text-dark">
                    <img style={{ height: "40px" }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png" alt="logo" />
                </a>
                <a className="text-decoration-none border-0 fs-5 mt-1 text-dark"> 
                <div className="ms-auto fs-3 text-muted ">
                <i className="fas fa-sign-out-alt fa-lg pe-2"></i>
                </div>
                </a>
            </div>
        </div>
    )
}

export default Topbar