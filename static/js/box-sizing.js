document.addEventListener('DOMContentLoaded', function() {
    const widthRange = document.getElementById('width-range');
    const paddingRange = document.getElementById('sizing-padding-range');
    const borderRange = document.getElementById('sizing-border-range');
    const boxSizingCode = document.getElementById('box-sizing-code');
    
    function updateBoxSizing() {
        const width = widthRange.value;
        const padding = paddingRange.value;
        const border = borderRange.value;
        
        // Update content-box example
        const contentBox = document.querySelector('.demo-box.content-box');
        contentBox.style.width = `${width}px`;
        contentBox.style.padding = `${padding}px`;
        contentBox.style.borderWidth = `${border}px`;
        
        // Update border-box example
        const borderBox = document.querySelector('.demo-box.border-box');
        borderBox.style.width = `${width}px`;
        borderBox.style.padding = `${padding}px`;
        borderBox.style.borderWidth = `${border}px`;
        
        // Calculate and display total dimensions
        const contentBoxTotal = width + (padding * 2) + (border * 2);
        document.querySelector('.content-box-size').textContent = 
            `Total width: ${contentBoxTotal}px (content: ${width}px + padding: ${padding * 2}px + border: ${border * 2}px)`;
        
        document.querySelector('.border-box-size').textContent = 
            `Total width: ${width}px (fixed, includes padding and border)`;
        
        // Update code preview
        boxSizingCode.textContent = `.content-box {
    box-sizing: content-box;
    width: ${width}px;
    padding: ${padding}px;
    border: ${border}px solid var(--bs-primary);
}

.border-box {
    box-sizing: border-box;
    width: ${width}px;
    padding: ${padding}px;
    border: ${border}px solid var(--bs-primary);
}`;
    }
    
    widthRange.addEventListener('input', updateBoxSizing);
    paddingRange.addEventListener('input', updateBoxSizing);
    borderRange.addEventListener('input', updateBoxSizing);
    
    // Initial update
    updateBoxSizing();
});
