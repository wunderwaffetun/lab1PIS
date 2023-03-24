import { setUser, addChosenProduct, delChosenProduct } from "../../redux/globalData";
import { ModuleItem } from "./ModuleItem";
import { useDispatch } from "react-redux";

export function ItemsList({ list, arr }) {
    const dispatch = useDispatch();
    let cbDispatch = Function.prototype
    
    switch( arr ) {
      case 'users': 
          cbDispatch = setUser
          break
      case 'products': 
          cbDispatch = addChosenProduct
          break
      case 'chosen':
          cbDispatch = delChosenProduct
          break
      default: 
          throw new Error('got unknown arr name')
    }
  
    return (
      <ul className="collection">
        {list.map((item) => {
          return (
            <ModuleItem
              key={item.id}
              id={item.id}
              name={item.name}
              dispatch={dispatch}
              cbDispatch={cbDispatch}
              arr={arr}
            />
          );
        })}
      </ul>
    );
  }