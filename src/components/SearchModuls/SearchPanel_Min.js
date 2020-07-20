import React from "react";
import "./Search.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { MdAddShoppingCart } from "react-icons/md";
import BackDropSh from "../SideBar/Backdrop/BackDropSh";

const SearchPanel_Min = ({ goBack, goToCart }) => {
  return (
    <>
      <div className="search_Min">
        <div
          className="backCls"
          onClick={() => {
            goBack();
          }}
        >
          <AiOutlineArrowLeft size="1.8rem" color="rgb(35, 108, 172)" />
        </div>
        <h4 className="textStyling">Stationary Stop</h4>
        <div
          className="cartClss"
          onClick={() => {
            goToCart();
          }}
        >
          <MdAddShoppingCart size="1.8rem" color="rgb(35, 108, 172)" />
        </div>
      </div>
    </>
  );
};

export default SearchPanel_Min;
