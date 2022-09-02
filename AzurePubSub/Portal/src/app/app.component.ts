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

  title='Portal'
  imagesrc ='https://ecoverseresources.blob.core.windows.net/images/images.png'
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    console.log('hola');
    let ws = new WebSocket("wss://xherpubsubtest.webpubsub.azure.com/client/hubs/Hub?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ3c3M6Ly94aGVycHVic3VidGVzdC53ZWJwdWJzdWIuYXp1cmUuY29tL2NsaWVudC9odWJzL0h1YiIsImlhdCI6MTY2MjA5Mjk1NiwiZXhwIjoxNjYyMTAzNzU2fQ.yZ0fO7fButEWq9ZrkJ_c4L1OYI5QFe0kT0tTbIPAdks");

    var x= this.getqrs().subscribe(posts => {
      console.log(posts);
      console.log(posts.Qrimage);
      this.imagesrc = posts.Qrimage;
    });
    console.log('pase  ');
    ws.onopen = () => {
        // Do things when the WebSocket connection is established
        console.log('Me conecte')
    };

    ws.onmessage = event => {
        // Do things when messages are received.
        console.log('Data received -> ' + event.data);
        this.getqrs().subscribe(posts => {
          console.log(posts);
          console.log(posts.Qrimage);
          this.imagesrc = posts.Qrimage;
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
