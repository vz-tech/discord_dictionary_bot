const JishoApi = require('unofficial-jisho-api');
const jisho = new JishoApi();

// Accepts message object and kanji user wants to search
function index(message, kanji) {
  if (kanji.length < 1 || kanji.length > 1) {
    return message.channel.send("Please type one valid Japanese phrase. Example: !jisho 状態");
  }
  
  // Result is the object which we extract information from Jisho.com
  jisho.searchForPhrase(kanji).then(result => {
    var response = "";
    // Response is the first element of result from jisho api
    if (result.data.length > 0) var phrase = result.data[0]; 
    else return message.channel.send("No results found.");
    // Rare case error checking
    if (phrase.japanese.length < 1) {
      return message.channel.send("There was an error with that phrase in Jisho API.");
    }
    response += `Reading for ${phrase.japanese[0].word}: ${phrase.japanese[0].reading}\n`;

    //senses refers to the definitions from the jisho api
    for (let i = 0; i < phrase.senses.length; i++) {
      response += `${i+1}. ${phrase.senses[i].english_definitions.join("; ")}\n`;
    }

    return message.channel.send(response);

  });
  
}

// allows other files to use this function
module.exports = {
  index
}
