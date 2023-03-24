import { useSearch } from "../../hooks/useSearch";
import Preloader from "../Preloader";
import Searcher from "../Searcher";
import { ItemsList } from "./ItemList";



export function ChoseModule({ dataExtractor, arr, name }) {
  // модуль для создания Cписка товаоов и имён на страници orders/...
  const { data, isLoading } = dataExtractor();
  const [filteredUsers, handleSearcher] = useSearch(data?.[arr]);

  return (
    <div className="client-module data-module">
      <Searcher cb={handleSearcher} placeholder={name} />
      {isLoading ? <Preloader /> : <ItemsList list={filteredUsers} arr={arr} />}
    </div>
  );
}
