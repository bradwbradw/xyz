<html>
<head>
  <meta charset="UTF-8"> </meta>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>XYZ | 
    <?php
//    echo $user; 
//    if($editable) echo ' (editing)'; else echo ''; 
    ?> 
</title>


<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
<!--<script type='text/javascript' src="includes/jquery.ui.draggable.js"></script>-->
<script src="http://code.jquery.com/ui/1.10.2/jquery-ui.js"></script>

<?php
require_once('config.php');


echo '<link rel="stylesheet" type="text/css" href="';
echo $http_addy.'/style.css" media="screen" />';

?>
</head>

<body>

<?php


    ?>

    <?php
echo '<script type="text/javascript">';

//echo '            var user = "'.$user.'"';
echo '            var user = "";';

echo '            var xyz_root_dir = "'.$http_addy.'";
            var no_art_image_path = "'.$no_art_image_path.'";


            var ALBUM_ART_DIR = "'.$http_addy.$album_art.'";
            var MP3_FILE_DIR = "'.$http_addy.$music_upload.'";
            var editable = "'.$editable.'";

      </script>';

//      $this_user_url = $http_addy.$user;

echo "<div id='topbar' >  <span id=xyz_title> XYZ </span> ";


echo "</div>";

?>

<div id='area'>
</div>
<div id='add_a_song'>

</div>

<!-- youtube url: http://www.youtube.com/v/Az3SHeMHC6c?version=3&enablejsapi=1-->


<div id="video-container">
<div id="videoDiv"></div>

<?php echo'

    <script type="text/javascript" src="
    '.$http_addy.'includes/sm/script/soundmanager2.js"></script>
    <script type="text/javascript" src="
    '.$http_addy.'includes/browserDetect.js"></script>
    <script type="text/javascript" src="
    '.$http_addy.'includes/swfobject/swfobject.js"></script>
     <script type="text/javascript" src="
    '.$http_addy.'includes/jquery.ui.touch-punch.js"></script>

    <!--
   <script type="text/javascript" src="
    '.$http_addy.'/includes/dancer/dancer.js"></script>
    <script src="'.$http_addy.'includes/dancer/src/support.js"></script>
    <script src="'.$http_addy.'includes/dancer/src/kick.js"></script>
    <script src="'.$http_addy.'includes/dancer/src/adapterWebkit.js"></script>
    <script src="'.$http_addy.'includes/dancer/src/adapterMoz.js"></script>
    <script src="'.$http_addy.'includes/dancer/src/adapterFlash.js"></script>
    <script src="'.$http_addy.'includes/dancer/lib/fft.js"></script>
    <script src="'.$http_addy.'includes/dancer/lib/flash_detect.js"></script>
    <script src="'.$http_addy.'includes/dancer/plugins/dancer.fft.js"></script>
    -->

    <script type="text/javascript" src="
    '.$http_addy.'/js/getsoundcloud.js"></script>

    <!--<script src="jQuery-File-Upload-8.8.5/js/vendor/jquery.ui.widget.js"></script>
    <script src="jQuery-File-Upload-8.8.5/js/jquery.iframe-transport.js"></script>
    <script src="jQuery-File-Upload-8.8.5/js/jquery.fileupload.js"></script>
    -->

    <script type="text/javascript" src="
    '.$http_addy.'js/ui.js"></script>
    <script type="text/javascript" src="
    '.$http_addy.'js/db.js"></script>
    <script type="text/javascript" src="
    '.$http_addy.'js/soundfunctions.js"></script>
    <script type="text/javascript" src="
    '.$http_addy.'js/init.js"></script>
    <script type="text/javascript" src="
    '.$http_addy.'js/functions.js"></script>
    <script type="text/javascript" src="
    '.$http_addy.'js/loadFile.js"></script>
    <script src="//www.google.com/jsapi" type="text/javascript"></script>
    <script type="text/javascript" src="
    '.$http_addy.'js/youtubehtml5.js"></script>

';
?>

<script src="//connect.soundcloud.com/sdk.js"></script>

<script>
  SC.initialize({
    client_id: soundcloudKey,
    redirect_uri: "http://example.com/callback.html",
  });
</script>
<script type="text/javascript">
</script>  
</body>

</html>