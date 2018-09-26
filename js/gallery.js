'use strict';
(function () {

  // объект map соответствия выполняемой функции кнопке фильтрации

  // обработчики клика на все фотографии, который показывает bigPicture
  var imageFilters = document.querySelector('.img-filters');
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
  // генератор рандомных неповторяющихся чисел
  var getNoRepeatRandomArray = function (max) {
    var arrayTotalNumbers = [];
    var arrayRandomNumbers = [];
    var tempRandomNumber;
    while (max--) {
      arrayTotalNumbers.push(max);
    }

    while (arrayTotalNumbers.length) {

      tempRandomNumber = Math.floor(Math.random() * (arrayTotalNumbers.length - 1));

      arrayRandomNumbers.push(arrayTotalNumbers[tempRandomNumber]);

      arrayTotalNumbers.splice(tempRandomNumber, 1);

    }

    return arrayRandomNumbers.slice(0, 10);
  };
  // поиск новых фото (10 неповторяющихся фотографий)
  var getNewPhotos = function (photos) {
    var randomNumbersArray = getNoRepeatRandomArray(photos.length);
    var newPhotos = [];
    randomNumbersArray.forEach(function (it) {
      return newPhotos.push(photos[it]);
    });
    return newPhotos;

  };
  // поиск обсуждаемых фото
  var getDiscussablePhotos = function (photos) {
    var sortArray = photos.slice();
    sortArray.sort(function (a, b) {
      if (a.comments.length > b.comments.length) {
        return -1;
      }
      if (b.comments.length > a.comments.length) {
        return 1;
      }
      return 0;
    });
    return sortArray;
  };

  // обработка кликов по кнокпам сортировки
  var onFilterClick = function (photos) {
    var buttons = imageFilters.querySelectorAll('button');
    var sortPhotosArray = [];
    buttons[0].addEventListener('click', function (evt) {
      var activeButton = imageFilters.querySelector('.img-filters__button--active');
      activeButton.classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      window.util.deleteChildren(window.pictures.images, true);
      sortPhotosArray = photos.slice();
      window.pictures.drawPictures(sortPhotosArray);
      onPicturesClick(sortPhotosArray);
    });
    buttons[1].addEventListener('click', function (evt) {
      var activeButton = imageFilters.querySelector('.img-filters__button--active');
      activeButton.classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      window.util.deleteChildren(window.pictures.images, true);
      sortPhotosArray = getNewPhotos(photos);
      window.pictures.drawPictures(sortPhotosArray);
      onPicturesClick(sortPhotosArray);
    });
    buttons[2].addEventListener('click', function (evt) {
      var activeButton = imageFilters.querySelector('.img-filters__button--active');
      activeButton.classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      window.util.deleteChildren(window.pictures.images, true);
      sortPhotosArray = getDiscussablePhotos(photos);
      window.pictures.drawPictures(sortPhotosArray);
      onPicturesClick(sortPhotosArray);
    });
  };
  // получение данных с сервера
  var onLoad = function (photos) {
    window.pictures.drawPictures(photos);
    onPicturesClick(photos);
    imageFilters.classList.remove('img-filters--inactive');
    onFilterClick(photos);
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

