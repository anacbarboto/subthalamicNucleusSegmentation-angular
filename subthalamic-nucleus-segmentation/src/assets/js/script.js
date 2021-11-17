var newImage = document.getElementById("NewImage");
if (newImage.addEventListener)
    newImage.addEventListener("click", setImage, false);
else if (newImage.attachEvent)
    newImage.attachEvent('onclick', setImage);

function setImage(url) {
	newDiv = document.createElement('div');
	newDiv.setAttribute("id", "new-image");
	
    var brotherDiv = document.getElementById("hermano");

	var currentDiv = document.getElementById("padre");
	document.body.insertBefore(newDiv, brotherDiv.nextSibling);
  
    var params = [];
    params["images"] = [url];
    papaya.Container.addViewer("new-image",params)
    }
	
    console.log("aqui estoy ")

var newOverlay = document.getElementById("AddOverlay");
if (newOverlay.addEventListener)
    newOverlay.addEventListener("click", overlay, false);
else if (newOverlay.attachEvent)
    newOverlay.attachEvent('onclick', overlay);


function overlay(url) {
	console.log(url)
	papaya.Container.addImage(0, url)
}

var clearButton = document.getElementById("clear");
if (clearButton.addEventListener)
    clearButton.addEventListener("click", clearImage, false);
else if (clearButton.attachEvent)
    clearButton.attachEvent('onclick', clearImage);

function clearImage() {
	var element = document.getElementById("new-image");
    element.parentNode.removeChild(element);
}