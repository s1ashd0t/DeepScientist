let touchstartY = 0;
let pullDistance = 0;
const loader = document.querySelector('.loader');

document.addEventListener('touchstart', e => {
  touchstartY = e.touches[0].clientY;
});

document.addEventListener('touchmove', e => {
  const touchY = e.touches[0].clientY;
  pullDistance = touchY - touchstartY;

  // Only trigger if user is at the top of the page
  if (window.scrollY === 0 && pullDistance > 0) {
    e.preventDefault(); // Prevent overscroll (optional)
    loader.style.transform = `translateY(${pullDistance}px)`;

    // Trigger refresh if pulled past threshold (e.g., 70px)
    if (pullDistance > 70) {
      loader.textContent = '🔄 Refreshing...';
    }
  }
});

document.addEventListener('touchend', () => {
  if (pullDistance > 70) {
    // Perform refresh action (e.g., reload or fetch data)
    setTimeout(() => {
      window.location.reload(); // Replace with your refresh logic
    }, 1000);
  }

  // Reset
  pullDistance = 0;
  loader.style.transform = 'translateY(-50px)';
  loader.textContent = '🔄 Release to refresh';
});