import { Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { MovieService } from '../movie.service';
import { MovieModel } from '../movie.model';
import {Router} from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-moviedetail',
  templateUrl: './moviedetail.component.html',
  styleUrls: ['./moviedetail.component.scss'],
})
export class MoviedetailComponent implements OnInit {

	details=[];
	users=[];

	judul = "";
	iduserPosting = 0;
	rerata = 0;
	pemain = "";
	sinopsis = "";
	extension_poster = "";
	
	listMovie(id:number) {
		this.ms.movieDetail(id).subscribe(
	    	(data)=> {
		  		this.details = data;
		  		this.judul = data[0]['judul'];
		  		this.rerata = data[0]['rerata'];
		  		this.pemain = data[0]['pemain'];
		  		this.sinopsis = data[0]['sinopsis'];
		  		this.extension_poster = data[0]['extension_poster'];

		  		for(let i of data)
		  			this.users.push(i.iduser);

		  		for(let i of this.users)
		  		{
		  			if(i == localStorage.getItem('iduser'))
		  			{
		  				this.userAda = true;
		  				break
		  			}
		  			else
		  				this.userAda = false;
		  		}
		  	});
	};

	tampil:boolean = true;
	userAda:boolean = false;


	idmovie = this.route.snapshot.params['id'];
	iduser:string = localStorage.getItem('iduser');
	rating:number = 0;
	review:string = "";


	submitReview()
	{
		if(localStorage.getItem('iduser') == null)
		{
			this.presentAlert();
		}
		else
		{
			this.ms.review(this.iduser, this.idmovie, this.rating, this.review).subscribe(
				(data) => {
					if(data == "success")
					{
						this.alertReview("Review Berhasil", "SELAMAT");
					}
					else
					{
						this.alertReview("Review Gagal", "GAGAL");
					}
				});
		}
	}

	async presentAlert()
	{
		const alert = await this.alertController.create({
			cssClass: 'my-custon-class',
			header: 'PERHATIAN',
			message: 'Anda belum login. Apakah anda ingin login terlebih dahulu?',
			buttons: [
		    	{
					text: 'Cancel',
					role: 'cancel',
					cssClass: 'secondary',
					handler: () => {
						console.log('Confirm Cancel');
					}
		        }, 
		        {
					text: 'Okay',
					handler: () => {
						console.log('Confirm Okay');
						this.router.navigate(['/login']);
					}
		        }
		    ]
		});
		await alert.present();
	}

	async alertReview(message:string, header:string)
	{
		const alert = await this.alertController.create({
			cssClass: 'my-custon-class',
			header: header,
			message: message,
			buttons: [{text: 'OK', handler: () => 
							{
								this.router.navigate(['/detail/'+this.idmovie]);
								window.location.reload();
							}
					}]
		});
		await alert.present();
	}

  constructor(public ms:MovieService, public route:ActivatedRoute, public router:Router, public alertController:AlertController) { }

  ngOnInit() {
  	var id:number=this.route.snapshot.params['id'];
  	this.listMovie(id);
  }

}
