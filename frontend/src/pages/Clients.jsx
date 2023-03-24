import React, { useEffect } from "react";
import { useGetUsersQuery } from "../redux/api";
import Preloader from "../modules/Preloader";
import User from "../modules/User";
import Searcher from "../modules/Searcher";
import { useSearch } from "../hooks/useSearch";
import { Table } from "../modules/Table";

import { useInterval } from "../hooks/useInterval";

export default function Clients() {
  const { data, isLoading, refetch } = useGetUsersQuery();
  const [ filteredUsers, handleSearcher ] = useSearch(data?.users, '/')
  
  useInterval(refetch, 3000)
  
  return (
    <>
      <Searcher cb={handleSearcher} placeholder={'Имя'} />
      {
        isLoading ? (
          <Preloader />
        ) : (
          <Table list={filteredUsers} Component={User} columns={['ID', 'Name', 'Debt', 'Loan', 'Remains', 'Money', 'Comment']} /> // Component это рендер-проп
        )
      }
      
    </>
  );
}
