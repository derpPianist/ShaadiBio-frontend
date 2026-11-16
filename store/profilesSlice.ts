import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Profile } from "@/features/biodata/types";

interface ProfilesState {
  selected: Profile | null; // the one profile the user clicked
  hydrated: boolean;
}

const initialState: ProfilesState = { selected: null, hydrated: false };

const profilesSlice = createSlice({
  name: "profiles", //name of the slice
  initialState, //the state on creation
  reducers: { //Used to safely change the state
    selectProfile(state, action: PayloadAction<Profile>) {
      state.selected = action.payload;
    },
    // runs once on load with whatever sessionStorage held (or null)
    hydrateSelected(state, action: PayloadAction<Profile | null>) {
      if (action.payload && !state.selected) state.selected = action.payload;
      state.hydrated = true;
    },
    clearSelected(state) {
      state.selected = null;
    },
  },
});

export const { selectProfile, hydrateSelected, clearSelected } = profilesSlice.actions;
export default profilesSlice.reducer;