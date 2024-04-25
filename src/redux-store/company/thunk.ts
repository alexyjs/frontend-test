import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit"
import { axiosService } from "../../services/axios";
import { CompanyState } from "./types";


const getCompanyInfo = createAsyncThunk(
  'company/getCompanyInfo',
  async (req, { rejectWithValue }) => {
    try {
      const { data } = await axiosService.get('/info');
      return data;
    } catch (error) {
      const errorObject = error as any;
      return rejectWithValue(errorObject.message)
    }
  }
)


const getCompanyInfoBuilder = (builder: ActionReducerMapBuilder<CompanyState>) => {
  builder.addCase(getCompanyInfo.pending, (state, action) => {
    state.isLoading = true
  })
  builder.addCase(getCompanyInfo.fulfilled, (state, action) => {
    state.isLoading = false;
    state.info = action.payload.data.info
  })
  builder.addCase(getCompanyInfo.rejected, (state, action) => {
    state.isLoading = false;
  })
}

export {
  getCompanyInfo,
  getCompanyInfoBuilder,
}
