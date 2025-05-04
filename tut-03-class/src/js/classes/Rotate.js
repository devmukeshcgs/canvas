class Rotate {
    constructor() {
        this.isInDOM = false;
        
        // Bind methods
        R.BM(this, ["resize"]);
        
        // Setup resize observer
        new R.ROR(this.resize).on();
        
        // Initial check
        this.resize();
    }

    resize() {
        const isLandscape = _A.winRatio.widthToHeight > 1;
        
        if (isLandscape && !this.isInDOM) {
            this.addRotationMessage();
        } else if (!isLandscape && this.isInDOM) {
            this.removeRotationMessage();
        }
    }

    addRotationMessage() {
        // Create wrapper div
        this.rotationMessageWrapper = document.createElement("div");
        this.rotationMessageWrapper.className = "rotation-message-wrapper";
        
        // Create message div
        const messageElement = document.createElement("div");
        messageElement.className = "rotation-message";
        messageElement.textContent = "Please rotate your device.";
        
        // Append elements
        this.rotationMessageWrapper.appendChild(messageElement);
        document.body.prepend(this.rotationMessageWrapper);
        
        this.isInDOM = true;
    }

    removeRotationMessage() {
        if (this.rotationMessageWrapper && this.rotationMessageWrapper.parentNode) {
            this.rotationMessageWrapper.parentNode.removeChild(this.rotationMessageWrapper);
        }
        this.isInDOM = false;
    }
}