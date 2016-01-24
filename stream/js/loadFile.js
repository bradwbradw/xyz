
/*
<!--
  By default, we assume Ajax uploads are not supported.
  Later we'll detect support and change this message if found.
-->

  <!--
    Also by default, we disable the upload button.
    If Ajax uploads are supported we'll enable it.
  -->
*/

var filename;
  function writeTop(){

    return ''+
'<p id="support-notice">Ajax uploads unsupported<br/>may not work...</p>'+
'<!-- The form starts -->'+
'<form action="/" method="post" enctype="multipart/form-data" id="form-id">'+
'  <!-- The file to upload -->'+
'  <br/><input id="file-id" type="file" name="our-file" />'+
'  <br/><input type="button" value="Upload" id="upload-button-id" disabled="disabled" />'+
//'  <!-- A different field, just for the sake of the example -->'+
//'  <p><label>Some other field: <input name="other-field" type="text" id="other-field-id" /></label></p>'+
//'  <!-- And finally a submit button -->'+
//'  <p><input type="submit" value="Submit" /></p>';
'';
}



function writeBottom(){

return ''+
'  </script>'+
'  <!-- Placeholders for messages set by event handlers -->'+
'  <div id="upload-status"></div>'+
'  <div id="progress"></div>'+
'  <pre id="result"></pre>'+
'</form>';

}
// Function that will allow us to know if Ajax uploads are supported
function supportAjaxUploadWithProgress() {
  return supportFileAPI() && supportAjaxUploadProgressEvents() && supportFormData();

  // Is the File API supported?
  function supportFileAPI() {
    var fi = document.createElement('INPUT');
    fi.type = 'file';
    return 'files' in fi;
  }

  // Are progress events supported?
  function supportAjaxUploadProgressEvents() {
    var xhr = new XMLHttpRequest();
    return !! (xhr && ('upload' in xhr) && ('onprogress' in xhr.upload));
  }

  // Is FormData supported?
  function supportFormData() {
    return !! window.FormData;
  }
}

// Actually confirm support

function init_uploader(){
if (supportAjaxUploadWithProgress()) {
  // Ajax uploads are supported!
  // Change the support message and enable the upload button
  var notice = document.getElementById('support-notice');
  var uploadBtn = document.getElementById('upload-button-id');
  notice.innerHTML = "Select an audio file to upload";
  uploadBtn.removeAttribute('disabled');

  // Init the Ajax form submission
  initFullFormAjaxUpload();

  // Init the single-field file upload
  initFileOnlyAjaxUpload();
}

}

function initFullFormAjaxUpload() {
  var form = document.getElementById('form-id');
  form.onsubmit = function() {
    // FormData receives the whole form
    var formData = new FormData(form);

    // We send the data where the form wanted
    var action = form.getAttribute('action');

    // Code common to both variants
    sendXHRequest(formData, action);

    // Avoid normal form submission
    return false;
  };
}

function initFileOnlyAjaxUpload() {
  var uploadBtn = document.getElementById('upload-button-id');
  uploadBtn.onclick = function (evt) {
    var formData = new FormData();

    // Since this is the file only, we send it to a specific location
      var action = upload_endpoint;
 //     var action = '/data/upload.php';

    // FormData only has the file
    var fileInput = document.getElementById('file-id');
    var file = fileInput.files[0];
    filename = file.name;
    formData.append('our-file', file);

//    $('#our-file').after('<br/>'+file);

    // Code common to both variants
    sendXHRequest(formData, action);
  };
}

// Once the FormData instance is ready and we know
// where to send the data, the code is the same
// for both variants of this technique
function sendXHRequest(formData, uri) {
  already_did_it = false;
  // Get an XMLHttpRequest instance
  var xhr = new XMLHttpRequest();

  // Set up events
  xhr.upload.addEventListener('loadstart', onloadstartHandler, false);
  xhr.upload.addEventListener('progress', onprogressHandler, false);
  xhr.upload.addEventListener('load', onloadHandler, false);
  xhr.addEventListener('readystatechange', onreadystatechangeHandler, false);

  // Set up request
  xhr.open('POST', uri, true);

  // Fire!
  console.log(formData);
  xhr.send(formData);
}

// Handle the start of the transmission
function onloadstartHandler(evt) {
  var div = document.getElementById('upload-status');
  div.innerHTML = 'Uploading...';
}

// Handle the end of the transmission
function onloadHandler(evt) {
  var div = document.getElementById('upload-status');
  div.innerHTML = 'Uploaded. Adding to xyz...';
}

// Handle the progress
function onprogressHandler(evt) {
  var div = document.getElementById('progress');
  var percent = evt.loaded/evt.total*100;
  div.innerHTML = 'Progress: ' + percent.toFixed(0) + '%';
}


var  already_did_it = false;
// Handle the response from the server
function onreadystatechangeHandler(evt) {
  var status = null;

  try {
    status = evt.target.status;
  }
  catch(e) {
    return;
  }
  if (status == '200' && evt.target.responseText && !already_did_it) {
    var result = document.getElementById('result');
  //  result.innerHTML = '<p>The server saw it as:</p><pre>' + evt.target.responseText + '</pre>';
//    result.innerHTML = 'success!';

    new_song_data = $.parseJSON(evt.target.responseText);
    newSong(new_song_data.mp3_filename,'file',new_song_data);
    already_did_it = true;
  }
}

