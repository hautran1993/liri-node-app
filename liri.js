var Twitter = require("twitter");
var twitterKey = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotifyKey = require("./keys.js")
var input = process.argv[2];
console.log(input);
//0 as the path
//1 has the file name. thats why you are always starting with 2

function grabTweet(){
  var client = new Twitter(twitterKey);
  var params = {screen_name: 'hautran7'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (var i=0; i < tweets.length;i++){
        console.log(tweets[i].text + tweets[i].created_at);
      }
    }
  });
}

function grabSong(){
var spotify = new Spotify({
  id: <your spotify client id>,
  secret: <your spotify client secret>
});

spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
console.log(data);
});
}

switch(input){
  case `my-tweets`:
  grabTweet();
  break;
}
