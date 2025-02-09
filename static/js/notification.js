function createNotification(num, prime) {
    const notification = new Notification('DeepScientist', {
      body: `The number ${num} is ${prime ? 'prime' : 'not prime'}.`,
      icon: '../static/icons/brain-logo-icon.jpg' // Optional
    });
    notification.onclick = function() {
        alert('Notification clicked!');
    };
      
      notification.onclose = function() {
        alert('Notification closed!');
    };
}

function checkNotificationPermissioin(){
    if ('Notification' in window) {
        if (Notification.permission === 'granted') {
        // Permission already granted, create notification
        // createNotification();
        } else if (Notification.permission !== 'denied') {
        // Request permission
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
            // Permission granted, create notification
            // createNotification();
            }
        });
        }
    }
}

checkNotificationPermissioin();

