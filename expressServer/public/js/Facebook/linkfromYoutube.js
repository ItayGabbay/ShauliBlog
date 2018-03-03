// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player, player2;
function onYouTubeIframeAPIReady() {
  // Getting the root scope
  var rootScope = angular.element($('body')).injector().get('$rootScope');
  rootScope.youtubeLoaded = true;
  angular.element($('body')).injector().get('$rootScope').$broadcast('youtubeLoaded', true);
}