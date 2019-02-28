// post both redflag and interventions

document.getElementById('post-record').addEventListener('submit', post_record);

function post_record(e) {
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
        },
        cache : 'reload'
                    }
    
    // if (access_token === null ){
    //     // alert ("Login first ⛔🚫");
    //     window.location.replace(
    //         "index.html"
    //         );

    // }


    fetch(route,options)
    .then (res => res.json())
    .then (response_object => {
        console.log(response_object)
        if (response_object.error_message == "Some fields have no data"){
        return document.getElementById('message').innerHTML = "some fields \
        are missing 😠";
        }

        else if ((keys.body.length) < 20 ){
            return document.getElementById('message').innerHTML = 'write atleast \
            20 characters ✍️ ';
        }
        else if(response_object.message == "Successfully posted a new record"){
            window.location.replace(
                "active.html"
                );

            return document.getElementById('message').innerHTML = "Hooray !! claim received 🎆 🎇 ";
            
            }
        else if(response_object.status == 400){
            window.location.replace(
                "index.html"
                );
            }
        else{

            
            window.location.assign(
                "index.html"
                );
            return document.getElementById('message').innerHTML = "token is expired. Login again";
        }
    })

    .catch(error => console.log(error));
}








// css

// body,html
// {
//     font-family: Arial, Helvetica, sans-serif;
//     color: black solid 1px;
//     padding:0px;
//     font-size: 15px;

// }
// .marker {
// 	background-image: url('../images/mapbox-icon.png');
// 	background-size: cover;
// 	width: 50px;
// 	height: 50px;
// 	border-radius: 50%;
// 	cursor: pointer;
//   }
// #top{
// 	margin-top:-3%;
// }
// #map{
// 	margin-top: 8%;
// 	margin-left: 0%;
// 	box-shadow: #333;
// 	border:1px solid rgb(20, 5, 5);
// }

// #two
// {
//     float: left;
//     font-style: normal;
//     /*word-spacing: 10px;*/
    
// }
// #three
// {
//     float: right;
//     font-style: unset;
//     margin-top: 0px;
//     text-decoration:none;
// }
// header
// {
//     width: 100%;
// 	height: 10%;
// 	background-color: #222;
// 	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.01);

   
// }
// .first
// {
//     width: 900px;
// 	float: left;
// 	text-align: right;
// 	color: #fff;
// 	font-size: 17px;
// 	height: 0px;
// 	list-style: none;
// 	margin-top: 0; 
// }
// .first li
// {
//     float: left;
// 	padding:10px;
// 	text-transform: capitalize;
// 	margin-top: 0%;
// }
// .first li:last-child
// {
//     float: left;
// }

// .first li ul
// {
//     height: 20%;
// 	display: none;
// 	float: left;
// 	list-style: none;
// 	background-color: #333;
	
// }

// .first a
// {
//     color:rgb(15, 48, 90);
// 	text-decoration: none !important;
// 	float: left;
// }

// .first li:hover
// {
//     background-color: azure;
//     border-bottom-color: aqua;
// }
// h1
// {
//     min-height:300px;
//     text-align: unset;
//     padding-right: 15%;
// }

// input[type="text"] {
// 	border-radius:7px; 
// 	width: 50%;
// 	margin-bottom: 30px;
// 	height: 40px;
// 	padding: 5px;
// 	text-align: center;
// 	outline: none;
//     border: 1px solid rgb(20, 5, 5);
// 	margin-top: -30%;
// 	background-color: rgba(189, 169, 143, 0.582);
// }
// input[type="text"] {
// 	border-radius:7px; 
// 	width: 70%;
// 	margin-bottom: 30px;
// 	height: 25px;
// 	padding: 5px;
// 	text-align: center;
// 	outline: none;
//     border: 1px solid rgb(20, 5, 5);
//     margin-top: -30%;
// 	margin-left:6%;
// 	background-color: rgba(189, 169, 143, 0.582);

// }

// #body{
// 	border-radius:7px; 
// 	width: 70%;

// 	height: 90px;
// 	padding: 5px;
// 	text-align: center;
// 	outline: none;
//     border: 1px solid rgb(20, 5, 5);
// 	margin-left:3%;
// 	background-color: rgba(189, 169, 143, 0.582);
// }

