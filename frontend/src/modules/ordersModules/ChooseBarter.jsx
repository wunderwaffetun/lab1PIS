import { useSearch } from "../../hooks/useSearch";
import Preloader from "../Preloader";
import Searcher from "../Searcher";
import { BarterList } from "./BarterList";



export function ChoseBarter({ dataExtractor, arr, name }) {
  // модуль для создания Cписка товаоов и имён на страници orders/...
  const { data, isLoading } = dataExtractor();
  const [filteredUsers, handleSearcher] = useSearch(data?.['products']);

  return (
    <div className="client-module data-module">
      <Searcher cb={handleSearcher} placeholder={name} />
      {isLoading ? <Preloader /> : <BarterList list={filteredUsers} arr={'products'} visible={false} />}
    </div>
  );
}
