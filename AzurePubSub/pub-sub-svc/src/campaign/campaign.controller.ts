import { Controller,Get } from '@nestjs/common';
import { normalize } from 'path';
import { AppService } from '../app.service';
import { campaignqrrequest } from './dto/base-qr.dto';
var QRCode = require('qrcode')

var tipo=1;
@Controller('campaign')
export class CampaignController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<campaignqrrequest> {
    var hora =new Date().toLocaleString();
    console.log('hora -> '+hora)
    var resultado={
        "idpetition": "WERUIJA",
        "Qrimage":"https://ecoverseresources.blob.core.windows.net/images/angular.gif",
        "tipo":tipo,
        "hora":hora,
        "qrurl":""
    }
    if(tipo===1){
      console.log('Tipo 1');
      tipo=2;
      resultado.Qrimage="https://ecoverseresources.blob.core.windows.net/images/angular.gif";
    }
    else{
      console.log('Tipo 2');
      tipo=1;
      resultado.Qrimage="https://ecoverseresources.blob.core.windows.net/images/images.png";
    }
    QRCode.toFile('filename.png', JSON.stringify(resultado), {
      color: {
        dark: '#00F',  // Blue dots
        light: '#0000' // Transparent background
      }
    }, function (err) {
      if (err) throw err
      console.log('done')
    })

   var r = await QRCode.toDataURL( JSON.stringify(resultado));
   console.log(r);
   resultado.qrurl=r;
   return resultado;
    
    
    //return this.appService.getHello();
  }
}
