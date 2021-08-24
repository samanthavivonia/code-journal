/* global data */
/* exported data */

const $imgPreview = document.querySelector('.img-preview');
const $photoURL = document.querySelector('#photo-url');

$photoURL.addEventListener('input', function () {
  $imgPreview.setAttribute('src', $photoURL.value);
});
