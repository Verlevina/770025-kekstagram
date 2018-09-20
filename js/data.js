'use strict';
(function () {
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
  var COMMENTS_LENGTH = 10;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
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
  window.data = {
    PHOTOS_LENGTH: 25,
    getUrl: function (i) {
      return 'photos/' + i + '.jpg';
    },
    getLikes: function () {
      return getRandomNumber(MAX_LIKES, MIN_LIKES, false);
    },
    getNewComment: function () {
      return comments[getRandomNumber(comments.length)];
    },
    getComments: function () {
      var arrayOfComments = [];
      var arrayOfCommentsLength = getRandomNumber(COMMENTS_LENGTH);
      for (var i = 0; i < arrayOfCommentsLength; i++) {
        arrayOfComments[i] = this.getNewComment();
        if (getRandomNumber(2)) {
          arrayOfComments[i] += this.getNewComment();
        }
      }
      return arrayOfComments;
    },
    getDescription: function () {
      return descriptions[getRandomNumber(descriptions.length)];
    },
    // url avatar
    getAvatarUrl: function () {
      return 'img/avatar-' + getRandomNumber(6, false) + '.svg';
    },
  };
})();

