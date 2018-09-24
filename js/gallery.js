'use strict';
(function () {
  // обработчики клика на все фотографии, который показывает bigPicture

  var onPicturesClick = function (photos) {
    var picturesLink = document.querySelectorAll('.picture__img');
    for (var i = 0; i < picturesLink.length; i++) {
      picturesLink[i].addEventListener('click', function (evt) {
        for (var j = 0; j < picturesLink.length; j++) {
          if (picturesLink[j] === evt.target) {
            window.createBigPicture(j, photos);
          }
        }
        window.util.showElements(window.util.bigPicture);
        document.addEventListener('keydown', window.util.onBigPictureEsc);
      });
    }
  };
  // получение данных с сервера
  var onLoad = function (photos) {
    window.pictures.drawPictures(photos);
    onPicturesClick(photos);
  };
  var onError = function (message) {
    window.loadMessages.onLoadMessage(false, message);
    window.loadMessages.addLoadMessage();
    setTimeout(function () {
      window.loadMessages.deleteOnLoadMessage();
    }, 5000);

  };
  window.load(onLoad, onError);
})();

