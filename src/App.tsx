import { useEffect, useState } from 'react';
import { api } from './services/api';
import './styles/global.scss';
import './styles/sidebar.scss';
import './styles/content.scss';
import { Content } from './components/Content';
import { SideBar } from './components/SideBar';
import { GenreModel } from './models/GenreModel';

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<GenreModel[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreModel>({} as GenreModel);

  useEffect(() => {
    api.get<GenreModel[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<GenreModel>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar selectedGenreId={selectedGenreId} onGenderClick={handleClickButton} genres={genres} />

      <Content selectedGenreId={selectedGenreId} selectedGenreTitle={selectedGenre.title} />
    </div>
  )
}