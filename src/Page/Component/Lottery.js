import React, { useState, useRef } from "react";
import SlotDemo from "./SlotDemo";

const Lottery = (props) => {
  return (
    <main id="content">
      <div className="max-w-7xl mx-auto min-h-screen bg-white border border-gray-200 py-10 px-4 sm:px-6 lg:px-8 xl:border-gray-200 dark:bg-neutral-800 dark:border-gray-700">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-center mb-8">
            New registration, lottery activities
          </h1>
          <SlotDemo updateFreeList={props.updateFreeList} />
        </div>
      </div>
    </main>
  );
};

export default Lottery;
