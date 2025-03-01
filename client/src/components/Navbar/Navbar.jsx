import { useEffect, useState } from "react"; //Agregamos useState para mantener el número actual de la página
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import images from "../../constants/images";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { user, isAuthenticated, isLoading, logout, loginWithRedirect } =
    useAuth0();
  const [toggleMenu, setToggleMenu] = useState(false);

  
  if (user){
    console.log(user)
  }
  // const dispatch = useDispatch();
  // useEffect((user) => {
  // // dispatch(getExercises(user));
  // },[])


  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <a href="/">
          <img src={images.logoy} alt="app__logo" />
        </a>
      </div>
      <ul className="app__navbar-links">
        <li className="p__opensans">
          <a href="/formProducts">Supplies</a>
        </li>
        <li className="p__opensans">
          <a href="#services">Services</a>
        </li>
        <li className="p__opensans">
          <a href="#contact">Contact</a>
        </li>
      </ul>
      {isAuthenticated ? (
            <button
              className="p__opensans"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Log Out
            </button>
      ) : (
        <div className="app__navbar-login">
          <button className="p__opensans" onClick={() => loginWithRedirect()}>
            Log In
          </button>
          {/* <a href="/login" className="p__opensans">
          Log In
        </a> */}
          <div />
          <a href="/register" className="p__opensans">
            Registration
          </a>
        </div>
      )}
      {isAuthenticated ?
        <div>
          <img src={user.picture} alt={user.name} />
        </div> :
        null
          }
      {isAuthenticated ?
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div> :
        null
      }
      <div className="app__navbar-smallscreen">
        <GiHamburgerMenu
          color="#fff"
          fontSize={27}
          onClick={() => setToggleMenu(true)}
        />
        {toggleMenu && (
          <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
            <MdClose
              fontSize={27}
              className="overlay__close"
              onClick={() => setToggleMenu(false)}
            />
            <ul className="app__navbar-smallscreen_links">
              <li></li>
              <li>
                <a href="#services" onClick={() => setToggleMenu(false)}>
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" onClick={() => setToggleMenu(false)}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
