import { LogLevel, Configuration, BrowserCacheLocation } from '@azure/msal-browser';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;
 
export const b2cPolicies = {
     names: {
         signUpSignIn: "B2C_1_suplin",
         editProfile: "B2C_1_suplinEdit"
     },
     authorities: {
         signUpSignIn: {
             authority: "https://exit38ecoverse.b2clogin.com/exit38ecoverse.onmicrosoft.com/B2C_1_suplin",
         },
         editProfile: {
             authority: "https://exit38ecoverse.b2clogin.com/exit38ecoverse.onmicrosoft.com/B2C_1_suplinEdit"
         }
     },
     authorityDomain: "exit38ecoverse.b2clogin.com"
 };
 
 
export const msalConfig: Configuration = {
     auth: {
         clientId: 'cf0052fd-e134-4ef3-9329-e1d1eaea38da',
         authority: 'https://exit38ecoverse.b2clogin.com/exit38ecoverse.onmicrosoft.com/B2C_1_suplin',// b2cPolicies.authorities.signUpSignIn,
         knownAuthorities: [b2cPolicies.authorityDomain],
         redirectUri: '/', 
     },
     cache: {
         cacheLocation: BrowserCacheLocation.LocalStorage,
         storeAuthStateInCookie: isIE, 
     },
     system: {
         loggerOptions: {
            loggerCallback: (logLevel, message, containsPii) => {
                console.log(message);
             },
             logLevel: LogLevel.Verbose,
             piiLoggingEnabled: false
         }
     }
 }

export const protectedResources = {
  todoListApi: {
    endpoint: "http://localhost:5000/api/todolist",
    scopes: ["https://exit38ecoverse.onmicrosoft.com/apiprofile/profile.read"],
    //scopes: ["https://exit38ecoverse.onmicrosoft.com/api/tasks.read"],
  },
}
export const loginRequest = {
  scopes: []
};