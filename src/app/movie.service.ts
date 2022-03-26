import { Injectable } from '@angular/core';
import { MovieModel } from './movie.model';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

	movieList():Observable<any> {
		return this.http.get("http://ubaya.prototipe.net/s160418051/project/movielist.php");
	}

	movieGenre(id:number):Observable<any>{
		return this.http.get("http://ubaya.prototipe.net/s160418051/project/movielist_genre.php?id="+id);
	}

	movieDetail(id:number):Observable<any>{
		return this.http.get("http://ubaya.prototipe.net/s160418051/project/movie_detail.php?id="+id);
	}

	review(iduser:string, idmovie:number, rating:number, review:string):Observable<any>
	{
		let body = new HttpParams();
		body = body.set('iduser', iduser);
	    body = body.set('idmovie', idmovie.toString());
	    body = body.set('rating', rating.toString());
	    body = body.set('review', review);
	  	return this.http.post ("http://ubaya.prototipe.net/s160418051/project/review.php", body);
	}

	newMovie (judul:string, tanggal:Date, pemain:string, sinopsis:string, iduser:string, genre:Array<string>):Observable<any> 
	{
	    let body = new HttpParams();
	    body = body.set('judul', judul);
	    body = body.set('tgltayang', tanggal.toString());
	    body = body.set('pemain', pemain);
	    body = body.set('sinopsis', sinopsis);
	    body = body.set('genre', genre.toString());
	    body = body.set('iduser', iduser);
	  	return this.http.post ("http://ubaya.prototipe.net/s160418051/project/uploadfilm.php", body);
	}

	newMovie2(movie:MovieModel):Observable<any>
	{
		let body = new HttpParams();
		body = body.set('judul', movie.judul);
	    body = body.set('tgltayang', movie.tanggalTayang.toString());
	    body = body.set('pemain', movie.pemain);
	    body = body.set('sinopsis', movie.sinopsis);
	    body = body.set('genre', movie.genre.toString());
	    body = body.set('iduser', movie.iduserYangPosting);
		return this.http.post ("http://ubaya.prototipe.net/s160418051/project/uploadfilm.php", body);
	}


  constructor(private http: HttpClient) { }
}
