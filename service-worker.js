"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/app.js","aca080ab81ed384fc465e04bd1ada351"],["/assets/github-fluid-icon.png","ca1ef68de99bb1c21b54a2de9c2f5603"],["/index.html","d25f55db47c3fe41624ee729751f62ae"],["/manifest.json","4c4671d6e8faef476d6d62f7e20d34e2"],["/styles.css","42f4a3ac7142d4618520644c535fad3c"],["/vendor.js","ec921539b358e9ae54d57af49bd5b500"]],cacheName="sw-precache-v3-githubprofiler-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,n,r){var o=new URL(e);return r&&o.pathname.match(r)||(o.search+=(o.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),o.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,t){var n=new URL(e);return n.hash="",n.search=n.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),n.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],r=new URL(t,self.location),o=createCacheKey(r,hashParamName,n,!1);return[r.toString(),o]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(n){if(!t.has(n)){var r=new Request(n,{credentials:"same-origin"});return fetch(r).then(function(t){if(!t.ok)throw new Error("Request for "+n+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(n,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(n){return Promise.all(n.map(function(n){if(!t.has(n.url))return e.delete(n)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,n=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);t=urlsToCacheKeys.has(n);t||(n=addDirectoryIndex(n,"index.html"),t=urlsToCacheKeys.has(n));!t&&"navigate"===e.request.mode&&isPathWhitelisted([],e.request.url)&&(n=new URL("index.html",self.location).toString(),t=urlsToCacheKeys.has(n)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}}),function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.toolbox=e()}}(function(){return function e(t,n,r){function o(i,c){if(!n[i]){if(!t[i]){var s="function"==typeof require&&require;if(!c&&s)return s(i,!0);if(a)return a(i,!0);var u=new Error("Cannot find module '"+i+"'");throw u.code="MODULE_NOT_FOUND",u}var h=n[i]={exports:{}};t[i][0].call(h.exports,function(e){var n=t[i][1][e];return o(n||e)},h,h.exports,e,t,n,r)}return n[i].exports}for(var a="function"==typeof require&&require,i=0;i<r.length;i++)o(r[i]);return o}({1:[function(e,t,n){function r(e,t){t=t||{},(t.debug||m.debug)&&console.log("[sw-toolbox] "+e)}function o(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||m.cache.name,caches.open(t)}function a(e,t){t=t||{};var n=t.successResponses||m.successResponses;return fetch(e.clone()).then(function(r){return"GET"===e.method&&n.test(r.status)&&o(t).then(function(n){n.put(e,r).then(function(){var r=t.cache||m.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&i(e,n,r)})}),r.clone()})}function i(e,t,n){var r=c.bind(null,e,t,n);d=d?d.then(r):r()}function c(e,t,n){var o=e.url,a=n.maxAgeSeconds,i=n.maxEntries,c=n.name,s=Date.now();return r("Updating LRU order for "+o+". Max entries is "+i+", max age is "+a),g.getDb(c).then(function(e){return g.setTimestampForUrl(e,o,s)}).then(function(e){return g.expireEntries(e,i,a,s)}).then(function(e){r("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function s(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})}function u(e,t){return o(t).then(function(t){return t.add(e)})}function h(e,t){return o(t).then(function(t){return t.delete(e)})}function f(e){e instanceof Promise||l(e),m.preCacheItems=m.preCacheItems.concat(e)}function l(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}function p(e,t,n){if(!e)return!1;if(t){var r=e.headers.get("date");if(r){if(new Date(r).getTime()+1e3*t<n)return!1}}return!0}var d,m=e("./options"),g=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:a,openCache:o,renameCache:s,cache:u,uncache:h,precache:f,validatePrecacheInput:l,isResponseFresh:p}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){function r(e){return new Promise(function(t,n){var r=indexedDB.open(u+e,h);r.onupgradeneeded=function(){r.result.createObjectStore(f,{keyPath:l}).createIndex(p,p,{unique:!1})},r.onsuccess=function(){t(r.result)},r.onerror=function(){n(r.error)}})}function o(e){return e in d||(d[e]=r(e)),d[e]}function a(e,t,n){return new Promise(function(r,o){var a=e.transaction(f,"readwrite");a.objectStore(f).put({url:t,timestamp:n}),a.oncomplete=function(){r(e)},a.onabort=function(){o(a.error)}})}function i(e,t,n){return t?new Promise(function(r,o){var a=1e3*t,i=[],c=e.transaction(f,"readwrite"),s=c.objectStore(f);s.index(p).openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-a>t.value[p]){var r=t.value[l];i.push(r),s.delete(r),t.continue()}},c.oncomplete=function(){r(i)},c.onabort=o}):Promise.resolve([])}function c(e,t){return t?new Promise(function(n,r){var o=[],a=e.transaction(f,"readwrite"),i=a.objectStore(f),c=i.index(p),s=c.count();c.count().onsuccess=function(){var e=s.result;e>t&&(c.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var a=r.value[l];o.push(a),i.delete(a),e-o.length>t&&r.continue()}})},a.oncomplete=function(){n(o)},a.onabort=r}):Promise.resolve([])}function s(e,t,n,r){return i(e,n,r).then(function(n){return c(e,t).then(function(e){return n.concat(e)})})}var u="sw-toolbox-",h=1,f="store",l="url",p="timestamp",d={};t.exports={getDb:o,setTimestampForUrl:a,expireEntries:s}},{}],3:[function(e,t,n){function r(e){var t=s.match(e.request);t?e.respondWith(t(e.request)):s.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(s.default(e.request))}function o(e){c.debug("activate event fired");var t=u.cache.name+"$$$inactive$$$";e.waitUntil(c.renameCache(t,u.cache.name))}function a(e){return e.reduce(function(e,t){return e.concat(t)},[])}function i(e){var t=u.cache.name+"$$$inactive$$$";c.debug("install event fired"),c.debug("creating cache ["+t+"]"),e.waitUntil(c.openCache({cache:{name:t}}).then(function(e){return Promise.all(u.preCacheItems).then(a).then(c.validatePrecacheInput).then(function(t){return c.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}e("serviceworker-cache-polyfill");var c=e("./helpers"),s=e("./router"),u=e("./options");t.exports={fetchListener:r,activateListener:o,installListener:i}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){var r=new URL("./",self.location),o=r.pathname,a=e("path-to-regexp"),i=function(e,t,n,r){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=o+t),this.keys=[],this.regexp=a(t,this.keys)),this.method=e,this.options=r,this.handler=n};i.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=i},{"path-to-regexp":15}],6:[function(e,t,n){function r(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var o=e("./route"),a=e("./helpers"),i=function(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){new RegExp(r.value[0]).test(t)&&o.push(r.value[1]),r=n.next()}return o},c=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){c.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),c.prototype.add=function(e,t,n,i){i=i||{};var c;t instanceof RegExp?c=RegExp:(c=i.origin||self.location.origin,c=c instanceof RegExp?c.source:r(c)),e=e.toLowerCase();var s=new o(e,t,n,i);this.routes.has(c)||this.routes.set(c,new Map);var u=this.routes.get(c);u.has(e)||u.set(e,new Map);var h=u.get(e),f=s.regexp||s.fullUrlRegExp;h.has(f.source)&&a.debug('"'+t+'" resolves to same regex as existing route.'),h.set(f.source,s)},c.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,i(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},c.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],a=o&&o.get(e.toLowerCase());if(a){var c=i(a,n);if(c.length>0)return c[0].makeHandler(n)}}return null},c.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new c},{"./helpers":1,"./route":5}],7:[function(e,t,n){function r(e,t,n){return n=n||{},a.debug("Strategy: cache first ["+e.url+"]",n),a.openCache(n).then(function(t){return t.match(e).then(function(t){var r=n.cache||o.cache,i=Date.now();return a.isResponseFresh(t,r.maxAgeSeconds,i)?t:a.fetchAndCache(e,n)})})}var o=e("../options"),a=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],8:[function(e,t,n){function r(e,t,n){return n=n||{},a.debug("Strategy: cache only ["+e.url+"]",n),a.openCache(n).then(function(t){return t.match(e).then(function(e){var t=n.cache||o.cache,r=Date.now();if(a.isResponseFresh(e,t.maxAgeSeconds,r))return e})})}var o=e("../options"),a=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],9:[function(e,t,n){function r(e,t,n){return o.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(r,i){var c=!1,s=[],u=function(e){s.push(e.toString()),c?i(new Error('Both cache and network failed: "'+s.join('", "')+'"')):c=!0},h=function(e){e instanceof Response?r(e):u("No result returned")};o.fetchAndCache(e.clone(),n).then(h,u),a(e,t,n).then(h,u)})}var o=e("../helpers"),a=e("./cacheOnly");t.exports=r},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){function r(e,t,n){n=n||{};var r=n.successResponses||o.successResponses,i=n.networkTimeoutSeconds||o.networkTimeoutSeconds;return a.debug("Strategy: network first ["+e.url+"]",n),a.openCache(n).then(function(t){var c,s,u=[];if(i){var h=new Promise(function(r){c=setTimeout(function(){t.match(e).then(function(e){var t=n.cache||o.cache,i=Date.now(),c=t.maxAgeSeconds;a.isResponseFresh(e,c,i)&&r(e)})},1e3*i)});u.push(h)}var f=a.fetchAndCache(e,n).then(function(e){if(c&&clearTimeout(c),r.test(e.status))return e;throw a.debug("Response was an HTTP error: "+e.statusText,n),s=e,new Error("Bad response")}).catch(function(r){return a.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(s)return s;throw r})});return u.push(f),Promise.race(u)})}var o=e("../options"),a=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],12:[function(e,t,n){function r(e,t,n){return o.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}var o=e("../helpers");t.exports=r},{"../helpers":1}],13:[function(e,t,n){var r=e("./options"),o=e("./router"),a=e("./helpers"),i=e("./strategies"),c=e("./listeners");a.debug("Service Worker Toolbox is loading"),self.addEventListener("install",c.installListener),self.addEventListener("activate",c.activateListener),self.addEventListener("fetch",c.fetchListener),t.exports={networkOnly:i.networkOnly,networkFirst:i.networkFirst,cacheOnly:i.cacheOnly,cacheFirst:i.cacheFirst,fastest:i.fastest,router:o,options:r,cache:a.cache,uncache:a.uncache,precache:a.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function r(e,t){for(var n,r=[],o=0,a=0,i="",c=t&&t.delimiter||"/";null!=(n=w.exec(e));){var h=n[0],f=n[1],l=n.index;if(i+=e.slice(a,l),a=l+h.length,f)i+=f[1];else{var p=e[a],d=n[2],m=n[3],g=n[4],v=n[5],x=n[6],y=n[7];i&&(r.push(i),i="");var b=null!=d&&null!=p&&p!==d,R="+"===x||"*"===x,E="?"===x||"*"===x,C=n[2]||c,k=g||v;r.push({name:m||o++,prefix:d||"",delimiter:C,optional:E,repeat:R,partial:b,asterisk:!!y,pattern:k?u(k):y?".*":"[^"+s(C)+"]+?"})}}return a<e.length&&(i+=e.substr(a)),i&&r.push(i),r}function o(e,t){return c(r(e,t))}function a(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function i(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var o="",c=n||{},s=r||{},u=s.pretty?a:encodeURIComponent,h=0;h<e.length;h++){var f=e[h];if("string"!=typeof f){var l,p=c[f.name];if(null==p){if(f.optional){f.partial&&(o+=f.prefix);continue}throw new TypeError('Expected "'+f.name+'" to be defined')}if(v(p)){if(!f.repeat)throw new TypeError('Expected "'+f.name+'" to not repeat, but received `'+JSON.stringify(p)+"`");if(0===p.length){if(f.optional)continue;throw new TypeError('Expected "'+f.name+'" to not be empty')}for(var d=0;d<p.length;d++){if(l=u(p[d]),!t[h].test(l))throw new TypeError('Expected all "'+f.name+'" to match "'+f.pattern+'", but received `'+JSON.stringify(l)+"`");o+=(0===d?f.prefix:f.delimiter)+l}}else{if(l=f.asterisk?i(p):u(p),!t[h].test(l))throw new TypeError('Expected "'+f.name+'" to match "'+f.pattern+'", but received "'+l+'"');o+=f.prefix+l}}else o+=f}return o}}function s(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function h(e,t){return e.keys=t,e}function f(e){return e.sensitive?"":"i"}function l(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return h(e,t)}function p(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(g(e[o],t,n).source);return h(new RegExp("(?:"+r.join("|")+")",f(n)),t)}function d(e,t,n){return m(r(e,n),t,n)}function m(e,t,n){v(t)||(n=t||n,t=[]),n=n||{};for(var r=n.strict,o=!1!==n.end,a="",i=0;i<e.length;i++){var c=e[i];if("string"==typeof c)a+=s(c);else{var u=s(c.prefix),l="(?:"+c.pattern+")";t.push(c),c.repeat&&(l+="(?:"+u+l+")*"),l=c.optional?c.partial?u+"("+l+")?":"(?:"+u+"("+l+"))?":u+"("+l+")",a+=l}}var p=s(n.delimiter||"/"),d=a.slice(-p.length)===p;return r||(a=(d?a.slice(0,-p.length):a)+"(?:"+p+"(?=$))?"),a+=o?"$":r&&d?"":"(?="+p+"|$)",h(new RegExp("^"+a,f(n)),t)}function g(e,t,n){return v(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?l(e,t):v(e)?p(e,t,n):d(e,t,n)}var v=e("isarray");t.exports=g,t.exports.parse=r,t.exports.compile=o,t.exports.tokensToFunction=c,t.exports.tokensToRegExp=m;var w=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)}),toolbox.router.get("/",toolbox.cacheFirst,{});