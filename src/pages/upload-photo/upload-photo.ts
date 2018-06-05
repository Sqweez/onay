import { Component } from '@angular/core';
import {ActionSheetController, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireStorage} from "angularfire2/storage";
import {LicensePage} from "../license/license";
import {CameraOptions, Camera} from "@ionic-native/camera";
import * as firebase from "firebase";
import {ToastService} from "../../providers/services/toast.service";
import {ToastProvider} from "../../providers/toast/toast";
import {AlertProvider} from "../../providers/alert/alert";
import * as $ from 'jquery';
/**
 * Generated class for the UploadPhotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-upload-photo',
  templateUrl: 'upload-photo.html',
})
export class UploadPhotoPage {
  image: any;
  imageUrl: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AngularFireAuth,
    public db: AngularFireDatabase,
    public storage: AngularFireStorage,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    public alert: AlertProvider
  ) {
  }
  takePicture(sourceType: number) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceType,
    };

   this.camera.getPicture(options)
      .then((imageData) => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.image = base64Image;
      }, (err) => {
        // Handle error
      });
  }
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Выберите тип загрузки',
      buttons: [
        {
          text: 'Из галереи',
          handler: () => {
            this.takePicture(0);
          }
        },
        {
          text: 'Сделать новое фото',
          handler: () => {
            this.takePicture(1);
          }
        },
        {
          text: 'Отмена',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }
  async uploadPhoto() {
    if (this.image != null) {
      $('#add').css('display', 'none');
      $('#loading').css('display', 'block').css('margin-top', '75%');
      await firebase.storage().ref().child('profile/'+ this.auth.auth.currentUser.uid+ '/avatar.jpg').putString(this.image, 'data_url').then(data => {
        this.imageUrl = data.downloadURL;
        this.db.object('profile/' + this.auth.auth.currentUser.uid).update({avatar: this.imageUrl});
        this.navCtrl.push(LicensePage);
      });
    }
  }
  doNotUpload(){
    this.navCtrl.push(LicensePage);
  }
}
