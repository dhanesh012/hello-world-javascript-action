const core = require('@actions/core');
const github = require('@actions/github');

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
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
