import React from 'react'
import Profile from './Profile'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/auth"

const SideBar = () => {
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate();

  const viewProfile = (id) => {
    navigate('/myprofile/' + id);
  }
  const handleLogout=()=> {
    setAuth({
        ...auth,
        user: null,
        token: ""
    });
    localStorage.removeItem("auth");
}

  return (
    <div>
    {/* Sidebar */}
    <div className="card border-0 " >
        {/* Twitter Logo */}
        <div className="px-3 py-4 border-0">
            <img style={{ height: "40px" }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png" alt="logo" />
        </div>
        {/* Sidebar Menu */}
        <ul className="list-group overflow-auto border-0" style={{ height: "67vh" }}>
            {/* Home Link */}
            <Link className='text-decoration-none text-center' to="/home" >
                <li className="list-group-item border-0 fs-5 mt-1"><i className="fas fa-home fa-lg pe-2"></i>Home</li>
            </Link>
            {/* Profile Link */}
            <button className='border-0 btn btn-lignt btn-lg text-left' onClick={() => viewProfile(auth.user?._id)}>
                <li className="list-group-item border-0 fs-5 mt-1"><i className="fas fa-user fa-lg pe-2"></i>Profile</li>
            </button>
            {/* Tweet Button */}
            <li className="list-group-item border-0 fs-5 mt-1">
                <div className="d-grid gap-2 px-3">
                    <button className="btn btn-primary shadow btn-lg" type="button" data-bs-toggle="modal" data-bs-target="#createtweetModal">Tweet</button>
                </div>
            </li>
        </ul>
        {/* Logout and Profile Info */}
        <div className="">
            <ul className="list-group">
                {/* Logout Link */}
                <Link className='text-decoration-none text-center' onClick={handleLogout} to="/">
                    <li className="list-group-item border-0 fs-5 mt-1"><i className="fas fa-sign-out-alt fa-lg pe-2"></i>Logout</li>
                </Link>
                {/* Profile Info */}
                <button className='border-0 btn btn-lignt ' onClick={() => viewProfile(auth.user?._id)}>
                    <li className="list-group-item border-0 fs-5 mt-1 d-flex p-0 justify-content-center">
                        <Profile size="40px" source={auth?.user?.profileImg} alt="profile" />
                        <div>
                            <p className="ps-2 fs-6">{auth?.user?.name} <br /><span className='fs-6'>@{auth?.user?.username}</span></p>
                        </div>
                    </li>
                </button>
            </ul>
        </div>
    </div>
</div>

  )
}

export default SideBar




