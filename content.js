console.log("content script running");

var recorder = null

function onAccessApproved(stream){
    recorder = new MediaRecorder(stream)

    recorder.start();

    recorder.onstop = function(){
        stream.getTracks().forEach(function(track){
            if (track.readyState === "live"){
                track.stop();
            }
        })
    }

    recorder.ondataavailable = function(event){
        let recordedData = event.data;
        let url = URL.createObjectURL(recordedData);

        let a = document.createElement("a");

        a.style.display = "none";
        a.href = url;
        a.download = "screen-recording.webm";

        document.body.append(a);
        a.click();

        document.body.removeChild(a);

        URL.revokeObjectURL(url);
    }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message.action === "recording_request"){
        console.log("recording requested");
        sendResponse(`seen: ${message.action}`);

        navigator.mediaDevices.getDisplayMedia({
            audio: true,
            video:{
                width: 999999999,
                height: 999999999
            }
        }).then((stream)=>{
            onAccessApproved(stream)
        })
    }
    
    if (message.action === "stop_recording"){
        console.log("Stop recording");
        sendResponse(`seen: ${message.action}`);
        
        if(!recorder){
            return console.log("no recording")
        }
        else{
            recorder.stop();
        }
    }

})