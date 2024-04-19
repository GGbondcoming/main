import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Page/Header.js";
import Footer from "./Page/Footer.js";
import Home from "./Page/Home.js";
import ProductPage from "./Page/ProductPage.js";
import Checkout from "./Page/Checkout.js";
import Signin from "./Page/Signin.js";
import Signup from "./Page/Signup.js";
import { item } from "./Page/Component/product.js";
import CategoriesPage from "./Page/Component/categoriesPage.js";
import SmallCategoriesPage from "./Page/Component/smallCategoriesPage.js";
import ScrollButton from "./Page/Component/ScrollBtn.js";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase/firebase.js";

const listRef = collection(db, "PNS");

// Cart firebase data

const docCart = doc(db, "PNS", "Cart");
const savedCart = await getDoc(docCart);
let getCart = savedCart.data();
if (savedCart.exists()) {
  if (Object.keys(getCart).length === 0) {
    let Data = {};
    await setDoc(doc(listRef, "Cart"), {
      Data,
    });
    getCart = { Data: {} };
  }
} else {
  getCart = { Data: {} };
}

// WishList firebase data

const docWishList = doc(db, "PNS", "WishList");
const savedWishList = await getDoc(docWishList);
let getWishList = savedWishList.data();
if (savedWishList.exists()) {
  if (Object.keys(getWishList).length === 0) {
    let Data = {};
    await setDoc(doc(listRef, "WishList"), {
      Data,
    });
    getWishList = { Data: {} };
  }
} else {
  getWishList = { Data: {} };
}

// FreeProductList firebase data

const docFreeList = doc(db, "PNS", "FreeList");
const savedFreeList = await getDoc(docFreeList);
let getFreeList = savedFreeList.data();
if (savedFreeList.exists()) {
  if (Object.keys(getFreeList).length === 0) {
    let Data = {};
    await setDoc(doc(listRef, "FreeList"), {
      Data,
    });
    getFreeList = { Data: {} };
  }
} else {
  getFreeList = { Data: {} };
}

let saveAcc = JSON.parse(localStorage.getItem("Account"));
let SaveAcc = saveAcc;
if (!SaveAcc) {
  SaveAcc = [];
}

