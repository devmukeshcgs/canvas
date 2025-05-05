let Fx$2 = class {
  init() {
    this.left = R.G.id("a-l"),
      this.leftPreview = R.G.id("a-lp"),
      this.leftSection = R.G.class("a-l-s"),
      this.leftSectionL = this.leftSection.length
  }
  show(t) {
    var e = _A
      , i = e.config.isLocal && e.introducing
      , s = t.mutation;
    let r = t.delay
      , a = 1500;
    let h = 200
      , l = 50
      , o = 500
      , n = ((s && e.fromBack || i) && (r = 0,
        a = 0,
        h = 0,
        l = 0,
        o = 0),
        new R.TL);
    for (let t = 0; t < this.leftSectionL; t++) {
      var p = 0 === t ? r + h : l;
      n.from({
        el: this.leftSection[t],
        p: {
          opacity: [0, .85]
        },
        d: a,
        e: "o1",
        delay: p
      }),
        n.from({
          el: this.leftSection[t],
          p: {
            y: [80, 0, "px"]
          },
          d: a,
          e: "o6"
        })
    }
    let d = new R.TL;
    return d.from({
      el: this.leftPreview,
      p: {
        opacity: [0, .85]
      },
      d: a,
      e: "o1",
      delay: r + o
    }),
    {
      play: t => {
        n.play(),
          d.play()
      }
    }
  }
}
export default Fx$2;
