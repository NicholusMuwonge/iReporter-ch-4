// This where I patch Js and backend api for signup feature
document.getElementById('submiter').addEventListener('submit', signup);
function signup() {
    // e.preventDefault();
    const route= "https://databasetests.herokuapp.com/api/v2/auth/signup/";

    let user_name = document.getElementById('username').value; 
    let user_password = document.getElementById('user_password').value;
    let email = document.getElementById('email').value;
    let password2 = document.getElementById('password2').value;

    let keys= {
        user_name : user_name ,
        user_password : user_password,
        email : email
    }

    const options= {
        method : 'POST',
        body : JSON.stringify(keys),
        mode : 'cors',
        headers : {
            'Accept' : 'application/json',
            'content-type' : 'application/json'
        },
        cache : 'reload'
    }
    fetch (route,options)
    .then (res => res.json())
    .then (response_object => {
        console.log(response_object)
        if (user_password != password2){
            return document.getElementById('addin').innerHTML = (
                `<div class="alert" id="alert">
                <span class="closebtn" onclick= "this.parentElement.style.display='none';" > &times;</span>
                <p id= "response">"Passwords dont match 😢 "</p>`
                
            );
        }
        else if (response_object.error_message == 'some fields are missing'){
            return document.getElementById('addin').innerHTML =
                `<div class="alert" id="alert">
                <span class="closebtn" onclick= "this.parentElement.style.display='none';" > &times;</span>
                <p id= "response">"some fields are missing "</p>'`;
        }
        else if (response_object.error_message == 'Password is wrong. It should be at-least 5 characters long, and alphanumeric.'){
            return document.getElementById('addin').innerHTML =
            `<div class="alert" id="alert">
            <span class="closebtn" onclick= "this.parentElement.style.display='none';" > &times;</span>
            <p id= "response">password cant be less than 5 characters </p>`;
        }
        
        else if (response_object.error_message == "User email {0} is wrong, \
        It should be in the format (xxxxx@xxxx.xxx).format(email)"){
            return document.getElementById('message').innerHTML =
                "Improper email format";
        }
        else if (response_object.error_message == "A name should consist of \
        only alphabetic characters"){
            return document.getElementById('addin').innerHTML =
            `<div class="alert" id="alert">
            <span class="closebtn" onclick= "this.parentElement.style.display='none';" > &times;</span>
            <p id= "response">name can only be in alphabet </p>`;
        }

        else if (response_object.error_message == 'email already exists'){
            return document.getElementById('message').innerHTML =
                `"<div class="alert" id="alert">
                <span class="closebtn" onclick= "this.parentElement.style.display='none';" > &times;</span>
                <p id= "response">You seem to be registered,login instead</p>"`;
        }

        else if (response_object.error_message == 'Username already taken'){
            return document.getElementById('addin').innerHTML =
            `<div class="alert" id="alert">
            <span class="closebtn" onclick= "this.parentElement.style.display='none';" > &times;</span>
            <p id= "response">Username is already taken</p>`;        }

        else if (response_object.status == 'success'){
            return document.getElementById('addin').innerHTML =
            `<div class="alert" id="alert">
            <span class="closebtn" onclick= "this.parentElement.style.display='none';" > &times;</span>
            <p id= "response">Your account has been created successfully 😋</p>`;
        }
        
    })
    .catch(error => console.log(error));
    
}


function feedback(){
    // Get all elements with class="closebtn"
    var close = document.getElementsByClassName("closebtn");
    var i;

    // Loop through all close buttons
    for (i = 0; i < close.length; i++) {
        // When someone clicks on a close button
        close[i].onclick = function(){

        // Get the parent of <span class="closebtn"> (<div class="alert">)
        var div = this.parentElement;

        // Set the opacity of div to 0 (transparent)
        div.style.opacity = "0";

        // Hide the div after 600ms (the same amount of milliseconds it takes to fade out)
        setTimeout(function(){ div.style.display = "none"; }, 600);
        }
    }
}
