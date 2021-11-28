export const defaultHeaders = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + localStorage.getItem('token')
}

export const uploadHeaders = {
  'Authorization': 'Bearer ' + localStorage.getItem('token')
}

export const hostname = "ac8931068505649f1a8d6a39fc61e1b8-232651022.us-east-2.elb.amazonaws.com:8080";

export const RestClientGet = (endpoint, okCallback, errorCallback) => {
    const apiUrl = window.location.protocol + "//" + hostname;
    fetch(apiUrl + endpoint, {
        method: 'GET',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: defaultHeaders
    }).then(okCallback).catch(errorCallback);
}

export const RestClientPost = (endpoint, body, okCallback, errorCallback) => {
  const apiUrl = window.location.protocol + "//" + hostname;
  fetch(apiUrl + endpoint, {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: defaultHeaders,
      body: body
  }).then(okCallback).catch(errorCallback);
}