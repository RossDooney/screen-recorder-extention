console.log("content script running");

chrome.runtime.onMessage.addListener((messgae, sender, sendResponse) => {
    if(messgae.action === "recording_request"){
        console.log("recording requested");
        sendResponse("seen");
    }

})