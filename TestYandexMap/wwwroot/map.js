
window.mapFrame = {
    sendAddress: function (frameId, address) {
        const frame = document.getElementById(frameId);
        if (frame && frame.contentWindow) {
            frame.contentWindow.postMessage({ address }, "*");
        }
    }
};
