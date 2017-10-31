function success(position) {
  const s = document.querySelector('#status');

  if (s.className === 'success') {
    return;
  }

  s.innerHTML = 'found you!';
  s.className = 'success';

  const mapcanvas = document.createElement('div');
  mapcanvas.id = 'mapcanvas';
  mapcanvas.style.height = '400px';
  mapcanvas.style.width = '560px';

  document.querySelector('article').appendChild(mapcanvas);

  const latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  const mapOptions = {
    zoom: 15,
    center: latlng,
    mapTypeControl: false,
    navigationControlOptions: { style: google.maps.NavigationControlStyle.SMALL },
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  const map = new google.maps.Map(mapcanvas, mapOptions);

  const marker = new google.maps.Marker({
      position: latlng,
      map: map,
      title: `You are here! (within a ${position.coords.accuracy} meter radius)`
  });

  const user = document.querySelector('#username').value;
  const data = { lat: position.coords.latitude, lng: position.coords.longitude, user: user };
  fetch('/coords', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(console.log).catch(console.error);
}

function error(msg) {
  const s = document.querySelector('#status');
  s.innerHTML = typeof msg === 'string' ? msg : 'failed';
  s.className = 'fail';
}

function init() {
  const submit = document.querySelector('#submit');
  submit.addEventListener('click', () => {
    const finding = document.querySelector('#finding');
    finding.style.display = 'block';
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      error('not supported');
    }
  });

  const username = document.querySelector('#username');
  username.value = localStorage.getItem('geoslack-username');

  username.addEventListener('change', () => {
    localStorage.setItem('geoslack-username', username.value);
  });
}

init();
