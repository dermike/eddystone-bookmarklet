# eddystone-bookmarklet
Share links in the office with this [Physical Web](http://github.com/google/physical-web) [Eddystone](http://github.com/google/eddystone) URL beacon bookmarklet.

### Use
To be able to use this bookmarklet and broadcast the URL from your computer you need to use the node.js server part from the [slide-beacon project](https://github.com/dermike/slide-beacon).

Add this link too a bookmark:

```javascript
javascript:(function(){function%20e(){var%20e=new%20XMLHttpRequest;e.open(%22POST%22,%22https://www.googleapis.com/urlshortener/v1/url%3Fkey=AIzaSyDdsRcdenBZR8nWqo_Ak58w8vCoASSty1k%22,!0),e.setRequestHeader(%22Content-Type%22,%22application/json%22),e.onreadystatechange=function(){if(4==e.readyState%26%26200==e.status){var%20o=JSON.parse(e.responseText);n.innerHTML+=%22%3Cp%3EShortened%20%22+o.longUrl+%22%20to%20%22+o.id+%22%3C/p%3E%22,ws.send(o.id)}};var%20o=window.location.href;e.send('{%22longUrl%22:%20%22'+o+'%22}')}var%20n=document.createElement(%22div%22);n.setAttribute(%22style%22,%22z-index:1999;position:fixed;top:0;left:0;right:0;width:100%25;background-color:%23000;color:%23fff;font-size:12px;padding:1em;text-align:center;%22),document.body.appendChild(n),%22undefined%22==typeof%20WebSocket%26%26%22undefined%22!=typeof%20MozWebSocket%26%26(WebSocket=MozWebSocket),ws=new%20WebSocket(%22ws://localhost:1234/%22),ws.onopen=function(o){n.innerHTML+=%22%3Cp%3EConnected%20to%20beacon-server%3C/p%3E%22,e()},ws.onmessage=function(e){n.innerHTML+=%22%3Cp%3E%22+e.data+%22%3C/p%3E%22},ws.onclose=function(e){ws=null,n.innerHTML+=%22%3Cp%3EConnection%20closed%3C/p%3E%22},ws.onerror=function(e){n.innerHTML+=%22%3Cp%3EReceived%20error%3C/p%3E%22}})();
```

Navigate to the page you want to share and press the bookmarklet. This will auto-shorten the link (using [Google's API](https://developers.google.com/url-shortener/)) and send it to the localhost [beacon-server](https://github.com/dermike/slide-beacon) over websockets. Status and errors are only shown in the console so far.