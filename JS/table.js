


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
                <tr id="top-bar">
                <th>RECORD NO.</th>
                <th>USER NAME</th>
                <th>RECORD TITLE</th>
                <th>RECORD TYPE</th>
                <th>RECORD GEOLOCATION</th>
                <th>STATUS</th>
                <th>DATE CREATED</th>
                <th>BODY</th>
                <th>EVIDENCE</th>
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
                <td>${response_object.data[n].status}</td>
                <td>${response_object.data[n]['record_placement_date']}</td>
                <td>${response_object.data[n].body}</td>
                <td>None</td>
                </tr>`;
            
            console.log(output);
            document.getElementById('tblack').innerHTML= output;};    
        }
        
        else if (response.statusCode === 401 ){

            window.location.replace(
                "index.html"
                );
        }
        else if (response.statusCode === 404){
            alert ('no reports at the moment, Please create one ')
            
        }
        else{

            
            window.location.replace(
                "index.html"
                );
            
        }
        
        
    })
    .catch(error => console.log(error));

}
