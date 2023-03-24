import { useMemo, useState } from "react";

export function useSearch( arr ) { // Обработчик Поискового элемента ( изменяет url, фильтрует элементы по введённым данным)
    const [ searchValue, setSearchValue ] = useState('')
  
    const handleSearcher = text => {
      setSearchValue(text)
    }
  
    const filteredUsers = useMemo(() => {
      if ( !arr ) return []
      if ( !searchValue ) return arr
      
      return arr.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }, [searchValue, arr]) 
  
    return [filteredUsers, handleSearcher]
  }