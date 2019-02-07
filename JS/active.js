// fetching all records created
document.getElementById('submit-button').addEventListener('submit',get_records());
document.getElementById('template').onload;
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
    // if (access_token === null ){
    //     alert ("Login first ⛔🚫");
    //     window.location.replace(
    //         "index.html"
    //         );
    //     }

    fetch(route,options)
    .then (res => res.json())
    .then (response_object => {
        if (response_object.status == 200){
            // let tile = document.getElementById('template'); 
            // tile.innerHTML += 
            // `<div class="four" id = "template" onload = "get_records()">
            //     <div class="four">
            //         <form style="background-image:url('images/paper.jpg')" >
            //                   <div class="five">
                                
            //                     <img id="w" src="images/avatar1.png" alt="avatar"  >
            //                     <h2 id="user_id"></h2><h1 id = "record_date"></h1><br><br>
            //                     <p2 id = "body"></p2>
            //                     <br><br><br><br>
            //                     <ul class='first'>
            //                     <h3 id = "inside-bar">
            //                         <li id="record_type"> </a></li>
            //                         <li id ="status"> </li>
            //                         <li id = "record_geolocation" ></li>
            //                         <li id="Edit"> <input  type="text" value="" id="update_record_geolocation" placeholder="update here .." ></li>
            //                         <!-- <input type="text" placeholder="Search.." name="Edit" id= "update"> -->
            //                     </h3>
            //                     </ul>
                                
            //                     <div >
            //                         <button class="e" ><a  >Edit</a></button>
            //                     </div>
            //                 </form>
            //                   </div>
            //             </form>
            //     </div> `
            for(var element=0; element < response_object.length; element++){
                output += `
                    <form style="background-image:url('images/paper.jpg')" >
                              <div class="five">
                                <img id="w" src="images/avatar1.png" alt="avatar"  >
                                <h2 id="user_id">${response_object[element]['user id']}</h2><h1 id = "record_date">${response_object[element]['record placement date']}</h1><br><br>
                                <p2 id = "body">${response_object[element].body}</p2>
                                <br><br><br><br>
                                <ul class='first'>
                                <h3 id = "inside-bar">
                                    <li id="record_type">${response_object[element]['Record type']}</li>
                                    <li id ="status">${response_object[element].Status}</li>
                                    <li id = "record_geolocation" >${response_object[element]['Record geolocation']}</li>
                                    <li id = "record_no" >${response_object[element]['Record no']}</li>
                                    <li id="Edit"> <input  type="text" value="" id="update_record_geolocation" placeholder="update here .." ></li>
                                    
                                </h3>
                                </ul>
                                
                                <div >
                                    <button class="e" ><a  >Edit</a></button>
                                </div>
                            </form>
                              </div>
                        </form>
            </div> `;
            
            console.log(output);
            document.getElementById('template').innerHTML= output;};    
        }
        
        else if (response_object.status == 401 || response_object.status == 422){
            alert('un-authorised access, please login ')
            window.location.assign(
                "index.html"
                );
        }
        else {
            alert ('no reports at the moment, Please create one ')
            // window.location.assign(
            //     "user_record.html"
            //     );
        }
        
    })
    .catch(error => console.log(error));

}