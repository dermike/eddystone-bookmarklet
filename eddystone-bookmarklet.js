(function() {
  
  function getShortUrl() {
    var request = new XMLHttpRequest();
    request.open('POST', 'https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyDdsRcdenBZR8nWqo_Ak58w8vCoASSty1k', true);
    request.setRequestHeader('Content-Type', 'application/json');
    
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        var response = JSON.parse(request.responseText);
        console.log('Shortened ' + response.longUrl + ' to ' + response.id);
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
    console.log('Connected to beacon-server');
    getShortUrl();
  };
  ws.onmessage = function(event) {
    console.log(event.data);
  }
  ws.onclose = function(event) {
    ws = null;
    console.log('Connection closed');
  };
  ws.onerror = function(event) {
    console.log('Received error');
  };

})();
