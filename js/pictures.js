'use strict';
// поле редактирования изображения
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var fileUploadControl = document.querySelector('#upload-file');
// кнопка закрытия редактирования изображения
var imgUploadCancel = document.querySelector('.img-upload__cancel');
var imgUploadPreview = document.querySelector('.img-upload__preview img');
var socialCommentCount = document.querySelector('.social__comment-count');
var commentsLoader = document.querySelector('.comments-loader');
var photos = [];
// максимальное значение input, хранящего текущую глубину эффекта
var effectDeepControlMaxValue = 100;
var effectDeepControlMinValue = 0;
// var effectLevelLine = document.querySelector('.effect-level__line');
// форма загрузки фото
var imgUploadForm = document.querySelector('.img-upload__form');
//  объект со шкалой глубин эффектов фотто
var DEEP_EFFECT = [
  {
    name: 'chrome',
    value: 'grayscale',
    min: 0,
    max: 1,
    unit: ''
  },
  {name: 'sepia',
    value: 'sepia',
    min: 0,
    max: 1,
    unit: ''
  },
  {
    name: 'marvin',
    value: 'invert',
    min: 1,
    max: 100,
    unit: '%'
  },
  {
    name: 'phobos',
    value: 'blur',
    min: 0,
    max: 3,
    unit: 'px'
  },
  {
    name: 'heat',
    value: 'brightness',
    min: 1,
    max: 3,
    unit: ''
  }
];

var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var descriptions = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'];
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var COMMENTS_LENGTH = 10;
var PHOTOS_LENGTH = 25;
var SCALE_STEP = 25;
var MIN_SCALE_CONTROL_VALUE = 25;
var MAX_SCALE_CONTROL_VALUE = 100;
var ESC_KEYCODE = 27;

// Создайте массив, состоящий из 25 сгенерированных JS объектов, которые будут описывать фотографии, размещённые другими пользователями:
var getRandomNumber = function (max, min, isFor) {
  if (typeof (min) === 'undefined') {
    min = 0;
  }
  if (typeof (min) === 'boolean') {
    isFor = min;
    min = 0;
  }
  if (typeof (isFor) === 'undefined') {
    isFor = true;
  }
  if (isFor) {
    return Math.floor(Math.random() * (max - min) + min);
  } else {
    return Math.ceil(Math.random() * (max - min) + min);
  }
};
var getUrl = function (i) {
  return 'photos/' + i + '.jpg';
};
var getLikes = function () {
  return getRandomNumber(MAX_LIKES, MIN_LIKES, false);
};
var getNewComment = function () {
  return comments[getRandomNumber(comments.length)];
};

var getComments = function () {
  var arrayOfComments = [];
  var arrayOfCommentsLength = getRandomNumber(COMMENTS_LENGTH);
  for (var i = 0; i < arrayOfCommentsLength; i++) {
    arrayOfComments[i] = getNewComment();
    if (getRandomNumber(2)) {
      arrayOfComments[i] += getNewComment();
    }
  }
  return arrayOfComments;
};

var getDescription = function () {
  return descriptions[getRandomNumber(descriptions.length)];
};
var createPhotos = function () {
  for (var i = 0; i < PHOTOS_LENGTH; i++) {
    photos[i] = {};
    photos[i].url = getUrl(i + 1);
    photos[i].likes = getLikes();
    photos[i].comments = getComments();
    photos[i].description = getDescription();

  }
};
createPhotos();
// На основе данных, созданных в предыдущем пункте и шаблона #picture создайте DOM-элементы, соответствующие фотографиям и заполните их данными из массива
var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
var pictures = document.querySelector('.pictures');

var renderPhoto = function (photo) {
  var currentPicture = pictureTemplate.cloneNode(true);
  currentPicture.querySelector('.picture__img').setAttribute('src', photo.url);
  currentPicture.querySelector('.picture__likes').textContent = photo.likes;
  currentPicture.querySelector('.picture__comments').textContent = photo.comments.length;
  return currentPicture;
};

// Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.
var drawPictures = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPhoto(photos[i]));
  }
  pictures.appendChild(fragment);
};
drawPictures();

