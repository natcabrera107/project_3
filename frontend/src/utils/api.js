var host_url;

if (window.location.hostname === 'localhost') {
  host_url = 'http://localhost:3000';
}
else {
  host_url = 'https://orbit-backend-5uvw.onrender.com';
}

function get(path) {
  return fetch(host_url + path).then(function(res) {
    return res.json();
  });
}

function post(path, body) {
  return fetch(host_url + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).then(function(res) {
    return res.json();
  });
}

function del(path) {
  return fetch(host_url + path, {
    method: 'DELETE'
  }).then(function(res) {
    return res.json();
  });
}

export { get, post, del };