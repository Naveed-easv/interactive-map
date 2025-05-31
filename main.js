// initialize variables
let map;
let markers = {};
let scrollEnabled = false;
let notification;

// coordinates
const locations = {
    // beaches
    'strand-1': { lat: 54.905699082108804, lng: 9.785943434093719, name: 'Fluepapiret', type: 'beach' },
    
    'strand-2': { lat: 54.89774821313825, lng: 9.803388089622732, name: 'Den Sorte Badestrand', type: 'beach' },
    'strand-3': { lat: 54.90602245391619, lng: 9.78045356960696, name: 'Dybbøl Strand', type: 'beach' },
    
    // hiking/cycling
    'tur-1': { lat: 55.02870284962671, lng: 9.727711284712766, name: 'Naturpark Nordals', type: 'hiking' },
    'tur-2': { lat: 54.897745939739316, lng: 9.755679632797293, name: 'Gendarmstien', type: 'hiking' },
    'tur-3': { lat: 55.01565242122567, lng: 9.94464439009769, name: 'Alsstien', type: 'hiking' },
    
    // shopping
    'shop-1': { lat: 54.90947216568481, lng: 9.791671861636711, name: 'Borgen Shopping', type: 'shopping' },
    'shop-2': { lat: 54.92353266389178, lng: 9.80975068923191, name: 'Dansk Sønderborg', type: 'shopping' },
    'shop-3': { lat: 54.91021609857013, lng: 9.789911183362994, name: 'WestWind Sønderborg', type: 'shopping' },
    
    // culture
    'kultur-1': { lat: 54.90718766136453, lng: 9.783872127035652, name: 'Sønderborg Slot', type: 'culture' },
    'kultur-2': { lat: 54.91097493160671, lng: 9.785567907462797, name: 'Sønderborgs Sydhavn', type: 'culture' },
    'kultur-3': { lat: 54.90718392709678, lng: 9.754253050545636, name: 'Historiecenter Dybbøl Banke', type: 'culture' },
    
    // active
    'aktiv-1': { lat: 55.04239869343909, lng: 9.809816073596984, name: 'Universe Science Park', type: 'active' },
    'aktiv-2': { lat: 54.97640248028504, lng: 9.885789159323457, name: 'Als Aktivitetspark', type: 'active' },
    'aktiv-3': { lat: 54.92011629753493, lng: 9.823530598199932, name: 'Sønderborg Padel Center', type: 'active' }
};

// markers
const markerSvgs = {
    beach: 'https://dssj.naveedn.dk/wp-content/uploads/2025/05/BeachPin.svg',
    hiking: 'https://dssj.naveedn.dk/wp-content/uploads/2025/05/ShoePin.svg',
    shopping: 'https://dssj.naveedn.dk/wp-content/uploads/2025/05/ShoppingPin.svg',
    culture: 'https://dssj.naveedn.dk/wp-content/uploads/2025/05/CulturePin.svg',
    active: 'https://dssj.naveedn.dk/wp-content/uploads/2025/05/ActivePin.svg'
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

// scroll notification
function showScrollNotification() {
    if (!notification) {
        notification = L.control({position: 'topleft'});
        notification.onAdd = function() {
            var div = L.DomUtil.create('div', 'scroll-notification');
            div.innerHTML = '<div style="background: #007cba; color: white; padding: 8px 12px; border-radius: 4px; font-size: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.2); pointer-events: none;">🖱️ Click map to enable scroll zoom</div>';
            return div;
        };
        notification.addTo(map);
    }
}
function hideScrollNotification() {
    if (notification) {
        map.removeControl(notification);
        notification = "";
    }
}


// https://leafletjs.com/examples/quick-start/
// initialize map
function initMap() {
    // center map on Sønderborg
    map = L.map('leaflet-map', {
        scrollWheelZoom: false, // disable scroll zoom by default
        zoomControl: true
    }).setView([54.9089, 9.7914], 11);
    
    showScrollNotification(); // display scroll notification

    // enable scroll zoom when clicking on the map
    map.on('click', function() {
        if (!scrollEnabled) {
            scrollEnabled = true;
            map.scrollWheelZoom.enable();
            hideScrollNotification();
        }
    });

    // disable scroll zoom when the mouse leaves the map
    map.getContainer().addEventListener('mouseleave', function() {
        scrollEnabled = false;
        map.scrollWheelZoom.disable();
        showScrollNotification();
    });

    // add OpenStreetMap tiles
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // location markers
    Object.keys(locations).forEach(locationId => {
        const location = locations[locationId];
        const marker = L.marker([location.lat, location.lng], {
            icon: createCustomIcon(location.type)
        }).addTo(map);
        
        marker.bindPopup(`<strong>${location.name}</strong>`);
        
        // store marker reference
        markers[locationId] = marker;
        
        // click event ´for marker
        marker.on('click', function() {
            const checkbox = document.getElementById(locationId);
            if (checkbox) {
                // find sidebar item and highlight it 
                const label = document.querySelector(`label[for="${locationId}"]`);
                if (label) {
                    label.classList.add('location__label--highlighted');
                    setTimeout(() => {
                        label.classList.remove('location__label--highlighted');
                    }, 1000);
                }
            }
        });
    });
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