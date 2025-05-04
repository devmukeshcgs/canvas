console.log("LoadManager");

class LoadManager {
    constructor() {
        this.moving = false;
    }

    intro() {
        const appState = _A;

        // Set initial properties based on the current route
        this.url = appState.route.new.url;
        this.isHome = appState.is.ho;
        this.isWork = appState.is.wo;
        this.isAbout = appState.is.ab;

        const renderData = appState.rgl._;
        const loadTextures = renderData.load;

        this.textures = [];
        this.positionsY = [];
        this.textureLoad = loadTextures.plane;
        this.textureCount = loadTextures.planeL;

        if (this.isHome) {
            const largeTextures = renderData.large.plane;
            this.mainTexture = largeTextures[0];
        } else if (this.isWork) {
            this.mainTexture = renderData[this.url].plane[0];
        } else if (this.isAbout) {
            this.mainTexture = this.textureLoad[12];
        }

        if (this.isHome) {
            const smallTextures = renderData.small;
            this.textureSmall = smallTextures.plane;
            this.textureSmallCount = smallTextures.planeL;
        }

        this.resizeAssets();
    }

    resizeAssets() {
        const appState = _A;
        if (!appState.introducing) return;

        const { w: windowWidth, h: windowHeight } = appState.win;
        const padding = 30 * appState.winWpsdW;
        const elementWidth = (windowWidth - 4 * padding) / 4;
        const aspectRatio = windowHeight / windowWidth;
        const elementHeight = elementWidth * aspectRatio;

        const elementWithPadding = elementHeight + padding;
        const layoutWidth = elementWidth + padding;

        const centerOffsetX = windowWidth / 2;
        const centerOffsetY = windowHeight / 2;

        const extraPadding = 12 * elementHeight;
        const adjustedWindowWidth = windowWidth + 2;
        const adjustedWindowHeight = windowHeight + 2;
        const overflowX = (padding * adjustedWindowWidth) / elementWidth;
        const overflowY = adjustedWindowHeight + overflowX;

        for (let i = 0; i < this.textureCount; i++) {
            const isMainTexture = i === 12;
            const row = Math.floor(i / 5);
            const isOddRow = row % 2 === 1;
            const adjustedRow = row - 2;

            const column = i % 5 - 2;
            const rowOffset = Math.abs(adjustedRow);

            const positionY = isOddRow
                ? -(centerOffsetY - (4 - column) * extraPadding + rowOffset * elementHeight + 20)
                : centerOffsetY + column * extraPadding + rowOffset * elementHeight + 20;

            this.positionsY[i] = positionY;

            const positionX = centerOffsetX + adjustedRow * layoutWidth;
            const overflowOffsetX = centerOffsetX + adjustedRow * overflowX;
            const overflowOffsetY = centerOffsetY + column * overflowY - (isOddRow ? centerOffsetY : 0);

            this.textures[i] = {
                x: positionX - overflowOffsetX,
                y: positionY - overflowOffsetY,
                w: elementWidth - adjustedWindowWidth,
                h: elementHeight - adjustedWindowHeight,
                scale: isMainTexture ? 0.5 : 0,
            };

            const currentTexture = isMainTexture ? this.mainTexture : this.textureLoad[i];
            currentTexture.lerp = {
                x: overflowOffsetX,
                y: overflowOffsetY,
                w: adjustedWindowWidth,
                h: adjustedWindowHeight,
            };
            currentTexture.intro = { ...this.textures[i] };
        }

        if (this.isHome) {
            const homeData = appState.e.ho.gl.data.in.small;
            this.bottomPositionY = windowHeight + homeData.gap.x - homeData.y;
        }
    }

    createIntroEffect(config) {
        const isLocal = _A.config.isLocal;
        const animationDuration = isLocal ? 1 : 5000;
        const animationDelay = isLocal ? 0 : config.delay;

        const easeIn = R.Ease4([0.8, 0, 0.1, 1]);
        const easeOut = R.Ease4([0.72, 0, 0.11, 1]);

        const introEffect = new R.M({
            d: animationDuration,
            e: "linear",
            delay: animationDelay,
            update: (progress) => {
                this.moving = true;

                const progressLerpIn = easeIn(R.iLerp(0, 0.65, progress.prog));
                const progressLerpOut = easeOut(R.iLerp(0.4, 1, progress.prog));

                for (let i = 0; i < this.textureCount; i++) {
                    const texture = i === 12 ? this.mainTexture : this.textureLoad[i];
                    const adjustedY = R.Lerp(this.positionsY[i], 0, progressLerpIn);

                    texture.intro.x = R.Lerp(this.textures[i].x, 0, progressLerpOut);
                    texture.intro.y = R.Lerp(this.textures[i].y, 0, progressLerpOut) + adjustedY;
                    texture.intro.w = R.Lerp(this.textures[i].w, 0, progressLerpOut);
                    texture.intro.h = R.Lerp(this.textures[i].h, 0, progressLerpOut);
                    texture.intro.scale = R.Lerp(this.textures[i].scale, 0, progressLerpOut);
                }
            },
            cb: () => {
                this.moving = false;
            },
        });

        const smallEffects = [];
        if (this.isHome) {
            const homeAnimationDuration = isLocal ? 1 : 1500;
            const homeAnimationDelay = isLocal ? 0 : 3200;
            const staggerDelay = isLocal ? 0 : 50;

            for (let i = 0; i < this.textureSmallCount; i++) {
                smallEffects[i] = new R.M({
                    d: homeAnimationDuration,
                    e: "o6",
                    delay: homeAnimationDelay + staggerDelay * i,
                    update: (progress) => {
                        this.moving = true;
                        const smallTexture = i === 0 ? this.textureSmall : this.textureLarge;
                        smallTexture[9 * i].intro.y = R.Lerp(this.bottomPositionY, 0, progress.progE);
                    },
                    cb: () => {
                        this.moving = false;
                    },
                });
            }
        }

        return {
            play: () => {
                introEffect.play();
                if (this.isHome) {
                    smallEffects.forEach((effect) => effect.play());
                }
            },
        };
    }
}


export default LoadManager