import { useDispatch } from "react-redux";
import { addToCard, deleteFromCard } from "../../redux/cardSlice";

const AmountPicker = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex  border-gray-300 border-2 rounded-md">
      <button
        className="px-3 py-1 border-r border-gray-400 font-semibold hover:bg-white/30 transition cursor-pointer"
        onClick={() => dispatch(deleteFromCard(item))}
      >
        -
      </button>
      <span className="w-8 text-center py-1 ">{item.amount}</span>
      <button
        className="px-3 py-1 border-l border-gray-400 hover:bg-white/30 transition cursor-pointer"
        onClick={() => dispatch(addToCard({ item, selectedType: item.type }))}
      >
        +
      </button>
    </div>
  );
};

export default AmountPicker;
