import React from 'react';
import { render, screen } from '@testing-library/react';
import CharacterCard from '../components/CharacterCard/CharacterCard';
import { MemoryRouter } from 'react-router-dom';

describe('CharacterCard', () => {
    it('renders the character name', () => {
        render(
            <MemoryRouter>
                <CharacterCard name="Luke Skywalker" url="https://swapi.dev/api/people/1/" />
            </MemoryRouter>
        );
        const characterName = screen.getByText('Luke Skywalker');
        expect(characterName).toBeInTheDocument();
    });
    it('renders a link to the character details page when characterId is valid', () => {
        render(
            <MemoryRouter>
                <CharacterCard name="Luke Skywalker" url="https://swapi.dev/api/people/1/" />
            </MemoryRouter>
        );
        const characterLink = screen.getByRole('link', { name: 'Luke Skywalker' });
        expect(characterLink).toBeInTheDocument();
        expect(characterLink.getAttribute('href')).toBe('/character/1');
    });
    it('does not render a link to the character details page when characterId is invalid', () => {
        render(
            <MemoryRouter>
                <CharacterCard name="Invalid Character" url="https://swapi.dev/api/people/invalid/" />
            </MemoryRouter>
        );
        const characterLink = screen.queryByRole('link', { name: 'Invalid Character' });
        expect(characterLink).not.toBeInTheDocument();
    });
    it('renders the character name even when characterId is invalid', () => {
        render(
            <MemoryRouter>
                <CharacterCard name="Invalid Character" url="https://swapi.dev/api/people/invalid/" />
            </MemoryRouter>
        );
        const characterName = screen.getByText('Invalid Character');
        expect(characterName).toBeInTheDocument();
    });
});