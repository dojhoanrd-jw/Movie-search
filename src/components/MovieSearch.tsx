import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Movie, ApiResponse } from '../types';
import './MovieSearch.css';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY; 
const API_URL = 'https://api.themoviedb.org/3/search/movie';

const MovieSearch: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get<ApiResponse>(API_URL, {
        params: {
          api_key: API_KEY,
          query: query,
        },
      });
      setMovies(response.data.results);
    } catch (err) {
      setError('Failed to fetch movies');
    }
  };

  const handleCardClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for movies..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p>{error}</p>}

      <div className="movie-grid">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card"
            onClick={() => handleCardClick(movie)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="movie-details">
          <button onClick={handleCloseDetails} className="close-btn">Close</button>
          <h2>{selectedMovie.title}</h2>
          <img
            src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
            alt={selectedMovie.title}
          />
          <p>{selectedMovie.overview}</p>
          <p>Release Date: {selectedMovie.release_date}</p>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
