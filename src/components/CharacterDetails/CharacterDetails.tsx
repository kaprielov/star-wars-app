import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    Container,
    Typography,
    CircularProgress,
    Card,
    CardContent,
    Grid,
} from '@mui/material';
import starWarsApi from '../../api/starWarsApi';
import CharacterEditForm from './CharacterEditForm';
import { RootState } from '../../store/store';
import { setCharacter } from '../../store/characterSlice';

const CharacterDetails: React.FC = () => {
    const { id } = useParams();
    const characterId = id as string;
    const character = useSelector((state: RootState) => state.character.characters[characterId]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCharacterDetails = async () => {
            try {
                const response = await starWarsApi.get(`people/${characterId}`);
                dispatch(setCharacter({ id: characterId, details: response.data }));
            } catch (error) {
                console.error('Error fetching character details:', error);
            }
        };

        if (!character) {
            fetchCharacterDetails();
        }
    }, [characterId, character, dispatch]);

    return (
        <Container style={{ padding: '24px' }}>
            {character ? (
                <Card>
                    <CardContent style={{ padding: '16px 42px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} style={{ marginBottom: '24px' }}>
                                <Typography variant="h4">{character.name}</Typography>
                            </Grid>
                            <CharacterEditForm characterId={characterId} />
                        </Grid>
                    </CardContent>
                </Card>
            ) : (
                <CircularProgress />
            )}
        </Container>
    );
};

export default CharacterDetails;
