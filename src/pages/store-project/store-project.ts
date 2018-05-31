import { Component } from '@angular/core';
import {
  ActionSheetController,
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  ViewController
} from 'ionic-angular';
import {Project} from "../../models/project";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database-deprecated";
import {TabsPage} from "../tabs/tabs";
import {Camera, CameraOptions} from '@ionic-native/camera';
import * as firebase from "firebase";
import {ToastService} from "../../providers/services/toast.service";
import {AlertProvider} from "../../providers/alert/alert";

/**
 * Generated class for the StoreProjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-store-project',
  templateUrl: 'store-project.html',
})
export class StoreProjectPage {
  project = {} as Project;
  image: any;
  imageUrl: any;
  constructor(
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams,
    private view: ViewController,
    private toastCtrl: ToastController,
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController,
    private toastService: ToastService,
    public alert: AlertProvider) {
  }

  async createProject(){
    this.project.videoUrl = 'https://www.youtube.com/embed/' + this.getVideoId(this.project.videoUrl);
      if(this.project.name == null){
        this.showToast('Введите название проекта');
      }

      if(this.project.description == null){
        this.showToast('Введите описание');
      }
    if(this.project.stage == null){
      this.showToast('Введите стадию проекта');
    }
    if(this.image == null){
      this.showToast('Загрузите логотип');
    }
      if (this.image != null) {
        await firebase.storage().ref().child(`projects/${this.project.name}_logo.jpg`).putString(this.image, 'data_url').then(data => {
          this.project.imageUrl = data.downloadURL;
        });
        await this.pushProjectToDatabase();
      }

  }
  getVideoId(url){
    let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    let match = url.match(regExp);

    if (match && match[2].length == 11) {
      return match[2];
    } else {
      return 'error';
    }
  }
  pushProjectToDatabase(){
    console.log('URL OUTTER:' + this.project.imageUrl );
    let id = Math.random().toString(36).substring(7);
    this.afAuth.authState.subscribe(data => {
      this.project.uid = data.uid;
      this.project.isAccepted = 0;
      this.afDatabase.object('projects/' + id).set(this.project);
    });
    this.alert.showAlert('Успешно!', 'Ваш проект успешно загружен в Onay! Он появится в списке проектов после одобрения администрацией!');
    this.navCtrl.setRoot(TabsPage);
  }
  showToast(message: String){
    let toast = this.toastCtrl.create({
      message: '' + message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
  presentActionSheet(){
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
  async takePicture(sourceType:number) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType:sourceType,
    };

    await this.camera.getPicture(options)
      .then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.image = base64Image;
    }, (err) => {
      // Handle error
    });
  }

}
