var setupDisplay;

setupDisplay = function(display) {
  var pt, setCoordinates, checkIntersection, el, liveUpdates;

  liveUpdates = true; // set to false to disable live alerts when rectangles intersect during re-sizing.

  pt = { x: 0, y: 0, startX: 0, startY: 0 };

  setCoordinates = function(e) {
    var eventObj;
    eventObj = window.event || e; 
    if (eventObj.pageX) { 
      pt.x = eventObj.pageX + window.pageXOffset;
      pt.y = eventObj.pageY + window.pageYOffset;
    } else if (eventObj.clientX) { 
      pt.x = eventObj.clientX + document.body.scrollLeft;
      pt.y = eventObj.clientY + document.body.scrollTop;
    }
  };

  checkIntersection = function() {
    var allBoxes, statusID, statusLine, boxOne, boxTwo, x, y;
    allBoxes = display.getElementsByClassName("rectangle");
    statusID = document.getElementById("status");
    for (x = 0; x < allBoxes.length - 1; x++) {
      for (y = x + 1; y < allBoxes.length; y++) {
        boxOne = allBoxes[x];
        boxTwo = allBoxes[y];
        if (!(boxOne.offsetTop > (boxTwo.offsetTop + boxTwo.clientHeight) || 
             (boxOne.offsetLeft + boxOne.clientWidth) < boxTwo.offsetLeft || 
             (boxOne.offsetTop + boxOne.clientHeight) < boxTwo.offsetTop || 
             boxOne.offsetLeft > (boxTwo.offsetLeft + boxTwo.clientWidth))) {
           statusLine = document.createElement('div');
           statusLine.textContent = boxOne.className + " intersects "+ boxTwo.className;
           statusID.appendChild(statusLine)
        }
      }
    }
  }

  el = null;

  display.onmousemove = function (e) {
    var boxCount;
    setCoordinates(e);
    if (el !== null) {
      boxCount = display.getElementsByClassName("rectangle").length;
      el.className = "rectangle " +boxCount;
      el.textContent = boxCount;
      el.style.width = Math.abs(pt.x - pt.startX) + 'px';
      el.style.height = Math.abs(pt.y - pt.startY) + 'px';
      el.style.lineHeight = Math.abs(pt.y - pt.startY) + 'px';
      el.style.left = (pt.x - pt.startX < 0) ? pt.x + 'px' : pt.startX + 'px';
      el.style.top = (pt.y - pt.startY < 0) ? pt.y + 'px' : pt.startY + 'px';
      if(liveUpdates) {
        document.getElementById("status").textContent = '';
        checkIntersection();
      }
    }
  }

  display.onclick = function (e) {
    if (el !== null) {
      el = null;
      display.style.cursor = "copy";
      if(!liveUpdates) {
        document.getElementById("status").textContent = '';
        checkIntersection();
      }
    } 
    else {
      pt.startX = pt.x;
      pt.startY = pt.y;
      el = document.createElement('div');
      el.className = 'rectangle'
      el.style.left = pt.x + 'px';
      el.style.top = pt.y + 'px';
      display.appendChild(el)
      display.style.cursor = "cell";
    }
  }
}
