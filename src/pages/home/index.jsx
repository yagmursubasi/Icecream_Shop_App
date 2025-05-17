import CardButton from "../../components/buttons/cardButton";
import TrendButton from "../../components/buttons/TrendButton";
import Hero from "../../components/hero";
import List from "../../components/list";

const Home = () => {
  return (
    <div>
      <Hero />

      <CardButton />
      <TrendButton />

      <List />
    </div>
  );
};

export default Home;
