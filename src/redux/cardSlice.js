import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
  name: "card",
  initialState: { card: [] },
  reducers: {
    addToCard: (state, { payload }) => {
      //payload olarak gelen ürün sepette zaten var mı ?
      const foundItem = state.card.find(
        (item) =>
          item.id === payload.item.id && item.type === payload.selectedType
      );

      if (foundItem) {
        //eğer sepette aynı elemandan varsa miktarını arttır
        foundItem.amount++;
      } else {
        //eğer sepette aynı elemandan yoksa sepete ekle
        state.card.push({
          ...payload.item,
          type: payload.selectedType,
          amount: 1,
        });
      }

      // console.log(payload);
    },
    deleteFromCard: (state, { payload }) => {
      const index = state.card.findIndex(
        (item) => item.id == payload.id && item.type == payload.type
      );
      if (state.card[index].amount > 1) {
        //eğer miktarı 1'den fazlaysa miktarı azalt
        state.card[index].amount--;
      } else {
        //eğer miktar 1'e eşit ise ürünü kaldır
        state.card.splice(index, 1);
      }
    },
    createOrder: (state) => {
      state.card = [];
    },
  },
});

export const { addToCard, deleteFromCard, createOrder } = cardSlice.actions;
export default cardSlice.reducer;
