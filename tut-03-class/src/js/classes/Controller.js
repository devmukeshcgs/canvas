class Controller {
  constructor(config) {
    this.config = config;
    this.deviceType = config.device;
    this.transitionM = config.transitionM;
    this.cache = {};
    this.mainElement = null;
    this.targetElement = null;
    this.isFromBackNavigation = false;
    this.isMutating = false;
    this.currentRoute = {
      new: {
        url: "",
        page: "",
      },
    };
  }

  initialize() {
    // Set up event listeners
    window.addEventListener("popstate", this.handlePopState.bind(this));
    document.body.addEventListener("click", this.handleClick.bind(this));
  }

  handlePopState(event) {
    // Handle browser back/forward navigation
    if (event.state) {
      this.currentRoute.new.url = event.state.url;
      this.isFromBackNavigation = true;
      this.navigateToNewContent();
    }
  }

  handleClick(event) {
    // Handle click events for navigation
    let targetElement = event.target;
    let isAnchorElement = false;
    let isSubmitElement = false;

    // Traverse up the DOM to find the relevant element
    while (targetElement !== document.body) {
      const elementTagName = targetElement.tagName;

      if (elementTagName === "A") {
        isAnchorElement = true;
        break;
      }

      if (
        (elementTagName === "INPUT" || elementTagName === "BUTTON") &&
        targetElement.type === "submit"
      ) {
        isSubmitElement = true;
        break;
      }

      targetElement = targetElement.parentNode;
    }

    if (isAnchorElement) {
      this.handleAnchorClick(event, targetElement);
    } else if (isSubmitElement) {
      event.preventDefault();
    }
  }

  handleAnchorClick(event, anchorElement) {
    const href = anchorElement.href;
    const protocol = href.substring(0, 3);

    // Skip processing for special links
    if (
      anchorElement.hasAttribute("target") ||
      protocol === "mai" ||
      protocol === "tel"
    ) {
      return;
    }

    event.preventDefault();

    if (!this.isMutating) {
      const path = this.getPathFromUrl(href);

      if (path !== this.currentRoute.new.url) {
        this.isMutating = true;
        this.prepareContentTransition(path, anchorElement);
      } else if (anchorElement.id === "nav-logo") {
        window.location.href = "/";
      }
    }
  }

  getPathFromUrl(url) {
    return url.replace(/^.*\/\/[^/]+/, "");
  }

  loadInitialContent(callback) {
    const app = _A; // Global app instance
    console.log("========", data);

    R.Fetch({
      url: `${app.route.new.url}?webp=${app.webp}&device=${this.deviceType}`,
      type: "html",
      success: (response) => {
        const { routes, data, cache } = JSON.parse(response);
        console.log("========", data);

        // Update app configuration
        app.config.routes = routes;
        app.data = data;
        this.cache = cache;

        // Insert new content
        this.insertContent(document.body, "afterbegin", data.body);
        this.mainElement = R.G.id("main");
        this.transitionM = new this.transitionM();

        if (callback) callback();
      },
    });
  }

  prepareContentTransition(path, targetElement) {
    this.updateRoute(path);
    const app = _A;
    this.targetElement = targetElement;
    this.isFromBackNavigation = targetElement === "back";

    app.page.update = () => {
      this.navigateToNewContent();
    };
  }

  navigateToNewContent() {
    const app = _A;
    const transition = this.transitionM;

    // Handle navigation transition
    if (this.isFromBackNavigation) {
      this.isFromBackNavigation = false;
      transition.in();
    } else {
      transition.in();
    }

    // Update page state
    this.isMutating = false;
    app.page = {};
  }

  insertContent(parentElement, position, htmlContent) {
    // Insert HTML content into the DOM
    parentElement.insertAdjacentHTML(position, htmlContent);
  }

  updateRoute(path) {
    const app = _A;
    this.currentRoute.new.url = path;
    this.updateHistoryState();
  }

  updateHistoryState() {
    const path = this.currentRoute.new.url;
    history.pushState(
      {
        page: path,
      },
      "",
      path
    );
  }
}
export default Controller;
