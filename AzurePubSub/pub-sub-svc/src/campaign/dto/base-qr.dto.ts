import { IsNotEmpty, IsString } from 'class-validator';

export class campaignqrrequest {
  @IsString()
  @IsNotEmpty()
  idpetition: string;

  @IsString()
  @IsNotEmpty()
  Qrimage: string;
}
