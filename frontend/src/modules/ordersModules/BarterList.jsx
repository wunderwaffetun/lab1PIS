import { addBarterFrom, addBarterTo, delChosenProduct } from "../../redux/globalData";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


import { BarterItem } from "./BarterItem";

export function BarterList({ list, visible, arr, reduceVolume=false }) {
    //Из ChoseBarter приходит список продуктов с сервера, а из barter модулей должны приходить изменяемые списки со стейта
    const dispatch = useDispatch();
    
    
    const curArr = useSelector(state => state.globals.activeComponent)
    let cbDispatch = Function.prototype
    if (!reduceVolume) {
      cbDispatch= curArr === 'barterFrom' ? addBarterFrom : addBarterTo
    } else { 
      cbDispatch = delChosenProduct
    }

  
    return (
      <ul className="collection">
        {list.map((item) => {
          return (
            <BarterItem
              key={item.id}
              id={item.id}
              name={item.name}
              dispatch={dispatch}
              cbDispatch={cbDispatch}
              arr={arr}
              visible={visible}
            />
          );
        })}
      </ul>
    );
  }