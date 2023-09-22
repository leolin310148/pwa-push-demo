const config = {
    pushKey:
        "BK4r62oUQj7Uhr2FAHin3h1Vqvv0zkC_XZwM9Ej0hIwK216Gins_Ye-2Ju_RufJWTgiX2d7zcHCSqY8frmTjPjQ",
    appSyncUrl:
        "https://axd7bfjqezhupnepjttv5ylmo4.appsync-api.ap-northeast-1.amazonaws.com/graphql",
    appSyncApiKey: "da2-tbjj4nm6njghzekqcatk3yw7wm",
};

window.navigator.serviceWorker.ready.then(serviceWorkerRegistration => {
    const topic = 'news'
    const subscription = serviceWorkerRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(config.pushKey),
    });

    fetch(config.appSyncUrl, {
        method: "POST",
        headers: { "x-api-key": config.appSyncApiKey },
        body: JSON.stringify({ query: `mutation($topic: String, $subscription: String) {subscribe(topic: $topic, subscription: $subscription)}`,
            variables: { topic, subscription: JSON.stringify(subscription) } })
    }).then(() => {
        console.log("Subscribed to " + topic);
    }).catch((e) => {
        console.error("Error subscribing to " + topic, e);
    });
});

function urlB64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
