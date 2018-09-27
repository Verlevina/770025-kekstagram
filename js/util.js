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
    deleteChildren: function (elements, isTagA) {
      var elementsLength = elements.childElementCount;
      for (var i = elementsLength - 1; i >= 0; i--) {
        if (isTagA) {
          if (elements.children[i].tagName === 'A') {
            elements.removeChild(elements.children[i]);
          }
        } else {
          elements.removeChild(elements.children[i]);
        }
      }
    }
  };
})();
