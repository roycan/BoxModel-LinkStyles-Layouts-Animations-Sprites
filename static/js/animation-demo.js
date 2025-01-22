document.addEventListener('DOMContentLoaded', function() {
    const animationType = document.getElementById('animation-type');
    const animationDuration = document.getElementById('animation-duration');
    const timingFunction = document.getElementById('timing-function');
    const playButton = document.getElementById('play-animation');
    const animatedElement = document.querySelector('.animated-element');
    const animationCode = document.getElementById('animation-code');

    function updateAnimation() {
        const type = animationType.value;
        const duration = animationDuration.value;
        const timing = timingFunction.value;

        // Remove any existing animation
        animatedElement.style.animation = 'none';
        // Trigger reflow
        void animatedElement.offsetWidth;

        // Apply new animation
        const animationCSS = `${type} ${duration}s ${timing} infinite`;
        animatedElement.style.animation = animationCSS;

        // Update code preview
        animationCode.textContent = `.animated-element {
    animation: ${animationCSS};
}

@keyframes ${type} {
${getKeyframesCode(type)}
}`;
    }

    function getKeyframesCode(type) {
        switch(type) {
            case 'rotate':
                return `    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }`;
            case 'scale':
                return `    0% { transform: scale(1); }
    50% { transform: scale(1.5); }
    100% { transform: scale(1); }`;
            case 'translate':
                return `    0% { transform: translateX(0); }
    50% { transform: translateX(100px); }
    100% { transform: translateX(0); }`;
            case 'color':
                return `    0% { background-color: var(--bs-primary); }
    50% { background-color: var(--bs-info); }
    100% { background-color: var(--bs-primary); }`;
        }
    }

    // Event listeners
    animationType.addEventListener('change', updateAnimation);
    animationDuration.addEventListener('input', updateAnimation);
    timingFunction.addEventListener('change', updateAnimation);
    playButton.addEventListener('click', updateAnimation);

    // Initial animation
    updateAnimation();
});
