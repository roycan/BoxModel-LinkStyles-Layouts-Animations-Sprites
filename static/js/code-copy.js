document.addEventListener('DOMContentLoaded', function() {
    // Add copy buttons to all code previews
    document.querySelectorAll('.code-preview').forEach(codeBlock => {
        // Create container
        const container = document.createElement('div');
        container.className = 'code-preview-container';
        
        // Move code block into container
        codeBlock.parentNode.insertBefore(container, codeBlock);
        container.appendChild(codeBlock);
        
        // Add copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.textContent = 'Copy';
        container.appendChild(copyButton);
        
        // Add click handler
        copyButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(codeBlock.textContent);
                copyButton.textContent = 'Copied!';
                copyButton.classList.add('copied');
                
                setTimeout(() => {
                    copyButton.textContent = 'Copy';
                    copyButton.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text:', err);
                copyButton.textContent = 'Error';
                
                setTimeout(() => {
                    copyButton.textContent = 'Copy';
                }, 2000);
            }
        });
    });
});
