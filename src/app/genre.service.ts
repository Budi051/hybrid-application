import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

	genreList():Observable<any> {
		return this.http.get("http://ubaya.prototipe.net/s160418051/project/genrelist.php");
	}

  constructor(private http: HttpClient) { }
}
