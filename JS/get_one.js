document.getElementById('submit-button').addEventListener('submit',get_one_record());

function get_one_record() {

    // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    // var dateTime = date+' '+time;

    let search_value = document.getElementById('search-area').value;
    access_token = localStorage.getItem('access_token');
    const route = 'https://databasetests.herokuapp.com/api/v2/auth/record/'+record_no+'/';

    const options = {
        method : 'GET',
        mode : 'cors',
        body : JSON.stringify(search_value),
        headers : {
            
            'Authorization': `Bearer ${access_token}`
        },
        cache : 'no-cache'
                    }
    
    // var newroute = route"+record_no+"/
    if (access_token === null ){
        // alert ("Login first ⛔🚫");
        window.location.replace(
            "index.html"
            );
        }
    if (Number.isInteger(search_value) === true){
        fetch(route,options)
        .then (res => res.json())
        .then (response_object => {
            console.log(response_object)
            // response_object.record_no == search_value
            if (response_object.status === 200){
                output = ``
                for(n in response_object){
                    output += `
                    <br><br>
                    <div class="four" id = "template">
                    <div class="four">
                            <form style="background-image:url('images/paper.jpg')" >
                                      <div class="five">
                                        <img id="w" src="images/avatar1.png" alt="avatar"  >
                                        <h2 id="user_id">${response_object[n]['user_name']}</h2>
                                        <h1 id = "record_date">${response_object[n]['record_placement_date']}</h1><br><br>
                                        <p2 id = "body">${response_object[n].body}</p2>
                                        <br><br><br><br>
                
                                        <ul class='first'>
                                        <h3 id = "inside-bar">
                                            <li id="Edit"> <input  type="text" value="" id="update_record_geolocation" placeholder="update here .." ></li>
                                            <li id="record_type">${response_object[n]['record_type']}</li>
                                            <li id ="status">${response_object[n].status}</li>
                                            <li id = "record_geolocation" >${response_object[n]['record_geolocation']}</li>
                                            <li id = "record_no" >${response_object[n]['record_no']}</li>
                                            
                                        </h3>
                                        </ul>
                                        
                                        <div >
                                            <button class="e" ><a  >Edit</a></button>
                                            <li id="del"> 🚮 </li>
                                        </div>
                                    
                                </form>
                            </div><br><br>`;
                            console.log(output);
                            document.getElementById('fillin').innerHTML= output;
                };

            }
            else if (response_object.status === 404){
                output = ``
                for(n in response_object){
                    output += `
                    <br><br>
                    <div class="four" id = "template">
                    <div class="four">
                            <form style="background-image:url('images/paper.jpg')" >
                                      <div class="five">
                                        <img id="w" src="images/avatar1.png" alt="avatar"  >
                                        <br><br>
                    
                                        <p2 id = "body"> 👎 No records to display at the moment  </p2>
                                        <br><br><br><br>
                
                                        <ul class='first'>
                                        <h3 id = "inside-bar">
                                            <li id="Edit"> <input  type="text" value="" id="update_record_geolocation" placeholder="update here .." ></li>
                                            <li id="record_type">N/A</li>
                                            <li id ="status">N/A</li>
                                            <li id = "record_geolocation" >N/A</li>
                                            <li id = "record_no" >N/A</li>
                                            
                                        </h3>
                                        </ul>
                                        
                                        <div >
                                            <button class="e" ><a  >Edit</a></button>
                                            <li id="del"> 🚮 </li>
                                        </div>
                                    
                                </form>
                            </div><br><br>`;
                            console.log(output);
                            document.getElementById('fillin').innerHTML= output;
                };
            }
            else {
                swal ("Your token is expired \n\ please login again")
                window.location.replace(
                    "index.html"
                    );
            }
        })
        .catch(error => console.log(error));

    }

   else {
       swal ('try something else')
        }
    }