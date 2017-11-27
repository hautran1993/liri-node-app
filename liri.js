
var keys = require("./keys.js");
var fs = require("fs");
var input1 = process.argv[2];
// var name = input2.join("+");
// var cmd = name.split("")
var input2 = process.argv[3];
//function for a listner for commands in terminal
//needs to make search available for using multiple words by using .split and .join
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
  }
}
listener(input1, input2)


//0 as the path
//1 has the file name. thats why you are always starting with 2
//function for grabing tweets
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
//function for grabing songs
function grabSong(song){
    //npm package
    var Spotify = require("node-spotify-api");
    // var for client spotify key
    var client = new Spotify(keys.spotify);
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

          var str = data.tracks.items[0]
          console.log(str.name)
          console.log(str.album.name)
          console.log(str.artists[0].name)
          console.log(str.external_urls.spotify)
      });
}
//function for grabing movies
function grabMovie(movie){
  var request = require("request")
  // var apiKey = "40e9cece";
  var url = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";
  var movie = input2
    if(movie === undefined) {
    movie === "Mr. Nobody";
    }
  request(url, function(error, response, body){
    if(!error && response.statusCode === 200){
      var json = JSON.parse(body)
      console.log(movie)
      console.log("released Year : " + json.Year)
      console.log("IMDB Rating : " + json.imdbRating)
      console.log("Rotten Tomatoes Rating : " + json.Ratings[1].Value)
      console.log("Country Where the Movie is Produced is: " + json.Country)
      console.log("Language of the movie : " + json.Language)
      console.log("Plot of the Movie : " + json.Plot)
      console.log("Actors in the Movie : " + json.Actors)

    }
  })

}

//make double words possible ex: hey you
//finish grabMovie
//finish appending logs
//finish json.package
