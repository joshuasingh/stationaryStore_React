import React from "react";
import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import ProductCard_Cart from "./ProductCard_Cart";
import "./ProductCard_Cart.css";
import axios from "axios";
import { useStore, useSelector, useDispatch } from "react-redux";
import { BsClipboardData } from "react-icons/bs";
import { Button } from "react-bootstrap";

const data = [{ id: "sdfsdfds" }, { id: "sdfsdfd" }, { id: "sdfsdfdsf" }];

const Cart = () => {
  const [selectId, setSelectId] = useState(null);
  const [buttonState, changeButtonState] = useState(true);
  //const [allData, setAllData] = useState([]);

  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.UserCart);

  var addId = (id) => {
    if (selectId === null) setSelectId(new Set([id]));
    else {
      let set = selectId;
      set.add(id);
      setSelectId(set);
    }

    console.log("select value", selectId);
  };

  var removeId = (id) => {
    console.log("select value", selectId);
    let set = selectId;
    set.delete(id);

    if (set.size === 0) setSelectId(null);
    else setSelectId(set);
  };

  useEffect(() => {
    //scroll to the top
    window.scrollTo(0, 0);

    axios
      .get(
        process.env.REACT_APP_REST_ENDPOINT +
          "/cart/getCartItems/hxUqGaiuvzUqXje4RVQGZEYbNNP2"
      )
      .then((result, err) => {
        if (err) {
          console.log("unable to fetch", err);
        } else {
          console.log(result.data);
          if (result.data.status === "success") {
            console.log("got the result", result.data.items);
            // setAllData(result.data.items);
            dispatch({ type: "initializeCart", payload: result.data.items });
          } else console.log("unable to fetch");
        }
      })
      .catch((e) => {
        console.log("unable to fetch", e);
      });
  }, []);

  useEffect(() => {
    console.log("alldata value--", cartData.allData);
  }, [cartData.allData]);

  useEffect(() => {
    console.log("selectId value", selectId);
    if (selectId === null || selectId.size === 0) {
      changeButtonState(true);
    } else {
      changeButtonState(false);
    }
  }, [selectId]);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Container className="MainContainer" fluid>
          {cartData.allData.map((val) => {
            return (
              <Row>
                <div className="col-12 col-sm-12 ">
                  <ProductCard_Cart
                    productDets={{
                      id: val.id,
                      title: val.title,
                      price: val.price,
                      itemCount: val.itemCount,
                    }}
                    id={val.id}
                    addId={addId}
                    removeId={removeId}
                  />
                </div>
              </Row>
            );
          })}
        </Container>
        <div className="cart_Proceed">
          <Button className="proceed_button" disabled={buttonState}>
            {buttonState === true ? "Tap To Select" : "Proceed With Order"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Cart;
