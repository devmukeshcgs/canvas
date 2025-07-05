import Fx from "./Fx";

class Mutation {
    constructor() {
        this.mutationFx = new Fx
    }
    out() {
        let appState = _A;
        var t = appState.is
            , i = appState.was;
        this.hToW = i.ho && t.wo,
            this.wToW = i.wo && t.wo,
            this.hToA = i.ho && t.ab,
            appState.engine.off(),
            (t.ho || t.ab) && appState.engine.nav.active.up(),
            this.hToW || this.wToW || this.hToA ? (this.wToW && appState.engine.wo.fxBack.hide({
                mutation: !0,
                delay: 0
            }).play(),
                appState.page.update()) : (i.wo && appState.engine.wo.fxBack.hide({
                    mutation: !0,
                    delay: 0
                }).play(),
                    this.mutationFx.fadeOut({
                        cb: t => {
                            appState.page.update()
                        }
                    }))
    }
    in() {
        var appState = _A;
        this.hToW || this.wToW || this.hToA ? (appState.page.insertNew(),
            appState.engine.init(),
            this.mutationFx.tr()) : (appState.page.removeOld(),
                appState.page.insertNew(),
                appState.engine.init(),
                this.mutationFx.fadeIn())
    }
}
export default Mutation;