import React from 'react'
import './footer.scss';
import Logo from '../../component/logo/index';
export default function Footer() {
  return (
    <div>
      <footer>
        <div className='container'>
          <div className='grid'>
            <div className='grid-items'>
              <div className='footer-logo-alignment'>
                <Logo/>
              </div>
            </div>
            <div className='grid-items'>
              <h2>Services</h2>
              <ul>
                <li>Insurance</li>
                <li>Website Developers</li>
                <li>Lead Generators</li>
                <li>Photographer</li>
                <li>Photo Editor</li>
              </ul>
            </div>
            <div className='grid-items'>
              <h2>About</h2>
              <ul>
                <li>Careers</li>
                <li>Press & News</li>
                <li>Partnerships</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Intellectual Property Claims</li>
                <li>Investor Relations</li>
              </ul>
            </div>
            <div className='grid-items'>
              <h2>Support</h2>
              <ul>
                <li>Help & Support</li>
                <li>Trust & Safety</li>
                <li>Selling on Photo Depot</li>
                <li>Buying on Photo Depot</li>
              </ul>
            </div>
            <div className='grid-items'>
              <h2>Community</h2>
              <ul>
                <li>Events</li>
                <li>Blog</li>
                <li>Forum</li>
                <li>Community Standards</li>
                <li>Podcast</li>
                <li>Affiliates</li>
                <li>Invite a Friend</li>
                <li>Become a Seller</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <div className='copy-right-footer'>
        <div className='container'>
          <div className='footer-sub-grid'>
            <div>
              <p>© Photo Depot all Rights and reserved. 2022</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
