import HeroBrand from "./HeroBrand";
import HeroCard from "./HeroCard";

const Hero = () => {
  return (
    <div className="mt-[30px] ">
      {/* Tam ekran kaplayan üst alan */}
      <HeroBrand />

      {/* Grid alanında sadece bir HeroCard */}
      <div className="mt-[30px] flex flex-col lg:flex-row gap-[30px]">
        <HeroCard />
      </div>
    </div>
  );
};

export default Hero;
