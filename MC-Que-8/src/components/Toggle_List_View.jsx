import React, { useState, useEffect } from "react";
import { MdViewList } from "react-icons/md";
import { HiViewGrid } from "react-icons/hi";

const productsList = [
  {
    id: 1,
    name: "Product 1",
    price: "$99",
    image:
      "https://productplaceholder.com/_next/image?url=https%3A%2F%2Fprd.place%2F300%2F300%3Fid%3D12%26p%3D30&w=384&q=75",
  },
  {
    id: 2,
    name: "Product 2",
    price: "$49",
    image:
      "https://productplaceholder.com/_next/image?url=https%3A%2F%2Fprd.place%2F300%2F300%3Fid%3D17%26p%3D30&w=384&q=75",
  },
  {
    id: 3,
    name: "Product 3",
    price: "$79",
    image:
      "https://productplaceholder.com/_next/image?url=https%3A%2F%2Fprd.place%2F320%2F320%3Fid%3D18%26p%3D30&w=384&q=75",
  },
  {
    id: 4,
    name: "Product 4",
    price: "$129",
    image:
      "https://productplaceholder.com/_next/image?url=https%3A%2F%2Fprd.place%2F320%2F320%3Fid%3D19%26p%3D30&w=384&q=75",
  },
  {
    id: 5,
    name: "Product 5",
    price: "$199",
    image:
      "https://productplaceholder.com/_next/image?url=https%3A%2F%2Fprd.place%2F320%2F320%3Fid%3D30%26p%3D30&w=384&q=75",
  },
  {
    id: 6,
    name: "Product 6",
    price: "$29",
    image:
      "https://productplaceholder.com/_next/image?url=https%3A%2F%2Fprd.place%2F320%2F320%3Fid%3D38%26p%3D30&w=384&q=75",
  },
  {
    id: 7,
    name: "Product 7",
    price: "$59",
    image:
      "https://productplaceholder.com/_next/image?url=https%3A%2F%2Fprd.place%2F320%2F320%3Fid%3D44%26p%3D30&w=384&q=75",
  },
];

const Toggle_List_View = () => {
  const [isGridView, setIsGridView] = useState(false);

  // Load user preference from local storage on initial render
  useEffect(() => {
    const savedView = localStorage.getItem("viewPreference");
    if (savedView) {
      setIsGridView(savedView === "grid");
    }
  }, []);

  // Save user preference to local storage
  useEffect(() => {
    localStorage.setItem("viewPreference", isGridView ? "grid" : "list");
  }, [isGridView]);

  const toggleView = () => {
    setIsGridView(!isGridView);
  };
  return (
    <>
      <div className="app">
        <button id="toggleViewBtn" onClick={toggleView}>
          {isGridView ? (
            <>
              <MdViewList /> List View
            </>
          ) : (
            <>
              <HiViewGrid /> Grid View
            </>
          )}
        </button>
        <div
          className={`product-container ${
            isGridView ? "grid-view" : "list-view"
          }`}
        >
          {productsList.map((product) => (
            <div key={product.id} className="product">
              <img src={product.image} alt={product.name} />
              <div className="details">
                <h3>{product.name}</h3>
                <p>{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Toggle_List_View;
