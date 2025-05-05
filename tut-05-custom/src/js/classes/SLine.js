export default class SLine {
    constructor(t) {
        this.el = R.Select.el(t.el)[0],
        this.txt = this.el.innerHTML;
        var t = R.Cr("div")
          , e = (t.innerHTML = this.txt,
        t.childNodes)
          , i = e.length;
        this.arr = [];
        let s = 0;
        for (let t = 0; t < i; t++) {
            var r, a = e[t];
            if (3 === a.nodeType) {
                var h = a.nodeValue.split(" ")
                  , l = h.length;
                for (let t = 0; t < l; t++) {
                    var o = "" === h[t] ? " " : h[t];
                    this.arr[s] = {
                        type: "txt",
                        word: o
                    },
                    s++
                }
            } else
                "BR" === a.tagName ? (this.arr[s] = {
                    type: "br"
                },
                s++) : "A" === a.tagName && (r = a.outerHTML,
                a = a.textContent,
                r = r.split(a),
                this.arr[s] = {
                    type: "a",
                    start: r[0],
                    end: r[1],
                    word: a.split(" ")
                },
                s++)
        }
        this.arrL = this.arr.length
    }
    resize(t) {
        this.el.innerHTML = this.txt;
        var i = this.el.offsetWidth
          , s = R.Cr("div")
          , e = s.style
          , r = (e.visibility = "hidden",
        e.position = "absolute",
        e.whiteSpace = "nowrap",
        window.getComputedStyle(this.el));
        e.fontFamily = this.gPV(r, "font-family"),
        e.fontSize = this.gPV(r, "font-size"),
        e.fontWeight = this.gPV(r, "font-weight"),
        e.letterSpacing = this.gPV(r, "letter-spacing"),
        document.body.prepend(s);
        let a = "";
        var h = [];
        let l = 0
          , o = ""
          , n = "";
        for (let t = 0; t < this.arrL; t++) {
            var p = this.arr[t];
            if ("txt" === p.type) {
                var d = p.word
                  , c = " " === d ? "" : " ";
                s.innerHTML = o + d,
                n = s.offsetWidth >= i ? (h[l++] = n.trim(),
                o = d + c) : (o = o + d + c,
                n + d + c)
            } else if ("a" === p.type) {
                var g = p.start
                  , u = p.end
                  , m = p.word
                  , v = m.length
                  , f = v - 1;
                o = this.rLS(o),
                n = this.rLS(n);
                for (let e = 0; e < v; e++) {
                    var x = m[e]
                      , w = e === f ? "" : " ";
                    if (s.innerHTML = o + x,
                    s.offsetWidth >= i)
                        0 === e ? h[l++] = n.trim() : (n = n.trim() + u,
                        h[l++] = n),
                        o = x + w,
                        n = e === f ? g + x + u + w : g + x + w;
                    else {
                        o = o + x + w;
                        let t = x;
                        0 === e && (t = g + t),
                        e === f && (t += u),
                        n = n + t + w
                    }
                }
            } else
                "br" === p.type && (h[l++] = n.trim(),
                o = "",
                n = "")
        }
        n !== h[l - 1] && "" !== (e = n.trim()) && (h[l++] = e);
        var y = t.tag.start
          , L = t.tag.end;
        for (let t = 0; t < l; t++) {
            var _ = "" === h[t] ? "&nbsp;" : h[t];
            a += y + _ + L
        }
        s.parentNode.removeChild(s),
        this.el.innerHTML = a
    }
    rLS(t) {
        return t.replace(/\s?$/, "")
    }
    gPV(t, e) {
        return t.getPropertyValue(e)
    }
}