// button{
// 	cursor: pointer;
// 	margin-top: -1px;
// 	width: 6%;
// 	margin-bottom: -1px;
// 	color:teal;
// 	border: 1px solid black;
// 	height: 40px;
// 	background-color:gold palevioletred;
// 	padding: 3px;
// 	text-align: center;
// 	border-radius:7px;
	
// }
// h1{
//     min-height: 40%;
//     margin-left: 30%;
// }
// select
// {
//     border-radius:7px; 
// 	width: 40%;
// 	margin-bottom: 30px;
// 	height: 29px;
// 	padding: 5px;
// 	text-align: center;
// 	outline: none;
//     border: 1px solid rgb(20, 5, 5);
//     margin-top: -30%;
//     margin-left: 2.5%;
// }
// textarea
// {
//     border-radius:7px; 
// 	width: 65%;
// 	margin-bottom: -90px;
// 	height: 20px;
// 	padding: 50px;
// 	text-align: center;
// 	outline: none;
//     border: 1px solid rgb(20, 5, 5);
//     margin-top: -30%;
//     margin-left: 2.5%;
// }
// input[type="file"]
// {
    
// 	margin-top: -15%;
// 	color: aqua;
// }

// #geo
// {
// 	margin-top: 7%;
// }

// h2{
// 	margin-left:10%;
// }



// html
// <!DOCTYPE html>
// <html>
// <head>
//     <meta charset="utf-8" />
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <title>User dashboard|iReporter</title>
//     <meta name="viewport" content="width=device-width, initial-scale=1">
//     <link rel="stylesheet" type="text/css" media="screen" href="css/user_record.css" />
//     <script src='https://api.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.js'></script>
//     <link href='https://api.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css' rel='stylesheet' />

    
// </head>
// <body style="background-image:url('images/paint.jpg');">
    
//         <header>
//             <ul class='first'>
//                 <li id="two"><a href=""> Post Report</a></li>
//                 <li><a href="active.html">My Reports</a></li>
//                 <li id="three"><a href="index.html" onclick="logout();">Logout</a></li>
//             </ul>
//         </header>
//         <div class="four">
//           <form id="post-record" action="#" >
//                 <br><br><h2>Place Your Record</h2>
                
//                       <div class="five">
//                         <label>Title</label>
//                         <input type="text" id = "title" placeholder="Main subject"><br><br>

//                         <label> Claim Type</label>
//                           <select name="Type of Claim" id= "Claim-type" placeholder='Choose one of the options'>
//                             <option id = "Red-Flag">redflag</option>
//                             <option id="Intervention">intervention</option>
//                           </select><br><br>
//                         <label>Your Claim</label>
//                         <textarea id = "body" type= "text"></textarea><br><br>
                        
//                         <div id='map' style='width: 1200px; height: 300px;'>
                        
//                         </div>
//                         <pre id='info'></pre>
//                         <div class="marker"></div>
                        
                        
//                         <!-- <input id="geo" type='float' placeholder="longtides and latitude coordinates">
//                         <br><br> -->
                        
//                         <label>Upload evidence here</label>
//                         <input type="file" action='' placeholder="Upload files here"><br><br>
                        
//                         <button id = "submit" type="submit" >Submit</button>
                        
//                       <span><p id="message"><span style"float:right;"="" style="
//                         float: right;
//                         color:red;
//                         text-decoration:  none;
//                     " >  </span></p> 
                       

                        
//                       </div>
//           </form> 
//         </div>
//         <script src="./JS/user_record.js"></script>
//         <script src="./JS/logout.js"></script>
//         </body>
// <script>
//   mapboxgl.accessToken = 'pk.eyJ1IjoibmljaG9sdXNtdXdvbmdlIiwiYSI6ImNqczc5a3VzdDA1NXEzeXBua3Z5cTZreW4ifQ.5bKx9vGtY_qLSwcxQ3Jwdw';
//   var map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/streets-v11',
//     center: [32.57669254964398, 0.2510635733600992], // starting position
//   });
//   map.on('click', function (e) {
//   document.getElementById('info').innerHTML =
//     // e.point is the x, y coordinates of the mousemove event relative
//     // to the top-left corner of the map
//     // JSON.stringify(e.point) + '<br />' +
//     // e.lngLat is the longitude, latitude geographical position of the event
    
    
//     // let m= JSON.stringify(e.lngLat); 
//     `<label >Geoloacation</label>
//     <input type="text" value='${JSON.stringify(e.lngLat)}' id = "afterclick" placeholder="Main subject">`
    
//     });
// </script>

// </html>
