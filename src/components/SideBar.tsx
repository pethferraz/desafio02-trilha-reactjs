import { GenreModel } from "../models/GenreModel"
import { Button } from "./Button"

interface SideBarProps{
  selectedGenreId: number
  onGenderClick: (id: number) => void
  genres: Array<GenreModel>
}

export function SideBar({selectedGenreId, onGenderClick, genres}: SideBarProps) {
  
  return (
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => onGenderClick(genre.id)}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>

      </nav>
  )
}