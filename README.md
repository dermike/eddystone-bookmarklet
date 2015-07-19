# eddystone-bookmarklet
Share links in the office with this [Physical Web](http://github.com/google/physical-web) [Eddystone](http://github.com/google/eddystone) URL beacon bookmarklet.

### Use
To be able to use this bookmarklet and broadcast the URL from your computer you need to use the node.js server part from the [slide-beacon project](https://github.com/dermike/slide-beacon).

Add this link too a bookmark:

```javascript
javascript:void%20function(){(function(){function%20e(){var%20e=new%20XMLHttpRequest;e.open(%22POST%22,%22https://www.googleapis.com/urlshortener/v1/url%3Fkey=AIzaSyDdsRcdenBZR8nWqo_Ak58w8vCoASSty1k%22,!0),e.setRequestHeader(%22Content-Type%22,%22application/json%22),e.onreadystatechange=function(){if(4==e.readyState%26%26200==e.status){var%20o=JSON.parse(e.responseText);console.log(%22Shortened%20%22+o.longUrl+%22%20to%20%22+o.id),ws.send(o.id)}};var%20o=window.location.href;e.send('{%22longUrl%22:%20%22'+o+'%22}')}%22undefined%22==typeof%20WebSocket%26%26%22undefined%22!=typeof%20MozWebSocket%26%26(WebSocket=MozWebSocket),ws=new%20WebSocket(%22ws://localhost:1234/%22),ws.onopen=function(o){console.log(%22Connected%20to%20beacon-server%22),e()},ws.onmessage=function(e){console.log(e.data)},ws.onclose=function(e){ws=null,console.log(%22Connection%20closed%22)},ws.onerror=function(e){console.log(%22Received%20error%22)}})()}();
```

Navigate to the page you want to share and press the bookmarklet. This will auto-shorten the link (using [Google's API](https://developers.google.com/url-shortener/)) and send it to the localhost [beacon-server](https://github.com/dermike/slide-beacon) over websockets. Status and errors are only shown in the console so far.