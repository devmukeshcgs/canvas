import Fx from "./Fx";

class Mutation {
    constructor() {
        this.mutationFx = new Fx
    }
    out() {
        let e = _A;
        var t = e.is
          , i = e.was;
        this.hToW = i.ho && t.wo,
        this.wToW = i.wo && t.wo,
        this.hToA = i.ho && t.ab,
        e.e.off(),
        (t.ho || t.ab) && e.e.nav.active.up(),
        this.hToW || this.wToW || this.hToA ? (this.wToW && e.e.wo.fxBack.hide({
            mutation: !0,
            delay: 0
        }).play(),
        e.page.update()) : (i.wo && e.e.wo.fxBack.hide({
            mutation: !0,
            delay: 0
        }).play(),
        this.mutationFx.fadeOut({
            cb: t => {
                e.page.update()
            }
        }))
    }
    in() {
        var t = _A;
        this.hToW || this.wToW || this.hToA ? (t.page.insertNew(),
        t.e.init(),
        this.mutationFx.tr()) : (t.page.removeOld(),
        t.page.insertNew(),
        t.e.init(),
        this.mutationFx.fadeIn())
    }
}
export default Mutation;