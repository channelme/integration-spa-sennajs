'use strict';

function setCode() {
    let container = document.querySelector('script#wwwchannelme'),
        _set = () => document.querySelector('#code').textContent = container.textContent;

    if(container.textContent) {
        _set();
    }
    else
    {
        let observer = new MutationObserver(_set);
        observer.observe(container, {attributes: true, childList: true, characterData: true});
    }
}

window.addEventListener('load', function(_event) {
    console.log("get reference to app created by `data-senna` attribute");
    var app = senna.dataAttributeHandler.getApp();

    console.log("set Channel.me's code on page load");
    setCode();

    console.log("set the code whenever the DOM changes significantly");
    app.on('endNavigate', function(event) {
        console.log("navigation change occurred");
        setCode();
    });

});
