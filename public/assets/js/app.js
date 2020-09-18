import axios from 'axios';

import {
  clearSearchString,
  debounce,
  appendData,
  groupDataByDepartment,
  filterDataBySearch,
} from './functions';

const fecthData = debounce((event) => {
  const search = event.target.value || '';

  axios
    .get('http://192.168.250.55:3333/api/schedule', {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      credentials: 'same-origin',
    })
    .then((response) =>
      appendData(
        groupDataByDepartment(filterDataBySearch(response.data, search))
      )
    );
  return event.target;
}, 500);

window.onload = (event) => fecthData(event);

document
  .querySelector('#input-search')
  .addEventListener('keyup', (event) => fecthData(clearSearchString(event)));

document
  .querySelector('#btn-clear')
  .addEventListener('click', (event) =>
    fecthData(clearSearchString(event, true))
  );
