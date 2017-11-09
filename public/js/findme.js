"use strict";
var username = document.querySelector('#username');
var autoupdate = document.querySelector('#autoupdate');
var statusEl = document.querySelector('#status');
var submit = document.querySelector('#submit');
var finding = document.querySelector('#finding');
var mapcanvas = document.querySelector('#mapcanvas');
var geolocation = navigator.geolocation;
function success(position) {
    var user = username.value;
    var maps = google.maps;
    var _a = position.coords, latitude = _a.latitude, longitude = _a.longitude, accuracy = _a.accuracy;
    if (statusEl.className === 'success') {
        return;
    }
    statusEl.textContent = 'found you!';
    statusEl.className = 'success';
    mapcanvas.style.display = 'block';
    var latlng = new maps.LatLng(latitude, longitude);
    var mapOptions = {
        zoom: 15,
        center: latlng,
        mapTypeControl: false,
        //navigationControlOptions: { style: maps.NavigationControlStyle.SMALL },
        mapTypeId: maps.MapTypeId.ROADMAP
    };
    var map = new maps.Map(mapcanvas, mapOptions);
    var marker = new maps.Marker({
        position: latlng,
        title: "You are here! (within a " + accuracy + " meter radius)",
        label: user
    });
    marker.setMap(map);
    fetch('/coords', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
            lat: latitude,
            lng: longitude,
            user: user
        })
    })
        .then(function (o) { return o.text(); })
        .then(function (o) { return console.log('Server says ', o); })
        .catch(console.error);
}
function error(msg) {
    statusEl.innerHTML = msg;
    statusEl.className = 'fail';
}
function getLocation() {
    finding.style.display = 'block';
    submit.style.display = 'none';
    statusEl.textContent = 'checking...';
    statusEl.className = '';
    if (geolocation) {
        geolocation.getCurrentPosition(success, function (err) { return error(err.message); });
    }
    else {
        error('not supported');
    }
}
function findme() {
    username.value = localStorage.getItem('geoslack-username') || '';
    autoupdate.checked = localStorage.getItem('geoslack-autoupdate') === 'true';
    username.addEventListener('change', function () {
        localStorage.setItem('geoslack-username', username.value);
    });
    autoupdate.addEventListener('change', function () {
        localStorage.setItem('geoslack-autoupdate', autoupdate.checked.toString());
    });
    submit.addEventListener('click', function () {
        getLocation();
        setInterval(function () {
            if (autoupdate.checked) {
                getLocation();
            }
        }, 1000 * 60 * 10); // 10 minutes
    });
}
findme();
