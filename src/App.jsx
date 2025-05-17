import Header from "./components/header";
import Home from "./pages/home";

const App = () => {
  return (
    <div className="min-h-screen bg-[#af5433] text-white py-[30px] 2xl:py-[50px] px-[5%]">
      <Header />

      <Home />
    </div>
  );
};

export default App;
