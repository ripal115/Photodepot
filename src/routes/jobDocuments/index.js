import React from 'react'
import './jobDocuments.scss';
import DownArrow from '../../assets/icons/select-down.svg';
import ProfileImage from '../../assets/images/profile.png';
import DragAndDrop from '../../assets/images/darg-and-drop.png';

export default function JobDocuments() {
  return (
    <div>
         <div className='hire-me-section-alignment'>
            <div className='container'>
                <div className='hire-me-box-design'>
                    <div className='first-box-content-alignment'>
                        <div className='service-select'>
                            <div className='form-control'>
                                <label>Service</label>
                                <div className='select-relative'>
                                    <select id="Service">
                                        <option value="Please Select" selected>Please Select</option>
                                        <option value="Service">Service</option>
                                        <option value="Service">Service</option>
                                        <option value="Service">Service</option>
                                    </select>
                                    <div className='select-icon-alignment'>
                                        <img src={DownArrow} alt="DownArrow"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='add-more-service-align'>
                            <div className='fill-button'>
                                <button>Add more Service</button>
                            </div>
                        </div>
                    </div>
                    <div className='hire-now-profile-alignment'>
                        <div className='profile-upload-section-alignment'>
                            <div className='form-control'>
                                <label>Test Image</label>
                            </div>
                            <div className='image-grid'>
                                <div className='image-grid-items'>
                                    <div>
                                        <div className='image-center-alignment'>
                                            <img src={DragAndDrop} alt="DragAndDrop"/>
                                        </div>
                                        <div className='button-relative'>
                                            <button>
                                                <span>Browse</span>
                                                <input type="file" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className='image-grid-items'>
                                    <div className='upload-image-style'>
                                        <img src={ProfileImage} alt="ProfileImage"/>
                                    </div>
                                </div>
                                <div className='image-grid-items'>
                                    <div className='upload-image-style'>
                                        <img src={ProfileImage} alt="ProfileImage"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='first-box-content-alignment sec-service-alignment'>
                        <div className='service-select'>
                            <div className='form-control'>
                                <label>Service</label>
                                <div className='select-relative'>
                                    <select id="Service">
                                        <option value="Please Select" selected>Please Select</option>
                                        <option value="Service">Service</option>
                                        <option value="Service">Service</option>
                                        <option value="Service">Service</option>
                                    </select>
                                    <div className='select-icon-alignment'>
                                        <img src={DownArrow} alt="DownArrow"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='profile-upload-section-alignment'>
                            <div className='form-control'>
                                <label>Test Image</label>
                            </div>
                            <div className='image-grid'>
                                <div className='image-grid-items'>
                                    <div>
                                        <div className='image-center-alignment'>
                                            <img src={DragAndDrop} alt="DragAndDrop"/>
                                        </div>
                                        <div className='button-relative'>
                                            <button>
                                                <span>Browse</span>
                                                <input type="file" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className='image-grid-items'>
                                    <div className='upload-image-style'>
                                        <img src={ProfileImage} alt="ProfileImage"/>
                                    </div>
                                </div>
                                <div className='image-grid-items'>
                                    <div className='upload-image-style'>
                                        <img src={ProfileImage} alt="ProfileImage"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <div className='description-section-alignment'>
                        <div className='form-control'>
                            <label>Description</label>
                            <textarea placeholder='Add description about your test job'></textarea>
                        </div>
                    </div>
                    <div className='medium-button'>
                        <button>Pay now</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
