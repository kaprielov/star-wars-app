import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Details } from '../common/constants/types';

interface CharacterState {
  characters: { [key: string]: Details };
}

const getInitialState = (): CharacterState => {
  const savedCharacters = localStorage.getItem('savedCharacters');
  return {
    characters: savedCharacters ? JSON.parse(savedCharacters) : {},
  };
};

const initialState: CharacterState = getInitialState();

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setCharacter: (state, action: PayloadAction<{ id: string; details: Details }>) => {
      state.characters[action.payload.id] = action.payload.details;
    },
    updateCharacter: (state, action: PayloadAction<{ id: string; details: Partial<Details> }>) => {
      const id = action.payload.id;
      if (state.characters[id]) {
        state.characters[id] = { ...state.characters[id], ...action.payload.details };
        localStorage.setItem('savedCharacters', JSON.stringify(state.characters));
      }
    },
  },
});

export const { setCharacter, updateCharacter } = characterSlice.actions;

export default characterSlice.reducer;
