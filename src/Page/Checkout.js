import { Link } from "react-router-dom";
import TotalPriceCount from "./Component/totalPricesInCart.js";
import withLoader from "./Component/withLoader";
import DiscountCode from "./Component/DiscountCode.js";
import { useState } from "react";

const Checkout = function ({
  updateCart,
  items,
  updateFreeList,
  freeItems,
  Account,
}) {
  const [isCodeUse, setIsCodeUse] = useState(false);
  function PaidDeleteCart() {
    updateCart("Paid");
    updateFreeList("Paid");
  }

  let freeProduct = [];
  if (freeItems[Account] && freeItems[Account].length > 1) {
    freeProduct = [freeItems[Account][1], freeItems[Account][2]];
  }
  console.log(freeProduct);
  let PriceSum = 0;
  if (items[Account].length > 1) {
    items[Account].map((p) => {
      console.log(PriceSum);
      PriceSum += p.qty * p.price;
    });
  } else if (items[Account].length === 1) {
    PriceSum += items[Account][0].qty * items[Account][0].price;
  }

  const [Discount, setDiscount] = useState("1");
  function handleDiscount(code) {
    if (code === "PNSAPP" && PriceSum >= 350) {
      setDiscount("0.9");
      setIsCodeUse(true);
    } else if (code === "APRCNC" && PriceSum >= 200) {
      setDiscount("0.95");
      setIsCodeUse(true);
    } else if (code === "APRHD") {
      setDiscount("0.92");
      setIsCodeUse(true);
    }
  }

  return (
    <div className="py-5 mx-auto lg:max-w-6xl max-w-xl md:max-w-full space-y-4">
      <div className="bg-blue-50 rounded-md p-3 font-bold h-20 content-center text-4xl flex">
        <p className="md:w-1/5">My Cart</p>
        <p className="hidden md:block md:w-2/5">Product</p>
        <p className="hidden md:block md:w-1/5 text-right">Qty</p>
        <p className="hidden md:block md:w-1/5 text-right">Total</p>
      </div>
      {freeProduct.length > 0 &&
        freeProduct.map((p) => {
          p.price = 0;
          return <TotalPriceCount ItemInfo={p} />;
        })}
      {items[Account].length > 1 &&
        items[Account].map((p) => {
          return <TotalPriceCount ItemInfo={p} />;
        })}
      {items[Account].length === 1 && (
        <TotalPriceCount ItemInfo={items[Account][0]} />
      )}
      <DiscountCode handleDiscount={handleDiscount} IsCodeUse={isCodeUse} />
      {PriceSum > 0 ? (
        <h5 className="bg-blue-50 rounded-md p-3 font-bold h-20 content-center text-3xl text-center md:text-right">
          Total Prices :{" "}
          {isCodeUse ? (
            <>
              <a className="line-through">{PriceSum.toFixed(1)}</a>
              {" > "}
              {(PriceSum * Discount).toFixed(1)}
            </>
          ) : (
            <>{PriceSum.toFixed(1)}</>
          )}
        </h5>
      ) : (
        <h3 className="bg-blue-50 rounded-md p-3 font-bold h-20 content-center text-2xl text-center md:text-right">
          Nothing in Cart !
        </h3>
      )}
      <div className="bg-blue-50 rounded-md p-3 font-bold h-40 content-center">
        <Link to="/">
          <button
            className="bg-blue-600 rounded-md w-full my-2 p-3 text-2xl hover:text-white"
            onClick={PaidDeleteCart}
          >
            CHECKOUT
          </button>
        </Link>
        <Link to="/">
          <button className="bg-gray-200 rounded-md w-full my-2 p-2 text-xl">
            Back To Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default withLoader(Checkout);
