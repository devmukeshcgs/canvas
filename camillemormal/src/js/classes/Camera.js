class Camera {
    constructor() {
        this.near = 1;
        this.far = 2000;
        this.fov = 45; // Field of view in degrees
        this.aspect = 1; // Aspect ratio
        this.projectionMatrix = create(); // Projection matrix
        this.cameraMatrix = create(); // Camera transformation matrix
    }

    /**
     * Resizes the camera based on the given parameters.
     * @param {Object} config - Configuration object with an `aspect` property.
     */
    resize(config) {
        if (config) {
            this.aspect = config.aspect;
        }

        const radianFactor = Math.PI / 180; // Conversion factor from degrees to radians
        const fovRadians = this.fov * radianFactor;

        // Update the projection matrix
        this.projectionMatrix = perspective(this.projectionMatrix, fovRadians, this.aspect, this.near, this.far);

        // Calculate the camera's origin position
        const windowSemi = _A.winSemi;
        this.posOrigin = {
            x: windowSemi.w,
            y: -windowSemi.h,
            z: windowSemi.h / Math.tan(fovRadians / 2)
        };

        // Update the global projection matrix
        _A.rgl.uProjectionMatrix(this.projectionMatrix);
    }

    /**
     * Updates the camera's render matrix based on the given position offset.
     * @param {Object} position - Object with `x`, `y`, and `z` offsets.
     * @returns {Matrix} - The updated camera matrix.
     */
    render(position) {
        // Reset the camera matrix to identity
        this.cameraMatrix = identity(this.cameraMatrix);

        // Apply translation based on the origin position and input offsets
        this.cameraMatrix = translateFn(this.cameraMatrix, [
            this.posOrigin.x + position.x,
            this.posOrigin.y + position.y,
            this.posOrigin.z + position.z
        ]);

        // Invert the matrix to get the camera view matrix
        return invert(this.cameraMatrix, this.cameraMatrix);
    }
}
export default Camera