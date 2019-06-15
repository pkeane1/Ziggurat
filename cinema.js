var cinemaID;
var genreRandom = ["14", "17", "2"];
var genreID = genreRandom[Math.floor(Math.random() * genreRandom.length)];
var genreName;
if (genreID === 14) {
  genreName === "romance";
} else if (genreID === 17) {
  genreName === "thriller";
} else if (genreID === 2) {
  genreName === "animation";
}

console.log(genreID);
var cityName;
// when user enters city and click button it will invoke API
$("#search-button").on("click", function(event) {
  event.preventDefault();
  // console.log("I've been clicked");
  cityName = $("#search-keyword")
    .val()
    .trim();
  $(".container").hide();
  console.log("I passed the hidden container woo!");

  getCinema();
  ///this function will return cinemas
  ///
  function getCinema() {
    jQuery
      .ajax({
        url: "https://api.internationalshowtimes.com/v4/cinemas/",
        type: "GET",
        data: {
          countries: "US"
          //city_ids:
        },
        headers: {
          "X-API-Key": "wgPvVNS7wkNEudSNxDBXcxpo5nsHBav3"
        }
      })
      .then(function(data, textStatus, jqXHR) {
        console.log("I am in cinemas response");
        console.log("HTTP Request Succeeded: " + jqXHR.status);
        var selectCinema;
        for (var i = 0; i < data.cinemas.length; i++) {
          //console.log(data.cinemas[i]);
          if (data.cinemas[i].location.address.city === cityName) {
            cinemaID = data.cinemas[i].id;
            $(".media-body").append("<h5>" + data.cinemas[i].name + "</h5>");
            $(".media-body").append(
              "<p>" + data.cinemas[i].location.address.display_text + "</p>"
            );
            $(".media-body").append("<p>" + data.cinemas[i].telephone + "</p>");
            $(".media-body").append("<p>" + data.cinemas[i].website + "</p>");
            var selectCinemaButton = $("<button>" + "Go Here" + "</button>");
            selectCinema = data.cinemas[i].id;
            console.log(selectCinema);
            selectCinemaButton.attr({
              id: selectCinema
              //value: "Select Cinema"
            });
            console.log(selectCinema);
            $(".media-body").append(selectCinemaButton);
            $("#" + selectCinema).click(function() {
              getMovie();
              getRestaurant();
            });
          }
        }
        var elmnt = document.getElementById("cinemaContainer");
        elmnt.scrollIntoView();
      });
  }

  //this function will pull movies by genre selected
  function getMovie() {
    jQuery
      .ajax({
        url: "https://api.internationalshowtimes.com/v4/genres/",
        type: "GET",
        data: {
          lan: "en"
        },
        headers: {
          "X-API-Key": "wgPvVNS7wkNEudSNxDBXcxpo5nsHBav3"
        }
      })
      .then(function(data, textStatus, jqXHR) {
        console.log("I am in cinemas genres");
        console.log("HTTP Request Succeeded: " + jqXHR.status);
        console.log(data);
        // genreID = "3";
        console.log(genreID);
      })

      .then(function() {
        console.log(genreID);
        jQuery
          .ajax({
            url: "https://api.internationalshowtimes.com/v4/movies/",
            type: "GET",
            data: {
              countries: "US",
              cinema_id: cinemaID,
              genre_ids: genreID,
              fields: "id,title,poster_image_thumbnail,synopsis,trailers"
            },
            headers: {
              "X-API-Key": "wgPvVNS7wkNEudSNxDBXcxpo5nsHBav3"
            }
          })

          .then(function(data, textStatus, jqXHR) {
            console.log("I am in movies response");
            // console.log("HTTP Request Succeeded: " + jqXHR.status);
            console.log(data);
            console.log("here are the movies playing in this cinema");
            for (var i = 0; i < data.movies.length; i++) {
              // console.log(data.movies[i].title);
              // console.log(data.movies[i].poster_image_thumbnail);
              var movieTitle = data.movies[i].title;
              var movieSynopsis = data.movies[i].synopsis;
              genreID = data.movies[i].id;
              var movieImage = $("<img>");
              movieImage.onclick = function() {
                getRestaurant();
              };
              //add on click function here to enable playing trailer
              movieImage.attr("src", data.movies[i].poster_image_thumbnail);
              var movieURL = data.movies[i].trailers[0].trailer_files[0].url;
              movieURL = movieURL.replace("watch?v=", "embed/");
              var movieTrailer = $("<iframe>");
              movieTrailer.attr(
                "src",
                // data.movies[i].trailers[0].trailer_files[0].url +
                //   "&output=embed"
                movieURL
              );
              $(".movies").append("<h3>" + movieTitle + "</h3>");
              $(".movies").append(movieImage);
              $(".movies").append(
                "<p class=card-text style=width:800px margin:0 auto text-align: center>" +
                  movieSynopsis +
                  "</p>"
              );
              $(".movies").append(movieTrailer);
            }
          });
      })

      .fail(function(jqXHR, textStatus, errorThrown) {
        console.log("HTTP Request Failed");
      })
      .always(function() {
        /* ...

      */
      });
  }
  var corsProxy = "https://cors-anywhere.herokuapp.com/";
  /* 

protocol://domain/route?params=values&moreoarames=morevalues......
https://api.yelo.com/v3/business/search
http://someapi.movies.com/movies?year=1999&genre=something&
english
*/

  // $(".movieImgClass").on("click", function(event) {
  //   event.preventDefault();
  //   console.log("I've been clicked");
  var keyword = genreID;
  // $(".container").hide();

  // $("") .show();
  function getRestaurant() {
    var apiKey =
      "8rhhmRF5-FCynUFAaqinWGdHndqLlsEQhouEibkZ1QuZsgHj6sRXs7W-TaE8UU0yNEP2JUDnYwBREiqRLlzik-FDZydCEk3oWR4J4gTO6GLIcVaThRBREy2hyvP2XHYx";
    var queryURL =
      corsProxy +
      "https://api.yelp.com/v3/businesses/search?term=restaurants&location=" +
      cityName +
      "&categories=" +
      keyword +
      "&limit=10";

    // show loading gif

    $.ajax({
      url: queryURL,
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    }).then(function(response) {
      console.log(response);

      for (var i = 0; i < response.businesses.length; i++) {
        name1 = response.businesses[i].name;
        zip = response.businesses[i].location.display_address;
        cat = response.businesses[i].categories[0].title;
        resimage = response.businesses[i].image_url;
        console.log(name);

        var namley1 = $("<h3>").text(name1);
        var zipCode = $("<p>").text(zip);
        var categories = $("<p>").text(cat);
        var picture = $("<img>");

        picture.attr("src", resimage);
        picture.css("width", "50px");
        $("#restaurant-api-response").append(namley1);
        $("#restaurant-api-response").append(zipCode);
        $("#restaurant-api-response").append(categories);

        $("#restaurant-api-response").append(picture);
      }
    });
    // }  );
  }
});
