(function() {
  
  var eb = document.getElementById('eddystone-bm') || document.createElement('div');
  if (!eb.id) {
    eb.id = 'eddystone-bm';
    eb.setAttribute('style', 'z-index:1999;position:fixed;bottom:0;left:0;right:0;width:100%;background-color:#000;color:#fff;font-size:12px;padding:1em;text-align:center;');
    eb.setAttribute('onclick', 'this.parentNode.removeChild(this)');
    document.body.appendChild(eb);
  }
  
  function getShortUrl() {
    var request = new XMLHttpRequest();
    request.open('POST', 'https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyDdsRcdenBZR8nWqo_Ak58w8vCoASSty1k', true);
    request.setRequestHeader('Content-Type', 'application/json');
    
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        var response = JSON.parse(request.responseText);
        eb.innerHTML += '<p>Shortened ' + response.longUrl + ' to ' + response.id + '</p>';
        ws.send(response.id);
      }
    }
    
    var currentUrl = window.location.href;
    request.send('{"longUrl": "' + currentUrl + '"}');
  }
  
  if ((typeof(WebSocket) == 'undefined') && (typeof(MozWebSocket) != 'undefined')) {
    WebSocket = MozWebSocket;
  }
    
  ws = new WebSocket('ws://localhost:1234/');
  ws.onopen = function(event) {
    eb.innerHTML += '<p>Connected to beacon-server</p>';
    getShortUrl();
  };
  ws.onmessage = function(event) {
    eb.innerHTML += '<p>' + event.data + '</p>';
  }
  ws.onclose = function(event) {
    ws = null;
    eb.innerHTML += '<p>Connection closed</p>';
  };
  ws.onerror = function(event) {
    eb.innerHTML += '<p>Received error</p>';
  };

})();
