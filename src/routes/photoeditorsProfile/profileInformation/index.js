import React, {useState,useEffect} from 'react'
import './profileInformation.scss';
import Slider from "react-slick";
import PhotoShowImage from '../../../assets/images/photo-show.png';
import LeftArrow from '../../../assets/icons/left-arrow.svg';
import RightArrow from '../../../assets/icons/right-arrow.svg';
import ChildImage from '../childImage';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from "moment"; 
import { useHistory } from 'react-router-dom';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
      className='custom-arrow-design right-arrow-alignment'
        onClick={onClick}
      >
    <img src={RightArrow} alt="RightArrow"/>
    </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className='custom-arrow-design left-arrow-alignment'
        onClick={onClick}
      >
        <img src={LeftArrow} alt="LeftArrow"/>
    </div>
    );
}
  

export default function ProfileInformation(props) {

const {getPhotoEditorData, photoEditor, setPhotoEditor} = props;
const history = useHistory()

console.log("getPhotoEditorData",getPhotoEditorData)
console.log("photoEditorrrrrr",photoEditor)

const params = useParams();
console.log("params",params)
    let filteredData = photoEditor.filter((item) => {
        console.log("item",item)
        return item._id === params.id
    })
    console.log("filteredData",filteredData)

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
        slidesToScroll: 1
      };

const handleHireMe = () => {
    history.push("/hire-me")
}

  return (
    <div>
        <div className='profile-information-section-alignment'>
            <div className='container-md'>
                <div className='profile-info-grid'>
                    <div className='profile-info-grid-items'>
                        <div className='main-photo-slider'>
                        <Slider {...settings}>
                            {
                               filteredData[0]?.image.map((item) => {
                                    return(
                                        // console.log("iteeemm",item)
                                        <div className='main-image-style'>
                                            <img src={item?.media} alt="PhotoShowImage"/>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                        </div>
                        <>
                            <ChildImage
                            filteredData={filteredData}
                            />
                        </>
                    </div>
                    <div className='profile-info-grid-items'>
                        <div className='all-content-alignment-style'>
                            <div className='content-alignment'>
                                <span>From</span>
                                <span>{filteredData[0]?.country}</span>
                            </div>
                            <div className='content-alignment'>
                                <span>Member since</span>
                                <span>{moment(filteredData[0]?.registrationDate).format("DD-MM-YYYY")}</span>
                               { console.log("dateeeee",moment(filteredData[0]?.registrationDate).format("MMM Do YY"))}
                            </div>
                            <div className='content-alignment'>
                                <span>Avg. response time</span>
                                <span>{filteredData[0]?.avgResponseTime} hour</span>
                            </div>
                            <div className='content-alignment'>
                                <span>Average turn around time</span>
                                <span>{filteredData[0]?.avargeTurnAroundTime} hour</span>
                            </div>
                        </div>
                        <div className="sort-text-style">
                            <p>{filteredData[0]?.aboutMe}
                            </p>
                        </div>
                        <div className='button-alignment-all'>
                            <div className='button-grid'>
                                <div className='fill-button'>
                                    <button onClick={(e) => handleHireMe(e)}>Hire Me</button>
                                </div>
                                <div className='outline-button'>
                                    <button>Test Job</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
