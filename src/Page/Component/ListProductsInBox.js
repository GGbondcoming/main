import { useEffect, useState } from "react";
import ProductCount from "./productsCount.js";
import FreeBox from "./freeProductsBox.js";

const Box = function ({
  ItemChangeIncart,
  Items,
  ItemChangeInwishlist,
  WishItems,
  FreeItems,
  CartAccount,
  OpenCart,
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 50);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {OpenCart && (
        <div>
          {Items[CartAccount] &&
          FreeItems[CartAccount] &&
          Items[CartAccount].length === 0 &&
          FreeItems[CartAccount].length < 2 ? (
            <div class="text-center my-56 md:my-44 text-xl md:text-[15px] w-[400px] md:w-[350px]">
              No Product in Cart !
            </div>
          ) : (
            <div>
              {isLoading ? (
                <div class="flex justify-center items-center shadow-inner border-[0.5px] mt-2 h-[500px] md:h-[380px] w-[402px] md:w-[352px]">
                  <img
                    src="https://i.gifer.com/ZKZg.gif"
                    class="w-[100px] h-[100px] md:w-[50px] md:h-[50px]"
                  />
                </div>
              ) : (
                <div class="overflow-scroll bg-white rounded border-solid border-grey shadow-inner border-[0.5px] mt-2 h-[500px] md:h-[380px]">
                  {FreeItems[CartAccount] &&
                    FreeItems[CartAccount].length > 1 && (
                      <FreeBox freeItemsList={FreeItems[CartAccount]} />
                    )}
                  {Items[CartAccount] &&
                    Items[CartAccount].length > 1 &&
                    Items[CartAccount].map((p) => {
                      return (
                        <ProductCount
                          ItemQtyChangeIncart={ItemChangeIncart}
                          ItemInfo={p}
                          isOpenCart={OpenCart}
                        />
                      );
                    })}
                  {Items[CartAccount] && Items[CartAccount].length === 1 && (
                    <ProductCount
                      ItemQtyChangeIncart={ItemChangeIncart}
                      ItemInfo={Items[CartAccount][0]}
                      isOpenCart={OpenCart}
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {!OpenCart && (
        <div>
          {WishItems[CartAccount] && WishItems[CartAccount].length === 0 ? (
            <div class="text-center my-56 md:my-44 text-xl md:text-[15px] w-[400px] md:w-[350px]">
              No Product in Wish List !
            </div>
          ) : (
            <div>
              {isLoading ? (
                <div class="flex justify-center items-center shadow-inner border-[0.5px] mt-2 h-[500px] md:h-[380px] w-[402px] md:w-[352px]">
                  <img
                    src="https://i.gifer.com/ZKZg.gif"
                    class="w-[100px] h-[100px] md:w-[50px] md:h-[50px]"
                  />
                </div>
              ) : (
                <div class="overflow-scroll bg-white rounded border-solid border-grey shadow-inner border-[0.5px] mt-2 h-[520px] md:h-[420px]">
                  {WishItems[CartAccount] &&
                    WishItems[CartAccount].length > 1 &&
                    WishItems[CartAccount].map((p) => {
                      return (
                        <ProductCount
                          ItemQtyChangeIncart={ItemChangeIncart}
                          ItemChangeInwishlist={ItemChangeInwishlist}
                          ItemInfo={p}
                          isOpenCart={OpenCart}
                        />
                      );
                    })}
                  {WishItems[CartAccount] &&
                    WishItems[CartAccount].length === 1 && (
                      <ProductCount
                        ItemQtyChangeIncart={ItemChangeIncart}
                        ItemChangeInwishlist={ItemChangeInwishlist}
                        ItemInfo={WishItems[CartAccount][0]}
                        isOpenCart={OpenCart}
                      />
                    )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default Box;
