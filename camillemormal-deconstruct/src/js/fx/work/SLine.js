export default class SLine {
    constructor(t) {
        this.el = R.Select.el(t.el)[0];
        this.txt = this.el.innerHTML;

        const d = R.Cr("div");
        d.innerHTML = this.txt;
        const nodes = d.childNodes;
        const nL = nodes.length;

        this.arr = [];
        let s = 0;
        for (let i = 0; i < nL; i++) {
            let a = nodes[i];
            if (a.nodeType === 3) {
                const words = a.nodeValue.split(" ");
                const l = words.length;
                for (let j = 0; j < l; j++) {
                    const w = words[j] === "" ? " " : words[j];
                    this.arr[s] = { type: "txt", word: w };
                    s++;
                }
            } else if (a.tagName === "BR") {
                this.arr[s] = { type: "br" };
                s++;
            } else if (a.tagName === "A") {
                let html = a.outerHTML;
                const txt = a.textContent;
                html = html.split(txt);
                this.arr[s] = {
                    type: "a",
                    start: html[0],
                    end: html[1],
                    word: txt.split(" "),
                };
                s++;
            }
        }

        this.arrL = this.arr.length;
    }

    resize(t) {
        this.el.innerHTML = this.txt;

        const width = this.el.offsetWidth;
        const s = R.Cr("div");
        const st = s.style;
        st.visibility = "hidden";
        st.position = "absolute";
        st.whiteSpace = "nowrap";

        const cs = window.getComputedStyle(this.el);
        st.fontFamily = this.gPV(cs, "font-family");
        st.fontSize = this.gPV(cs, "font-size");
        st.fontWeight = this.gPV(cs, "font-weight");
        st.letterSpacing = this.gPV(cs, "letter-spacing");

        document.body.prepend(s);

        let html = "";
        const lines = [];
        let l = 0;
        let o = "";
        let n = "";

        for (let i = 0; i < this.arrL; i++) {
            const p = this.arr[i];

            if (p.type === "txt") {
                const d = p.word;
                const c = d === " " ? "" : " ";
                s.innerHTML = o + d;
                if (s.offsetWidth >= width) {
                    lines[l++] = n.trim();
                    o = d + c;
                } else {
                    o = o + d + c;
                    n = n + d + c;
                }
            } else if (p.type === "a") {
                const g = p.start;
                const u = p.end;
                const m = p.word;
                const v = m.length;
                const f = v - 1;
                o = this.rLS(o);
                n = this.rLS(n);
                for (let e = 0; e < v; e++) {
                    const x = m[e];
                    const w = e === f ? "" : " ";
                    s.innerHTML = o + x;
                    if (s.offsetWidth >= width) {
                        if (e === 0) lines[l++] = n.trim();
                        else {
                            n = n.trim() + u;
                            lines[l++] = n;
                        }
                        o = x + w;
                        n = e === f ? g + x + u + w : g + x + w;
                    } else {
                        o = o + x + w;
                        let tt = x;
                        if (e === 0) tt = g + tt;
                        if (e === f) tt += u;
                        n = n + tt + w;
                    }
                }
            } else if (p.type === "br") {
                lines[l++] = n.trim();
                o = "";
                n = "";
            }
        }

        const lastTrim = n.trim();
        if (n !== lines[l - 1] && lastTrim !== "") lines[l++] = lastTrim;

        const start = t.tag.start;
        const end = t.tag.end;
        for (let i = 0; i < l; i++) {
            const txt = lines[i] === "" ? "&nbsp;" : lines[i];
            html += start + txt + end;
        }

        s.parentNode.removeChild(s);
        this.el.innerHTML = html;
    }

    rLS(t) {
        return t.replace(/\s?$/, "");
    }

    gPV(t, e) {
        return t.getPropertyValue(e);
    }
}

