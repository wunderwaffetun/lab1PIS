import { store } from "../../redux/store";
import { useState } from "react";
import { ItemsList } from "./ItemList";


export function ProductsCurrentModule() { 
    // Этот элемент одинаково работает на Online, Offline, Debt страницах (использутеся обычный выбор продуктов для покупки)
    // Но на странице бартер поведение будет отличаться, там будут товары которые меняют и на которые меняют, соотсветсвенно и
    // в стэйте должны быть под это отдельные переменные 
    const [chosenProducts, setChosenProducts] = useState([])

    store.subscribe(() => {
        setChosenProducts(store.getState().globals.products) 
    })


    return <div className={`products-current-module ${chosenProducts['length'] ? null : 'empty'}`}>
        {
            chosenProducts['length'] ? null : (
                <span> Пусто</span>
            )
        }
        <ItemsList list={chosenProducts} arr={'chosen'}></ItemsList>
    </div>;
}


