import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/common/genre';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  genres : Genre[] = [];

  constructor(private genreService : GenreService) { }

  ngOnInit(): void {
    this.getGenres();
  }

  getGenres() {
    this.genreService.getGenreList().subscribe(
      data => this.genres = data
    );
  }

}
