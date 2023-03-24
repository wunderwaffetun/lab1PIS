import React, { useEffect } from "react";
import { useGetOperationsQuery } from "../redux/api";
import Preloader from "../modules/Preloader";
import Hist from "../modules/Hist";
import { useInterval } from "../hooks/useInterval";

export default function Products() {
  const { data, isLoading, refetch } = useGetOperationsQuery()


  useEffect(() => {
    refetch()
  }, [])

  return (
    <>
        {
            isLoading ? (
                <Preloader />
              ) : (
                <table className="striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Type</th>
                        <th>User Name</th>
                        <th>Purchase</th>
                        <th>Contribution</th>
                        <th>Barter</th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        data.operations.map((productData) => {
                            console.log(productData)
                        return <Hist data={productData} key={Math.random()}></Hist>;
                        }
                    )}
                    </tbody>
                </table>
              )
        }
      
    </>
  );
}
