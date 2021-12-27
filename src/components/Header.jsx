import CoverImage from "../images/portfolio.png";
import ProfileImage from "../images/profile.png";
import { FaTwitter, FaGithub } from "react-icons/fa";

export const Header = () => {
  return (
    <header
      className='main-cover'
      style={{ backgroundImage: `url(${CoverImage})` }}
    >
      <div className='overlay'>
        <div className='container'>
          <div className='display-table'>
            <div className='display-table-contents'>
              <div
                className='profile-thumb'
                style={{ backgroundImage: `url(${ProfileImage})` }}
              ></div>
              <h1 className='title-text'>眞下卓也</h1>
              <h3 className='title-text'>Softwere Engineer</h3>
              <ul className='social-icons'>
                <li className='icon-link'>
                  <a href='https://twitter.com/taku_enjineer'>
                    <FaTwitter color='white' size='2rem' />
                  </a>
                </li>
                <li className='icon-link'>
                  <a href='https://github.com/takuya-mashimo'>
                    <FaGithub color='white' size='2rem' />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
