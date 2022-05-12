import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { MovieCard } from './MovieCard';

interface ContentProps {
  selectedGenreTitle: string
  selectedGenreId: number
}

export function Content({selectedGenreTitle, selectedGenreId}:ContentProps) {
  type MovieResponseType = {
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
      Source: string;
      Value: string;
    }>;
    Runtime: string;
  }

  const [movies, setMovies] = useState<MovieResponseType[]>([]);

  useEffect(() => {
    api.get<MovieResponseType[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

  }, [selectedGenreId]);

  return (
    <div className="container">
        <header>
          <span className="category">Categoria:<span> {selectedGenreTitle}</span></span>
        </header>

        <main>
          <div className="movies-list">
            {movies.map(movie => (
              <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
            ))}
          </div>
        </main>
      </div>
  )
}