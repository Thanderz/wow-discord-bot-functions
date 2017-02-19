const lambdaHandler = require('lambda-handler-as-promised');
const request = require('request-promise');

const toTitleCase = str => str.charAt(0).toUpperCase() + str.substr(1);

module.exports.handler = lambdaHandler(event => {
  const character = event.query.character;
  const region = event.query.region;
  const realm = event.query.realm;

  return request.get(`https://${region}.api.battle.net/wow/character/${realm}/${encodeURI(character)}?fields=progression&locale=en_US&apikey=${process.env.BNET_API_KEY}`)
    .then(res => {
      const data = JSON.parse(res);
      const raids = data.progression.raids.filter(r => r.id > 8000);
      const  response = `${toTitleCase(character)} - ${toTitleCase(realm)} - ${region.toUpperCase()}
Armory: <http://${region}.battle.net/wow/en/character/${realm}/${encodeURI(character)}/advanced>`;

      const info = raids.map(r => ({
        name: r.name,
        normal: `${r.bosses.filter(b => b.normalKills > 0).length}/${r.bosses.length}N`,
        heroic: `${r.bosses.filter(b => b.heroicKills > 0).length}/${r.bosses.length}H`,
        mythic: `${r.bosses.filter(b => b.mythicKills > 0).length}/${r.bosses.length}M`,
      }));

      const options = {
        embed: {
          title: 'Progression',
          fields: info.map(r => ({
            name: r.name,
            value: [r.normal, r.heroic, r.mythic].join('\n'),
            inline: true
          }))
        }
      };

      return [response, options];
    })
});
