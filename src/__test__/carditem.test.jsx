import { render, screen } from "@testing-library/react";
import CardItem from "../components/modal/CardItem";
import AmountPicker from "../components/modal/AmountPicker";
import { mockItem } from "../utils/constatnts";

//amountpicker'ın testlerini ayrı olarak yapacağımız için carditem testlerini etkilememsi için amount-picker'ı mockladık
jest.mock("../components/modal/AmountPicker");

it("carditem bileşeni gelen propu doğru şekilde kullanır", () => {
  render(<CardItem item={mockItem} />);

  screen.getByText(mockItem.name);
  screen.getByText(mockItem.type);
  screen.getByText(mockItem.price * mockItem.amount + "₺");
  const img = screen.getByRole("img");
  expect(img).toHaveAttribute("src", mockItem.image);
});
