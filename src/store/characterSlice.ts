import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Details } from '../common/constants/types';

interface CharacterState {
  character: Details | null;
}

const getInitialState = (): CharacterState => {
  const savedCharacter = localStorage.getItem('savedCharacter');
  return {
    character: savedCharacter ? JSON.parse(savedCharacter) : null,
  };
};

const initialState: CharacterState = getInitialState();

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setCharacter: (state, action: PayloadAction<Details | null>) => {
      state.character = action.payload;
    },
    updateCharacter: (state, action: PayloadAction<Partial<Details>>) => {
      if (state.character) {
        state.character = { ...state.character, ...action.payload };
        localStorage.setItem('savedCharacter', JSON.stringify(state.character));
      }
    },
  },
});

export const { setCharacter, updateCharacter } = characterSlice.actions;

export default characterSlice.reducer;