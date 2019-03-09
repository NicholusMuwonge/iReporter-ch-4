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





window.onload = function get_records() {
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
    if (access_token == null || access_token === false ){
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
            let output =` <table width="85%" id="tblack" >
                <tr id="top-title">
                <th>RECORD NO.</th>
                <th>USER NAME</th>
                <th>RECORD TITLE</th>
                <th>RECORD TYPE</th>
                <th>RECORD GEOLOCATION</th>
                <th>STATUS</th>
                <th>DATE CREATED</th>
                <th>BODY</th>
                <th>EVIDENCE</th>
                <th>EDIT</th>
                <tr>`
            for(n in response_object.data){
                console.log(response_object.data[n]);
                output += `
                <tr>
                <td>${response_object.data[n]['record_no']}</td>
                <td>${response_object.data[n]['user_name']}</td>
                <td>${response_object.data[n]['record_title']}</td>
                <td>${response_object.data[n]['record_type']}</td>
                <td>${response_object.data[n]['record_geolocation']}</td>
                <td>${response_object.data[n]['status']}</td>
                <td>${response_object.data[n]['record_placement_date']}</td>
                <td>${response_object.data[n].body}</td>
                <td>None</td>
                <td><span  onclick="openTab('rec-${response_object.data[n]['record_no']}')"><img src="./images/edit.png" style="width:20px; height: 20px; outline: none; cursor: pointer; align-items: center;" title="Click here to edit record status"></span></td>
                </tr>
                <div id="rec-${response_object.data[n]['record_no']}" class="containerTab"    style="display:none; "><span onclick="this.parentElement.style.display='none'" class="closebtn" id="botton" ><img src="./images/error.png" style="height:20px; width:20px; background-color:rgba(255, 222, 173, 0); border: rgba(255, 222, 173, 0); z-index:4;"></span>
                <div class="statuschange" ><button class="u" id="recs-${response_object.data[n]['record_no']}" value="Under Investigation" title="I am starting investigations on the incident" onclick="edit_record(${response_object.data[n]['record_no']},'recs-${response_object.data[n]['record_no']}')">Under Investigation</button><button value="Resolved" class="r" id="r-${response_object.data[n]['record_no']}" title="I have resolved the issue" onclick="edit_record(${response_object.data[n]['record_no']},'r-${response_object.data[n]['record_no']}')">Resolved</button><button class="re" id="re-${response_object.data[n]['record_no']}" value="Denied" title="I wont solve this issue" onclick=edit_record(${response_object.data[n]['record_no']},'re-${response_object.data[n]['record_no']}') >Denied</button><label class="know"  >Note:\ on click on one of the buttons the record status will be changed.</label></div>
                
                </div>
                <!-- If you want the ability to close the container, add a close button -->
                `;
            
            console.log(output);
            document.getElementById('inner-tile').innerHTML= output;};    
        }
        
        else if (response.status === 401 ){

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
        else{

            
            window.location.replace(
                "index.html"
                );
            
        }
        
        
    })
    .catch(error => console.log(error));

}




function openTab(Tabname) {
    // e.preventDefault;
    var i, x;
    x = document.getElementById(Tabname);
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "block";
        
    }
    document.getElementById(Tabname).style.display = "block";
  }








  function edit_record(record_no, record_id){
    // let record_no = document.getElementById('search-area').value;
    const route = 'https://databasetests.herokuapp.com/api/v2/record/'+record_no+'/status';
    let record_status = document.getElementById(record_id).innerHTML;
    access_token = localStorage.getItem('access_token');
    const options = {
        method : 'PUT',
        body : JSON.stringify({
            status:record_status
        }),
        mode : 'cors',
        headers : {
            'Accept' : 'application/json',
            'content-type' : 'application/json',
            'Authorization': `Bearer ${access_token}`
        },
        cache : 'no-cache'
                    }
    if (access_token == null || access_token === false){
        window.location.replace(
            "index.html"
            );
        }

    fetch(route,options)
    .then (res => res.json())
    .then (response_object => {
        console.log(response_object)
        if (response_object){
            output = `<p> status updated successfully </p>`
            
            
            
            console.log(output);
            document.getElementById('aler').style.display="block";
            document.getElementById('aler').innerHTML= output;
            setTimeout(function(){document.getElementById("aler").style.display = "none";},5000);
            setTimeout("location.href = 'admin_claims.html'",5000);
        }

        else if(response_object === "Token has expired") {
            window.location.replace(
                "index.html"
                );

        }
        else {
            
                        alert ('the record is non existent') 
        }
    })
    
    .catch(error => console.log(error));
    
}




// var allreds=document.getElementById('red');

