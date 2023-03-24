import React, { useEffect, useState } from "react";
import { useGetUsersQuery, useGetProductsQuery } from "../redux/api";
import { ChoseModule } from "../modules/ordersModules/ChooseModule";
import { ClientCurrent } from "../modules/ordersModules/ClientCurrent";
import { setBarter } from "../redux/globalData";
import { useDispatch } from "react-redux";
import { BarterModule } from "../modules/ordersModules/BarterModule";
import { addBarterTo, addBarterFrom } from "../redux/globalData";
import { ChoseBarter } from "../modules/ordersModules/ChooseBarter";
import { SendButton } from "../modules/SendButton";


export default function Barter() {

  // const [currentArr, setCurrentArr] = useState('barterFrom')
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setBarter(true))
  }, [])

  return (
    <>
      <ChoseBarter dataExtractor={useGetProductsQuery} arr={'products'} name="Имя" />
      <ChoseModule dataExtractor={useGetUsersQuery} arr={'users'} name="Имя" />

      <div className="matters-order data-module">
        <ClientCurrent />
        <div className="barter-block">
          <BarterModule
            name={"barterFrom"}
            cbDispatch={addBarterFrom}
          />
          <BarterModule
            name={"barterTo"}
            cbDispatch={addBarterTo}
          />
        </div>
        <SendButton name={'Trade'} />
      </div>
    </>
  );
}
