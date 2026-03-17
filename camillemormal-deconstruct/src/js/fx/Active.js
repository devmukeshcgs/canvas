export default class Active {
    constructor() {
        this.page = ["ho", "ab"];
    }

    intro() {
        this.nav = R.G.class("nav-a");
        this.up();
    }

    up() {
        const t = _A;
        const oldPage = t.route.old.page;
        if (oldPage) this.upC(oldPage, "remove");
        const nextPage = t.route.new.page;
        this.upC(nextPage, "add");
    }

    upC(page, action) {
        const idx = this.page.indexOf(page);
        if (-1 < idx) {
            R.PE[action === "add" ? "none" : "all"](this.nav[idx]);
            this.nav[idx].classList[action]("on");
        }
    }
}

