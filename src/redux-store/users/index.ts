import { createSlice } from '@reduxjs/toolkit'
import { UsersState } from './types';
import { getAuthorBuilder, getProfileBuilder, getQuoteBuilder, loginAsyncBuilder, logoutAsyncBuilder } from './thunk';

const initialState: UsersState = {
  isLoading: false,
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetAuthorAndQuote: (state) => {
      state.authorStatus = '';
      state.quoteStatus = '';
      state.quote = null;
      state.author = null
    }
  },
  extraReducers(builder) {
    loginAsyncBuilder(builder);
    logoutAsyncBuilder(builder);
    getProfileBuilder(builder)
    getAuthorBuilder(builder);
    getQuoteBuilder(builder)
  },
})

export const {
  resetAuthorAndQuote
} = usersSlice.actions

export default usersSlice.reducer
