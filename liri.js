
var keys = require("./keys.js");
var fs = require("fs");
var input = process.argv[2];
var name = process.argv[3];

switch(input){
  case "my-tweets":
    grabTweet();
    break;
  case "spotify-this-song":
    grabSong(name);
    break;
}


//0 as the path
//1 has the file name. thats why you are always starting with 2

function grabTweet(){
  var Twitter = require("twitter");
  var client = new Twitter(keys.twitter);
  var params = {screen_name: 'hautran7'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (var i=0; i < tweets.length;i++){
        console.log(tweets[i].text + tweets[i].created_at);
      }
    }
  });
}

function grabSong(song){
    //npm package
    var Spotify = require("node-spotify-api");
    // var for client spotify key
    var client = new Spotify(keys.spotify);
    // if input is undefined return the sign ace of space
    if (song === " "){
        song === "'The Sign' by Ace of Base";
    }
      client.search({
        type: 'track',
        query: song,
        limit: 1
      },
      function(err, data) {
          if (err) {
            console.log('Error occurred: ' + err);
            return;
          }

          var str = data.tracks.items[0]
          console.log(str.name)
          console.log(str.album.name)
          console.log(str.artists[0].name)
          console.log(str.external_urls.spotify)
      });
}

function grabMovie(){
  var OMDBUrl = "http://www.omdbapi.com/?apikey=" + keys.api_key;
}
