import { Component, OnInit, Output } from '@angular/core';
import { GenreService } from '../genre.service';
import { MovieService } from '../movie.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {Router} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { MovieModel } from '../movie.model';


@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.scss'],
})
export class AddmovieComponent implements OnInit {

	judul:string  = "";
	tanggal:Date;
	pemain:string = "";
	sinopsis:string = "";
	extension:string = ".jpg";
	imageUrl:string = "";
	genre = {};
	iduser = localStorage.getItem('iduser');

	options: CameraOptions = {
	    quality: 100,
	    destinationType: this.camera.DestinationType.DATA_URL,
	    encodingType: this.camera.EncodingType.JPEG,
	    mediaType: this.camera.MediaType.PICTURE,
	    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
	    saveToPhotoAlbum: true
	};

	ambilFoto()
	{
	   this.camera.getPicture(this.options).then(
	    (imageData) => {
	        let base64Image = 'data:image/jpeg;base64,' + imageData;
	        this.imageUrl = base64Image;
	    }
	    , (err) => {
	      	alert(err);
	    }
	    );
	}

	upload(idmovie:number) 
	{
		const fileTransfer: FileTransferObject = this.fileTransfer.create();
	  	let options: FileUploadOptions = {
		    fileKey: 'photo',
		    fileName: 'name.jpg',
		    mimeType: 'image/jpeg',
		    params: {idmovie: idmovie, ext:'jpg'}
		}
		fileTransfer.upload(this.imageUrl, 'http://ubaya.prototipe.net/s160418051/project/uploadpic.php', options)
		   .then((data) => {
	   			this.alertAdd("Penambahan film berhasil", "SELAMAT");
				this.router.navigate(['/movie']);
		   }, (err) => {
		    	alert("Gagal - "+err);
		})
	}

	addMovie()
	{
		var arr = [];
		for(let i in this.genre)
		{
			if(this.genre[i] == true)
			{
				arr.push(i);
			}
		}

		console.log(arr);
		let m = new MovieModel(this.judul, this.tanggal, this.pemain, this.sinopsis, this.iduser, arr);
		this.ms.newMovie2(m).subscribe(
			(data) => {
				if(data['status'] == true)
				{
					var idmovie = data['pesan'];
					this.upload(idmovie);
				}
				else
					this.alertAdd("Penambahan film gagal", "GAGAL");
			});
	}

	async alertAdd(message:string, header:string)
	{
		const alert = await this.alertController.create({
			cssClass: 'my-custon-class',
			header: header,
			message: message,
			buttons: ['OK']
		});
		await alert.present();
	}

	genres=[];
	listGenre() {
		this.gs.genreList().subscribe(
	    	(data)=> {
		  		this.genres = data;
		});
	};

  constructor(public gs:GenreService, public camera:Camera, public ms:MovieService, public alertController:AlertController, 
  	public fileTransfer:FileTransfer, public router:Router) { }

  ngOnInit() {
  	this.listGenre();
  }

}
