import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Container,
    Typography,
    CircularProgress,
    Card,
    CardContent,
    Grid,
} from "@mui/material";
import starWarsApi from '../../api/starWarsApi';
import CharacterEditForm from './CharacterEditForm';
import { Details } from '../../common/constants/types';

const CharacterDetails: React.FC = () => {
    const [character, setCharacter] = useState<Details | null>(null);
    const { id: characterId } = useParams();

    useEffect(() => {
        const fetchCharacterDetails = async () => {
            try {
                const response = await starWarsApi.get(`people/${characterId}`);
                setCharacter(response.data);
            } catch (error) {
                console.error('Error fetching character details:', error);
            }
        };

        fetchCharacterDetails();
    }, [characterId]);

    return (
        <Container style={{ padding: '24px' }} >
            {character ? (
                <Card>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h4">{character.name}</Typography>
                            </Grid>
                            <CharacterEditForm character={character} />
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
