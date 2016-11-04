chrome.browserAction.onClicked.addListener(function(tab) {
	var url = encodeURIComponent(tab.url);
	var returnData = '';

	url = "https://pximg.xyz/api/v2/shtn/create?url=" + url;

	var x = new XMLHttpRequest();
	x.open('GET', url);
	x.responseType = 'json';
	x.onload = function() {
		shtnIt(x.response);
	};
	x.send();

	function shtnIt(response)
	{
		textR = response;
		console.log(response);
		returnData = textR.Message.url;
		console.log(returnData);
		chrome.notifications.create(
			"Shtn It!",
			{
				type: "basic",
				title: "Shtn It!",
				iconUrl: "icon_128x128.png",
				message: "Your shortened link has been copied to the clipboard.\n" + returnData,
			}
		);
		ctc(returnData);
	}
	function ctc(text) {
		var copyDiv = document.createElement('div');
		copyDiv.contentEditable = true;
		document.body.appendChild(copyDiv);
		copyDiv.innerHTML = text;
		copyDiv.unselectable = "off";
		copyDiv.focus();
		document.execCommand('SelectAll');
		document.execCommand("Copy", false, null);
		document.body.removeChild(copyDiv);
	}
});