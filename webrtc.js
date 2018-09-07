function connection(){
  var connection = new RTCMultiConnection();

  connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
  connection.session = {
      audio: true,
      video: true
  };
  
  connection.sdpConstraints.mandatory = {
      OfferToReceiveAudio: true,
      OfferToReceiveVideo: true
  };
  
  // first step, ignore default STUN+TURN servers
  connection.iceServers = [];
  
  // second step, set STUN url
  connection.iceServers.push({
      urls: 'stun:stun.l.google.com:19302'
  });
  
  // last step, set TURN url (recommended)
  connection.iceServers.push({
      url: 'turn:numb.viagenie.ca',
      credential: 'muazkh',
      username: 'webrtc@live.com'
  });

  return connection;
}

//
//connection.videosContainer = document.getElementById('streams');
//
//connection.onstream = function(event){
//
// var existing = document.getElementById(event.streamid);
// if(existing && existing.parentNode) {
//   existing.parentNode.removeChild(existing);
// }
//
// event.mediaElement.removeAttribute('src');
// event.mediaElement.removeAttribute('srcObject');
// event.mediaElement.muted = true;
// event.mediaElement.volume = 0;
// var video = document.createElement('video');
//
// try {
//     video.setAttributeNode(document.createAttribute('autoplay'));
//     video.setAttributeNode(document.createAttribute('playsinline'));
// } catch (e) {
//     video.setAttribute('autoplay', true);
//     video.setAttribute('playsinline', true);
// }
//
// if(event.type === 'local') {
//   video.volume = 0;
//   try {
//       video.setAttributeNode(document.createAttribute('muted'));
//   } catch (e) {
//       video.setAttribute('muted', true);
//   }
// }
//
// video.srcObject = event.stream;
// var width = parseInt(connection.videosContainer.clientWidth / 3) - 20;
// var mediaElement = getHTMLMediaElement(video, {
//     title: event.userid,
//     buttons: ['full-screen'],
//     width: width,
//     showOnMouseEnter: false
// });
// connection.videosContainer.appendChild(mediaElement);
// setTimeout(function() {
//     mediaElement.media.play();
// }, 5000);
// mediaElement.id = event.streamid;
//};

