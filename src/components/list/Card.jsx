import { useState } from "react";
import Selector from "./Selector";
import { useDispatch } from "react-redux";
import { addToCard } from "../../redux/cardSlice";

const Card = ({ item }) => {
  const dispatch = useDispatch();
  const [selectedType, setSelectedType] = useState(null);
  const handleType = (type) => {
    setSelectedType(type === selectedType ? null : type);
  };
  const handleBasket = () => {
    //store`a haber ver
    dispatch(addToCard({ item, selectedType }));

    //seçeneği temizle
    setSelectedType(null);
  };
  return (
    <div
      className="bg-black/20 border border-white/50 rounded-[24px] pl-[10px] pr-[20px] py-[30px] flex gap-[15px] lg:ap-[30px] "
      data-testid="list-card"
    >
      <div className="flex items-center justify-center">
        <img
          src={item.image}
          className="w-[80px] h-[80px] md:w-[120px] md:h-[120px] drop-shadow-2xl "
        />
      </div>
      <div className="flex-1">
        <h2 className="text-[24px] font-medium text-nowrap ">{item.name} </h2>

        <Selector selectedType={selectedType} handleType={handleType} />
        <div className="flex justify-between mt-5 text-nowrap">
          <p className="text-lg">₺{item.price} / top </p>
          <button
            onClick={() => handleBasket()}
            className={`card-btn cursor-pointer text-nowrap ${
              selectedType ? "text-black" : "text-white"
            }`}
          >
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
