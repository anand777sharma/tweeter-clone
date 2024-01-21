import React from 'react'

const Profile = (props) => {
  return (
    <div >
        <img className='rounded-circle' style={{height:props.size,width:props.size}} src={props.source} alt={props.alt} />
    </div>
  )
}

export default Profile;