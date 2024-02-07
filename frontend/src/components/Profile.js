import React from 'react'

const Profile = (props) => {
  // this component is made to use it as templet for profile picture
  return (
    <div >
        <img className='rounded-circle' style={{height:props.size,width:props.size}} src={props.source} alt={props.alt} />
    </div>
  )
}

export default Profile;