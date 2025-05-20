class Renderer {
  constructor(config) {
    this.gl = _A.rgl.gl; // WebGL context
    this.pages = config.page; // List of pages
    this.state = {
      depthTest: null,
      cullFace: null,
    };

    this.initExtensions();
    this.setBlendFunc();

    this.currentProgramId = null;
    this.viewport = { width: null, height: null };

    this.camera = new Camera();
    this.texture = new Texture(this.gl);

    // Start texture loading
    this.texture.run(config.cb);
  }

  /**
   * Initializes WebGL extensions and vertex array helpers.
   */
  initExtensions() {
    const ext = this.gl.getExtension("OES_vertex_array_object");
    this.vertexArray = {
      create: ext.createVertexArrayOES.bind(ext),
      bind: ext.bindVertexArrayOES.bind(ext),
    };
  }

  /**
   * Enables and sets the blending function for WebGL.
   */
  setBlendFunc() {
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFuncSeparate(
      this.gl.SRC_ALPHA,
      this.gl.ONE_MINUS_SRC_ALPHA,
      this.gl.ONE,
      this.gl.ONE_MINUS_SRC_ALPHA
    );
  }

  /**
   * Configures face culling for the WebGL context.
   * @param {String} face - Face culling mode (e.g., "BACK", "FRONT").
   */
  setFaceCulling(face) {
    if (this.state.cullFace !== face) {
      this.state.cullFace = face;
      this.gl.enable(this.gl.CULL_FACE);
      this.gl.cullFace(this.gl[face]);
    }
  }

  /**
   * Resizes the rendering context based on the window dimensions.
   */
  resize() {
    const appState = _A;
    const windowSize = appState.win;

    const scaleFactor = windowSize.w > 600 ? 1.5 : 3;
    this.width = windowSize.w;
    this.height = windowSize.h;

    // Adjust canvas size
    this.gl.canvas.width = this.width * scaleFactor;
    this.gl.canvas.height = this.height * scaleFactor;

    // Update camera and clear the WebGL context
    this.camera.resize({
      aspect: this.gl.canvas.width / this.gl.canvas.height,
    });
    appState.rgl.clear();

    const scaledWidth = this.width * scaleFactor;
    const scaledHeight = this.height * scaleFactor;

    this.resizing = true;

    // Update viewport if dimensions have changed
    if (
      this.viewport.width !== scaledWidth ||
      this.viewport.height !== scaledHeight
    ) {
      this.viewport.width = scaledWidth;
      this.viewport.height = scaledHeight;

      this.gl.viewport(0, 0, scaledWidth, scaledHeight);
      this.viewMatrix = this.camera.render({ x: 0, y: 0, z: 0 });
    }
  }

  /**
   * Renders the scene based on the current route and state.
   * @param {Object} elements - Rendering elements.
   */
  render(elements) {
    const appState = _A;
    const route = appState.route;
    const oldPage = route.old.page;
    const newPage = route.new.page;

    const isNewPageActive = this.pages.includes(newPage);
    const isOldPageActive = this.pages.includes(oldPage);

    let requiresRedraw = this.resizing || appState.e.s.rqd;

    if (this.resizing) this.resizing = false;
    if (!requiresRedraw) {
      if (appState.e.load.moving) {
        requiresRedraw = true;
      } else if (isOldPageActive && appState.e[oldPage].gl.moving) {
        requiresRedraw = true;
      } else if (isNewPageActive && appState.e[newPage].gl.moving) {
        requiresRedraw = true;
      }
    }

    const renderTargets = [];
    if (isOldPageActive) {
      if (isNewPageActive) renderTargets.push(route.new.url);
      if (appState.mutating || appState.e[oldPage].gl.moving) {
        renderTargets.push(route.old.url);
      }
    } else {
      if (appState.e.load.moving) renderTargets.push("load");
      if (isNewPageActive) renderTargets.push(route.new.url);
    }

    for (const target of renderTargets) {
      if (target === "/") {
        elements.large.draw(requiresRedraw);
        elements.small.draw(requiresRedraw);
      } else {
        elements[target].draw(requiresRedraw);
      }
    }
  }
}

export default Renderer;
