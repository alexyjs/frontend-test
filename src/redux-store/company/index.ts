import { createSlice } from '@reduxjs/toolkit'
import { CompanyState } from './types';
import { getCompanyInfoBuilder } from './thunk';

const initialState: CompanyState = {
  isLoading: false,
}

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    getCompanyInfoBuilder(builder);
  },
})

export default companySlice.reducer
