function Plane(config) {
  const { p: planeConfig } = config;
  const { h: horizontalPoints, v: verticalPoints } = planeConfig.pts;

  const horizontalStep = 1 / (horizontalPoints - 1);
  const verticalStep = 1 / (verticalPoints - 1);

  const positions = [];
  let posIndex = 0;

  for (let v = 0; v < verticalPoints; v++) {
    const y = v * verticalStep - 1;
    for (let h = 0; h < horizontalPoints; h++) {
      positions[posIndex++] = h * horizontalStep; // X
      positions[posIndex++] = y; // Y
    }
  }

  const indices = [];
  let indexCounter = 0;
  for (let v = 0; v < verticalPoints - 1; v++) {
    const currentRowStart = v * horizontalPoints;
    const nextRowStart = (v + 1) * horizontalPoints;

    for (let h = 0; h < horizontalPoints; h++) {
      const current = currentRowStart + h;
      const next = nextRowStart + h;

      indices[indexCounter++] = current;
      indices[indexCounter++] = next;

      if (h === horizontalPoints - 1 && v < verticalPoints - 2) {
        indices[indexCounter++] = next;
        indices[indexCounter++] = nextRowStart + horizontalPoints;
      }
    }
  }

  const textureCoords = [];
  let texIndex = 0;

  for (let v = 0; v < verticalPoints; v++) {
    const tY = 1 - v / (verticalPoints - 1);
    for (let h = 0; h < horizontalPoints; h++) {
      textureCoords[texIndex++] = h / (horizontalPoints - 1); // U
      textureCoords[texIndex++] = tY; // V
    }
  }

  return {
    pos: positions,
    index: indices,
    texture: textureCoords,
  };
}

class PlaneTex {
  constructor(config) {
    const { p: programConfig } = config;
    const textureArray = _A.rgl.renderer.texture.tex[config.url];
    const planeCount = textureArray.length;

    const isHomeLarge = R.Is.def(config.isHomeLarge);
    this.planeCount = isHomeLarge ? planeCount ** 2 : planeCount;

    const defaultLerp = {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      opacity: 1,
      scale: 1,
      pY: 0,
      pX: 0,
    };

    const defaultEase = { y: 0, pY: 0, scale: 0 };
    const defaultIntro = { x: 0, y: 0, w: 0, h: 0, scale: 0 };

    R.BM(this, ["unequal"]);

    this.planes = Array.from({ length: this.planeCount }, (_, index) => {
      const texture = textureArray[index % planeCount];
      const { element, attrib } = texture;

      const geometryConfig = {
        pts: { h: 2, v: 2 },
        tex: texture,
        media: {
          obj: element,
          dimension: { width: element.width, height: element.height },
          ratio: {
            wh: element.width / element.height,
            hw: element.height / element.width,
          },
        },
        geo: new Geo({
          program: programConfig,
          mode: "TRIANGLE_STRIP",
          face: "FRONT",
          attrib: {
            c: { size: 2 },
            index: { size: 1 },
            f: { size: 2, tex: attrib },
          },
        }),
        zIndex: 0,
        lerp: { ...defaultLerp },
        ease: { ...defaultEase },
        intro: { ...defaultIntro },
        out: false,
      };

      const planeData = Plane({ p: geometryConfig, tex: true });
      const attributes = geometryConfig.geo.attrib;

      attributes.c.data = new Float32Array(planeData.pos);
      attributes.index.data = new Uint16Array(planeData.index);
      attributes.f.data = new Float32Array(planeData.texture);

      geometryConfig.geo.setVAO();

      return geometryConfig;
    });
  }

  draw(isMutating) {
    const { win } = _A;
    const { w: windowWidth, h: windowHeight } = win;

    for (let zIndex = 0; zIndex < 2; zIndex++) {
      this.planes.forEach((plane) => {
        if (plane.zIndex === zIndex) {
          const { lerp, ease, intro } = plane;
          const x = lerp.x + intro.x;
          const y = lerp.y + ease.y + intro.y;
          const width = lerp.w + intro.w;
          const height = lerp.h + intro.h;

          if (
            x < windowWidth &&
            x + width > 0 &&
            y < windowHeight &&
            y + height > 0 &&
            lerp.opacity > 0 &&
            height > 0 &&
            width > 0
          ) {
            if (!isMutating && plane.out) plane.out = false;
            plane.geo.draw(plane);
          } else if (!plane.out) {
            plane.out = true;
            plane.geo.draw(plane);
          }
        }
      });
    }
  }

  unequal(props) {
    const { prop, a, b } = props;
    const precision = this.lerp.r6.includes(prop) ? 6 : 2;
    return R.R(Math.abs(a[prop] - b[prop]), precision) !== 0;
  }
}

export default PlaneTex;
