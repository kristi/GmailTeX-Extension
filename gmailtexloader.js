// Load code ideas borrowed from the following userscripts:
// Pimp.my.Gmail
//   http://userscripts.org/scripts/review/75047
// Gmail 'Mark all as read' button
//   http://userscripts.org/scripts/review/75047
//
 
var attempt = 0;
var waitGmailLoad = setInterval(function() {
    if (attempt++ > 100) {
        clearInterval(waitGmailLoad);
        console.log("gmailtexloader: give up loading");
        return;
    }
    var canvas = document.getElementById("canvas_frame");
    if(canvas && canvas.contentDocument) { 
        var gmail = canvas.contentDocument;
        var sidebar = gmail.getElementsByClassName('nH pp');
        
        if (sidebar.length > 0) {
            clearInterval(waitGmailLoad);
            console.log("gmailtexloader: loading");
            loadGmailTeX(gmail);
        }
    }
}, 400);

function loadGmailTeX(gmail) {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = chrome.extension.getURL("gmailtex.js");
    gmail.getElementsByTagName("head")[0].appendChild(s);
}
