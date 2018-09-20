// Файл util.js
'use strict';
(function () {
  window.util = {
    ESC_KEYCODE: 27,
    bigPicture: document.querySelector('.big-picture'),
    hideElements: function (element) {
      element.classList.add('hidden');
    },
    showElements: function (element) {
      element.classList.remove('hidden');
    },
    // закрыть bigPicture esc
    onBigPictureEsc: function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        window.util.hideElements(window.util.bigPicture);
      }
    },
  };

})();
