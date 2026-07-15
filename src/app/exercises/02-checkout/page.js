"use client";
import React from "react";

import DATA from "./data";
import reducer from "./reducer";
import StoreItem from "./StoreItem";
import CheckoutFlow from "./CheckoutFlow";
import "./styles.css";

let readyCart = false;

function CheckoutExercise() {
  const [items, dispatch] = React.useReducer(reducer, []);

  React.useEffect(() => {
    const savedItems = window.localStorage.getItem("saved-items");

    if (savedItems) {
      const itemsToRestore = JSON.parse(
        window.localStorage.getItem("saved-items")
      );
      dispatch({
        type: "restore-items",
        itemsToRestore,
      });
    }
    readyCart = true;
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem("saved-items", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <h1>Neighborhood Shop</h1>

      <main>
        <div className="items">
          {DATA.map((item) => (
            <StoreItem
              key={item.id}
              item={item}
              handleAddToCart={(item) => {
                dispatch({
                  type: "add-item",
                  item,
                });
              }}
            />
          ))}
        </div>

        <CheckoutFlow
          readyCart={readyCart}
          items={items}
          taxRate={0.15}
          handleDeleteItem={(item) =>
            dispatch({
              type: "delete-item",
              item,
            })
          }
        />
      </main>
    </>
  );
}

export default CheckoutExercise;
