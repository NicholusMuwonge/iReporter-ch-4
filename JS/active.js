


function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  }
  
function closeNav() {
document.getElementById("mySidenav").style.width = "0";
document.getElementById("main").style.marginLeft= "0";
document.body.style.backgroundColor = "white";
}









// document.getElementById('button').addEventListener('click',openTab)

function openTab(Tabname) {
    // e.preventDefault;
    var i, x;
    x = document.getElementById(Tabname);
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "block";
        
    }
    document.getElementById(Tabname).style.display = "block";
  }



// for click and expand
// var coll = document.getElementsByClassName("collapsible");
// var i;

// for (i = 0; i < coll.length; i++) {
//   coll[i].addEventListener("click", function() {
//     this.classList.toggle("active");
//     var content = this.nextElementSibling;
//     if (content.style.maxHeight){
//       content.style.maxHeight = null;
//     } else {
//       content.style.maxHeight = content.scrollHeight + "px";
//     } 
//   });
// }








// window.onload = function get_records() {
    
//     const route = 'https://databasetests.herokuapp.com/api/v2/records/';
//     access_token = localStorage.getItem('access_token');
//     const options = {
//         method : 'GET',
//         mode : 'cors',
//         headers : {
            
//             'Authorization': `Bearer ${access_token}`
//         },
//         cache : 'no-cache'
//                     }
//     // if (access_token == null || access_token === false){
//     //     // alert ("Login first ⛔🚫");
//     //     window.location.replace(
//     //         "index.html"
//     //         );
//     //     }

//     fetch(route,options)
//     .then (res => res.json())
//     .then (response_object => {
//         console.log(response_object)
//         if (response_object.msg == 'Successfully got all record  records'){
//             let output =``
//             for(n in response_object.data){
//                 console.log(response_object.data[n]);
//                 output += `<br>
//                 <div id="inner-tiles">
                        
//                     <div>
//                         <p id="inner-title">${response_object.data[n]['record_title']}<p id="type">${response_object.data[n]['record_type']}</p><p id="type">${response_object.data[n]['status']}</p></p><button id="view" onclick="openTab('b1');"><img src="./images/plus.png" style="height:20px; width:20px;"></button><button id="edit">Edit</button><button id="delete"><img src="./images/negative.png" style="height:20px; width:20px;"></button>
                        
//                     </div>
//                     <div id="b1" class="containerTab" style="display:none; background: #504747ce">
//                             <!-- If you want the ability to close the container, add a close button -->
//                             <span onclick="this.parentElement.style.display='none'" class="closebtn" id="botton" ><img src="./images/error.png" style="height:20px; width:20px; background-color:rgba(255, 222, 173, 0); border: rgba(255, 222, 173, 0);"></span>
//                         <div id="stretch">
                            
//                             <p>${response_object.data[n]['body']}</p>
//                             <p id="geo">Incident happened at<p>:      ${response_object.data[n]['record_geolocation']}</p></p>
//                         </div>
//                     </div>
//                 </div>`;
            
//             console.log(output);
//             document.getElementById('major-tile').innerHTML= output;};    
//         }
        
//         else if (status === 401 ){

//             window.location.replace(
//                 "index.html"
//                 );
//         }
//         else if (response.statusCode === 404){
//             alert ('no reports at the moment, Please create one ')
//             // window.location.assign(
//             //     "user_record.html"
//             //     );
//         }
//         else{

            
//             window.location.replace(
//                 "index.html"
//                 );
            
//         }
        
        
//     })
//     .catch(error => console.log(error));

