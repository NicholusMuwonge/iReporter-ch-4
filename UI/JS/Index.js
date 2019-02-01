// This is where I attach the index html template to the backend

function login() {
    const route= "https://databasetests.herokuapp.com/api/v2/auth/login/"
    var keys ={
                username : document.getElementById('username').value ,
                password : document.getElementById('password').value
    }
    const options= {
                method : 'POST',
                body : JSON.stringify(keys),
                headers : {
                    'Accept' : 'application/json',
                    'content-type' : 'application/json'
                },
                cache : 'no-chache'
    }
    return fetch(route,options)
        .then (res => res.json())
        .then (response_object => {
            if (response_object.error_message == "some fields are missing"){
                return document.getElementById('error').innerHTML = "some fields \
                are missing";
            }
            else if (response_object.error_message == 'Please use character strings'){
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
            else if (response_object.record_type == "TRUE"){
                token = response_object["access_token"];
                tokenstorage.SetItem('token',token);
                window.location.assign("https://ireporter-ui.herokuapp.com/UI/admin_dashboard");
            }

            else{
                token = response_object["access_token"];
                tokenstorage.SetItem('token',token);
                window.location.assign("https://ireporter-ui.herokuapp.com/iReporter/UI/active");
            }

        })
        .catch(error => console.log(error));
    }