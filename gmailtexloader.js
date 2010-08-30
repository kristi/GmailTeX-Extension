// Load code ideas borrowed from the following userscripts:
// Pimp.my.Gmail
//   http://userscripts.org/scripts/review/75047
// Gmail 'Mark all as read' button
//   http://userscripts.org/scripts/review/75047
//

var path_to_mathjax = chrome.extension.getURL("MathJax/MathJax.js");

// Put the path_to_mathjax into a string
var injectContent = 'var path_to_mathjax = "' + path_to_mathjax + '";';
 
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
    var t = document.createTextNode(injectContent);
    s.appendChild(t);
    gmail.getElementsByTagName("head")[0].appendChild(s);
    
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = chrome.extension.getURL("gmailtex.js");
    gmail.getElementsByTagName("head")[0].appendChild(s);
}
