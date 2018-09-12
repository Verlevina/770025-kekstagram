'use strict';
var fileUploadControl = document.querySelector('#upload-file');
// поле редактирования изображения
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
// кнопка закрытия редактирования изображения
var imgUploadCancel = document.querySelector('.img-upload__cancel');
var photos = [];
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
var CURRENT_PHOTO = 0;
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

for (var i = 0; i < PHOTOS_LENGTH; i++) {
  photos[i] = {};
  photos[i].url = getUrl(i + 1);
  photos[i].likes = getLikes();
  photos[i].comments = getComments();
  photos[i].description = getDescription();

}

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

  for (i = 0; i < photos.length; i++) {
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
// showElement(bigPicture);

// url avatar
var getAvatarUrl = function () {
  return 'img/avatar-' + getRandomNumber(6, false) + '.svg';
};
var createBigPicture = function () {
  bigPicture.querySelector('.big-picture__img').querySelector('img').setAttribute('src', photos[CURRENT_PHOTO].url);
  bigPicture.querySelector('.likes-count').textContent = photos[CURRENT_PHOTO].likes;
  bigPicture.querySelector('.comments-count').textContent = photos[CURRENT_PHOTO].comments.length;
  bigPicture.querySelector('.social__caption').textContent = photos[CURRENT_PHOTO].description;

  var socialComments = bigPicture.querySelector('.social__comments');
  var commentFragment = document.createDocumentFragment();
  var socialComment = socialComments.querySelector('.social__comment');


  // удаление шаблонных элементов
  var currentSocialCommentsLength = socialComments.childElementCount;
  for (i = currentSocialCommentsLength - 1; i >= 0; i--) {
    socialComments.removeChild(socialComments.children[i]);
  }

  var addCommentFragment = function (numberOfComment) {
    var commentTemplate = socialComment.cloneNode(true);
    commentTemplate.querySelector('p').textContent = photos[CURRENT_PHOTO].comments[numberOfComment];
    commentTemplate.querySelector('img').setAttribute('src', getAvatarUrl());
    return commentTemplate;
  };
  for (i = 0; i < photos[CURRENT_PHOTO].comments.length; i++) {
    commentFragment.appendChild(addCommentFragment(i));
  }
  socialComments.appendChild(commentFragment);
};

createBigPicture();

// Спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader,
// добавив им класс .visually-hidden.
var socialCommentCount = document.querySelector('.social__comment-count');
var commentsLoader = document.querySelector('.comments-loader');
var hideElements = function (element) {
  element.classList.add('visually-hidden');
};

hideElements(socialCommentCount);
hideElements(commentsLoader);
// 1.3. Выбор изображения для загрузки осуществляется с помощью стандартного контрола загрузки файла #upload-file,
// который стилизован под букву «О» в логотипе. После выбора изображения (изменения значения поля #upload-file), показывается форма редактирования изображения.
var onDocumentPressESC = function (evnt) {
  if (evnt.keyCode === 27) {
    closeFileUpload();
  }
};

fileUploadControl.addEventListener('change', function () {
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentPressESC);
});


// закрытие формы редактировония изображения
var closeFileUpload = function () {
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentPressESC);
};
imgUploadOverlay.addEventListener('click', closeFileUpload);
