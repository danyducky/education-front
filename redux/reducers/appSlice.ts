import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface appState {
   isLoading: boolean
}

const initialState: appState = {
   isLoading: false
}

export const appSlice = createSlice({
   name: "app",
   initialState,
   reducers: {
      setProgressBar: (state: appState, action: PayloadAction<boolean>) => {
         state.isLoading = action.payload
      }
   }
})

export const {setProgressBar} = appSlice.actions;

export default appSlice.reducer;
