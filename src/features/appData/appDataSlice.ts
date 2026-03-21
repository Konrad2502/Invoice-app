import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AppDataState, InvoicesData } from "./appDataTypes";

const initialState: AppDataState = {
  data: null,
  status: "idle",
  error: null,
};

export const fetchAppData = createAsyncThunk<
  InvoicesData,
  void,
  { rejectValue: string }
>("appData/fetchAppData", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("/data/data.json");
    console.log(res);

    if (!res.ok) {
      return rejectWithValue(`Fetch failed: ${res.status}`);
    }

    return (await res.json()) as InvoicesData;
  } catch {
    return rejectWithValue("Network error");
  }
});

const appDataSlice = createSlice({
  name: "appData",
  initialState,
  reducers: {
    clearAppData(state) {
      state.data = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAppData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchAppData.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload ?? action.error.message ?? "Unknown error";
      });
  },
});

export const { clearAppData } = appDataSlice.actions;
export default appDataSlice.reducer;