// Покажите элемент .big-picture, удалив у него класс .hidden и заполните его данными из первого элемента сгенерированного вами массива:
var showElement = function (element) {
  element.classList.remove('hidden');
};

var bigPicture = document.querySelector('.big-picture');

// url avatar
var getAvatarUrl = function () {
  return 'img/avatar-' + getRandomNumber(6, false) + '.svg';
};
var socialComments = bigPicture.querySelector('.social__comments');
var commentFragment = document.createDocumentFragment();
var socialComment = socialComments.querySelector('.social__comment');
var createBigPicture = function (CURRENT_PHOTO) {
  bigPicture.querySelector('.big-picture__img').querySelector('img').setAttribute('src', photos[CURRENT_PHOTO].url);
  bigPicture.querySelector('.likes-count').textContent = photos[CURRENT_PHOTO].likes;
  bigPicture.querySelector('.comments-count').textContent = photos[CURRENT_PHOTO].comments.length;
  bigPicture.querySelector('.social__caption').textContent = photos[CURRENT_PHOTO].description;
  bigPicture.querySelector('.big-picture__cancel').addEventListener('click', function () {
    hideElements(bigPicture);
    document.addEventListener('keydown', onBigPictureEsc);
  });


  var addCommentFragment = function (numberOfComment) {
    var commentTemplate = socialComment.cloneNode(true);
    commentTemplate.querySelector('p').textContent = photos[CURRENT_PHOTO].comments[numberOfComment];
    commentTemplate.querySelector('img').setAttribute('src', getAvatarUrl());
    return commentTemplate;
  };
  for (var j = 0; j < photos[CURRENT_PHOTO].comments.length; j++) {
    commentFragment.appendChild(addCommentFragment(j));
  }
  socialComments.appendChild(commentFragment);
};

// удаление шаблонных элементов
var currentSocialCommentsLength = socialComments.childElementCount;
var deleteSocialComments = function () {
  for (var i = currentSocialCommentsLength - 1; i >= 0; i--) {
    socialComments.removeChild(socialComments.children[i]);
  }
};
deleteSocialComments();

// обработчики клика на все фотографии, который показывает bigPicture
var picturesLink = document.querySelectorAll('.picture');
var onPicturesClick = function () {
  for (var i = 0; i < picturesLink.length; i++) {
    picturesLink[i].addEventListener('click', function (evnt) {

      for (var j = 0; j < picturesLink.length; j++) {
        if (picturesLink[j].querySelector('img') === evnt.target) {
          createBigPicture(j);
        }
      }
      showElement(bigPicture);
      document.addEventListener('keydown', onBigPictureEsc);
    });
  }
};
// закрыть bigPicture esc
var onBigPictureEsc = function (evnt) {
  if (evnt.keyCode === ESC_KEYCODE) {
    hideElements(bigPicture);
  }
};

onPicturesClick();
// Спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader,
// добавив им класс .visually-hidden.

var hideElements = function (element) {
  element.classList.add('hidden');
};

hideElements(socialCommentCount);
hideElements(commentsLoader);
// 1.3. Выбор изображения для загрузки осуществляется с помощью стандартного контрола загрузки файла #upload-file,
// который стилизован под букву «О» в логотипе. После выбора изображения (изменения значения поля #upload-file), показывается форма редактирования изображения.
var onDocumentPressESC = function (evnt) {
  if (evnt.keyCode === ESC_KEYCODE) {
    closeFileUpload();
  }
};

fileUploadControl.addEventListener('change', function () {
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentPressESC);
  // imgUploadForm.reset();
});


// закрытие формы редактировония изображения
var closeFileUpload = function () {
  imgUploadOverlay.classList.add('hidden');
  // imgUploadForm.reset();
  document.removeEventListener('keydown', onDocumentPressESC);
};
imgUploadCancel.addEventListener('click', closeFileUpload);
// 2. Редактирование изображения и ограничения, накладываемые на поля
// 2.1. Масштаб:
// При нажатии на кнопки .scale__control--smaller и .scale__control--bigger должно изменяться значение поля
// .scale__control--value.
var scaleControlSmaller = imgUploadOverlay.querySelector('.scale__control--smaller');
var scaleControlBigger = imgUploadOverlay.querySelector('.scale__control--bigger');
var scaleControlValue = imgUploadOverlay.querySelector('.scale__control--value');

