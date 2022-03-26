import { Injectable } from '@angular/core';
import { UserModel } from './user.model';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

	login(iduser:string, password:string):Observable<any>
	{
		let body = new HttpParams();
	    body = body.set('iduser', iduser);
	    body = body.set('password', password);
	  	return this.http.post ("http://ubaya.prototipe.net/s160418051/project/ceklogin.php", body);
	}

	login2(user:UserModel):Observable<any>
	{
		let body = new HttpParams();
	    body = body.set('iduser', user.iduser);
	    body = body.set('password', user.password);
	  	return this.http.post ("http://ubaya.prototipe.net/s160418051/project/ceklogin.php", body);
	}

  constructor(private http: HttpClient) { }
}
