import React, {useState ,useEffect} from 'react'
import './photoeditorsProfile.scss';
import DummyProfileImage from '../../assets/images/dummy-profile.png'
import FillStar from '../../assets/icons/fill-star.svg';
import OutlineStar from '../../assets/icons/outline-star.svg';
import ProfileInformation from './profileInformation';
import PeopleLoved from './peopleLoved';
import ProvideService from './provideService';
import { ApiGet } from '../../helpers/API/ApiData';
import { useParams } from 'react-router-dom';
export default function PhotoeditorsProfile() {

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

      const params = useParams();
console.log("paramswer",params)
    let filteredData = photoEditor.filter((item) => {
        console.log("item",item)
        return item._id === params.id
    })
    console.log("filteredData123",filteredData)

  return (
    <div>
        <div className='photoeditors-profile-banner'>
            <div className='container'>
                <div className='grid'>
                    <div className='grid-items'>
                        <div className='profile-image-center-alignment'>
                            <img src={filteredData[0]?.profilePhoto} alt="DummyProfileImage"/>
                        </div>
                        <div className='user-name'>
                            <p>{filteredData[0]?.firstName + "" + filteredData[0]?.lastName}</p>
                        </div>
                        <div className='rating-section-alignment'>
                            <img src={FillStar} alt="FillStar"/>
                            <img src={FillStar} alt="FillStar"/>
                            <img src={FillStar} alt="FillStar"/>
                            <img src={OutlineStar} alt="OutlineStar"/>
                            <img src={OutlineStar} alt="OutlineStar"/>
                            <span>(3.0) (456)</span>
                        </div>
                        <div className='sub-content-alignment'>
                            <p>{filteredData[0]?.aboutMe}</p>
                        </div>
                        <div className='fill-button'>
                            <button>Contact Photo Editors</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <>
            <ProfileInformation 
            setPhotoEditor={setPhotoEditor}
            getPhotoEditorData={getPhotoEditorData}
            photoEditor={photoEditor}
            />
        </>
        {/* <>
            <PeopleLoved/>
        </> */}
        <>
            <ProvideService/>
        </>
    </div>
  )
}
