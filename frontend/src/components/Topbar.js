import React from 'react'
import Profile from './Profile'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/auth"
const Topbar = () => {
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate();

    const viewProfile = (id) => {
        navigate('/myprofile/' + id);
    }
    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: ""
        });
        localStorage.removeItem("auth");
    }
    return (
        <div>
            <div className="container d-flex justify-content-between align-items-center px-1 bg-light py-2 d-lg-none ">
                <button className='border-0 btn btn-lignt ' onClick={() => viewProfile(auth.user?._id)}>
                    <li className="list-group-item border-0 fs-5 mt-1 d-flex p-0 justify-content-center">
                        <Profile size="45px" source={auth?.user?.profileImg} alt="profile" />

                    </li>
                </button>


                <Link className="text-decoration-none border-0 fs-5 mt-1 text-dark" to="/home">
                    <img style={{ height: "40px" }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png" alt="logo" />
                </Link>
                <a className="text-decoration-none border-0 fs-5 mt-1 text-dark">
                    <div className="ms-auto fs-3 text-muted ">
                        <Link className='text-decoration-none text-center text-secondary' onClick={handleLogout} to="/">
                            <i className="fas fa-sign-out-alt fa-lg pe-2"></i>
                        </Link>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default Topbar