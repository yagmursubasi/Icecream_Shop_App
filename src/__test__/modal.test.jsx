import { render, screen } from "@testing-library/react";
import Modal from "../components/modal";
import userEvent from "@testing-library/user-event";
import { useSelector } from "react-redux";
import CardInfo from "../components/modal/CardInfo";
import CardItem from "../components/modal/CardItem";

//renderlarda hata vermemesi için useSelector mocklanır ve test içerinde useSelector çağırılınca ne return etmesi gerektiğini bilir.
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));
//cardinfo ve carditem component'ları modal içerisinde kullaıldığı için ve usedispatck kullanıldığı için hata veriyor şu an modal component'ını test ettiğimiz için cardinfo ve carditem'ı soyutlamamız yani mocklamamız gerekiyor
jest.mock("../components/modal/CardInfo", () => () => <h1>CardInfo</h1>);
jest.mock("../components/modal/CardItem", () => () => <h1>Item</h1>);

describe("Modal Component", () => {
  const closeMock = jest.fn();

  it("isOpen propuna göre modal ekrana basılır", () => {
    //useSelector çağırıldığında sahte useSelector'un store olarak ne dödürnmesi gerktiğini söyleyeceğiz
    useSelector.mockReturnValue({ card: [] });

    // bileşeni renderla ve rerender fonksiyonunu al
    const { rerender } = render(<Modal isOpen={false} close={closeMock} />);

    // modal ekranda yoktur
    expect(screen.queryByTestId("modal")).toBeNull();

    // isOpen true gönderip tekrar renderla
    rerender(<Modal isOpen={true} close={closeMock} />);

    // modal ekranda vardır
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });

  it("x butonuna tıklanınca close fonksiyonu çalışır", async () => {
    //useSelector çağırıldığında sahte useSelector'un store olarak ne dödürnmesi gerktiğini söyleyeceğiz
    useSelector.mockReturnValue({ card: [] });
    //userEvent kurulum
    const user = userEvent.setup();

    render(<Modal isOpen={true} close={closeMock} />);

    //x butonunu al
    const closeBtn = screen.getByTestId("close");
    //x butonuna tıkla
    await user.click(closeBtn);

    //closeMock fonksiyonu çalıştı mı ?
    expect(closeMock).toHaveBeenCalled();
  });

  it("sepetin doluluk durumuna göre ekrana uyarı basılır", () => {
    //useselector çağırılınca sepet dizisi boş return edilmeli
    useSelector.mockReturnValue({ card: [] });

    //bileşeni renderla
    const { rerender } = render(<Modal isOpen={true} close={closeMock} />);

    //ekranda uyarı mesajı vardır
    screen.getByText(/henüz sepete ürün eklenmedi/i);

    //useselector çağırılınca sepet dizisi dolu return edilmeli
    useSelector.mockReturnValue({ card: ["selam"] });

    //bileşeni tekrar render et (sepet dolu)
    rerender(<Modal isOpen={true} close={closeMock} />);

    //ekranda uyarı mesajı yoktur
    expect(screen.queryByText(/henüz sepete ürün eklenmedi/i)).toBeNull();
  });

  it("sepet dolu ise her bir eleman için ekrana carditem basılır", () => {
    //useselelctor çağırılınca dolu dizi döndür
    const cartItems = [
      { id: 1, name: "Ürün 1" },
      { id: 2, name: "Ürün 2" },
    ];
    useSelector.mockReturnValue({ card: cartItems });

    //bileşeni renderla
    render(<Modal isOpen={true} close={closeMock} />);

    //ekrandaki bütün carditem componentlerini al
    const items = screen.getAllByRole("heading", { name: "Item" });

    //items dizisinin uzunluğu 2'dir
    expect(items.length).toBe(2);
  });
});
