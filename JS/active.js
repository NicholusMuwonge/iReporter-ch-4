// fetching all records created, they will load by default on loading the page
document.getElementById('submit-button').addEventListener('submit',get_records());
// document.getElementById('body').onload;
// document.getElementById('fillin').onload;
// window.onload= get_records();
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
        console.log(response_object)
        if (response_object.msg == 'Successfully got all record  records'){
            let output =``
            for(n in response_object.data){
                console.log(response_object.data[n]);
                output += `<br><br>
                <div class="four" id = "template">
                <div class="four">
                        <form style="background-image:url('images/paper.jpg')" >
                                  <div class="five">
                                    <img id="w" src="images/avatar1.png" alt="avatar"  >
                                    <h2 id="user_id">${response_object.data[n]['user_name']}</h2>
                                    <h1 id = "record_date">${response_object.data[n]['record_placement_date']}</h1><br><br>
                                    <p2 id = "body">${response_object.data[n].body}</p2>
                                    <br><br><br><br>
            
                                    <ul class='first'>
                                    <h3 id = "inside-bar">
                                        <li id="Edit"> <input  type="text" value="" id="update_record_geolocation" placeholder="update here .." ></li>
                                        <li id="record_type">${response_object.data[n]['record_type']}</li>
                                        <li id ="status">${response_object.data[n].status}</li>
                                        <li id = "record_geolocation" >${response_object.data[n]['record_geolocation']}</li>
                                        <li id = "record_no" >${response_object.data[n]['record_no']}</li>
                                        
                                    </h3>
                                    </ul>
                                    
                                    <div >
                                        <button class="e" ><a  >Edit</a></button>
                                        <li id="del"> 🚮 </li>
                                    </div>
                                
                            </form>
                        </div><br><br>
                            `;
            
            console.log(output);
            document.getElementById('fillin').innerHTML= output;};    
        }
        
        else if (response.statusCode === 401 ){

            window.location.replace(
                "index.html"
                );
        }
        else if (response.statusCode === 404){
            alert ('no reports at the moment, Please create one ')
            // window.location.assign(
            //     "user_record.html"
            //     );
        }
        
        
    })
    .catch(error => console.log(error));

}