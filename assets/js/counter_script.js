function countVisit(callback) {
  if (getCookie('visited') != "true") {
    incrementCounter(callback);
    setCookie('visited', 'true', 1440)
  } else {
    callback();
  }
}

function incrementCounter(callback) {
  var request = new XMLHttpRequest();
  request.open('POST','{{ getenv "HUGO_API_ENDPOINT" }}');
  request.onreadystatechange = function () {
    if (request.readyState == XMLHttpRequest.DONE) {
      callback();
    }
  }
  request.send();
}

function setCookie(cname, cvalue, exmins) {
  const d = new Date();
  d.setTime(d.getTime() + (exmins * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function getCounterValue(callback) {
  if (!getCookie('counter_value')) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == XMLHttpRequest.DONE) {
        var counter_value = JSON.parse(request.responseText)['counter_value'];
        setCookie('counter_value', counter_value, 15);
        callback();
      }
    }
    request.open('GET', '{{ getenv "HUGO_API_ENDPOINT" }}');
    request.send();
  } else {
    callback();
  }
}

function setCounterValue() {
  var counter_value = getCookie('counter_value');
  document.getElementById('counter').innerText = `This page has been visited ${counter_value} times!`
}

function a() {
  getCounterValue(setCounterValue)
}

window.onload = function () {
  countVisit(a);
};
