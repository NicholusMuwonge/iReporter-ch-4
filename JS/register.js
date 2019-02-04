// This where I patch Js and backend api for signup feature
document.getElementById('signup-form').addEventListener('submit', signup);
function signup(e) {
    e.preventDefault();
    const route= "https://databasetests.herokuapp.com/api/v2/auth/signup/";

    let user_name = document.getElementById('username').value; 
    let user_password = document.getElementById('password').value;
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
                "Passwords dont match"
            );
        }
        else if (response_object.error_message == 'some fields are missing'){
            return document.getElementById('error').innerHTML = (
                'some fields are missing'
                );
        }
        else if (response_object.error_message == 'Password is wrong. It should be at-least 5 characters long, and alphanumeric.'){
            return document.getElementById('error').innerHTML = (
                "Password is wrong. It should be at-least 5 characters long, and alphanumeric."
                );
        }
        
        else if (response_object.error_message == "User email {0} is wrong, \
        It should be in the format (xxxxx@xxxx.xxx).format(email)"){
            return document.getElementById('error').innerHTML = (
                "Improper email format"
                );
        }
        else if (response_object.error_message == "A name should consist of \
        only alphabetic characters"){
            return document.getElementById('error').innerHTML = (
                "write your name only in alphabet"
                );
        }

        else if (response_object.error_message == 'email already exists'){
            return document.getElementById('error').innerHTML = (
                "Please just go on and signin"
                );
        }

        else if (response_object.error_message == 'Username already taken'){
            return document.getElementById('error').innerHTML = (
                'Username already taken'
                );
        }

        else if (response_object.status == 'success'){
            return document.getElementById('error').innerHTML = (
                'Your account has been created successfully'
                );
        }
        
    })
    .catch(error => console.log(error));
    
}