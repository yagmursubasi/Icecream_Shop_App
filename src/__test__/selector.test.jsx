import { render, screen } from "@testing-library/react";
import Selector from "../components/list/Selector";
import userEvent from "@testing-library/user-event";

describe("selector bileşeni", () => {
  const mockFn = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Cornet seçilince butonun arka planı değişir ", () => {
    render(<Selector selectedType={"cornet"} handleType={mockFn} />);

    //cornet butonunda seçili elemanın class'ı vardır
    const cornetBtn = screen.getByRole("button", { name: /külahta/i });
    expect(cornetBtn).toHaveClass("bg-white text-black");
    //cup butonunda seçili elemanın class'ı yoktur
    const cupBtn = screen.getByRole("button", { name: /bardakta/i });
    expect(cupBtn).not.toHaveClass("bg-white text-black");
  });

  it("Cup seçilince butonun arka planı değişir ", () => {
    render(<Selector selectedType={"cup"} handleType={mockFn} />);

    //cup butonunda seçili elemanın class'ı vardır
    const cupBtn = screen.getByRole("button", { name: /bardakta/i });
    expect(cupBtn).toHaveClass("bg-white text-black");
    //cornet butonunda seçili elemanın class'ı yoktur
    const cornetBtn = screen.getByRole("button", { name: /külahta/i });
    expect(cornetBtn).not.toHaveClass("bg-white text-black");
  });

  it("Butona tıklanınca fonksiyon doğru parametrelerle çalışır ", async () => {
    //userevent kurulum
    const user = userEvent.setup();

    //bileşeni renderla
    render(<Selector selectedType={"cup"} handleType={mockFn} />);

    //gerekli butonları çağır
    const cupBtn = screen.getByRole("button", { name: /bardakta/i });
    const cornetBtn = screen.getByRole("button", { name: /külahta/i });

    //bardakta butonuna tıkla
    await user.click(cupBtn);

    //fonksiyon "cup" parametresi ile çalıştı mı
    expect(mockFn).toHaveBeenCalledWith("cup");

    //külahta butonuna tıkla
    await user.click(cornetBtn);

    //fonksiyon "cornet" parametresi ile çalıştı mı
    expect(mockFn).toHaveBeenCalledWith("cornet");
  });
});
