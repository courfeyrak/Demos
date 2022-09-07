import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Qr } from './qr.model';
import { Observable } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title='Claim your NFT'
  imagesrc ='https://ecoverseresources.blob.core.windows.net/images/images.png'
  qrdata='Starting';
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    console.log('hola');
    let ws = new WebSocket("wss://xherpubsubtest.webpubsub.azure.com/client/hubs/Hub?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ3c3M6Ly94aGVycHVic3VidGVzdC53ZWJwdWJzdWIuYXp1cmUuY29tL2NsaWVudC9odWJzL0h1YiIsImlhdCI6MTY2MjQ3NjU1MywiZXhwIjoxNjYyNDkwOTUzfQ.3pu3U5plcOb15Bd_puKS3cTbbPdCxs2lO5A4l4WseCc");

    
    console.log('pase  ');
    ws.onopen = () => {
        // Do things when the WebSocket connection is established
        console.log('Me conecte')
        var x= this.getqrs().subscribe(posts => {
          console.log(posts);
          console.log(posts.qrurl);
          this.imagesrc = posts.qrurl;
          this.qrdata = posts.hora;
        });
    };

    ws.onmessage = event => {
        // Do things when messages are received.
        console.log('Data received -> ' + event.data);
        this.getqrs().subscribe(posts => {
          console.log(posts);
          console.log(posts.qrurl);
          this.imagesrc = posts.qrurl;
          this.qrdata = posts.hora;
        });
    };
  }

  onCreatePost(postData : Qr){


  }
  getqrs() :Observable<Qr>{
    return this.http.get<Qr>('http://localhost:3000/campaign');
  }
  private fetchData() {
    var data;
    this.http
            .get('http://localhost:3000/campaign')
            .pipe(
              map((responseData) => {
                console.log(responseData);
                const postsArray = [];
                postsArray.push({ ...responseData });
                return postsArray;
              })
            )
            .subscribe(posts => {
              console.log(posts);

            });
    
  }

}
