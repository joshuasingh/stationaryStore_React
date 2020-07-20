import React from "react";
import { Row, Container } from "react-bootstrap";

const dummyProduct = [
  {
    Url: "https://picsum.photos/200",
    ProductN: "Pencil",
    Price: "Rs 99",
  },
  {
    Url: "https://picsum.photos/200",
    ProductN: "Pencil",
    Price: "Rs 99",
  },
  {
    Url: "https://picsum.photos/200",
    ProductN: "Pencil",
    Price: "Rs 99",
  },
  {
    Url: "https://picsum.photos/200",
    ProductN: "Pencil",
    Price: "Rs 99",
  },
  {
    Url: "https://picsum.photos/200",
    ProductN: "Pencil",
    Price: "Rs 99",
  },
];

const ProductCard = ({ Prod }) => {
  return (
    <>
      <Container className="showCard" fluid>
        <Row>
          <div className="col-12 col-sm-12">
            {/* <img alt="" src={Prod.Url} className="cardPic" /> */}
            <img alt="" src="https://picsum.photos/200" className="cardPic" />
          </div>
        </Row>
        <Row>
          <div className="col-12 col-sm-12 name">
            <strong>{Prod.title}</strong>
          </div>
        </Row>
        <Row>
          <div className="col-12 col-sm-12 price">
            <p>{Prod.price}</p>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default ProductCard;