var getScaleControlValue = function () {
  var value = scaleControlValue.value;
  var quantity = value.slice(0, value.length - 1);
  return +quantity;
};
// добавляем эффект масштаба
var addScaleImgUploadPreview = function () {
  imgUploadPreview.style.transform = 'scale(' + getScaleControlValue() / 100 + ')';
};
//  При изменении значения поля .scale__control--value изображению .img-upload__preview должен добавляться
// соответствующий стиль CSS, который с помощью трансформации
// ???????????????????????????????????????????????????????????????????????????????????????effect-level???????????????????????????????????????????????????????
// задаёт масштаб. Например, если в поле
// стоит значение 75%, то в стиле изображения должно быть написано transform: scale(0.75)
scaleControlSmaller.addEventListener('click', function () {
  scaleControlValue.value = (getScaleControlValue() - SCALE_STEP) + '%';
  if (getScaleControlValue() <= MIN_SCALE_CONTROL_VALUE) {
    scaleControlValue.value = MIN_SCALE_CONTROL_VALUE + '%';
  }
  addScaleImgUploadPreview();
});

scaleControlBigger.addEventListener('click', function () {
  scaleControlValue.value = (getScaleControlValue() + SCALE_STEP) + '%';
  if (getScaleControlValue() >= MAX_SCALE_CONTROL_VALUE) {
    scaleControlValue.value = MAX_SCALE_CONTROL_VALUE + '%';
  }
  addScaleImgUploadPreview();
});

// 2.2. Наложение эффекта на изображение:
// список радио
var effectsRadio = imgUploadOverlay.querySelectorAll('.effects__radio');
// инпут со значением глубины эффекта
var effectLevelValue = imgUploadOverlay.querySelector('.effect-level__value');

// поиск выбранного radiobutton и выбор эффекта
var findSelectedEffect = function () {
  var selectedEffectsRadio = imgUploadOverlay.querySelector('.effects__radio:checked');
  return (selectedEffectsRadio.id).slice(7);
};
// Интенсивность эффекта регулируется перемещением ползунка в слайдере .effect-level__pin. Уровень эффекта записывается в поле .scale__value
// поиск реального значения глубины эффекта относительно input
var calculateCurrentDeepEffect = function (effectObject) {
  var rez = ((+effectLevelValue.value) * (effectObject.max - effectObject.min) / effectDeepControlMaxValue) + effectObject.min;
  return rez;
};

// 2.2. Наложение эффекта на изображение:
var selectedEffect = findSelectedEffect();
var onEffectLevelRadioChange = function () {

  effectLevelValue.addEventListener('change', function () {
  // document.querySelector('.img-upload__effect-level').addEventListener('click', function () {
    var effect = findSelectedEffect();
    for (var i = 0; i < DEEP_EFFECT.length; i++) {
      if (DEEP_EFFECT[i].name === effect) {
        var filterValue = DEEP_EFFECT[i].value + '(' + calculateCurrentDeepEffect(DEEP_EFFECT[i]) + DEEP_EFFECT[i].unit + ')';
        imgUploadPreview.style.filter = filterValue;
      }
    }
    effectLevelPin.style.left = effectLevelValue.value;
  });
};

// клик по радио
var onEffectsRadioClick = function () {
  for (var i = 0; i < effectsRadio.length; i++) {
    effectsRadio[i].addEventListener('click', function () {
      selectedEffect = findSelectedEffect();
      imgUploadPreview.className = '';
      imgUploadPreview.classList.add('effects__preview--' + selectedEffect);
      onEffectLevelRadioChange();
      effectLevelValue.value = effectDeepControlMinValue;
    });
  }
};
onEffectsRadioClick();
// При выборе эффекта «Оригинал» слайдер скрывается.

effectsRadio[0].addEventListener('click', closeFileUpload);
// Интенсивность эффекта регулируется перемещением ползунка в слайдере .effect-level__pin. Уровень эффекта
// записывается в поле .scale__value.

