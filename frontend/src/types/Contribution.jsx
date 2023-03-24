import React from "react";
import { useGetUsersQuery, useGetProductsQuery } from "../redux/api";
import { ChoseModule } from "../modules/ordersModules/ChooseModule";
import { ClientCurrent } from "../modules/ordersModules/ClientCurrent";
import { ProductsCurrentModule } from "../modules/ordersModules/ProductCurrent";
import { Money } from "../modules/Money";
import { SendButton } from "../modules/SendButton";


export default function Contribution() {
  return (
    <>
      <ChoseModule dataExtractor={useGetUsersQuery} arr={'users'} name="Имя" />
      <div className="matters-order data-module">
        <ClientCurrent />
        <Money />
        <SendButton name={'Cotribute'} />
      </div>
    </>
  )
}



