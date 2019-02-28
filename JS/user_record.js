document.getElementById('post_record').addEventListener('click',postRecord);


function postRecord(e) {
    e.preventDefault();
    const route = 'https://databasetests.herokuapp.com/api/v2/records/';
    let record_title = document.getElementById('title').value; 
    let record_type = document.getElementById('Claim-type').value;
    let record_geolocation = document.getElementById('afterclick').value;
    let body = document.getElementById('body').value;

    let keys= {
        record_title : record_title ,
        record_type : record_type,
        record_geolocation : record_geolocation,
        body : body
    }
    access_token = localStorage.getItem('access_token');
    const options = {
        method : 'POST',
        body : JSON.stringify(keys),
        mode : 'cors',
        headers : {
            'Accept' : 'application/json',
            'content-type' : 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
        // cache : 'reload'
                    }
    if (access_token === null || access_token === false){
        // alert ("Login first ⛔🚫");
        window.location.replace(
            "index.html"
            );

    }


    fetch(route,options)
    .then (res => res.json())
    .then (response_object => {
        console.log(response_object)
        if (response_object.error_message == "Some fields have no data"){
        return document.getElementById('snackbar').innerHTML = `<div class="show" id="redresponse"><p>some fields \
        are missing 😠, Fill them out </p></div>`;
        }

        // else if ((keys.body.length) < 20 ){
        //     // var x=document.getElementById('snackbar');
        //     // `write atleast \
        //     // 20 characters ✍️ `
        //     // x.className= 'show';
        //     // setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

        //     return document.getElementById('snackbar').innerHTML = `<div class="show"><p>write atleast \
        //     20 characters ✍️ </p></div>`;
        // }
        else if(response_object.message == "Successfully posted a new record"){
            // window.location.replace(
            //     "active.html"
            //     );
            // window.location.replace(
            //         "active.html"
            //         );
            
            
            document.getElementById('snackbar').innerHTML = `<div class="show" id="goodresponse"><p>Incident Successfuly Reported</p></div>`
            // document.getElementById('around').requestFullscreen()
            // record_title.re; 
            // record_geolocation.reset();
            // body.reset();
        }
        else if(response_object.status === 401){
            window.location.replace(
                "index.html"
                );
            }
        else{

            
            window.location.assign(
                "index.html"
                );
            return document.getElementById('snackkbar').innerHTML = `token is expired. Login again`
        }
    })

    .catch(error => console.log(error));
}
  
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


// mapboxgl.accessToken = 'pk.eyJ1IjoibmljaG9sdXNtdXdvbmdlIiwiYSI6ImNqczc5a3VzdDA1NXEzeXBua3Z5cTZreW4ifQ.5bKx9vGtY_qLSwcxQ3Jwdw';
// var map = new mapboxgl.Map({
// container: 'map',
// style: 'mapbox://styles/mapbox/streets-v11',
// center: [32.57669254964398, 0.2510635733600992], // starting position
// });
// map.on('click', function (e) {
// document.getElementById('info').innerHTML =
// // e.point is the x, y coordinates of the mousemove event relative
// // to the top-left corner of the map
// // JSON.stringify(e.point) + '<br />' +
// // e.lngLat is the longitude, latitude geographical position of the event


// // let m= JSON.stringify(e.lngLat); 
// `<label >Geoloacation</label>
// <input type="text" value='${JSON.stringify(e.lngLat)}' id = "afterclick" placeholder="Main subject">`

// });


function myFunction() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
  
    // Add the "show" class to DIV
    x.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }



mapboxgl.accessToken = 'pk.eyJ1IjoibmljaG9sdXNtdXdvbmdlIiwiYSI6ImNqczc5a3VzdDA1NXEzeXBua3Z5cTZreW4ifQ.5bKx9vGtY_qLSwcxQ3Jwdw';
var coordinates = document.getElementById('coordinates');
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v9',
center: [0, 0],
zoom: 2
});
// add zoom in and out controls
map.addControl(new mapboxgl.NavigationControl());

var marker = new mapboxgl.Marker({
draggable: true
})
.setLngLat([0, 0])
.addTo(map);

function onDragEnd() {
    var lngLat = marker.getLngLat();
    coordinates.style.display = 'block';
    coordinates.innerHTML = 'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
    afterclick.value = lngLat.lng+','+lngLat.lat;
}

marker.on('dragend', onDragEnd);






