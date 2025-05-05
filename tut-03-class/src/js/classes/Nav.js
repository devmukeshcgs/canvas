import Active from "./Active"
import Fx$3 from "./FxS3"

export default class Nav {
    constructor() {
        this.active = new Active,
        this.fx = new Fx$3
    }
    intro() {
        this.active.intro(),
        this.fx.intro()
    }
}