export default function App() {
  const [cartData, setCartData] = useState(getCart["Data"]);
  const [wishListData, setWishListData] = useState(getWishList["Data"]);
  const [freeListData, setFreeListData] = useState(getFreeList["Data"]);
  const [Account, setAccount] = useState(SaveAcc);
  const [IsOpenCart, setIsOpenCart] = useState(false);
  const [IsOpenWishList, setIsOpenWishList] = useState(false);
  const [temperature, setTemperature] = useState("");
  const [weather, setWeather] = useState("");

  //Weather

  useEffect(() => {
    async function fetchData() {
      const weatherAPI =
        "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en";
      const res = await fetch(weatherAPI);
      const weatherData = await res.json();

      const location = weatherData.temperature.data[1].place;
      const temperature = weatherData.temperature.data[1].value;
      const updateTime = weatherData.updateTime;
      const fomatTime = `${updateTime.slice(0, 10)}, ${updateTime.slice(
        11,
        16
      )}`;

      setTemperature(temperature);
      if (temperature < 15) {
        setWeather("cold");
      } else if (temperature > 35) {
        setWeather("hot");
      } else {
        setWeather("normal");
      }
    }

    fetchData();
  }, []);

  // Cart

  async function updateCart(product) {
    let Data = { ...cartData };
    let acn = Account[0];
    if (product === "Paid") {
      Data[acn] = [];
    } else if (!Data[acn]) {
      Data[acn] = [{ ...product, qty: 1 }];
    } else if (acn) {
      let PNameArr = [];
      Data[acn].forEach((c) => {
        PNameArr.push(c.name);
      });
      if (!PNameArr.includes(product.name)) {
        Data[acn].push({ ...product, qty: 1 });
      } else {
        for (let i = 0; i < Data[acn].length; i++) {
          if (
            Data[acn].length > 0 &&
            Data[acn][i].name === product.name &&
            product.qty === 0
          ) {
            Data[acn].splice(i, 1);
          } else if (
            Data[acn].length > 0 &&
            Data[acn][i].name === product.name
          ) {
            Data[acn][i].qty = product.qty;
          }
        }
      }
    }
    await setDoc(doc(listRef, "Cart"), {
      Data,
    });
    setCartData(Data);
  }

  // WishList

  async function updateWishList(product, order) {
    let Data = { ...wishListData };
    let acn = Account[0];

    if (!Data[acn]) {
      Data[acn] = [{ ...product }];
    } else if (acn) {
      let PNameArr = [];
      Data[acn].forEach((c) => {
        PNameArr.push(c.name);
      });
      if (!PNameArr.includes(product.name)) {
        Data[acn].push({ ...product });
      }
      if (order === "Delete") {
        for (let i = 0; i < Data[acn].length; i++) {
          if (Data[acn].length > 0 && Data[acn][i].name === product.name) {
            Data[acn].splice(i, 1);
          }
        }
      }
    }
    await setDoc(doc(listRef, "WishList"), {
      Data,
    });
    setWishListData(Data);
  }

  // FreeList

  async function updateFreeList(order) {
    let Data = { ...freeListData };
    let acn = Account[0];
    if (order === "Paid" && Data[acn]) {
      Data[acn] = ["Played"];
    }
    if (order === "Gift" && Data[acn] && Data[acn].length < 1) {
      Data[acn] = ["Played"];
      Data[acn].push({
        ...item[Math.floor(Math.random() * 36)],
        qty: 1,
      });
      Data[acn].push({
        ...item[Math.floor(Math.random() * 36)],
        qty: 1,
      });
      alert(
        "Thank you for joining us 🥳 \nFor new member, 2 welcome gifts have been ready in your shoppinng cart🎉"
      );
    }
    await setDoc(doc(listRef, "FreeList"), {
      Data,
    });
    setFreeListData(Data);
  }

  // Account Name && FreeList

  async function updateAccount(Acc) {
    let AccCartData = { ...cartData };
    if (!Object.keys(AccCartData).includes(Acc[0]) && Acc.length !== 0) {
      AccCartData[Acc[0]] = [];
      let Data = AccCartData;
      await setDoc(doc(listRef, "Cart"), {
        Data,
      });
      setCartData(AccCartData);
    }
    let AccWishListData = { ...wishListData };
    if (!Object.keys(AccWishListData).includes(Acc[0]) && Acc.length !== 0) {
      AccWishListData[Acc[0]] = [];
      let Data = AccWishListData;
      await setDoc(doc(listRef, "WishList"), {
        Data,
      });
      setWishListData(AccWishListData);
    }
    let AccFreeListData = { ...freeListData };
    if (!Object.keys(AccFreeListData).includes(Acc[0]) && Acc.length !== 0) {
      AccFreeListData[Acc[0]] = [];
      let Data = AccFreeListData;
      await setDoc(doc(listRef, "FreeList"), {
        Data,
      });
      setFreeListData(AccFreeListData);
    }
    localStorage.setItem("Account", JSON.stringify(Acc));
    SaveAcc = Acc;
    setAccount(Acc);
  }

  function updateIsOpenCart(Order) {
    setIsOpenCart(Order);
  }

  function updateIsOpenWishList(Order) {
    setIsOpenWishList(Order);
  }

  return (
    <>
      <BrowserRouter>
        <Header
          updateCart={updateCart}
          updateWishList={updateWishList}
          updateFreeList={updateFreeList}
          updateAccount={updateAccount}
          updateIsOpenCart={updateIsOpenCart}
          updateIsOpenWishList={updateIsOpenWishList}
          items={cartData}
          wishItems={wishListData}
          freeItems={freeListData}
          Account={Account[0]}
          AccountName={Account[1]}
          OpenCart={IsOpenCart}
          OpenWishList={IsOpenWishList}
          temperature={temperature}
          weather={weather}
        />

        <Routes>
          <Route
            index
            element={
              <Home
                updateCart={updateCart}
                updateWishList={updateWishList}
                updateFreeList={updateFreeList}
                updateAccountName={updateAccount}
                items={cartData}
                wishItems={wishListData}
                freeItems={freeListData}
                updateIsOpenCart={updateIsOpenCart}
                updateIsOpenWishList={updateIsOpenWishList}
                Account={Account[0]}
              />
            }
          />
          <Route
            path="Checkout"
            element={
              <Checkout
                updateCart={updateCart}
                items={cartData}
                updateFreeList={updateFreeList}
                freeItems={freeListData}
                Account={Account[0]}
              />
            }
          />
          <Route
            path="Signin"
            element={<Signin updateAccountName={updateAccount} />}
          />
          <Route
            path="Signup"
            element={<Signup updateAccountName={updateAccount} />}
          />
          <Route
            path="/:categoryName"
            element={
              <CategoriesPage
                updateCart={updateCart}
                updateWishList={updateWishList}
                updateAccountName={updateAccount}
                items={cartData}
                wishItems={wishListData}
                updateIsOpenCart={updateIsOpenCart}
                updateIsOpenWishList={updateIsOpenWishList}
                Account={Account[0]}
              />
            }
          />
          <Route
            path="/:categoryName/:smallCategoriesName"
            element={
              <SmallCategoriesPage
                updateCart={updateCart}
                updateWishList={updateWishList}
                updateAccountName={updateAccount}
                items={cartData}
                wishItems={wishListData}
                updateIsOpenCart={updateIsOpenCart}
                updateIsOpenWishList={updateIsOpenWishList}
                Account={Account[0]}
              />
            }
          />
          <Route
            path="/products/:productPage"
            element={
              <ProductPage
                updateCart={updateCart}
                updateWishList={updateWishList}
                updateAccountName={updateAccount}
                items={cartData}
                wishItems={wishListData}
                updateIsOpenCart={updateIsOpenCart}
                updateIsOpenWishList={updateIsOpenWishList}
                Account={Account[0]}
              />
            }
          />
        </Routes>
      </BrowserRouter>
      <Footer />
      <ScrollButton />
    </>
  );
}
