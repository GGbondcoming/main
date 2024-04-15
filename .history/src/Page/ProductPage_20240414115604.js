import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { item } from './Component/product';
import withLoader from "./Component/withLoader"
import Breadcrumb from "./Component/Breadcrumb"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ProductPage = (props) => {
  const [amount, setAmount] = useState(1);
  const { productPage } = useParams();
  const decodedProductPage = decodeURIComponent(productPage);
  const product = item.find((i) => i.name === decodedProductPage);

  if (!product) {
    return <div>Product not found</div>;
  }

  const breadcrumbItems = [
    { text: 'Home', href: '/' },
    { text: product.bigcategories, href: `/${product.bigcategories}` },
    { text: product.smallcategories, href: `/product/${product.smallcategories}` },
    { text: product.name }
  ];

  return (
    <section className="text-gray-700 overflow-hidden bg-white font-[sans-serif]">
      
      <div className="container px-5 py-24 mx-auto">
      <div className="text-4xl font-extrabold text-gray-800 mb-12">
        <Breadcrumb items={breadcrumbItems} />
      </div>
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            src={product.picture}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.bigcategories}</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.name}</h1>
            <div className="flex mb-4">
              <Link className="text-gray-600 ml-3">4 Reviews</Link>
            </div>
            <p className="leading-relaxed">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
              <div className="flex">
                <span className="mr-3">Unit</span>
                <span className="mr-4">{product.unit}</span>
              </div>
            </div>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
              <span className="title-font font-medium text-2xl text-gray-900">${product.price}</span>
              <button className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none rounded hover:bg-white hover:text-blue-500 hover:border-blue-500 hover:scale-110 transition duration-300 ease-in-out"
               onClick={() => {
                let newData = { ...props.items };
                let acn = props.Account;
                console.log(newData);
                if (acn) {
                  let PNameArr = [];
                  newData[acn]["Cart"].forEach((c) => {
                    PNameArr.push(c.name);
                  });
                  console.log(PNameArr);
                  if (PNameArr.includes(product.name)) {
                    for (
                      let i = 0;
                      i < newData[acn]["Cart"].length;
                      i++
                    ) {
                      if (newData[acn]["Cart"][i].name === product.name) {
                        newData[acn]["Cart"][i].qty += 1;
                        props.updateCart(newData[acn]["Cart"][i]);
                      }
                    }
                  } else {
                    props.updateCart(product);
                  }
                }
                props.updateIsOpenCart(true);
              }}>Add to cart</button>
            </div>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
              <FontAwesomeIcon icon="fa-light fa-truck" />
              <span>Home Delivery</span> 
              <FontAwesomeIcon icon="fa-regular fa-gift" />
              <span>Click & Collect</span>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default withLoader(ProductPage);



