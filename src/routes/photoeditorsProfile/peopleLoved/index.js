import React from 'react'
import './peopleLoved.scss';
import ProfileImage from '../../../assets/images/profile-editor-banner.png';
import StarImage from '../../../assets/icons/fill-star.svg';
export default function PeopleLoved() {
  return (
    <div>
        <div className='people-loved-section-alignment'>
            <div className='container'>
                <div className='page-title'>
                    <div>
                        <h1>What people loved about this Photo Editor</h1>
                    </div>
                </div>
                <div className='grid'>
                    {
                        [0,1,2,3].map(()=> {
                            return(
                                <div className='grid-items'>
                                <div className='profile-grid'>
                                    <div className='profile-grid-items'>
                                        <img src={ProfileImage} alt="ProfileImage"/>
                                    </div>
                                    <div className='profile-grid-items'>
                                        <span>Foreverjen</span>
                                        <div className='rating-alignment'>
                                            <img src={StarImage} alt="StarImage"/>
                                            <img src={StarImage} alt="StarImage"/>
                                            <img src={StarImage} alt="StarImage"/>
                                            <img src={StarImage} alt="StarImage"/>
                                            <img src={StarImage} alt="StarImage"/>
                                        </div>
                                    </div>
                                </div>
                                <p>
                                    Really easy to work with and professional. Made extra changes 
                                    becauseI changed my mind so very service minded also. Will defiantly hire again.
                                </p>
                            </div>
                            )
                        })
                    }
                   
                </div>
            </div>
        </div>
    </div>
  )
}
