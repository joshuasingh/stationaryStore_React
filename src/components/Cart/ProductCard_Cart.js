import React from "react";
import "./ProductCard_Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Counter from "../Counter/Counter";
import axios from "axios";
import loading from "../../Images/loading.png";
import { AiTwotoneDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

var mainRef = null;

const ProductCard_Cart = ({ productDets, id, removeId, addId }) => {
  const [sel, setSel] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.UserInfo);

  const { title, price, itemCount } = productDets;

  const changeBack = () => {
    if (sel === true) {
      setSel(false);
      removeId(id);
    } else {
      setSel(true);
      addId(id);
    }
    return;
  };

  const deleteItem = (e) => {
    e.stopPropagation();

    const data = {
      userId: user.UserId,
      id: id,
    };

    axios
      .post(process.env.REACT_APP_REST_ENDPOINT + "/cart/deleteItems", data)
      .then((result, err) => {
        if (err) {
          console.log("unable to delete");
          return;
        } else {
          if (result.data.status === "success")
            dispatch({
              type: "initializeCart",
              payload: result.data.update.items,
            });
          else console.log("unable to delete the item");
        }
      })
      .catch((e) => {
        console.log("unable to delete item");
      });
  };

  var mainClass = "ProductClass";
  if (sel === true) mainClass = "ProductClass ProductClass_Sel";

  const prodPage = "/itemScreen/" + id;
  return (
    <>
      <div
        ref={(ree) => {
          mainRef = ree;
        }}
        className={mainClass}
        onClick={changeBack}
      >
        <div style={{ flex: "1" }}>
          {" "}
          <Link to={prodPage}>
            <img
              alt={loading}
              src="https://picsum.photos/200"
              className="cardPic1"
            />
          </Link>
        </div>
        <div className="ProductContent">
          <div>{title}</div>
          <div>
            Rs {price} X {itemCount} : Rs {price * itemCount}
          </div>
          <div className="deleteCart">
            <Counter id={id} counterVal={1 * itemCount} />
            <AiTwotoneDelete
              size="1.4rem"
              onClick={(e) => {
                deleteItem(e);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard_Cart;
