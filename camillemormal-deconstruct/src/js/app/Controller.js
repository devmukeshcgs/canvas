import parseData from "../parseData.js";
import Router from "./Router.js";
import Win from "./Win.js";
import Rotate from "./Rotate.js";

export default class Controller {
    constructor(t) {
        const app = _A;
        if (app.is[404]) return;

        app.mutating = true;
        app.page = {};
        app.fromBack = false;

        this.transitionM = t.transition.mutation;
        this.device = t.device;

        R.BM(this, ["eD"]);

        new Win(this.device);
        if (this.device === "m") new Rotate();

        app.e = new t.engine();
        this.onPopstate();
        R.L(document.body, "a", "click", this.eD);

        new t.transition.intro((cb) => this.intro(cb));
    }

    onPopstate() {
        const doc = document;
        const readyComplete = "complete";
        let blocking = doc.readyState !== readyComplete;

        onload = () => {
            setTimeout(() => {
                blocking = false;
            }, 0);
        };

        onpopstate = (ev) => {
            if (blocking && doc.readyState === readyComplete) {
                R.PD(ev);
                ev.stopImmediatePropagation();
            }

            const app = _A;
            if (R.Is.und(app.config.routes)) return;

            if (app.mutating) this.hPS();
            else {
                app.mutating = true;
                this.out(location.pathname, "back");
            }
        };
    }

    eD(ev) {
        const app = _A;
        // If the user was dragging to scroll, ignore click navigation.
        if (app.e?.s?.isDragging) {
            R.PD(ev);
            return;
        }
        let el = ev.target;
        let isA = false;
        let isSubmit = false;

        for (; el; ) {
            const tag = el.tagName;
            if (tag === "A") {
                isA = true;
                break;
            }
            if ((tag === "INPUT" || tag === "BUTTON") && el.type === "submit") {
                isSubmit = true;
                break;
            }
            el = el.parentNode;
        }

        if (isA) {
            const href = el.href;
            const proto = href.substring(0, 3);
            if (el.hasAttribute("target") || proto === "mai" || proto === "tel") return;

            R.PD(ev);
            if (app.mutating) return;

            const path = href.replace(/^.*\/\/[^/]+/, "");
            if (path !== app.route.new.url) {
                app.mutating = true;
                this.out(path, el);
            } else if (el.id === "nav-logo") {
                location.href = "/";
            }
        } else if (isSubmit) {
            R.PD(ev);
        }
    }

    intro(done) {
        const app = _A;
        R.Fetch({
            url: app.route.new.url + "?webp=" + app.webp + "&device=" + this.device,
            type: "html",
            success: () => {
                // original fetch response would be parsed; we use local cache payload
                const t = parseData;
                app.config.routes = t.routes;
                app.data = t.data;
                this.cache = t.cache;
                this.add(document.body, "afterbegin", t.body);
                this.main = R.G.id("main");
                this.transitionM = new this.transitionM();
                done();
            },
        });
    }

    out(url, target) {
        Router(url);
        const app = _A;
        app.target = target;
        app.fromBack = target === "back";
        app.page.update = () => this.in();
        this.transitionM.out();
    }

    in() {
        const app = _A;
        const next = this.cache[app.route.new.url];
        document.title = next.title;
        if (app.target !== "back") this.hPS();

        app.page.insertNew = () => {
            this.add(this.main, "beforeend", next.html);
        };
        app.page.removeOld = () => {
            // Some routes (e.g. `/about`) insert multiple root nodes into `#main`.
            // Clear everything to avoid leaving orphan siblings like `#a-l-w` / `#a-lp`.
            for (; this.main.firstChild; ) this.main.removeChild(this.main.firstChild);
        };

        this.transitionM.in();
    }

    add(el, where, html) {
        el.insertAdjacentHTML(where, html);
    }

    hPS() {
        const url = _A.route.new.url;
        history.pushState({ page: url }, "", url);
    }
}

