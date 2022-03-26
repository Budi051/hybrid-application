import { Component, OnInit, Input } from '@angular/core';
import { MovieModel } from '../movie.model';
import { AlertController } from '@ionic/angular';
import { MovieService } from '../movie.service';
import { LoginService } from '../login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {

	iduser = localStorage.getItem('iduser');
	tes:number = 0;

	movies=[];
	listMovie() {
		this.ms.movieList().subscribe(
	    	(data)=> {
		  		//this.json = data[0]['name'];
		  		this.movies = data;
		});
	};

	async logout()
	{
		const alert = await this.alertController.create({
			cssClass: 'my-custon-class',
			header: 'Logout',
			message: 'Apakah anda yakin ingin logout?',
			buttons: [
		    	{
					text: 'Cancel',
					role: 'cancel',
					cssClass: 'secondary',
					handler: () => {
						console.log('Logout Canceled');
					}
		        }, 
		        {
					text: 'Okay',
					handler: () => {
						console.log('Confirm Logout');
						localStorage.clear();
						this.iduser = null;
					}
		        }
		    ]
		});
		await alert.present();
	}

	async add()
	{
		if(this.iduser == null)
		{
			const alert = await this.alertController.create({
				cssClass: 'my-custon-class',
				header: 'PERHATIAN',
				message: 'Anda belum login. Apakah anda ingin login terlebiih dahulu?',
				buttons: [
			    	{
						text: 'Cancel',
						role: 'cancel',
						cssClass: 'secondary',
						handler: () => {
							
						}
			        }, 
			        {
						text: 'Okay',
						handler: () => {
							this.router.navigate(['/login']);
						}
			        }
			    ]
			});
			await alert.present();
		}
		else
			this.router.navigate(['/addmovie']);
	}


  constructor(public ms:MovieService, public ls:LoginService, public router:Router, public alertController:AlertController) { }

  ngOnInit():void {
  	this.listMovie();
  }

}