// }



 window.onload = function get_one_person_records() {
    access_token = localStorage.getItem('access_token');
    user_id = localStorage.getItem('user_id');
    user_name = localStorage.getItem('user_name');
    const route = 'https://databasetests.herokuapp.com/api/v2/auth/users/'+user_id+'/records/';

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
            for(n in response_object){
                output += `
                <br>
            <div class="inner-tiles" >      
                <div>
                    <p class="inner-title">${response_object[n]['record_title']}<p id="type">${response_object[n]['record_type']}</p><p id="type">${response_object[n]['status']}</p></p><button id="view" onclick="openTab('rec-${response_object[n]['record_no']}')"><img src="./images/plus.png" style="height:20px; width:20px;"></button><label id="edit" ><a  href="#open-modal-${response_object[n]['record_no']}"><img src="./images/edit.png" style="height:20px; width:20px;"></a></label><button id="delete" onclick="delete_record(${response_object[n]['record_no']});"><img src="./images/delete.png" style="height:20px; width:20px;"></button>
                </div>
                <div id="rec-${response_object[n]['record_no']}" class="containerTab"    style="display:none; background: #504747ce">
                        <!-- If you want the ability to close the container, add a close button -->
                        <span onclick="this.parentElement.style.display='none'" class="closebtn" id="botton" ><img src="./images/error.png" style="height:20px; width:20px; background-color:rgba(255, 222, 173, 0); border: rgba(255, 222, 173, 0);"></span>
                    <div id="stretch">
                        
                        <p>${response_object[n]['body']}</p>
                        <p id="geo">Incident happened at<p>:      ${response_object[n]['record_geolocation']}</p></p>
                        <p id="record_no" value="" >${response_object[n]['record_no']}</p>
                    </div>
                </div>
            </div>
            <div id="myModal" class="modal">

        <!-- Modal content -->
        <div class="modal-content" id="modal-content">
          <span class="close">&times;</span>
          
        </div>
      
      </div>     
        

      <!-- <a href="#open-modal">Open Modal</a> -->
        <div id="open-modal-${response_object[n]['record_no']}" class="modal-window">
        <div>
            <a href="#modal-close" title="Close" class="modal-close">close &times;</a>
            <h1>Edit Geolocation</h1>
            <div>(please drag the marker across the map to edit geolocation)</div>
            <p id="instructions">Note : If you move the cursor on the map, you change the geolocation of <thead>incident and if u hit edit button its done , otherwise if you arent sure, just click the X button and cancle transaction</thead></p>
          <div id='map' class="map"></div>
        <pre id='coordinates' class='coordinates'></pre>
        <br>
        <input type="text" id = "afterclick-${response_object[n]['record_no']}" value='' required="" placeholder="Geolocation(move marker on the map)" class="afterclick">
        <tr><td><button  id = "post_record-${response_object[n]['record_no']}" class="post_record" type="button" onclick="edit_record(${response_object[n]['record_no']});">Edit</button></td></tr>
        <span id="res-${response_object[n]['record_no']}" class="res"></span><span id="gres"></span>
        </div>
        </div>
                
          `;
            
            console.log(output);
            document.getElementById('major-tile').innerHTML= output;};
            
            output1 = `
            <p id="stats">${user_name}'s \ Statistics</p>
            <p id="record">Total record no    :  ${response_object.length}</p>
                        `
            document.getElementById('side-bar').innerHTML= output1;
            }



        else if(response_object === "Token has expired") {
            window.location.replace(
                "index.html"
                );

        }
        else if (response_object === null){ 
            output = ``
            
            output += `
            <br>
            <div id="inner-tiles">

                    <p id="type"> You have no records, please Create some</p>

            </div>`;
        
            console.log(output);
            document.getElementById('major-tile').innerHTML= output;};
            // alert ('the record is non existent') 
            }
                        
    )
    
    .catch(error => console.log(error));
    

}


























// trying modal box







// set alert timeout


// function on(){
//     setTimeout(function(){document.getElementById("error").style.display = "none";},5000);
// }
















// <br>
//                 <div id="inner-tiles">      
//                     <div>
//                         <p id="inner-title">${response_object[n]['record_title']}<p id="type">${response_object[n]['record_type']}</p><p id="type">${response_object[n]['status']}</p></p><button id="view" onclick="openTab('b1');"><img src="./images/plus.png" style="height:20px; width:20px;"></button><button id="edit" >Edit</button><button id="delete"><img src="./images/negative.png" style="height:20px; width:20px;"></button>
                        
//                     </div>
//                     <div id="b1" class="containerTab" style="display:none; background: #504747ce">
//                             <!-- If you want the ability to close the container, add a close button -->
//                             <span onclick="this.parentElement.style.display='none'" class="closebtn" id="botton" ><img src="./images/error.png" style="height:20px; width:20px; background-color:rgba(255, 222, 173, 0); border: rgba(255, 222, 173, 0);"></span>
//                         <div id="stretch">
                            
//                             <p>${response_object[n]['body']}</p>
//                             <p id="geo">Incident happened at<p>:      ${response_object[n]['record_geolocation']}</p></p>
//                             <p id="record_no" value="" >${response_object[n]['record_no']}</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div id="myModal" class="modal">

//             <!-- Modal content -->
//             <div class="modal-content" id="modal-content">
//               <span class="close">&times;</span>
              
//               <p id="instructions">Note : If you move the cursor on the map, you change the geolocation of <thead>incident and if u hit edit button its done , otherwise if you arent sure, just click the X button and cancle transaction</thead></p>
//               <div id='map'></div>
//             <pre id='coordinates' class='coordinates'></pre>
//             <br>
//             <input type="text" value='' id = "afterclick" required="" placeholder="Geolocation(move marker on the map)" class="afterclick">
//             <tr><td><button  id = "post_record"  type="button" onclick="edit_record();">Edit</button></td></tr>
//             </div>
          
//           </div>