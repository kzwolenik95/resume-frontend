function countVisit() {
  if (getCookie('visited') != "true") {
    incrementCounter();
    setCookie('visited', 'true', 1440)
  }
}

function incrementCounter() {
  var request = new XMLHttpRequest();
  request.open('POST', 'https://ebwtlohff7.execute-api.us-east-1.amazonaws.com/beta/increment');
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
    request.open('GET', 'https://ebwtlohff7.execute-api.us-east-1.amazonaws.com/beta/increment');
    request.send();
  } else {
    callback();
  }
}

function setCounterValue() {
  var counter_value = getCookie('counter_value');
  document.getElementById('counter').innerText = `This page has been visited ${counter_value} times!`
}

window.onload = function () {
  countVisit();
  getCounterValue(setCounterValue);
};
