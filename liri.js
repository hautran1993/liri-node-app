
var keys = require("./keys.js");
var fs = require("fs");
var input1 = process.argv[2];
// var name = input2.join("+");
// var cmd = name.split("")
var input2 = process.argv[3];
//needs to make search available for using multiple words by using .split and .join

//function to tell liri what to do
function grabCmd(){
  fs.readFile("random.txt","utf8", function(err, data) {
      if (error){
        return str +=("Error Occured: " + err)
      }
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
listener(input1, input2)

//function to grab all text and adding to log.txt
function grabStr(str){
  fs.appendFile("log.txt", "LiriLog: " + str + "\r\n", function(err){
    if(err){
      return console.log("Error Occured: " + err)
    }
  })
}
//0 as the path
//1 has the file name. thats why you are always starting with 2
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
        song === "The Sign by Ace of Base";
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
  const request = require("request")
  // var apiKey = "40e9cece";
  var url = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";
  var movie = input2
    if(movie === undefined) {
    movie === "Mr. Nobody";
    }
  request(url, function(error, response, body){
    if(!error && response.statusCode === 200){
      var json = JSON.parse(body)
      var str = "";
      str += "Tittle: " + json.movie + '\n'
      str += "released Year : " + json.Year + '\n'
      str += "IMDB Rating : " + json.imdbRating + '\n'
      str += "Rotten Tomatoes Rating : " + json.Ratings[1].Value + '\n'
      str += "Country Where the Movie is Produced is: " + json.Country + '\n'
      str += "Language of the movie : " + json.Language + '\n'
      str += "Plot of the Movie : " + json.Plot + '\n'
      str += "Actors in the Movie : " + json.Actors + '\n'
      grabStr(str)
      console.log(str)

    }
  })

}

// need to make constant song and movie to show if nothing is entered
//make double words possible ex: hey you
//finish grabMovie
//finish appending logs
//finish json.package
//create a empty variable name str
//push all files in to the str
//consolelog the starting
//use log function to log in str into log.txt
