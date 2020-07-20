import React from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { AiFillMinusCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import "./Counter.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Counter = ({ counterVal, id }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.UserInfo);

  const decrement = (e) => {
    e.stopPropagation();
    if (counterVal === 0) return;
    let data = {
      userId: userId.UserId,
      id: id,
    };
    console.log("in decrement");
    axios
      .post(
        process.env.REACT_APP_REST_ENDPOINT + "/cart/updates/decrementCount",
        data
      )
      .then((result, err) => {
        if (err) {
          console.log("unable to update", err);
          return;
        }
        dispatch({ type: "initializeCart", payload: result.data.update });
      })
      .catch((e) => {
        console.log("unable to update", e);
        return;
      });
    return;
  };

  const increment = (e) => {
    e.stopPropagation();

    console.log("increment called");
    let data = {
      userId: userId.UserId,
      id: id,
    };
    console.log("in increment");
    axios
      .post(
        process.env.REACT_APP_REST_ENDPOINT + "/cart/updates/increaseItemCount",
        data
      )
      .then((result, err) => {
        if (err) {
          console.log("unable to update", err);
          return;
        } else {
          if (result.data.status === "success")
            dispatch({ type: "initializeCart", payload: result.data.update });
          else console.log("unable to update");
        }
      })
      .catch((e) => {
        console.log("unable to update", e);
        return;
      });
    return;
  };

  return (
    <>
      <div className="counterClass">
        <AiFillMinusCircle
          onClick={(e) => {
            decrement(e);
          }}
          size="1.3rem"
        />
        <div style={{ margin: "5px", display: "inline" }}>{counterVal}</div>
        <BsFillPlusCircleFill
          onClick={(e) => {
            increment(e);
          }}
          size="1.2rem"
        />
      </div>
    </>
  );
};

export default Counter;
