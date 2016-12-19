function drawArrow(c, x, y, angle) {
  var dx = Math.cos(angle);
  var dy = Math.sin(angle);
  c.beginPath();
  c.moveTo(x, y);
  c.lineTo(x - 8 * dx + 5 * dy, y - 8 * dy - 5 * dx);
  c.lineTo(x - 8 * dx - 5 * dy, y - 8 * dy + 5 * dx);
  c.fillStyle = "white";
  c.fill();
}

function canvasHasFocus() {
  return (document.activeElement || document.body) == document.body;
}

function drawText(c, originalText, x, y, angleOrNull, isSelected) {
  text = convertLatexShortcuts(originalText);
  c.font = '20px "Times New Roman", serif';
  c.fillStyle = 'white';
  var width = c.measureText(text).width;

  // center the text
  x -= width / 2;

  // position the text intelligently if given an angle
  if(angleOrNull != null) {
    var cos = Math.cos(angleOrNull);
    var sin = Math.sin(angleOrNull);
    var cornerPointX = (width / 2 + 5) * (cos > 0 ? 1 : -1);
    var cornerPointY = (10 + 5) * (sin > 0 ? 1 : -1);
    var slide = sin * Math.pow(Math.abs(sin), 40) * cornerPointX - cos * Math.pow(Math.abs(cos), 10) * cornerPointY;
    x += cornerPointX - sin * slide;
    y += cornerPointY + cos * slide;
  }

  // draw text and caret (round the coordinates so the caret falls on a pixel)
  if('advancedFillText' in c) {
    c.advancedFillText(text, originalText, x + width / 2, y, angleOrNull);
  } else {
    x = Math.round(x);
    y = Math.round(y);
    c.fillText(text, x, y + 6);
    if(isSelected && caretVisible && canvasHasFocus() && document.hasFocus()) {
      x += width;
      c.beginPath();
      c.moveTo(x, y - 10);
      c.lineTo(x, y + 10);
      c.stroke();
    }
  }
}

var caretTimer;
var caretVisible = true;

function resetCaret() {
  clearInterval(caretTimer);
  caretTimer = setInterval('caretVisible = !caretVisible; draw()', 500);
  caretVisible = true;
}

var canvas;
var nodeRadius = 30;
var nodes = [];
var links = [];
var pointer_animation = null;

var cursorVisible = true;
var snapToPadding = 6; // pixels
var hitTargetPadding = 6; // pixels
var selectedObject = null; // either a Link or a Node
var currentLink = null; // a Link
var movingObject = false;
var originalClick;

function drawUsing(c) {
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.save();
  c.translate(0.5, 0.5);

  for(var i = 0; i < nodes.length; i++) {
    c.lineWidth = 1;
    c.fillStyle = c.strokeStyle = (nodes[i] == selectedObject) ? 'blue' : 'black';
    nodes[i].draw(c);
  }
  for(var i = 0; i < links.length; i++) {
    c.lineWidth = 1;
    c.fillStyle = c.strokeStyle = (links[i] == selectedObject) ? 'blue' : 'black';
    links[i].draw(c);
  }
  if(currentLink != null) {
    c.lineWidth = 1;
    c.fillStyle = c.strokeStyle = 'black';
    currentLink.draw(c);
  }
  if (pointer_animation != null){
    pointer_animation.draw(c);
  }
  c.restore();
}

function draw() {
  drawUsing(canvas.getContext('2d'));
  saveBackup();
}

function selectObject(x, y) {
  for(var i = 0; i < nodes.length; i++) {
    if(nodes[i].containsPoint(x, y)) {
      return nodes[i];
    }
  }
  for(var i = 0; i < links.length; i++) {
    if(links[i].containsPoint(x, y)) {
      return links[i];
    }
  }
  return null;
}

function snapNode(node) {
  for(var i = 0; i < nodes.length; i++) {
    if(nodes[i] == node) continue;

    if(Math.abs(node.x - nodes[i].x) < snapToPadding) {
      node.x = nodes[i].x;
    }

    if(Math.abs(node.y - nodes[i].y) < snapToPadding) {
      node.y = nodes[i].y;
    }
  }
}

