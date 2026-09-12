// Bombay Falooda - Web Push Background Notification Service Worker

self.addEventListener("push", function (event) {
  let title = "Bombay Falooda";
  let options = {
    body: "You have a new update from Bombay Falooda.",
    icon: "/bombay-logo.png",
    badge: "/bombay-logo.png",
    vibrate: [200, 100, 200, 100, 200],
    data: {
      url: "/",
    },
  };

  if (event.data) {
    try {
      const payload = event.data.json();
      if (payload.notification) {
        title = payload.notification.title || title;
        options.body = payload.notification.body || options.body;
        if (payload.notification.icon) options.icon = payload.notification.icon;
      }
      if (payload.data) {
        options.data = payload.data;
      }
    } catch {
      options.body = event.data.text();
    }
  }

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) || "/";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (clientList) {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url.includes(targetUrl) && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    }),
  );
});
