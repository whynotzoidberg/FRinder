import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/Rx';

import {
  StackConfig,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent} from 'angular2-swing';
import {DetailsPage} from "../details/details";

@Component({
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;

  drawerOptions: any;
  cards: Array<any>;
  buffer: Array<any>;
  stackConfig: StackConfig;
  recentCard: string = '';
  title: string = '';
  numberOfLiked: number;
  positiveSayings: any[] = new Array("Super" , "Interessant", "Cool", "Schön", "Prima");
  negativeSayings: any[] = new Array("Ne" , "Eher nicht", "Nein", "Bloß nicht", "Schrott");

  positiveSaying: string = this.getPositiveSaying();
  negativeSaying: string = this.getNegativeSaying();

  constructor(private http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.title = navParams.get('name');
    this.numberOfLiked = 0;

    this.drawerOptions = {
      handleHeight: 50,
      thresholdFromBottom: 200,
      thresholdFromTop: 200,
      bounceBack: true
    };




    this.stackConfig = {
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.abs(offsetX) / (element.offsetWidth/2), 1);
      },
      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    };
  }

  ngAfterViewInit() {
    // Either subscribe in controller or set in HTML
    this.swingStack.throwin.subscribe((event: DragEvent) => {
      event.target.style.background = '#ffffff';
    });

    this.cards = [];
    this.buffer = [];
    // this.addNewCards(1);
    this.fillBuffer();
  }

  clickOnCategory(name:string){
    this.navCtrl.push(DetailsPage, {
     name : name
    });
  }

  getPositiveSaying(): string {
    let i = Math.floor((Math.random() * (this.positiveSayings.length-1) + 1));
    return this.positiveSayings[i];
}

  getNegativeSaying(): string {
    let i = Math.floor((Math.random() * (this.positiveSayings.length-1) + 1));
    return this.negativeSayings[i];
  }

  // Called whenever we drag an element
  onItemMove(element, x, y, r) {
    var color = '';
    var abs = Math.abs(x);
    let min = Math.trunc(Math.min(16*16 - abs, 16*16));
    let hexCode = this.decimalToHex(min, 2);

    if (x < 0) {
      color = '#FF' + hexCode + hexCode;
    } else {
      color = '#' + hexCode + 'FF' + hexCode;
    }

    element.style.background = color;
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }

// Connected through HTML
  voteUp(dontLike: boolean) {
    let removedCard = this.cards.pop();
    this.addNewCards(1);
    if (!dontLike) {
      this.recentCard = 'Du mochtest: ' + removedCard.name;
      this.numberOfLiked++;
    } else {
      this.recentCard = 'Du mochtest nicht: ' + removedCard.name;
    }
  }

// Add new cards to our array
  fillBuffer() {
    this.http.get("http://5.230.145.170/FRinder/places/sightseeing")
      .subscribe(result => {
        let resultList = result.json().result;
        for (let val of resultList) {
          this.buffer.push(val);
        }
        this.addNewCards(1);
      });

  }

  // Add new cards to our array
  addNewCards(count: number) {
    this.positiveSaying = this.getPositiveSaying();
    this.negativeSaying = this.getNegativeSaying();
    this.cards.push(this.buffer.pop());
  }

// http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
  decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
      hex = "0" + hex;
    }

    return hex;
  }
}
