import { Body, Controller,Get, HttpCode, Post } from '@nestjs/common';
const { WebPubSubServiceClient } = require('@azure/web-pubsub');
import { AppService } from '../app.service';
import { campaignqrrequest } from './dto/base-qr.dto';
import { ethers,Wallet,Contract } from "ethers";
import { nftTokenUpgradeableAbi } from '@exit83/ecoverse-blockchain/lib/abi';
import { NftTokenUpgradeable } from '@exit83/ecoverse-blockchain/lib/typechain-types/contracts/ERC1155';

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
   
   resultado.qrurl=r;
   return resultado;
    
    
    //return this.appService.getHello();
  }
  @Post()
  @HttpCode(204)
  async PostQr(@Body() createQr:campaignqrrequest): Promise<string> {
    
    const hub = "Hub";
    let service = new WebPubSubServiceClient("Endpoint=https://xherpubsubtest.webpubsub.azure.com;AccessKey=ztn2KotewWmN3aEdCkdnPoBkXktmyW9jixzNmMLYHG0=;Version=1.0;", hub);
    
    // by default it uses `application/json`, specify contentType as `text/plain` if you want plain-text
    service.sendToAll('go', { contentType: "text/plain" });
    console.log('Envie rotar');
    const contractAddress = '0x5f564cA799A32B126a3Ac25c22C1803158c647Da';
    const walletTest = '0x872Fc515C6C4e6C23ed7713F5B23A8D495Db67e3';
    const provider = ethers.getDefaultProvider(
      'https://polygon-mumbai.g.alchemy.com/v2/at2dKL92cJNYKc9Ds3HcXfq7GstHHDTn',
    );
    const wallet = new Wallet('9ed659e567681bf7c8c54761075e3fb5e6fc11ad03a97b62de8985a3d9bfa816', provider);
    const contract = new Contract(contractAddress, nftTokenUpgradeableAbi, wallet) as NftTokenUpgradeable;
    let res = await contract.balanceOf(contractAddress, 1);
    const claimReq = await contract.claim(walletTest, 10, 1);
    await claimReq.wait();
    res = await contract.balanceOf(walletTest, 1);
   console.log('se realizo el transfer')
   
    return "";
    
    
    //return this.appService.getHello();
  }
}
