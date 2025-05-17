import { render, screen } from "@testing-library/react";
import { mockItem } from "../utils/constatnts";
import AmountPicker from "../components/modal/AmountPicker";
import { useDispatch } from "react-redux";
import userEvent from "@testing-library/user-event";
import { addToCard, deleteFromCard } from "../redux/cardSlice";

//useDiapatch mockla
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("Amount Picker", () => {
  // useDispatch'in döndürdüğü dispatch methodunu mockla
  const dispatchMock = jest.fn();

  // her test öncesinde sahte useDispatch çağrılınca sahte dispatch return edilsin
  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock);
  });

  // her test sonrasında bütün mockları sıfırla
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("miktar değeri gelen propa göre doğru şekilde ekrana basılır", () => {
    render(<AmountPicker item={mockItem} />);
    screen.getByText("4");
  });

  test("- butonuna tıklanınca doğru aksiyon tetiklenir", async () => {
    const user = userEvent.setup();
    render(<AmountPicker item={mockItem} />);

    const dltBtn = screen.getByRole("button", { name: "-" });

    // - butonuna tıkla
    await user.click(dltBtn);

    expect(dispatchMock).toHaveBeenCalledWith(deleteFromCard(mockItem));
  });

  test("+ butonuna tıklanınca doğru aksiyon tetiklenir", async () => {
    const user = userEvent.setup();
    render(<AmountPicker item={mockItem} />);

    const addBtn = screen.getByRole("button", { name: "+" });

    // - butonuna tıkla
    await user.click(addBtn);

    expect(dispatchMock).toHaveBeenCalledWith(
      addToCard({ item: mockItem, selectedType: mockItem.type })
    );
  });
});
