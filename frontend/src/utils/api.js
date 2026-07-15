var host_url = 'http://localhost:3000';

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