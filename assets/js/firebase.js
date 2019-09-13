const messaging = firebase.messaging();


function checkToken(){
    messaging.getToken()
        .then(function (currentToken) {

            if (currentToken) {
                sendTokenToServer(currentToken);
            } else {
                // Show permission request.
                // Show permission UI.
                setTokenSentToServer(false);
            }
        })
        .catch(function (err) {
            setTokenSentToServer(false);
        });
}
window.onload = function() {
    messaging.requestPermission()
        .then(function () {
            console.log('Notification permission granted.');
            checkToken();
        })
        .catch(function (err) {
            console.log('Unable to get permission to notify.', err);
        });

// Callback fired if Instance ID token is updated.
        messaging.getToken()
            .then(function (refreshedToken) {

                setTokenSentToServer(false);
                sendTokenToServer(refreshedToken);
            })
            .catch(function (err) {
                console.log('Unable to retrieve refreshed token ', err);
            });
}

function isTokenSentToServer() {
    return window.localStorage.getItem('sentToServer') === 1;
}



function setTokenSentToServer(sent) {
    window.localStorage.setItem('sentToServer', sent ? 1 : 0);
}

function sendTokenToServer(device) {
    if (!isTokenSentToServer()) {
        let token = localStorage.getItem('token');
        if(token){
            let form = new FormData();
            form.append('web_device',device);

            return fetch(window.api+'user/notifications/token',
                {
                    method: 'PUT',
                    body: form,
                    headers: {'Accept': 'application/json',"Authorization":'Bearer '+token}
                }).then((response) => {

                return response.json();
            }).catch((err) => console.log('err',err));
        }
        setTokenSentToServer(true);
    } else {
        console.log('Token already sent to server so won\'t send it again ' +
            'unless it changes');
    }
}
