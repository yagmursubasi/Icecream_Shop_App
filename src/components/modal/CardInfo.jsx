import { useDispatch } from "react-redux";
import { createOrder } from "../../redux/cardSlice";
import { toast } from "react-toastify";

const CardInfo = ({ card, close }) => {
  const subTotal = card.reduce(
    (acc, item) => acc + item.price * item.amount,
    0
  );
  const isShippingFree = subTotal >= 100;
  const shipping = isShippingFree || subTotal === 0 ? 0 : 20;
  const total = subTotal + shipping;

  const dispatch = useDispatch();

  //butona tıklanınca
  const handleClick = () => {
    //reducer' haber ver
    dispatch(createOrder());

    //bildirim gönder
    toast.success("Ürünleriniz  hazırlanıyor");
    //modalı kapat
    close();
  };

  return (
    <div className="fs-5 py-5 text-lg">
      <p className="flex justify-between">
        <span className="text-gray-500 font-semibold">Ara Toplam</span>
        <span className="font-semibold text-gray-700">{subTotal}₺</span>
      </p>
      <p className="flex justify-between py-2">
        <span className="text-gray-500 font-semibold">Kargo</span>
        <span className="font-semibold text-gray-700">
          {isShippingFree ? "Ücretsiz" : `${shipping} ₺`}
        </span>
      </p>
      <p className="flex justify-between">
        <span className="text-gray-500 font-semibold">Toplam</span>
        <span className="font-semibold text-gray-700 text-2xl">{total}₺</span>
      </p>
      <button
        disabled={subTotal == 0}
        onClick={handleClick}
        className="bg-[#c84718] text-[#f7f0e4] hover:bg-[#ac3104] mt-4 w-full p-2 rounded-md cursor-pointer "
      >
        Sipariş Ver
      </button>
    </div>
  );
};

export default CardInfo;
