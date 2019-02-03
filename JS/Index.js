// This is where I attach the index html template to the backend
document.getElementById('signin').addEventListener('submit',login);
function login(e) {
    e.preventDefault();
    // var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const route= "https://databasetests.herokuapp.com/api/v2/auth/login/";  //this is the heroku backend link
    // var localStorage=
    let user_name = document.getElementById('username').value; 
    let user_password = document.getElementById('password').value;
    
    let keys= {
        username : user_name ,
        password : user_password
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
    fetch(route,options)
    // .then(function (res) {
    //     return res.json();
    // })
    .then (res => res.json())
    .then (response_object => {
        console.log(response_object);
        // if (response_object.error_message == "some fields are missing"){
        //     return document.getElementById('error').innerHTML = "some fields \
        //     are missing";
        // }
        if (response_object.error_message == 'Please use character strings'){
            return document.getElementById('error').innerHTML = 'Please use\
            character strings';
        }
        else if (response_object.error_message == 'Some fields have no data'){
            return document.getElementById('error').innerHTML = 'Some fields\
            have no data';
        }
        else if (response_object.error_message == 'User does not exist.'){
            return document.getElementById('error').innerHTML = 'User does \
            not exist.';
        }
        else if (response_object.logged_in_as == "nicholas"){
            token = response_object["access_token"];
            localStorage.SetItem('access_token',token);
            window.location.assign(
                "admin_dashboard.html"  
                ); //adminstrator dashbord using ghpages
        }
        else{
            token = response_object["access_token"];
            localStorage.SetItem('access_token',token);
            window.location.assign(
                "active.html"
                ); //user feed ghpages
        }

    })
    // .then (res => console.log(response_object))
    .catch(error => console.log(error));
    }