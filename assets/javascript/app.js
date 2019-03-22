var shows = ["regular show", "bobs burgers", "adventure time", "chowder", "flapjack", "pokemon", "rick and morty", "avatar"];

function apiCall() {
    $(".show-button").on("click", function () {
        $('#display').empty()
        var show = $(this).attr("data-show");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            show + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                    var gifDiv = $("<div>");
                    var rating = results[i].rating.toUpperCase();
                    var p = $("<p>").text("Rating: " + rating);
                    var showImage = $("<img>");
                    showImage.attr("src", results[i].images.fixed_height.url);

                    gifDiv.append(p);
                    gifDiv.append(showImage);
                    
                    $("#display").prepend(gifDiv);
                }
            }
        });

    });
}

function renderButtons() {
    $("#buttons").empty();
    for (var i = 0; i < shows.length; i++) {
        var showBtn = $("<button>");
        showBtn.addClass("show-button show btn btn-primary m-1");
        showBtn.attr("data-show", shows[i]);
        showBtn.text(shows[i]);
        $("#buttons").append(showBtn);
    }
    
    apiCall()
}

$("#add-show").on("click", function (event) {
    event.preventDefault();
    $("#show-input").trigger("reset");
    var show = $("#show-input").val().trim();
    shows.push(show);
    renderButtons();
});



$(document).ready(function () {

    renderButtons()


});