var map = L.map('map').setView([20.59, 78.96], 5)

// Add basemap
L.tileLayer('http://maps.stamen.com/m2i/image/20190707/toner_M4eulhcxuCo', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

// Add GeoJSON
$.getJSON('https://prathamgeojson.s3.ap-south-1.amazonaws.com/gadm36_IND.json', function (geojson) {
  L.choropleth(geojson, {
    valueProperty: 'incidents',
    scale: ['white', 'red'],
    steps: 5,
    mode: 'q',
    style: {
      color: '#fff',
      weight: 2,
      fillOpacity: 0.8
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup('District ' + feature.properties.dist_num + '<br>' +
          feature.properties.incidents.toLocaleString() + ' incidents')
    }
  }).addTo(map)
})
