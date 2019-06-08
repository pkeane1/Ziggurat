var corsProxy = 'https://cors-anywhere.herokuapp.com/';
/* 

protocol://domain/route?params=values&moreoarames=morevalues......
https://api.yelo.com/v3/business/search
http://someapi.movies.com/movies?year=1999&genre=something&
english
*/
var apiKey = '8rhhmRF5-FCynUFAaqinWGdHndqLlsEQhouEibkZ1QuZsgHj6sRXs7W-TaE8UU0yNEP2JUDnYwBREiqRLlzik-FDZydCEk3oWR4J4gTO6GLIcVaThRBREy2hyvP2XHYx';
var queryURL = corsProxy + "https://api.yelp.com/v3/businesses/search?term=restaurants&location=NYC&categories=french&limit=10";
$.ajax({
url: queryURL,
method: "GET",
headers: {
    Authorization: `Bearer ${apiKey}`
}
}).then(function(response) {
console.log(response)

name1 = response.businesses[1].name;
name = response.businesses[1].location.address1;
cat = response.businesses[1].categories[0].title;
resimage = response.businesses[1].image_url;
console.log(name)

var namley1 = $("<h3>").text(name1)
var namley = $("<p>").text(name);
var categories = $("<p>").text(cat);
var picture = $("<img>");

picture.attr("src",resimage)
picture.css("width","50px")
$("#restaurant-api-response").append(namley1);
$("#restaurant-api-response").append(namley);
$("#restaurant-api-response").prepend(cat);

$("#restaurant-api-response").append(picture);

})