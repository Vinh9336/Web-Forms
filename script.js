function togglePSW(){
    var input = document.getElementById("passwordInput");
    if (input.type === "password"){
        input.type = "text";
    }
    else{
        input.type = "password";
    }
}

function exportData(){
    let fname = document.getElementById("fn").value;
    let lname = document.getElementById("ln").value;
    let email = document.getElementById("mail").value;
    let password = document.getElementById("passwordInput").value;
    let postalCode = document.getElementById("post").value;
    let userData = `Email: ${email}\nPasssword: ${password}\nPostal Code: ${postalCode}`;

    let blob = new Blob([userData], {type: 'text/plain'});
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = lname + '_' + fname + '_data.txt';
    a.click();
    URL.revokeObjectURL(url);
}

function remove_city(){
    var x = document.getElementById("city");

    x.remove(x.selectedIndex);
}


function showMessage(input, message, type){
    // get the small element and set the message
    const msg = input.parentNode.querySelector("small");
    msg. innerText = message;
    // update the class for the input
    input.className = type?"success":"error";
    return type;
}

function showError(input, message) {
    return showMessage(input, message, false);
}

function showSuccess(input) {
    return showMessage(input, "", true);
}
    
function hasValue(input, message) {
    if (input.value.trim() === "") {
        return showError(input, message);
    }
    return showSuccess(input);
}


function validateEmail(input, requiredMsg, invalidMsg) {
    const errors = [];
    // check if the value is not empty
    if (!hasValue(input, requiredMsg)) {
        return false;
    }
    // validate email format
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const email = input.value.trim();
    if (!emailRegex.test(email)) {
        return showError(input, invalidMsg);
    }
    return true;
}

function validatePassword(input, requiredMsg, invalidMsg) {
    const errors = [];
   
    if (!hasValue(input, requiredMsg)) {
      return false;
    }
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/;
    const password = input.value.trim();
    if (!passwordRegex.test(password)) {
      return showError(input, invalidMsg);
    }
    return true;
}

function validatePassword2(password1, password2, requiredMsg, invalidMsg){
    const errors = [];

    if (!hasValue(password2, requiredMsg)) {
      return false;
    }
    else if (password1.value.trim() != password2.value.trim()){
        return showError(password2, invalidMsg);
    }
    else{
        return true;
    }
}


function validatePostalCode(input, requiredMsg, invalidMsg) {
    const errors = [];
   
    if (!hasValue(input, requiredMsg)) {
      return false;
    }

    const postRegex = /[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d/;
    const post = input.value.trim();
    if (!postRegex.test(post)) {
      return showError(input, invalidMsg);
    }
    return true;
}



const form = document.querySelector("#signup");

const FNAME_REQUIRED = "Please enter your first name";
const LNAME_REQUIRED = "Please enter your last name";

const EMAIL_REQUIRED = "Please enter your email";
const EMAIL_INVALID = "Please enter a correct email address format";

const PASSWORD_REQUIRED = "Please enter the Password";
const PASSWORD_INVALID = "Please enter a correct Password and format- The password mut be AT LEAST 6 characters, at least one number and one special character";

const PWD2_REQUIRED = "Please re-enter the password";
const PWD2_INVALID = "The password does not match";

const POSTALCODE_REQUIRED = "Please enter your postal code";
const POSTALCODE_INVALID = "Please enter the correct postal code format";


form.addEventListener("submit", function (event) {
    // stop form submission
    event.preventDefault();
    // validate the form
    let firstNameValid = hasValue(form.elements["fn"], FNAME_REQUIRED);
    let lastNameValid = hasValue(form.elements["ln"], LNAME_REQUIRED);
    let emailValid = validateEmail(form.elements["mail"], EMAIL_REQUIRED, EMAIL_INVALID);
    let passwordValid = validatePassword(form.elements["passwordInput"], PASSWORD_REQUIRED, PASSWORD_INVALID);
    let password2Valid = validatePassword2(form.elements["passwordInput"], form.elements["pwd2"], PWD2_REQUIRED, PWD2_INVALID);
    let postcodeValid = validatePostalCode(form.elements["post"], POSTALCODE_REQUIRED, POSTALCODE_INVALID);

    // if valid, submit the form.
    if (lastNameValid && firstNameValid && emailValid && passwordValid && postcodeValid && password2Valid) {
        let text = "Name: " + form.elements["ln"].value + ', ' + form.elements["fn"].value + "\nEmail: "+ form.elements["mail"].value +"\nPassword: "+ form.elements["passwordInput"].value + "\nPostal Code: " + form.elements["post"].value + "\nCity: " + form.elements["city"].options[form.elements["city"].value].text;
        if (confirm(text) == true){
            exportData();
        }
    }
});