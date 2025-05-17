import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import CardItem from "./CardItem";
import CardInfo from "./CardInfo";

const Modal = ({ isOpen, close }) => {
  const { card } = useSelector((store) => store);
  return (
    isOpen && (
      <div
        data-testid="modal"
        className="fixed inset-0 bg-black/30 grid place-items-center backdrop-blur"
      >
        <div className="bg-white p-5 rounded-lg w-[90%] md:w-[600px] text-black ">
          <div className="border-b border-gray-300 pb-3 flex justify-between max-md:text-lg font-bold">
            <h1 className="font-semibold">Sipariş</h1>
            <button
              className="border border-gray-300 p-2 rounded-md hover:bg-gray-300/50 transition cursor-pointer"
              onClick={close}
              data-testid="close"
            >
              <IoClose />
            </button>
          </div>
          <div className="py-5 border-b border-gray-300 ">
            {card.length === 0 ? (
              <p className="text-center text-gray-600 text-lg font-semibold">
                Henüz sepete ürün eklenmedi
              </p>
            ) : (
              card.map((item) => <CardItem key={item.id} item={item} />)
            )}
          </div>
          <CardInfo card={card} close={close} />
        </div>
      </div>
    )
  );
};

export default Modal;
