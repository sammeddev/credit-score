import React from "react";
import Link from "next/link";
import { LoanTypes } from "../../utils/data";

export default function LoanType() {
  return (
    <div className="gap- mx-auto grid w-11/12 grid-cols-4">
      {LoanTypes.map((items, index) => (
        <div className=" flex flex-col items-center bg-white p-6" key={index}>
          <img src={items.img} className="" />
          <h5 className="mb-2 text-center text-xl font-normal tracking-tight text-bl-blue dark:text-white">
            {items.title}
          </h5>
          <p className="mb-3 h-14 text-center font-normal text-gray-500 dark:text-gray-400">
            {items.desc}
          </p>
          <Link
            href={items.url}
            className="inline-flex items-center rounded-full border border-bl-blue px-8 py-2 font-medium text-bl-blue hover:bg-bl-blue hover:text-white"
          >
            {items.btn}
          </Link>
        </div>
      ))}
    </div>
  );
}
