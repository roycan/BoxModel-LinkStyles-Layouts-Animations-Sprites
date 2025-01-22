document.addEventListener('DOMContentLoaded', function() {
    const propertyType = document.getElementById('property-type');
    const propertyControls = document.getElementById('property-controls');
    const previewElement = document.getElementById('preview-element');
    const propertyCode = document.getElementById('property-code');
    const challengeContainer = document.getElementById('challenge-container');

    // Property configurations with added challenges
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
            },
            challenges: [
                {
                    title: "Perfect Circle Challenge",
                    description: "Make the element a perfect circle by setting the right border radius",
                    goal: 50,
                    check: (values) => Math.abs(values.radius - 50) < 2,
                    hint: "For a square element, setting border-radius to 50% or 50px makes it circular"
                }
            ]
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
            },
            challenges: [
                {
                    title: "Floating Element Challenge",
                    description: "Create a floating effect by setting a subtle shadow below the element",
                    goal: { y: 5, blur: 10, spread: 0 },
                    check: (values) => (
                        values['y-offset'] >= 3 && 
                        values['y-offset'] <= 7 && 
                        values.blur >= 8 && 
                        values.blur <= 12
                    ),
                    hint: "Try a small positive Y offset with medium blur"
                }
            ]
        },
        'text-shadow': {
            controls: [
                { name: 'x-offset', type: 'range', min: -20, max: 20, value: 2, unit: 'px' },
                { name: 'y-offset', type: 'range', min: -20, max: 20, value: 2, unit: 'px' },
                { name: 'blur', type: 'range', min: 0, max: 20, value: 3, unit: 'px' }
            ],
            apply: (values) => {
                const shadow = `${values['x-offset']}px ${values['y-offset']}px ${values.blur}px rgba(0, 0, 0, 0.7)`;
                return {
                    style: { 
                        'text-shadow': shadow,
                        'color': 'var(--bs-light)'
                    },
                    code: `color: var(--bs-light);\ntext-shadow: ${shadow};`
                };
            },
            challenges: [
                {
                    title: "3D Text Effect",
                    description: "Create a 3D text effect using text-shadow",
                    goal: { x: 2, y: 2, blur: 3 },
                    check: (values) => (
                        values['x-offset'] >= 1 && 
                        values['x-offset'] <= 3 && 
                        values['y-offset'] >= 1 && 
                        values['y-offset'] <= 3
                    ),
                    hint: "Use small positive offsets for both X and Y"
                }
            ]
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
            },
            challenges: [
                {
                    title: "Diamond Shape Challenge",
                    description: "Create a diamond shape by rotating the square element",
                    goal: { rotate: 45, scale: 1 },
                    check: (values) => (
                        Math.abs(values.rotate - 45) < 5 && 
                        Math.abs(values.scale - 1) < 0.1
                    ),
                    hint: "Try rotating the element by 45 degrees"
                }
            ]
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
            },
            challenges: [
                {
                    title: "Ghost Effect Challenge",
                    description: "Create a ghost effect by setting the right opacity",
                    goal: 50,
                    check: (values) => Math.abs(values.opacity - 50) < 5,
                    hint: "Try setting opacity to around 50%"
                }
            ]
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
        input.dataset.name = config.name;
        if (config.step) input.step = config.step;

        const value = document.createElement('small');
        value.className = 'ms-2 text-muted';
        value.textContent = `${config.value}${config.unit}`;

        input.addEventListener('input', () => {
            value.textContent = `${input.value}${config.unit}`;
            updatePreview();
            checkChallenge();
        });

        div.appendChild(label);
        div.appendChild(input);
        div.appendChild(value);
        return div;
    }

    function updatePreview() {
        const currentProperty = properties[propertyType.value];
        const values = {};

        currentProperty.controls.forEach(control => {
            const input = propertyControls.querySelector(`input[data-name="${control.name}"]`);
            values[control.name] = parseFloat(input.value);
        });

        // Reset all properties first
        previewElement.style.transform = 'none';
        previewElement.style.boxShadow = 'none';
        previewElement.style.textShadow = 'none';
        previewElement.style.borderRadius = '0';
        previewElement.style.opacity = '1';
        previewElement.style.color = 'var(--bs-light)';

        // Apply the property
        const result = currentProperty.apply(values);

        // Update the preview element with new property
        Object.entries(result.style).forEach(([property, value]) => {
            previewElement.style[property] = value;
        });

        // Update the code preview
        propertyCode.textContent = `#element {
    ${result.code}
}`;
    }

    function updateChallenge() {
        const currentProperty = properties[propertyType.value];
        const challenge = currentProperty.challenges[0]; // Currently showing first challenge only

        challengeContainer.innerHTML = `
            <div class="alert alert-info">
                <h6 class="alert-heading">${challenge.title}</h6>
                <p class="mb-0">${challenge.description}</p>
                <button class="btn btn-sm btn-outline-info mt-2" onclick="showHint(this)" data-hint="${challenge.hint}">
                    Show Hint
                </button>
            </div>
        `;
    }

    function checkChallenge() {
        const currentProperty = properties[propertyType.value];
        const challenge = currentProperty.challenges[0];
        const values = {};

        currentProperty.controls.forEach(control => {
            const input = propertyControls.querySelector(`input[data-name="${control.name}"]`);
            values[control.name] = parseFloat(input.value);
        });

        if (challenge.check(values)) {
            challengeContainer.querySelector('.alert').classList.replace('alert-info', 'alert-success');
            challengeContainer.querySelector('p').innerHTML += '<br><strong>🎉 Challenge completed!</strong>';
        }
    }

    function updateControls() {
        propertyControls.innerHTML = '';
        const currentProperty = properties[propertyType.value];
        currentProperty.controls.forEach(control => {
            propertyControls.appendChild(createControl(control));
        });

        updatePreview();
        updateChallenge();
    }

    // Event listener for property type change
    propertyType.addEventListener('change', updateControls);

    // Initial setup
    updateControls();
});

// Global function for showing hints
window.showHint = function(button) {
    const hint = button.getAttribute('data-hint');
    button.textContent = hint;
    button.disabled = true;
};