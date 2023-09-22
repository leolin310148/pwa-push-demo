if ('function' === typeof importScripts) {
    importScripts("https://js.pusher.com/beams/service-worker.js");
}


self.addEventListener("push", function (event) {
    const message = event.data.json();
    self.registration.showNotification( message.title, { body: message.text });
})
