console.log("LazyLoader");

class LazyLoader {
    constructor() {
        this.isNotRequired = false;
        this.currentUrl = null;
        this.images = [];
        this.imageInstances = [];
        this.lazyLoadLength = 0;
    }

    initialize() {
        const appState = _A;

        // Determine if lazy loading is required
        this.isNotRequired = !appState.is.wo;
        if (this.isNotRequired) return;

        // Set URL and initialize images
        this.currentUrl = appState.route.new.url;
        this.images = [];
        this.imageInstances = [];

        // Get all lazy-load elements
        const pages = Renderer.getClassElements("page");
        const lastPage = pages[pages.length - 1];
        const lazyElements = Renderer.getClassElements("_lz", lastPage);
        this.lazyLoadLength = lazyElements.length;

        // Populate image data
        lazyElements.forEach((element, index) => {
            this.images[index] = {
                src: element.dataset.src,
                dom: element,
                decode: false,
                show: false,
            };
        });

        this.calculateImageLimits();
    }

    calculateImageLimits() {
        if (this.isNotRequired) return;

        const appState = _A;
        const currentStep = appState.e.s._[this.currentUrl].step;
        const windowHeight = appState.win.h;

        this.images.forEach((image, index) => {
            const domElement = image.dom;
            if (Renderer.isDefined(domElement)) {
                const topPosition = domElement.getBoundingClientRect().top + currentStep;
                this.images[index].limit = {
                    decode: Math.max(topPosition - 2 * windowHeight, 0),
                    show: Math.max(topPosition - 0.8 * windowHeight, 0),
                };
            }
        });
    }

    updateLoop() {
        if (this.isNotRequired) return;

        const currentStep = _A.e.s._[this.currentUrl].step;

        this.images.forEach((image, index) => {
            // Decode image if within decoding range
            if (currentStep > image.limit.decode && !image.decode) {
                this.images[index].decode = true;
                this.decodeImage(index);
            }

            // Show image if within display range
            if (currentStep > image.limit.show && !image.show) {
                this.images[index].show = true;
                this.displayImage(index);
            }
        });
    }

    displayImage(index) {
        const domElement = this.images[index].dom;
        if (Renderer.isDefined(domElement)) {
            domElement.classList.add("fx");
        }
    }

    decodeImage(index) {
        const imageElement = this.images[index].dom;
        const imageUrl = this.images[index].src;

        // Create a new Image instance to handle decoding
        this.imageInstances[index] = new Image();
        this.imageInstances[index].src = imageUrl;

        // Decode the image and update DOM when successful
        this.imageInstances[index].decode().then(() => {
            if (Renderer.isDefined(imageElement)) {
                imageElement.src = imageUrl;
                delete imageElement.dataset.src;
            }
        });
    }

    clearResources() {
        if (this.isNotRequired) return;

        // Clear loaded images
        this.imageInstances.forEach((imageInstance, index) => {
            if (Renderer.isDefined(imageInstance)) {
                imageInstance.src = "data:,";
            }
        });
    }
}
export default LazyLoader