
var url = 'http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo2&zoom={z}&x={x}&y={y}';
var topo = L.tileLayer(url, {
  maxZoom: 16,
  attribution: '<a href="http://www.statkart.no/">Statens kartverk</a>'
});

var map = new L.Map('map', {layers: [topo], center: new L.LatLng(61.5, 9), zoom: 7 });

var polygon = new L.Polygon([
  [62.471723714758724, 6.2841796875],
  [62.492027730426905, 6.8115234375],
  [62.57816583754086, 7.064208984374999],
  [62.588283360243956, 7.437744140625],
  [62.44124178683124, 7.965087890625],
  [62.31389867188952, 8.19580078125],
  [62.237232893654486, 8.37158203125],
  [62.196264616146884, 8.61328125],
  [62.10902225990834, 8.876953125],
  [62.078170769452306, 9.07470703125],
  [61.949284881013504, 9.20654296875],
  [61.87169117378061, 9.16259765625],
  [61.85614879566797, 8.85498046875],
  [61.8665112570728, 8.602294921875],
  [61.8665112570728, 8.382568359375],
  [61.87687021463305, 8.19580078125],
  [61.89240208311609, 7.921142578125],
  [61.85614879566797, 7.723388671875],
  [61.83541335794044, 7.591552734375],
  [61.897577621605016, 7.55859375],
  [61.98542793738686, 7.525634765624999],
  [62.03698663440364, 7.481689453125],
  [62.03698663440364, 7.31689453125],
  [62.03698663440364, 7.00927734375]
]);
polygon.bindPopup('Navn: <input type="text" value="Mitt område"> <button>Lagre</button>');

var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);
drawnItems.addLayer(polygon);
polygon.openPopup();

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
        color: '#0033ff',
        opacity: 0.5
      }
    }
  },
  edit: {
    featureGroup: drawnItems
  }
});
map.addControl(drawControl);

map.on('draw:created', function (e) {
  /*
   * layer = e.layer
   * type = e.layerType
   */
  console.log(e);
  e.layer.bindPopup('Navn: <input type="text" value="Mitt område"> <button>Lagre</button>');
  drawnItems.addLayer(e.layer);
  // open popup can happen after feature has been added to map
  e.layer.openPopup(); // @todo find middle point
});

map.on('draw:edited', function (e) {
  var layers = e.layers;
  var countOfEditedLayers = 0;
  layers.eachLayer(function(layer) {
    countOfEditedLayers++;
  });
  console.log("Edited " + countOfEditedLayers + " layers");
});
