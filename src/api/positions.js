const API = 'https://frontend-test-assignment-api.abz.agency/api/v1/positions';

export function getPositions () {
  return fetch(API)
    .then(response => response.json());
}
