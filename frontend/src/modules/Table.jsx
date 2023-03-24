import React from "react";

export function Table({ list, Component, columns }) { // Выводит кастомную таблицу
    return (
      <table className="striped">
        <thead>
          <tr>
            {
              columns.map( column => {
                return <th key={Math.random()}>{ column }</th>
              })
            }
          </tr>
        </thead>
  
        <tbody>
          {list.map(( item ) => (
            <Component data={ item } key={ item.id } />
          ))}
        </tbody>
      </table>
    );
  }