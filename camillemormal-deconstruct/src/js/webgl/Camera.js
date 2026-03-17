import { create, identity, invert, perspective, translateFn } from "./math/mat4.js";

export default class Camera {
    constructor() {
        this.near = 1;
        this.far = 2000;
        this.fov = 45;
        this.aspect = 1;
        this.projectionMatrix = create();
        this.matrixCamera = create();
    }

    resize(t) {
        if (t) this.aspect = t.aspect;

        const PI = Math.PI;
        const fovRadians = this.fov * (PI / 180);
        this.projectionMatrix = perspective(this.projectionMatrix, fovRadians, this.aspect, this.near, this.far);

        const semi = _A.winSemi;
        this.posOrigin = {
            x: semi.w,
            y: -semi.h,
            z: semi.h / Math.tan((PI * this.fov) / 360),
        };

        _A.rgl.uProjectionMatrix(this.projectionMatrix);
    }

    render(t) {
        this.matrixCamera = identity(this.matrixCamera);
        this.matrixCamera = translateFn(this.matrixCamera, [
            this.posOrigin.x + t.x,
            this.posOrigin.y + t.y,
            this.posOrigin.z + t.z,
        ]);

        return invert(this.matrixCamera, this.matrixCamera);
    }
}

