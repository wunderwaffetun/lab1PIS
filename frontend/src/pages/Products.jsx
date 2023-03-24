import React from "react";
import { useGetProductsQuery } from "../redux/api";
import Preloader from "../modules/Preloader";
import Product from "../modules/Product";
import Searcher from "../modules/Searcher";
import { useInterval } from "../hooks/useInterval";
import { Table } from "../modules/Table";
import { useSearch } from "../hooks/useSearch";





export default function Products() {
  const { data, isLoading, refetch } = useGetProductsQuery()
  const [ filteredUsers, handleSearcher ] = useSearch(data?.products, '/products/')
  

  useInterval(refetch, 3000)


  return (
    <>
        <Searcher cb={handleSearcher} placeholder={'Товар'} />
        {
            isLoading ? (
                <Preloader />
          ) : ( <Table list={filteredUsers} Component={Product} columns={['ID', 'Name', 'Count', 'Cost']} /> )
        }
      
    </>
  );
}
