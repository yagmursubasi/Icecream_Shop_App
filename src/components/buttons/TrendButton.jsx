const TrendButton = () => {
  return (
    <div className="flex justify-end">
      <button className="bg-white text-black rounded-full px-4 py-1 pr-13 mr-2 flex items-center gap-2 text-[20px] lg:text-[24px] font-semibold relative hover:bg-gray-200 transition shadow-lg shadow-gray-300/90 cursor-pointer">
        Trendler
        <img
          src="./fire.png"
          alt="trend"
          className="w-10 lg:w-12 absolute right-1 bottom-1"
        />
      </button>
    </div>
  );
};

export default TrendButton;
