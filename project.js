var config = {
    apiKey: "AIzaSyA6LeTtAdzgiH-3XtCbEQefoSVkb4QjvR0",
    authDomain: "fir-project1-4a1ea.firebaseapp.com",
    databaseURL: "https://fir-project1-4a1ea.firebaseio.com",
    projectId: "fir-project1-4a1ea",
    storageBucket: "fir-project1-4a1ea.appspot.com",
    messagingSenderId: "426299134355"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  var city = "";
  
  var accessToken = sessionStorage.getItem('accessToken');
  var artistResults = [];
  
  $.ajax({
    url: 'https://api.spotify.com/v1/me/following?type=artist',
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  })
    .then(function (response) {
      console.log(response);
  
  
      for (var i = 0; i < response.artists.items.length; i++) {
        artistResults.push(response.artists.items[i].name);
  
  
      }
      console.log(artistResults);
      console.log(artistResults.length);
    })
  
  
  function searchTicketmaster(city) {
    var second_api_url = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&city=" + city + "&apikey=zg4Gbvm5bXMMuSD6XUbTde3qGda8IFBa";
  
  
    $.ajax({
      url: second_api_url,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      for (var i = 0; i < response._embedded.events.length; i++) {
  
        for (var j = 0; j < response._embedded.events[i]._embedded.attractions.length; j++) {
          var ticketArtist = response._embedded.events[i]._embedded.attractions[j].name;
  
          if (artistResults.includes(ticketArtist)) {
            console.log("favorite artist");
            // Creating a div to hold the event
            var eventDiv = $("<div class='event'>");
  
            // Storing the dates data
            var startTime = response._embedded.events[i].dates.start.localTime;
            var startDate = response._embedded.events[i].dates.start.localDate;
  
            // Creating an element to have the dates displayed
            var pOne = $("<p>").text("Dates: " + startDate + " show starts at " + startTime);
  
            // Displaying the rating
            eventDiv.append(pOne);
  
            var artist = response._embedded.events[i].name;
  
            var pTwo = $("<p>").text("Tour: " + artist);
  
            eventDiv.append(pTwo);
  
            var venue = response._embedded.events[i]._embedded.venues[0].name;
  
            var pThree = $("<p>").text("Venue: " + venue);
  
            eventDiv.append(pThree);
  
  
            $("#city-div").append(eventDiv);
  
          }
  
          else { console.log("i am not a favorite artist") }
  
        }
  
  
  
      }
    })
  
  }
  
  // Event handler for user clicking the select-city button
  $("#select-city").on("click", function (event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the city name
    var inputCity = $("#city-input").val().trim();
  
    // Running the searchBandsInTown function(passing in the artist as an argument)
    searchTicketmaster(inputCity);
  });
    

