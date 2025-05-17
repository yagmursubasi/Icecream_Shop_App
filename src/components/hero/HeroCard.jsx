import { FaStar as Star } from "react-icons/fa";

const HeroCard = () => {
  return (
    <div className="max-w-[900px] mx-auto">
      {/* Kart ve Butonları yan yana hizalamak için ana container */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-10">
        {/* Kart kısmı */}
        <div className="bg-white p-6 rounded-2xl text-black shadow-lg flex-1">
          <div className="flex gap-5 items-center">
            <img
              src="/profile.png"
              alt="Doğan Merel Profil"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-2xl font-semibold">Doğan Merel</h3>
              <div className="flex gap-1 text-yellow-500 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} />
                ))}
              </div>
            </div>
          </div>

          <p className="mt-4 text-gray-700">
            Karşı konulmaz dondurma lezzetlerimizle donmuş mutluluğun tadını
            çıkarın!
          </p>

          {/* Dots svg - Mobilde gösterilebilir */}
          <img
            src="/dots.svg"
            alt="Dots decoration"
            className="mt-4 md:hidden"
          />
        </div>

        {/* Butonlar kısmı */}
        <div className="flex-1">
          <h3 className="text-lg mb-4 font-medium text-amber-100">
            Kategori Seçiniz:
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[3, 2, 1, 4].map((iconNum) => (
              <button
                key={iconNum}
                className="card-btn bg-white/10 hover:bg-white/20 transition-colors p-4 rounded-lg flex justify-center"
              >
                <img
                  src={`/icon-${iconNum}.svg`}
                  alt={`Kategori ${iconNum}`}
                  className="w-8 h-8"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
