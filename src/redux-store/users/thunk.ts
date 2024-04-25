import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit"
import { ILoginRequest, UsersState } from "./types"
import { axiosService } from "../../services/axios";
import { LOCAL_STORAGE_KEY } from "../../constants";
let abortController: any;

const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async (req: ILoginRequest, { rejectWithValue }) => {
    const { email, password } = req;
    try {
      const { data } = await axiosService.post('/login', { data: { email, password } });
      if (data.data.token) {
        localStorage.setItem(LOCAL_STORAGE_KEY.TOKEN, data.data.token);
        window.location.reload()
      }

      return data;
    } catch (error) {
      const errorObject = error as any;
      return rejectWithValue(errorObject.message)
    }
  }
)


const loginAsyncBuilder = (builder: ActionReducerMapBuilder<UsersState>) => {
  builder.addCase(loginAsync.pending, (state, action) => {
    state.isLoading = true
  })
  builder.addCase(loginAsync.fulfilled, (state, action) => {
    state.isLoading = false;
  })
  builder.addCase(loginAsync.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload as string
  })
}

const logoutAsync = createAsyncThunk(
  'auth/logoutAsync',
  async (req, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN)
      const { data } = await axiosService.delete(`/logout?token=${token}`);
      localStorage.removeItem(LOCAL_STORAGE_KEY.TOKEN);
      window.location.reload()

      return data;
    } catch (error) {
      const errorObject = error as any;
      return rejectWithValue(errorObject.message)
    }
  }
)


const logoutAsyncBuilder = (builder: ActionReducerMapBuilder<UsersState>) => {
  builder.addCase(logoutAsync.pending, (state, action) => {
    state.isLoading = true
  })
  builder.addCase(logoutAsync.fulfilled, (state, action) => {
    state.isLoading = false;
  })
  builder.addCase(logoutAsync.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload as string
  })
}

const getProfile = createAsyncThunk(
  'user/getProfile',
  async (req, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN)
      const { data } = await axiosService.get(`/profile?token=${token}`);
      return data;
    } catch (error) {
      const errorObject = error as any;
      return rejectWithValue(errorObject.message)
    }
  }
)


const getProfileBuilder = (builder: ActionReducerMapBuilder<UsersState>) => {
  builder.addCase(getProfile.pending, (state, action) => {
    state.isLoading = true
  })
  builder.addCase(getProfile.fulfilled, (state, action) => {
    state.isLoading = false;
    state.profile = action.payload.data
  })
  builder.addCase(getProfile.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload as string
  })
}

const getAuthor = createAsyncThunk(
  'user/getAuthor',
  async (req, { rejectWithValue, dispatch }) => {
    abortController = new AbortController()
    try {
      const token = localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN)
      const { data } = await axiosService.get(`/author?token=${token}`, { signal: abortController.signal });
      dispatch(getQuote(data.data?.authorId))
      return data;
    } catch (error) {
      const errorObject = error as any;
      return rejectWithValue(errorObject.message)
    }
  }
)


const getAuthorBuilder = (builder: ActionReducerMapBuilder<UsersState>) => {
  builder.addCase(getAuthor.pending, (state, action) => {
  })
  builder.addCase(getAuthor.fulfilled, (state, action) => {
    state.authorStatus = 'Completed';
    state.author = action.payload.data
  })
  builder.addCase(getAuthor.rejected, (state, action) => {
    state.authorStatus = 'Falier';
    state.error = action.payload as string
  })
}

const getQuote = createAsyncThunk(
  'user/getQuote',
  async (req: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN)
      const { data } = await axiosService.get(`/quote?token=${token}&authorId=${req}`, { signal: abortController.signal });
      return data;
    } catch (error) {
      const errorObject = error as any;
      return rejectWithValue(errorObject.message)
    }
  }
)


const getQuoteBuilder = (builder: ActionReducerMapBuilder<UsersState>) => {
  builder.addCase(getQuote.pending, (state, action) => {
  })
  builder.addCase(getQuote.fulfilled, (state, action) => {
    state.quoteStatus = 'Completed';
    state.quote = action.payload.data
  })
  builder.addCase(getQuote.rejected, (state, action) => {
    state.quoteStatus = 'Falier';
    state.error = action.payload as string
  })
}

function abortQuoteRequest() {
  abortController.abort()
}

export {
  loginAsync,
  loginAsyncBuilder,
  logoutAsync,
  logoutAsyncBuilder,
  getProfile,
  getProfileBuilder,
  getAuthor,
  getAuthorBuilder,
  getQuote,
  getQuoteBuilder,
  abortQuoteRequest
}
