import React from "react";

const SellerDesc = ({ desc }) => {
  return (
    <>
      <div className="col-10 col-sm-12 offerBlock offset-1 rowMarg DescTab">
        <strong>Seller Description</strong>
        {desc.split("!@!").map((para) => {
          return <p>{desc}</p>;
        })}
      </div>
    </>
  );
};

export default SellerDesc;
