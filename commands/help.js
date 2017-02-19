const lambdaHandler = require('lambda-handler-as-promised');

module.exports.handler = lambdaHandler(() => {
  const options = {};
  const message = `**Available commands:**
?help 
    Shows this message
?loot 
    Lists the rewards for doing Mythics
?gear <character> [realm=saurfang] [region=us]
    Lists the gear for the provided character name, optional realm and region
?talents|tals <character> [realm=saurfang] [region=us] 
    Lists the talents for the provided character name, optional realm and region
?prog <character> [realm=saurfang] [region=us]
    Shows the raid progression for the provided character name, optional realm and region
`;

  return [message, options];
});