function enablecanvas(){
  canvas = document.getElementById('canvas');
  //restoreBackup();
  draw();

  canvas.onmousedown = function(e) {
    var mouse = crossBrowserRelativeMousePos(e);
    selectedObject = selectObject(mouse.x, mouse.y);
    movingObject = false;
    originalClick = mouse;

    if(selectedObject != null) {
      if(shift && selectedObject instanceof Node) {
        currentLink = new SelfLink(selectedObject, mouse);
      } else {
        movingObject = true;
        deltaMouseX = deltaMouseY = 0;
        if(selectedObject.setMouseStart) {
          selectedObject.setMouseStart(mouse.x, mouse.y);
        }
      }
      resetCaret();
    } else if(shift) {
      currentLink = new TemporaryLink(mouse, mouse);
    }

    draw();

    if(canvasHasFocus()) {
      // disable drag-and-drop only if the canvas is already focused
      return false;
    } else {
      // otherwise, let the browser switch the focus away from wherever it was
      resetCaret();
      return true;
    }
  };

  canvas.ondblclick = function(e) {
    var mouse = crossBrowserRelativeMousePos(e);
    selectedObject = selectObject(mouse.x, mouse.y);

    if(selectedObject == null) {
      selectedObject = new Node(mouse.x, mouse.y);
      nodes.push(selectedObject);
      resetCaret();
      draw();
    } else if(selectedObject instanceof Node) {
      if (!selectedObject.isAcceptState && !selectedObject.isRejectState) {
        selectedObject.isAcceptState = true;
      } else if (selectedObject.isAcceptState) {
        selectedObject.isAcceptState = false;
        selectedObject.isRejectState = true;
      } else if (selectedObject.isRejectState) {
        selectedObject.isAcceptState = false;
        selectedObject.isRejectState = false;
      }
      draw();
    }
  };

  canvas.onmousemove = function(e) {
    var mouse = crossBrowserRelativeMousePos(e);

    if(currentLink != null) {
      var targetNode = selectObject(mouse.x, mouse.y);
      if(!(targetNode instanceof Node)) {
        targetNode = null;
      }

      if(selectedObject == null) {
        if(targetNode != null) {
          currentLink = new StartLink(targetNode, originalClick);
        } else {
          currentLink = new TemporaryLink(originalClick, mouse);
        }
      } else {
        if(targetNode == selectedObject) {
          currentLink = new SelfLink(selectedObject, mouse);
        } else if(targetNode != null) {
          currentLink = new Link(selectedObject, targetNode);
        } else {
          currentLink = new TemporaryLink(selectedObject.closestPointOnCircle(mouse.x, mouse.y), mouse);
        }
      }
      draw();
    }

    if(movingObject) {
      selectedObject.setAnchorPoint(mouse.x, mouse.y);
      if(selectedObject instanceof Node) {
        snapNode(selectedObject);
      }
      draw();
    }
  };

  canvas.onmouseup = function(e) {
    movingObject = false;

    if(currentLink != null) {
      if(!(currentLink instanceof TemporaryLink)) {
        selectedObject = currentLink;
        links.push(currentLink);
        resetCaret();
      }
      currentLink = null;
      draw();
    }
  };
}

window.onload = function() {
  enablecanvas();
}

var shift = false;

document.onkeydown = function(e) {
  var key = crossBrowserKey(e);

  if(key == 16) {
    shift = true;
  } else if(!canvasHasFocus()) {
    // don't read keystrokes when other things have focus
    return true;
  } else if(key == 8) { // backspace key
    if(selectedObject != null && 'text' in selectedObject) {
      selectedObject.text = selectedObject.text.substr(0, selectedObject.text.length - 1);
      resetCaret();
      draw();
    }

    // backspace is a shortcut for the back button, but do NOT want to change pages
    return false;
  } else if(key == 46) { // delete key
    if(selectedObject != null) {
      for(var i = 0; i < nodes.length; i++) {
        if(nodes[i] == selectedObject) {
          nodes.splice(i--, 1);
        }
      }
      for(var i = 0; i < links.length; i++) {
        if(links[i] == selectedObject || links[i].node == selectedObject || links[i].nodeA == selectedObject || links[i].nodeB == selectedObject) {
          links.splice(i--, 1);
        }
      }
      selectedObject = null;
      draw();
    }
  }
};

document.onkeyup = function(e) {
  var key = crossBrowserKey(e);

  if(key == 16) {
    shift = false;
  }
};

document.onkeypress = function(e) {
  // don't read keystrokes when other things have focus
  var key = crossBrowserKey(e);
  if(!canvasHasFocus()) {
    // don't read keystrokes when other things have focus
    return true;
  } else if(key >= 0x20 && key <= 0x7E && !e.metaKey && !e.altKey && !e.ctrlKey && selectedObject != null && 'text' in selectedObject) {
    selectedObject.text += String.fromCharCode(key);
    resetCaret();
    draw();

    // don't let keys do their actions (like space scrolls down the page)
    return false;
  } else if(key == 8) {
    // backspace is a shortcut for the back button, but do NOT want to change pages
    return false;
  }
};

function crossBrowserKey(e) {
  e = e || window.event;
  return e.which || e.keyCode;
}

function crossBrowserElementPos(e) {
  e = e || window.event;
  var obj = e.target || e.srcElement;
  var x = 0, y = 0;
  while(obj.offsetParent) {
    x += obj.offsetLeft;
    y += obj.offsetTop;
    obj = obj.offsetParent;
  }
  return { 'x': x, 'y': y };
}

function crossBrowserMousePos(e) {
  e = e || window.event;
  return {
    'x': e.pageX || e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
    'y': e.pageY || e.clientY + document.body.scrollTop + document.documentElement.scrollTop,
  };
}