var effectLevelPin = imgUploadOverlay.querySelector('.effect-level__pin');
effectLevelPin.addEventListener('mouseup', function () {
  effectLevelValue.value = (getComputedStyle(effectLevelPin).left).slice(0, -1);
});


// Хэштеги
var textHashtags = imgUploadOverlay.querySelector('.text__hashtags');
var imgUploadSubmit = imgUploadOverlay.querySelector('.img-upload__submit');
var textDescription = imgUploadOverlay.querySelector('.text__description');

textHashtags.addEventListener('blur', function () {
  // чтоб предвыдущая ошибка не высвечивалась
  textHashtags.setCustomValidity('');
  // если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы редактирования
  // изображения.
  document.addEventListener('keydown', onDocumentPressESC);
});
// если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы редактирования
// изображения.
textHashtags.addEventListener('focus', function () {
  document.removeEventListener('keydown', onDocumentPressESC);
});

// если фокус находится в поле ввода комментария, нажатие на Esc не должно приводить к закрытию формы редактирования
// изображения.
textDescription.addEventListener('focus', function () {
  document.removeEventListener('keydown', onDocumentPressESC);
});
textDescription.addEventListener('blur', function () {
  document.addEventListener('keydown', onDocumentPressESC);
});

imgUploadSubmit.addEventListener('click', function () {
  if (textHashtags.value) {
    // сброс ошибок
    textHashtags.setCustomValidity('');
    textDescription.setCustomValidity('');
    // Установка специального сообщения об ошибке
    var error = getInvalidMessage();
    if (error) {
      textHashtags.setCustomValidity(error);
    }
  }

  if (textDescription.value.length > 140) {
    textDescription.setCustomValidity('длина сообщения не может быть больше 140 символов');
  }
});
// деление строки на хэштеги
var getHashtags = function (hashtags) {
  return hashtags.split(' ');
};
// хэштег в lowerCase
var getStringInLowerCase = function (string) {
  return string.toLowerCase();
};


// проверяем валидность хэштегов
var getInvalidMessage = function () {
  var MAX_HASHTAGS_QUANTITY = 5;
  var MAX_HASTAG_LENGTH = 20;
  var MIN_HASHTAGS_LENGTH = 1;
  var stringOfHashtags = getStringInLowerCase(textHashtags.value);
  var isWhiteSpace = false;
  var quantity = 0;

  for (var i = 0; i < stringOfHashtags.length; i++) {
    if (!isWhiteSpace) {
      if (stringOfHashtags[i] !== '#') {
        return 'каждый хэштег должен начинаться с # и быть разделен пробелом';
      } else {

        isWhiteSpace = true;
      }
    } else {
      if (stringOfHashtags[i] === '#') {
        return 'хэштег не может быть посередине слова';
      }
    }
    quantity++;
    if (stringOfHashtags[i] === ' ') {
      if (quantity > MAX_HASTAG_LENGTH - 1 || quantity <= MIN_HASHTAGS_LENGTH) {
        return 'длина хештега должна быть больше ' + MIN_HASHTAGS_LENGTH + ' и меньше ' + MAX_HASTAG_LENGTH;
      }
      quantity = 0;
      isWhiteSpace = false;
    }
  }
  var hashtags = getHashtags(stringOfHashtags);

  if (hashtags.length >= MAX_HASHTAGS_QUANTITY) {
    return 'количество хэштегов не может быть больше ' + MAX_HASHTAGS_QUANTITY;
  }
  if (quantity > MAX_HASTAG_LENGTH - 1 || quantity <= MIN_HASHTAGS_LENGTH) {
    return 'длина хештега должна быть больше ' + MIN_HASHTAGS_LENGTH + ' и меньше ' + MAX_HASTAG_LENGTH;
  }

  // одинаковые ли хэштеги
  for (var j = 0; j < hashtags.length; j++) {
    for (var k = hashtags.length - 1; k > j; k--) {
      if (j === k) {
        continue;
      }
      if (hashtags[j] === hashtags[k]) {
        return 'хэштеги не могут быть одинаковыми';
      }
    }
  }
  return false;
};
