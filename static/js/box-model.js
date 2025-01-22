document.addEventListener('DOMContentLoaded', function() {
    const marginRange = document.getElementById('margin-range');
    const paddingRange = document.getElementById('padding-range');
    const borderRange = document.getElementById('border-range');
    const codePreview = document.getElementById('box-model-code');

    function updateBoxModel() {
        const marginValue = marginRange.value;
        const paddingValue = paddingRange.value;
        const borderValue = borderRange.value;

        // Update visualization - make selectors more specific to target box model demo
        document.querySelector('#box-model-demo .margin-box').style.padding = `${marginValue}px`;
        document.querySelector('#box-model-demo .padding-box').style.padding = `${paddingValue}px`;
        document.querySelector('#box-model-demo .border-box').style.borderWidth = `${borderValue}px`;

        // Update code preview
        codePreview.textContent = `.example-element {
    margin: ${marginValue}px;
    padding: ${paddingValue}px;
    border: ${borderValue}px solid var(--bs-primary);
}`;
    }

    marginRange.addEventListener('input', updateBoxModel);
    paddingRange.addEventListener('input', updateBoxModel);
    borderRange.addEventListener('input', updateBoxModel);

    // Initial update
    updateBoxModel();
});