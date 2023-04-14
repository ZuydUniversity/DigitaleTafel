import { arcgisKey } from './Secrets.js';
//-------------------------ArcGIS Config------------------------------------
require([
    "esri/config", 
    "esri/Map", 
    "esri/views/MapView", 
    "esri/layers/FeatureLayer",
    "esri/geometry/Circle",
    "esri/Graphic",
    "esri/geometry/Polygon",
    "esri/rest/support/Query",
    "esri/geometry/Point"
  ], function(esriConfig, Map, MapView, FeatureLayer, Circle, Graphic, Polygon, Query, Point) {
  esriConfig.apiKey = arcgisKey;

  //Map creatie
  const map = new Map({
    basemap: "arcgis-streets" // Basemap layer service, in this case: Streets
    //Other options: Imagery, Imagery Hybrid, Topographic, Navigation, Oceans, Charted Territory Map, Community Map etc. ; https://developers.arcgis.com/javascript/latest/change-the-basemap-layer/
  });

 //Map View Settings (in this case: Valkenburg)
  const view = new MapView({
    map: map,
    center: [5.827879, 50.869093], // Latitude, Longitude
    zoom: 16, // Zoom level
    container: "touchBox", // Div element
    ui: {
      components: ["attribution"] //exclude + & - UI option
    }
  });

  //Toggle disable/enable panning/dragging
  const freezeFunction = (event)=>{
    if(freeze.checked){
      event.stopPropagation();
    }
  }
  //freezeFunction config
  const freeze = document.querySelector('#freeze-button');
  view.on("drag", freezeFunction)
  view.on("zoom", freezeFunction)
  view.on("mouse-wheel", freezeFunction)
  view.on("double-click", freezeFunction)
  view.on("drag", ["Shift"], freezeFunction)
  view.on("drag", ["Shift", "Control"], freezeFunction)
  view.on("key-down", freezeFunction)

  //Layers for the map
  const bestemmingsLayer = new FeatureLayer({
      url: "https://basisregistraties.arcgisonline.nl/arcgis/rest/services/IMRO/Ruimtelijke_plannen/FeatureServer/11" // URL REST Service
  });
  map.add(bestemmingsLayer);

//-------------------------TRITA FUNCTION------------------------------------
//TouchEvent with objects
  function getMapInfo(view, x, y){
    var point = new Point({
      x: x,
      y: y
    });
    var mapPoint = view.toMap(point);
    longitudeCords = mapPoint.longitude;
    latitudeCords = mapPoint.latitude;
    //Perform a query to retrieve information about the feature(s) at that location
    var query = new Query();
    query.geometry = mapPoint;
    bestemmingsLayer.queryFeatures(query).then(function(results) {
      //Process the query results
      if (results.features.length > 0) {
        var feature = results.features[0];
        bestemmingsPlan = feature.attributes;
        var plan = bestemmingsPlan.naam;
        document.getElementById("FB").style.display = 'block'; 
        document.getElementById("PLAN").innerHTML = plan;
      } else {
        document.getElementById("PLAN").innerHTML = "Helaas niet gevonden";
      }
    });
    AddCircles();
  }
//-------------------------CLICK VERSION------------------------------------
//Click/Single touch Event
  view.on("click", function(evt) {
    //Get the coordinates of the clicked point
    var point = evt.mapPoint;
    longitudeCords = point.longitude;
    latitudeCords = point.latitude;
    //Perform a query to retrieve information about the feature(s) at that location
    var query = new Query();
    query.geometry = point;
    bestemmingsLayer.queryFeatures(query).then(function(results) {
      //Process the query results
      if (results.features.length > 0) {
        var feature = results.features[0];
        bestemmingsPlan = feature.attributes;
        var plan = bestemmingsPlan.naam;
        document.getElementById("FB").style.display = 'block'; 
        document.getElementById("PLAN").innerHTML = plan;
      } else {
        document.getElementById("PLAN").innerHTML = "Helaas niet gevonden";
      }
    });
    AddCircles();
    });

    //Set base circle for debugging purposes
    const circleGeometry = new Circle({
        center: [5.827879, 50.869093],
        geodesic: true,
        numberOfPoints: 100,
        radius: 0.1,
        radiusUnit: "kilometers"
    });
    function addCircle(circleGeometry){
      view.graphics.add(new Graphic({
        geometry: circleGeometry,
        symbol: {
        type: "simple-fill",
        style: "none",
        outline: {
            width: 3,
            color: "red"}
        }
    }));
    }
    view.graphics.add(new Graphic({
      geometry: circleGeometry,
      symbol: {
      type: "simple-fill",
      style: "none",
      outline: {
          width: 3,
          color: "red"}
      }
    }));

  //Add Circles (in this case, simulate sound on the map)
  function AddCircles(){
    //Remove all objects when another one is placed
    view.graphics.removeAll();

    //Create Graphic (circle)
    const circleGeometry1 = new Circle({
      center: [longitudeCords, latitudeCords],
      geodesic: true,
      numberOfPoints: 100,
      radius: 0.1,
      radiusUnit: "kilometers"
    });
    const graphicCircle = new Graphic({
      geometry: circleGeometry1,
      symbol: {
      type: "simple-fill",
      style: "solid",
      outline: {
          width: 3,
          color: "green"}
      },
    });
    
    //Add circle to map
    view.graphics.add(graphicCircle);
  } 
//-------------------------TRITRA Config-----------------------------------
  let longitudeCords = 0;
  let latitudeCords = 0;
  let bestemmingsPlan = "";

  var pointXAndY = {
    mapPoint:{
      x:longitudeCords,
      y:latitudeCords,
    }
  };

  //Tritra Function
  (function() {
      // define angles
      var apexAngles = [54, 91, 118];
      
      // create recognizer instance
      var R = new tritra.Recognizer(apexAngles, {

        /*
          Apex angles have a distance of 18 degrees each therefore we choose          18 / 2 = 9 degrees of tolerance to each side. You can go lower than
          that if your application doesn't require markers to be moved quickly.
        */
        maxAngleTolerance: 9,

        /*
          The maximum distance for two points to still be considered as part of
          the same triangle. You should adjust these according to your screen
          size and DPI. As a general rule, the larger the screen and the higher
          the DPI, the higher you should set this value.
          Do not set it too high though as this will cause two nearby markers to
          no longer be recognized.
        */
        maxPointDistance: 170
        
      });
      
      var touchHandlerImpl = function(touches, eventType) {
        var points = [];
        for(var i = 0; i < touches.length; i++) {
          points.push(
            new tritra.Vector2d(touches[i].clientX, touches[i].clientY)
          );
        }
        /*
          Find matching triangles

          IMPORTANT: For performance reasons you should NOT trigger this
          function directly from your touch events. Instead simply store the
          touch coordinates and synchronize the processing with the actual
          screen refresh rate (ex: 60hz) by using requestAnimationFrame()

          For achieving a really smooth user experience you should additionally
          outsource the triangle processing into a separate webworker process.
          This way you will be able to achieve a steady 60fps user experience.
        */
        
        var matches = R.findMatches(points);
        
        //Find x- and y-coördinates inside the browser
        matches.forEach(function(match){
          
          var innerHtml = [];
          var center = match.getCenter();

          innerHtml.push('apex ang: ' + Math.round(match.getApexAngle()));
          innerHtml.push('center pt: ' + Math.round(center.x) + ', ' + Math.round(center.y));
          innerHtml.push('orient: ' + Math.round(match.getOrientation()) + '&deg;');

          //Body padding from html (hardcoded -> if changed in html -> this value needs to be changed aswell)
          var padding = 20;

          //Assign x and y coördinates, which are the center coördinates of the triangle, to the JSON object.
          var dotX = Math.round(center.x);
          var dotY = Math.round(center.y);
          
          //Assign x and y values, based on the center coördinates of the object
          pointXAndY.x = dotX - padding;
          pointXAndY.y = dotY - padding;
          
          //Get 'bestemmingsplan' information + show feedback + add circle on the map
          getMapInfo(view, pointXAndY.x, pointXAndY.y);
        });
      };

      //Ik weet niet meer wat dit doet, maar verwijder dit niet
      var touchHandler = function(event, eventType) {
        touchHandlerImpl(event.touches, eventType);
        event.preventDefault();
      };

      // touchbox
      var touchBox = document.getElementById('touchBox');

      // attach touch event handlers
      touchBox.addEventListener("touchstart", function(e) { touchHandler(e, 'start'); });
      touchBox.addEventListener("touchmove", function(e) { touchHandler(e, 'move'); });
      touchBox.addEventListener("touchend", function(e) { touchHandler(e, 'end'); });
      touchBox.addEventListener("touchcancel", function(e) { touchHandler(e, 'cancel'); });
    })();
});