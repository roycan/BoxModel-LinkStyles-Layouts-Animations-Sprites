document.addEventListener('DOMContentLoaded', function() {
    const propertyType = document.getElementById('property-type');
    const propertyControls = document.getElementById('property-controls');
    const previewElement = document.getElementById('preview-element');
    const propertyCode = document.getElementById('property-code');

    // Property configurations
    const properties = {
        'border-radius': {
            controls: [
                { name: 'radius', type: 'range', min: 0, max: 50, value: 8, unit: 'px' }
            ],
            apply: (values) => {
                const radius = `${values.radius}px`;
                return {
                    style: { 'border-radius': radius },
                    code: `border-radius: ${radius};`
                };
            }
        },
        'box-shadow': {
            controls: [
                { name: 'x-offset', type: 'range', min: -50, max: 50, value: 5, unit: 'px' },
                { name: 'y-offset', type: 'range', min: -50, max: 50, value: 5, unit: 'px' },
                { name: 'blur', type: 'range', min: 0, max: 50, value: 10, unit: 'px' },
                { name: 'spread', type: 'range', min: -20, max: 50, value: 0, unit: 'px' }
            ],
            apply: (values) => {
                const shadow = `${values['x-offset']}px ${values['y-offset']}px ${values.blur}px ${values.spread}px rgba(var(--bs-primary-rgb), 0.5)`;
                return {
                    style: { 'box-shadow': shadow },
                    code: `box-shadow: ${shadow};`
                };
            }
        },
        'text-shadow': {
            controls: [
                { name: 'x-offset', type: 'range', min: -20, max: 20, value: 2, unit: 'px' },
                { name: 'y-offset', type: 'range', min: -20, max: 20, value: 2, unit: 'px' },
                { name: 'blur', type: 'range', min: 0, max: 20, value: 3, unit: 'px' }
            ],
            apply: (values) => {
                const shadow = `${values['x-offset']}px ${values['y-offset']}px ${values.blur}px rgba(var(--bs-primary-rgb), 0.5)`;
                return {
                    style: { 'text-shadow': shadow },
                    code: `text-shadow: ${shadow};`
                };
            }
        },
        'transform': {
            controls: [
                { name: 'rotate', type: 'range', min: -180, max: 180, value: 0, unit: 'deg' },
                { name: 'scale', type: 'range', min: 0.5, max: 2, value: 1, unit: '', step: 0.1 },
                { name: 'translate-x', type: 'range', min: -50, max: 50, value: 0, unit: 'px' },
                { name: 'translate-y', type: 'range', min: -50, max: 50, value: 0, unit: 'px' }
            ],
            apply: (values) => {
                const transform = `rotate(${values.rotate}deg) scale(${values.scale}) translate(${values['translate-x']}px, ${values['translate-y']}px)`;
                return {
                    style: { 'transform': transform },
                    code: `transform: ${transform};`
                };
            }
        },
        'opacity': {
            controls: [
                { name: 'opacity', type: 'range', min: 0, max: 100, value: 100, unit: '%' }
            ],
            apply: (values) => {
                const opacity = values.opacity / 100;
                return {
                    style: { 'opacity': opacity },
                    code: `opacity: ${opacity};`
                };
            }
        }
    };

    function createControl(config) {
        const div = document.createElement('div');
        div.className = 'mb-3';

        const label = document.createElement('label');
        label.className = 'form-label';
        label.textContent = config.name.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');

        const input = document.createElement('input');
        input.type = config.type;
        input.className = 'form-range';
        input.min = config.min;
        input.max = config.max;
        input.value = config.value;
        input.dataset.name = config.name;  // Add data attribute for identification
        if (config.step) input.step = config.step;

        const value = document.createElement('small');
        value.className = 'ms-2 text-muted';
        value.textContent = `${config.value}${config.unit}`;

        input.addEventListener('input', () => {
            value.textContent = `${input.value}${config.unit}`;
            updatePreview();
        });

        div.appendChild(label);
        div.appendChild(input);
        div.appendChild(value);
        return div;
    }

    function updatePreview() {
        const currentProperty = properties[propertyType.value];
        const values = {};

        // Collect all control values using data-name attribute
        currentProperty.controls.forEach(control => {
            const input = propertyControls.querySelector(`input[data-name="${control.name}"]`);
            values[control.name] = parseFloat(input.value);
        });

        // Apply the property
        const result = currentProperty.apply(values);

        // Reset all properties first
        previewElement.style.transform = 'none';
        previewElement.style.boxShadow = 'none';
        previewElement.style.textShadow = 'none';
        previewElement.style.borderRadius = '0';
        previewElement.style.opacity = '1';

        // Update the preview element with new property
        Object.entries(result.style).forEach(([property, value]) => {
            previewElement.style[property] = value;
        });

        // Update the code preview
        propertyCode.textContent = `#element {
    ${result.code}
}`;
    }

    function updateControls() {
        // Clear existing controls
        propertyControls.innerHTML = '';

        // Add new controls
        const currentProperty = properties[propertyType.value];
        currentProperty.controls.forEach(control => {
            propertyControls.appendChild(createControl(control));
        });

        // Update the preview
        updatePreview();
    }

    propertyType.addEventListener('change', updateControls);

    // Initial setup
    updateControls();
});