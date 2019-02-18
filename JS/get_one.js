document.getElementById('submit-button').addEventListener('submit',get_one_record());
document.getElementById('intervention').addEventListener('submit',get_interventions());
document.getElementById('redflag').addEventListener('submit',get_redflags());


function get_one_record() {


    let record_no = document.getElementById('search-area').value;
    access_token = localStorage.getItem('access_token');
    const route = 'https://databasetests.herokuapp.com/api/v2/auth/record/'+record_no+'/';
    user_name = localStorage.getItem('user_name');

    const options = {
        method : 'GET',
        mode : 'cors',
        headers : {
            
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
                                   
                                    <li id="record_type">${response_object['record_type']}</li>
                                    <li id ="status">${response_object['status']}</li>
                                    <li id = "record_geolocation" >${response_object['record_geolocation']}</li>
                                    <li id = "record_no" >${response_object['record_no']}</li>
                                    
                                </h3>
                                </ul>
                                
                                <div >
                                    <button class="e" ><a  ></a></button>
                                    
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

function get_redflags(){
    access_token = localStorage.getItem('access_token');
    const route = 'https://databasetests.herokuapp.com/api/v2/redflags/';
    const options = {
        method : 'GET',
        mode : 'cors',
        headers : {
            
            'Authorization': `Bearer ${access_token}`
        },
        cache : 'no-cache'
                    }

    fetch(route,options)
    .then (res => res.json())
    .then (response_object => {
        console.log(response_object)
        if (response_object){
            output = ``
            for(n in response_object){
                output += `
                <br><br>
                <div class="four" id = "template">
                <div class="four">
                        <form style="background-image:url('images/paper.jpg')" >
                                    <div class="five">
                                    <img id="w" src="images/avatar1.png" alt="avatar"  >
                                    <h2 id="user_id">${response_object[n]['user_id']}</h2>
                                    <h1 id = "record_date">${response_object[n]['record_placement_date']}</h1><br><br>
                                    <p2 id = "body">${response_object[n]['body']}</p2>
                                    <br><br><br><br>
            
                                    <ul class='first'>
                                    <h3 id = "inside-bars">
                                        <li id="Edit"> <input  type="text" value="" id="update_record_geolocation" placeholder="update here .." ></li>
                                        <li id="record_type">${response_object[n]['record_type']}</li>
                                        <li id ="status">${response_object[n]['status']}</li>
                                        <li id = "record_geolocation" >${response_object[n]['record_geolocation']}</li>
                                        <li id = "record_no" >${response_object[n]['record_no']}</li>
                                        
                                    </h3>
                                    </ul>
                                    
                                    <div >
                                        <button class="e" ><a  ></a></button>
                                        
                                    </div>
                                
                            </form>
                        </div><br><br>`;
                        console.log(output);
                        document.getElementById('fillin').innerHTML= output;};
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
        
                            <p2 id = "body"> 👎 No records to display at the moment  </p2>
                            <br><br><br><br>
                    </form>
                </div><br><br>`;
                    console.log(output);
                    document.getElementById('fillin').innerHTML= output; 
                    alert ('the records arent non existent') 

    }
    
    })
    .catch(error => console.log(error));
}






function get_interventions(){
    access_token = localStorage.getItem('access_token');
    const route = 'https://databasetests.herokuapp.com/api/v2/interventions/';
    const options = {
        method : 'GET',
        mode : 'cors',
        headers : {
            
            'Authorization': `Bearer ${access_token}`
        },
        cache : 'no-cache'
                    }

    fetch(route,options)
    .then (res => res.json())
    .then (response_object => {
        console.log(response_object)
        if (response_object){
            output = ``
            for(n in response_object){
                output += `
                <br><br>
                <div class="four" id = "template">
                <div class="four">
                        <form style="background-image:url('images/paper.jpg')" >
                                    <div class="five">
                                    <img id="w" src="images/avatar1.png" alt="avatar"  >
                                    <h2 id="user_id">${response_object[n]['user_id']}</h2>
                                    <h1 id = "record_date">${response_object[n]['record_placement_date']}</h1><br><br>
                                    <p2 id = "body">${response_object[n]['body']}</p2>
                                    <br><br><br><br>
            
                                    <ul class='first'>
                                    <h3 id = "inside-bars">
                                        
                                        <li id="record_type">${response_object[n]['record_type']}</li>
                                        <li id ="status">${response_object[n]['status']}</li>
                                        <li id = "record_geolocation" >${response_object[n]['record_geolocation']}</li>
                                        <li id = "record_no" >${response_object[n]['record_no']}</li>
                                        
                                    </h3>
                                    </ul>
                                    
                                    <div >
                                        <button class="e" ><a  ></a></button>
                                        
                                    </div>
                                
                            </form>
                        </div><br><br>`;
                        console.log(output);
                        document.getElementById('fillin').innerHTML= output;};
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
        
                            <p2 id = "body"> 👎 No records to display at the moment  </p2>
                            <br><br><br><br>
                    </form>
                </div><br><br>`;
                    console.log(output);
                    document.getElementById('fillin').innerHTML= output; 
                    alert ('the records arent non existent') 

    }
    
    })
    .catch(error => console.log(error));
}
    

        
            