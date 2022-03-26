import { Component, OnInit } from '@angular/core';
import { GenreService } from '../genre.service';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss'],
})
export class GenreComponent implements OnInit {

	genres=[];
	listGenre() {
		this.gs.genreList().subscribe(
	    	(data)=> {
		  		//this.json = data[0]['name'];
		  		this.genres = data;
		});
	};


  constructor(public gs:GenreService, public ls:LoginService) { }

  ngOnInit() {
  	this.listGenre();
  }

}
