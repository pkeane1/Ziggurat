var corsProxy = "https://cors-anywhere.herokuapp.com/";
/* 

protocol://domain/route?params=values&moreoarames=morevalues......
https://api.yelo.com/v3/business/search
http://someapi.movies.com/movies?year=1999&genre=something&
english
*/

$("#search-button").on("click", function(event) {
  event.preventDefault();
  console.log("I've been clicked");
  var keyword = $("#search-keyword")
    .val()
    .trim();
  $(".container").hide();

  // $("") .show();

  var apiKey =
    "8rhhmRF5-FCynUFAaqinWGdHndqLlsEQhouEibkZ1QuZsgHj6sRXs7W-TaE8UU0yNEP2JUDnYwBREiqRLlzik-FDZydCEk3oWR4J4gTO6GLIcVaThRBREy2hyvP2XHYx";
  var queryURL =
    corsProxy +
    "https://api.yelp.com/v3/businesses/search?term=restaurants&location=10475&categories=" +
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

      for(var i=0; i < response.businesses.length; i++){

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
    $("#restaurant-api-response").append(zipCode)
    $("#restaurant-api-response").append(categories);

    $("#restaurant-api-response").append(picture);
    }
  });
});
