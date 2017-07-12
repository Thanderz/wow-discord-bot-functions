const lambdaHandler = require('lambda-handler-as-promised');
const request = require('request-promise');

module.exports.handler = lambdaHandler(() => {
  const region = event.query.region;

  return request.get(`https://raider.io/api/v1/mythic-plus/affixes?region=${region}`)
    .then(res => {
      const options = {};
      const data = JSON.parse(res);
      const message = data.title;

      return [message, options];
    });
});