function crossBrowserRelativeMousePos(e) {
  var element = crossBrowserElementPos(e);
  var mouse = crossBrowserMousePos(e);
  return {
    'x': mouse.x - element.x,
    'y': mouse.y - element.y
  };
}

function output(text) {
  var element = document.getElementById('output');
  element.style.display = 'block';
  element.value = text;
}

function det(a, b, c, d, e, f, g, h, i) {
  return a*e*i + b*f*g + c*d*h - a*f*h - b*d*i - c*e*g;
}

function circleFromThreePoints(x1, y1, x2, y2, x3, y3) {
  var a = det(x1, y1, 1, x2, y2, 1, x3, y3, 1);
  var bx = -det(x1*x1 + y1*y1, y1, 1, x2*x2 + y2*y2, y2, 1, x3*x3 + y3*y3, y3, 1);
  var by = det(x1*x1 + y1*y1, x1, 1, x2*x2 + y2*y2, x2, 1, x3*x3 + y3*y3, x3, 1);
  var c = -det(x1*x1 + y1*y1, x1, y1, x2*x2 + y2*y2, x2, y2, x3*x3 + y3*y3, x3, y3);
  return {
    'x': -bx / (2*a),
    'y': -by / (2*a),
    'radius': Math.sqrt(bx*bx + by*by - 4*a*c) / (2*Math.abs(a))
  };
}

function fixed(number, digits) {
  return number.toFixed(digits).replace(/0+$/, '').replace(/\.$/, '');
}

function restoreBackup(data) {

  try {
    var backup = JSON.parse(data);

    for(var i = 0; i < backup.nodes.length; i++) {
      var backupNode = backup.nodes[i];
      var node = new Node(backupNode.x, backupNode.y);
      node.isAcceptState = backupNode.isAcceptState;
      node.text = backupNode.text;
      nodes.push(node);
    }
    for(var i = 0; i < backup.links.length; i++) {
      var backupLink = backup.links[i];
      var link = null;
      if(backupLink.type == 'SelfLink') {
        link = new SelfLink(nodes[backupLink.node]);
        link.anchorAngle = backupLink.anchorAngle;
        link.text = backupLink.text;
      } else if(backupLink.type == 'StartLink') {
        link = new StartLink(nodes[backupLink.node]);
        link.deltaX = backupLink.deltaX;
        link.deltaY = backupLink.deltaY;
        link.text = backupLink.text;
      } else if(backupLink.type == 'Link') {
        link = new Link(nodes[backupLink.nodeA], nodes[backupLink.nodeB]);
        link.parallelPart = backupLink.parallelPart;
        link.perpendicularPart = backupLink.perpendicularPart;
        link.text = backupLink.text;
        link.lineAngleAdjust = backupLink.lineAngleAdjust;
      }
      if(link != null) {
        links.push(link);
      }
    }
  } catch(e) {
    console.log("ERROR: Restore backup");
  }
  draw();
}

function saveBackup() {
  if(!localStorage || !JSON) {
    return;
  }

  var backup = {
    'nodes': [],
    'links': [],
  };
  for(var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    var backupNode = {
      'x': node.x,
      'y': node.y,
      'text': node.text,
      'isAcceptState': node.isAcceptState,
    };
    backup.nodes.push(backupNode);
  }
  for(var i = 0; i < links.length; i++) {
    var link = links[i];
    var backupLink = null;
    if(link instanceof SelfLink) {
      backupLink = {
        'type': 'SelfLink',
        'node': nodes.indexOf(link.node),
        'text': link.text,
        'anchorAngle': link.anchorAngle,
      };
    } else if(link instanceof StartLink) {
      backupLink = {
        'type': 'StartLink',
        'node': nodes.indexOf(link.node),
        'text': link.text,
        'deltaX': link.deltaX,
        'deltaY': link.deltaY,
      };
    } else if(link instanceof Link) {
      backupLink = {
        'type': 'Link',
        'nodeA': nodes.indexOf(link.nodeA),
        'nodeB': nodes.indexOf(link.nodeB),
        'text': link.text,
        'lineAngleAdjust': link.lineAngleAdjust,
        'parallelPart': link.parallelPart,
        'perpendicularPart': link.perpendicularPart,
      };
    }
    if(backupLink != null) {
      backup.links.push(backupLink);
    }
  }

  localStorage['fsm'] = JSON.stringify(backup);
}

var greekLetterNames = [ 'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega' ];

function convertLatexShortcuts(text) {
  // html greek characters
  for(var i = 0; i < greekLetterNames.length; i++) {
    var name = greekLetterNames[i];
    text = text.replace(new RegExp('\\\\' + name, 'g'), String.fromCharCode(913 + i + (i > 16)));
    text = text.replace(new RegExp('\\\\' + name.toLowerCase(), 'g'), String.fromCharCode(945 + i + (i > 16)));
  }

  // subscripts
  for(var i = 0; i < 10; i++) {
    text = text.replace(new RegExp('_' + i, 'g'), String.fromCharCode(8320 + i));
  }

  return text;
}