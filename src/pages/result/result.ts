import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {StartPage} from "../start/start";
import { Http } from '@angular/http';


/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {

  likedCards: any[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');
    this.likedCards = this.navParams.get('likedCards');
  }

  restart(){
    this.navCtrl.push(StartPage, {
    });
  }

  createMapLink() {

    // https://maps.googleapis.com/maps/api/directions/json?origin=47.994939,7.842517&mode=walking&destination=47.994939,7.842517
    //   // &waypoints=optimize:true%7C47.9763016,7.8177525%7C47.9848895,7.8541669&key=AIzaSyDRMVqSJjQJ2bnodfTwNcIJy1wpXiYYaYE


   // https://maps.googleapis.com/maps/api/directions/json?origin=47.994939,7.842517&mode=walking&destination=
    // 47.9984746,7.8293129&waypoints=optimize:trueG.9961777,7.8381631G.9955918,7.8118858%&key=AIzaSyDRMVqSJjQJ2bnodfTwNcIJy1wpXiYYaYE

    let url:string = 'https://maps.googleapis.com/maps/api/directions/json?origin=47.994939,7.842517&mode=walking&destination=';

    let dest = this.likedCards.pop();
    url +=  dest.lat + "," + dest.lng + "&waypoints=optimize:true%";

    this.likedCards.forEach(function (value) {
      console.log(value);
      url += value.lat + "," + value.lng + "%7C";
    });

    url +=  "&key=AIzaSyDRMVqSJjQJ2bnodfTwNcIJy1wpXiYYaYE";


    let body = new FormData();
    body.append('routeLink', url);
    let backendUrl = "http://5.230.145.170/FRinder/places/route";
    this.http.post(backendUrl, body).subscribe(result => {
      let resultList = result.json().result;
       console.log(resultList.routes);

      let routes = resultList.routes;
      routes.forEach((value)=>{

      });


    });



  };
}
