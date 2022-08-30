const API = 'https://frontend-test-assignment-api.abz.agency/api/v1/users';

export function getUsers (url) {
  if (url) {
    return fetch(url)
      .then(response => response.json());
  } 
    
  return fetch(`${API}?page=1&count=6`)
    .then(response => response.json());
}

export function postUser (data, token) {
  console.log(data);
  return fetch(API, {
    method: 'POST',
    body: data,
    headers: {
      Token: token,
    }
  });
}
