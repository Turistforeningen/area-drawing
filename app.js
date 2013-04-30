var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png',
  cloudmade = new L.TileLayer(cloudmadeUrl, {maxZoom: 18}),
  map = new L.Map('map', {layers: [cloudmade], center: new L.LatLng(-37.7772, 175.2756), zoom: 15 });

var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var drawControl = new L.Control.Draw({
  draw: {
    position: 'topleft',
    polyline: null,
    circle: null,
    rectangle: null,
    marker: null,
    polygon: {
      title: 'Draw a sexy polygon!',
      allowIntersection: false,
      drawError: {
        color: '#b00b00',
        timeout: 1000
      },
      shapeOptions: {
        color: '#bada55'
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

  if (type === 'marker') {
    layer.bindPopup('A popup!');
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
