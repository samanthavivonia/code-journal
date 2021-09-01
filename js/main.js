/* global data */
/* exported data */
var i;
var j;
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

  // Save New One

  if (data.editing === null) {
    var newEntry = {
      title: $title.value,
      photoURL: $photoURL.value,
      notes: $notes.value,
      entryId: data.nextEntryId++
    };
    data.entries.unshift(newEntry);

    // Update Old One

  } else if (data.editing !== null) {
    data.editing.title = $title.value;
    data.editing.photoURL = $photoURL.value;
    data.editing.notes = $notes.value;
    for (i = 0; i < data.entries.length; i++) {
      if (data.editing.entryId === data.entries[i].entryId) {
        data.entries[i] = data.editing;
      }
    }
  }

  // Reload Page

  $imgPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();

  $viewEntries.classList.remove('hidden');
  $viewEntryForm.classList.add('hidden');

  $entriesList.innerHTML = '';
  for (i = 0; i < data.entries.length; i++) {
    $entriesList.appendChild(renderNewEntry(data.entries[i]));
  }
  data.editing = null;

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

  var $entryHeader = document.createElement('div');
  $entryHeader.setAttribute('class', 'row entry-header');
  $textDivWrapper.appendChild($entryHeader);

  var $entryTitle = document.createElement('h2');
  $entryTitle.textContent = entry.title;
  $entryHeader.appendChild($entryTitle);

  var $editIcon = document.createElement('i');
  $editIcon.setAttribute('class', 'fas fa-pen');
  $editIcon.setAttribute('data-entry-id', entry.entryId);
  $entryHeader.appendChild($editIcon);

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
  $imgPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});

const $createButton = document.querySelector('.create-button');
$createButton.addEventListener('click', function () {
  $viewEntries.classList.add('hidden');
  $viewEntryForm.classList.remove('hidden');
});

$entriesList.addEventListener('click', function () {
  const $editIcons = document.querySelectorAll('i');
  for (i = 0; i < $editIcons.length; i++) {
    if (event.target.getAttribute('data-entry-id') === $editIcons[i].getAttribute('data-entry-id')) {
      $viewEntries.classList.add('hidden');
      $viewEntryForm.classList.remove('hidden');
      for (j = 0; j < data.entries.length; j++) {
        if (parseInt(event.target.getAttribute('data-entry-id')) === data.entries[j].entryId) {
          data.editing = data.entries[j];
          $title.value = data.entries[j].title;
          $photoURL.value = data.entries[j].photoURL;
          $notes.value = data.entries[j].notes;
          $imgPreview.setAttribute('src', $photoURL.value);
        }
      }

    }
  }
});

const $overlay = document.querySelector('.overlay');
const $delete = document.querySelector('.delete-hyperlink');
$delete.addEventListener('click', function () {
  $overlay.classList.remove('hidden');
});

// const $deleteButton = document.querySelector('.delete-button');
const $cancelButton = document.querySelector('.cancel-button');

$cancelButton.addEventListener('click', function () {
  $overlay.classList.add('hidden');
});
