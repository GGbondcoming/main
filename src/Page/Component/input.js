import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { item } from "./product.js";

const Inputbox = function () {
  const [Word, setWord] = useState("");
  const [IsBtnVisible, setIsBtnVisible] = useState(false);
  const [IsSerachBtn, setIsSerachBtn] = useState(false);
  const [ResultName, setResultName] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(true);

  function InputName(name) {
    setWord(name.target.value);
  }

  useEffect(() => {
    const InputKey = Word.replace(" ", "").toLowerCase();
    const NameArr = [];
    item.map((p) => {
      if (
        p.name.replace(" ", "").toLowerCase().indexOf(InputKey) !== -1 &&
        InputKey !== ""
      ) {
        NameArr.push(p.name);
      }
    });
    setIsBtnVisible(true);
    setResultName(NameArr);
  }, [Word]);

  function ProductBtnOnClick() {
    setWord("");
    setResultName([]);
    setIsBtnVisible(false);
    setIsSerachBtn(false);
  }

  const inputRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setWord("");
        setResultName([]);
        setIsBtnVisible(false);
        setIsSerachBtn(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    setWord("");
    setResultName([]);
    setIsBtnVisible(false);
    setIsSerachBtn(false);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [Word]);

  return (
    <div ref={inputRef}>
      <div class="flex">
        <div>
          <div class="pt-5 h-auto w-6 m-2 hidden lg:block">
            <img src="/SerachBtn.png" />
          </div>
        </div>
        <div class="pt-7 block lg:hidden z-50">
          <button
            onClick={() => {
              setIsSerachBtn(!IsSerachBtn);
            }}
          >
            <div class="h-auto w-6 ml-2 ">
              <img src="/SerachBtn.png" />
            </div>
          </button>
          {IsSerachBtn && (
            <div class="flex flex-col pt-1 lg:hidden">
              <input
                onChange={(b) => InputName(b)}
                placeholder="Search here . . ."
                class="text-lg h-10 w-[300px] mx-1 p-2 border-2 rounded border-blue-700"
              ></input>
              {ResultName.length > 0 && IsBtnVisible && (
                <div class="bg-white z-50 rounded-md shadow-lg pt-2 ">
                  <div class="flex flex-col">
                    {isLoading ? (
                      <img
                        src="https://www.dcinfotech.com/html/admin/uploads/blog/1577516586loading.gif"
                        class="w-[50px] h-auto ml-3"
                      />
                    ) : (
                      <div class="overflow-scroll h-96">
                        {ResultName.length > 0 && (
                          <ul
                            class="text-lg text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownDelayButton"
                          >
                            {ResultName.map((n) => {
                              return (
                                <li>
                                  <Link
                                    key={n}
                                    onClick={() => {
                                      ProductBtnOnClick();
                                    }}
                                    to={`/products/${n}`}
                                    class="pb-2 border-b-2 border-grey block w-72 px-4 py-2 text-blue-900 hover:bg-blue-100 active:bg-blue-200 cursor-pointer rounded-md"
                                  >
                                    {n}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div class="hidden lg:block">
          <div class="flex flex-col pt-6 ">
            <input
              onChange={(b) => InputName(b)}
              value={Word}
              placeholder="Search here . . ."
              class="w-64 lg:w-72 border-2 border-blue-700  rounded-full bg-blue-800 text-white px-5 py-1 opacity-80 text"
            ></input>
            {ResultName.length > 0 && IsBtnVisible && (
              <div class="bg-white z-50 rounded-md shadow-lg pt-2 ">
                <div class="flex flex-col">
                  {isLoading ? (
                    <img
                      src="https://www.dcinfotech.com/html/admin/uploads/blog/1577516586loading.gif"
                      class="w-[50px] h-auto ml-2 py-3"
                    />
                  ) : (
                    <div class="overflow-scroll h-96">
                      {ResultName.length > 0 && (
                        <ul
                          class="py-2 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="dropdownDelayButton"
                        >
                          {ResultName.map((n) => {
                            return (
                              <li>
                                <Link
                                  key={n}
                                  onClick={() => {
                                    ProductBtnOnClick();
                                  }}
                                  to={`/products/${n}`}
                                  class="block w-72 px-4 py-2 text-blue-900 hover:bg-blue-100 active:bg-blue-200 cursor-pointer rounded-md"
                                >
                                  {n}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inputbox;
