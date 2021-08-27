/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var entriesJSON = localStorage.getItem('data-local-storage');

if (entriesJSON !== null) {
  data = JSON.parse(entriesJSON);
}

window.addEventListener('beforeunload', function () {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data-local-storage', dataJSON);
});
