// Select all the instruction items
const items = document.querySelectorAll('.instruction-item');
items.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const screenshotId = this.getAttribute('data-screenshot');
        // find section img is in
        const section = this.closest('.img-and-text');
        // Hide only the imgs in the section the called for img is in
        section.querySelectorAll('.example-images.instruction-screenshot').forEach(screenshot => {
            screenshot.classList.remove('active');
            screenshot.style.display = 'none';
        });
        // add active class to associated img
        const screenshot = section.querySelector(`#${screenshotId}`);
        if (screenshot) {
            screenshot.classList.add('active');
            screenshot.style.display = 'block';
        }
    });
});
