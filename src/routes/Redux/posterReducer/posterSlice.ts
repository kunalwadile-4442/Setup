import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, IApiGetProfileResponse, IData } from "../../../utils/Types/types";



const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isLogin: false,
  passwordEmail: "",
  profileSet: null
 

};

const taskSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<IData>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isLogin  = action.payload.user.isLogin
    },
    setLogout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isLogin = false;
    },
    setPasswordEmail: (state, action: PayloadAction<string>) => {
      state.passwordEmail = action.payload;
    },
    setUserProfile: (state, action: PayloadAction<IApiGetProfileResponse>) => {
      state.profileSet = action.payload;
    }
  },
});

export const { setLogin, setLogout,setPasswordEmail,setUserProfile } = taskSlice.actions;
export default taskSlice.reducer;
