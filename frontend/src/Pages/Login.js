import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import axios from 'axios';
import { toast } from 'react-toastify';



const Login = () => {

    const [user, setUser] = useState({ email: '', password: '' });
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
   
    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const resp = await axios.post('http://localhost:5000/api/auth/login', user);
            if (resp.status === 200) {

                setAuth({
                    ...auth,
                    user: resp.data.user,
                    token: resp.data.token
                })
                console.log(resp.data);
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
        <div >
            <Container className='vh-100 d-flex align-items-center justify-content-center '>

                <Row>
                    <Col lg={6}>
                        <Card >
                            <Card.Img className='shadow-lg' variant="top" src="https://m.economictimes.com/thumb/msid-94635807,width-1200,height-900,resizemode-4,imgsize-4700/twitter-blue-subscribers-getting-edit-feature.jpg" />

                        </Card>
                    </Col>
                    <Col lg={6} className='my-auto'>
                        <>
                            <h2 className='text-center mb-3 '>
                                Login
                            </h2>

                            <Form onSubmit={submitHandler}>
                             
                               
                                <Form.Group className="mb-3 shadow-sm">
                                    <Form.Control type='email'
                                        placeholder='john.doe@gmail.com'
                                        value={user.email}
                                        onChange={(e) => setUser({ ...user, email: e.target.value })} />

                                </Form.Group>
                                <Form.Group className="mb-4 shadow-sm">
                                    <Form.Control type='password'
                                        placeholder='secret'
                                        value={user.password}
                                        onChange={(e) => setUser({ ...user, password: e.target.value })} />

                                </Form.Group>

                                <div className="d-grid gap-2 shadow">

                                    <Button className='btn btn-lg btn-secondary shadow' type='submit'>
                                        Login
                                    </Button>
                                </div>
                            </Form>
                            <br />
                            <div className="row d-flex justify-content-center align-items-center">
                                <div className="col-lg-5"><hr className="my-4" /></div>
                                <div className="col-lg-1"><h4>
                                    or</h4></div>
                                <div className="col-lg-5"><hr className="my-4" /></div>
                            </div>

                            <p className='text-center'>
                                don't have Account?
                            </p>

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