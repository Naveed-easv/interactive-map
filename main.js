//dropdown toggle
function toggleCategory(header) {
    const category = header.parentElement;
    category.classList.toggle('category--expanded');
}

function toggleLocation(locationId) {
    const checkbox = document.getElementById(locationId);
    const pin = document.getElementById('pin-' + locationId);
    
    if (checkbox.checked) {
        pin.classList.remove('map__pin--hidden');
    } else {
        pin.classList.add('map__pin--hidden');
    }
}

// Add click event to pins to show location name
document.addEventListener('DOMContentLoaded', function() {
    const pins = document.querySelectorAll('.map__pin');
    pins.forEach(pin => {
        pin.addEventListener('click', function() {
            const locationId = this.id.replace('pin-', '');
            const label = document.querySelector(`label[for="${locationId}"]`);
            if (label) {
                alert('📍 ' + label.textContent);
            }
        });
    });
});