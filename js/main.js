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
    entryId: data.nextEntryId++
  };
  data.entries.unshift(newEntry);
  $imgPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();

  $viewEntries.classList.remove('hidden');
  $viewEntryForm.classList.add('hidden');
  location.reload();
});

// CREATE ENTRY DOM TREE

function renderNewEntry(entry) {

  var $entry = document.createElement('div');
  $entry.setAttribute('class', 'row entry');

  var $imgDivWrapper = document.createElement('div');
  $imgDivWrapper.setAttribute('class', 'img column-half');
  $entry.appendChild($imgDivWrapper);

  var $img = document.createElement('img');
  $img.setAttribute('class', 'img-preview');
  $img.setAttribute('src', entry.photoURL);
  $img.setAttribute('alt', 'Entry Image Preview');
  $imgDivWrapper.appendChild($img);

  var $textDivWrapper = document.createElement('div');
  $textDivWrapper.setAttribute('class', 'column-half');
  $entry.appendChild($textDivWrapper);

  var $entryTitle = document.createElement('h2');
  $entryTitle.textContent = entry.title;
  $textDivWrapper.appendChild($entryTitle);

  var $entryDesc = document.createElement('p');
  $entryDesc.textContent = entry.notes;
  $textDivWrapper.appendChild($entryDesc);

  return $entry;
}

const $entriesList = document.querySelector('ul');

window.addEventListener('DOMContentLoaded', function () {
  for (var i = 0; i < data.entries.length; i++) {
    $entriesList.appendChild(renderNewEntry(data.entries[i]));
  }
});

const $viewEntries = document.querySelector('[data-view="entries"]');

const $viewEntryForm = document.querySelector('[data-view="entry-form"]');

const $navEntries = document.querySelector('.nav-item');
$navEntries.addEventListener('click', function () {
  $viewEntries.classList.remove('hidden');
  $viewEntryForm.classList.add('hidden');
});

const $createButton = document.querySelector('.create-button');
$createButton.addEventListener('click', function () {
  $viewEntries.classList.add('hidden');
  $viewEntryForm.classList.remove('hidden');
});
