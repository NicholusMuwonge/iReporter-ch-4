
function logout(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    alert('successfully logged out')
    window.location.replace(
        "index.html"
        );
}