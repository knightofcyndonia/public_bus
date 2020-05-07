import { Injectable } from '@angular/core';
import { ToastController } from  '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private toastCtrl : ToastController) { }
  async showToast(message){
    let toast = await this.toastCtrl.create({
      message : message,
      duration: 2000
    });
    toast.present();
  }
}
