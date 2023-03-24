import { store } from "../../redux/store";
import { useState } from "react";


export function ClientCurrent() {

    const [ user, setUser ] = useState(null) 

    store.subscribe(() => {
        setUser(store.getState().globals.user)
    })


  return <div className="client-current">
    Клиент: {
        user?.name ?? 'Не выбран'
    }
  </div>;
}