'use strict';

function triggerSiteConnectInit() {
    let channel_script = document.querySelector('script[src*="siteconnect"]'),
        code = channel_script.getAttribute("data-code");
    site_connect.setup(code);
}

window.addEventListener('load', function(_event) {
    console.log("get reference to app created by `data-senna` attribute");
    var app = senna.dataAttributeHandler.getApp();

    console.log("trigger Channel.me's siteconnect on page load");
    triggerSiteConnectInit();

    console.log("trigger siteconnect whenever the DOM changes significantly");
    app.on('endNavigate', function(event) {
        triggerSiteConnectInit();
    });

});
