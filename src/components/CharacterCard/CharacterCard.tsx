import React from 'react';
import { Link, generatePath } from 'react-router-dom';
import { isValidCharacterId } from '../../common/helpers';

interface CharacterCardProps {
  name: string;
  url: string;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ name, url }) => {
  const characterId = url.split('/').slice(-2, -1)[0];

  if (!isValidCharacterId(characterId)) {
    return (
      <div>
        <h3>{name}</h3>
      </div>
    );
  }

  const characterPath = generatePath('/character/:id', { id: characterId });

  return (
    <Link to={characterPath} style={{ textDecoration: 'none' }}>
      <h3>{name}</h3>
    </Link>
  );
};


export default CharacterCard;
