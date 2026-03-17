class Page {
    constructor(options) {
        const state = _A;
        const renderer = state.e;
        const isLocal = state.config.isLocal;
        const isIntro = options.intro;
        const isFromBack = state.fromBack;
        
        // Current state flags
        const isHome = state.is.ho;
        const isWork = state.is.wo;
        const isAbout = state.is.ab;
        
        // Previous state flags
        const wasHome = state.was.ho;
        const wasWork = state.was.wo;
        
        const animations = [];
        
        if (isIntro) {
            this._handleIntroAnimation({
                isLocal,
                isHome,
                isWork,
                isAbout,
                renderer,
                state,
                animations
            });
        } else {
            this._handleRegularAnimation({
                isHome,
                isWork,
                isAbout,
                wasHome,
                wasWork,
                isFromBack,
                renderer,
                state,
                animations,
                mode: state.mode,
                index: state.index
            });
        }
        
        return {
            play: (timestamp) => {
                animations.forEach(animation => animation.play());
            }
        };
    }
    
    _handleIntroAnimation(params) {
        const { isLocal, isHome, isWork, isAbout, renderer, state, animations } = params;
        const introDelay = isLocal ? 0 : 4000;
        
        if (isHome) {
            const homeIntroDelay = 3200;
            
            animations.push(
                renderer.load.fx({ delay: 0 }),
                renderer.ho.fxTitle.show({ index: state.index, delay: homeIntroDelay }),
                renderer.ho.fxCross.side({ action: "show", delay: 3500 }),
                renderer.ho.fxPgn.show({ mutation: false, delay: 3800 }),
                renderer.nav.fx.show({ mutation: false, delay: 3800 })
            );
            
            new R.Delay(() => {
                renderer.on();
                R.PE.none(R.G.id("load"));
                state.mutating = false;
                state.introducing = false;
            }, introDelay).run();
            
        } else if (isWork) {
            animations.push(
                renderer.load.fx({ delay: 0 }),
                renderer.wo.fxHero.show({ delay: 3400 }),
                renderer.wo.fxBack.show({ delay: 3800 })
            );
            
            new R.Delay(() => {
                renderer.on();
                state.mutating = false;
                state.introducing = false;
                R.PE.none(R.G.id("load"));
            }, introDelay).run();
            
        } else if (isAbout) {
            const aboutDelay = isLocal ? 0 : 1200;
            
            animations.push(
                renderer.ab.fx.show({ mutation: false, delay: 1000 }),
                renderer.nav.fx.show({ mutation: false, delay: 1000 })
            );
            
            new R.Delay(() => {
                renderer.on();
                state.mutating = false;
                state.introducing = false;
                R.PE.none(R.G.id("load"));
            }, aboutDelay).run();
        }
    }
    
    _handleRegularAnimation(params) {
        const {
            isHome,
            isWork,
            isAbout,
            wasHome,
            wasWork,
            isFromBack,
            renderer,
            state,
            animations,
            mode,
            index
        } = params;
        
        if (isHome) {
            let crossDelay = 200;
            let completionDelay = 300;
            
            if (isFromBack) {
                crossDelay = 1;
                completionDelay = 1;
            }
            
            if (wasWork) {
                animations.push(
                    renderer.wo.gl.hide(),
                    renderer.nav.fx.show({ mutation: true, delay: 0 })
                );
            }
            
            animations.push(renderer.ho.gl.show());
            
            if (mode === "out") {
                animations.push(
                    renderer.ho.fxCross.middle({
                        mutation: true,
                        action: "show",
                        delay: crossDelay
                    })
                );
            } else {
                animations.push(
                    renderer.ho.fxTitle.show({
                        mutation: true,
                        index,
                        delay: 0
                    }),
                    renderer.ho.fxCross.side({
                        mutation: true,
                        action: "show",
                        delay: crossDelay
                    })
                );
            }
            
            animations.push(
                renderer.ho.fxPgn.show({
                    mutation: true,
                    delay: 0
                })
            );
            
            new R.Delay(() => {
                renderer.on();
                state.mutating = false;
            }, completionDelay).run();
            
        } else if (isWork) {
            let heroDelay = 800;
            let backDelay = heroDelay + 300;
            let completionDelay = 1300;
            
            if (isFromBack) {
                heroDelay = 1;
                backDelay = 1;
                completionDelay = 1;
            }
            
            if (wasHome) {
                this._addHomeToWorkTransition(renderer, animations, index);
            } else if (wasWork) {
                animations.push(
                    renderer.wo.fxFooter.hide({
                        mutation: true,
                        delay: 0
                    }),
                    renderer.wo.gl.showFromWork()
                );
            }
            
            animations.push(
                renderer.wo.fxHero.show({
                    mutation: true,
                    delay: heroDelay
                }),
                renderer.wo.fxBack.show({
                    mutation: true,
                    delay: backDelay
                })
            );
            
            new R.Delay(() => {
                state.page.removeOld();
                renderer.on();
                state.mutating = false;
            }, completionDelay).run();
            
        } else if (wasHome && isAbout) {
            let aboutDelay = 800;
            let completionDelay = 1300;
            
            if (isFromBack) {
                aboutDelay = 1;
                completionDelay = 1;
            }
            
            if (mode === "out") {
                animations.push(
                    renderer.ho.fxCross.middle({
                        mutation: true,
                        action: "hide",
                        delay: 0
                    })
                );
            } else {
                animations.push(
                    renderer.ho.fxCross.side({
                        mutation: true,
                        action: "hide",
                        delay: 0
                    }),
                    renderer.ho.fxTitle.hide({
                        mutation: true,
                        index,
                        delay: 0
                    })
                );
            }
            
            animations.push(
                renderer.ho.fxPgn.hide({
                    mutation: true,
                    delay: 0
                }),
                renderer.ho.gl.hide(),
                renderer.ab.fx.show({
                    mutation: true,
                    delay: aboutDelay
                })
            );
            
            new R.Delay(() => {
                state.page.removeOld();
                renderer.on();
                state.mutating = false;
            }, completionDelay).run();
        }
    }
    
    _addHomeToWorkTransition(renderer, animations, index) {
        animations.push(
            renderer.nav.fx.hide({
                mutation: true,
                delay: 0
            }),
            renderer.ho.fxCross.side({
                mutation: true,
                action: "hide",
                delay: 0
            }),
            renderer.ho.fxTitle.hide({
                mutation: true,
                index,
                delay: 0
            }),
            renderer.ho.over.hide({
                mutation: true,
                index
            }),
            renderer.ho.fxPgn.hide({
                mutation: true,
                delay: 0
            }),
            renderer.ho.gl.hide(),
            renderer.wo.gl.showFromHome()
        );
    }
}
export default Page