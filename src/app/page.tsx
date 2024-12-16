import Header from "./_components/Header";
import Categories from "./_components/Categories";
import RecomendedList from "./_components/RecomendedList";
import ListProductsByCategory from "./_components/ListProductsByCategory";
import SearchInput from "./_components/SearchInput";
import Upload from "./_components/Upload";

export default function Home() {
  return (
    <>
      <Header />
      <SearchInput />
      <Categories />
      <RecomendedList />
      <ListProductsByCategory />
    </>
  );
}
