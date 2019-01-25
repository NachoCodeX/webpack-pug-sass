if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./sw.js', { scope: './' })
        .then(function (registration) {
            console.log("Service Worker registered", registration);

        })
        .catch(function (e) {
            console.log("Service worker failed to register", e);

        });
}