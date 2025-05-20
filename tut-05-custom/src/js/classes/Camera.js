import { create, perspective, identity, translateFn, invert } from "../util/fun";

 
export default class Camera {
    constructor() {
        this.near = 1,
        this.far = 2e3,
        this.fov = 45,
        this.aspect = 1,
        this.projectionMatrix = create(),
        this.matrixCamera = create()
    }
    resize(t) {
        t && (this.aspect = t.aspect);
        var t = Math.PI
          , e = this.fov * (t / 180)
          , e = (this.projectionMatrix = perspective(this.projectionMatrix, e, this.aspect, this.near, this.far),
        _A.winSemi);
        this.posOrigin = {
            x: e.w,
            y: -e.h,
            z: e.h / Math.tan(t * this.fov / 360)
        },
        _A.rgl.uProjectionMatrix(this.projectionMatrix)
    }
    render(t) {
        return this.matrixCamera = identity(this.matrixCamera),
        this.matrixCamera = translateFn(this.matrixCamera, [this.posOrigin.x + t.x, this.posOrigin.y + t.y, this.posOrigin.z + t.z]),
        invert(this.matrixCamera, this.matrixCamera)
    }
}