<!DOCTYPE html>
<html>
    <head>

        <title>Data Fetch</title>
        <meta charset="UTF-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">

        
        <!--<link href="lib/css/leaflet.css" rel="stylesheet">
        <link href="lib/css/MarkerCluster.Default.css" rel="stylesheet">
        <link href="lib/css/MarkerCluster.css" rel="stylesheet">-->
        <link href="lib/css/jqueryui.css" rel="stylesheet">
        <link href="lib/css/cartodb.css" rel="stylesheet">
        <link href="lib/css/bootstrap.css" rel="stylesheet">
        <link href="lib/css/bootstrap-theme.css" rel="stylesheet">
        <link href="fetchData.css" rel="stylesheet">

        <script src="lib/js/jquery.js"></script>
        <script src="lib/js/jqueryui.js"></script>
        <!--<script src="lib/js/leaflet.js"></script>
        <script src="lib/js/leaflet.markercluster.js"></script>-->
        <script src="lib/js/cartodb.js"></script>
        <script src="lib/js/bootstrap.js"></script>  
        <script type="text/javascript" src="fetchData.js"></script>
    </head>

    <body>
        <!--<div class="titled light-bkg">Day-Wise Changes
            <button type="button" id="button1" class="btn btn-info btn-block"><h3>Click to see Aggregrate changes</h3></button>
        </div>-->
        <div id="map"></div>
        <!--<div id="slider1" class="slider-show"></div>-->
        <!--<div id="slider2" class="slider-show" style="display:none"></div>-->
        <div class="titled light-bkg">
            <button type="button" id="button1" class="btn btn-info btn-block"><h3>Showing Day-Wise Changes<br/>Click to see Aggregrate changes</h3></button>
            <button type="button" id="button2" class="btn btn-info btn-block" style="display:none"><h3>Showing Aggregrate Changes<br/>Click to see Individual Day changes</h3></button>
        </div>
    </body>

</html>