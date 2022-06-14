import React from 'react'
import './provideService.scss';
import VideoPlay from '../../../assets/icons/video-play.svg';
export default function ProvideService() {
  return (
    <div>
        <div className='provide-section-alignment'>
            <div className='container'>
                <div className='box'>
                    <div className='box-title'>
                        <div>
                            <h3>Fix The Photo</h3>    
                            <p>
                                I give a professional portrait photo retouching service for cellulite removal, skin smoothing, breast enlargement, and more. We guarantee natural 
                                results and perfect looks on photos, fast and at an affordable price.
                            </p>
                        </div>
                    </div>
                    <div className='design-type'>
                        <div>
                            <h5>Graphics & Design:</h5>
                            <ul>
                                <li>Photo Editing</li>
                                <li>Logo Design</li>
                                <li>Website design</li>
                                <li>App Design</li>
                                <li>Poster design</li>
                                <li>UX Elements</li>
                            </ul>
                        </div>
                    </div>
                    <div className='image-grid'>
                        {
                            [0,1,2,3,4,5].map(()=> {
                                return(
                                    <div className='image-grid-items'>
                                        <div className='card-image'>
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoUqd_gz00Cl4ah-YlIcmMiThwLF0pzI97N0NNbZ4DBuOihK4Fqo6ZM81tRXW3gOkcre0&usqp=CAU"/>
                                        </div>
                                        <div className='card-details'>
                                            <img src={VideoPlay} alt="VideoPlay"/>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='design-type-one'>
                        <div>
                            <h5>File format</h5>
                            <ul>
                                <li>Photo Editing</li>
                                <li>Logo Design</li>
                                <li>Website design</li>
                                <li>App Design</li>
                                <li>Poster design</li>
                                <li>UX Elements</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
