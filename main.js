(function() {
  var DEBUG, getDropAs, getDropAsArrayBuffer, getDropAsBinaryString, getDropAsDataURL, getDropAsText, getFileSelectAs, getFileSelectAsArrayBuffer, getFileSelectAsBinaryString, getFileSelectAsDataURL, getFileSelectAsText, getPasteAs, getPasteAsArrayBuffer, getPasteAsBinaryString, getPasteAsDataURL, getPasteAsText, readerhelper;
  DEBUG = true;
  readerhelper = function(file, what, callback) {
    var reader;
    if (DEBUG) {
      console.log('readerheper(' + file + ',' + what + ',' + callback + ')');
    }
    reader = new FileReader();
    reader.onload = function(event) {
      return callback(event.target.result);
    };
    what = what.toLowerCase();
    switch (what) {
      case 'arraybuffer':
        return reader.readAsArrayBuffer(file);
      case 'binarystring':
        return reader.readAsBinaryString(file);
      case 'text':
        return reader.readAsText(file);
      default:
        return reader.readAsDataURL(file);
    }
  };
  getDropAs = function(droparea, what, callback) {
    droparea.ondragover = function() {
      droparea.className += " dragover";
      return false;
    };
    droparea.ondragend = function() {
      droparea.className = droparea.className.replace(/(?:^|\s)dragover(?!\S)/, '');
      return false;
    };
    return droparea.ondrop = function(e) {
      e.stopPropagation();
      e.preventDefault();
      return readerhelper(e.dataTransfer.files[0], what, callback);
    };
  };
  getDropAsDataURL = function(fileselector, callback) {
    return getDropAs(fileselector, 'dataurl', callback);
  };
  getDropAsArrayBuffer = function(fileselector, callback) {
    return getDropAs(fileselector, 'arraybuffer', callback);
  };
  getDropAsBinaryString = function(fileselector, callback) {
    return getDropAs(fileselector, 'binarystring', callback);
  };
  getDropAsText = function(fileselector, callback) {
    return getDropAs(fileselector, 'text', callback);
  };
  getPasteAs = function(pastearea, what, callback) {
    return pastearea.onpaste = function(e) {
      if (DEBUG) {
        console.log(JSON.stringify(e.clipboardData.items[0]));
      }
      console.log(e.clipboardData.items[0]);
      return readerhelper(e.clipboardData.items[0].getAsFile(), what, callback);
    };
  };
  getPasteAsDataURL = function(fileselector, callback) {
    return getPasteAs(fileselector, 'dataurl', callback);
  };
  getPasteAsArrayBuffer = function(fileselector, callback) {
    return getPasteAs(fileselector, 'arraybuffer', callback);
  };
  getPasteAsBinaryString = function(fileselector, callback) {
    return getPasteAs(fileselector, 'binarystring', callback);
  };
  getPasteAsText = function(fileselector, callback) {
    return getPasteAs(fileselector, 'text', callback);
  };
  getFileSelectAs = function(fileselector, what, callback) {
    return fileselector.onchange = function(e) {
      console.log(e);
      e.stopPropagation();
      e.preventDefault();
      return readerhelper(e.target.files[0], what, callback);
    };
  };
  getFileSelectAsDataURL = function(fileselector, callback) {
    return getFileSelectAs(fileselector, 'dataurl', callback);
  };
  getFileSelectAsArrayBuffer = function(fileselector, callback) {
    return getFileSelectAs(fileselector, 'arraybuffer', callback);
  };
  getFileSelectAsBinaryString = function(fileselector, callback) {
    return getFileSelectAs(fileselector, 'binarystring', callback);
  };
  getFileSelectAsText = function(fileselector, callback) {
    return getFileSelectAs(fileselector, 'text', callback);
  };
  window.ReadFileBy = {
    Paste: {
      asDataURL: getPasteAsDataURL,
      asText: getPasteAsText,
      asBinaryString: getPasteAsBinaryString,
      asArrayBuffer: getPasteAsArrayBuffer
    },
    Drop: {
      asDataURL: getDropAsDataURL,
      asText: getDropAsText,
      asBinaryString: getDropAsBinaryString,
      asArrayBuffer: getDropAsArrayBuffer
    },
    FileSelect: {
      asDataURL: getFileSelectAsDataURL,
      asText: getFileSelectAsText,
      asBinaryString: getFileSelectAsBinaryString,
      asArrayBuffer: getFileSelectAsArrayBuffer
    }
  };
}).call(this);
