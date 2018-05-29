import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {StoreProjectPage} from "../store-project/store-project";
import {ProjectsPage} from "../projects/projects";

/**
 * Generated class for the WorkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-work',
  templateUrl: 'work.html',
})
export class WorkPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkPage');
  }
  goToStoreProject() {
    let storeProject = this.modalCtrl.create(StoreProjectPage);
    storeProject.present();
  }
  showProjects(){
    this.navCtrl.push(ProjectsPage);
  }

}
