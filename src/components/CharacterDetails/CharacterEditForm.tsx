import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  TextField,
  Grid,
  Button
} from '@mui/material';
import { updateCharacter } from '../../store/characterSlice';
import { RootState } from '../../store/store';

interface CharacterEditFormProps {
  characterId: string;
}

const CharacterEditForm: React.FC<CharacterEditFormProps> = ({ characterId }) => {
  const character = useSelector((state: RootState) => state.character.characters[characterId]);
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
    dispatch(updateCharacter({ id: characterId, details: editedCharacter }));
  };

  const fields = [
    { name: 'height', label: 'Height' },
    { name: 'mass', label: 'Mass' },
    { name: 'hair_color', label: 'Hair color' },
    { name: 'skin_color', label: 'Skin color' },
    { name: 'eye_color', label: 'Eye color' },
    { name: 'birth_year', label: 'Birth year' },
    { name: 'gender', label: 'Gender' },
  ] as const;

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {fields.map((field, index) => (
            <TextField
              style={{ marginBottom: '16px' }}
              label={field.label}
              name={field.name}
              value={editedCharacter[field.name]}
              onChange={handleChange}
              fullWidth
            />
          ))}
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
