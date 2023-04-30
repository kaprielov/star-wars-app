import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Details } from '../../common/constants/types';
import { updateCharacter } from '../../store/characterSlice';

import { 
  TextField,
  Grid,
  Button
} from '@mui/material';

interface CharacterEditFormProps {
  character: Details;
}

const CharacterEditForm: React.FC<CharacterEditFormProps> = ({ character }) => {
  const [editedCharacter, setEditedCharacter] = useState(character);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedCharacter({
      ...editedCharacter,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(updateCharacter(editedCharacter));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Height"
            name="height"
            value={editedCharacter.height}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Mass"
            name="mass"
            value={editedCharacter.mass}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Hair color"
            name="hair_color"
            value={editedCharacter.hair_color}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Skin color"
            name="skin_color"
            value={editedCharacter.skin_color}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Eye color"
            name="eye_color"
            value={editedCharacter.eye_color}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Birth year"
            name="birth_year"
            value={editedCharacter.birth_year}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Gender"
            name="gender"
            value={editedCharacter.gender}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CharacterEditForm;
