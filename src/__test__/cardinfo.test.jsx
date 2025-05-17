import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CardInfo from "../components/modal/CardInfo";

// Mock'lar
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
  },
}));

// Sahte dispatch
const mockDispatch = jest.fn();
useDispatch.mockReturnValue(mockDispatch);

describe("CardInfo Component", () => {
  const closeMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("tutarlar doğru hesaplanmalı ve ekrana yazılmalı", () => {
    const card = [
      { id: 1, price: 30, amount: 2 },
      { id: 2, price: 20, amount: 1 },
    ]; // subtotal = 80, shipping = 20, total = 100

    render(<CardInfo card={card} close={closeMock} />);

    expect(screen.getByText("Ara Toplam")).toBeInTheDocument();
    expect(screen.getByText("80₺")).toBeInTheDocument();

    expect(screen.getByText("Kargo")).toBeInTheDocument();
    expect(screen.getByText("20 ₺")).toBeInTheDocument();

    expect(screen.getByText("Toplam")).toBeInTheDocument();
    expect(screen.getByText("100₺")).toBeInTheDocument();
  });

  it("100₺ ve üzeri siparişlerde kargo ücretsiz olmalı", () => {
    const card = [{ id: 1, price: 100, amount: 1 }];

    render(<CardInfo card={card} close={closeMock} />);

    expect(screen.getByText("Ücretsiz")).toBeInTheDocument();
  });

  it("Sipariş Ver butonu subTotal 0 iken disabled olmalı", () => {
    const card = [];

    render(<CardInfo card={card} close={closeMock} />);
    const button = screen.getByRole("button", { name: /sipariş ver/i });

    expect(button).toBeDisabled();
  });

  it("Sipariş Ver butonuna tıklanınca dispatch, toast ve close fonksiyonu çalışmalı", async () => {
    const user = userEvent.setup();
    const card = [{ id: 1, price: 50, amount: 2 }]; // subTotal = 100

    render(<CardInfo card={card} close={closeMock} />);
    const button = screen.getByRole("button", { name: /sipariş ver/i });

    await user.click(button);

    expect(mockDispatch).toHaveBeenCalled(); // createOrder çağrıldı mı
    expect(toast.success).toHaveBeenCalledWith("Ürünleriniz  hazırlanıyor"); // toast çağrıldı mı
    expect(closeMock).toHaveBeenCalled(); // modal kapatma fonksiyonu
  });
});
