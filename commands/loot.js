const lambdaHandler = require('lambda-handler-as-promised');

const loot = {
  '-': { end: 840, weekly: 'n/a' },
  '2': { end: 845, weekly: 850 },
  '3': { end: 845, weekly: 855 },
  '4': { end: 850, weekly: 860 },
  '5': { end: 850, weekly: 865 },
  '6': { end: 855, weekly: 865 },
  '7': { end: 855, weekly: 870 },
  '8': { end: 860, weekly: 870 },
  '9': { end: 860, weekly: 875 },
  '10': { end: 865, weekly: 880 },
  '11': { end: 870, weekly: 880 },
  '12': { end: 870, weekly: 885 },
  '13': { end: 875, weekly: 890 },
  '14': { end: 880, weekly: 895 },
  '15': { end: 885, weekly: 900 },
};

module.exports.handler = lambdaHandler(() => {

  const options = {
    embed: {
      title: 'Mythic Loot',
      fields: [{
          name: 'Level',
          value: Object.keys(loot).join('\n'),
          inline: true
        }, {
          name: 'End Chest',
          value: loot.map(l => l.end).join('\n'),
          inline: true
        }, {
          name: 'Weekly Chest',
          value: loot.map(l => l.weekly).join('\n'),
          inline: true
        }]
    }
  };

  return [null, options];
});
