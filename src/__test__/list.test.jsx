import { render, screen, waitFor } from "@testing-library/react";
import List from "../components/list";
import api from "../utils/api";
import { mockArray } from "../utils/constatnts";
import Card from "../components/list/Card";

//api modülü mock'la
jest.mock("../utils/api");
//card.jsx bileşeni içerisinde provider/router gibi bağımlılıklar kullanıldığında ve bu bu bağımlılıkların list bileşenine etki etmesi istenildiğinde card bileşeni için mock kullanılır
jest.mock("../components/list/card");

describe("List bileşeni testleri", () => {
  beforeEach(() => {
    //her testin öncesinde önceki testlerden mocklanmış api'a yapılan güncellemeleri temizle
    jest.clearAllMocks();
  });

  it("veri çekilirken ekranda loader vardır", async () => {
    //bu test içerisinde api.get isteği atıldığında olumlu cevap gitsin
    api.get.mockResolvedValueOnce({ data: [] });
    //list bileşenini renderla
    render(<List />);

    //ekranda loader vardır
    screen.getByTestId("list-loader");

    //belirli bir süre sonra ekrandan loader gider
    await waitFor(() => {
      expect(screen.queryByTestId("list-loader")).toBeNull();
    });
  });

  it("api'dan error cevabı gelirse ekrana hata mesajı gelir", async () => {
    //bu test içerisinde api.get isteği atıldığında olumsuz cevap gitsin
    const errMsg = "bağlantı zaman aşımına uğradı";
    api.get.mockRejectedValueOnce(new Error(errMsg));
    //list bileşenini renderla
    render(<List />);

    //api'den cevap gelince ekrana hata component'ı gelir
    await waitFor(() => screen.getByTestId("list-error"));
  });

  it("api'dan başarılı cevabı gelirse ekrana card'lar gelir", async () => {
    //card component' ı çağırılınca ne retun etmeli
    Card.mockImplementation(({ item }) => <div>{item.name}</div>);
    api.get.mockResolvedValueOnce({ data: mockArray });
    //list bileşenini renderla
    render(<List />);

    //veri gelince dizideki her bir nesne için ekrana card gelir
    await waitFor(() => {
      mockArray.forEach((item) => {
        screen.getByText(item.name);
      });
    });
  });
});
