// This where I patch Js and backend api for signup feature
document.getElementById('signup-form').addEventListener('submit', signup);
function signup(e) {
    e.preventDefault();
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
        if (user_password != password2){
            return document.getElementById('message').innerHTML = (
                `<div class="alert" id="alert">
                <span class="closebtn" onclick= "this.parentElement.style.display='none';" > &times;</span>
                <p id= "response">"Passwords dont match 😢 "</p>`
                
            );
        }
        else if (response_object.error_message == 'some fields are missing'){
            return document.getElementById('message').innerHTML =
                (`<div class="alert" id="alert">
                <span class="closebtn" onclick= "this.parentElement.style.display='none';" > &times;</span>
                <p id= "response">"some fields are missing "</p>'`);
        }
        else if (response_object.error_message == 'Password is wrong. It should be at-least 5 characters long, and alphanumeric.'){
            return document.getElementById('message').innerHTML =
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
            return document.getElementById('error').innerHTML =
                "write your name only in alphabet";
        }

        else if (response_object.error_message == 'email already exists'){
            return document.getElementById('message').innerHTML =
                `"<div class="alert" id="alert">
                <span class="closebtn" onclick= "this.parentElement.style.display='none';" > &times;</span>
                <p id= "response">You seem to be registered,login instead</p>"`;
        }

        else if (response_object.error_message == 'Username already taken'){
            return document.getElementById('message').innerHTML =
            `<div class="alert" id="alert">
            <span class="closebtn" onclick= "this.parentElement.style.display='none';" > &times;</span>
            <p id= "response">Username is already taken</p>`;        }

        else if (response_object.status == 'success'){
            return document.getElementById('message').innerHTML =
            `<div class="alert" id="alert">
            <span class="closebtn" onclick= "this.parentElement.style.display='none';" > &times;</span>
            <p id= "response">Your account has been created successfully 😋</p>`;
        }
        
    })
    .catch(error => console.log(error));
    
}