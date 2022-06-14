import React from 'react'
import './childImage.scss';
import Slider from "react-slick";
import ChildImg from '../../../assets/icons/child-img.png';
export default function ChildImage(props) {

const {filteredData} = props;
console.log("filteredDataaaaaaaaaaa",filteredData)

    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 7,
        slidesToScroll: 1,
      };
  return (
    <div>
        <div className='child-image-alignment-section'>
        <Slider {...settings}>
            {
                filteredData[0]?.image.map((item)=> {
                    return(
                        // console.log("item",item)
                        <div className='child-image-style'>
                <img src={item?.media} alt="ChildImg"/>
            </div>
                    )
                })
            }
        </Slider>
        </div>
    </div>
  )
}
