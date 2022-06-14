import React, {useEffect,useState} from 'react'
import './yourHiring.scss';
import CardImage from '../../../assets/images/card-image.png';
import FillStar from '../../../assets/icons/fill-star.svg';
import OutlineStar from '../../../assets/icons/outline-star.svg';
import HeartIcon from '../../../assets/icons/heart.svg';
import ProfileImage from '../../../assets/images/profile-image.png';
import { ApiGet } from '../../../helpers/API/ApiData';

export default function YourHiring() {

    const [hireAllData, setHireAllData] = useState()

    useEffect(() => {
        getHirePhotoEditorData()
    }, [])
    

    const getHirePhotoEditorData = async () => {
        await ApiGet(`hire/getAllHire`)
          .then((res) => {
            console.log("getAllHire", res);
            setHireAllData(res?.data?.payload?.hire);
          })
          .catch((err) => {
            console.log("err", err);
          });
      };

  return (
    <div>
        <div className='your-hiring-section-alignment'>
        <div className='container'>
                <div className='page-title'>
                    <div>
                        <h1>Your Hiring</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est elit pharetra dolor 
                            consequat. Sapien pharetra tellus nibh dictum enim. Ipsum vitae, sapien libero tristique.
                        </p>
                    </div>
                </div>
                <div className='card-grid'>
                    {
                        hireAllData?.slice(0, 4).map((item)=> {
                            return(
                                <div className='card-grid-items'>
                                    <div className='card-image'>
                                        <img src={item?.photoeditor_id?.coverPhoto} alt="CardImage"/>
                                    </div>
                                    <div className='card-details'>
                                        <div className='profile-section-alignment'>
                                            <div className='profile-section'>
                                                <div>
                                                    <img src={item?.photoeditor_id?.profilePhoto} alt="ProfileImage"/>
                                                </div>
                                                <div>
                                                    <span>{item?.photoeditor_id?.firstName}</span>
                                                    <div className='rating-alignment'>
                                                        <img src={FillStar} alt="FillStar"/>
                                                        <img src={FillStar} alt="FillStar"/>
                                                        <img src={FillStar} alt="FillStar"/>
                                                        <img src={OutlineStar} alt="OutlineStar"/>
                                                        <img src={OutlineStar} alt="OutlineStar"/>
                                                        <a>(3.0)</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='like-button'>
                                                <img src={HeartIcon} alt="HeartIcon"/>
                                            </div>
                                        </div>
                                        <p>{item?.projectName}</p>
                                        <h4>₹{item?.price}/ <sub>Per hour</sub></h4>
                                    </div>
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
