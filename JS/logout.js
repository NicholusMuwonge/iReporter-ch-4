
function logout(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    localStorage.removeItem('mapbox.eventData.uuid:bmljaG9sdXNtdXdvbmdl');
    localStorage.removeItem('mapbox.eventData:bmljaG9sdXNtdXdvbmdl');
    alert('Are you sure you want to be logged out ??')
    window.location.replace(
        "index.html"
        );
}