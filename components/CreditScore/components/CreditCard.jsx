"use client";
import React from "react";

const CreditCard = ({ data }) => {
  return (
    <div className="flex flex-col rounded-r-lg border p-4 lg:flex-row">
      {data?.map((item, index) => {
        const { img } = item;
        return <img src={img} className="h-full w-[360px]" key={index} />;
      })}
    </div>
  );
};

export default CreditCard;
