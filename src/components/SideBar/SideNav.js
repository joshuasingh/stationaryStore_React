import React from "react";
import "./SideNav.css";
import { Container, Row } from "react-bootstrap";
import sideBarContent from "./sideBarContent.json";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import firebase from "../../Firebase/FirebaseConfig";

const SideNav = ({ sideState }) => {
  let sideClass = "sideNav_Root";
  if (sideState) {
    sideClass = "sideNav_Root open";
  }

  const User = useSelector((state) => state.UserInfo);

  const dispatch = useDispatch();

  const SignOut = () => {
    console.log("clicked here");

    firebase
      .auth()
      .signOut()
      .then((res) => {
        dispatch(SignOutAction());
      })
      .catch((e) => {
        console.log("unable to logout", e);
      });
  };

  return (
    <>
      <div className={sideClass}>
        <div className="sideBar">
          <div className="sideBarProfile">
            Welcome {User !== null ? User.firstName : ""}
          </div>
          <div className="sideBarContent">
            {console.log("userInfo", User)}
            {sideBarContent.map((val) => {
              if (val.Header === "Sign Out" && User.UserId !== null) {
                return (
                  <div
                    onClick={() => {
                      SignOut();
                    }}
                  >
                    {val.Header}
                  </div>
                );
              } else if (val.Header !== "Sign Out")
                return (
                  <div>
                    <Link to={val.link}>{val.Header}</Link>
                  </div>
                );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

const SignOutAction = () => {
  return {
    type: "SignOut",
  };
};

export default SideNav;
