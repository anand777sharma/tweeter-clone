// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Tweet from './Pages/Tweet';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import UserProfile from './Pages/UserProfile';
import { ToastContainer } from 'react-toastify';
import OtherProfile from './Pages/OtherProfile';
import TweetDetail from './components/TweetDetail';


function App() {
  return (
    <Router>
      <div className="container-fluid">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/home' element={<Home />} />
          <Route path='/myprofile/:id' element={<UserProfile />} />
          <Route path='/profile/:id' element={<OtherProfile />} />
          <Route path='/detail/:id' element={<Tweet />} />
        </Routes>

      </div>

    </Router>
  );
}

export default App;
