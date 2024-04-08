import { useReducer } from "react";
import { ControlNumber } from "./controlNum.js";

const ProductCount = function ({ ItemQtyChangeIncart, ItemInfo }) {
  const createInitialState = () => {
    return {
      count: ItemInfo.qty,
    };
  };
  const [productNumState, dispatch] = useReducer(
    ControlNumber,
    null,
    createInitialState
  );
  const { count } = productNumState;
  console.log(productNumState);
  const handleIncrease = () => {
    dispatch({ type: "increase" });
    ItemInfo.qty += 1;
    ItemQtyChangeIncart(ItemInfo);
  };

  const handleDecrease = () => {
    if (productNumState.count > 0) {
      dispatch({ type: "decrease" });
      ItemInfo.qty -= 1;
      ItemQtyChangeIncart(ItemInfo);
    }
  };

  const handleDelete = () => {
    dispatch({ type: "delete" });
    ItemInfo.qty = 0;
    ItemQtyChangeIncart(ItemInfo);
  };
  let TotalPrice = count * ItemInfo.price;
  return (
    <>
      <img src={ItemInfo.photo} width={200} height={200} />
      <h5>{ItemInfo.name}</h5>
      <button onClick={handleIncrease}>+</button>
      {count}
      <button onClick={handleDecrease}>-</button>
      <button onClick={handleDelete}>X</button>
      <h6>${TotalPrice}</h6>
    </>
  );
};

export default ProductCount;