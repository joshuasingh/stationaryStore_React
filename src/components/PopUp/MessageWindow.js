import React from "react";
import BackDropSh from "../SideBar/Backdrop/BackDropSh";
import "./MessageWindow.css";
const MessageWindow = ({ message }) => {
  return (
    <>
      <div className="fullMessageBox flexProp">
        <div style={{ "padding-left": "5px", "padding-right": "5px" }}>
          text here sdfsjfs fjsdkfs jdfksd fjskdf dsfkjsdf dsfhajfb{" "}
        </div>
        <div className="buttonStyle">OK</div>
      </div>
      <BackDropSh />
    </>
  );
};

export default MessageWindow;
