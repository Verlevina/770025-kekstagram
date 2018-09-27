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
      return b.comments.length - a.comments.length;
    });
    return sortArray;
  };

  var getPopularPhoto = function (photos) {
    return photos.slice();
  };


  // обработка кликов по кнокпам сортировки
  var onFilterClick = function (photos) {
    var buttons = imageFilters.querySelectorAll('button');
    var sortPhotosArray = [];
    var onButtonClick = function (callback, evt) {
      var activeButton = imageFilters.querySelector('.img-filters__button--active');
      activeButton.classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      window.util.deleteChildren(window.pictures.images, true);
      sortPhotosArray = callback(photos);
      window.pictures.drawPictures(sortPhotosArray);
      onPicturesClick(sortPhotosArray);
    };
    var onButtonDiscusingClick = window.debounce(function (evt) {
      onButtonClick(getDiscussablePhotos, evt);
    });

    var onButtonPopularClick = window.debounce(function (evt) {
      onButtonClick(getPopularPhoto, evt);
    });

    var onButtonNewClick = window.debounce(function (evt) {
      onButtonClick(getNewPhotos, evt);
    });
    buttons[0].addEventListener('click', onButtonPopularClick);
    buttons[1].addEventListener('click', onButtonNewClick);
    buttons[2].addEventListener('click', onButtonDiscusingClick);
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

