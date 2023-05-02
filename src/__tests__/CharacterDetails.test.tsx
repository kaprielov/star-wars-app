import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CharacterDetails from '../components/CharacterDetails/CharacterDetails';

const mockStore = configureStore([]);

describe('CharacterDetails', () => {
    it('renders a loading spinner when character is not available', () => {
        const store = mockStore({
            character: {
                characters: {},
            },
        });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <CharacterDetails />
                </BrowserRouter>
            </Provider>
        );

        const loadingSpinner = screen.getByRole('progressbar');
        expect(loadingSpinner).toBeInTheDocument();
    });
});
