var cinemaID;
      var genreID = "17";
      var cityName = "Brooklyn";

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
                $(".media-body").append(
                  "<h5>" + data.cinemas[i].name + "</h5>"
                );
                $(".media-body").append(
                  "<p>" + data.cinemas[i].location.address.display_text + "</p>"
                );
                $(".media-body").append(
                  "<p>" + data.cinemas[i].telephone + "</p>"
                );
                $(".media-body").append(
                  "<p>" + data.cinemas[i].website + "</p>"
                );
                var selectCinemaButton = $(
                  "<button>" + "Go Here" + "</button>"
                );
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
                });
              }
            }
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
                  //add on click function here to enable playing trailer
                  movieImage.attr("src", data.movies[i].poster_image_thumbnail);
                  var movieURL =
                    data.movies[i].trailers[0].trailer_files[0].url;
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
                  //$(".movies").append(movieTrailer);
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