const API = 'https://frontend-test-assignment-api.abz.agency/api/v1/token';

export function getToken () {
  return fetch(API)
    .then(response => response.json());
}
