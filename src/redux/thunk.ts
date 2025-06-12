import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/api";
import { PublicHolidays } from "../types";

export const publicHolidays = createAsyncThunk<
  PublicHolidays[],
  { year: number; code: string },
  { rejectValue: unknown }
>("publicHolidays", async ({ year, code }, { rejectWithValue }) => {
  try {
    const response = await api.publicHolidays(year, code);
    return response.data;
  } catch (e) {
    console.error(e);
    return rejectWithValue(e.message);
  }
});
export const isTodayPublicHolidays = createAsyncThunk<
  PublicHolidays,
  { code: string },
  { rejectValue: unknown }
>("isTodayPublicHolidays", async ({ code }, { rejectWithValue }) => {
  try {
    const response = await api.isTodayPublicHolidays(code);
    return response.data;
  } catch (e) {
    console.error(e);
    return rejectWithValue(e.message);
  }
});
export const nextPublicHolidays = createAsyncThunk<
  PublicHolidays[],
  { code: string },
  { rejectValue: unknown }
>("nextPublicHolidays", async ({ code }, { rejectWithValue }) => {
  try {
    const response = await api.nextPublicHolidays(code);
    return response.data;
  } catch (e) {
    console.error(e);
    return rejectWithValue(e.message);
  }
});
