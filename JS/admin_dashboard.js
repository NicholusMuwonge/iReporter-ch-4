// prevent access by someone without a token

function access(){
    if (access_token == null || access_token === false ){
        window.location.replace(
            "index.html"
            );
        }
}