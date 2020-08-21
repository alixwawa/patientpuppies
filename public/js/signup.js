let statesArray = [];
let citiesArray = [];
let input = document.querySelector("input");
let userInput = $("#cityname-input");

$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");
  const firstNameInput = $("input#firstname-input");
  const lastNameInput = $("input#lastname-input");
  const cityNameInput = $("input#cityname-input");
  const stateNameInput = $("input#statename-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", (event) => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      cityName: cityNameInput.val().trim(),
      stateName: stateNameInput.val().trim(),
    };

    if (
      !userData.email ||
      !userData.password ||
      !userData.firstName ||
      !userData.lastName ||
      !userData.cityName ||
      !userData.stateName
    ) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(
      userData.email,
      userData.password,
      userData.firstName,
      userData.lastName,
      userData.cityName,
      userData.stateName
    );
    emailInput.val("");
    passwordInput.val("");
    firstNameInput.val("");
    lastNameInput.val("");
    cityNameInput.val("");
    stateNameInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(
    email,
    password,
    firstName,
    lastName,
    cityName,
    stateName
  ) {
    $.post("/api/signup", {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      cityName: cityName,
      stateName: stateName
    })
      .then(() => {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }

  
  // searchStatesAutoComplete = () => {
  //   jQuery.get("public/js/states.txt", data => {
  //     statesArray = data.toLowerCase().split("\n");
  //     stateNameInput
  //       .autocomplete({
  //         source: statesArray
  //       })
  //       .focus(function() {
  //         $(this).autocomplete("search", "");
  //       });
  //   });
  // };

  




// input.addEventListener("keydown", event => {
//   console.log("start");
//   if (event.keyCode) {
//     event.preventDefault();
//     searchCitiesAutoComplete(userInput.val().toLowerCase());
//     searchStatesAutoComplete(userInput.val().toLowerCase());
//     userInput.val("");
//     console.log("end");
//   }
// });
});
// let example = ["one", "two"]
// searchCitiesAutoComplete = () => {
//   console.log("one");
//   jQuery.get("public/js/cities.txt", data => {
//     console.log("two");
//     citiesArray = data.toLowerCase().split("\n");
//     userInput
//       .autocomplete({
//         source: citiesArray
//       })
//       .focus(function() {
//         $(this).autocomplete("search", "");
//       });
//   });
// };

// searchCitiesAutoComplete();
