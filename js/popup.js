document.addEventListener("DOMContentLoaded", ()=>{
    const startVideoButton = document.querySelector("button#start_video")
    const stopVideoButton = document.querySelector("button#stop_video")

    startVideoButton.addEventListener("click", ()=>{
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {action: "recording_request"}, function(response){
                if(!chrome.runtime.lastError){
                    console.log(response)
                }else{
                    console.log(chrome.runtime.lastError, 'line 11 error')
                }
            })
        })
    })

    stopVideoButton.addEventListener("click", ()=>{
        console.log("stop button clicked")
    })
})