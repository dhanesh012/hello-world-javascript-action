const core = require('@actions/core');
const github = require('@actions/github');
import { DefaultAzureCredential } from '@azure/identity'

import {SecretClient} from '@azure/keyvault-secrets'

const vaultName = "dhanesh012"
const url = `https://${vaultName}.vault.azure.net`

const clientN = new SecretClient(url, new DefaultAzureCredential())


async function fetchSecrets() {
    for await (const item of clientN.listPropertiesOfSecrets()) {
        console.log(item.name)
        core.info("Fetching secret - ${item.name}")
    }
  }

  
try {
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
} catch (error) {
  core.setFailed(error.message);
}
