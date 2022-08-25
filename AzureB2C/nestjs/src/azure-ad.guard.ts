import { Injectable } from '@nestjs/common';
import { PassportStrategy, AuthGuard } from '@nestjs/passport';
import { BearerStrategy } from 'passport-azure-ad';

const clientID = 'f9d3a209-65ac-4b23-88af-3151f65d45c4';
const tenantID = '08861861-f910-48fe-b7ce-08f72699488f';

/**
 * Extracts ID token from header and validates it.
 */
@Injectable()
export class AzureADStrategy extends PassportStrategy(
  BearerStrategy,
  'azure-ad',
) {
  constructor() {
    super({
      identityMetadata: `https://exit38ecoverse.b2clogin.com/exit38ecoverse.onmicrosoft.com/B2C_1_suplin/v2.0/.well-known/openid-configuration`,
      clientID,
    });
  }

  async validate(data) {
    return data;
  }
}

export const AzureADGuard = AuthGuard('azure-ad');
