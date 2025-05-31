// initialize map
let map;
let markers = {};

// coordinates
const locations = {
    // beaches
    'strand-1': { lat: 54.905699082108804, lng: 9.785943434093719, name: 'Fluepapiret', type: 'beach' },
    'strand-2': { lat: 54.9420, lng: 9.8156, name: 'Den Sorte Badestrand', type: 'beach' },
    'strand-3': { lat: 54.8956, lng: 9.8789, name: 'Toøren', type: 'beach' },
    
    // hiking/cycling
    'tur-1': { lat: 54.9345, lng: 9.8234, name: 'Naturpark Nordals', type: 'hiking' },
    'tur-2': { lat: 54.9156, lng: 9.8456, name: 'Gendarmstien', type: 'hiking' },
    'tur-3': { lat: 54.9567, lng: 9.8123, name: 'Nordkysten på Als', type: 'hiking' },
    
    // shopping
    'shop-1': { lat: 54.9089, lng: 9.7856, name: 'Borgen Shopping', type: 'shopping' },
    'shop-2': { lat: 54.9234, lng: 9.7456, name: 'Nordborg Center', type: 'shopping' },
    'shop-3': { lat: 54.9456, lng: 9.8678, name: 'Augustenborg Butikker', type: 'shopping' },
    
    // culture
    'kultur-1': { lat: 54.9456, lng: 9.8634, name: 'Augustenborg Slot', type: 'culture' },
    'kultur-2': { lat: 54.9089, lng: 9.7856, name: 'Sønderborgs Sydhavn', type: 'culture' },
    'kultur-3': { lat: 54.9234, lng: 9.8123, name: 'Nordals Museum', type: 'culture' },
    
    // active
    'aktiv-1': { lat: 54.9089, lng: 9.7756, name: 'Universe Science Park', type: 'active' },
    'aktiv-2': { lat: 54.8934, lng: 9.7634, name: 'Als Aktivitetspark', type: 'active' },
    'aktiv-3': { lat: 54.9345, lng: 9.7923, name: 'Sønderborg Padel Center', type: 'active' }
};

// markers
const markerSvgs = {
    beach: 'media/BeachPin.svg',
    hiking: 'media/ShoePin.svg',
    shopping: 'media/ShoppingPin.svg',
    culture: 'media/CulturePin.svg',
    active: 'media/ActivePin.svg'
};

// marker icons
function createCustomIcon(type) {
    const svgPath = markerSvgs[type];
    return L.icon({
        iconUrl: svgPath,
        iconAnchor: [15, 40],
        popupAnchor: [0, -40]
    });
}

// https://leafletjs.com/examples/quick-start/
// initialize map
function initMap() {
    // center map on Sønderborg
    map = L.map('leaflet-map').setView([54.9089, 9.7914], 12);
    
    // add OpenStreetMap tiles
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}

//dropdown toggle
function toggleCategory(header) {
    const category = header.parentElement;
    category.classList.toggle('category--expanded');
}

//toggle pins
function toggleLocation(locationId) {
    const checkbox = document.getElementById(locationId);
    const marker = markers[locationId];
    
    if (checkbox && marker) {
        if (checkbox.checked) {
            map.addLayer(marker);
        } else {
            map.removeLayer(marker);
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMap();
});