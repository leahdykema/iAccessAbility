// Select all the instruction items
const items = document.querySelectorAll('.instruction-item');

// Add click event listener to each item
items.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();  

        const screenshotId = this.getAttribute('data-screenshot');

        // Hide all screenshots (including the default one)
        document.querySelectorAll('.example-images.instruction-screenshot').forEach(screenshot => {
            screenshot.classList.remove('active');
        });

        // Show the clicked screenshot
        const screenshot = document.getElementById(screenshotId);
        if (screenshot) {
            screenshot.classList.add('active');
        }
    });
});