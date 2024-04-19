import React from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";

export default function SlotBtn(props) {
  const nav = useNavigate();
  function GetFreeGift() {
    nav(props.LinkName);
    props.updateFreeList("Gift");
  }
  return (
    <>
      <div
        data-tooltip-id="SlotBtn"
        className="fixed left-10 top-1/2 h-32 w-32 z-10 cursor-pointer"
      >
        <button onClick={() => GetFreeGift()}>
          <img className="h-20 w-20" src="/Gift.png" alt="SlotMachine" />
        </button>
      </div>
      <Tooltip
        id="SlotBtn"
        content="Get a free item!"
        noArrow="true"
        place="top"
      ></Tooltip>
    </>
  );
}
