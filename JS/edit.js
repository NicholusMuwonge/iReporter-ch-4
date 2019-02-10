// The user can edit their geolocation.
document.getElementById('submit-button').addEventListener('submit',get_one_record());
document.getElementById('edit-button').addEventListener('submit',edit_record());

function edit_record(){
    let record_no = document.getElementById('search-area').value;
    const route = 'https://databasetests.herokuapp.com/api/v2/record_no/'+record_no+'/';
    let record_geolocation = document.getElementById('update_record_geolocation').value;
    access_token = localStorage.getItem('access_token');
    const options = {
        method : 'PUT',
        body : JSON.stringify({
            record_geolocation:record_geolocation
        }),
        mode : 'cors',
        headers : {
            'Accept' : 'application/json',
            'content-type' : 'application/json',
            'Authorization': `Bearer ${access_token}`
        },
        cache : 'no-cache'
                    }
    if (access_token === null ){
        window.location.replace(
            "index.html"
            );
        }

    fetch(route,options)
    .then (res => res.json())
    .then (response_object => {
        console.log(response_object)
        if (response_object){
            output = ``
            
            output += `
            <br><br>
            <div class="four" id = "template">
            <div class="four">
                    <form style="background-image:url('images/paper.jpg')" >
                                <div class="five">
                                <img id="w" src="images/avatar1.png" alt="avatar"  >
                                <h2 id="user_id">${response_object['user_id']}</h2>
                                <h1 id = "record_date">${response_object['record_placement_date']}</h1><br><br>
                                <p2 id = "body">${response_object['body']}</p2>
                                <br><br><br><br>
        
                                <ul class='first'>
                                <h3 id = "inside-bars">
                                    <li> <input  type="text" value="${record_geolocation}" id="update_record_geolocation" placeholder="update here .." ></li>
                                    <li id="record_type">${response_object['record_type']}</li>
                                    <li id ="status">${response_object['status']}</li>
                                    <li id = "record_geolocation" >${response_object['record_geolocation']}</li>
                                    <li id = "record_no" >${response_object['record_no']}</li>
                                    
                                </h3>
                                </ul>
                                
                                <div >
                                    <button class="e" id = "edit-button" type= "submit" onclick="edit_record();" >Edit</button>
                                    <li id="del"> 🚮 </li>
                                </div>
                            
                        </form>
                    </div><br><br>`;
                    console.log(output);
                    document.getElementById('fillin').innerHTML= output;
        }

        else if(response_object === "Token has expired") {
            window.location.replace(
                "index.html"
                );

        }
        else {
            output = ``
            
            output += `
            <br><br>
            <div class="four" id = "template">
            <div class="four">
                    <form style="background-image:url('images/paper.jpg')" >
                                <div class="five">
                                <img id="w" src="images/avatar1.png" alt="avatar"  >
                                <br><br>
            
                                <p2 id = "body"> 👎 No records to display at the moment</p2>
                                <br><br><br><br>
                        </form>
                    </div><br><br>`;
                        console.log(output);
                        document.getElementById('fillin').innerHTML= output; 
                        alert ('the record is non existent') 
        }
    })
    
    .catch(error => console.log(error));
    
}
    
