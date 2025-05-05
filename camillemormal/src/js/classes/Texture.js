class Texture {
  constructor(glContext) {
    this.gl = glContext; // WebGL context
    this.textures = {}; // Stores textures
  }

  /**
   * Starts loading textures based on provided configurations.
   * @param {Function} callback - Function to be called when loading completes.
   */
  run(callback) {
    const appState = _A;
    this.callback = callback;
    const newRoute = appState.route.new.url;
    const resources = appState.data;
    const resourceKeys = Object.keys(resources);
    const resourceCount = resourceKeys.length;

    this.loadingIndicator = R.G.id("load-no").children[0];
    this.loadedCount = 0;
    this.previousLoadedCount = 0;

    R.BM(this, ["updateProgress"]);
    this.rafHandler = new R.RafR(this.updateProgress);

    for (let i = 0; i < resourceCount; i++) {
      const resourceKey = resourceKeys[i];
      const resourceData = resources[resourceKey];

      if (!resourceData.preload && newRoute !== resourceKey) continue;

      this.loadTexture({
        media: resourceData,
        url: resourceKey,
        useGL: true,
        external: false,
      });
    }

    this.rafHandler.run();
  }

  /**
   * Loads a texture from the provided configuration.
   * @param {Object} config - Texture configuration.
   */
  loadTexture(config) {
    const fileExtension = config.external ? "" : _A.img.jpg;
    const resourceUrl = config.url;
    const useGL = config.useGL;
    const mediaData = config.media;

    if (useGL) {
      this.textures[resourceUrl] = [];
    }

    for (let i = 0; i < mediaData.texL; i++) {
      this.loadSingleTexture({
        src: mediaData.tex[i] + fileExtension,
        index: i,
        url: resourceUrl,
        useGL: useGL,
      });
      this.totalTextures = (this.totalTextures || 0) + 1;
    }
  }

  /**
   * Loads an individual texture and initializes it if needed.
   * @param {Object} config - Configuration for a single texture.
   */
  loadSingleTexture(config) {
    const img = new Image();
    img.onload = () => {
      if (config.useGL) {
        const textureAttributes = this.initializeTexture(img);
        this.textures[config.url][config.index] = {
          attrib: textureAttributes,
          element: img,
          type: "img",
        };
      }
      this.loadedCount++;
    };
    img.src = config.src;
  }

  /**
   * Initializes a texture in WebGL.
   * @param {HTMLImageElement} img - Image to be used for the texture.
   * @returns {WebGLTexture} - The initialized WebGL texture.
   */
  initializeTexture(img) {
    const gl = this.gl;
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

    const parameters = [
      ["WRAP_S", "CLAMP_TO_EDGE"],
      ["WRAP_T", "CLAMP_TO_EDGE"],
      ["MIN_FILTER", "LINEAR"],
      ["MAG_FILTER", "LINEAR"],
    ];

    for (const [param, value] of parameters) {
      gl.texParameteri(gl.TEXTURE_2D, gl[`TEXTURE_${param}`], gl[value]);
    }

    return texture;
  }

  /**
   * Updates the loading progress and triggers the callback when complete.
   */
  updateProgress() {
    if (this.loadedCount !== this.previousLoadedCount) {
      this.previousLoadedCount = this.loadedCount;
      this.loadingIndicator.textContent = `${Math.round(
        (100 / this.totalTextures) * this.loadedCount
      )}%`;
    }

    if (this.loadedCount === this.totalTextures) {
      this.rafHandler.stop();
      this.callback();
    }
  }
}
export default Texture;
