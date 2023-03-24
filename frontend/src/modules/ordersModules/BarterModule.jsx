import { store } from "../../redux/store";
import {  useState } from "react";

import { setActiveComponent } from "../../redux/globalData";
import { useDispatch } from "react-redux";
import { BarterList } from "./BarterList";


export function BarterModule({ name }) {
  // На странице бартер поведение будет отличаться, там будут товары которые меняют и на которые меняют, соотсветсвенно и
  // в стэйте должны быть под это отдельные переменные
  const [chosenProducts, setChosenProducts] = useState([]);
  const [isActive, setIsActive] = useState(name === store.getState().globals.activeComponent);

  const initialClass = `
            products-current-module 
            ${chosenProducts["length"] ? "" : "empty"} 
        `;

  const changeActiveComponent = () => {
    if (name) dispatch(setActiveComponent(name));
  };

  const dispatch = useDispatch();

  store.subscribe(() => {
    setChosenProducts(store.getState().globals[name]);
    setIsActive(name === store.getState().globals.activeComponent)
  });

  return (
    <div className={`${initialClass} ${ isActive ? 'active-field' : '' }`} onClick={changeActiveComponent}>
      {chosenProducts["length"] ? "" : <span>{name || "Пусто"}</span>}
      <BarterList list={chosenProducts}  visible={true} arr={name} reduceVolume={true} />
    </div>
  );
}
