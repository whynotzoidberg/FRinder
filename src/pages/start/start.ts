import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from '../home/home';

@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {
  homePage = HomePage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  clickOnCategory(name:string){
    this.navCtrl.push(HomePage, {
      name: name
    });
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');
  }

}
