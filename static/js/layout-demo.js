document.addEventListener('DOMContentLoaded', function() {
    // Flexbox Controls
    const flexDirection = document.getElementById('flex-direction');
    const justifyContent = document.getElementById('justify-content');
    const alignItems = document.getElementById('align-items');
    const flexboxDemo = document.querySelector('.flexbox-demo');
    const flexboxCode = document.getElementById('flexbox-code');

    function updateFlexbox() {
        const direction = flexDirection.value;
        const justify = justifyContent.value;
        const align = alignItems.value;

        flexboxDemo.style.flexDirection = direction;
        flexboxDemo.style.justifyContent = justify;
        flexboxDemo.style.alignItems = align;

        flexboxCode.textContent = `.flexbox-container {
    display: flex;
    flex-direction: ${direction};
    justify-content: ${justify};
    align-items: ${align};
}`;
    }

    flexDirection.addEventListener('change', updateFlexbox);
    justifyContent.addEventListener('change', updateFlexbox);
    alignItems.addEventListener('change', updateFlexbox);

    // Grid Controls
    const gridColumns = document.getElementById('grid-columns');
    const gridGap = document.getElementById('grid-gap');
    const gridDemo = document.querySelector('.grid-demo');
    const gridCode = document.getElementById('grid-code');

    function updateGrid() {
        const columns = gridColumns.value;
        const gap = `${gridGap.value}px`;

        gridDemo.style.gridTemplateColumns = columns;
        gridDemo.style.gap = gap;

        gridCode.textContent = `.grid-container {
    display: grid;
    grid-template-columns: ${columns};
    gap: ${gap};
}`;
    }

    gridColumns.addEventListener('change', updateGrid);
    gridGap.addEventListener('input', updateGrid);

    // Initial updates
    updateFlexbox();
    updateGrid();
});
