import React, {useState,useEffect} from 'react'
import './highPhotoEditor.scss';
import CardImage from '../../../assets/images/card-image.png';
import FillStar from '../../../assets/icons/fill-star.svg';
import OutlineStar from '../../../assets/icons/outline-star.svg';
import HeartIcon from '../../../assets/icons/heart.svg';
import ProfileImage from '../../../assets/images/profile-image.png';
import { ApiGet } from '../../../helpers/API/ApiData';
import { getUserInfo } from '../../../utils/user.util';
export default function HighPhotoEditorindex() {

    const [photoEditor, setPhotoEditor] = useState([])

    useEffect(() => {
        getPhotoEditorData()
    }, [])
    
    console.log("photoEditor",photoEditor)

    const getPhotoEditorData = () => {
        ApiGet(`admin/get-admins?roleType=photoeditor`)
          .then((res) => {
            console.log("updateAdmin", res);
            setPhotoEditor(res?.data?.payload?.admin);
                  })
          .catch((err) => {
            console.log("err", err);
          });
      };

  return (
    <div>
        <div className='high-photo-editor-section'>
            <div className='container'>
                <div className='page-title'>
                    <div>
                        <h1>High rated Photo Editor</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est elit pharetra dolor 
                            consequat. Sapien pharetra tellus nibh dictum enim. Ipsum vitae, sapien libero tristique.
                        </p>
                    </div>
                </div>
                <div className='card-grid'>
                    {
                        photoEditor?.slice(0, 4)?.map((item)=> {
                            return(
                                <div className='card-grid-items'>
                                    <div className='card-image'>
                                        <img src={item?.coverPhoto} alt="CardImage"/>
                                    </div>
                                    <div className='card-details'>
                                        <div className='profile-section-alignment'>
                                            <div className='profile-section'>
                                                <div>
                                                    <img src={item?.profilePhoto} alt="ProfileImage"/>
                                                </div>
                                                <div>
                                                    <span>{item?.firstName + " " + item?.lastName}</span>
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
                                        <p>{item?.serviceDescription}</p>
                                        <h4>₹{item?.price}/ <sub>Per hour</sub></h4>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='view-all-editors-alignment'>
                    <div className='fill-button'>
                        <a href="/editord-filter">
                            <button>View all editors</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
