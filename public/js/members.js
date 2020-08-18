// var cloudinary = require('cloudinary')

$(document).ready(() => {
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
          data:{
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
    $(".member-name").text(data.email);
  });

  $.get("/api/get_pic").then(data => {
    if (data) {
      $("#picHere").html(`<img src="${data}" />`);
    } else {
      // response.cookie('cookie2', 'value2', { sameSite: 'none', secure: true });

      console.log("no pic");
    }
  });

  $.ajax({
    url: "https://www.omdbapi.com/?t=romancing+the+stone&y=&plot=short&apikey=trilogy",
    method: "GET"
  }).then(function(response) {
    // console.log(response);
  });





});
