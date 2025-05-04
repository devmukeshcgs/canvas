console.log("ScrollIntersectionObserver");
//ScrollIntersectionObserver
class ScrollIntersectionObserver {
    constructor() {
        const app = _A;

        // Initialize properties
        this.arr = [];
        this.arrL = 0;
        this.notRequired = app.is.ho;

        // If not required, exit initialization
        if (this.notRequired) return;

        this.isWork = app.is.wo;
        const isAbout = app.is.ab;
        const currentPage = R.G.class("page");
        const pageContent = currentPage[currentPage.length - 1].children;

        // Determine elements to track based on context
        const elements = isAbout ? pageContent[0].children : pageContent;
        this.processElements(elements);
        this.resize();
    }

    processElements(elements) {
        for (const element of elements) {
            if (element.classList.contains("w-s")) {
                for (const child of element.children) {
                    this.addElement(child);
                }
            } else if (!element.classList.contains("_ns")) {
                this.addElement(element);
            }
        }
    }

    addElement(dom) {
        this.arr[this.arrL++] = {
            dom,
            inside: {},
        };
    }

    resize() {
        if (this.notRequired) return;

        const app = _A;
        const scrollKey = this.isWork ? "step" : "curr";
        const scrollOffset = R.R(app.e.s._[this.url][scrollKey]);
        const windowHeight = app.win.h;

        for (const item of this.arr) {
            this.calculateBounds(item, -scrollOffset, windowHeight);
        }
        this.run();
    }

    calculateBounds(item, offset, windowHeight) {
        this.draw(item, offset);

        const elementTop = item.dom.getBoundingClientRect().top - offset - windowHeight;
        const elementHeight = item.dom.offsetHeight;
        const endPosition = elementTop + elementHeight + windowHeight;

        item.inside.start = elementTop;
        item.inside.end = endPosition + Math.max(elementTop, 0);
        item.isOut = false;
    }

    run() {
        if (this.notRequired) return;

        const app = _A;
        const scrollKey = this.isWork ? "step" : "curr";
        const scrollPosition = R.R(app.e.s._[this.url][scrollKey]);

        for (const item of this.arr) {
            const { start, end } = item.inside;
            const isWithinBounds = scrollPosition > start && scrollPosition <= end;

            if (isWithinBounds) {
                if (item.isOut) item.isOut = false;
                this.draw(item, scrollPosition);
            } else if (!item.isOut) {
                item.isOut = true;
                this.draw(item, scrollPosition);
            }
        }
    }

    draw(item, scrollPosition) {
        R.T(item.dom, 0, R.R(-scrollPosition), "px");
    }
}

export default ScrollIntersectionObserver; 