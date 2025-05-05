import Fx from "./Fx";

class Mutation {
    constructor() {
        this.mutationFx = new Fx
    }
    out() {
        let _STATE = _A;
        var t = _STATE.is
            , i = _STATE.was;
        this.hToW = i.ho && t.wo,
            this.wToW = i.wo && t.wo,
            this.hToA = i.ho && t.ab,
            _STATE.engine.off(),
            (t.ho || t.ab) && _STATE.engine.nav.active.up(),
            this.hToW || this.wToW || this.hToA ? (this.wToW && _STATE.engine.wo.fxBack.hide({
                mutation: !0,
                delay: 0
            }).play(),
                _STATE.page.update()) : (i.wo && _STATE.engine.wo.fxBack.hide({
                    mutation: !0,
                    delay: 0
                }).play(),
                    this.mutationFx.fadeOut({
                        cb: t => {
                            _STATE.page.update()
                        }
                    }))
    }
    in() {
        var _STATE = _A;
        this.hToW || this.wToW || this.hToA ? (_STATE.page.insertNew(),
            _STATE.engine.init(),
            this.mutationFx.tr()) : (_STATE.page.removeOld(),
                _STATE.page.insertNew(),
                _STATE.engine.init(),
                this.mutationFx.fadeIn())
    }
}
export default Mutation;