function get_all_redflags(){
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
            output = ` <table width="85%" id="tblack" >
            <tr id="top-title">
            <th>RECORD NO.</th>
            <th>USER NAME</th>
            <th>RECORD TITLE</th>
            <th>RECORD TYPE</th>
            <th>RECORD GEOLOCATION</th>
            <th>STATUS</th>
            <th>DATE CREATED</th>
            <th>BODY</th>
            <th>EVIDENCE</th>
            <th>EDIT</th>
            <tr>`
            for(n in response_object){
        
                output += `
                <tr>
                <td>${response_object[n]['record_no']}</td>
                <td>${response_object[n]['user_name']}</td>
                <td>${response_object[n]['record_title']}</td>
                <td>${response_object[n]['record_type']}</td>
                <td>${response_object[n]['record_geolocation']}</td>
                <td>${response_object[n]['status']}</td>
                <td>${response_object[n]['record_placement_date']}</td>
                <td>${response_object[n].body}</td>
                <td>None</td>
                <td><span  onclick="openTab('rec-${response_object[n]['record_no']}')"><img src="./images/edit.png" style="width:20px; height: 20px; outline: none; cursor: pointer; align-items: center;" title="Click here to edit record status"></span></td>
                </tr>
                <div id="rec-${response_object[n]['record_no']}" class="containerTab"    style="display:none; "><span onclick="this.parentElement.style.display='none'" class="closebtn" id="botton" ><img src="./images/error.png" style="height:20px; width:20px; background-color:rgba(255, 222, 173, 0); border: rgba(255, 222, 173, 0); z-index:4;"></span>
                <div class="statuschange" ><button class="u" id="recs-${response_object[n]['record_no']}" value="Under Investigation" title="I am starting investigations on the incident" onclick="edit_record(${response_object[n]['record_no']},'recs-${response_object[n]['record_no']}')">Under Investigation</button><button value="Resolved" class="r" id="r-${response_object[n]['record_no']}" title="I have resolved the issue" onclick="edit_record(${response_object[n]['record_no']},'r-${response_object[n]['record_no']}')">Resolved</button><button class="re" id="re-${response_object[n]['record_no']}" value="Denied" title="I wont solve this issue" onclick=edit_record(${response_object[n]['record_no']},'re-${response_object[n]['record_no']}') >Denied</button><label class="know"  >Note:\ on click on one of the buttons the record status will be changed.</label></div>
                
                </div>
                <!-- If you want the ability to close the container, add a close button -->
                `;
            
            console.log(output);
            document.getElementById('inner-tile').innerHTML= output;};
    }
})
    
    .catch(error => console.log(error));
}









function get_all_interventions(){
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
            output = ` <table width="85%" id="tblack" >
            <tr id="top-title">
            <th>RECORD NO.</th>
            <th>USER NAME</th>
            <th>RECORD TITLE</th>
            <th>RECORD TYPE</th>
            <th>RECORD GEOLOCATION</th>
            <th>STATUS</th>
            <th>DATE CREATED</th>
            <th>BODY</th>
            <th>EVIDENCE</th>
            <th>EDIT</th>
            <tr>`
            for(n in response_object){
        
                output += `
                <tr>
                <td>${response_object[n]['record_no']}</td>
                <td>${response_object[n]['user_name']}</td>
                <td>${response_object[n]['record_title']}</td>
                <td>${response_object[n]['record_type']}</td>
                <td>${response_object[n]['record_geolocation']}</td>
                <td>${response_object[n]['status']}</td>
                <td>${response_object[n]['record_placement_date']}</td>
                <td>${response_object[n].body}</td>
                <td>None</td>
                <td><span  onclick="openTab('rec-${response_object[n]['record_no']}')"><img src="./images/edit.png" style="width:20px; height: 20px; outline: none; cursor: pointer; align-items: center;" title="Click here to edit record status"></span></td>
                </tr>
                <div id="rec-${response_object[n]['record_no']}" class="containerTab"    style="display:none; "><span onclick="this.parentElement.style.display='none'" class="closebtn" id="botton" ><img src="./images/error.png" style="height:20px; width:20px; background-color:rgba(255, 222, 173, 0); border: rgba(255, 222, 173, 0); z-index:4;"></span>
                <div class="statuschange" ><button class="u" id="recs-${response_object[n]['record_no']}" value="Under Investigation" title="I am starting investigations on the incident" onclick="edit_record(${response_object[n]['record_no']},'recs-${response_object[n]['record_no']}')">Under Investigation</button><button value="Resolved" class="r" id="r-${response_object[n]['record_no']}" title="I have resolved the issue" onclick="edit_record(${response_object[n]['record_no']},'r-${response_object[n]['record_no']}')">Resolved</button><button class="re" id="re-${response_object[n]['record_no']}" value="Denied" title="I wont solve this issue" onclick=edit_record(${response_object[n]['record_no']},'re-${response_object[n]['record_no']}') >Denied</button><label class="know"  >Note:\ on click on one of the buttons the record status will be changed.</label></div>
                
                </div>
                <!-- If you want the ability to close the container, add a close button -->
                `;
            
            console.log(output);
            document.getElementById('inner-tile').innerHTML= output;};
    }
})
    
    .catch(error => console.log(error));
}

