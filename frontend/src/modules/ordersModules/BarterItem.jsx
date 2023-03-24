import { store } from "../../redux/store";
import { useState } from "react";

export function BarterItem({ name, dispatch, cbDispatch, id, arr, visible=true }) {
  const [quantity, setQuantity] = useState(1);
  store.subscribe(() => {
    const products = store.getState().globals[arr];
    const product = products.find((product) => product.id === id);
    if (product) setQuantity(product.quantity);
  });

  return (
    <li
      className="collection-item"
      onClick={() => {
        console.log(store.getState().globals)
        dispatch(cbDispatch({ id, name, arr }));
      }}
    >
      <span className="name-product">{name}</span>
      <span className="quantity">{ visible && quantity}</span>
    </li>
  );
}
