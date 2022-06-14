import React from "react";
import "./landingpage.scss";
import SearchIcon from '../../assets/icons/white-search.svg';
import HighPhotoEditorindex from "./highPhotoEditor";
import YourHiring from "./yourHiring";
import Header from "../../component/header";
export default function LandingPage() {
  return (
    <div>
      <Header />
      <div className="home-hero-section">
        <div className="container">
          <div className="content-center">
            <div className="content-center-alignment">
              <div className="content-style">
                <h1>
                  Welcome to <span>Photo Depot</span> Marketplace
                </h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est
                  elit pharetra dolor donec nunc, consequat, Imperdiet amet non
                  a sem. Sapien pharetra tellus nibh dictum enim. Ipsum vitae,
                  sapien libero tristique est placerat vitae.
                </p>
                <div className="search-section-alignment">
                  <div className="search-grid">
                    <div className="search-grid-items">
                      <input type="text" placeholder="Search" />
                      <div className="icon-left-alignment">
                        <img src={SearchIcon} alt="SearchIcon"/>
                      </div>
                    </div>
                    <div className="search-grid-items">
                      <button>Go</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <>
        <HighPhotoEditorindex/>
      </>
      <>
        <YourHiring/>
      </>
    </div>
  );
}
