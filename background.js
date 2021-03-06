// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    code: `
    var input = document.createElement('input');
    var url = window.location.href;
    var uuids = url.match(/[0-9]{13}\-[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/g)
    if(uuids){
    	var uuid = uuids[0]

	    input.setAttribute('value', uuid);
	    document.body.appendChild(input);
	    input.select();
	    var result = document.execCommand('copy');
	    document.body.removeChild(input);

	    var x = document.createElement("P");
	    x.style.position = 'absolute'; 
	    x.style.backgroundColor = 'yellow';
	    x.style.padding = '8px';
	    x.style.margin = '10px'
		var t = document.createTextNode("Copied: "+uuid);
		x.appendChild(t);
		document.body.appendChild(x); 
		setTimeout(()=>{
			document.body.removeChild(x); 
		}, 3000)   
	} else {
		alert("No Yoco UUID found in this URL")
	}
 	`
  });
});

