import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title='Portal'
  imagesrc ='https://ecoverseresources.blob.core.windows.net/images/images.png'
  constructor() { }

  ngOnInit(): void {
    console.log('hola');
    let ws = new WebSocket("wss://xherpubsubtest.webpubsub.azure.com/client/hubs/Hub?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ3c3M6Ly94aGVycHVic3VidGVzdC53ZWJwdWJzdWIuYXp1cmUuY29tL2NsaWVudC9odWJzL0h1YiIsImlhdCI6MTY2MjA0MTc2MiwiZXhwIjoxNjYyMDQ1MzYyfQ.5sviFcjMBIoHNIbTtgF8wK7D5AzNTeOC0S-c1C1tJJs");
    ws.onopen = () => {
        // Do things when the WebSocket connection is established
        console.log('Me conecte')
    };

    ws.onmessage = event => {
        // Do things when messages are received.
        console.log('Data received -> ' + event.data);
        this.imagesrc ='https://ecoverseresources.blob.core.windows.net/images/'+ event.data;
    };
  }

}
