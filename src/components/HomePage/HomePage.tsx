import React, { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import CharacterCard from '../CharacterCard/CharacterCard';
import starWarsApi from '../../api/starWarsApi';
import { 
  Pagination,
  TextField,
  CircularProgress,
} from '@mui/material';

interface Character {
  name: string;
  url: string;
}

const HomePage: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const response = await starWarsApi.get(`people/?page=${currentPage}`);
        setCharacters(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 10));
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
      setLoading(false);
    };

    fetchCharacters();
  }, [currentPage]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div style={{ padding: '24px' }} >
      <h1>Star Wars Characters</h1>
      <TextField
        label="Поиск персонажа"
        value={searchTerm}
        onChange={handleSearchChange}
        variant="outlined"
        style={{ marginBottom: '20px' }}
      />
     {loading ? (
        <CircularProgress />
      ) : (
        characters
          .filter((character) =>
            character.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((character) => (
            <CharacterCard
              key={character.name}
              name={character.name}
              url={character.url}
            />
          ))
      )}

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, value) => setSearchParams({ page: value.toString() })}
        shape="rounded"
        color="primary"
      />
    </div>
  );
};

export default HomePage;
