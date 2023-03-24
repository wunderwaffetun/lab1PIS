import { store } from "../../redux/store";
import { useState } from "react";

export function ModuleItem({ name, dispatch, cbDispatch, id, arr, data=false }) {
  const [quantity, setQuantity] = useState(1);
  store.subscribe(() => {
    const products = store.getState().globals.products;
    const product = products.find((product) => product.id === id);
    if (product) setQuantity(product.quantity);
  });

  return (
    <li
      className="collection-item"
      onClick={() => {
        console.log('hello')
        dispatch(cbDispatch({ id, name, arr }));
      }}
    >
      <span className="name-product">{name}</span>
      <span className="quantity">{arr === "chosen" && quantity}</span>
    </li>
  );
}
