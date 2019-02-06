// post both redflag and interventions

document.getElementById('post-record').addEventListener('submit', post_record);

function post_record(e) {
    e.preventDefault();
    const route = 'https://databasetests.herokuapp.com/api/v2/records/';
    let record_title = document.getElementById('title').value; 
    let record_type = document.getElementById('Claim-type').value;
    let record_geolocation = document.getElementById('geo').value;
    let body = document.getElementById('body').value;

    let keys= {
        record_title : record_title ,
        record_type : record_type,
        record_geolocation : record_geolocation,
        body : body
    }
    access_token = sessionStorage.getItem('access_token');
    const options = {
        method : 'POST',
        body : JSON.stringify(keys),
        mode : 'cors',
        headers : {
            'Accept' : 'application/json',
            'content-type' : 'application/json',
            'Authorization': `Bearer ${access_token}`
        },
        cache : 'reload'
                    }
    
    if (access_token === null ){
        alert ("Login first ⛔🚫");
        window.location.replace(
            "index.html"
            );

    }

    fetch(route,options)
    .then (res => res.json())
    .then (response_object => {
        console.log(response_object)
        if (response_object.error_message == "Some fields have no data"){
        return document.getElementById('message').innerHTML = "some fields \
        are missing 😠";
        }

        else if ((keys.body.length) < 20 ){
            return document.getElementById('message').innerHTML = 'write atleast \
            20 characters ✍️ ';
        }
        else if(response_object.message == "Successfully posted a new record"){
            window.location.replace(
                "active.html"
                );

            return document.getElementById('message').innerHTML = "Hooray !! claim received 🎆 🎇 ";
            
            }
        else{

            
            window.location.assign(
                "index.html"
                );
            return document.getElementById('message').innerHTML = "token is expired. Login again";
        }
    })

    .catch(error => console.log(error));
}