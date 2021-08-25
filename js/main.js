/* global data */
/* exported data */

const $imgPreview = document.querySelector('.img-preview');
const $title = document.querySelector('#title');
const $photoURL = document.querySelector('#photo-url');
const $notes = document.querySelector('#notes');

$photoURL.addEventListener('input', function () {
  $imgPreview.setAttribute('src', $photoURL.value);
});

const $form = document.querySelector('form');

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  var newEntry = {
    title: $title.value,
    photoURL: $photoURL.value,
    notes: $notes.value,
    nextEntryID: 0
  };
  // console.log(newEntry);
  newEntry.nextEntryID = newEntry.nextEntryID++;
  data.entries.unshift(newEntry);
  $imgPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});
