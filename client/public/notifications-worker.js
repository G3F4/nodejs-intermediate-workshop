self.addEventListener('push', async (event) => {
  const data = event.data.json();
  console.log(['push:data'], data);

  await self.registration.showNotification(data.title, data.notification);
});
