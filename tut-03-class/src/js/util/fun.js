export function create() {
    var t = new Float32Array(16);
    return t[0] = 1,
    t[5] = 1,
    t[10] = 1,
    t[15] = 1,
    t
}
export  function identity(t) {
    return t[0] = 1,
    t[1] = 0,
    t[2] = 0,
    t[3] = 0,
    t[4] = 0,
    t[5] = 1,
    t[6] = 0,
    t[7] = 0,
    t[8] = 0,
    t[9] = 0,
    t[10] = 1,
    t[11] = 0,
    t[12] = 0,
    t[13] = 0,
    t[14] = 0,
    t[15] = 1,
    t
}

export function invert(t, e) {
    var i = e[0]
      , s = e[1]
      , r = e[2]
      , a = e[3]
      , h = e[4]
      , l = e[5]
      , o = e[6]
      , n = e[7]
      , p = e[8]
      , d = e[9]
      , c = e[10]
      , g = e[11]
      , u = e[12]
      , m = e[13]
      , v = e[14]
      , e = e[15]
      , f = c * e
      , R = v * g
      , x = o * e
      , w = v * n
      , y = o * g
      , L = c * n
      , _ = r * e
      , A = v * a
      , b = r * g
      , S = c * a
      , M = r * n
      , T = o * a
      , F = p * m
      , H = u * d
      , P = h * m
      , G = u * l
      , B = h * d
      , E = p * l
      , k = i * m
      , z = u * s
      , I = i * d
      , C = p * s
      , O = i * l
      , D = h * s
      , W = f * l + w * d + y * m - (R * l + x * d + L * m)
      , N = R * s + _ * d + S * m - (f * s + A * d + b * m)
      , m = x * s + A * l + M * m - (w * s + _ * l + T * m)
      , s = L * s + b * l + T * d - (y * s + S * l + M * d)
      , l = 1 / (i * W + h * N + p * m + u * s);
    return t[0] = l * W,
    t[1] = l * N,
    t[2] = l * m,
    t[3] = l * s,
    t[4] = l * (R * h + x * p + L * u - (f * h + w * p + y * u)),
    t[5] = l * (f * i + A * p + b * u - (R * i + _ * p + S * u)),
    t[6] = l * (w * i + _ * h + T * u - (x * i + A * h + M * u)),
    t[7] = l * (y * i + S * h + M * p - (L * i + b * h + T * p)),
    t[8] = l * (F * n + G * g + B * e - (H * n + P * g + E * e)),
    t[9] = l * (H * a + k * g + C * e - (F * a + z * g + I * e)),
    t[10] = l * (P * a + z * n + O * e - (G * a + k * n + D * e)),
    t[11] = l * (E * a + I * n + D * g - (B * a + C * n + O * g)),
    t[12] = l * (P * c + E * v + H * o - (B * v + F * o + G * c)),
    t[13] = l * (I * v + F * r + z * c - (k * c + C * v + H * r)),
    t[14] = l * (k * o + D * v + G * r - (O * v + P * r + z * o)),
    t[15] = l * (O * c + B * r + C * o - (I * o + D * c + E * r)),
    t
}
export function perspective(t, e, i, s, r) {
    var e = 1 / Math.tan(.5 * e)
      , a = 1 / (s - r);
    return t[0] = e / i,
    t[1] = 0,
    t[2] = 0,
    t[3] = 0,
    t[4] = 0,
    t[5] = e,
    t[6] = 0,
    t[7] = 0,
    t[8] = 0,
    t[9] = 0,
    t[10] = (r + s) * a,
    t[11] = -1,
    t[12] = 0,
    t[13] = 0,
    t[14] = 2 * r * s * a,
    t[15] = 0,
    t
}


export function translateFn(t, e) {
    return translate(t, t, e)
}
function translate(t, e, i) {
    var s, r, a, h, l, o, n, p, d, c, g, u, m = i[0], v = i[1], i = i[2];
    return e === t ? (t[12] = e[0] * m + e[4] * v + e[8] * i + e[12],
    t[13] = e[1] * m + e[5] * v + e[9] * i + e[13],
    t[14] = e[2] * m + e[6] * v + e[10] * i + e[14],
    t[15] = e[3] * m + e[7] * v + e[11] * i + e[15]) : (s = e[0],
    r = e[1],
    a = e[2],
    h = e[3],
    l = e[4],
    o = e[5],
    n = e[6],
    p = e[7],
    d = e[8],
    c = e[9],
    g = e[10],
    u = e[11],
    t[0] = s,
    t[1] = r,
    t[2] = a,
    t[3] = h,
    t[4] = l,
    t[5] = o,
    t[6] = n,
    t[7] = p,
    t[8] = d,
    t[9] = c,
    t[10] = g,
    t[11] = u,
    t[12] = s * m + l * v + d * i + e[12],
    t[13] = r * m + o * v + c * i + e[13],
    t[14] = a * m + n * v + g * i + e[14],
    t[15] = h * m + p * v + u * i + e[15]),
    t
}
export function multiplyFn(t, e) {
    return multiply(t, t, e)
}
function multiply(t, e, i) {
    var s = i[0]
      , r = i[1]
      , a = i[2]
      , h = i[3]
      , l = i[4]
      , o = i[5]
      , n = i[6]
      , p = i[7]
      , d = i[8]
      , c = i[9]
      , g = i[10]
      , u = i[11]
      , m = i[12]
      , v = i[13]
      , f = i[14]
      , i = i[15]
      , R = e[0]
      , x = e[1]
      , w = e[2]
      , y = e[3]
      , L = e[4]
      , _ = e[5]
      , A = e[6]
      , b = e[7]
      , S = e[8]
      , M = e[9]
      , T = e[10]
      , F = e[11]
      , H = e[12]
      , P = e[13]
      , G = e[14]
      , e = e[15];
    return t[0] = s * R + r * L + a * S + h * H,
    t[1] = s * x + r * _ + a * M + h * P,
    t[2] = s * w + r * A + a * T + h * G,
    t[3] = s * y + r * b + a * F + h * e,
    t[4] = l * R + o * L + n * S + p * H,
    t[5] = l * x + o * _ + n * M + p * P,
    t[6] = l * w + o * A + n * T + p * G,
    t[7] = l * y + o * b + n * F + p * e,
    t[8] = d * R + c * L + g * S + u * H,
    t[9] = d * x + c * _ + g * M + u * P,
    t[10] = d * w + c * A + g * T + u * G,
    t[11] = d * y + c * b + g * F + u * e,
    t[12] = m * R + v * L + f * S + i * H,
    t[13] = m * x + v * _ + f * M + i * P,
    t[14] = m * w + v * A + f * T + i * G,
    t[15] = m * y + v * b + f * F + i * e,
    t
}

export function scaleFn(t, e) {
    return scale(t, t, e)
}
function scale(t, e, i) {
    var s = i[0]
      , r = i[1]
      , i = i[2];
    return t[0] = e[0] * s,
    t[1] = e[1] * s,
    t[2] = e[2] * s,
    t[3] = e[3] * s,
    t[4] = e[4] * r,
    t[5] = e[5] * r,
    t[6] = e[6] * r,
    t[7] = e[7] * r,
    t[8] = e[8] * i,
    t[9] = e[9] * i,
    t[10] = e[10] * i,
    t[11] = e[11] * i,
    t[12] = e[12],
    t[13] = e[13],
    t[14] = e[14],
    t[15] = e[15],
    t
}