import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import {
  isTodayPublicHolidays,
  nextPublicHolidays,
  publicHolidays,
} from "./thunk";
import { PublicHolidays } from "../types";

const arrayThunks = [publicHolidays, isTodayPublicHolidays, nextPublicHolidays];

type ThunkStatus = "pending" | "fulfilled" | "rejected";

type FuncReturnType = (typeof arrayThunks)[number][ThunkStatus][];

const fn = (status: ThunkStatus): FuncReturnType =>
  arrayThunks.map((el) => el[status]);

interface State {
  country: string | null;
  year: number | null;
  publicHolidays: PublicHolidays[];
  isTodayHoliday: boolean;
  loading: boolean;
  error: null | string | unknown;
}

const initialState: State = {
  country: null,
  year: null,
  publicHolidays: [],
  isTodayHoliday: false,
  loading: false,
  error: null,
};

const publicHolidaysReducer = createSlice({
  name: "holidays",
  initialState,
  reducers: {
    setCountry: (
      state,
      action: PayloadAction<{ country: string; year: number }>
    ) => {
      state.country = action.payload.country;
      state.year = action.payload.year;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(publicHolidays.fulfilled, nextPublicHolidays.fulfilled),
        (state, action) => {
          state.loading = false;
          state.error = null;
          state.publicHolidays = action.payload;
        }
      )
      .addMatcher(isAnyOf(...fn("pending")), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(isAnyOf(...fn("rejected")), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCountry } = publicHolidaysReducer.actions;
export default publicHolidaysReducer.reducer;
