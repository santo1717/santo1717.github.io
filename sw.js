self.CACHE_NAME = ["cats-v", 14];

var cache_name = self.CACHE_NAME[0] + self.CACHE_NAME[1];

self.addEventListener('fetch', function(event) {
	var cacheRequest = event.request.clone();
	event.respondWith(caches.match(cacheRequest).then(function(response) {
		if(response) return response;
		var fetchRequest = event.request.clone();
		return fetch(fetchRequest).then(function(response) {
			var responseToCache = response.clone();
			caches.open(cache_name).then(function(cache) {
				var cacheSaveRequest = event.request.clone();
				cache.put(cacheSaveRequest, responseToCache);
			});
			return response;
		});
	}));
});

// Now we need to clean up resources in the previous versions
// of Service Worker scripts
self.addEventListener('activate', function(event) {
	var cachesToDelete = [];
	for(var i=0;i<self.CACHE_NAME[1];i++) {
		cachesToDelete.push(self.CACHE_NAME[0] + i);
	}
	console.log(cachesToDelete);
	// Destroy the cache
	event.waitUntil(caches.keys().then(function(cacheNames) {
		return Promise.all(cacheNames.map(function(cacheName) {
			if(cachesToDelete.indexOf(cacheName) !== -1) {
				console.log("destroy:", cacheName);
				return caches.delete(cacheName);
			}
			return Promise.resolve();
		}));
	}));

});

/* Notification click event start */
	self.addEventListener('notificationclick', function(event) {
		  console.log('On notification click: ', event.notification.tag);

	  event.notification.close();
	  var found = false;
	  /*if (event.action === 'archive') {
	    silentlyArchiveEmail();
	  } else {*/
	  
	  event.waitUntil(clients.matchAll({
		    type: "window"
		  }).then(function(clientList) {
		    for (var i = 0; i < clientList.length; i++) {
		      var client = clientList[i];
		      console.log("client.url"+client.url);
		      if (client.url.indexOf("mobile-handsets") > -1 && 'focus' in client)
		    	  found = true;
		      client.focus();
		     clients.openWindow("http://m.naaptol.com/m/jeans/set-of-3-smart-fashion-denims-for-men-by-american-indigo-new/p/12494804.html?ntzoneid=9262&nts=HP_Best_Deals&ntz=HP_Best_Deals");		     
		    }
		    if (!found)
		       clients.openWindow("http://m.naaptol.com/m/jeans/set-of-3-smart-fashion-denims-for-men-by-american-indigo-new/p/12494804.html?ntzoneid=9262&nts=HP_Best_Deals&ntz=HP_Best_Deals");

		  }));
	 
	  /*}*/
	}, false);
	/* Notification click event End */
	
	
	/*self.onnotificationclick = function(event) {
		  console.log('On notification click: ', event.notification.tag);
		  event.notification.close();

		  // This looks to see if the current is already open and
		  // focuses if it is
		  event.waitUntil(clients.matchAll({
		    type: "window"
		  }).then(function(clientList) {
		    for (var i = 0; i < clientList.length; i++) {
		      var client = clientList[i];
		      if (client.url == '/' && 'focus' in client)
		        return client.focus();
		    }
		    if (clients.openWindow)
		      return clients.openWindow('/');
		  }));
		};*/
	