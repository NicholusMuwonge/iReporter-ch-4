// The user can edit their geolocation.
// document.getElementById('submit-button').addEventListener('submit',get_one_record());
// document.getElementById('edit-button').addEventListener('submit',edit_record());
document.getElementById('afterclick-${response_object[n][record_no]}').addEventListener('click',edit_record(record_no));

function edit_record(record_no){
    // let record_no = document.getElementById('record_no').innerHTML;
    const route = 'https://databasetests.herokuapp.com/api/v2/record_no/'+record_no+'/';
    let record_geolocation = document.getElementById('afterclick-'+record_no+'').value;
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
        if (response_object.message === 'Present location has                    been updated successfully'){
            output = `<p class="good"> Record updated successfully </p>`;
            console.log(output);
            // alert('Record updated sucessfully ')
            document.getElementById('res-'+record_no+'').innerHTML= output;
            setTimeout(function(){document.getElementById("good").style.display = "none";},5000);
            setTimeout("location.href = 'active.html'",5000);

        }
        else if(response_object.error_message === 'some fields are missing'){
            output = `<p class="error"> Please fillin that missing field </p>`
                    
            console.log(output);
            document.getElementById('res-'+record_no+'').innerHTML= output; 
            setTimeout(function(){document.getElementById("error").style.display = "none";},5000);
        }
    })
    
    .catch(error => console.log(error));    
}




var load= document.getElementById('inner-tiles');

document.getElementById('delete').addEventListener('click',delete_record);
// document.getElementById('delete').addEventListener('click',show);


//  This is where the record is deleted.
function delete_record(record_no) {
    
    const route = 'https://databasetests.herokuapp.com/api/v2/records/'+record_no+'/delete/';
    access_token = localStorage.getItem('access_token');
    const options = {
        method : 'DELETE',
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
        if (response_object.message === "Record has been deleted successfully"){
            // document.getElementById('alert').display = "block";
            // output = 
            // console.log(output);
            document.getElementById('aler').innerHTML= `<p id="alert"> Record deleted successfully</p>`;
            setTimeout(function(){document.getElementById("alert").style.display = "none";},4000);
            // alert ('This record was successfully deleted 🚮')
            // output= `<p id="alert"> Record has been deleted</p>`
            // setTimeout(function(){document.getElementById("alert").style.display = "none";},5000);
            // return document.getElementById('alert').innerHTML= output;
            // document.location.reload()
            setTimeout("location.href = 'active.html'",4000);
            
           
           
}

        else if(response_object === "Token has expired") {
            window.location.replace(
                "index.html"
                );

        }
        else {
            output = `<p id="error">try outs </p>`
            document.getElementById('aler').innerHTML= output;
    
        }
    })
    
    .catch(error => console.log(error));

}































// output += `
//             <br><br>
//             <div class="four" id = "template">
//             <div class="four">
//                     <form style="background-image:url('images/paper.jpg')" >
//                                 <div class="five">
//                                 <img id="w" src="images/avatar1.png" alt="avatar"  >
//                                 <h2 id="user_id">${response_object['user_id']}</h2>
//                                 <h1 id = "record_date">${response_object['record_placement_date']}</h1><br><br>
//                                 <p2 id = "body">${response_object['body']}</p2>
//                                 <br><br><br><br>
        
//                                 <ul class='first'>
//                                 <h3 id = "inside-bars">
                                    
//                                     <li id="record_type">${response_object['record_type']}</li>
//                                     <li id ="status">${response_object['status']}</li>
//                                     <li id = "record_geolocation" >${response_object['record_geolocation']}</li>
//                                     <li id = "record_no" >${response_object['record_no']}</li>
                                    
//                                 </h3>
//                                 </ul>
                                
//                                 <div >
//                                     <button class="e" id = "edit-button" type= "submit" onclick="edit_record();" ><a></a></button>
                                    
//                                 </div>
                            
//                         </form>
//                     </div><br><br>`;
//                     console.log(output);
//                     document.getElementById('fillin').innerHTML= output;
//         }

//         else if(response_object === "Token has expired") {
//             window.location.replace(
//                 "index.html"
//                 );

//         }
//         else {
//             output = ``
            
//             output += `
//             <br><br>
//             <div class="four" id = "template">
//             <div class="four">
//                     <form style="background-image:url('images/paper.jpg')" >
//                                 <div class="five">
//                                 <img id="w" src="images/avatar1.png" alt="avatar"  >
//                                 <br><br>
            
//                                 <p2 id = "body"> 👎 No records to display at the moment</p2>
//                                 <br><br><br><br>
//                         </form>
//                     </div><br><br>`;



















// output += `
// <br><br>
// <div class="four" id = "template">
// <div class="four">
//         <form style="background-image:url('images/paper.jpg')" >
//                     <div class="five">
//                     <img id="w" src="images/avatar1.png" alt="avatar"  >
//                     <h2 id="user_id">${response_object['user_id']}</h2>
//                     <h1 id = "record_date">${response_object['record_placement_date']}</h1><br><br>
//                     <p2 id = "body">${response_object['body']}</p2>
//                     <br><br><br><br>

//                     <ul class='first'>
//                     <h3 id = "inside-bars">
//                         <li> <input  type="text" value="" id="update_record_geolocation" placeholder="update here .." ></li>
//                         <li id="record_type">${response_object['record_type']}</li>
//                         <li id ="status">${response_object['status']}</li>
//                         <li id = "record_geolocation" >${response_object['record_geolocation']}</li>
//                         <li id = "record_no" >${response_object['record_no']}</li>
                        
//                     </h3>
//                     </ul>
                    
//                     <div >
//                         <button class="e" id = "edit-button" type= "submit" onclick="edit_record();" ><a>Edit</a></button>
//                         <li id="del" type= "submit" onclick= "delete_record();"> 🚮 </li>
//                     </div>
                
//             </form>
//         </div><br><br>`;