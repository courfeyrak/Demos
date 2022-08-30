import React, {useState, useCallback, useMemo} from 'react';
import {UIManager, Alert} from 'react-native';
import {
  authorize,
  refresh,
  revoke,
  prefetchConfiguration,
} from 'react-native-app-auth';
import {
  Page,
  Button,
  ButtonContainer,
  Form,
  FormLabel,
  FormValue,
  Heading,
} from './components';

const configs = {
  identityserver: {
    issuer: 'https://demo.identityserver.io',
    clientId: 'interactive.public',
    redirectUrl: 'io.identityserver.demo:/oauthredirect',
    additionalParameters: {},
    scopes: ['https://exit83ecoverdev.onmicrosoft.com/profile/Profile.write'],

    // serviceConfiguration: {
    //   authorizationEndpoint: 'https://demo.identityserver.io/connect/authorize',
    //   tokenEndpoint: 'https://demo.identityserver.io/connect/token',
    //   revocationEndpoint: 'https://demo.identityserver.io/connect/revoke'
    // }
  },
  auth0: {
    issuer: "https://exit83ecoverdev.b2clogin.com/exit83ecoverdev.onmicrosoft.com/B2C_1_app/v2.0",
    clientId: "5edc621a-d098-4ca6-b264-647c7cd97014",
    redirectUrl:"com.oauthreact://redirect/url/",
    additionalParameters: {},
    scopes: ['openid','offline_access','https://exit83ecoverdev.onmicrosoft.com/profile/Profile.write']
  },
};
// auth0: {
//   issuer: "https://exit83ecoverdev.b2clogin.com/exit83ecoverdev.onmicrosoft.com/B2C_1_app/v2.0",
//   clientId: "329e0c7d-d3ad-4537-b7b6-ccdc6bbd3d98",
//   redirectUrl:"com.oauthreact://redirect/url/",
//   additionalParameters: {},
//   scopes: ['openid']
// },
//redirectUrl:"msauth://com.oauthreact/n7w6wV2LIERLs8tjMt43e6gQxYA%3D/",
const defaultAuthState = {
  hasLoggedInOnce: false,
  provider: '',
  accessToken: '',
  accessTokenExpirationDate: '',
  refreshToken: '',
};

const App = () => {
  const [authState, setAuthState] = useState(defaultAuthState);
  React.useEffect(() => {
    prefetchConfiguration({
      warmAndPrefetchChrome: true,
      connectionTimeoutSeconds: 5,
      ...configs.auth0,
    });
  }, []);

  const handleAuthorize = useCallback(
    async provider => {
      try {
        const config = configs[provider];
        console.log('provider ->');
        console.log(config);
        const newAuthState = await authorize({
          ...config,
          connectionTimeoutSeconds: 5,
        });
        console.log('sali')
        console.log(newAuthState);
        setAuthState({
          hasLoggedInOnce: true,
          provider: provider,
          ...newAuthState,
        });
      } catch (error) {
        console.log('lanzo excepcion')
        Alert.alert('Failed to log in', error.message);
      }
    },
    [authState],
  );

  const handleRefresh = useCallback(async () => {
    try {
      const config = configs[authState.provider];
      const newAuthState = await refresh(config, {
        refreshToken: authState.refreshToken,
      });

      setAuthState(current => ({
        ...current,
        ...newAuthState,
        refreshToken: newAuthState.refreshToken || current.refreshToken,
      }));
    } catch (error) {
      Alert.alert('Failed to refresh token', error.message);
    }
  }, [authState]);

  const handleRevoke = useCallback(async () => {
    try {
      const config = configs[authState.provider];
      await revoke(config, {
        tokenToRevoke: authState.accessToken,
        sendClientId: true,
      });

      setAuthState({
        provider: '',
        accessToken: '',
        accessTokenExpirationDate: '',
        refreshToken: '',
      });
    } catch (error) {
      Alert.alert('Failed to revoke token', error.message);
    }
  }, [authState]);

  const showRevoke = useMemo(() => {
    if (authState.accessToken) {
      const config = configs[authState.provider];
      if (config.issuer || config.serviceConfiguration.revocationEndpoint) {
        return true;
      }
    }
    return false;
  }, [authState]);

  return (
    <Page>
      {authState.accessToken ? (
        <Form>
          <FormLabel>accessToken</FormLabel>
          <FormValue>{authState.accessToken}</FormValue>
          <FormLabel>accessTokenExpirationDate</FormLabel>
          <FormValue>{authState.accessTokenExpirationDate}</FormValue>
          <FormLabel>refreshToken</FormLabel>
          <FormValue>{authState.refreshToken}</FormValue>
          <FormLabel>scopes</FormLabel>
          <FormValue>{authState.scopes.join(', ')}</FormValue>
        </Form>
      ) : (
        <Heading>
          {authState.hasLoggedInOnce ? 'Goodbye.' : 'Hello, stranger.'}
        </Heading>
      )}

      <ButtonContainer>
        {!authState.accessToken ? (
          <>
            <Button
              onPress={() => handleAuthorize('identityserver')}
              text="Authorize IdentityServer"
              color="#DA2536"
            />
            <Button
              onPress={() => handleAuthorize('auth0')}
              text="Authorize Auth0"
              color="#DA2536"
            />
          </>
        ) : null}
        {authState.refreshToken ? (
          <Button onPress={handleRefresh} text="Refresh" color="#24C2CB" />
        ) : null}
        {showRevoke ? (
          <Button onPress={handleRevoke} text="Revoke" color="#EF525B" />
        ) : null}
      </ButtonContainer>
    </Page>
  );
};

export default App;