import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProfile } from '../../components/profile/ProfileForm';
import { ProfileResponse } from '../../interfaces/auth';

interface ProfileState {
  currentUser: {
    Id?: number;
    Name: string;
    Address: string;
    Phone: string;
    Email: string;
    AvatarImage?: string;
    Permission?: string;
  } | null;
  setAvatar: boolean;
}

const initialState: ProfileState = {
  currentUser: null,
  setAvatar: false,
};

const profileSlice = createSlice({
  initialState,
  name: 'profile',
  reducers: {
    getProfile: (state: ProfileState, action: PayloadAction<IProfile>) => {
      state.currentUser = action.payload;
    },
    updateProfile: (state: ProfileState, action: PayloadAction<IProfile>) => {
      state.currentUser = action.payload;
    },
    upImage: (state: ProfileState, action: PayloadAction<string>) => {
      const newAvatar = action.payload;
      state.setAvatar = true;
      state.currentUser = { ...state.currentUser, AvatarImage: newAvatar } as IProfile;
    },
    clearProfile: state => {
      state.currentUser = null;
    },
  },
});

export const { getProfile, updateProfile, upImage, clearProfile } = profileSlice.actions;

const profileReducer = profileSlice.reducer;

export default profileReducer;
