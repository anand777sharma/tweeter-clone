import React from 'react'
import SideBar from '../components/SideBar'
import TweetList from '../components/TweetList'
import Topbar from '../components/Topbar'
import CreateTweetModal from '../components/floatingModels/CreateTweetModal'
const Home = () => {
    return (
        <div>
        {/* Main container */}
        <div className="container">
            {/* Topbar component */}
            <Topbar />
            {/* Row for layout */}
            <div className="row">
                {/* Sidebar column for large screens */}
                <div className="col-lg-3 d-none d-lg-block">
                    {/* Sidebar component */}
                    <SideBar />
                </div>
                {/* Main content column */}
                <div className="col-lg-6 overflow-auto" style={{ height: "100vh" }}>
                    {/* TweetList component */}
                    <TweetList />
                    {/* CreateTweetModal component */}
                    <CreateTweetModal/>
                </div>
                {/* Additional column for large screens */}
                <div className="col-lg-3 d-none d-lg-block ps-3">
                    {/* This column is currently empty */}
                </div>
            </div>
        </div>
    </div>
    
    )
}

export default Home