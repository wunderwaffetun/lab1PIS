import React from "react";
import { useGetUsersQuery, useGetProductsQuery } from "../redux/api";
import { ChoseModule } from "../modules/ordersModules/ChooseModule";
import { ClientCurrent } from "../modules/ordersModules/ClientCurrent";
import { ProductsCurrentModule } from "../modules/ordersModules/ProductCurrent";
import { SendButton } from "../modules/SendButton";


export default function Offline() {


  return (
    <>
      <ChoseModule dataExtractor={useGetProductsQuery} arr={'products'} name="Товары" />
      <ChoseModule dataExtractor={useGetUsersQuery} arr={'users'} name="Имя" />
      <div className="matters-order data-module">
        <ClientCurrent />
        <ProductsCurrentModule />
        <SendButton />

      </div>
    </>
  );
}
