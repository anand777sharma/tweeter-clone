import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import axios from 'axios';
import { toast } from 'react-toastify';



const Login = () => {

    const [user, setUser] = useState({ email: '', password: '' });
    const [auth, setAuth] = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
   
    const submitHandler = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const resp = await axios.post('https://twitter-clone-h3u6.onrender.com/api/auth/login', user);
            if (resp.status === 200) {

                setAuth({
                    ...auth,
                    user: resp.data.user,
                    token: resp.data.token
                })
                setLoading(false);
                toast.success(resp.data.message);
                localStorage.setItem('auth', JSON.stringify(resp.data));
                navigate('/home');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div>
        {/* Container to center the content vertically and horizontally */}
        <Container className='vh-100 d-flex align-items-center justify-content-center'>
    
            {/* Row to contain the login form and image */}
            <Row>
                {/* Column for the image */}
                <Col lg={6}>
                    <Card >
                        {/* Image for visual representation */}
                        <Card.Img className='shadow-lg' variant="top" src="https://m.economictimes.com/thumb/msid-94635807,width-1200,height-900,resizemode-4,imgsize-4700/twitter-blue-subscribers-getting-edit-feature.jpg" />
                    </Card>
                </Col>
                {/* Column for the login form */}
                <Col lg={6} className='my-auto'>
                    <>
                        {/* Login form */}
                        <h2 className='text-center mb-3 '>
                            Login
                        </h2>
                        {/* Form for user input */}
                        <Form onSubmit={submitHandler}>
                            {/* Email input field */}
                            <Form.Group className="mb-3 shadow-sm">
                                <Form.Control type='email'
                                    placeholder='john.doe@gmail.com'
                                    value={user.email}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })} />
                            </Form.Group>
                            {/* Password input field */}
                            <Form.Group className="mb-4 shadow-sm">
                                <Form.Control type='password'
                                    placeholder='secret'
                                    value={user.password}
                                    onChange={(e) => setUser({ ...user, password: e.target.value })} />
                            </Form.Group>
    
                            {/* Button to submit the login form */}
                            <div className="d-grid gap-2 shadow">
                                <Button className='btn btn-lg btn-secondary shadow' type='submit'>
                                {loading ? (<div class="spinner-border" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>) : ('Login')}
                                </Button>
                            </div>
                        </Form>
    
                        {/* Or divider */}
                        <br />
                        <div className="row d-flex justify-content-center align-items-center">
                            <div className="col-lg-5"><hr className="my-4" /></div>
                            <div className="col-lg-1"><h4>or</h4></div>
                            <div className="col-lg-5"><hr className="my-4" /></div>
                        </div>
    
                        {/* Sign up option */}
                        <p className='text-center'>
                            don't have Account?
                        </p>
                        {/* Button to navigate to the signup page */}
                        <div className="d-grid gap-2 shadow">
                            <Link className='btn btn-lg btn-secondary shadow' to="/signup">
                                SignUp
                            </Link>
                        </div>
                    </>
                </Col>
            </Row>
        </Container>
    </div>
    
    )
}

export default Login;