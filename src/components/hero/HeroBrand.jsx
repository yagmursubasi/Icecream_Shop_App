const HeroBrand = () => {
  return (
    <div
      className="relative h-[90vh] w-full max-w-none bg-center bg-cover bg-no-repeat flex items-center justify-center text-center px-4"
      style={{ backgroundImage: `url('/hero.jpeg')` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* İçerik */}
      <div className="relative z-10 flex flex-col items-center gap-6 text-white">
        <h3 className="text-xl lg:text-2xl font-semibold text-[#fef8ec]">
          En iyi dondurma markaları
        </h3>
        <h1 className="text-4xl lg:text-5xl font-bold text-[#fef8ec] max-w-2xl">
          Tüm favorileriniz tek bir yerde.
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 mt-[80px] w-full max-w-sm">
          <button className="w-full py-4 bg-[#8b3a1c] text-white rounded-[10px] hover:bg-[#a85f44] transition">
            Sipariş Et
          </button>
          <button className="w-full py-4 border-2 border-[#8b3a1c] text-[#8b3a1c] bg-white rounded-[10px] hover:bg-[#fef8ec] transition">
            Rezervasyon
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroBrand;
