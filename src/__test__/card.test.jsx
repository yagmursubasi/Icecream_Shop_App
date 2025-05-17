import { fireEvent, render, screen } from "@testing-library/react";
import Card from "../components/list/Card";
import { useDispatch } from "react-redux";
import { addToCard } from "../redux/cardSlice";

//useDiapatch mockla
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("Card bileşeni testleri", () => {
  // useDispatch'in döndürdüğü dispatch methodunu mockla
  const dispatchMock = jest.fn();
  const mockItem = {
    name: "Bal Badem",
    image: "/ice-14.png",
    price: 25,
    id: "8350",
  };

  // her test öncesinde sahte useDispatch çağrılınca sahte dispatch return edilsin
  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock);
  });

  // her test sonrasında bütün mockları sıfırla
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("item detaylarını doğru şekilde renderlar", () => {
    render(<Card item={mockItem} />);

    screen.getByRole("heading", { name: "Bal Badem" });
    screen.getByText("₺25 / top");
    expect(screen.getByRole("img")).toHaveAttribute("src", "/ice-14.png");
  });

  it("Tipin seçili olma durumuna göre 'Sepete Ekle' butonunun rengi değişir", () => {
    //card bileşenini renderla
    render(<Card item={mockItem} />);

    //sepete ekle butonunu al
    const cardBtn = screen.getByRole("button", { name: /sepete ekle/i });
    //sepete ekle butonunun yazısı başta beyaz
    expect(cardBtn).toHaveClass("text-white");

    //külahta butonunu al
    const typeBtn = screen.getByRole("button", { name: "Külahta" });
    //külahta butonuna tıkla
    fireEvent.click(typeBtn);
    //sepete ekle butonunun yazısı artık siyah
    expect(cardBtn).toHaveClass("text-black");
    //külahta butonuna tıkla
    fireEvent.click(typeBtn);
    //sepete ekle butonunun yazısı başta beyaz
    expect(cardBtn).toHaveClass("text-white");
  });

  it(" 'Sepete Ekle' butonuna tıklanınca reducer'a haber verir ", () => {
    //bileşeni renderla
    render(<Card item={mockItem} />);

    //bardakta seçeneğini seç
    const typeBtn = screen.getByRole("button", { name: /bardakta/i });
    fireEvent.click(typeBtn);

    //sepete ekle butotnuna tıkla
    const cardBtn = screen.getByRole("button", { name: /sepete ekle/i });
    fireEvent.click(cardBtn);

    //dispatch metodu doğru parametreler ile çalıştı mı?
    expect(dispatchMock).toHaveBeenCalledWith(
      addToCard({ item: mockItem, selectedType: "cup" })
    );
  });
});
