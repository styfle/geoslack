async function loop(position) {
    const { maps } = google;
    const mapcanvas = document.querySelector('#mapcanvas');
    const currentUser = localStorage.getItem('geoslack-username');
    let centerLatLng = null;

    const fetchOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    const res = await fetch('/coords-everyone', fetchOptions);
    const people = await res.json();

    const markers = people.map(p => {
        const { user, lat, lng } = p;
        const latlng = new maps.LatLng(lat, lng);
        if (user === currentUser) {
            centerLatLng = latlng;
        }
        return new maps.Marker({
            position: latlng,
            label: user
        });
    });

    const mapOptions = {
        zoom: 15,
        center: centerLatLng,
        mapTypeControl: false,
        navigationControlOptions: { style: maps.NavigationControlStyle.SMALL },
        mapTypeId: maps.MapTypeId.ROADMAP
    };

    const map = new maps.Map(mapcanvas, mapOptions);

    markers.forEach(marker => {
        marker.setMap(map);
    });

    mapcanvas.style.display = 'block';
}

function init() {
    loop();
    setInterval(loop, 1000 * 60); // 1 minute
}

init();
