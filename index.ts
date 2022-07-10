const core = require('@actions/core');
const github = require('@actions/github');
import { DefaultAzureCredential } from '@azure/identity'

import {SecretClient} from '@azure/keyvault-secrets'

const vaultName = "dhanesh012"
const url = `https://${vaultName}.vault.azure.net`





  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  core.exportVariable('DKAV', time +' some value ');
  core.exportVariable('DKAVSecret', 'TopSecret');
  core.setSecret('TopSecret');
  core.setOutput('dhanOutVar1','my output var')
  core.setOutput('dhanOutVar2','dhan')
  core.setSecret("Dhan")
  const KeyVaultAuthenticationSP = JSON.parse(core.getInput("creds"))
  if ( Object.keys(KeyVaultAuthenticationSP).length && KeyVaultAuthenticationSP["tenantId"] && KeyVaultAuthenticationSP["clientId"] && KeyVaultAuthenticationSP["clientSecret"] ) {
    core.notice("[authentication] using SP credentials.")
    // && KeyVaultAuthenticationSP["subscriptionId"]
    process.env['AZURE_CLIENT_ID'] = KeyVaultAuthenticationSP["clientId"] 
    process.env['AZURE_TENANT_ID'] = KeyVaultAuthenticationSP["tenantId"]
    process.env['AZURE_CLIENT_SECRET'] = KeyVaultAuthenticationSP["clientSecret"]
    // process.env['AZURE_SUBSCRIPTION_ID'] = 'value'
    var clientN = new SecretClient(url, new DefaultAzureCredential())


  }else {
    core.notice("[authentication] using succeeded az login tokens.")
  var clientN = new SecretClient(url, new DefaultAzureCredential())
  }


//   async function fetchSecrets() {
    // for await (const item of clientN.listPropertiesOfSecrets()) {
    //     console.log(item.name)
    //     core.info("Fetching secret - ${item.name}")
    // }
//   }
  // Get the JSON webhook payload for the event that triggered the workflow
  fetchSecrets()
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload : ${payload}`);

async function fetchSecrets() {
  for await (const item of clientN.listPropertiesOfSecrets()) {
      console.log(item.name)
      core.info("Fetching secret - ${item.name}")
  }
}