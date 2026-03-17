class FxS2 {
  constructor() {
    this.init();
  }

  init() {
    this.leftContainer = R.G.id("a-l");
    this.leftPreview = R.G.id("a-lp");
    this.leftSections = R.G.class("a-l-s");
    this.sectionCount = this.leftSections.length;
  }

  show(options) {
    const state = _A;
    const isLocalIntro = state.config.isLocal && state.introducing;
    const isMutation = options.mutation;

    // Set default timing values
    let delay = options.delay;
    let animationDuration = 1500;
    let firstElementDelay = 200;
    let subsequentElementDelay = 50;
    let previewDelayOffset = 500;

    // Adjust timing for special cases
    if ((isMutation && state.fromBack) || isLocalIntro) {
      delay = 0;
      animationDuration = 0;
      firstElementDelay = 0;
      subsequentElementDelay = 0;
      previewDelayOffset = 0;
    }

    // Create timeline for section animations
    const sectionTimeline = new R.TL();

    // Animate each section
    for (let i = 0; i < this.sectionCount; i++) {
      const currentDelay =
        i === 0 ? delay + firstElementDelay : subsequentElementDelay;

      sectionTimeline.from({
        el: this.leftSections[i],
        p: {
          opacity: [0, 0.85],
        },
        d: animationDuration,
        e: "o1",
        delay: currentDelay,
      });

      sectionTimeline.from({
        el: this.leftSections[i],
        p: {
          y: [80, 0, "px"],
        },
        d: animationDuration,
        e: "o6",
      });
    }

    // Create timeline for preview animation
    const previewTimeline = new R.TL();
    previewTimeline.from({
      el: this.leftPreview,
      p: {
        opacity: [0, 0.85],
      },
      d: animationDuration,
      e: "o1",
      delay: delay + previewDelayOffset,
    });

    return {
      play: () => {
        sectionTimeline.play();
        previewTimeline.play();
      },
    };
  }
}
export default FxS2;
