// This is where I attach the index html template to the backend
post_client = new api()
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

    const options = {
        method : 'POST',
        body : JSON.stringify(keys),
        mode : 'cors',
        headers : {
            'Accept' : 'application/json',
            'content-type' : 'application/json'
        },
        cache : 'reload'
                    }
    
    access_token = localStorage.getItem('token');
    if (access_token) {
        post_client.post(route,options,access_token)
        // fetch(route,options,access_token)
        .then (res => res.json())
        .then (response_object => {
            
            if (response_object.error_message == "some fields are missing"){
            return document.getElementById('message').innerHTML = "some fields \
            are missing 😠";
            }

            else if ((keys.body.length) < 20 ){
                return document.getElementById('message').innerHTML = 'write atleast \
                20 characters ✍️ ';
            }
            else if(response_object.message == "Successfully posted a new record"){
                return document.getElementById('message').innerHTML = "Hooray !! claim received 🎆 🎇 ";
                }
        })

        .catch(error => console.log(error));
        }
    return document.getElementById('message').innerHTML = "token is expired. Login again";
}