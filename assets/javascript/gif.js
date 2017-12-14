$(document).ready(function() {

  // Array for tv shows
  var tvShows = ["Game of Thrones", "Stranger Things", "Grey's Anatomy", "Friends", "The Flash"];

  //================================================================================================
  // FUNCTIONS //

  //Function to display buttons
  function displayButtons() {
    //Deletes movies before adding new movies, prevents repeats
    $("#buttons").empty();

    for (var i = 0; i < tvShows.length; i++) {
      //add buttons to each show in array
      var showButtons = $("<button>");
      //add class to button
      showButtons.addClass("show");
      //add data-attribute
      showButtons.attr("data-name", tvShows[i]);
      //add text to buttons
      showButtons.text(tvShows[i]);
      //add the buttons to div in html
      $("#buttons").append(showButtons);
    }
  };

  //Calling function so buttons display when page loads
  displayButtons();

  //Function to display tvShows GIF in HTML
  function tvShowGif() {

    var show = $(this).attr("data-name");
 
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        show + "&api_key=o3Lwp7ZPXycTJnoxu5pxYD4uummH4itW&limit=10";

        $("#gifs-area").empty();
      
      //Ajax call for specific gifs
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          
          //Creates a div to hold tvshow gifs
          var gifDiv = $("<div class='gifs'>");
          
          //Storing the rating data in a variable
          var rating = results[i].rating;
          
          //Creating element to display rating
          var displayRating = $("<p>").text("Rating: " + rating);

          //Creating element to hold gif image
          var gifImage =$("<img>");
          gifImage.attr("src", results[i].images.fixed_height_still.url);
          gifImage.attr("data-state", "still");
          gifImage.attr("data-still", results[i].images.fixed_height_still.url);
          gifImage.attr("data-animate", results[i].images.fixed_height.url);
          gifImage.addClass("showgif");

          gifDiv.prepend(displayRating);
          gifDiv.prepend(gifImage);

          $("#gifs-area").prepend(gifDiv);
        }

        //Function for gif image, so when it is clicked the state changes from still to animate
        $('img').on('click', function(event) {
        console.log(gifImage)
        var state = $(this).attr("data-state");
          if (state === "still"){
            $(this).attr("src", $(this).data("animate"));
            $(this).attr("data-state", "animate");
          }
          else{
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-state", "still");
          } 
        });
      });
  };

  //On click event for submit button
  $("#add-tvshow").on("click", function(event) {
    event.preventDefault();

    //Creates a variable to store input from user
    var addShow = $("#tvshow-input").val().trim();

    //Adds show to array
    tvShows.push(addShow);

    displayButtons();
  });

  //On click event for tvshow button to display gif
  $(document).on("click", ".show", tvShowGif);

})