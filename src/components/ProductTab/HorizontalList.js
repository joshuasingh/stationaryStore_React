import React, { useEffect, useRef } from "react";
import { ontainer, Row, Container } from "react-bootstrap";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Loader from "react-loader-spinner";
import * as Scroll from "react-scroll";
import useSWR from "swr";

const HorizontalList = ({ productId }) => {
  const [prodList, setProdList] = useState(null);
  const [prodId, setProdId] = useState(null);
  const firstRef = useRef(null);

  var Lin = Scroll.Link;

  const getRecommendation = async () => {
    setProdId(productId);
    try {
      var res = await axios.get(
        process.env.REACT_APP_REST_ENDPOINT + "/recommend/product/" + productId
      );
      console.log("%c in recommendation data", "color:red");
      setProdList(res.data.result);
    } catch (e) {
      alert("error occured ", e);
    }
  };

  useEffect(() => {
    console.log("%c in useEffect of horizontal list", "color:green", firstRef);

    if (prodList === null) {
      if (prodId === null || prodId !== productId) getRecommendation();
    } else {
      if (prodId !== productId) {
        setProdList(null);
        setProdId(null);
      }
    }
  });

  useEffect(() => {
    //component will Unmount
    return () => {
      console.log("%c horizontal view unmounting", "color:orange");
    };
  }, []);

  return (
    <>
      {prodList === null ? (
        <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
      ) : (
        <div className="horiScroll">
          {prodList.map((val, index) => {
            const url = "/itemScreen/" + val._id;

            return (
              <>
                {index === 0 ? (
                  <Lin offset={50} to="chall">
                    {" "}
                    <div ref={firstRef}></div>
                  </Lin>
                ) : (
                  ""
                )}
                <div className="innerVal">
                  <Link to={url}>
                    <ProductCard Prod={val} />
                  </Link>
                </div>
              </>
            );
          })}
        </div>
      )}
    </>
  );
};

export default HorizontalList;
