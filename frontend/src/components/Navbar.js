import React from 'react'

const Navbar = () => {
    return (
        <div>
            <div className="container d-flex justify-content-between px-3 bg-light fixed-bottom py-2 d-lg-none">
                <a className="text-decoration-none border-0 fs-5 mt-1 text-dark"><i className="fas fa-home fa-lg pe-2"></i></a>
                <a className="text-decoration-none border-0 fs-5 mt-1 text-dark"><i className="fas fa-search fa-lg pe-2"></i></a>
                <a className="text-decoration-none border-0 fs-5 mt-1 text-dark"><i className="fas fa-bell fa-lg pe-2"></i></a>
                <a className="text-decoration-none border-0 fs-5 mt-1 text-dark"><i className="fas fa-user fa-lg pe-2"></i></a>

            </div>
        </div>
    )
}

export default Navbar