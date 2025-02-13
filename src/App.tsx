import React from 'react';
import './App.css';
import MovieSearch from './components/MovieSearch';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Movie Search</h1>
      <MovieSearch />
    </div>
  );
};

export default App;
