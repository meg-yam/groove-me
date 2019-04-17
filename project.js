$(document).ready(function() {

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
    // var first_api_url = "https://api.spotify.com/v1/search?q=" + artist + "4e923bc4f9dd44149e336067012683af";


    // $.ajax({
    //   url: first_api_url,
    //   method: "GET"
    // }).then(function(response) {
    //   console.log(response);
    // });

    function searchTicketmaster(city) {
        var second_api_url = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&city=" + city + "&apikey=zg4Gbvm5bXMMuSD6XUbTde3qGda8IFBa";


        $.ajax({
        url: second_api_url,
        method: "GET"
        }).then(function (response) {
        console.log(response);
        for (var i = 0; i < response._embedded.events.length; i++) {

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

        // Constructing HTML containing the event information

        // var upcomingEvents = $("<h2>").text(response.upcoming_event_count + " upcoming events");


        // var eventName = $("<h1>").text(response._embedded.events[i].name);
        // var eventURL = $("<a>").attr("href", response.url).append(eventName);


        // $("#city-div").empty();
        // $("#city-div").append(eventURL);


        }  
        })

    }


    // Event handler for user clicking the select-city button
    $("#select-city").on("click", function(event) {
        // Preventing the button from trying to submit the form
        event.preventDefault();
        // Storing the city name
        var inputCity = $("#city-input").val().trim();

        // Running the searchBandsInTown function(passing in the artist as an argument)
        searchTicketmaster(inputCity);
        // searchSpotify()
        // event.preventDefault()
    });
});


















    //   // Printing the entire object to console
    //   console.log(response);

    //   // Constructing HTML containing the artist information
    //   var artistName = $("<h1>").text(response.name);
    //   var artistURL = $("<a>").attr("href", response.url).append(artistName);
    //   var artistImage = $("<img>").attr("src", response.thumb_url);
    //   var trackerCount = $("<h2>").text(response.tracker_count + " fans tracking this artist");
    //   var upcomingEvents = $("<h2>").text(response.upcoming_event_count + " upcoming events");
    //   var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");

    //   // Empty the contents of the artist-div, append the new artist content
    //   $("#artist-div").empty();
    //   $("#artist-div").append(artistURL, artistImage, trackerCount, upcomingEvents, goToArtist);
    // });

    

