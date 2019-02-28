// This is where I attach the index html template to the backend
document.getElementById('submiter').addEventListener('submit',login);
document.getElementById('submiter').addEventListener('click',on);
function login() {
    // e.preventDefault();
    const route= "https://databasetests.herokuapp.com/api/v2/auth/login/";  //this is the heroku backend link
    let user_name = document.getElementById('username').value; 
    let user_password = document.getElementById('user_password').value;
    
    let keys= {
        user_name : user_name ,
        user_password : user_password
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
    .then (res => res.json())
    .then (response_object => {
        console.log(response_object)
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
        else if (response_object.message == 'User does not exist.'){
            return document.getElementById('addin').innerHTML = 
            `<div class="alert" id="alert">
            <span class="closebtn" onclick= "this.parentElement.style.display='none';" > &times;</span>
            <p id= "response">Invalid user credentials</p>`;
        }
        else if (response_object.admin == "TRUE"){
            token = response_object.access_token;
            localStorage.setItem('access_token',token);
            document.getElementById('addin').innerHTML= `<div class="alerts" id="green">
            <span class="closebtn" onclick= "this.parentElement.style.display='none';" > &times;</span>
            <p id= "response">Your are successfully loged in 😋</p>`;
            window.location.assign(
                "admin_dashboard.html"  
                ); //adminstrator dashbord using ghpages

            // alert ('Welcome dear adminstrator')
        }
        else if (response_object.admin != 'TRUE'){
            token = response_object.access_token;
            user_id = response_object.user_id;
            user_name = response_object.logged_in_as;
            localStorage.setItem('access_token',token);
            localStorage.setItem('user_id',user_id);
            localStorage.setItem('user_name',user_name);
            document.getElementById('addin').innerHTML= 
            `<div class="alerts" id="green">
            <span class="closebtn" onclick= "this.parentElement.style.display='none';" > &times;</span>
            <p id= "response">Your are successfully loged in 😋</p>`;
            window.location.assign(
                "active.html"
                ); //user feed ghpages
            // alert ('Welcome dear concerned citizen')
        }

    })
    // .then (res => console.log(response_object))
    .catch(error => console.log(error));
    }



function on(e){
    e.preventDefault();
    document.getElementById('gif').innerHTML = 
    `<div class="loader" id="overlay" ><div class="duo duo1"><div class="dot dot-a"></div><div class="dot dot-b"></div></div><div class="duo duo2"><div class="dot dot-a"></div><div class="dot dot-b"></div></div></div>`;
    setTimeout(function(){document.getElementById("gif").style.display = "none";},10000);
}
    
    // window.addEventListener("load",() => {
    //     // e.preventDefault();
    //     // return document.getElementById('gif').innerHTML = ``;
    //     document.getElementById("overlay").style.display = "none";
    // });
    
    // document.onreadystatechange = function off(){
    //     return document.getElementById("gif").innerHTML=``;
        
    