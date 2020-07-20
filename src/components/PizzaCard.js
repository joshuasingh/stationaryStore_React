import React from "react";
import "../App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Badge, Button } from "react-bootstrap";
import pizzas from "../data";

export function PizzaCard({ data, setOrdered }) {
  //   return (
  //     <Card className="shadow-sm bg-white rounded ">
  //       <Card.Img variant="top" src={data.image} />
  //       <Card.Body className="d-flex flex-column">
  //         <div className="d-flex mb-2 justify-content-between">
  //           <Card.Title className="mb-0font-weight-bold">{data.name}</Card.Title>
  //           <Badge pill className="mb-1" variant="warning">
  //             {data.price}
  //           </Badge>
  //         </div>
  //         <Card.Text className="text-secondary">{data.desc}</Card.Text>
  //         <Button
  //           onClick={() => {
  //             setOrdered();
  //           }}
  //           className="mt-auto font-weight-bold"
  //           variant="success"
  //           block
  //         >
  //           Order Pizza
  //         </Button>
  //       </Card.Body>
  //     </Card>
  //   );

  return (
    <>
      <div className="cardlay">
        <p>sdfsdfsdfdfs sdhfhdfjsdf hsdfjsdfjfdsfj </p>
      </div>
    </>
  );
}
