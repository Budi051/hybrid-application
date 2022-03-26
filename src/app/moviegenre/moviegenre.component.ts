import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-moviegenre',
  templateUrl: './moviegenre.component.html',
  styleUrls: ['./moviegenre.component.scss'],
})
export class MoviegenreComponent implements OnInit {

	movies=[];
	listMovie(id:number) {
		this.ms.movieGenre(id).subscribe(
	    	(data)=> {
	    		if(data == "No Movie")
	    		{
	    			this.namaGenre = "Genre";
	    		}
	    		else
	    		{
	    			this.movies = data;
		  			this.namaGenre = data[0]['nama'];
	    		}
		});
	};

	namaGenre:string = "Genre";

  constructor(public ms:MovieService, public route:ActivatedRoute) { }

  ngOnInit() {
  	var id:number=this.route.snapshot.params['id'];
  	this.listMovie(id);
  }

}
