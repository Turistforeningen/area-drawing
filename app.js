
var url = 'http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo2&zoom={z}&x={x}&y={y}',
  topo = L.tileLayer(url, {
    maxZoom: 16,
    attribution: '<a href="http://www.statkart.no/">Statens kartverk</a>'
  });
  map = new L.Map('map', {layers: [topo], center: new L.LatLng(61.5, 9), zoom: 7 });

var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var drawControl = new L.Control.Draw({
  draw: {
    position  : 'topleft',
    polyline  : null,
    circle    : null,
    rectangle : null,
    marker    : null,
    polygon: {
      title: 'Marker område!',
      allowIntersection: false,
      drawError: {
        color: '#b00b00',
        timeout: 1000
      },
      shapeOptions: {
        color: '#c95a5d',
        opacity: 0.8
      }
    }
  },
  edit: {
    featureGroup: drawnItems
  }
});
map.addControl(drawControl);

map.on('draw:created', function (e) {
  var type = e.layerType,
    layer = e.layer;

  if (type === 'polygon') {
    layer.bindPopup('This land is my land!');
  }

  drawnItems.addLayer(layer);
});

map.on('draw:edited', function (e) {
  var layers = e.layers;
  var countOfEditedLayers = 0;
  layers.eachLayer(function(layer) {
    countOfEditedLayers++;
  });
  console.log("Edited " + countOfEditedLayers + " layers");
});
