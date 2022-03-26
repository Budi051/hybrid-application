import { Component, OnInit } from '@angular/core';
import { UserModel } from '../user.model';
import { AlertController } from '@ionic/angular';
import { LoginService } from '../login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

	idUser:string = "";
	password:string = "";

	login()
	{
		let u = new UserModel(this.idUser, this.password);
		this.ls.login2(u).subscribe(
			(data) => {
				if(data == "success")
				{
					this.presentAlert("Login Berhasil", "SELAMAT");
					localStorage.setItem('iduser', this.idUser);
					this.router.navigate(['/movie']);
				}
				else{
					this.presentAlert("Login Gagal. ID User atau Password mungkin salah", "GAGAL");
					this.idUser = "";
					this.password = "";
				}
		});
	}

	async presentAlert(message:string, header:string)
	{
		const alert = await this.alertController.create({
			cssClass: 'my-custon-class',
			header: header,
			message: message,
			buttons: ['OK']
		});
		await alert.present();
	}

  constructor(public alertController: AlertController, public ls:LoginService, private router:Router) { }

  ngOnInit() {}

}
