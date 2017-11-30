//global functions
var keys = require("./keys.js");
var fs = require("fs");
var input1 = process.argv[2];
var input2 = process.argv[3];

//function to tell liri what to do
function grabCmd(str){
  fs.readFile("random.txt","utf8", function(err, data) {
      if (error){
        return str +=("Error Occured: " + err)
      }
      //cmd shor for data.split
      var cmd = data.split(",")
      var action = cmd[0];
      var name = cmd[1];
      listener(action,name)
  });
}
//function for a listner for commands in terminal
function listener(action, name){
  switch(action){
    case "my-tweets":
      grabTweet();
      break;
    case "spotify-this-song":
      grabSong(name);
      break;
    case "movie-this":
      grabMovie(name);
      break;
    case "do-what-it-says":
      grabCmd();
      break;
    default:
      console.log("Unrecognized command. Please try again" )
  };
};
//letting liri knows which place to tager in the array
listener(input1, input2)

//function to grab all text and adding to log.txt
function grabStr(str){
  fs.appendFile("log.txt", "LiriLog: " + str + "\r\n", function(err){
    if(err){
      return console.log("Error Occured: " + err)
    }
  })
}
//function for grabing tweets
function grabTweet(){
  const Twitter = require("twitter");
  const client = new Twitter(keys.twitter);
  var params = {
    screen_name: 'hautran7',
    count: 20
  };
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (var i=0; i < tweets.length;i++){
        var str = "";
        str += tweets[i].created_at + '\n';
        str += tweets[i].text + '\n';
        grabStr(str);
        console.log(str);

      }
    }
  });
}
//function for grabing songs
function grabSong(song){
    //npm package
    const Spotify = require("node-spotify-api");
    // var for client spotify key
    const client = new Spotify(keys.spotify);

    // if input is undefined return the sign ace of space
    if (song === undefined){
        song = "The Sign by Ace of Base";
    }
      client.search({
        type: 'track',
        query: song,
        limit: 3
      },
      function(err, data) {
          if (err) {
            console.log('Error occurred: ' + err);
            return;
          }
          //shorten 
          const ope = data.tracks.items[0]
          var str = "";
          str += "Song: " + ope.name + '\n'
          str += "Album: " + ope.album.name + '\n'
          str += "Artist: " + ope.artists[0].name + '\n'
          str += "Url: " + ope.external_urls.spotify + '\n'

          grabStr(str);
          console.log(str);
      });
}
//function for grabing movies
function grabMovie(movie){
  var inputMovie = input2
  const request = require("request")
  // var apiKey = "40e9cece";
  if(inputMovie === undefined) {
   inputMovie = "Mr. Nobody";
  }
  var url = "https://www.omdbapi.com/?t=" + inputMovie + "&y=&plot=short&apikey=40e9cece";
  request(url, function(error, response, body){
    if(!error && response.statusCode === 200) {
      var json = JSON.parse(body)
      console.log(json);
      // getting ready to log every thing stored
      var str = "";
      str += "Tittle: " + json.Title + '\n'
      str += "released Year : " + json.Year + '\n'
      str += "IMDB Rating : " + json.imdbRating + '\n'
      if (json.Ratings[0]){
        str += "Rotten Tomatoes Rating : " + json.Ratings[0].Value + '\n'
      }
      str += "Country Where the Movie is Produced is: " + json.Country + '\n'
      str += "Language of the movie : " + json.Language + '\n'
      str += "Plot of the Movie : " + json.Plot + '\n'
      str += "Actors in the Movie : " + json.Actors + '\n'
      grabStr(str);
      console.log(str);

    }
  })

};
