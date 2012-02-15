DEBUG = true

##HELPER

#readerhelper(blob or file, returntype, callback)
#callback is called after the load event of the filereader
readerhelper = (file, what, callback) ->
  console.log 'readerheper('+file+','+what+','+callback+')' if DEBUG
  reader = new FileReader()
  reader.onload = (event) ->
    callback(event.target.result)

  what = what.toLowerCase()
  switch what
    when 'arraybuffer' then reader.readAsArrayBuffer(file)
    when 'binarystring' then reader.readAsBinaryString(file)
    when 'text' then reader.readAsText(file)
    else  reader.readAsDataURL(file)

##DRAG & DROP

getDropAs = (droparea, what, callback) ->

  #adds class 'dragover' to the droparea during drag action
  droparea.ondragover = ->
    droparea.className += " dragover"
    false

  #removes class 'dragover' after the drag actions ends
  droparea.ondragend = ->
    droparea.className = droparea.className.replace( /(?:^|\s)dragover(?!\S)/ , '' )
    false

  droparea.ondrop = (e) ->
    e.stopPropagation()
    e.preventDefault()
    readerhelper(e.dataTransfer.files[0], what, callback)

getDropAsDataURL = (fileselector, callback) ->
  getDropAs(fileselector, 'dataurl', callback)

getDropAsArrayBuffer = (fileselector, callback) ->
  getDropAs(fileselector, 'arraybuffer', callback)

getDropAsBinaryString = (fileselector, callback) ->
  getDropAs(fileselector, 'binarystring', callback)

getDropAsText = (fileselector, callback) ->
  getDropAs(fileselector, 'text', callback)

##PASTE
getPasteAs = (pastearea, what, callback) ->
  pastearea.onpaste = (e) ->
    console.log JSON.stringify(e.clipboardData.items[0]) if DEBUG
    console.log e.clipboardData.items[0]
    readerhelper(e.clipboardData.items[0].getAsFile(),what,callback)


getPasteAsDataURL = (fileselector, callback) ->
  getPasteAs(fileselector, 'dataurl', callback)

getPasteAsArrayBuffer = (fileselector, callback) ->
  getPasteAs(fileselector, 'arraybuffer', callback)

getPasteAsBinaryString = (fileselector, callback) ->
  getPasteAs(fileselector, 'binarystring', callback)

getPasteAsText = (fileselector, callback) ->
  getPasteAs(fileselector, 'text', callback)


##FILESELECT
getFileSelectAs = (fileselector, what, callback) ->
  fileselector.onchange = (e) ->
    console.log(e)
    e.stopPropagation()
    e.preventDefault()

    readerhelper(e.target.files[0],what,callback)

getFileSelectAsDataURL = (fileselector, callback) ->
  getFileSelectAs(fileselector, 'dataurl', callback)

getFileSelectAsArrayBuffer = (fileselector, callback) ->
  getFileSelectAs(fileselector, 'arraybuffer', callback)

getFileSelectAsBinaryString = (fileselector, callback) ->
  getFileSelectAs(fileselector, 'binarystring', callback)

getFileSelectAsText = (fileselector, callback) ->
  getFileSelectAs(fileselector, 'text', callback)

window.ReadFileBy =
  Paste:
    asDataURL: getPasteAsDataURL
    asText: getPasteAsText
    asBinaryString: getPasteAsBinaryString
    asArrayBuffer: getPasteAsArrayBuffer
  Drop:
    asDataURL: getDropAsDataURL
    asText: getDropAsText
    asBinaryString: getDropAsBinaryString
    asArrayBuffer: getDropAsArrayBuffer
  FileSelect:
    asDataURL: getFileSelectAsDataURL
    asText: getFileSelectAsText
    asBinaryString: getFileSelectAsBinaryString
    asArrayBuffer: getFileSelectAsArrayBuffer
