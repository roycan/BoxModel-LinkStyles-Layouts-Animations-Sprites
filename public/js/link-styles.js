document.addEventListener('DOMContentLoaded', function() {
    // Add click prevention for demo links
    document.querySelectorAll('.demo-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
});
