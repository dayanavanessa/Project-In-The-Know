/* search.js using Bing API News 
Documentation:  https://docs.microsoft.com/en-us/azure/cognitive-services/bing-news-search/search-the-web */

$(document).on("click", ".btn", displayNews);
function displayNews() {

 $.ajax({
    url: "https://api.cognitive.microsoft.com/bing/v5.0/news/search",
    data: {
      "q": $("#autocomplete").val(),
      "mkt": "en-US",
      "count": "3",
      "offset": "0"
    },
    beforeSend: function(xhrObj) {
      xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "3e8463042fb349f4a2e84e8cec9e65f1");
    },
    type: "GET",
  }).done(function(response) {
      console.log(response)
      var NEWS = response.value
      console.log(NEWS)
      /*console.log(NEWS[1].name)
      console.log(NEWS[1].description)
      console.log("date published: " + NEWS[1].datePublished)
      console.log("news agency: " + NEWS [1].provider[0].name)
      console.log("imageURL: " + NEWS[1].image.thumbnail.contentUrl)
      console.log("newsSourceURL: " + NEWS[1].url)*/
      console.log(NEWS.length);
    
      buildingNewsContainer("chicago", NEWS.length);
      populateNewsInfo("chicago", NEWS);
         
    })
}


  function buildingNewsContainer(cityname, newslength) {
    for (i=0; i<newslength; i++){
      var eachNews = $("<div>").css("height", "100px").css("margin", "30px auto")
      eachNews.addClass("media")
      eachNews.attr("id",cityname + "-media-" + i)
    
      var eachNewsImageArea = $("<div>");
      eachNewsImageArea.addClass("media-left")
      eachNewsImageArea.attr("id",cityname + "-media-image-container-" + i)
      eachNews.append(eachNewsImageArea)

      var eachNewsImage = $("<img>");
      eachNewsImage.addClass('media-object')
      eachNewsImage.attr('id', cityname + '-media-image-' + i)
      eachNewsImageArea.append(eachNewsImage)

      var eachNewsBody = $("<div>");
      eachNewsBody.addClass("media-body")
      eachNewsBody.attr("id",cityname + "-media-body-" + i)
      eachNews.append(eachNewsBody)

      var eachNewsHeading = $("<div>");
      eachNewsHeading.addClass("media-heading")
      eachNewsHeading.attr("id",cityname + "-media-heading-" + i)
      eachNewsBody.append(eachNewsHeading)

      var eachNewsSubHeading = $("<div>");
      eachNewsSubHeading.addClass("media-subheading")
      eachNewsSubHeading.attr("id",cityname + "-media-subheading-" + i)
      eachNewsBody.append(eachNewsSubHeading)

      var eachNewsDescription = $("<div>");
      eachNewsDescription.addClass("media-description")
      eachNewsDescription.attr("id",cityname + "-media-description-" + i)
      eachNewsBody.append(eachNewsDescription)


      console.log(cityname);
      $("#" + cityname + '-media').append(eachNews)

    }
  }

  function populateNewsInfo (cityname, news) {
       for (var i=0; i<news.length; i++){
        var newsName = $("#"+cityname + '-media-heading-' + i).append(news[i].name.toUpperCase()).attr("src",news[i].url);
        var newsDescription = $("#"+cityname + '-media-description-' + i).append(news[i].description);
        var newssubHeading = $("#"+cityname + '-media-subheading-' + i).append("Date Published: " + news[i].datePublished).append(", News Source: " + news[i].provider[0].name).css("font-size", "0.8em").css("font-style","italic")
         //  var newsURLs = NEWS[i].url;
        var newsImage = $("#"+cityname + '-media-image-' + i).attr("src", news[i].image.thumbnail.contentUrl);
        }
  }
