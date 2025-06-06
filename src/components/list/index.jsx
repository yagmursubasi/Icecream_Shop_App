import { useEffect, useState } from "react";
import api from "../../utils/api";
import Loader from "../loader";
import Error from "../error";
import Card from "./Card";
const List = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    api
      .get("/ice-creams")
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="mt-[30px] lg:mt-[120px] ">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error info={error} />
      ) : (
        data && (
          <div className="grid mt-[30px] gap-[15px] lg:gap-[30px] md:grid-cols-2 2xl:grid-cols-3">
            {data.map((item) => (
              <div key={item.id}>
                <Card item={item} />{" "}
              </div>
            ))}{" "}
          </div>
        )
      )}
    </div>
  );
};

export default List;
