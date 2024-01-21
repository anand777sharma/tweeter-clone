import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const BackToLoginSpinner = () => {

    const [count, setCount] = useState(2);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue);
        }, 1000);
        count === 0 &&
            navigate("/login", {

            });

        return () => clearInterval(interval);
    }, [count, navigate]);
    return (
        <div>
            <div className="d-flex flex-column justify-content-center align-items-center"
                style={{ height: "90vh" }}>
                <div className="display-4 mb-5">
                    Go Login First....
                </div>

                <div className="spinner-border display-4 text-secondary" role="status" style={{ height: 100, width: 100 }}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    )
}

export default BackToLoginSpinner;