class Geo {
  constructor(config) {
    const appState = _A.rgl;

    this.gl = appState.gl; // WebGL context
    this.renderer = appState.renderer; // Renderer reference
    this.program = config.program; // Associated program
    this.mode = config.mode; // Drawing mode (e.g., TRIANGLES)
    this.face = config.face; // Face culling setting
    this.attributes = config.attrib; // Attributes for the geometry

    // Bind vertex array and attribute locations
    this.renderer.vertexArray.bind(null);
    this.program.getL(this.attributes, "Attrib");

    this.modelMatrix = create(); // Initialize model matrix
  }

  /**
   * Sets up the VAO (Vertex Array Object) for this geometry.
   */
  setVAO() {
    const renderer = this.renderer;

    this.vao = renderer.vertexArray.create(); // Create a VAO
    renderer.vertexArray.bind(this.vao); // Bind VAO
    this.setupAttributes(); // Set up attributes
    renderer.vertexArray.bind(null); // Unbind VAO
  }

  /**
   * Configures attributes for the geometry, binding buffers and enabling pointers.
   */
  setupAttributes() {
    const gl = this.gl;

    for (const name in this.attributes) {
      if (Object.prototype.hasOwnProperty.call(this.attributes, name)) {
        const attribute = this.attributes[name];
        const isIndex = name === "index";

        // Determine data type and set corresponding WebGL type
        const dataType = attribute.data.constructor;
        attribute.type =
          dataType === Float32Array
            ? gl.FLOAT
            : dataType === Uint16Array
            ? gl.UNSIGNED_SHORT
            : gl.UNSIGNED_INT;

        attribute.count = attribute.data.length / attribute.size; // Number of elements
        attribute.target = isIndex ? gl.ELEMENT_ARRAY_BUFFER : gl.ARRAY_BUFFER;
        attribute.normalize = false;

        // Create and bind buffer
        const buffer = gl.createBuffer();
        gl.bindBuffer(attribute.target, buffer);
        gl.bufferData(attribute.target, attribute.data, gl.STATIC_DRAW);

        if (!isIndex) {
          // Enable and configure vertex attribute pointer
          gl.enableVertexAttribArray(attribute.location);
          gl.vertexAttribPointer(
            attribute.location,
            attribute.size,
            attribute.type,
            attribute.normalize,
            0,
            0
          );
        }
      }
    }
  }

  /**
   * Draws the geometry using the specified parameters.
   * @param {Object} options - Parameters for drawing
   */
  draw(options) {
    const gl = this.gl;
    const renderer = this.renderer;

    // Set face culling
    renderer.setFaceCulling(this.face);

    // Use the associated program
    this.program.run();

    // Update model matrix
    this.modelMatrix = identity(this.modelMatrix);
    const viewMatrix = multiplyFn(this.modelMatrix, renderer.viewMatrix);

    // Apply transformations
    const { lerp, ease, intro, media } = options;
    const x = lerp.x + intro.x;
    const y = lerp.y + ease.y + intro.y;
    const width = lerp.w + intro.w;
    const height = lerp.h + intro.h;
    const scale = lerp.scale + intro.scale + ease.scale;

    const adjustedMatrix = scaleFn(translateFn(viewMatrix, [x, -y, 0]), [
      width,
      height,
      1,
    ]);

    // Handle aspect ratio adjustments
    const uniforms = this.program.uniform;
    let aspectX = 1;
    let aspectY = media.ratio.wh / (width / height || 1);

    if (aspectY < 1) {
      aspectX = 1 / aspectY;
      aspectY = 1;
    }

    uniforms.d.value = [aspectX * scale, aspectY * scale];
    uniforms.e.value = [lerp.pX, (lerp.pY + ease.pY) / aspectY];
    uniforms.h.value = adjustedMatrix;

    // Set uniforms and bind texture
    this.program.setUniform();
    gl.bindTexture(gl.TEXTURE_2D, this.attributes.f.tex);

    // Bind VAO and draw elements
    renderer.vertexArray.bind(this.vao);

    const indexBuffer = this.attributes.index;
    gl.drawElements(gl[this.mode], indexBuffer.count, indexBuffer.type, 0);
  }
}

export default Geo;
