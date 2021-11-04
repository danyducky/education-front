import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUserData} from "../../models/register/IUserData";
import {IPersonData} from "../../models/register/IPersonData";

interface registerState {
   step: number;
   userData: IUserData;
   personData: IPersonData;
}

const initialState: registerState = {
   step: 1,
   userData: null,
   personData: null
}

export const registerSlice = createSlice({
   name: 'register',
   initialState,
   reducers: {
      setUserData: (state: registerState, action: PayloadAction<IUserData>) => {
         state.userData = action.payload;
      },
      setPersonData: (state: registerState, action: PayloadAction<IPersonData>) => {
         state.personData = action.payload;
      },
      incrementStep: (state: registerState) => {
         state.step++;
      },
      decrementStep: (state: registerState) => {
         state.step--;
      }
   }
})

export const {setUserData, setPersonData, incrementStep, decrementStep} = registerSlice.actions;

export default registerSlice.reducer;