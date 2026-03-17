import Active from "../Active.js";
import NavFx from "./NavFx.js";

export default class Nav {
    constructor() {
        this.active = new Active();
        this.fx = new NavFx();
    }

    intro() {
        this.active.intro();
        this.fx.intro();
    }
}

