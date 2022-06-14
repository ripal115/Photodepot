import React from 'react'
import './editProfile.scss';
import ProfileBanner from '../../../assets/images/profile-banner.png';
export default function EditProfile() {
  return (
    <div>
        <div className='edit-profile-banner-alignment'>
            <img src={ProfileBanner} alt="ProfileBanner"/>
        </div>
    </div>
  )
}
