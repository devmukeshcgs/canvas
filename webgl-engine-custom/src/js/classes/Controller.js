import parseData from "../parseData";
import Win from "./Win";
import Rotate from "./Rotate";
import { Router } from "./router";

export default class Controller {
  constructor(config) {

    const appState = _A;

    if (!appState.is[404]) {
      appState.mutating = true;
      appState.page = {};
      appState.fromBack = false;

      this.transitionM = config.transition.mutation;
      this.device = config.device;

      R.BM(this, ["eD"]);

      new Win(this.device);
      if (this.device === "m") new Rotate();

      appState.engine = new config.engine();

      this.onPopstate();
      R.L(document.body, "a", "click", this.eD);

      new config.transition.intro(config => {
        this.intro(config);
      });
    }
  }

  onPopstate() {
    const doc = document;
    let isComplete = doc.readyState === "complete";
    let isLoading = !isComplete;

    onload = () => {
      setTimeout(() => {
        isLoading = false;
      }, 0);
    };

    onpopstate = event => {
      if (isLoading && doc.readyState === "complete") {
        R.PD(event);
        event.stopImmediatePropagation();
      }

      const appState = _A;
      if (!R.Is.und(appState.config.routes)) {
        if (appState.mutating) {
          this.hPS();
        } else {
          appState.mutating = true;
          this.out(location.pathname, "back");
        }
      }
    };
  }

  eD(event) {
    // console.log("Event", event);

    const appState = _A;
    let target = event.target;
    let isAnchor = false;
    let isSubmit = false;

    while (target) {
      const tagName = target.tagName;

      if (tagName === "A") {
        isAnchor = true;
        break;
      }

      if ((tagName === "INPUT" || tagName === "BUTTON") && target.type === "submit") {
        isSubmit = true;
        break;
      }

      target = target.parentNode;
    }

    if (isAnchor) {
      const href = target.href;
      const hrefPrefix = href.substring(0, 3);

      if (!target.hasAttribute("target") && !["mai", "tel"].includes(hrefPrefix)) {
        R.PD(event);

        if (!appState.mutating) {
          const newUrl = href.replace(/^.*\/\/[^/]+/, "");
          if (newUrl !== appState.route.new.url) {
            appState.mutating = true;
            this.out(newUrl, target);
          } else if (target.id === "nav-logo") {
            location.href = "/";
          }
        }
      }
    } else if (isSubmit) {
      R.PD(event);
    }
  }

  intro(callback) {
    console.log("Controller intro()");
    const appState = _A;
    R.Fetch({
      url: `${appState.route.new.url}?webp=${appState.webp}&device=${this.device}`,
      type: "html",
      success: response => {
        const parsedData = parseData;
        appState.config.routes = parsedData.routes;
        appState.data = parsedData.data;
        this.cache = parsedData.cache;

        this.add(document.body, "afterbegin", parsedData.body);

        this.main = R.G.id("main");
        // this.transitionM = new this.transitionM();

        callback();
      }
    });
  }

  out(url, target) {
    Router(url);

    const appState = _A;
    appState.target = target;
    appState.fromBack = target === "back";

    appState.page.update = () => {
      this.in();
    };

    this.transitionM.out();
  }

  in() {
    console.log("Controller in()");

    const appState = _A;
    const cachedData = this.cache[appState.route.new.url];
    console.log("cachedData", cachedData);

    document.title = cachedData.title;

    if (appState.target !== "back") {
      this.hPS();
    }

    appState.page.insertNew = () => {
      this.add(this.main, "beforeend", cachedData.html);
    };

    appState.page.removeOld = () => {
      const firstChild = this.main.children[0];
      firstChild.parentNode.removeChild(firstChild);
    };

    this.transitionM.in();
  }

  add(element, position, content) {
    element.insertAdjacentHTML(position, content);
  }

  hPS() {
    const newUrl = _A.route.new.url;
    history.pushState({ page: newUrl }, "", newUrl);
  }
}
