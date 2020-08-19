// let artistName =
$(document).ready(() => {
  const userInput = $("#search-input");
  const CLOUDINARY_UPLOAD_PRESET = 'nlenhpww';
  const fileUpload = $("input#file-upload");
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  // document.cookie = "cookie2=value2; SameSite=None; Secure";
  fileUpload.on("change", event => {
    event.preventDefault();
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    console.log("hi");

    sendPic(formData);
  });

  function sendPic(picture) {
    $.ajax({
      type: "POST",
      url: "https://api.cloudinary.com/v1_1/dys3x6xgt/upload",
      data: picture,
      processData: false,
      contentType: false
    })
      .then(res => {
        console.log(res);
        $.ajax({
          type: "PUT",
          url: "/api/user_pic",
          data: {
            picURL: res.url
          }
          // processData: false,
          // contentType: false
        });
        location.reload();
      })

      // If there's an error, log the error

      .catch(err => {
        console.log(err);
      });
  }

  $.get("/api/user_data").then(data => {
    // console.log(data);
    $(".member-name").text(data.firstName);
  });

  $.get("/api/get_pic").then(data => {
    if (data) {
      $("#picHere").html(`<img src="${data}" />`);
    } else {
      // response.cookie('cookie2', 'value2', { sameSite: 'none', secure: true });

      console.log("no pic");
    }
  });

  findArtistInfo = artist => {
    // if (artist!==artist) {
    // bioDiv.empty();

    console.log(artist)
    $.ajax({
      url:
        "https://api.songkick.com/api/3.0/search/artists.json?apikey=pE1BwpmMDHJdfs9n&query=" + artist,
      method: "GET"
    }).then(response => {
      let artistID = response.resultsPage.results.artist[0].id;




      //api for upcomming shows
      $.ajax({
        url:
          "https://api.songkick.com/api/3.0/artists/" + artistID + "/calendar.json?apikey=pE1BwpmMDHJdfs9n",
        method: "GET"
      }).then(response => {
        const songKickRes = response.resultsPage.results.event;
        songKickRes.forEach(data => {
          if (data) {
            // console.log(data.venue.displayName);
            // console.log(data.location.city);
            // console.log(data.start.date);
            // console.log(data.type);
            // $(".displayName").text(`Venue: ${data.venue.displayName}`);
            const displayName = data.venue.displayName
            const location = data.location.city
            const when = data.start.date
            const showType = data.type
            const apiDiv = $("#api-div");
            const eventList = $("<ul>").css("list-style-type", "disc").css("list-style-position", "inside").css("margin-left", "10px");
            const listdisplayName = $("<li>").html("<span class='clearLater'>Venue: </span>" + displayName);
            const listlocation = $("<li>").html("<span class='clearLater'>Location: </span>" + location);
            const listwhen = $("<li>").html("<span class='clearLater'>When: </span>" + when);
            const listshowType = $("<li>").html("<span class='clearLater'>Event Type: </span>" + showType);
            eventList.append(listdisplayName).append(listlocation).append(listwhen).append(listshowType)
            // apiDiv.empty();
            apiDiv.append(eventList);
          } else {
            // response.cookie('cookie2', 'value2', { sameSite: 'none', secure: true });

            console.log("no data");
          }
        });
      });

      //api for past shows
      $.ajax({
        url:
          "https://api.songkick.com/api/3.0/artists/" + artistID + "/gigography.json?apikey=pE1BwpmMDHJdfs9n",
        method: "GET"
      }).then(response => {
        const songKickRes = response.resultsPage.results.event;
        songKickRes.forEach(data => {
          if (data) {
            // console.log(data.venue.displayName);
            // console.log(data.location.city);
            // console.log(data.start.date);
            // console.log(data.type);
            // $(".displayName").text(`Venue: ${data.venue.displayName}`);
            // console.log(data.id);
            const displayName = data.venue.displayName
            const location = data.location.city
            const when = data.start.date
            const showType = data.type
            const showID = data.id
            const apiDivTwo = $("#pastapi-div");
            const eventList = $("<ul>").css("list-style-type", "disc").css("list-style-position", "inside").css("margin-left", "10px");
            const listdisplayName = $("<li>").html("<span class='clearLater'>Venue: </span>" + displayName);
            const listlocation = $("<li>").html("<span class='clearLater'>Location: </span>" + location);
            const listwhen = $("<li>").html("<span class='clearLater'>When: </span>" + when);
            const listshowType = $("<li>").html("<span class='clearLater'>Event Type: </span>" + showType);
            const addshowID = $("<li>").html("<span class='clearLater'>Event ID: </span>" + showID);
            // const addButton = $(`<button type='button' class='button' id='submitbtntwo'>`).html(`<option value=${showID} class='clearLater'>Add To Your History?: </span>`);
            eventList.append(listdisplayName).append(listlocation).append(listwhen).append(listshowType).append(addshowID)
            // apiDivTwo.empty();
            apiDivTwo.append(eventList);
          } else {
            // response.cookie('cookie2', 'value2', { sameSite: 'none', secure: true });

            console.log("no data");
          }
        });
      });
    });
    // } else {
    //   console.log("cant search same artist twice")
    // }
  }


  $("#submit-btn").on("click", () => {
    $('ul').remove();
    $('li').remove();
    findArtistInfo(userInput.val().toLowerCase());
    userInput.val('');
  });

  // $("#submitbtntwo").on("click", () => {
  //   console.log('yo');
  //   // findArtistInfo(userInput.val().toLowerCase());
  //   // userInput.val('');
  // });
});
// input.addEventListener("keydown", function (event){
//   if (event.keyCode === 13) {
//   event.preventDefault();
//   displayHeroInfo(userInput.val().toLowerCase());
//   userInput.val('');
// };
// });
