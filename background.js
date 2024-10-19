chrome.tabs.onUpdated.addListener((tabId, changeInfo, )=>{
    if(changeInfo.status === "complete"){
        chrome.scripting.executeScript({
            target: {tabId},
            files: ["./content.js"]
        }).then(() =>{
            console.log("content script injected")
        }).catch(err => console.log(err, "error injecting script"))
    }
})