import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import store from './store/store';
import HomePage from './components/HomePage/HomePage';
import CharacterDetails from './components/CharacterDetails/CharacterDetails';

const saveStateToLocalStorage = () => {
  const state = store.getState();
  localStorage.setItem('savedCharacters', JSON.stringify(state.character.characters));
};

window.onbeforeunload = () => {
  saveStateToLocalStorage();
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/character/:id"
            element={<CharacterDetails />}
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
