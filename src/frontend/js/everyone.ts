async function loop() {
    const { maps } = google;
    const mapcanvas = document.querySelector('#mapcanvas') as HTMLElement;
    const count = document.querySelector('#count') as HTMLElement;
    const currentUser = localStorage.getItem('geoslack-username');
    let centerLatLng: google.maps.LatLng | null = null;

    const fetchOptions = {
        method: 'GET',
        headers: new Headers({ 'Content-Type': 'application/json' })
    };

    const res = await fetch('/coords-everyone', fetchOptions);
    const people = await res.json() as Person[];
    count.textContent = people.length.toString();

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

    const mapOptions: google.maps.MapOptions = {
        zoom: 15,
        mapTypeControl: false,
        //navigationControlOptions: { style: maps.NavigationControlStyle.SMALL },
        mapTypeId: maps.MapTypeId.ROADMAP
    };

    if (centerLatLng) {
        mapOptions.center = centerLatLng;
    }

    const map = new maps.Map(mapcanvas, mapOptions);

    markers.forEach(marker => {
        marker.setMap(map);
    });

    mapcanvas.style.display = 'block';
}

function everyone() {
    loop();
    setInterval(loop, 1000 * 60); // 1 minute
}

everyone();
