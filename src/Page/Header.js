import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import Weather from "./Component/Weather.js";
import Inputbox from "./Component/input.js";
import Box from "./Component/ListProductsInBox.js";
import { FaCaretDown } from "react-icons/fa";
import { categories } from "./Component/categoriesData.js";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.js";

function Header(props) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [ProductNums, setProductNums] = useState(0);
  const temperature = props.temperature;
  const weather = props.weather;

  function ButtonLink({ to, BtnName }) {
    return <Link to={to}>{BtnName}</Link>;
  }

  const boxRef = useRef(null);

  useEffect(() => {
    if (
      props.items[props.Account] &&
      props.freeItems[props.Account] &&
      props.items[props.Account].length > 0 &&
      props.freeItems[props.Account].length > 1
    ) {
      setProductNums(props.items[props.Account].length + 2);
    } else if (
      props.items[props.Account] &&
      props.freeItems[props.Account] &&
      props.items[props.Account].length === 0 &&
      props.freeItems[props.Account].length > 1
    ) {
      setProductNums(2);
    } else if (
      props.items[props.Account] &&
      props.freeItems[props.Account] &&
      props.items[props.Account].length > 0 &&
      props.freeItems[props.Account].length < 2
    ) {
      setProductNums(props.items[props.Account].length);
    } else if (
      props.items[props.Account] &&
      props.freeItems[props.Account] &&
      props.items[props.Account].length > 0 &&
      props.freeItems[props.Account].length < 2
    ) {
      setProductNums(props.items[props.Account].length);
    } else {
      setProductNums(0);
    }

    if (!props.Account) {
      setProductNums(0);
    }
  }, [props.items, props.freeItems, props.Account]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        props.updateIsOpenCart(false);
        props.updateIsOpenWishList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [boxRef]);

  const dropdownLinks = categories;

  return (
    <div className="sticky top-0 bg-white z-10">
      <div class="bg-blue-600 grid grid-cols-3 grid-rows-2 mx-auto h-24 p-2 lg:px-3 border-box">
        <div class="col-start-1 col-end-2 flex flex-row">
          <ButtonLink
            to="/"
            BtnName={
              <button class="w-32 pt-3 md:w-40 md:pt-1 lg:w-44 lg:pt-0">
                <img
                  src="https://api.pns.hk/medias/PNS-logo-2X.png?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w4MDE0fGltYWdlL3BuZ3xhREZsTDJnNU5DOHhNRFl4TmprNU9EazROVGMxT0M5UVRsTmZiRzluYjE4eVdDNXdibWN8Nzg4ODYyOWY1NDEwM2VhMjNkMjJiN2M5ODkxMzQzMjVkYWNkMWQ1NWJhMDk5OWIwZTgzMGViMGE2YzljNTllZQ"
                  alt="logo"
                />
              </button>
            }
          />
          <Inputbox />
        </div>
        <div class="col-start-3 col-end-4 row-start-1 row-end-2 flex pt-6 flex-row justify-end">
          <Weather temperature={temperature} weather={weather} />
          <div class="mr-0 flex text-1xl text-white flex-row md:mr-3 lg:mr-5">
            {props.Account ? (
              <>
                <div class="hidden md:block">
                  <div class="text-lg w-20 px-0 mr-0 flex md:mr-20 lg:mr-24 xl:mr-28">
                    <div class="text-lg">Welcome,</div>
                    <div class="font-bold">{props.AccountName}</div>
                  </div>
                </div>
                <div class="pt-0.5">
                  <ButtonLink
                    to="/"
                    BtnName={
                      <button
                        onClick={() => {
                          props.updateAccount([]);
                          signOut(auth);
                          console.log("Logout success!");
                        }}
                        class="flex text-1xl text-white flex-row mr-2 md:mr-0"
                      >
                        <div class="h-auto w-5 mr-1 hidden md:block">
                          <img src="/AccBtn.png" />
                        </div>
                        <div class="text-lg md:text-base">Logout</div>
                      </button>
                    }
                  />
                </div>
              </>
            ) : (
              <div class="pt-0.5">
                <ButtonLink
                  to="Signin"
                  BtnName={
                    <button class="flex text-1xl text-white flex-row mr-2 md:mr-0">
                      <div class="h-auto w-5 mr-1 hidden md:block">
                        <img src="/AccBtn.png" />
                      </div>
                      <div class="text-lg md:text-base">Login</div>
                    </button>
                  }
                />
              </div>
            )}
          </div>
          <div>
            <button
              onClick={() => {
                props.updateIsOpenWishList(true);
                props.updateIsOpenCart(false);
              }}
              class="flex flex-row h-auto w-7 mr-2 pt-0.5 ml-3 md:w-6 md:ml-0 lg:mr-4 xl:mr-12 xl:ml-2"
            >
              <img src="/WishBtn.png" />
              <div class="ml-1 hidden xl:block text-white">WISH</div>
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                props.updateIsOpenWishList(false);
                props.updateIsOpenCart(true);
              }}
              class="flex flex-row h-auto w-8 ml-3 mr-4 pt-0.5 md:w-7 md:ml-2 md:mr-2 lg:mr-3 xl:mr-12 xl:ml-5"
            >
              <div>
                <img src="/CartBtn.png" class=" min-w-7" />
                {ProductNums > 0 ? (
                  <div class=" text-white text-[15px] md:text-[12px] mb-3 bg-orange-400 rounded-full min-w-[23px] max-w-[23px] min-h-[23px] max-h-[23px] translate-x-[18px] translate-y-[-39px] md:min-w-[20px] md:max-w-[20px] md:min-h-[20px] md:max-h-[20px] md:translate-x-4 md:translate-y-[-33px]">
                    {ProductNums}
                  </div>
                ) : (
                  <div class=" text-white text-[15px] md:text-[12px] mb-3 bg-orange-400 rounded-full min-w-[23px] max-w-[23px] min-h-[23px] max-h-[23px] translate-x-[18px] translate-y-[-39px] md:min-w-[20px] md:max-w-[20px] md:min-h-[20px] md:max-h-[20px] md:translate-x-4 md:translate-y-[-33px]">
                    0
                  </div>
                )}
              </div>
              <div class="ml-2 hidden xl:block text-white">CART</div>
            </button>
          </div>
        </div>
        <div class="col-start-3 col-end-4 row-start-2 row-end-3 z-40 mt-6">
          <div class="flex justify-end ">
            {props.OpenWishList && !props.Account && (
              <div
                ref={boxRef}
                class="bg-white border-solid border-blue-100 border text-blue-900 rounded-md px-4 pb-4 pt-2 mt-2 shadow-lg mr-2 md:mr-11 lg:mr-[55px] xl:mr-24"
              >
                <div class="grid grid-cols-3">
                  <h3 class="col-start-2 col-end-3 text-center text-2xl font-bold pb-3">
                    Wish List
                  </h3>
                  <button
                    onClick={() => {
                      props.updateIsOpenWishList(!props.OpenWishList);
                    }}
                    class="col-start-3 col-end-4 items-center pb-2"
                  >
                    <img
                      src="https://www.svgrepo.com/show/506172/cross.svg"
                      class="w-[25px] h-[25px] object-end ml-28 md:w-[17px] md:h-[17px] md:ml-24"
                    />
                  </button>
                </div>
                <h5 class="text-center my-56 md:my-44 text-xl md:text-[15px] w-[400px] md:w-[350px]">
                  Please Login First !
                </h5>
              </div>
            )}

            {props.OpenWishList && props.Account && (
              <div
                ref={boxRef}
                class="bg-white border-solid border-blue-100 border rounded-md px-4 pb-4 pt-2 mt-2 shadow-lg flex justify-center flex-col text-blue-900 mr-2 md:mr-11 lg:mr-[55px] xl:mr-24"
              >
                <div class="grid grid-cols-3">
                  <h3 class="col-start-2 col-end-3 text-center text-2xl font-bold pb-3">
                    Wish List
                  </h3>
                  <button
                    onClick={() => {
                      props.updateIsOpenWishList(!props.OpenWishList);
                    }}
                    class="col-start-3 col-end-4 items-center pb-2"
                  >
                    <img
                      src="https://www.svgrepo.com/show/506172/cross.svg"
                      class="w-[25px] h-[25px] object-end ml-[110px] md:w-[17px] md:h-[17px] md:ml-24"
                    />
                  </button>
                </div>
                {props.wishItems[props.Account] && (
                  <>
                    <Box
                      ItemChangeIncart={props.updateCart}
                      Items={props.items}
                      ItemChangeInwishlist={props.updateWishList}
                      WishItems={props.wishItems}
                      FreeItems={props.freeItems}
                      CartAccount={props.Account}
                      OpenCart={props.OpenCart}
                    />
                  </>
                )}
              </div>
            )}

            {props.OpenCart && !props.Account && (
              <div
                ref={boxRef}
                class="bg-white border-solid border-blue-100 border text-blue-900 rounded-md px-4 pb-4 pt-2 mt-2 shadow-lg"
              >
                <div class="grid grid-cols-3">
                  <h3 class="col-start-2 col-end-3 text-center text-2xl font-bold pb-3">
                    Shop Cart
                  </h3>
                  <button
                    onClick={() => {
                      props.updateIsOpenCart(!props.OpenCart);
                    }}
                    class="col-start-3 col-end-4 items-center pb-2"
                  >
                    <img
                      src="https://www.svgrepo.com/show/506172/cross.svg"
                      class="w-[25px] h-[25px] object-end ml-28 md:w-[17px] md:h-[17px] md:ml-24"
                    />
                  </button>
                </div>
                <h5 class="text-center my-56 md:my-44 text-xl md:text-[15px] w-[400px] md:w-[350px]">
                  Please Login First !
                </h5>
              </div>
            )}

            {props.OpenCart && props.Account && (
              <div
                ref={boxRef}
                class="bg-white border-solid border-blue-100 border rounded-md px-4 pb-4 pt-2 mt-2 shadow-lg flex justify-center flex-col text-blue-900"
              >
                <div class="grid grid-cols-3">
                  <h3 class="col-start-2 col-end-3 text-center text-2xl font-bold pb-3">
                    Shop Cart
                  </h3>
                  <button
                    onClick={() => {
                      props.updateIsOpenCart(!props.OpenCart);
                    }}
                    class="col-start-3 col-end-4 items-center pb-2"
                  >
                    <img
                      src="https://www.svgrepo.com/show/506172/cross.svg"
                      class="w-[25px] h-[25px] object-end ml-[110px] md:w-[17px] md:h-[17px] md:ml-24"
                    />
                  </button>
                </div>
                {props.items[props.Account] && (
                  <>
                    <Box
                      ItemChangeIncart={props.updateCart}
                      Items={props.items}
                      ItemChangeInwishlist={props.updateWishList}
                      WishItems={props.wishItems}
                      FreeItems={props.freeItems}
                      CartAccount={props.Account}
                      OpenCart={props.OpenCart}
                    />
                    {props.items[props.Account] &&
                      props.freeItems[props.Account] &&
                      (props.items[props.Account].length > 0 ||
                        props.freeItems[props.Account].length > 1) && (
                        <ButtonLink
                          to="Checkout"
                          BtnName={
                            <button
                              class="bg-blue-200 mt-4 text-xl md:text-base ml-[135px] w-[130px] h-[45px] md:w-[110px] md:h-[35px] md:ml-[125px] font-bold rounded-xl shadow-md hover:bg-blue-300 hover:shadow-none active:bg-blue-400"
                              onClick={() => {
                                props.updateIsOpenCart(!props.OpenCart);
                              }}
                            >
                              Get Total
                            </button>
                          }
                        />
                      )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-20 flex justify-evenly">
        {dropdownLinks
          .filter((item) => item.Parent === item.id)
          .map((bigcategorie) => (
            <li
              key={bigcategorie.id}
              className="list-none group relative cursor-pointer"
            >
              <Link
                to={`/${bigcategorie.Name}`}
                className="flex items-center gap-[2px] py-2 font-bold text-lg bg-white text-black px-3 rounded-md transition-colors duration-300 hover:bg-blue-500 hover:text-white transition-delay-150"
              >
                <span>
                  <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                </span>
                {bigcategorie.Name}
              </Link>
              <div className="absolute z-[9999] hidden group-hover:block w-[400px] rounded-md bg-white p-2 text-black shadow-md">
                <ul>
                  {dropdownLinks
                    .filter(
                      (item) =>
                        item.Parent === bigcategorie.id &&
                        item.Parent !== item.id
                    )
                    .map((smallCategory) => (
                      <li key={smallCategory.id}>
                        <Link
                          className="font-bold text-lg text-gray-500 hover:text-blue-500"
                          to={`/${bigcategorie.Name}/${smallCategory.Name}`}
                        >
                          {smallCategory.Name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </li>
          ))}
      </div>
    </div>
  );
}

export default Header;
