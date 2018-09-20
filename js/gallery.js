'use strict';
(function () {
  // var photos = [];
  // var createPhotos = function () {
  //   for (var i = 0; i < window.data.PHOTOS_LENGTH; i++) {
  //     photos[i] = {};
  //     photos[i].url = window.data.getUrl(i + 1);
  //     photos[i].likes = window.data.getLikes();
  //     photos[i].comments = window.data.getComments();
  //     photos[i].description = window.data.getDescription();
  //
  //   }
  //   return photos;
  // };
  //
  // photos = createPhotos();


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
    console.dir(photos);
    window.pictures.drawPictures(photos);
    onPicturesClick(photos);
  };
  var onError = function () {

  };
  window.load(onLoad, onError);


})();
