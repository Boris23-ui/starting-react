import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import styled from '@emotion/styled';
import pokemonData from './Pokemon.json';  // Import the Pokemon data directly
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react';

// Create a custom theme with an intense blue color for buttons and beige background
const theme = createTheme({
  palette: {
    primary: {
      main: '#0066cc', // Intense blue color for buttons
    },
    background: {
      default: '#f5f5dc', // Beige color for background
    },
  },
});

// Styled component for the main container
const Container = styled.div`
  background-color: #f5f5dc; // Beige color
  min-height: 100vh; // Ensure it covers the full height of the viewport
  padding: 1rem;
`;

// Component for rendering a single row in the Pokemon table
const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    <td>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => onSelect(pokemon)}
        style={{ fontWeight: 'bold' }}
      >
        Select!
      </Button>
    </td>
  </tr>
);

// PropTypes for type checking the PokemonRow component props
PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string.isRequired,
    }),
    type: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

// Styled component for the title
const Title = styled.h1`
  text-align: center;
`;

// Component for displaying detailed information about a selected Pokemon
const PokemonInfo = ({ pokemon }) => (
  <div>
    <h2>{pokemon.name.english}</h2>
    <table>
      <tbody>
        {Object.entries(pokemon.base).map(([key, value]) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

function App() {
  const [filter, setFilter] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <div style={{
          width: '800px',
          margin: 'auto',
          backgroundColor: 'white',
          padding: '1rem',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)'
        }}>
          <Title>Pokemon Search</Title>
          <input
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            type="text"
            placeholder="Search"
          />
          <div style={{ display: 'flex', marginTop: '1rem' }}>
            <table width="100%">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pokemonData
                  .filter((pokemon) => 
                    pokemon.name.english.toLowerCase().includes(filter.toLowerCase())
                  )
                  .slice(0, 20)
                  .map((pokemon) => (
                    <PokemonRow
                      key={pokemon.id}
                      pokemon={pokemon}
                      onSelect={(pokemon) => setSelectedPokemon(pokemon)}
                    />
                  ))}
              </tbody>
            </table>
            {selectedPokemon && <PokemonInfo pokemon={selectedPokemon} />}
          </div>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;
