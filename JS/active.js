// fetching all records created
document.getElementById('submit-button').addEventListener('submit',get_records());
document.getElementById('fillout').onload;
function get_records() {
    // e.preventDefault();
    const route = 'https://databasetests.herokuapp.com/api/v2/records/';
    access_token = localStorage.getItem('access_token');
    const options = {
        method : 'GET',
        mode : 'cors',
        headers : {
            
            'Authorization': `Bearer ${access_token}`
        },
        cache : 'no-cache'
                    }
    if (access_token === null ){
        // alert ("Login first ⛔🚫");
        window.location.replace(
            "index.html"
            );
        }

    fetch(route,options)
    .then (res => res.json())
    .then (response_object => {
        if (response_object.status === 200){
            let output =`<div id = "add_in" ></div>`
            for(var n=0; n < response_object.length; n++){
                console.log(response_object[n].data);
                output += `
                            <h2 id="user_id">${response_object[n]['user id']}</h2>
                            <h1 id = "record_date">${response_object[n]['record placement date']}</h1><br><br>
                            <p2 id = "body">${response_object[n].body}</p2>
                            <br><br><br><br>
                            <ul class='first'>
                            <h3 id = "inside-bar">
                                <li id="record_type">${response_object[n]['Record type']}</li>
                                <li id ="status">${response_object[n].Status}</li>
                                <li id = "record_geolocation" >${response_object[n]['Record geolocation']}</li>
                                <li id = "record_no" >${response_object[n]['Record no']}</li>
                                <li id="Edit"> 
                                <input  type="text" value="" id="update_record_geolocation" placeholder="update here .." >
                                </li>
                                
                            </h3>
                            </ul>
                            
                            <div >
                                <button class="e" ><a  >Edit</a></button>
                            </div>`;
            
            console.log(output);
            document.getElementById('fillout').innerHTML= output;};    
        }
        
        else if (response_object.status === 401 || response_object.status === 422){
            alert('un-authorised access, please login ')
            window.location.replace(
                "index.html"
                );
        }
        else if (response_object.status === 404){
            alert ('no reports at the moment, Please create one ')
            // window.location.assign(
            //     "user_record.html"
            //     );
        }
        
        
    })
    .catch(error => console.log(error));

}