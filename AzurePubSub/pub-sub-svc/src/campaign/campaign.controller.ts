import { Controller,Get } from '@nestjs/common';
import { normalize } from 'path';
import { AppService } from '../app.service';
import { campaignqrrequest } from './dto/base-qr.dto';
var tipo=1;
@Controller('campaign')
export class CampaignController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): campaignqrrequest {
    var hora =new Date().toLocaleString();
    console.log('hora -> '+hora)
    var resultado={
        "idpetition": "WERUIJA",
        "Qrimage":"https://ecoverseresources.blob.core.windows.net/images/angular.gif",
        "tipo":tipo,
        "hora":hora
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
    
    return resultado;
    //return this.appService.getHello();
  }
}
