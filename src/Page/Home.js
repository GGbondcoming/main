import React, { useEffect, useState } from "react";
import PromotionSlider from "./Component/Slider";
import withLoader from "./Component/withLoader";
import { Link } from "react-router-dom";
import { item } from "./Component/product";
import SlotBtn from "./Component/SlotBtn";
import PromotionBlock from "./Component/PromotionBlock";

const Home = function (props) {
  const [weather, setWeather] = useState("");
  const [randomItems, setRandomItems] = useState([]);

  useEffect(() => {
    async function fetchWeatherData() {
      const weatherAPI =
        "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en";
      const res = await fetch(weatherAPI);
      const weatherData = await res.json();
      const temperature = weatherData.temperature.data[1].value;

      if (temperature < 15) {
        setWeather("cold");
      } else if (temperature > 35) {
        setWeather("hot");
      } else {
        setWeather("normal");
      }
    }

    fetchWeatherData();
  }, []);

  useEffect(() => {
    const category = getRecommendedCategory();
    const filteredItems = item.filter(
      (item) => item.bigcategories === category
    );
    const randomItems = filteredItems
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);
    setRandomItems(randomItems);
  }, [weather]); // Update randomItems when weather changes

  const getRecommendedCategory = () => {
    if (weather === "normal") {
      return "Drink";
    } else if (weather === "cold") {
      return "Snack";
    } else {
      return "Chilled";
    }
  };

  const getRecommendedTitle = () => {
    if (weather === "normal") {
      return (
        <img
          src={
            "https://firebasestorage.googleapis.com/v0/b/generation-group-eshop.appspot.com/o/hot.png?alt=media&token=e465f209-fd0b-4da6-9d1f-922e22a521ae"
          }
          alt={"Hot"}
          className="w-full max-w-4xl mx-auto mt-6 mb-6"
        />
      );
    } else if (weather === "cold") {
      return (
        <img
          src={
            "https://firebasestorage.googleapis.com/v0/b/generation-group-eshop.appspot.com/o/cold.png?alt=media&token=ece45a25-13a1-450b-a5d5-853f580d310b"
          }
          alt={"Cold"}
          className="w-full max-w-5xl mx-auto mt-6 mb-6"
        />
      );
    } else {
      return (
        <img
          src={
            "https://firebasestorage.googleapis.com/v0/b/generation-group-eshop.appspot.com/o/normal.png?alt=media&token=b8929798-e887-4ec7-9b93-4d9ae961cb3f"
          }
          alt={"Cloudy"}
          className="w-full max-w-5xl mx-auto mt-6 mb-6"
        />
      );
    }
  };

  const renderRecommendedProducts = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 mx-auto lg:max-w-6xl max-w-xl md:max-w-full">
        {randomItems.map((filteredItem) => (
          <div
            key={filteredItem.id}
            className="bg-gray-100 rounded-2xl p-6 cursor-pointer hover:-translate-y-2 transition-all relative flex flex-col justify-between"
          >
            <button
              onClick={() => {
                let newData = { ...props.wishItems };
                let acn = props.Account;
                if (!newData[acn] && acn) {
                  newData[acn] = [{ ...filteredItem }];
                  props.updateWishList(newData[acn][0]);
                } else if (acn) {
                  let PNameArr = [];
                  newData[acn].forEach((c) => {
                    PNameArr.push(c.name);
                  });
                  if (!PNameArr.includes(filteredItem.name)) {
                    props.updateWishList(filteredItem);
                  }
                }
                if (!acn) {
                  props.updateIsOpenCart(true);
                } else if (window.innerWidth >= 768) {
                  props.updateIsOpenWishList(true);
                }
              }}
              class="bg-white w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-3 right-3 transition-colors hover:text-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18px"
                class="fill-current text-gray-800 inline-block"
                viewBox="0 0 64 64"
              >
                <path
                  d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                  data-original="#000000"
                ></path>
              </svg>
            </button>
            <Link
              to={`/products/${filteredItem.name}`}
              className="max-lg:w-11/12 w-3/5 h-[220px] overflow-hidden mx-auto aspect-w-16 aspect-h-8"
            >
              <img
                src={filteredItem.picture}
                alt={filteredItem.name}
                className="w-full h-full rounded-xl object-cover"
              />
            </Link>
            <div className="text-center mt-4">
              <h3 className="text-lg font-bold text-gray-800">
                {filteredItem.name}
              </h3>
              <h4 className="text-xl text-gray-700 font-bold mt-2">
                ${filteredItem.price}
              </h4>
              <button
                type="button"
                className="w-full mt-6 px-4 py-3 bg-[#333] hover:bg-[#222] text-white rounded-full"
                onClick={() => {
                  let newData = { ...props.items };
                  let acn = props.Account;
                  if (!newData[acn] && acn) {
                    newData[acn] = [{ ...filteredItem, qty: 1 }];
                    props.updateCart(newData[acn][0]);
                  } else if (acn) {
                    let PNameArr = [];
                    newData[acn].forEach((c) => {
                      PNameArr.push(c.name);
                    });
                    if (PNameArr.includes(filteredItem.name)) {
                      for (let i = 0; i < newData[acn].length; i++) {
                        if (newData[acn][i].name === filteredItem.name) {
                          newData[acn][i].qty += 1;
                          props.updateCart(newData[acn][i]);
                        }
                      }
                    } else {
                      props.updateCart(filteredItem);
                    }
                  }
                  if (!acn) {
                    props.updateIsOpenCart(true);
                  } else if (window.innerWidth >= 768) {
                    props.updateIsOpenCart(true);
                  }
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <PromotionSlider />

      {getRecommendedTitle()}

      <PromotionBlock />

      {renderRecommendedProducts()}

      {!props.Account && (
        <SlotBtn LinkName="/Signin" updateFreeList={props.updateFreeList} />
      )}

      {props.freeItems[props.Account] &&
        props.freeItems[props.Account][0] !== "Played" && (
          <SlotBtn LinkName="/" updateFreeList={props.updateFreeList} />
        )}
    </>
  );
};

export default withLoader(Home);
