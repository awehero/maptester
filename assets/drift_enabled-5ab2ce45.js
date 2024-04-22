var An = Object.defineProperty;
var Nn = (r,t,e)=>t in r ? An(r, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: e
}) : r[t] = e;
var w = (r,t,e)=>(Nn(r, typeof t != "symbol" ? t + "" : t, e),
e);
import {F as re, S as yt, O as On, P as kr, s as $i, T as Cn, V as Pn, e as M, B as Sn, h as jt, D as Dr, X as Kt, Y as Fn} from "./index-4aa39886.js";
import {S as Un} from "./SkinUtils-f9a379f3.js";
class nu {
    constructor() {}
    async asyncInit() {
        await boot.preload(),
        this.intervalManager.startInterval();
        const t = await re.getString(yt.ScreenResolution);
        this.resolutionManager.setResolution(t)
    }
    async applyPlayerSkin() {
        const t = await re.getInteger(yt.SelectedSkinId) ?? On.Default;
        decorations.decorate_player(window.player, Un.getSkinImageSrc(t))
    }
    async onMapLoaded() {
        await boot.init(),
        await this.applyPlayerSkin(),
        this.resolutionManager.resizeScreenForGame(),
        this.soundPlayer.onMapLoaded(),
        this.endingManager.onMapLoaded(),
        this.overlayManager.onMapLoaded()
    }
    onSettingsItemChanged(t, e) {
        switch (t.storageKey) {
        case yt.ScreenResolution:
            this.resolutionManager.setResolution(e);
            break;
        case yt.RenderLoop:
            this.intervalManager.onSettingsItemChanged(e);
            break;
        case yt.IsSoundOn:
            this.soundPlayer.onSettingsItemChanged(e);
            break
        }
    }
    onFrame() {
        this.overlayManager.onFrame(),
        this.playerManager.onFrame()
    }
}
kr.Menu,
kr.Game;
class su {
    constructor() {
        document.addEventListener("keydown", t=>this.onKeyDown(t)),
        document.addEventListener("keyup", t=>this.onKeyUp(t))
    }
}
class ou {
    constructor(t) {
        w(this, "world");
        this.world = t
    }
    onCleanup() {
        cleanup.run()
    }
}
class au {
    constructor() {
        w(this, "endingMapNameDiv", document.getElementById("endingMapName"));
        w(this, "endingMakerNameDiv", document.getElementById("endingMakerName"))
    }
    onSelfDestructPressed() {
        window.alive && change_state.die("Self Destructed")
    }
    writeMapAndMakerName(t) {
        this.endingMapNameDiv.innerText = map.title,
        this.endingMakerNameDiv.innerText = $i.getCupName(t) + " X " + map.maker
    }
}
const Ln = .003
  , me = .05
  , Mn = .014
  , Gn = .007
  , be = .09
  , xe = .01
  , Bn = 15
  , kn = 1.8
  , Hr = 60 * .25
  , Xr = 60 * .7
  , Dn = Math.PI * .28
  , Vr = Math.PI * .16
  , jr = Math.PI * .06;
class Hn {
    constructor(t, e) {
        w(this, "world");
        w(this, "playerManager");
        w(this, "angularVelocity", 0);
        w(this, "forwardVelocity", 0);
        w(this, "isDrifting", !1);
        w(this, "sidestepAngleOffset", 0);
        w(this, "driftDirection", 1);
        w(this, "driftDurationInFrames", 0);
        w(this, "speedDurationInFrames", 0);
        this.world = t,
        this.playerManager = e
    }
    onFrame() {
        const t = Zi.getSteeringDirection();
        this.startDrift(t),
        this.stopDrift(),
        this.forwardVelocity = this.getForwardVelocity(),
        this.updateAngularVelocity(t),
        this.updateSideStepAngleOffset(),
        this.isDrifting && (this.driftDurationInFrames += 1),
        this.speedDurationInFrames > 0 && (this.speedDurationInFrames -= 1)
    }
    onRestart() {
        this.angularVelocity = 0,
        this.forwardVelocity = 0,
        this.isDrifting = !1,
        this.sidestepAngleOffset = 0,
        this.driftDirection = 1,
        this.driftDurationInFrames = 0,
        this.speedDurationInFrames = 0
    }
    updateSideStepAngleOffset() {
        this.isDrifting && (this.driftDirection === -1 && this.sidestepAngleOffset > Vr && (this.sidestepAngleOffset -= jr),
        this.driftDirection === 1 && this.sidestepAngleOffset < -Vr && (this.sidestepAngleOffset += jr))
    }
    updateAngularVelocity(t) {
        if (this.angularVelocity *= this.getAngularSpeedDamping(),
        !this.isDrifting) {
            this.angularVelocity += t * Ln,
            this.angularVelocity > me && (this.angularVelocity = me),
            this.angularVelocity < -me && (this.angularVelocity = -me);
            return
        }
        this.driftDurationInFrames > Bn ? (console.log("yes"),
        t === this.driftDirection ? this.angularVelocity += t * Gn : this.angularVelocity += t * Mn) : console.log("no"),
        this.driftDirection === 1 && (this.angularVelocity > be && (this.angularVelocity = be),
        this.angularVelocity < xe && (this.angularVelocity = xe)),
        this.driftDirection === -1 && (this.angularVelocity < -be && (this.angularVelocity = -be),
        this.angularVelocity > -xe && (this.angularVelocity = -xe))
    }
    getForwardVelocity() {
        return this.isDrifting ? .25 : .3
    }
    getAngularSpeedDamping() {
        return this.isDrifting,
        .93
    }
    getRotationAdjustment() {
        let t = this.angularVelocity;
        return this.isDrifting && (t *= window.speed * 1.9),
        t
    }
    getPositionAdjustment() {
        let t = window.rotation - Math.PI
          , e = this.forwardVelocity;
        return this.speedDurationInFrames > 0 && (e *= kn),
        t += this.sidestepAngleOffset,
        {
            x: e * Math.sin(t),
            z: e * Math.cos(t)
        }
    }
    startDrift(t) {
        this.isDrifting || t !== 0 && window.controls.down && (this.isDrifting = !0,
        this.driftDirection = t,
        this.angularVelocity = t * .07,
        this.sidestepAngleOffset = t * -Dn,
        this.speedDurationInFrames = 0,
        this.driftDurationInFrames = 0)
    }
    stopDrift() {
        this.isDrifting && (window.controls.down || (this.isDrifting = !1,
        this.sidestepAngleOffset = 0,
        this.angularVelocity = 0,
        this.speedDurationInFrames = this.getSpeedDurationInFrames(),
        this.driftDurationInFrames = 0))
    }
    getSpeedDurationInFrames() {
        const t = this.driftDurationInFrames / 3;
        return t > Xr ? Xr : t < Hr ? Hr : Math.ceil(t)
    }
}
class Xn {
    constructor(t, e) {
        w(this, "world");
        w(this, "playerManager");
        this.world = t,
        this.playerManager = e
    }
    getRotationAdjustment() {
        return window.steer * Zi.getSteeringDirection()
    }
    getPositionAdjustment() {
        return {
            x: window.speed * Math.sin(window.rotation - 3.14),
            z: window.speed * Math.cos(window.rotation - 3.14)
        }
    }
}
class Zi {
    constructor(t) {
        w(this, "world");
        w(this, "driftManager");
        w(this, "moveManager");
        this.world = t,
        this.driftManager = new Hn(t,this),
        this.moveManager = new Xn(t,this)
    }
    onFrame() {
        window.isTouchingDriftPad && this.driftManager.onFrame()
    }
    getRotationAdjustment() {
        return window.isTouchingDriftPad ? this.driftManager.getRotationAdjustment() : this.moveManager.getRotationAdjustment()
    }
    getPositionAdjustment() {
        return window.isTouchingDriftPad ? this.driftManager.getPositionAdjustment() : this.moveManager.getPositionAdjustment()
    }
    static getSteeringDirection() {
        let t = 0;
        return window.controls.right && (t += 1),
        window.controls.left && (t -= 1),
        t
    }
}
class uu {
    constructor() {
        w(this, "overlayMapNameDiv", document.getElementById("overlayMapName"));
        w(this, "overlayInGameMessageDiv", document.getElementById("overlayInGameMessage"));
        w(this, "overlayLoadingScreenDiv", document.getElementById("overlayLoadingScreen"));
        w(this, "overlayCurrentTimeDiv", document.getElementById("overlayCurrentTime"));
        w(this, "overlayFpsDiv", document.getElementById("overlayFps"));
        w(this, "mapIdWithControlChangeEndingPopup", "none");
        w(this, "didEncounterJumpRegion", !1);
        w(this, "didEncounterDriftRegion", !1);
        this.hideAllSigns()
    }
    updateCurrentTime() {
        this.overlayCurrentTimeDiv.innerHTML = "TIME: " + window.score
    }
    onMapLoaded() {
        this.didEncounterJumpRegion = !1,
        this.didEncounterDriftRegion = !1,
        this.overlayMapNameDiv.innerText = map.title,
        this.hideLoadingScreen(),
        this.hideInGameMessage()
    }
    hideAllSigns() {
        this.setJumpEnabledSignVisibility(!1),
        this.setControlsReversedSignVisibility(!1),
        this.setDriftEnabledSignVisibility(!1)
    }
    updateFpsText(t) {
        this.overlayFpsDiv.innerText = t.toFixed(0) + " FPS"
    }
    setInGameMessage(t) {
        this.overlayInGameMessageDiv.innerText = t,
        this.overlayInGameMessageDiv.style.display = "block"
    }
    hideInGameMessage() {
        this.overlayInGameMessageDiv.innerText = "",
        this.overlayInGameMessageDiv.style.display = "none"
    }
    showLoadingScreen() {
        this.overlayLoadingScreenDiv.style.display = "flex"
    }
    hideLoadingScreen() {
        this.overlayLoadingScreenDiv.style.display = "none"
    }
    isLoadingScreenVisible() {
        return this.overlayLoadingScreenDiv.style.display === "flex"
    }
    setJumpEnabledSignVisibility(t) {
        const e = document.getElementById("overlayJumpEnabled");
        e.style.visibility = t ? "visible" : "hidden",
        t && (this.didEncounterJumpRegion = !0)
    }
    setDriftEnabledSignVisibility(t) {
        const e = document.getElementById("overlayDriftEnabled");
        e.style.visibility = t ? "visible" : "hidden",
        t && (this.didEncounterDriftRegion = !0)
    }
    setControlsReversedSignVisibility(t) {
        const e = document.getElementById("overlayControlsReversed");
        e.style.visibility = t ? "visible" : "hidden"
    }
}
class lr {
    static async loadMap(t, e) {
        if (window.isMapLoaded) {
            console.error("Map already loaded");
            return
        }
        window.currentMapId = t,
        window.isMapLoaded = !0;
        const i = lr.getUrl(t, e);
        await lr.loadScript(i)
    }
    static loadScript(t) {
        return new Promise(e=>{
            console.log("scriptUrl", t);
            const i = document.getElementsByTagName("head")[0]
              , n = document.createElement("script");
            n.type = "text/javascript",
            n.src = t,
            n.onload = ()=>setTimeout(e, 50),
            i.appendChild(n)
        }
        )
    }
    static getUrl(t, e) {
        return e == null ? `/maps/${t}.js` : e.startsWith("http://") || e.startsWith("https://") ? e : `${window.icemaprunlink}?${Cn}=${e}`
    }
}
/*!
 * @pixi/settings - v6.5.2
 * Compiled Wed, 24 Aug 2022 13:51:19 UTC
 *
 * @pixi/settings is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/*!
 * @pixi/constants - v6.5.2
 * Compiled Wed, 24 Aug 2022 13:51:19 UTC
 *
 * @pixi/constants is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var zr;
(function(r) {
    r[r.WEBGL_LEGACY = 0] = "WEBGL_LEGACY",
    r[r.WEBGL = 1] = "WEBGL",
    r[r.WEBGL2 = 2] = "WEBGL2"
}
)(zr || (zr = {}));
var Wr;
(function(r) {
    r[r.UNKNOWN = 0] = "UNKNOWN",
    r[r.WEBGL = 1] = "WEBGL",
    r[r.CANVAS = 2] = "CANVAS"
}
)(Wr || (Wr = {}));
var qr;
(function(r) {
    r[r.COLOR = 16384] = "COLOR",
    r[r.DEPTH = 256] = "DEPTH",
    r[r.STENCIL = 1024] = "STENCIL"
}
)(qr || (qr = {}));
var $r;
(function(r) {
    r[r.NORMAL = 0] = "NORMAL",
    r[r.ADD = 1] = "ADD",
    r[r.MULTIPLY = 2] = "MULTIPLY",
    r[r.SCREEN = 3] = "SCREEN",
    r[r.OVERLAY = 4] = "OVERLAY",
    r[r.DARKEN = 5] = "DARKEN",
    r[r.LIGHTEN = 6] = "LIGHTEN",
    r[r.COLOR_DODGE = 7] = "COLOR_DODGE",
    r[r.COLOR_BURN = 8] = "COLOR_BURN",
    r[r.HARD_LIGHT = 9] = "HARD_LIGHT",
    r[r.SOFT_LIGHT = 10] = "SOFT_LIGHT",
    r[r.DIFFERENCE = 11] = "DIFFERENCE",
    r[r.EXCLUSION = 12] = "EXCLUSION",
    r[r.HUE = 13] = "HUE",
    r[r.SATURATION = 14] = "SATURATION",
    r[r.COLOR = 15] = "COLOR",
    r[r.LUMINOSITY = 16] = "LUMINOSITY",
    r[r.NORMAL_NPM = 17] = "NORMAL_NPM",
    r[r.ADD_NPM = 18] = "ADD_NPM",
    r[r.SCREEN_NPM = 19] = "SCREEN_NPM",
    r[r.NONE = 20] = "NONE",
    r[r.SRC_OVER = 0] = "SRC_OVER",
    r[r.SRC_IN = 21] = "SRC_IN",
    r[r.SRC_OUT = 22] = "SRC_OUT",
    r[r.SRC_ATOP = 23] = "SRC_ATOP",
    r[r.DST_OVER = 24] = "DST_OVER",
    r[r.DST_IN = 25] = "DST_IN",
    r[r.DST_OUT = 26] = "DST_OUT",
    r[r.DST_ATOP = 27] = "DST_ATOP",
    r[r.ERASE = 26] = "ERASE",
    r[r.SUBTRACT = 28] = "SUBTRACT",
    r[r.XOR = 29] = "XOR"
}
)($r || ($r = {}));
var Zr;
(function(r) {
    r[r.POINTS = 0] = "POINTS",
    r[r.LINES = 1] = "LINES",
    r[r.LINE_LOOP = 2] = "LINE_LOOP",
    r[r.LINE_STRIP = 3] = "LINE_STRIP",
    r[r.TRIANGLES = 4] = "TRIANGLES",
    r[r.TRIANGLE_STRIP = 5] = "TRIANGLE_STRIP",
    r[r.TRIANGLE_FAN = 6] = "TRIANGLE_FAN"
}
)(Zr || (Zr = {}));
var Yr;
(function(r) {
    r[r.RGBA = 6408] = "RGBA",
    r[r.RGB = 6407] = "RGB",
    r[r.RG = 33319] = "RG",
    r[r.RED = 6403] = "RED",
    r[r.RGBA_INTEGER = 36249] = "RGBA_INTEGER",
    r[r.RGB_INTEGER = 36248] = "RGB_INTEGER",
    r[r.RG_INTEGER = 33320] = "RG_INTEGER",
    r[r.RED_INTEGER = 36244] = "RED_INTEGER",
    r[r.ALPHA = 6406] = "ALPHA",
    r[r.LUMINANCE = 6409] = "LUMINANCE",
    r[r.LUMINANCE_ALPHA = 6410] = "LUMINANCE_ALPHA",
    r[r.DEPTH_COMPONENT = 6402] = "DEPTH_COMPONENT",
    r[r.DEPTH_STENCIL = 34041] = "DEPTH_STENCIL"
}
)(Yr || (Yr = {}));
var Kr;
(function(r) {
    r[r.TEXTURE_2D = 3553] = "TEXTURE_2D",
    r[r.TEXTURE_CUBE_MAP = 34067] = "TEXTURE_CUBE_MAP",
    r[r.TEXTURE_2D_ARRAY = 35866] = "TEXTURE_2D_ARRAY",
    r[r.TEXTURE_CUBE_MAP_POSITIVE_X = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X",
    r[r.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X",
    r[r.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y",
    r[r.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y",
    r[r.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z",
    r[r.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z"
}
)(Kr || (Kr = {}));
var Jr;
(function(r) {
    r[r.UNSIGNED_BYTE = 5121] = "UNSIGNED_BYTE",
    r[r.UNSIGNED_SHORT = 5123] = "UNSIGNED_SHORT",
    r[r.UNSIGNED_SHORT_5_6_5 = 33635] = "UNSIGNED_SHORT_5_6_5",
    r[r.UNSIGNED_SHORT_4_4_4_4 = 32819] = "UNSIGNED_SHORT_4_4_4_4",
    r[r.UNSIGNED_SHORT_5_5_5_1 = 32820] = "UNSIGNED_SHORT_5_5_5_1",
    r[r.UNSIGNED_INT = 5125] = "UNSIGNED_INT",
    r[r.UNSIGNED_INT_10F_11F_11F_REV = 35899] = "UNSIGNED_INT_10F_11F_11F_REV",
    r[r.UNSIGNED_INT_2_10_10_10_REV = 33640] = "UNSIGNED_INT_2_10_10_10_REV",
    r[r.UNSIGNED_INT_24_8 = 34042] = "UNSIGNED_INT_24_8",
    r[r.UNSIGNED_INT_5_9_9_9_REV = 35902] = "UNSIGNED_INT_5_9_9_9_REV",
    r[r.BYTE = 5120] = "BYTE",
    r[r.SHORT = 5122] = "SHORT",
    r[r.INT = 5124] = "INT",
    r[r.FLOAT = 5126] = "FLOAT",
    r[r.FLOAT_32_UNSIGNED_INT_24_8_REV = 36269] = "FLOAT_32_UNSIGNED_INT_24_8_REV",
    r[r.HALF_FLOAT = 36193] = "HALF_FLOAT"
}
)(Jr || (Jr = {}));
var Qr;
(function(r) {
    r[r.FLOAT = 0] = "FLOAT",
    r[r.INT = 1] = "INT",
    r[r.UINT = 2] = "UINT"
}
)(Qr || (Qr = {}));
var cr;
(function(r) {
    r[r.NEAREST = 0] = "NEAREST",
    r[r.LINEAR = 1] = "LINEAR"
}
)(cr || (cr = {}));
var dr;
(function(r) {
    r[r.CLAMP = 33071] = "CLAMP",
    r[r.REPEAT = 10497] = "REPEAT",
    r[r.MIRRORED_REPEAT = 33648] = "MIRRORED_REPEAT"
}
)(dr || (dr = {}));
var pr;
(function(r) {
    r[r.OFF = 0] = "OFF",
    r[r.POW2 = 1] = "POW2",
    r[r.ON = 2] = "ON",
    r[r.ON_MANUAL = 3] = "ON_MANUAL"
}
)(pr || (pr = {}));
var ti;
(function(r) {
    r[r.NPM = 0] = "NPM",
    r[r.UNPACK = 1] = "UNPACK",
    r[r.PMA = 2] = "PMA",
    r[r.NO_PREMULTIPLIED_ALPHA = 0] = "NO_PREMULTIPLIED_ALPHA",
    r[r.PREMULTIPLY_ON_UPLOAD = 1] = "PREMULTIPLY_ON_UPLOAD",
    r[r.PREMULTIPLY_ALPHA = 2] = "PREMULTIPLY_ALPHA",
    r[r.PREMULTIPLIED_ALPHA = 2] = "PREMULTIPLIED_ALPHA"
}
)(ti || (ti = {}));
var ei;
(function(r) {
    r[r.NO = 0] = "NO",
    r[r.YES = 1] = "YES",
    r[r.AUTO = 2] = "AUTO",
    r[r.BLEND = 0] = "BLEND",
    r[r.CLEAR = 1] = "CLEAR",
    r[r.BLIT = 2] = "BLIT"
}
)(ei || (ei = {}));
var vr;
(function(r) {
    r[r.AUTO = 0] = "AUTO",
    r[r.MANUAL = 1] = "MANUAL"
}
)(vr || (vr = {}));
var ie;
(function(r) {
    r.LOW = "lowp",
    r.MEDIUM = "mediump",
    r.HIGH = "highp"
}
)(ie || (ie = {}));
var ri;
(function(r) {
    r[r.NONE = 0] = "NONE",
    r[r.SCISSOR = 1] = "SCISSOR",
    r[r.STENCIL = 2] = "STENCIL",
    r[r.SPRITE = 3] = "SPRITE",
    r[r.COLOR = 4] = "COLOR"
}
)(ri || (ri = {}));
var ii;
(function(r) {
    r[r.RED = 1] = "RED",
    r[r.GREEN = 2] = "GREEN",
    r[r.BLUE = 4] = "BLUE",
    r[r.ALPHA = 8] = "ALPHA"
}
)(ii || (ii = {}));
var _r;
(function(r) {
    r[r.NONE = 0] = "NONE",
    r[r.LOW = 2] = "LOW",
    r[r.MEDIUM = 4] = "MEDIUM",
    r[r.HIGH = 8] = "HIGH"
}
)(_r || (_r = {}));
var ni;
(function(r) {
    r[r.ELEMENT_ARRAY_BUFFER = 34963] = "ELEMENT_ARRAY_BUFFER",
    r[r.ARRAY_BUFFER = 34962] = "ARRAY_BUFFER",
    r[r.UNIFORM_BUFFER = 35345] = "UNIFORM_BUFFER"
}
)(ni || (ni = {}));
var Vn = {
    createCanvas: function(r, t) {
        var e = document.createElement("canvas");
        return e.width = r,
        e.height = t,
        e
    },
    getWebGLRenderingContext: function() {
        return WebGLRenderingContext
    },
    getNavigator: function() {
        return navigator
    },
    getBaseUrl: function() {
        var r;
        return (r = document.baseURI) !== null && r !== void 0 ? r : window.location.href
    },
    fetch: function(r, t) {
        return fetch(r, t)
    }
}
  , ze = /iPhone/i
  , si = /iPod/i
  , oi = /iPad/i
  , ai = /\biOS-universal(?:.+)Mac\b/i
  , We = /\bAndroid(?:.+)Mobile\b/i
  , ui = /Android/i
  , zt = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i
  , Ee = /Silk/i
  , vt = /Windows Phone/i
  , hi = /\bWindows(?:.+)ARM\b/i
  , fi = /BlackBerry/i
  , li = /BB10/i
  , ci = /Opera Mini/i
  , di = /\b(CriOS|Chrome)(?:.+)Mobile/i
  , pi = /Mobile(?:.+)Firefox\b/i
  , vi = function(r) {
    return typeof r < "u" && r.platform === "MacIntel" && typeof r.maxTouchPoints == "number" && r.maxTouchPoints > 1 && typeof MSStream > "u"
};
function jn(r) {
    return function(t) {
        return t.test(r)
    }
}
function zn(r) {
    var t = {
        userAgent: "",
        platform: "",
        maxTouchPoints: 0
    };
    !r && typeof navigator < "u" ? t = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        maxTouchPoints: navigator.maxTouchPoints || 0
    } : typeof r == "string" ? t.userAgent = r : r && r.userAgent && (t = {
        userAgent: r.userAgent,
        platform: r.platform,
        maxTouchPoints: r.maxTouchPoints || 0
    });
    var e = t.userAgent
      , i = e.split("[FBAN");
    typeof i[1] < "u" && (e = i[0]),
    i = e.split("Twitter"),
    typeof i[1] < "u" && (e = i[0]);
    var n = jn(e)
      , s = {
        apple: {
            phone: n(ze) && !n(vt),
            ipod: n(si),
            tablet: !n(ze) && (n(oi) || vi(t)) && !n(vt),
            universal: n(ai),
            device: (n(ze) || n(si) || n(oi) || n(ai) || vi(t)) && !n(vt)
        },
        amazon: {
            phone: n(zt),
            tablet: !n(zt) && n(Ee),
            device: n(zt) || n(Ee)
        },
        android: {
            phone: !n(vt) && n(zt) || !n(vt) && n(We),
            tablet: !n(vt) && !n(zt) && !n(We) && (n(Ee) || n(ui)),
            device: !n(vt) && (n(zt) || n(Ee) || n(We) || n(ui)) || n(/\bokhttp\b/i)
        },
        windows: {
            phone: n(vt),
            tablet: n(hi),
            device: n(vt) || n(hi)
        },
        other: {
            blackberry: n(fi),
            blackberry10: n(li),
            opera: n(ci),
            firefox: n(pi),
            chrome: n(di),
            device: n(fi) || n(li) || n(ci) || n(pi) || n(di)
        },
        any: !1,
        phone: !1,
        tablet: !1
    };
    return s.any = s.apple.device || s.android.device || s.windows.device || s.other.device,
    s.phone = s.apple.phone || s.android.phone || s.windows.phone,
    s.tablet = s.apple.tablet || s.android.tablet || s.windows.tablet,
    s
}
var Bt = zn(globalThis.navigator);
function Wn() {
    return !Bt.apple.device
}
function qn(r) {
    var t = !0;
    if (Bt.tablet || Bt.phone) {
        if (Bt.apple.device) {
            var e = navigator.userAgent.match(/OS (\d+)_(\d+)?/);
            if (e) {
                var i = parseInt(e[1], 10);
                i < 11 && (t = !1)
            }
        }
        if (Bt.android.device) {
            var e = navigator.userAgent.match(/Android\s([0-9.]*)/);
            if (e) {
                var i = parseInt(e[1], 10);
                i < 7 && (t = !1)
            }
        }
    }
    return t ? r : 4
}
var E = {
    ADAPTER: Vn,
    MIPMAP_TEXTURES: pr.POW2,
    ANISOTROPIC_LEVEL: 0,
    RESOLUTION: 1,
    FILTER_RESOLUTION: 1,
    FILTER_MULTISAMPLE: _r.NONE,
    SPRITE_MAX_TEXTURES: qn(32),
    SPRITE_BATCH_SIZE: 4096,
    RENDER_OPTIONS: {
        view: null,
        antialias: !1,
        autoDensity: !1,
        backgroundColor: 0,
        backgroundAlpha: 1,
        useContextAlpha: !0,
        clearBeforeRender: !0,
        preserveDrawingBuffer: !1,
        width: 800,
        height: 600,
        legacy: !1
    },
    GC_MODE: vr.AUTO,
    GC_MAX_IDLE: 60 * 60,
    GC_MAX_CHECK_COUNT: 60 * 10,
    WRAP_MODE: dr.CLAMP,
    SCALE_MODE: cr.LINEAR,
    PRECISION_VERTEX: ie.HIGH,
    PRECISION_FRAGMENT: Bt.apple.device ? ie.HIGH : ie.MEDIUM,
    CAN_UPLOAD_SAME_BUFFER: Wn(),
    CREATE_IMAGE_BITMAP: !1,
    ROUND_PIXELS: !1
};
/*!
 * @pixi/constants - v6.5.2
 * Compiled Wed, 24 Aug 2022 13:51:19 UTC
 *
 * @pixi/constants is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var bt;
(function(r) {
    r[r.WEBGL_LEGACY = 0] = "WEBGL_LEGACY",
    r[r.WEBGL = 1] = "WEBGL",
    r[r.WEBGL2 = 2] = "WEBGL2"
}
)(bt || (bt = {}));
var oe;
(function(r) {
    r[r.UNKNOWN = 0] = "UNKNOWN",
    r[r.WEBGL = 1] = "WEBGL",
    r[r.CANVAS = 2] = "CANVAS"
}
)(oe || (oe = {}));
var Ge;
(function(r) {
    r[r.COLOR = 16384] = "COLOR",
    r[r.DEPTH = 256] = "DEPTH",
    r[r.STENCIL = 1024] = "STENCIL"
}
)(Ge || (Ge = {}));
var I;
(function(r) {
    r[r.NORMAL = 0] = "NORMAL",
    r[r.ADD = 1] = "ADD",
    r[r.MULTIPLY = 2] = "MULTIPLY",
    r[r.SCREEN = 3] = "SCREEN",
    r[r.OVERLAY = 4] = "OVERLAY",
    r[r.DARKEN = 5] = "DARKEN",
    r[r.LIGHTEN = 6] = "LIGHTEN",
    r[r.COLOR_DODGE = 7] = "COLOR_DODGE",
    r[r.COLOR_BURN = 8] = "COLOR_BURN",
    r[r.HARD_LIGHT = 9] = "HARD_LIGHT",
    r[r.SOFT_LIGHT = 10] = "SOFT_LIGHT",
    r[r.DIFFERENCE = 11] = "DIFFERENCE",
    r[r.EXCLUSION = 12] = "EXCLUSION",
    r[r.HUE = 13] = "HUE",
    r[r.SATURATION = 14] = "SATURATION",
    r[r.COLOR = 15] = "COLOR",
    r[r.LUMINOSITY = 16] = "LUMINOSITY",
    r[r.NORMAL_NPM = 17] = "NORMAL_NPM",
    r[r.ADD_NPM = 18] = "ADD_NPM",
    r[r.SCREEN_NPM = 19] = "SCREEN_NPM",
    r[r.NONE = 20] = "NONE",
    r[r.SRC_OVER = 0] = "SRC_OVER",
    r[r.SRC_IN = 21] = "SRC_IN",
    r[r.SRC_OUT = 22] = "SRC_OUT",
    r[r.SRC_ATOP = 23] = "SRC_ATOP",
    r[r.DST_OVER = 24] = "DST_OVER",
    r[r.DST_IN = 25] = "DST_IN",
    r[r.DST_OUT = 26] = "DST_OUT",
    r[r.DST_ATOP = 27] = "DST_ATOP",
    r[r.ERASE = 26] = "ERASE",
    r[r.SUBTRACT = 28] = "SUBTRACT",
    r[r.XOR = 29] = "XOR"
}
)(I || (I = {}));
var ae;
(function(r) {
    r[r.POINTS = 0] = "POINTS",
    r[r.LINES = 1] = "LINES",
    r[r.LINE_LOOP = 2] = "LINE_LOOP",
    r[r.LINE_STRIP = 3] = "LINE_STRIP",
    r[r.TRIANGLES = 4] = "TRIANGLES",
    r[r.TRIANGLE_STRIP = 5] = "TRIANGLE_STRIP",
    r[r.TRIANGLE_FAN = 6] = "TRIANGLE_FAN"
}
)(ae || (ae = {}));
var m;
(function(r) {
    r[r.RGBA = 6408] = "RGBA",
    r[r.RGB = 6407] = "RGB",
    r[r.RG = 33319] = "RG",
    r[r.RED = 6403] = "RED",
    r[r.RGBA_INTEGER = 36249] = "RGBA_INTEGER",
    r[r.RGB_INTEGER = 36248] = "RGB_INTEGER",
    r[r.RG_INTEGER = 33320] = "RG_INTEGER",
    r[r.RED_INTEGER = 36244] = "RED_INTEGER",
    r[r.ALPHA = 6406] = "ALPHA",
    r[r.LUMINANCE = 6409] = "LUMINANCE",
    r[r.LUMINANCE_ALPHA = 6410] = "LUMINANCE_ALPHA",
    r[r.DEPTH_COMPONENT = 6402] = "DEPTH_COMPONENT",
    r[r.DEPTH_STENCIL = 34041] = "DEPTH_STENCIL"
}
)(m || (m = {}));
var kt;
(function(r) {
    r[r.TEXTURE_2D = 3553] = "TEXTURE_2D",
    r[r.TEXTURE_CUBE_MAP = 34067] = "TEXTURE_CUBE_MAP",
    r[r.TEXTURE_2D_ARRAY = 35866] = "TEXTURE_2D_ARRAY",
    r[r.TEXTURE_CUBE_MAP_POSITIVE_X = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X",
    r[r.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X",
    r[r.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y",
    r[r.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y",
    r[r.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z",
    r[r.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z"
}
)(kt || (kt = {}));
var N;
(function(r) {
    r[r.UNSIGNED_BYTE = 5121] = "UNSIGNED_BYTE",
    r[r.UNSIGNED_SHORT = 5123] = "UNSIGNED_SHORT",
    r[r.UNSIGNED_SHORT_5_6_5 = 33635] = "UNSIGNED_SHORT_5_6_5",
    r[r.UNSIGNED_SHORT_4_4_4_4 = 32819] = "UNSIGNED_SHORT_4_4_4_4",
    r[r.UNSIGNED_SHORT_5_5_5_1 = 32820] = "UNSIGNED_SHORT_5_5_5_1",
    r[r.UNSIGNED_INT = 5125] = "UNSIGNED_INT",
    r[r.UNSIGNED_INT_10F_11F_11F_REV = 35899] = "UNSIGNED_INT_10F_11F_11F_REV",
    r[r.UNSIGNED_INT_2_10_10_10_REV = 33640] = "UNSIGNED_INT_2_10_10_10_REV",
    r[r.UNSIGNED_INT_24_8 = 34042] = "UNSIGNED_INT_24_8",
    r[r.UNSIGNED_INT_5_9_9_9_REV = 35902] = "UNSIGNED_INT_5_9_9_9_REV",
    r[r.BYTE = 5120] = "BYTE",
    r[r.SHORT = 5122] = "SHORT",
    r[r.INT = 5124] = "INT",
    r[r.FLOAT = 5126] = "FLOAT",
    r[r.FLOAT_32_UNSIGNED_INT_24_8_REV = 36269] = "FLOAT_32_UNSIGNED_INT_24_8_REV",
    r[r.HALF_FLOAT = 36193] = "HALF_FLOAT"
}
)(N || (N = {}));
var Be;
(function(r) {
    r[r.FLOAT = 0] = "FLOAT",
    r[r.INT = 1] = "INT",
    r[r.UINT = 2] = "UINT"
}
)(Be || (Be = {}));
var mt;
(function(r) {
    r[r.NEAREST = 0] = "NEAREST",
    r[r.LINEAR = 1] = "LINEAR"
}
)(mt || (mt = {}));
var yr;
(function(r) {
    r[r.CLAMP = 33071] = "CLAMP",
    r[r.REPEAT = 10497] = "REPEAT",
    r[r.MIRRORED_REPEAT = 33648] = "MIRRORED_REPEAT"
}
)(yr || (yr = {}));
var Dt;
(function(r) {
    r[r.OFF = 0] = "OFF",
    r[r.POW2 = 1] = "POW2",
    r[r.ON = 2] = "ON",
    r[r.ON_MANUAL = 3] = "ON_MANUAL"
}
)(Dt || (Dt = {}));
var wt;
(function(r) {
    r[r.NPM = 0] = "NPM",
    r[r.UNPACK = 1] = "UNPACK",
    r[r.PMA = 2] = "PMA",
    r[r.NO_PREMULTIPLIED_ALPHA = 0] = "NO_PREMULTIPLIED_ALPHA",
    r[r.PREMULTIPLY_ON_UPLOAD = 1] = "PREMULTIPLY_ON_UPLOAD",
    r[r.PREMULTIPLY_ALPHA = 2] = "PREMULTIPLY_ALPHA",
    r[r.PREMULTIPLIED_ALPHA = 2] = "PREMULTIPLIED_ALPHA"
}
)(wt || (wt = {}));
var Tt;
(function(r) {
    r[r.NO = 0] = "NO",
    r[r.YES = 1] = "YES",
    r[r.AUTO = 2] = "AUTO",
    r[r.BLEND = 0] = "BLEND",
    r[r.CLEAR = 1] = "CLEAR",
    r[r.BLIT = 2] = "BLIT"
}
)(Tt || (Tt = {}));
var gr;
(function(r) {
    r[r.AUTO = 0] = "AUTO",
    r[r.MANUAL = 1] = "MANUAL"
}
)(gr || (gr = {}));
var lt;
(function(r) {
    r.LOW = "lowp",
    r.MEDIUM = "mediump",
    r.HIGH = "highp"
}
)(lt || (lt = {}));
var H;
(function(r) {
    r[r.NONE = 0] = "NONE",
    r[r.SCISSOR = 1] = "SCISSOR",
    r[r.STENCIL = 2] = "STENCIL",
    r[r.SPRITE = 3] = "SPRITE",
    r[r.COLOR = 4] = "COLOR"
}
)(H || (H = {}));
var _i;
(function(r) {
    r[r.RED = 1] = "RED",
    r[r.GREEN = 2] = "GREEN",
    r[r.BLUE = 4] = "BLUE",
    r[r.ALPHA = 8] = "ALPHA"
}
)(_i || (_i = {}));
var B;
(function(r) {
    r[r.NONE = 0] = "NONE",
    r[r.LOW = 2] = "LOW",
    r[r.MEDIUM = 4] = "MEDIUM",
    r[r.HIGH = 8] = "HIGH"
}
)(B || (B = {}));
var ct;
(function(r) {
    r[r.ELEMENT_ARRAY_BUFFER = 34963] = "ELEMENT_ARRAY_BUFFER",
    r[r.ARRAY_BUFFER = 34962] = "ARRAY_BUFFER",
    r[r.UNIFORM_BUFFER = 35345] = "UNIFORM_BUFFER"
}
)(ct || (ct = {}));
var qe = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}
  , mr = {}
  , $n = {
    get exports() {
        return mr
    },
    set exports(r) {
        mr = r
    }
};
(function(r) {
    var t = Object.prototype.hasOwnProperty
      , e = "~";
    function i() {}
    Object.create && (i.prototype = Object.create(null),
    new i().__proto__ || (e = !1));
    function n(u, h, f) {
        this.fn = u,
        this.context = h,
        this.once = f || !1
    }
    function s(u, h, f, l, c) {
        if (typeof f != "function")
            throw new TypeError("The listener must be a function");
        var d = new n(f,l || u,c)
          , p = e ? e + h : h;
        return u._events[p] ? u._events[p].fn ? u._events[p] = [u._events[p], d] : u._events[p].push(d) : (u._events[p] = d,
        u._eventsCount++),
        u
    }
    function o(u, h) {
        --u._eventsCount === 0 ? u._events = new i : delete u._events[h]
    }
    function a() {
        this._events = new i,
        this._eventsCount = 0
    }
    a.prototype.eventNames = function() {
        var h = [], f, l;
        if (this._eventsCount === 0)
            return h;
        for (l in f = this._events)
            t.call(f, l) && h.push(e ? l.slice(1) : l);
        return Object.getOwnPropertySymbols ? h.concat(Object.getOwnPropertySymbols(f)) : h
    }
    ,
    a.prototype.listeners = function(h) {
        var f = e ? e + h : h
          , l = this._events[f];
        if (!l)
            return [];
        if (l.fn)
            return [l.fn];
        for (var c = 0, d = l.length, p = new Array(d); c < d; c++)
            p[c] = l[c].fn;
        return p
    }
    ,
    a.prototype.listenerCount = function(h) {
        var f = e ? e + h : h
          , l = this._events[f];
        return l ? l.fn ? 1 : l.length : 0
    }
    ,
    a.prototype.emit = function(h, f, l, c, d, p) {
        var y = e ? e + h : h;
        if (!this._events[y])
            return !1;
        var v = this._events[y], T = arguments.length, g, _;
        if (v.fn) {
            switch (v.once && this.removeListener(h, v.fn, void 0, !0),
            T) {
            case 1:
                return v.fn.call(v.context),
                !0;
            case 2:
                return v.fn.call(v.context, f),
                !0;
            case 3:
                return v.fn.call(v.context, f, l),
                !0;
            case 4:
                return v.fn.call(v.context, f, l, c),
                !0;
            case 5:
                return v.fn.call(v.context, f, l, c, d),
                !0;
            case 6:
                return v.fn.call(v.context, f, l, c, d, p),
                !0
            }
            for (_ = 1,
            g = new Array(T - 1); _ < T; _++)
                g[_ - 1] = arguments[_];
            v.fn.apply(v.context, g)
        } else {
            var b = v.length, A;
            for (_ = 0; _ < b; _++)
                switch (v[_].once && this.removeListener(h, v[_].fn, void 0, !0),
                T) {
                case 1:
                    v[_].fn.call(v[_].context);
                    break;
                case 2:
                    v[_].fn.call(v[_].context, f);
                    break;
                case 3:
                    v[_].fn.call(v[_].context, f, l);
                    break;
                case 4:
                    v[_].fn.call(v[_].context, f, l, c);
                    break;
                default:
                    if (!g)
                        for (A = 1,
                        g = new Array(T - 1); A < T; A++)
                            g[A - 1] = arguments[A];
                    v[_].fn.apply(v[_].context, g)
                }
        }
        return !0
    }
    ,
    a.prototype.on = function(h, f, l) {
        return s(this, h, f, l, !1)
    }
    ,
    a.prototype.once = function(h, f, l) {
        return s(this, h, f, l, !0)
    }
    ,
    a.prototype.removeListener = function(h, f, l, c) {
        var d = e ? e + h : h;
        if (!this._events[d])
            return this;
        if (!f)
            return o(this, d),
            this;
        var p = this._events[d];
        if (p.fn)
            p.fn === f && (!c || p.once) && (!l || p.context === l) && o(this, d);
        else {
            for (var y = 0, v = [], T = p.length; y < T; y++)
                (p[y].fn !== f || c && !p[y].once || l && p[y].context !== l) && v.push(p[y]);
            v.length ? this._events[d] = v.length === 1 ? v[0] : v : o(this, d)
        }
        return this
    }
    ,
    a.prototype.removeAllListeners = function(h) {
        var f;
        return h ? (f = e ? e + h : h,
        this._events[f] && o(this, f)) : (this._events = new i,
        this._eventsCount = 0),
        this
    }
    ,
    a.prototype.off = a.prototype.removeListener,
    a.prototype.addListener = a.prototype.on,
    a.prefixed = e,
    a.EventEmitter = a,
    r.exports = a
}
)($n);
const At = mr;
var br = {}
  , Zn = {
    get exports() {
        return br
    },
    set exports(r) {
        br = r
    }
};
Zn.exports = He;
br.default = He;
function He(r, t, e) {
    e = e || 2;
    var i = t && t.length
      , n = i ? t[0] * e : r.length
      , s = Yi(r, 0, n, e, !0)
      , o = [];
    if (!s || s.next === s.prev)
        return o;
    var a, u, h, f, l, c, d;
    if (i && (s = ts(r, t, s, e)),
    r.length > 80 * e) {
        a = h = r[0],
        u = f = r[1];
        for (var p = e; p < n; p += e)
            l = r[p],
            c = r[p + 1],
            l < a && (a = l),
            c < u && (u = c),
            l > h && (h = l),
            c > f && (f = c);
        d = Math.max(h - a, f - u),
        d = d !== 0 ? 32767 / d : 0
    }
    return ue(s, o, e, a, u, d, 0),
    o
}
function Yi(r, t, e, i, n) {
    var s, o;
    if (n === Tr(r, t, e, i) > 0)
        for (s = t; s < e; s += i)
            o = yi(s, r[s], r[s + 1], o);
    else
        for (s = e - i; s >= t; s -= i)
            o = yi(s, r[s], r[s + 1], o);
    return o && Xe(o, o.next) && (fe(o),
    o = o.next),
    o
}
function Ht(r, t) {
    if (!r)
        return r;
    t || (t = r);
    var e = r, i;
    do
        if (i = !1,
        !e.steiner && (Xe(e, e.next) || U(e.prev, e, e.next) === 0)) {
            if (fe(e),
            e = t = e.prev,
            e === e.next)
                break;
            i = !0
        } else
            e = e.next;
    while (i || e !== t);
    return t
}
function ue(r, t, e, i, n, s, o) {
    if (r) {
        !o && s && ss(r, i, n, s);
        for (var a = r, u, h; r.prev !== r.next; ) {
            if (u = r.prev,
            h = r.next,
            s ? Kn(r, i, n, s) : Yn(r)) {
                t.push(u.i / e | 0),
                t.push(r.i / e | 0),
                t.push(h.i / e | 0),
                fe(r),
                r = h.next,
                a = h.next;
                continue
            }
            if (r = h,
            r === a) {
                o ? o === 1 ? (r = Jn(Ht(r), t, e),
                ue(r, t, e, i, n, s, 2)) : o === 2 && Qn(r, t, e, i, n, s) : ue(Ht(r), t, e, i, n, s, 1);
                break
            }
        }
    }
}
function Yn(r) {
    var t = r.prev
      , e = r
      , i = r.next;
    if (U(t, e, i) >= 0)
        return !1;
    for (var n = t.x, s = e.x, o = i.x, a = t.y, u = e.y, h = i.y, f = n < s ? n < o ? n : o : s < o ? s : o, l = a < u ? a < h ? a : h : u < h ? u : h, c = n > s ? n > o ? n : o : s > o ? s : o, d = a > u ? a > h ? a : h : u > h ? u : h, p = i.next; p !== t; ) {
        if (p.x >= f && p.x <= c && p.y >= l && p.y <= d && Wt(n, a, s, u, o, h, p.x, p.y) && U(p.prev, p, p.next) >= 0)
            return !1;
        p = p.next
    }
    return !0
}
function Kn(r, t, e, i) {
    var n = r.prev
      , s = r
      , o = r.next;
    if (U(n, s, o) >= 0)
        return !1;
    for (var a = n.x, u = s.x, h = o.x, f = n.y, l = s.y, c = o.y, d = a < u ? a < h ? a : h : u < h ? u : h, p = f < l ? f < c ? f : c : l < c ? l : c, y = a > u ? a > h ? a : h : u > h ? u : h, v = f > l ? f > c ? f : c : l > c ? l : c, T = xr(d, p, t, e, i), g = xr(y, v, t, e, i), _ = r.prevZ, b = r.nextZ; _ && _.z >= T && b && b.z <= g; ) {
        if (_.x >= d && _.x <= y && _.y >= p && _.y <= v && _ !== n && _ !== o && Wt(a, f, u, l, h, c, _.x, _.y) && U(_.prev, _, _.next) >= 0 || (_ = _.prevZ,
        b.x >= d && b.x <= y && b.y >= p && b.y <= v && b !== n && b !== o && Wt(a, f, u, l, h, c, b.x, b.y) && U(b.prev, b, b.next) >= 0))
            return !1;
        b = b.nextZ
    }
    for (; _ && _.z >= T; ) {
        if (_.x >= d && _.x <= y && _.y >= p && _.y <= v && _ !== n && _ !== o && Wt(a, f, u, l, h, c, _.x, _.y) && U(_.prev, _, _.next) >= 0)
            return !1;
        _ = _.prevZ
    }
    for (; b && b.z <= g; ) {
        if (b.x >= d && b.x <= y && b.y >= p && b.y <= v && b !== n && b !== o && Wt(a, f, u, l, h, c, b.x, b.y) && U(b.prev, b, b.next) >= 0)
            return !1;
        b = b.nextZ
    }
    return !0
}
function Jn(r, t, e) {
    var i = r;
    do {
        var n = i.prev
          , s = i.next.next;
        !Xe(n, s) && Ki(n, i, i.next, s) && he(n, s) && he(s, n) && (t.push(n.i / e | 0),
        t.push(i.i / e | 0),
        t.push(s.i / e | 0),
        fe(i),
        fe(i.next),
        i = r = s),
        i = i.next
    } while (i !== r);
    return Ht(i)
}
function Qn(r, t, e, i, n, s) {
    var o = r;
    do {
        for (var a = o.next.next; a !== o.prev; ) {
            if (o.i !== a.i && us(o, a)) {
                var u = Ji(o, a);
                o = Ht(o, o.next),
                u = Ht(u, u.next),
                ue(o, t, e, i, n, s, 0),
                ue(u, t, e, i, n, s, 0);
                return
            }
            a = a.next
        }
        o = o.next
    } while (o !== r)
}
function ts(r, t, e, i) {
    var n = [], s, o, a, u, h;
    for (s = 0,
    o = t.length; s < o; s++)
        a = t[s] * i,
        u = s < o - 1 ? t[s + 1] * i : r.length,
        h = Yi(r, a, u, i, !1),
        h === h.next && (h.steiner = !0),
        n.push(as(h));
    for (n.sort(es),
    s = 0; s < n.length; s++)
        e = rs(n[s], e);
    return e
}
function es(r, t) {
    return r.x - t.x
}
function rs(r, t) {
    var e = is(r, t);
    if (!e)
        return t;
    var i = Ji(e, r);
    return Ht(i, i.next),
    Ht(e, e.next)
}
function is(r, t) {
    var e = t, i = r.x, n = r.y, s = -1 / 0, o;
    do {
        if (n <= e.y && n >= e.next.y && e.next.y !== e.y) {
            var a = e.x + (n - e.y) * (e.next.x - e.x) / (e.next.y - e.y);
            if (a <= i && a > s && (s = a,
            o = e.x < e.next.x ? e : e.next,
            a === i))
                return o
        }
        e = e.next
    } while (e !== t);
    if (!o)
        return null;
    var u = o, h = o.x, f = o.y, l = 1 / 0, c;
    e = o;
    do
        i >= e.x && e.x >= h && i !== e.x && Wt(n < f ? i : s, n, h, f, n < f ? s : i, n, e.x, e.y) && (c = Math.abs(n - e.y) / (i - e.x),
        he(e, r) && (c < l || c === l && (e.x > o.x || e.x === o.x && ns(o, e))) && (o = e,
        l = c)),
        e = e.next;
    while (e !== u);
    return o
}
function ns(r, t) {
    return U(r.prev, r, t.prev) < 0 && U(t.next, r, r.next) < 0
}
function ss(r, t, e, i) {
    var n = r;
    do
        n.z === 0 && (n.z = xr(n.x, n.y, t, e, i)),
        n.prevZ = n.prev,
        n.nextZ = n.next,
        n = n.next;
    while (n !== r);
    n.prevZ.nextZ = null,
    n.prevZ = null,
    os(n)
}
function os(r) {
    var t, e, i, n, s, o, a, u, h = 1;
    do {
        for (e = r,
        r = null,
        s = null,
        o = 0; e; ) {
            for (o++,
            i = e,
            a = 0,
            t = 0; t < h && (a++,
            i = i.nextZ,
            !!i); t++)
                ;
            for (u = h; a > 0 || u > 0 && i; )
                a !== 0 && (u === 0 || !i || e.z <= i.z) ? (n = e,
                e = e.nextZ,
                a--) : (n = i,
                i = i.nextZ,
                u--),
                s ? s.nextZ = n : r = n,
                n.prevZ = s,
                s = n;
            e = i
        }
        s.nextZ = null,
        h *= 2
    } while (o > 1);
    return r
}
function xr(r, t, e, i, n) {
    return r = (r - e) * n | 0,
    t = (t - i) * n | 0,
    r = (r | r << 8) & 16711935,
    r = (r | r << 4) & 252645135,
    r = (r | r << 2) & 858993459,
    r = (r | r << 1) & 1431655765,
    t = (t | t << 8) & 16711935,
    t = (t | t << 4) & 252645135,
    t = (t | t << 2) & 858993459,
    t = (t | t << 1) & 1431655765,
    r | t << 1
}
function as(r) {
    var t = r
      , e = r;
    do
        (t.x < e.x || t.x === e.x && t.y < e.y) && (e = t),
        t = t.next;
    while (t !== r);
    return e
}
function Wt(r, t, e, i, n, s, o, a) {
    return (n - o) * (t - a) >= (r - o) * (s - a) && (r - o) * (i - a) >= (e - o) * (t - a) && (e - o) * (s - a) >= (n - o) * (i - a)
}
function us(r, t) {
    return r.next.i !== t.i && r.prev.i !== t.i && !hs(r, t) && (he(r, t) && he(t, r) && fs(r, t) && (U(r.prev, r, t.prev) || U(r, t.prev, t)) || Xe(r, t) && U(r.prev, r, r.next) > 0 && U(t.prev, t, t.next) > 0)
}
function U(r, t, e) {
    return (t.y - r.y) * (e.x - t.x) - (t.x - r.x) * (e.y - t.y)
}
function Xe(r, t) {
    return r.x === t.x && r.y === t.y
}
function Ki(r, t, e, i) {
    var n = Ie(U(r, t, e))
      , s = Ie(U(r, t, i))
      , o = Ie(U(e, i, r))
      , a = Ie(U(e, i, t));
    return !!(n !== s && o !== a || n === 0 && Te(r, e, t) || s === 0 && Te(r, i, t) || o === 0 && Te(e, r, i) || a === 0 && Te(e, t, i))
}
function Te(r, t, e) {
    return t.x <= Math.max(r.x, e.x) && t.x >= Math.min(r.x, e.x) && t.y <= Math.max(r.y, e.y) && t.y >= Math.min(r.y, e.y)
}
function Ie(r) {
    return r > 0 ? 1 : r < 0 ? -1 : 0
}
function hs(r, t) {
    var e = r;
    do {
        if (e.i !== r.i && e.next.i !== r.i && e.i !== t.i && e.next.i !== t.i && Ki(e, e.next, r, t))
            return !0;
        e = e.next
    } while (e !== r);
    return !1
}
function he(r, t) {
    return U(r.prev, r, r.next) < 0 ? U(r, t, r.next) >= 0 && U(r, r.prev, t) >= 0 : U(r, t, r.prev) < 0 || U(r, r.next, t) < 0
}
function fs(r, t) {
    var e = r
      , i = !1
      , n = (r.x + t.x) / 2
      , s = (r.y + t.y) / 2;
    do
        e.y > s != e.next.y > s && e.next.y !== e.y && n < (e.next.x - e.x) * (s - e.y) / (e.next.y - e.y) + e.x && (i = !i),
        e = e.next;
    while (e !== r);
    return i
}
function Ji(r, t) {
    var e = new Er(r.i,r.x,r.y)
      , i = new Er(t.i,t.x,t.y)
      , n = r.next
      , s = t.prev;
    return r.next = t,
    t.prev = r,
    e.next = n,
    n.prev = e,
    i.next = e,
    e.prev = i,
    s.next = i,
    i.prev = s,
    i
}
function yi(r, t, e, i) {
    var n = new Er(r,t,e);
    return i ? (n.next = i.next,
    n.prev = i,
    i.next.prev = n,
    i.next = n) : (n.prev = n,
    n.next = n),
    n
}
function fe(r) {
    r.next.prev = r.prev,
    r.prev.next = r.next,
    r.prevZ && (r.prevZ.nextZ = r.nextZ),
    r.nextZ && (r.nextZ.prevZ = r.prevZ)
}
function Er(r, t, e) {
    this.i = r,
    this.x = t,
    this.y = e,
    this.prev = null,
    this.next = null,
    this.z = 0,
    this.prevZ = null,
    this.nextZ = null,
    this.steiner = !1
}
He.deviation = function(r, t, e, i) {
    var n = t && t.length
      , s = n ? t[0] * e : r.length
      , o = Math.abs(Tr(r, 0, s, e));
    if (n)
        for (var a = 0, u = t.length; a < u; a++) {
            var h = t[a] * e
              , f = a < u - 1 ? t[a + 1] * e : r.length;
            o -= Math.abs(Tr(r, h, f, e))
        }
    var l = 0;
    for (a = 0; a < i.length; a += 3) {
        var c = i[a] * e
          , d = i[a + 1] * e
          , p = i[a + 2] * e;
        l += Math.abs((r[c] - r[p]) * (r[d + 1] - r[c + 1]) - (r[c] - r[d]) * (r[p + 1] - r[c + 1]))
    }
    return o === 0 && l === 0 ? 0 : Math.abs((l - o) / o)
}
;
function Tr(r, t, e, i) {
    for (var n = 0, s = t, o = e - i; s < e; s += i)
        n += (r[o] - r[s]) * (r[s + 1] + r[o + 1]),
        o = s;
    return n
}
He.flatten = function(r) {
    for (var t = r[0][0].length, e = {
        vertices: [],
        holes: [],
        dimensions: t
    }, i = 0, n = 0; n < r.length; n++) {
        for (var s = 0; s < r[n].length; s++)
            for (var o = 0; o < t; o++)
                e.vertices.push(r[n][s][o]);
        n > 0 && (i += r[n - 1].length,
        e.holes.push(i))
    }
    return e
}
;
var ke = {}
  , ls = {
    get exports() {
        return ke
    },
    set exports(r) {
        ke = r
    }
};
/*! https://mths.be/punycode v1.3.2 by @mathias */
(function(r, t) {
    (function(e) {
        var i = t && !t.nodeType && t
          , n = r && !r.nodeType && r
          , s = typeof qe == "object" && qe;
        (s.global === s || s.window === s || s.self === s) && (e = s);
        var o, a = 2147483647, u = 36, h = 1, f = 26, l = 38, c = 700, d = 72, p = 128, y = "-", v = /^xn--/, T = /[^\x20-\x7E]/, g = /[\x2E\u3002\uFF0E\uFF61]/g, _ = {
            overflow: "Overflow: input needs wider integers to process",
            "not-basic": "Illegal input >= 0x80 (not a basic code point)",
            "invalid-input": "Invalid input"
        }, b = u - h, A = Math.floor, C = String.fromCharCode, k;
        function D(x) {
            throw RangeError(_[x])
        }
        function W(x, R) {
            for (var O = x.length, S = []; O--; )
                S[O] = R(x[O]);
            return S
        }
        function et(x, R) {
            var O = x.split("@")
              , S = "";
            O.length > 1 && (S = O[0] + "@",
            x = O[1]),
            x = x.replace(g, ".");
            var L = x.split(".")
              , Z = W(L, R).join(".");
            return S + Z
        }
        function dt(x) {
            for (var R = [], O = 0, S = x.length, L, Z; O < S; )
                L = x.charCodeAt(O++),
                L >= 55296 && L <= 56319 && O < S ? (Z = x.charCodeAt(O++),
                (Z & 64512) == 56320 ? R.push(((L & 1023) << 10) + (Z & 1023) + 65536) : (R.push(L),
                O--)) : R.push(L);
            return R
        }
        function ye(x) {
            return W(x, function(R) {
                var O = "";
                return R > 65535 && (R -= 65536,
                O += C(R >>> 10 & 1023 | 55296),
                R = 56320 | R & 1023),
                O += C(R),
                O
            }).join("")
        }
        function Nt(x) {
            return x - 48 < 10 ? x - 22 : x - 65 < 26 ? x - 65 : x - 97 < 26 ? x - 97 : u
        }
        function Xt(x, R) {
            return x + 22 + 75 * (x < 26) - ((R != 0) << 5)
        }
        function Vt(x, R, O) {
            var S = 0;
            for (x = O ? A(x / c) : x >> 1,
            x += A(x / R); x > b * f >> 1; S += u)
                x = A(x / b);
            return A(S + (b + 1) * x / (x + l))
        }
        function Ot(x) {
            var R = [], O = x.length, S, L = 0, Z = p, j = d, Y, ot, ht, pt, q, rt, at, xt, Ct;
            for (Y = x.lastIndexOf(y),
            Y < 0 && (Y = 0),
            ot = 0; ot < Y; ++ot)
                x.charCodeAt(ot) >= 128 && D("not-basic"),
                R.push(x.charCodeAt(ot));
            for (ht = Y > 0 ? Y + 1 : 0; ht < O; ) {
                for (pt = L,
                q = 1,
                rt = u; ht >= O && D("invalid-input"),
                at = Nt(x.charCodeAt(ht++)),
                (at >= u || at > A((a - L) / q)) && D("overflow"),
                L += at * q,
                xt = rt <= j ? h : rt >= j + f ? f : rt - j,
                !(at < xt); rt += u)
                    Ct = u - xt,
                    q > A(a / Ct) && D("overflow"),
                    q *= Ct;
                S = R.length + 1,
                j = Vt(L - pt, S, pt == 0),
                A(L / S) > a - Z && D("overflow"),
                Z += A(L / S),
                L %= S,
                R.splice(L++, 0, Z)
            }
            return ye(R)
        }
        function ge(x) {
            var R, O, S, L, Z, j, Y, ot, ht, pt, q, rt = [], at, xt, Ct, je;
            for (x = dt(x),
            at = x.length,
            R = p,
            O = 0,
            Z = d,
            j = 0; j < at; ++j)
                q = x[j],
                q < 128 && rt.push(C(q));
            for (S = L = rt.length,
            L && rt.push(y); S < at; ) {
                for (Y = a,
                j = 0; j < at; ++j)
                    q = x[j],
                    q >= R && q < Y && (Y = q);
                for (xt = S + 1,
                Y - R > A((a - O) / xt) && D("overflow"),
                O += (Y - R) * xt,
                R = Y,
                j = 0; j < at; ++j)
                    if (q = x[j],
                    q < R && ++O > a && D("overflow"),
                    q == R) {
                        for (ot = O,
                        ht = u; pt = ht <= Z ? h : ht >= Z + f ? f : ht - Z,
                        !(ot < pt); ht += u)
                            je = ot - pt,
                            Ct = u - pt,
                            rt.push(C(Xt(pt + je % Ct, 0))),
                            ot = A(je / Ct);
                        rt.push(C(Xt(ot, 0))),
                        Z = Vt(O, xt, S == L),
                        O = 0,
                        ++S
                    }
                ++O,
                ++R
            }
            return rt.join("")
        }
        function wn(x) {
            return et(x, function(R) {
                return v.test(R) ? Ot(R.slice(4).toLowerCase()) : R
            })
        }
        function Rn(x) {
            return et(x, function(R) {
                return T.test(R) ? "xn--" + ge(R) : R
            })
        }
        if (o = {
            version: "1.3.2",
            ucs2: {
                decode: dt,
                encode: ye
            },
            decode: Ot,
            encode: ge,
            toASCII: Rn,
            toUnicode: wn
        },
        i && n)
            if (r.exports == i)
                n.exports = o;
            else
                for (k in o)
                    o.hasOwnProperty(k) && (i[k] = o[k]);
        else
            e.punycode = o
    }
    )(qe)
}
)(ls, ke);
var cs = {
    isString: function(r) {
        return typeof r == "string"
    },
    isObject: function(r) {
        return typeof r == "object" && r !== null
    },
    isNull: function(r) {
        return r === null
    },
    isNullOrUndefined: function(r) {
        return r == null
    }
}
  , le = {};
function ds(r, t) {
    return Object.prototype.hasOwnProperty.call(r, t)
}
var ps = function(r, t, e, i) {
    t = t || "&",
    e = e || "=";
    var n = {};
    if (typeof r != "string" || r.length === 0)
        return n;
    var s = /\+/g;
    r = r.split(t);
    var o = 1e3;
    i && typeof i.maxKeys == "number" && (o = i.maxKeys);
    var a = r.length;
    o > 0 && a > o && (a = o);
    for (var u = 0; u < a; ++u) {
        var h = r[u].replace(s, "%20"), f = h.indexOf(e), l, c, d, p;
        f >= 0 ? (l = h.substr(0, f),
        c = h.substr(f + 1)) : (l = h,
        c = ""),
        d = decodeURIComponent(l),
        p = decodeURIComponent(c),
        ds(n, d) ? Array.isArray(n[d]) ? n[d].push(p) : n[d] = [n[d], p] : n[d] = p
    }
    return n
}
  , Jt = function(r) {
    switch (typeof r) {
    case "string":
        return r;
    case "boolean":
        return r ? "true" : "false";
    case "number":
        return isFinite(r) ? r : "";
    default:
        return ""
    }
}
  , vs = function(r, t, e, i) {
    return t = t || "&",
    e = e || "=",
    r === null && (r = void 0),
    typeof r == "object" ? Object.keys(r).map(function(n) {
        var s = encodeURIComponent(Jt(n)) + e;
        return Array.isArray(r[n]) ? r[n].map(function(o) {
            return s + encodeURIComponent(Jt(o))
        }).join(t) : s + encodeURIComponent(Jt(r[n]))
    }).join(t) : i ? encodeURIComponent(Jt(i)) + e + encodeURIComponent(Jt(r)) : ""
};
le.decode = le.parse = ps;
le.encode = le.stringify = vs;
var _s = ke
  , ft = cs
  , ys = Ve
  , gs = Os
  , ms = Ns;
function ut() {
    this.protocol = null,
    this.slashes = null,
    this.auth = null,
    this.host = null,
    this.port = null,
    this.hostname = null,
    this.hash = null,
    this.search = null,
    this.query = null,
    this.pathname = null,
    this.path = null,
    this.href = null
}
var bs = /^([a-z0-9.+-]+:)/i
  , xs = /:[0-9]*$/
  , Es = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/
  , Ts = ["<", ">", '"', "`", " ", "\r", `
`, "	"]
  , Is = ["{", "}", "|", "\\", "^", "`"].concat(Ts)
  , Ir = ["'"].concat(Is)
  , gi = ["%", "/", "?", ";", "#"].concat(Ir)
  , mi = ["/", "?", "#"]
  , ws = 255
  , bi = /^[+a-z0-9A-Z_-]{0,63}$/
  , Rs = /^([+a-z0-9A-Z_-]{0,63})(.*)$/
  , As = {
    javascript: !0,
    "javascript:": !0
}
  , wr = {
    javascript: !0,
    "javascript:": !0
}
  , qt = {
    http: !0,
    https: !0,
    ftp: !0,
    gopher: !0,
    file: !0,
    "http:": !0,
    "https:": !0,
    "ftp:": !0,
    "gopher:": !0,
    "file:": !0
}
  , Rr = le;
function Ve(r, t, e) {
    if (r && ft.isObject(r) && r instanceof ut)
        return r;
    var i = new ut;
    return i.parse(r, t, e),
    i
}
ut.prototype.parse = function(r, t, e) {
    if (!ft.isString(r))
        throw new TypeError("Parameter 'url' must be a string, not " + typeof r);
    var i = r.indexOf("?")
      , n = i !== -1 && i < r.indexOf("#") ? "?" : "#"
      , s = r.split(n)
      , o = /\\/g;
    s[0] = s[0].replace(o, "/"),
    r = s.join(n);
    var a = r;
    if (a = a.trim(),
    !e && r.split("#").length === 1) {
        var u = Es.exec(a);
        if (u)
            return this.path = a,
            this.href = a,
            this.pathname = u[1],
            u[2] ? (this.search = u[2],
            t ? this.query = Rr.parse(this.search.substr(1)) : this.query = this.search.substr(1)) : t && (this.search = "",
            this.query = {}),
            this
    }
    var h = bs.exec(a);
    if (h) {
        h = h[0];
        var f = h.toLowerCase();
        this.protocol = f,
        a = a.substr(h.length)
    }
    if (e || h || a.match(/^\/\/[^@\/]+@[^@\/]+/)) {
        var l = a.substr(0, 2) === "//";
        l && !(h && wr[h]) && (a = a.substr(2),
        this.slashes = !0)
    }
    if (!wr[h] && (l || h && !qt[h])) {
        for (var c = -1, d = 0; d < mi.length; d++) {
            var p = a.indexOf(mi[d]);
            p !== -1 && (c === -1 || p < c) && (c = p)
        }
        var y, v;
        c === -1 ? v = a.lastIndexOf("@") : v = a.lastIndexOf("@", c),
        v !== -1 && (y = a.slice(0, v),
        a = a.slice(v + 1),
        this.auth = decodeURIComponent(y)),
        c = -1;
        for (var d = 0; d < gi.length; d++) {
            var p = a.indexOf(gi[d]);
            p !== -1 && (c === -1 || p < c) && (c = p)
        }
        c === -1 && (c = a.length),
        this.host = a.slice(0, c),
        a = a.slice(c),
        this.parseHost(),
        this.hostname = this.hostname || "";
        var T = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
        if (!T)
            for (var g = this.hostname.split(/\./), d = 0, _ = g.length; d < _; d++) {
                var b = g[d];
                if (b && !b.match(bi)) {
                    for (var A = "", C = 0, k = b.length; C < k; C++)
                        b.charCodeAt(C) > 127 ? A += "x" : A += b[C];
                    if (!A.match(bi)) {
                        var D = g.slice(0, d)
                          , W = g.slice(d + 1)
                          , et = b.match(Rs);
                        et && (D.push(et[1]),
                        W.unshift(et[2])),
                        W.length && (a = "/" + W.join(".") + a),
                        this.hostname = D.join(".");
                        break
                    }
                }
            }
        this.hostname.length > ws ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(),
        T || (this.hostname = _s.toASCII(this.hostname));
        var dt = this.port ? ":" + this.port : ""
          , ye = this.hostname || "";
        this.host = ye + dt,
        this.href += this.host,
        T && (this.hostname = this.hostname.substr(1, this.hostname.length - 2),
        a[0] !== "/" && (a = "/" + a))
    }
    if (!As[f])
        for (var d = 0, _ = Ir.length; d < _; d++) {
            var Nt = Ir[d];
            if (a.indexOf(Nt) !== -1) {
                var Xt = encodeURIComponent(Nt);
                Xt === Nt && (Xt = escape(Nt)),
                a = a.split(Nt).join(Xt)
            }
        }
    var Vt = a.indexOf("#");
    Vt !== -1 && (this.hash = a.substr(Vt),
    a = a.slice(0, Vt));
    var Ot = a.indexOf("?");
    if (Ot !== -1 ? (this.search = a.substr(Ot),
    this.query = a.substr(Ot + 1),
    t && (this.query = Rr.parse(this.query)),
    a = a.slice(0, Ot)) : t && (this.search = "",
    this.query = {}),
    a && (this.pathname = a),
    qt[f] && this.hostname && !this.pathname && (this.pathname = "/"),
    this.pathname || this.search) {
        var dt = this.pathname || ""
          , ge = this.search || "";
        this.path = dt + ge
    }
    return this.href = this.format(),
    this
}
;
function Ns(r) {
    return ft.isString(r) && (r = Ve(r)),
    r instanceof ut ? r.format() : ut.prototype.format.call(r)
}
ut.prototype.format = function() {
    var r = this.auth || "";
    r && (r = encodeURIComponent(r),
    r = r.replace(/%3A/i, ":"),
    r += "@");
    var t = this.protocol || ""
      , e = this.pathname || ""
      , i = this.hash || ""
      , n = !1
      , s = "";
    this.host ? n = r + this.host : this.hostname && (n = r + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]"),
    this.port && (n += ":" + this.port)),
    this.query && ft.isObject(this.query) && Object.keys(this.query).length && (s = Rr.stringify(this.query));
    var o = this.search || s && "?" + s || "";
    return t && t.substr(-1) !== ":" && (t += ":"),
    this.slashes || (!t || qt[t]) && n !== !1 ? (n = "//" + (n || ""),
    e && e.charAt(0) !== "/" && (e = "/" + e)) : n || (n = ""),
    i && i.charAt(0) !== "#" && (i = "#" + i),
    o && o.charAt(0) !== "?" && (o = "?" + o),
    e = e.replace(/[?#]/g, function(a) {
        return encodeURIComponent(a)
    }),
    o = o.replace("#", "%23"),
    t + n + e + o + i
}
;
function Os(r, t) {
    return Ve(r, !1, !0).resolve(t)
}
ut.prototype.resolve = function(r) {
    return this.resolveObject(Ve(r, !1, !0)).format()
}
;
ut.prototype.resolveObject = function(r) {
    if (ft.isString(r)) {
        var t = new ut;
        t.parse(r, !1, !0),
        r = t
    }
    for (var e = new ut, i = Object.keys(this), n = 0; n < i.length; n++) {
        var s = i[n];
        e[s] = this[s]
    }
    if (e.hash = r.hash,
    r.href === "")
        return e.href = e.format(),
        e;
    if (r.slashes && !r.protocol) {
        for (var o = Object.keys(r), a = 0; a < o.length; a++) {
            var u = o[a];
            u !== "protocol" && (e[u] = r[u])
        }
        return qt[e.protocol] && e.hostname && !e.pathname && (e.path = e.pathname = "/"),
        e.href = e.format(),
        e
    }
    if (r.protocol && r.protocol !== e.protocol) {
        if (!qt[r.protocol]) {
            for (var h = Object.keys(r), f = 0; f < h.length; f++) {
                var l = h[f];
                e[l] = r[l]
            }
            return e.href = e.format(),
            e
        }
        if (e.protocol = r.protocol,
        !r.host && !wr[r.protocol]) {
            for (var _ = (r.pathname || "").split("/"); _.length && !(r.host = _.shift()); )
                ;
            r.host || (r.host = ""),
            r.hostname || (r.hostname = ""),
            _[0] !== "" && _.unshift(""),
            _.length < 2 && _.unshift(""),
            e.pathname = _.join("/")
        } else
            e.pathname = r.pathname;
        if (e.search = r.search,
        e.query = r.query,
        e.host = r.host || "",
        e.auth = r.auth,
        e.hostname = r.hostname || r.host,
        e.port = r.port,
        e.pathname || e.search) {
            var c = e.pathname || ""
              , d = e.search || "";
            e.path = c + d
        }
        return e.slashes = e.slashes || r.slashes,
        e.href = e.format(),
        e
    }
    var p = e.pathname && e.pathname.charAt(0) === "/"
      , y = r.host || r.pathname && r.pathname.charAt(0) === "/"
      , v = y || p || e.host && r.pathname
      , T = v
      , g = e.pathname && e.pathname.split("/") || []
      , _ = r.pathname && r.pathname.split("/") || []
      , b = e.protocol && !qt[e.protocol];
    if (b && (e.hostname = "",
    e.port = null,
    e.host && (g[0] === "" ? g[0] = e.host : g.unshift(e.host)),
    e.host = "",
    r.protocol && (r.hostname = null,
    r.port = null,
    r.host && (_[0] === "" ? _[0] = r.host : _.unshift(r.host)),
    r.host = null),
    v = v && (_[0] === "" || g[0] === "")),
    y)
        e.host = r.host || r.host === "" ? r.host : e.host,
        e.hostname = r.hostname || r.hostname === "" ? r.hostname : e.hostname,
        e.search = r.search,
        e.query = r.query,
        g = _;
    else if (_.length)
        g || (g = []),
        g.pop(),
        g = g.concat(_),
        e.search = r.search,
        e.query = r.query;
    else if (!ft.isNullOrUndefined(r.search)) {
        if (b) {
            e.hostname = e.host = g.shift();
            var A = e.host && e.host.indexOf("@") > 0 ? e.host.split("@") : !1;
            A && (e.auth = A.shift(),
            e.host = e.hostname = A.shift())
        }
        return e.search = r.search,
        e.query = r.query,
        (!ft.isNull(e.pathname) || !ft.isNull(e.search)) && (e.path = (e.pathname ? e.pathname : "") + (e.search ? e.search : "")),
        e.href = e.format(),
        e
    }
    if (!g.length)
        return e.pathname = null,
        e.search ? e.path = "/" + e.search : e.path = null,
        e.href = e.format(),
        e;
    for (var C = g.slice(-1)[0], k = (e.host || r.host || g.length > 1) && (C === "." || C === "..") || C === "", D = 0, W = g.length; W >= 0; W--)
        C = g[W],
        C === "." ? g.splice(W, 1) : C === ".." ? (g.splice(W, 1),
        D++) : D && (g.splice(W, 1),
        D--);
    if (!v && !T)
        for (; D--; D)
            g.unshift("..");
    v && g[0] !== "" && (!g[0] || g[0].charAt(0) !== "/") && g.unshift(""),
    k && g.join("/").substr(-1) !== "/" && g.push("");
    var et = g[0] === "" || g[0] && g[0].charAt(0) === "/";
    if (b) {
        e.hostname = e.host = et ? "" : g.length ? g.shift() : "";
        var A = e.host && e.host.indexOf("@") > 0 ? e.host.split("@") : !1;
        A && (e.auth = A.shift(),
        e.host = e.hostname = A.shift())
    }
    return v = v || e.host && g.length,
    v && !et && g.unshift(""),
    g.length ? e.pathname = g.join("/") : (e.pathname = null,
    e.path = null),
    (!ft.isNull(e.pathname) || !ft.isNull(e.search)) && (e.path = (e.pathname ? e.pathname : "") + (e.search ? e.search : "")),
    e.auth = r.auth || e.auth,
    e.slashes = e.slashes || r.slashes,
    e.href = e.format(),
    e
}
;
ut.prototype.parseHost = function() {
    var r = this.host
      , t = xs.exec(r);
    t && (t = t[0],
    t !== ":" && (this.port = t.substr(1)),
    r = r.substr(0, r.length - t.length)),
    r && (this.hostname = r)
}
;
/*!
 * @pixi/utils - v6.5.2
 * Compiled Wed, 24 Aug 2022 13:51:19 UTC
 *
 * @pixi/utils is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var Cs = {
    parse: ys,
    format: ms,
    resolve: gs
};
E.RETINA_PREFIX = /@([0-9\.]+)x/;
E.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT = !1;
var xi = !1
  , Ei = "6.5.2";
function Ps(r) {
    var t;
    if (!xi) {
        if (E.ADAPTER.getNavigator().userAgent.toLowerCase().indexOf("chrome") > -1) {
            var e = [`
 %c %c %c PixiJS ` + Ei + " - ✰ " + r + ` ✰  %c  %c  http://www.pixijs.com/  %c %c ♥%c♥%c♥ 

`, "background: #ff66a5; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "color: #ff66a5; background: #030307; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "background: #ffc3dc; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;"];
            (t = globalThis.console).log.apply(t, e)
        } else
            globalThis.console && globalThis.console.log("PixiJS " + Ei + " - " + r + " - http://www.pixijs.com/");
        xi = !0
    }
}
var $e;
function Ss() {
    return typeof $e > "u" && ($e = function() {
        var t = {
            stencil: !0,
            failIfMajorPerformanceCaveat: E.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT
        };
        try {
            if (!E.ADAPTER.getWebGLRenderingContext())
                return !1;
            var e = E.ADAPTER.createCanvas()
              , i = e.getContext("webgl", t) || e.getContext("experimental-webgl", t)
              , n = !!(i && i.getContextAttributes().stencil);
            if (i) {
                var s = i.getExtension("WEBGL_lose_context");
                s && s.loseContext()
            }
            return i = null,
            n
        } catch {
            return !1
        }
    }()),
    $e
}
function Fs(r, t) {
    return t === void 0 && (t = []),
    t[0] = (r >> 16 & 255) / 255,
    t[1] = (r >> 8 & 255) / 255,
    t[2] = (r & 255) / 255,
    t
}
function Us(r) {
    var t = r.toString(16);
    return t = "000000".substring(0, 6 - t.length) + t,
    "#" + t
}
function Ls() {
    for (var r = [], t = [], e = 0; e < 32; e++)
        r[e] = e,
        t[e] = e;
    r[I.NORMAL_NPM] = I.NORMAL,
    r[I.ADD_NPM] = I.ADD,
    r[I.SCREEN_NPM] = I.SCREEN,
    t[I.NORMAL] = I.NORMAL_NPM,
    t[I.ADD] = I.ADD_NPM,
    t[I.SCREEN] = I.SCREEN_NPM;
    var i = [];
    return i.push(t),
    i.push(r),
    i
}
var Ms = Ls();
function Gs(r, t) {
    if (t === 1)
        return (t * 255 << 24) + r;
    if (t === 0)
        return 0;
    var e = r >> 16 & 255
      , i = r >> 8 & 255
      , n = r & 255;
    return e = e * t + .5 | 0,
    i = i * t + .5 | 0,
    n = n * t + .5 | 0,
    (t * 255 << 24) + (e << 16) + (i << 8) + n
}
function Qi(r) {
    if (r.BYTES_PER_ELEMENT === 4)
        return r instanceof Float32Array ? "Float32Array" : r instanceof Uint32Array ? "Uint32Array" : "Int32Array";
    if (r.BYTES_PER_ELEMENT === 2) {
        if (r instanceof Uint16Array)
            return "Uint16Array"
    } else if (r.BYTES_PER_ELEMENT === 1 && r instanceof Uint8Array)
        return "Uint8Array";
    return null
}
function De(r) {
    return r += r === 0 ? 1 : 0,
    --r,
    r |= r >>> 1,
    r |= r >>> 2,
    r |= r >>> 4,
    r |= r >>> 8,
    r |= r >>> 16,
    r + 1
}
function Ti(r) {
    return !(r & r - 1) && !!r
}
function Ii(r) {
    var t = (r > 65535 ? 1 : 0) << 4;
    r >>>= t;
    var e = (r > 255 ? 1 : 0) << 3;
    return r >>>= e,
    t |= e,
    e = (r > 15 ? 1 : 0) << 2,
    r >>>= e,
    t |= e,
    e = (r > 3 ? 1 : 0) << 1,
    r >>>= e,
    t |= e,
    t | r >> 1
}
function Bs(r, t, e) {
    var i = r.length, n;
    if (!(t >= i || e === 0)) {
        e = t + e > i ? i - t : e;
        var s = i - e;
        for (n = t; n < s; ++n)
            r[n] = r[n + e];
        r.length = s
    }
}
var ks = 0;
function ce() {
    return ++ks
}
var wi = {};
function It(r, t, e) {
    if (e === void 0 && (e = 3),
    !wi[t]) {
        var i = new Error().stack;
        typeof i > "u" ? console.warn("PixiJS Deprecation Warning: ", t + `
Deprecated since v` + r) : (i = i.split(`
`).splice(e).join(`
`),
        console.groupCollapsed ? (console.groupCollapsed("%cPixiJS Deprecation Warning: %c%s", "color:#614108;background:#fffbe6", "font-weight:normal;color:#614108;background:#fffbe6", t + `
Deprecated since v` + r),
        console.warn(i),
        console.groupEnd()) : (console.warn("PixiJS Deprecation Warning: ", t + `
Deprecated since v` + r),
        console.warn(i))),
        wi[t] = !0
    }
}
var Ri = {}
  , _t = Object.create(null)
  , Pt = Object.create(null);
(function() {
    function r(t, e, i) {
        this.canvas = E.ADAPTER.createCanvas(),
        this.context = this.canvas.getContext("2d"),
        this.resolution = i || E.RESOLUTION,
        this.resize(t, e)
    }
    return r.prototype.clear = function() {
        this.context.setTransform(1, 0, 0, 1, 0, 0),
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
    ,
    r.prototype.resize = function(t, e) {
        this.canvas.width = Math.round(t * this.resolution),
        this.canvas.height = Math.round(e * this.resolution)
    }
    ,
    r.prototype.destroy = function() {
        this.context = null,
        this.canvas = null
    }
    ,
    Object.defineProperty(r.prototype, "width", {
        get: function() {
            return this.canvas.width
        },
        set: function(t) {
            this.canvas.width = Math.round(t)
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r.prototype, "height", {
        get: function() {
            return this.canvas.height
        },
        set: function(t) {
            this.canvas.height = Math.round(t)
        },
        enumerable: !1,
        configurable: !0
    }),
    r
}
)();
var we;
function Ds(r, t) {
    if (t === void 0 && (t = globalThis.location),
    r.indexOf("data:") === 0)
        return "";
    t = t || globalThis.location,
    we || (we = document.createElement("a")),
    we.href = r;
    var e = Cs.parse(we.href)
      , i = !e.port && t.port === "" || e.port === t.port;
    return e.hostname !== t.hostname || !i || e.protocol !== t.protocol ? "anonymous" : ""
}
function Ai(r, t) {
    var e = E.RETINA_PREFIX.exec(r);
    return e ? parseFloat(e[1]) : t !== void 0 ? t : 1
}
/*!
 * @pixi/extensions - v6.5.2
 * Compiled Wed, 24 Aug 2022 13:51:19 UTC
 *
 * @pixi/extensions is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var ne = function() {
    return ne = Object.assign || function(t) {
        for (var e = arguments, i, n = 1, s = arguments.length; n < s; n++) {
            i = e[n];
            for (var o in i)
                Object.prototype.hasOwnProperty.call(i, o) && (t[o] = i[o])
        }
        return t
    }
    ,
    ne.apply(this, arguments)
}, st;
(function(r) {
    r.Application = "application",
    r.RendererPlugin = "renderer-webgl-plugin",
    r.CanvasRendererPlugin = "renderer-canvas-plugin",
    r.Loader = "loader",
    r.LoadParser = "load-parser",
    r.ResolveParser = "resolve-parser",
    r.CacheParser = "cache-parser",
    r.DetectionParser = "detection-parser"
}
)(st || (st = {}));
var Ni = function(r) {
    if (typeof r == "function" || typeof r == "object" && r.extension) {
        if (!r.extension)
            throw new Error("Extension class must have an extension object");
        var t = typeof r.extension != "object" ? {
            type: r.extension
        } : r.extension;
        r = ne(ne({}, t), {
            ref: r
        })
    }
    if (typeof r == "object")
        r = ne({}, r);
    else
        throw new Error("Invalid extension type");
    return typeof r.type == "string" && (r.type = [r.type]),
    r
}
  , _e = {
    _addHandlers: null,
    _removeHandlers: null,
    _queue: {},
    remove: function() {
        for (var r = arguments, t = this, e = [], i = 0; i < arguments.length; i++)
            e[i] = r[i];
        return e.map(Ni).forEach(function(n) {
            n.type.forEach(function(s) {
                var o, a;
                return (a = (o = t._removeHandlers)[s]) === null || a === void 0 ? void 0 : a.call(o, n)
            })
        }),
        this
    },
    add: function() {
        for (var r = arguments, t = this, e = [], i = 0; i < arguments.length; i++)
            e[i] = r[i];
        return e.map(Ni).forEach(function(n) {
            n.type.forEach(function(s) {
                var o = t._addHandlers
                  , a = t._queue;
                o[s] ? o[s](n) : (a[s] = a[s] || [],
                a[s].push(n))
            })
        }),
        this
    },
    handle: function(r, t, e) {
        var i = this._addHandlers = this._addHandlers || {}
          , n = this._removeHandlers = this._removeHandlers || {};
        if (i[r] || n[r])
            throw new Error("Extension type " + r + " already has a handler");
        i[r] = t,
        n[r] = e;
        var s = this._queue;
        return s[r] && (s[r].forEach(function(o) {
            return t(o)
        }),
        delete s[r]),
        this
    },
    handleByMap: function(r, t) {
        return this.handle(r, function(e) {
            t[e.name] = e.ref
        }, function(e) {
            delete t[e.name]
        })
    },
    handleByList: function(r, t) {
        return this.handle(r, function(e) {
            var i, n;
            t.push(e.ref),
            r === st.Loader && ((n = (i = e.ref).add) === null || n === void 0 || n.call(i))
        }, function(e) {
            var i = t.indexOf(e.ref);
            i !== -1 && t.splice(i, 1)
        })
    }
};
/*!
 * @pixi/runner - v6.5.2
 * Compiled Wed, 24 Aug 2022 13:51:19 UTC
 *
 * @pixi/runner is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var $ = function() {
    function r(t) {
        this.items = [],
        this._name = t,
        this._aliasCount = 0
    }
    return r.prototype.emit = function(t, e, i, n, s, o, a, u) {
        if (arguments.length > 8)
            throw new Error("max arguments reached");
        var h = this
          , f = h.name
          , l = h.items;
        this._aliasCount++;
        for (var c = 0, d = l.length; c < d; c++)
            l[c][f](t, e, i, n, s, o, a, u);
        return l === this.items && this._aliasCount--,
        this
    }
    ,
    r.prototype.ensureNonAliasedItems = function() {
        this._aliasCount > 0 && this.items.length > 1 && (this._aliasCount = 0,
        this.items = this.items.slice(0))
    }
    ,
    r.prototype.add = function(t) {
        return t[this._name] && (this.ensureNonAliasedItems(),
        this.remove(t),
        this.items.push(t)),
        this
    }
    ,
    r.prototype.remove = function(t) {
        var e = this.items.indexOf(t);
        return e !== -1 && (this.ensureNonAliasedItems(),
        this.items.splice(e, 1)),
        this
    }
    ,
    r.prototype.contains = function(t) {
        return this.items.indexOf(t) !== -1
    }
    ,
    r.prototype.removeAll = function() {
        return this.ensureNonAliasedItems(),
        this.items.length = 0,
        this
    }
    ,
    r.prototype.destroy = function() {
        this.removeAll(),
        this.items = null,
        this._name = null
    }
    ,
    Object.defineProperty(r.prototype, "empty", {
        get: function() {
            return this.items.length === 0
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r.prototype, "name", {
        get: function() {
            return this._name
        },
        enumerable: !1,
        configurable: !0
    }),
    r
}();
Object.defineProperties($.prototype, {
    dispatch: {
        value: $.prototype.emit
    },
    run: {
        value: $.prototype.emit
    }
});
/*!
 * @pixi/ticker - v6.5.2
 * Compiled Wed, 24 Aug 2022 13:51:19 UTC
 *
 * @pixi/ticker is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
E.TARGET_FPMS = .06;
var de;
(function(r) {
    r[r.INTERACTION = 50] = "INTERACTION",
    r[r.HIGH = 25] = "HIGH",
    r[r.NORMAL = 0] = "NORMAL",
    r[r.LOW = -25] = "LOW",
    r[r.UTILITY = -50] = "UTILITY"
}
)(de || (de = {}));
var Ze = function() {
    function r(t, e, i, n) {
        e === void 0 && (e = null),
        i === void 0 && (i = 0),
        n === void 0 && (n = !1),
        this.next = null,
        this.previous = null,
        this._destroyed = !1,
        this.fn = t,
        this.context = e,
        this.priority = i,
        this.once = n
    }
    return r.prototype.match = function(t, e) {
        return e === void 0 && (e = null),
        this.fn === t && this.context === e
    }
    ,
    r.prototype.emit = function(t) {
        this.fn && (this.context ? this.fn.call(this.context, t) : this.fn(t));
        var e = this.next;
        return this.once && this.destroy(!0),
        this._destroyed && (this.next = null),
        e
    }
    ,
    r.prototype.connect = function(t) {
        this.previous = t,
        t.next && (t.next.previous = this),
        this.next = t.next,
        t.next = this
    }
    ,
    r.prototype.destroy = function(t) {
        t === void 0 && (t = !1),
        this._destroyed = !0,
        this.fn = null,
        this.context = null,
        this.previous && (this.previous.next = this.next),
        this.next && (this.next.previous = this.previous);
        var e = this.next;
        return this.next = t ? null : e,
        this.previous = null,
        e
    }
    ,
    r
}()
  , Q = function() {
    function r() {
        var t = this;
        this.autoStart = !1,
        this.deltaTime = 1,
        this.lastTime = -1,
        this.speed = 1,
        this.started = !1,
        this._requestId = null,
        this._maxElapsedMS = 100,
        this._minElapsedMS = 0,
        this._protected = !1,
        this._lastFrame = -1,
        this._head = new Ze(null,null,1 / 0),
        this.deltaMS = 1 / E.TARGET_FPMS,
        this.elapsedMS = 1 / E.TARGET_FPMS,
        this._tick = function(e) {
            t._requestId = null,
            t.started && (t.update(e),
            t.started && t._requestId === null && t._head.next && (t._requestId = requestAnimationFrame(t._tick)))
        }
    }
    return r.prototype._requestIfNeeded = function() {
        this._requestId === null && this._head.next && (this.lastTime = performance.now(),
        this._lastFrame = this.lastTime,
        this._requestId = requestAnimationFrame(this._tick))
    }
    ,
    r.prototype._cancelIfNeeded = function() {
        this._requestId !== null && (cancelAnimationFrame(this._requestId),
        this._requestId = null)
    }
    ,
    r.prototype._startIfPossible = function() {
        this.started ? this._requestIfNeeded() : this.autoStart && this.start()
    }
    ,
    r.prototype.add = function(t, e, i) {
        return i === void 0 && (i = de.NORMAL),
        this._addListener(new Ze(t,e,i))
    }
    ,
    r.prototype.addOnce = function(t, e, i) {
        return i === void 0 && (i = de.NORMAL),
        this._addListener(new Ze(t,e,i,!0))
    }
    ,
    r.prototype._addListener = function(t) {
        var e = this._head.next
          , i = this._head;
        if (!e)
            t.connect(i);
        else {
            for (; e; ) {
                if (t.priority > e.priority) {
                    t.connect(i);
                    break
                }
                i = e,
                e = e.next
            }
            t.previous || t.connect(i)
        }
        return this._startIfPossible(),
        this
    }
    ,
    r.prototype.remove = function(t, e) {
        for (var i = this._head.next; i; )
            i.match(t, e) ? i = i.destroy() : i = i.next;
        return this._head.next || this._cancelIfNeeded(),
        this
    }
    ,
    Object.defineProperty(r.prototype, "count", {
        get: function() {
            if (!this._head)
                return 0;
            for (var t = 0, e = this._head; e = e.next; )
                t++;
            return t
        },
        enumerable: !1,
        configurable: !0
    }),
    r.prototype.start = function() {
        this.started || (this.started = !0,
        this._requestIfNeeded())
    }
    ,
    r.prototype.stop = function() {
        this.started && (this.started = !1,
        this._cancelIfNeeded())
    }
    ,
    r.prototype.destroy = function() {
        if (!this._protected) {
            this.stop();
            for (var t = this._head.next; t; )
                t = t.destroy(!0);
            this._head.destroy(),
            this._head = null
        }
    }
    ,
    r.prototype.update = function(t) {
        t === void 0 && (t = performance.now());
        var e;
        if (t > this.lastTime) {
            if (e = this.elapsedMS = t - this.lastTime,
            e > this._maxElapsedMS && (e = this._maxElapsedMS),
            e *= this.speed,
            this._minElapsedMS) {
                var i = t - this._lastFrame | 0;
                if (i < this._minElapsedMS)
                    return;
                this._lastFrame = t - i % this._minElapsedMS
            }
            this.deltaMS = e,
            this.deltaTime = this.deltaMS * E.TARGET_FPMS;
            for (var n = this._head, s = n.next; s; )
                s = s.emit(this.deltaTime);
            n.next || this._cancelIfNeeded()
        } else
            this.deltaTime = this.deltaMS = this.elapsedMS = 0;
        this.lastTime = t
    }
    ,
    Object.defineProperty(r.prototype, "FPS", {
        get: function() {
            return 1e3 / this.elapsedMS
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r.prototype, "minFPS", {
        get: function() {
            return 1e3 / this._maxElapsedMS
        },
        set: function(t) {
            var e = Math.min(this.maxFPS, t)
              , i = Math.min(Math.max(0, e) / 1e3, E.TARGET_FPMS);
            this._maxElapsedMS = 1 / i
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r.prototype, "maxFPS", {
        get: function() {
            return this._minElapsedMS ? Math.round(1e3 / this._minElapsedMS) : 0
        },
        set: function(t) {
            if (t === 0)
                this._minElapsedMS = 0;
            else {
                var e = Math.max(this.minFPS, t);
                this._minElapsedMS = 1 / (e / 1e3)
            }
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r, "shared", {
        get: function() {
            if (!r._shared) {
                var t = r._shared = new r;
                t.autoStart = !0,
                t._protected = !0
            }
            return r._shared
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r, "system", {
        get: function() {
            if (!r._system) {
                var t = r._system = new r;
                t.autoStart = !0,
                t._protected = !0
            }
            return r._system
        },
        enumerable: !1,
        configurable: !0
    }),
    r
}();
(function() {
    function r() {}
    return r.init = function(t) {
        var e = this;
        t = Object.assign({
            autoStart: !0,
            sharedTicker: !1
        }, t),
        Object.defineProperty(this, "ticker", {
            set: function(i) {
                this._ticker && this._ticker.remove(this.render, this),
                this._ticker = i,
                i && i.add(this.render, this, de.LOW)
            },
            get: function() {
                return this._ticker
            }
        }),
        this.stop = function() {
            e._ticker.stop()
        }
        ,
        this.start = function() {
            e._ticker.start()
        }
        ,
        this._ticker = null,
        this.ticker = t.sharedTicker ? Q.shared : new Q,
        t.autoStart && this.start()
    }
    ,
    r.destroy = function() {
        if (this._ticker) {
            var t = this._ticker;
            this.ticker = null,
            t.destroy()
        }
    }
    ,
    r.extension = st.Application,
    r
}
)();
/*!
 * @pixi/math - v6.5.2
 * Compiled Wed, 24 Aug 2022 13:51:19 UTC
 *
 * @pixi/math is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var Hs = Math.PI * 2, Ar;
(function(r) {
    r[r.POLY = 0] = "POLY",
    r[r.RECT = 1] = "RECT",
    r[r.CIRC = 2] = "CIRC",
    r[r.ELIP = 3] = "ELIP",
    r[r.RREC = 4] = "RREC"
}
)(Ar || (Ar = {}));
var nt = function() {
    function r(t, e) {
        t === void 0 && (t = 0),
        e === void 0 && (e = 0),
        this.x = 0,
        this.y = 0,
        this.x = t,
        this.y = e
    }
    return r.prototype.clone = function() {
        return new r(this.x,this.y)
    }
    ,
    r.prototype.copyFrom = function(t) {
        return this.set(t.x, t.y),
        this
    }
    ,
    r.prototype.copyTo = function(t) {
        return t.set(this.x, this.y),
        t
    }
    ,
    r.prototype.equals = function(t) {
        return t.x === this.x && t.y === this.y
    }
    ,
    r.prototype.set = function(t, e) {
        return t === void 0 && (t = 0),
        e === void 0 && (e = t),
        this.x = t,
        this.y = e,
        this
    }
    ,
    r.prototype.toString = function() {
        return "[@pixi/math:Point x=" + this.x + " y=" + this.y + "]"
    }
    ,
    r
}()
  , Re = [new nt, new nt, new nt, new nt]
  , z = function() {
    function r(t, e, i, n) {
        t === void 0 && (t = 0),
        e === void 0 && (e = 0),
        i === void 0 && (i = 0),
        n === void 0 && (n = 0),
        this.x = Number(t),
        this.y = Number(e),
        this.width = Number(i),
        this.height = Number(n),
        this.type = Ar.RECT
    }
    return Object.defineProperty(r.prototype, "left", {
        get: function() {
            return this.x
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r.prototype, "right", {
        get: function() {
            return this.x + this.width
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r.prototype, "top", {
        get: function() {
            return this.y
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r.prototype, "bottom", {
        get: function() {
            return this.y + this.height
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r, "EMPTY", {
        get: function() {
            return new r(0,0,0,0)
        },
        enumerable: !1,
        configurable: !0
    }),
    r.prototype.clone = function() {
        return new r(this.x,this.y,this.width,this.height)
    }
    ,
    r.prototype.copyFrom = function(t) {
        return this.x = t.x,
        this.y = t.y,
        this.width = t.width,
        this.height = t.height,
        this
    }
    ,
    r.prototype.copyTo = function(t) {
        return t.x = this.x,
        t.y = this.y,
        t.width = this.width,
        t.height = this.height,
        t
    }
    ,
    r.prototype.contains = function(t, e) {
        return this.width <= 0 || this.height <= 0 ? !1 : t >= this.x && t < this.x + this.width && e >= this.y && e < this.y + this.height
    }
    ,
    r.prototype.intersects = function(t, e) {
        if (!e) {
            var i = this.x < t.x ? t.x : this.x
              , n = this.right > t.right ? t.right : this.right;
            if (n <= i)
                return !1;
            var s = this.y < t.y ? t.y : this.y
              , o = this.bottom > t.bottom ? t.bottom : this.bottom;
            return o > s
        }
        var a = this.left
          , u = this.right
          , h = this.top
          , f = this.bottom;
        if (u <= a || f <= h)
            return !1;
        var l = Re[0].set(t.left, t.top)
          , c = Re[1].set(t.left, t.bottom)
          , d = Re[2].set(t.right, t.top)
          , p = Re[3].set(t.right, t.bottom);
        if (d.x <= l.x || c.y <= l.y)
            return !1;
        var y = Math.sign(e.a * e.d - e.b * e.c);
        if (y === 0 || (e.apply(l, l),
        e.apply(c, c),
        e.apply(d, d),
        e.apply(p, p),
        Math.max(l.x, c.x, d.x, p.x) <= a || Math.min(l.x, c.x, d.x, p.x) >= u || Math.max(l.y, c.y, d.y, p.y) <= h || Math.min(l.y, c.y, d.y, p.y) >= f))
            return !1;
        var v = y * (c.y - l.y)
          , T = y * (l.x - c.x)
          , g = v * a + T * h
          , _ = v * u + T * h
          , b = v * a + T * f
          , A = v * u + T * f;
        if (Math.max(g, _, b, A) <= v * l.x + T * l.y || Math.min(g, _, b, A) >= v * p.x + T * p.y)
            return !1;
        var C = y * (l.y - d.y)
          , k = y * (d.x - l.x)
          , D = C * a + k * h
          , W = C * u + k * h
          , et = C * a + k * f
          , dt = C * u + k * f;
        return !(Math.max(D, W, et, dt) <= C * l.x + k * l.y || Math.min(D, W, et, dt) >= C * p.x + k * p.y)
    }
    ,
    r.prototype.pad = function(t, e) {
        return t === void 0 && (t = 0),
        e === void 0 && (e = t),
        this.x -= t,
        this.y -= e,
        this.width += t * 2,
        this.height += e * 2,
        this
    }
    ,
    r.prototype.fit = function(t) {
        var e = Math.max(this.x, t.x)
          , i = Math.min(this.x + this.width, t.x + t.width)
          , n = Math.max(this.y, t.y)
          , s = Math.min(this.y + this.height, t.y + t.height);
        return this.x = e,
        this.width = Math.max(i - e, 0),
        this.y = n,
        this.height = Math.max(s - n, 0),
        this
    }
    ,
    r.prototype.ceil = function(t, e) {
        t === void 0 && (t = 1),
        e === void 0 && (e = .001);
        var i = Math.ceil((this.x + this.width - e) * t) / t
          , n = Math.ceil((this.y + this.height - e) * t) / t;
        return this.x = Math.floor((this.x + e) * t) / t,
        this.y = Math.floor((this.y + e) * t) / t,
        this.width = i - this.x,
        this.height = n - this.y,
        this
    }
    ,
    r.prototype.enlarge = function(t) {
        var e = Math.min(this.x, t.x)
          , i = Math.max(this.x + this.width, t.x + t.width)
          , n = Math.min(this.y, t.y)
          , s = Math.max(this.y + this.height, t.y + t.height);
        return this.x = e,
        this.width = i - e,
        this.y = n,
        this.height = s - n,
        this
    }
    ,
    r.prototype.toString = function() {
        return "[@pixi/math:Rectangle x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + "]"
    }
    ,
    r
}()
  , Ae = function() {
    function r(t, e, i, n) {
        i === void 0 && (i = 0),
        n === void 0 && (n = 0),
        this._x = i,
        this._y = n,
        this.cb = t,
        this.scope = e
    }
    return r.prototype.clone = function(t, e) {
        return t === void 0 && (t = this.cb),
        e === void 0 && (e = this.scope),
        new r(t,e,this._x,this._y)
    }
    ,
    r.prototype.set = function(t, e) {
        return t === void 0 && (t = 0),
        e === void 0 && (e = t),
        (this._x !== t || this._y !== e) && (this._x = t,
        this._y = e,
        this.cb.call(this.scope)),
        this
    }
    ,
    r.prototype.copyFrom = function(t) {
        return (this._x !== t.x || this._y !== t.y) && (this._x = t.x,
        this._y = t.y,
        this.cb.call(this.scope)),
        this
    }
    ,
    r.prototype.copyTo = function(t) {
        return t.set(this._x, this._y),
        t
    }
    ,
    r.prototype.equals = function(t) {
        return t.x === this._x && t.y === this._y
    }
    ,
    r.prototype.toString = function() {
        return "[@pixi/math:ObservablePoint x=" + 0 + " y=" + 0 + " scope=" + this.scope + "]"
    }
    ,
    Object.defineProperty(r.prototype, "x", {
        get: function() {
            return this._x
        },
        set: function(t) {
            this._x !== t && (this._x = t,
            this.cb.call(this.scope))
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r.prototype, "y", {
        get: function() {
            return this._y
        },
        set: function(t) {
            this._y !== t && (this._y = t,
            this.cb.call(this.scope))
        },
        enumerable: !1,
        configurable: !0
    }),
    r
}()
  , tt = function() {
    function r(t, e, i, n, s, o) {
        t === void 0 && (t = 1),
        e === void 0 && (e = 0),
        i === void 0 && (i = 0),
        n === void 0 && (n = 1),
        s === void 0 && (s = 0),
        o === void 0 && (o = 0),
        this.array = null,
        this.a = t,
        this.b = e,
        this.c = i,
        this.d = n,
        this.tx = s,
        this.ty = o
    }
    return r.prototype.fromArray = function(t) {
        this.a = t[0],
        this.b = t[1],
        this.c = t[3],
        this.d = t[4],
        this.tx = t[2],
        this.ty = t[5]
    }
    ,
    r.prototype.set = function(t, e, i, n, s, o) {
        return this.a = t,
        this.b = e,
        this.c = i,
        this.d = n,
        this.tx = s,
        this.ty = o,
        this
    }
    ,
    r.prototype.toArray = function(t, e) {
        this.array || (this.array = new Float32Array(9));
        var i = e || this.array;
        return t ? (i[0] = this.a,
        i[1] = this.b,
        i[2] = 0,
        i[3] = this.c,
        i[4] = this.d,
        i[5] = 0,
        i[6] = this.tx,
        i[7] = this.ty,
        i[8] = 1) : (i[0] = this.a,
        i[1] = this.c,
        i[2] = this.tx,
        i[3] = this.b,
        i[4] = this.d,
        i[5] = this.ty,
        i[6] = 0,
        i[7] = 0,
        i[8] = 1),
        i
    }
    ,
    r.prototype.apply = function(t, e) {
        e = e || new nt;
        var i = t.x
          , n = t.y;
        return e.x = this.a * i + this.c * n + this.tx,
        e.y = this.b * i + this.d * n + this.ty,
        e
    }
    ,
    r.prototype.applyInverse = function(t, e) {
        e = e || new nt;
        var i = 1 / (this.a * this.d + this.c * -this.b)
          , n = t.x
          , s = t.y;
        return e.x = this.d * i * n + -this.c * i * s + (this.ty * this.c - this.tx * this.d) * i,
        e.y = this.a * i * s + -this.b * i * n + (-this.ty * this.a + this.tx * this.b) * i,
        e
    }
    ,
    r.prototype.translate = function(t, e) {
        return this.tx += t,
        this.ty += e,
        this
    }
    ,
    r.prototype.scale = function(t, e) {
        return this.a *= t,
        this.d *= e,
        this.c *= t,
        this.b *= e,
        this.tx *= t,
        this.ty *= e,
        this
    }
    ,
    r.prototype.rotate = function(t) {
        var e = Math.cos(t)
          , i = Math.sin(t)
          , n = this.a
          , s = this.c
          , o = this.tx;
        return this.a = n * e - this.b * i,
        this.b = n * i + this.b * e,
        this.c = s * e - this.d * i,
        this.d = s * i + this.d * e,
        this.tx = o * e - this.ty * i,
        this.ty = o * i + this.ty * e,
        this
    }
    ,
    r.prototype.append = function(t) {
        var e = this.a
          , i = this.b
          , n = this.c
          , s = this.d;
        return this.a = t.a * e + t.b * n,
        this.b = t.a * i + t.b * s,
        this.c = t.c * e + t.d * n,
        this.d = t.c * i + t.d * s,
        this.tx = t.tx * e + t.ty * n + this.tx,
        this.ty = t.tx * i + t.ty * s + this.ty,
        this
    }
    ,
    r.prototype.setTransform = function(t, e, i, n, s, o, a, u, h) {
        return this.a = Math.cos(a + h) * s,
        this.b = Math.sin(a + h) * s,
        this.c = -Math.sin(a - u) * o,
        this.d = Math.cos(a - u) * o,
        this.tx = t - (i * this.a + n * this.c),
        this.ty = e - (i * this.b + n * this.d),
        this
    }
    ,
    r.prototype.prepend = function(t) {
        var e = this.tx;
        if (t.a !== 1 || t.b !== 0 || t.c !== 0 || t.d !== 1) {
            var i = this.a
              , n = this.c;
            this.a = i * t.a + this.b * t.c,
            this.b = i * t.b + this.b * t.d,
            this.c = n * t.a + this.d * t.c,
            this.d = n * t.b + this.d * t.d
        }
        return this.tx = e * t.a + this.ty * t.c + t.tx,
        this.ty = e * t.b + this.ty * t.d + t.ty,
        this
    }
    ,
    r.prototype.decompose = function(t) {
        var e = this.a
          , i = this.b
          , n = this.c
          , s = this.d
          , o = t.pivot
          , a = -Math.atan2(-n, s)
          , u = Math.atan2(i, e)
          , h = Math.abs(a + u);
        return h < 1e-5 || Math.abs(Hs - h) < 1e-5 ? (t.rotation = u,
        t.skew.x = t.skew.y = 0) : (t.rotation = 0,
        t.skew.x = a,
        t.skew.y = u),
        t.scale.x = Math.sqrt(e * e + i * i),
        t.scale.y = Math.sqrt(n * n + s * s),
        t.position.x = this.tx + (o.x * e + o.y * n),
        t.position.y = this.ty + (o.x * i + o.y * s),
        t
    }
    ,
    r.prototype.invert = function() {
        var t = this.a
          , e = this.b
          , i = this.c
          , n = this.d
          , s = this.tx
          , o = t * n - e * i;
        return this.a = n / o,
        this.b = -e / o,
        this.c = -i / o,
        this.d = t / o,
        this.tx = (i * this.ty - n * s) / o,
        this.ty = -(t * this.ty - e * s) / o,
        this
    }
    ,
    r.prototype.identity = function() {
        return this.a = 1,
        this.b = 0,
        this.c = 0,
        this.d = 1,
        this.tx = 0,
        this.ty = 0,
        this
    }
    ,
    r.prototype.clone = function() {
        var t = new r;
        return t.a = this.a,
        t.b = this.b,
        t.c = this.c,
        t.d = this.d,
        t.tx = this.tx,
        t.ty = this.ty,
        t
    }
    ,
    r.prototype.copyTo = function(t) {
        return t.a = this.a,
        t.b = this.b,
        t.c = this.c,
        t.d = this.d,
        t.tx = this.tx,
        t.ty = this.ty,
        t
    }
    ,
    r.prototype.copyFrom = function(t) {
        return this.a = t.a,
        this.b = t.b,
        this.c = t.c,
        this.d = t.d,
        this.tx = t.tx,
        this.ty = t.ty,
        this
    }
    ,
    r.prototype.toString = function() {
        return "[@pixi/math:Matrix a=" + this.a + " b=" + this.b + " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + "]"
    }
    ,
    Object.defineProperty(r, "IDENTITY", {
        get: function() {
            return new r
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r, "TEMP_MATRIX", {
        get: function() {
            return new r
        },
        enumerable: !1,
        configurable: !0
    }),
    r
}()
  , Ut = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1]
  , Lt = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1]
  , Mt = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1]
  , Gt = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1]
  , Nr = []
  , tn = []
  , Ne = Math.sign;
function Xs() {
    for (var r = 0; r < 16; r++) {
        var t = [];
        Nr.push(t);
        for (var e = 0; e < 16; e++)
            for (var i = Ne(Ut[r] * Ut[e] + Mt[r] * Lt[e]), n = Ne(Lt[r] * Ut[e] + Gt[r] * Lt[e]), s = Ne(Ut[r] * Mt[e] + Mt[r] * Gt[e]), o = Ne(Lt[r] * Mt[e] + Gt[r] * Gt[e]), a = 0; a < 16; a++)
                if (Ut[a] === i && Lt[a] === n && Mt[a] === s && Gt[a] === o) {
                    t.push(a);
                    break
                }
    }
    for (var r = 0; r < 16; r++) {
        var u = new tt;
        u.set(Ut[r], Lt[r], Mt[r], Gt[r], 0, 0),
        tn.push(u)
    }
}
Xs();
var F = {
    E: 0,
    SE: 1,
    S: 2,
    SW: 3,
    W: 4,
    NW: 5,
    N: 6,
    NE: 7,
    MIRROR_VERTICAL: 8,
    MAIN_DIAGONAL: 10,
    MIRROR_HORIZONTAL: 12,
    REVERSE_DIAGONAL: 14,
    uX: function(r) {
        return Ut[r]
    },
    uY: function(r) {
        return Lt[r]
    },
    vX: function(r) {
        return Mt[r]
    },
    vY: function(r) {
        return Gt[r]
    },
    inv: function(r) {
        return r & 8 ? r & 15 : -r & 7
    },
    add: function(r, t) {
        return Nr[r][t]
    },
    sub: function(r, t) {
        return Nr[r][F.inv(t)]
    },
    rotate180: function(r) {
        return r ^ 4
    },
    isVertical: function(r) {
        return (r & 3) === 2
    },
    byDirection: function(r, t) {
        return Math.abs(r) * 2 <= Math.abs(t) ? t >= 0 ? F.S : F.N : Math.abs(t) * 2 <= Math.abs(r) ? r > 0 ? F.E : F.W : t > 0 ? r > 0 ? F.SE : F.SW : r > 0 ? F.NE : F.NW
    },
    matrixAppendRotationInv: function(r, t, e, i) {
        e === void 0 && (e = 0),
        i === void 0 && (i = 0);
        var n = tn[F.inv(t)];
        n.tx = e,
        n.ty = i,
        r.append(n)
    }
};
(function() {
    function r() {
        this.worldTransform = new tt,
        this.localTransform = new tt,
        this.position = new Ae(this.onChange,this,0,0),
        this.scale = new Ae(this.onChange,this,1,1),
        this.pivot = new Ae(this.onChange,this,0,0),
        this.skew = new Ae(this.updateSkew,this,0,0),
        this._rotation = 0,
        this._cx = 1,
        this._sx = 0,
        this._cy = 0,
        this._sy = 1,
        this._localID = 0,
        this._currentLocalID = 0,
        this._worldID = 0,
        this._parentID = 0
    }
    return r.prototype.onChange = function() {
        this._localID++
    }
    ,
    r.prototype.updateSkew = function() {
        this._cx = Math.cos(this._rotation + this.skew.y),
        this._sx = Math.sin(this._rotation + this.skew.y),
        this._cy = -Math.sin(this._rotation - this.skew.x),
        this._sy = Math.cos(this._rotation - this.skew.x),
        this._localID++
    }
    ,
    r.prototype.toString = function() {
        return "[@pixi/math:Transform " + ("position=(" + this.position.x + ", " + this.position.y + ") ") + ("rotation=" + this.rotation + " ") + ("scale=(" + this.scale.x + ", " + this.scale.y + ") ") + ("skew=(" + this.skew.x + ", " + this.skew.y + ") ") + "]"
    }
    ,
    r.prototype.updateLocalTransform = function() {
        var t = this.localTransform;
        this._localID !== this._currentLocalID && (t.a = this._cx * this.scale.x,
        t.b = this._sx * this.scale.x,
        t.c = this._cy * this.scale.y,
        t.d = this._sy * this.scale.y,
        t.tx = this.position.x - (this.pivot.x * t.a + this.pivot.y * t.c),
        t.ty = this.position.y - (this.pivot.x * t.b + this.pivot.y * t.d),
        this._currentLocalID = this._localID,
        this._parentID = -1)
    }
    ,
    r.prototype.updateTransform = function(t) {
        var e = this.localTransform;
        if (this._localID !== this._currentLocalID && (e.a = this._cx * this.scale.x,
        e.b = this._sx * this.scale.x,
        e.c = this._cy * this.scale.y,
        e.d = this._sy * this.scale.y,
        e.tx = this.position.x - (this.pivot.x * e.a + this.pivot.y * e.c),
        e.ty = this.position.y - (this.pivot.x * e.b + this.pivot.y * e.d),
        this._currentLocalID = this._localID,
        this._parentID = -1),
        this._parentID !== t._worldID) {
            var i = t.worldTransform
              , n = this.worldTransform;
            n.a = e.a * i.a + e.b * i.c,
            n.b = e.a * i.b + e.b * i.d,
            n.c = e.c * i.a + e.d * i.c,
            n.d = e.c * i.b + e.d * i.d,
            n.tx = e.tx * i.a + e.ty * i.c + i.tx,
            n.ty = e.tx * i.b + e.ty * i.d + i.ty,
            this._parentID = t._worldID,
            this._worldID++
        }
    }
    ,
    r.prototype.setFromMatrix = function(t) {
        t.decompose(this),
        this._localID++
    }
    ,
    Object.defineProperty(r.prototype, "rotation", {
        get: function() {
            return this._rotation
        },
        set: function(t) {
            this._rotation !== t && (this._rotation = t,
            this.updateSkew())
        },
        enumerable: !1,
        configurable: !0
    }),
    r.IDENTITY = new r,
    r
}
)();
/*!
 * @pixi/core - v6.5.2
 * Compiled Wed, 24 Aug 2022 13:51:19 UTC
 *
 * @pixi/core is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
E.PREFER_ENV = Bt.any ? bt.WEBGL : bt.WEBGL2;
E.STRICT_TEXTURE_CACHE = !1;
var Or = [];
function en(r, t) {
    if (!r)
        return null;
    var e = "";
    if (typeof r == "string") {
        var i = /\.(\w{3,4})(?:$|\?|#)/i.exec(r);
        i && (e = i[1].toLowerCase())
    }
    for (var n = Or.length - 1; n >= 0; --n) {
        var s = Or[n];
        if (s.test && s.test(r, e))
            return new s(r,t)
    }
    throw new Error("Unrecognized source type to auto-detect Resource")
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var Cr = function(r, t) {
    return Cr = Object.setPrototypeOf || {
        __proto__: []
    }instanceof Array && function(e, i) {
        e.__proto__ = i
    }
    || function(e, i) {
        for (var n in i)
            i.hasOwnProperty(n) && (e[n] = i[n])
    }
    ,
    Cr(r, t)
};
function P(r, t) {
    Cr(r, t);
    function e() {
        this.constructor = r
    }
    r.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype,
    new e)
}
var Pr = function() {
    return Pr = Object.assign || function(t) {
        for (var e = arguments, i, n = 1, s = arguments.length; n < s; n++) {
            i = e[n];
            for (var o in i)
                Object.prototype.hasOwnProperty.call(i, o) && (t[o] = i[o])
        }
        return t
    }
    ,
    Pr.apply(this, arguments)
};
function Vs(r, t) {
    var e = {};
    for (var i in r)
        Object.prototype.hasOwnProperty.call(r, i) && t.indexOf(i) < 0 && (e[i] = r[i]);
    if (r != null && typeof Object.getOwnPropertySymbols == "function")
        for (var n = 0, i = Object.getOwnPropertySymbols(r); n < i.length; n++)
            t.indexOf(i[n]) < 0 && Object.prototype.propertyIsEnumerable.call(r, i[n]) && (e[i[n]] = r[i[n]]);
    return e
}
var pe = function() {
    function r(t, e) {
        t === void 0 && (t = 0),
        e === void 0 && (e = 0),
        this._width = t,
        this._height = e,
        this.destroyed = !1,
        this.internal = !1,
        this.onResize = new $("setRealSize"),
        this.onUpdate = new $("update"),
        this.onError = new $("onError")
    }
    return r.prototype.bind = function(t) {
        this.onResize.add(t),
        this.onUpdate.add(t),
        this.onError.add(t),
        (this._width || this._height) && this.onResize.emit(this._width, this._height)
    }
    ,
    r.prototype.unbind = function(t) {
        this.onResize.remove(t),
        this.onUpdate.remove(t),
        this.onError.remove(t)
    }
    ,
    r.prototype.resize = function(t, e) {
        (t !== this._width || e !== this._height) && (this._width = t,
        this._height = e,
        this.onResize.emit(t, e))
    }
    ,
    Object.defineProperty(r.prototype, "valid", {
        get: function() {
            return !!this._width && !!this._height
        },
        enumerable: !1,
        configurable: !0
    }),
    r.prototype.update = function() {
        this.destroyed || this.onUpdate.emit()
    }
    ,
    r.prototype.load = function() {
        return Promise.resolve(this)
    }
    ,
    Object.defineProperty(r.prototype, "width", {
        get: function() {
            return this._width
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r.prototype, "height", {
        get: function() {
            return this._height
        },
        enumerable: !1,
        configurable: !0
    }),
    r.prototype.style = function(t, e, i) {
        return !1
    }
    ,
    r.prototype.dispose = function() {}
    ,
    r.prototype.destroy = function() {
        this.destroyed || (this.destroyed = !0,
        this.dispose(),
        this.onError.removeAll(),
        this.onError = null,
        this.onResize.removeAll(),
        this.onResize = null,
        this.onUpdate.removeAll(),
        this.onUpdate = null)
    }
    ,
    r.test = function(t, e) {
        return !1
    }
    ,
    r
}()
  , Ur = function(r) {
    P(t, r);
    function t(e, i) {
        var n = this
          , s = i || {}
          , o = s.width
          , a = s.height;
        if (!o || !a)
            throw new Error("BufferResource width or height invalid");
        return n = r.call(this, o, a) || this,
        n.data = e,
        n
    }
    return t.prototype.upload = function(e, i, n) {
        var s = e.gl;
        s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL, i.alphaMode === wt.UNPACK);
        var o = i.realWidth
          , a = i.realHeight;
        return n.width === o && n.height === a ? s.texSubImage2D(i.target, 0, 0, 0, o, a, i.format, n.type, this.data) : (n.width = o,
        n.height = a,
        s.texImage2D(i.target, 0, n.internalFormat, o, a, 0, i.format, n.type, this.data)),
        !0
    }
    ,
    t.prototype.dispose = function() {
        this.data = null
    }
    ,
    t.test = function(e) {
        return e instanceof Float32Array || e instanceof Uint8Array || e instanceof Uint32Array
    }
    ,
    t
}(pe)
  , js = {
    scaleMode: mt.NEAREST,
    format: m.RGBA,
    alphaMode: wt.NPM
}
  , X = function(r) {
    P(t, r);
    function t(e, i) {
        e === void 0 && (e = null),
        i === void 0 && (i = null);
        var n = r.call(this) || this;
        i = i || {};
        var s = i.alphaMode
          , o = i.mipmap
          , a = i.anisotropicLevel
          , u = i.scaleMode
          , h = i.width
          , f = i.height
          , l = i.wrapMode
          , c = i.format
          , d = i.type
          , p = i.target
          , y = i.resolution
          , v = i.resourceOptions;
        return e && !(e instanceof pe) && (e = en(e, v),
        e.internal = !0),
        n.resolution = y || E.RESOLUTION,
        n.width = Math.round((h || 0) * n.resolution) / n.resolution,
        n.height = Math.round((f || 0) * n.resolution) / n.resolution,
        n._mipmap = o !== void 0 ? o : E.MIPMAP_TEXTURES,
        n.anisotropicLevel = a !== void 0 ? a : E.ANISOTROPIC_LEVEL,
        n._wrapMode = l || E.WRAP_MODE,
        n._scaleMode = u !== void 0 ? u : E.SCALE_MODE,
        n.format = c || m.RGBA,
        n.type = d || N.UNSIGNED_BYTE,
        n.target = p || kt.TEXTURE_2D,
        n.alphaMode = s !== void 0 ? s : wt.UNPACK,
        n.uid = ce(),
        n.touched = 0,
        n.isPowerOfTwo = !1,
        n._refreshPOT(),
        n._glTextures = {},
        n.dirtyId = 0,
        n.dirtyStyleId = 0,
        n.cacheId = null,
        n.valid = h > 0 && f > 0,
        n.textureCacheIds = [],
        n.destroyed = !1,
        n.resource = null,
        n._batchEnabled = 0,
        n._batchLocation = 0,
        n.parentTextureArray = null,
        n.setResource(e),
        n
    }
    return Object.defineProperty(t.prototype, "realWidth", {
        get: function() {
            return Math.round(this.width * this.resolution)
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "realHeight", {
        get: function() {
            return Math.round(this.height * this.resolution)
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "mipmap", {
        get: function() {
            return this._mipmap
        },
        set: function(e) {
            this._mipmap !== e && (this._mipmap = e,
            this.dirtyStyleId++)
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "scaleMode", {
        get: function() {
            return this._scaleMode
        },
        set: function(e) {
            this._scaleMode !== e && (this._scaleMode = e,
            this.dirtyStyleId++)
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "wrapMode", {
        get: function() {
            return this._wrapMode
        },
        set: function(e) {
            this._wrapMode !== e && (this._wrapMode = e,
            this.dirtyStyleId++)
        },
        enumerable: !1,
        configurable: !0
    }),
    t.prototype.setStyle = function(e, i) {
        var n;
        return e !== void 0 && e !== this.scaleMode && (this.scaleMode = e,
        n = !0),
        i !== void 0 && i !== this.mipmap && (this.mipmap = i,
        n = !0),
        n && this.dirtyStyleId++,
        this
    }
    ,
    t.prototype.setSize = function(e, i, n) {
        return n = n || this.resolution,
        this.setRealSize(e * n, i * n, n)
    }
    ,
    t.prototype.setRealSize = function(e, i, n) {
        return this.resolution = n || this.resolution,
        this.width = Math.round(e) / this.resolution,
        this.height = Math.round(i) / this.resolution,
        this._refreshPOT(),
        this.update(),
        this
    }
    ,
    t.prototype._refreshPOT = function() {
        this.isPowerOfTwo = Ti(this.realWidth) && Ti(this.realHeight)
    }
    ,
    t.prototype.setResolution = function(e) {
        var i = this.resolution;
        return i === e ? this : (this.resolution = e,
        this.valid && (this.width = Math.round(this.width * i) / e,
        this.height = Math.round(this.height * i) / e,
        this.emit("update", this)),
        this._refreshPOT(),
        this)
    }
    ,
    t.prototype.setResource = function(e) {
        if (this.resource === e)
            return this;
        if (this.resource)
            throw new Error("Resource can be set only once");
        return e.bind(this),
        this.resource = e,
        this
    }
    ,
    t.prototype.update = function() {
        this.valid ? (this.dirtyId++,
        this.dirtyStyleId++,
        this.emit("update", this)) : this.width > 0 && this.height > 0 && (this.valid = !0,
        this.emit("loaded", this),
        this.emit("update", this))
    }
    ,
    t.prototype.onError = function(e) {
        this.emit("error", this, e)
    }
    ,
    t.prototype.destroy = function() {
        this.resource && (this.resource.unbind(this),
        this.resource.internal && this.resource.destroy(),
        this.resource = null),
        this.cacheId && (delete Pt[this.cacheId],
        delete _t[this.cacheId],
        this.cacheId = null),
        this.dispose(),
        t.removeFromCache(this),
        this.textureCacheIds = null,
        this.destroyed = !0
    }
    ,
    t.prototype.dispose = function() {
        this.emit("dispose", this)
    }
    ,
    t.prototype.castToBaseTexture = function() {
        return this
    }
    ,
    t.from = function(e, i, n) {
        n === void 0 && (n = E.STRICT_TEXTURE_CACHE);
        var s = typeof e == "string"
          , o = null;
        if (s)
            o = e;
        else {
            if (!e._pixiId) {
                var a = i && i.pixiIdPrefix || "pixiid";
                e._pixiId = a + "_" + ce()
            }
            o = e._pixiId
        }
        var u = Pt[o];
        if (s && n && !u)
            throw new Error('The cacheId "' + o + '" does not exist in BaseTextureCache.');
        return u || (u = new t(e,i),
        u.cacheId = o,
        t.addToCache(u, o)),
        u
    }
    ,
    t.fromBuffer = function(e, i, n, s) {
        e = e || new Float32Array(i * n * 4);
        var o = new Ur(e,{
            width: i,
            height: n
        })
          , a = e instanceof Float32Array ? N.FLOAT : N.UNSIGNED_BYTE;
        return new t(o,Object.assign(js, s || {
            width: i,
            height: n,
            type: a
        }))
    }
    ,
    t.addToCache = function(e, i) {
        i && (e.textureCacheIds.indexOf(i) === -1 && e.textureCacheIds.push(i),
        Pt[i] && console.warn("BaseTexture added to the cache with an id [" + i + "] that already had an entry"),
        Pt[i] = e)
    }
    ,
    t.removeFromCache = function(e) {
        if (typeof e == "string") {
            var i = Pt[e];
            if (i) {
                var n = i.textureCacheIds.indexOf(e);
                return n > -1 && i.textureCacheIds.splice(n, 1),
                delete Pt[e],
                i
            }
        } else if (e && e.textureCacheIds) {
            for (var s = 0; s < e.textureCacheIds.length; ++s)
                delete Pt[e.textureCacheIds[s]];
            return e.textureCacheIds.length = 0,
            e
        }
        return null
    }
    ,
    t._globalBatch = 0,
    t
}(At)
  , rn = function(r) {
    P(t, r);
    function t(e, i) {
        var n = this
          , s = i || {}
          , o = s.width
          , a = s.height;
        n = r.call(this, o, a) || this,
        n.items = [],
        n.itemDirtyIds = [];
        for (var u = 0; u < e; u++) {
            var h = new X;
            n.items.push(h),
            n.itemDirtyIds.push(-2)
        }
        return n.length = e,
        n._load = null,
        n.baseTexture = null,
        n
    }
    return t.prototype.initFromArray = function(e, i) {
        for (var n = 0; n < this.length; n++)
            e[n] && (e[n].castToBaseTexture ? this.addBaseTextureAt(e[n].castToBaseTexture(), n) : e[n]instanceof pe ? this.addResourceAt(e[n], n) : this.addResourceAt(en(e[n], i), n))
    }
    ,
    t.prototype.dispose = function() {
        for (var e = 0, i = this.length; e < i; e++)
            this.items[e].destroy();
        this.items = null,
        this.itemDirtyIds = null,
        this._load = null
    }
    ,
    t.prototype.addResourceAt = function(e, i) {
        if (!this.items[i])
            throw new Error("Index " + i + " is out of bounds");
        return e.valid && !this.valid && this.resize(e.width, e.height),
        this.items[i].setResource(e),
        this
    }
    ,
    t.prototype.bind = function(e) {
        if (this.baseTexture !== null)
            throw new Error("Only one base texture per TextureArray is allowed");
        r.prototype.bind.call(this, e);
        for (var i = 0; i < this.length; i++)
            this.items[i].parentTextureArray = e,
            this.items[i].on("update", e.update, e)
    }
    ,
    t.prototype.unbind = function(e) {
        r.prototype.unbind.call(this, e);
        for (var i = 0; i < this.length; i++)
            this.items[i].parentTextureArray = null,
            this.items[i].off("update", e.update, e)
    }
    ,
    t.prototype.load = function() {
        var e = this;
        if (this._load)
            return this._load;
        var i = this.items.map(function(s) {
            return s.resource
        }).filter(function(s) {
            return s
        })
          , n = i.map(function(s) {
            return s.load()
        });
        return this._load = Promise.all(n).then(function() {
            var s = e.items[0]
              , o = s.realWidth
              , a = s.realHeight;
            return e.resize(o, a),
            Promise.resolve(e)
        }),
        this._load
    }
    ,
    t
}(pe)
  , zs = function(r) {
    P(t, r);
    function t(e, i) {
        var n = this, s = i || {}, o = s.width, a = s.height, u, h;
        return Array.isArray(e) ? (u = e,
        h = e.length) : h = e,
        n = r.call(this, h, {
            width: o,
            height: a
        }) || this,
        u && n.initFromArray(u, i),
        n
    }
    return t.prototype.addBaseTextureAt = function(e, i) {
        if (e.resource)
            this.addResourceAt(e.resource, i);
        else
            throw new Error("ArrayResource does not support RenderTexture");
        return this
    }
    ,
    t.prototype.bind = function(e) {
        r.prototype.bind.call(this, e),
        e.target = kt.TEXTURE_2D_ARRAY
    }
    ,
    t.prototype.upload = function(e, i, n) {
        var s = this
          , o = s.length
          , a = s.itemDirtyIds
          , u = s.items
          , h = e.gl;
        n.dirtyId < 0 && h.texImage3D(h.TEXTURE_2D_ARRAY, 0, n.internalFormat, this._width, this._height, o, 0, i.format, n.type, null);
        for (var f = 0; f < o; f++) {
            var l = u[f];
            a[f] < l.dirtyId && (a[f] = l.dirtyId,
            l.valid && h.texSubImage3D(h.TEXTURE_2D_ARRAY, 0, 0, 0, f, l.resource.width, l.resource.height, 1, i.format, n.type, l.resource.source))
        }
        return !0
    }
    ,
    t
}(rn)
  , Rt = function(r) {
    P(t, r);
    function t(e) {
        var i = this
          , n = e
          , s = n.naturalWidth || n.videoWidth || n.width
          , o = n.naturalHeight || n.videoHeight || n.height;
        return i = r.call(this, s, o) || this,
        i.source = e,
        i.noSubImage = !1,
        i
    }
    return t.crossOrigin = function(e, i, n) {
        n === void 0 && i.indexOf("data:") !== 0 ? e.crossOrigin = Ds(i) : n !== !1 && (e.crossOrigin = typeof n == "string" ? n : "anonymous")
    }
    ,
    t.prototype.upload = function(e, i, n, s) {
        var o = e.gl
          , a = i.realWidth
          , u = i.realHeight;
        if (s = s || this.source,
        s instanceof HTMLImageElement) {
            if (!s.complete || s.naturalWidth === 0)
                return !1
        } else if (s instanceof HTMLVideoElement && s.readyState <= 1)
            return !1;
        return o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL, i.alphaMode === wt.UNPACK),
        !this.noSubImage && i.target === o.TEXTURE_2D && n.width === a && n.height === u ? o.texSubImage2D(o.TEXTURE_2D, 0, 0, 0, i.format, n.type, s) : (n.width = a,
        n.height = u,
        o.texImage2D(i.target, 0, n.internalFormat, i.format, n.type, s)),
        !0
    }
    ,
    t.prototype.update = function() {
        if (!this.destroyed) {
            var e = this.source
              , i = e.naturalWidth || e.videoWidth || e.width
              , n = e.naturalHeight || e.videoHeight || e.height;
            this.resize(i, n),
            r.prototype.update.call(this)
        }
    }
    ,
    t.prototype.dispose = function() {
        this.source = null
    }
    ,
    t
}(pe)
  , Ws = function(r) {
    P(t, r);
    function t(e) {
        return r.call(this, e) || this
    }
    return t.test = function(e) {
        var i = globalThis.OffscreenCanvas;
        return i && e instanceof i ? !0 : globalThis.HTMLCanvasElement && e instanceof HTMLCanvasElement
    }
    ,
    t
}(Rt)
  , qs = function(r) {
    P(t, r);
    function t(e, i) {
        var n = this
          , s = i || {}
          , o = s.width
          , a = s.height
          , u = s.autoLoad
          , h = s.linkBaseTexture;
        if (e && e.length !== t.SIDES)
            throw new Error("Invalid length. Got " + e.length + ", expected 6");
        n = r.call(this, 6, {
            width: o,
            height: a
        }) || this;
        for (var f = 0; f < t.SIDES; f++)
            n.items[f].target = kt.TEXTURE_CUBE_MAP_POSITIVE_X + f;
        return n.linkBaseTexture = h !== !1,
        e && n.initFromArray(e, i),
        u !== !1 && n.load(),
        n
    }
    return t.prototype.bind = function(e) {
        r.prototype.bind.call(this, e),
        e.target = kt.TEXTURE_CUBE_MAP
    }
    ,
    t.prototype.addBaseTextureAt = function(e, i, n) {
        if (!this.items[i])
            throw new Error("Index " + i + " is out of bounds");
        if (!this.linkBaseTexture || e.parentTextureArray || Object.keys(e._glTextures).length > 0)
            if (e.resource)
                this.addResourceAt(e.resource, i);
            else
                throw new Error("CubeResource does not support copying of renderTexture.");
        else
            e.target = kt.TEXTURE_CUBE_MAP_POSITIVE_X + i,
            e.parentTextureArray = this.baseTexture,
            this.items[i] = e;
        return e.valid && !this.valid && this.resize(e.realWidth, e.realHeight),
        this.items[i] = e,
        this
    }
    ,
    t.prototype.upload = function(e, i, n) {
        for (var s = this.itemDirtyIds, o = 0; o < t.SIDES; o++) {
            var a = this.items[o];
            (s[o] < a.dirtyId || n.dirtyId < i.dirtyId) && (a.valid && a.resource ? (a.resource.upload(e, a, n),
            s[o] = a.dirtyId) : s[o] < -1 && (e.gl.texImage2D(a.target, 0, n.internalFormat, i.realWidth, i.realHeight, 0, i.format, n.type, null),
            s[o] = -1))
        }
        return !0
    }
    ,
    t.test = function(e) {
        return Array.isArray(e) && e.length === t.SIDES
    }
    ,
    t.SIDES = 6,
    t
}(rn)
  , nn = function(r) {
    P(t, r);
    function t(e, i) {
        var n = this;
        if (i = i || {},
        !(e instanceof HTMLImageElement)) {
            var s = new Image;
            Rt.crossOrigin(s, e, i.crossorigin),
            s.src = e,
            e = s
        }
        return n = r.call(this, e) || this,
        !e.complete && n._width && n._height && (n._width = 0,
        n._height = 0),
        n.url = e.src,
        n._process = null,
        n.preserveBitmap = !1,
        n.createBitmap = (i.createBitmap !== void 0 ? i.createBitmap : E.CREATE_IMAGE_BITMAP) && !!globalThis.createImageBitmap,
        n.alphaMode = typeof i.alphaMode == "number" ? i.alphaMode : null,
        n.bitmap = null,
        n._load = null,
        i.autoLoad !== !1 && n.load(),
        n
    }
    return t.prototype.load = function(e) {
        var i = this;
        return this._load ? this._load : (e !== void 0 && (this.createBitmap = e),
        this._load = new Promise(function(n, s) {
            var o = i.source;
            i.url = o.src;
            var a = function() {
                i.destroyed || (o.onload = null,
                o.onerror = null,
                i.resize(o.width, o.height),
                i._load = null,
                i.createBitmap ? n(i.process()) : n(i))
            };
            o.complete && o.src ? a() : (o.onload = a,
            o.onerror = function(u) {
                s(u),
                i.onError.emit(u)
            }
            )
        }
        ),
        this._load)
    }
    ,
    t.prototype.process = function() {
        var e = this
          , i = this.source;
        if (this._process !== null)
            return this._process;
        if (this.bitmap !== null || !globalThis.createImageBitmap)
            return Promise.resolve(this);
        var n = globalThis.createImageBitmap
          , s = !i.crossOrigin || i.crossOrigin === "anonymous";
        return this._process = fetch(i.src, {
            mode: s ? "cors" : "no-cors"
        }).then(function(o) {
            return o.blob()
        }).then(function(o) {
            return n(o, 0, 0, i.width, i.height, {
                premultiplyAlpha: e.alphaMode === wt.UNPACK ? "premultiply" : "none"
            })
        }).then(function(o) {
            return e.destroyed ? Promise.reject() : (e.bitmap = o,
            e.update(),
            e._process = null,
            Promise.resolve(e))
        }),
        this._process
    }
    ,
    t.prototype.upload = function(e, i, n) {
        if (typeof this.alphaMode == "number" && (i.alphaMode = this.alphaMode),
        !this.createBitmap)
            return r.prototype.upload.call(this, e, i, n);
        if (!this.bitmap && (this.process(),
        !this.bitmap))
            return !1;
        if (r.prototype.upload.call(this, e, i, n, this.bitmap),
        !this.preserveBitmap) {
            var s = !0
              , o = i._glTextures;
            for (var a in o) {
                var u = o[a];
                if (u !== n && u.dirtyId !== i.dirtyId) {
                    s = !1;
                    break
                }
            }
            s && (this.bitmap.close && this.bitmap.close(),
            this.bitmap = null)
        }
        return !0
    }
    ,
    t.prototype.dispose = function() {
        this.source.onload = null,
        this.source.onerror = null,
        r.prototype.dispose.call(this),
        this.bitmap && (this.bitmap.close(),
        this.bitmap = null),
        this._process = null,
        this._load = null
    }
    ,
    t.test = function(e) {
        return typeof e == "string" || e instanceof HTMLImageElement
    }
    ,
    t
}(Rt)
  , $s = function(r) {
    P(t, r);
    function t(e, i) {
        var n = this;
        return i = i || {},
        n = r.call(this, E.ADAPTER.createCanvas()) || this,
        n._width = 0,
        n._height = 0,
        n.svg = e,
        n.scale = i.scale || 1,
        n._overrideWidth = i.width,
        n._overrideHeight = i.height,
        n._resolve = null,
        n._crossorigin = i.crossorigin,
        n._load = null,
        i.autoLoad !== !1 && n.load(),
        n
    }
    return t.prototype.load = function() {
        var e = this;
        return this._load ? this._load : (this._load = new Promise(function(i) {
            if (e._resolve = function() {
                e.resize(e.source.width, e.source.height),
                i(e)
            }
            ,
            t.SVG_XML.test(e.svg.trim())) {
                if (!btoa)
                    throw new Error("Your browser doesn't support base64 conversions.");
                e.svg = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(e.svg)))
            }
            e._loadSvg()
        }
        ),
        this._load)
    }
    ,
    t.prototype._loadSvg = function() {
        var e = this
          , i = new Image;
        Rt.crossOrigin(i, this.svg, this._crossorigin),
        i.src = this.svg,
        i.onerror = function(n) {
            e._resolve && (i.onerror = null,
            e.onError.emit(n))
        }
        ,
        i.onload = function() {
            if (e._resolve) {
                var n = i.width
                  , s = i.height;
                if (!n || !s)
                    throw new Error("The SVG image must have width and height defined (in pixels), canvas API needs them.");
                var o = n * e.scale
                  , a = s * e.scale;
                (e._overrideWidth || e._overrideHeight) && (o = e._overrideWidth || e._overrideHeight / s * n,
                a = e._overrideHeight || e._overrideWidth / n * s),
                o = Math.round(o),
                a = Math.round(a);
                var u = e.source;
                u.width = o,
                u.height = a,
                u._pixiId = "canvas_" + ce(),
                u.getContext("2d").drawImage(i, 0, 0, n, s, 0, 0, o, a),
                e._resolve(),
                e._resolve = null
            }
        }
    }
    ,
    t.getSize = function(e) {
        var i = t.SVG_SIZE.exec(e)
          , n = {};
        return i && (n[i[1]] = Math.round(parseFloat(i[3])),
        n[i[5]] = Math.round(parseFloat(i[7]))),
        n
    }
    ,
    t.prototype.dispose = function() {
        r.prototype.dispose.call(this),
        this._resolve = null,
        this._crossorigin = null
    }
    ,
    t.test = function(e, i) {
        return i === "svg" || typeof e == "string" && /^data:image\/svg\+xml(;(charset=utf8|utf8))?;base64/.test(e) || typeof e == "string" && t.SVG_XML.test(e)
    }
    ,
    t.SVG_XML = /^(<\?xml[^?]+\?>)?\s*(<!--[^(-->)]*-->)?\s*\<svg/m,
    t.SVG_SIZE = /<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i,
    t
}(Rt)
  , Zs = function(r) {
    P(t, r);
    function t(e, i) {
        var n = this;
        if (i = i || {},
        !(e instanceof HTMLVideoElement)) {
            var s = document.createElement("video");
            s.setAttribute("preload", "auto"),
            s.setAttribute("webkit-playsinline", ""),
            s.setAttribute("playsinline", ""),
            typeof e == "string" && (e = [e]);
            var o = e[0].src || e[0];
            Rt.crossOrigin(s, o, i.crossorigin);
            for (var a = 0; a < e.length; ++a) {
                var u = document.createElement("source")
                  , h = e[a]
                  , f = h.src
                  , l = h.mime;
                f = f || e[a];
                var c = f.split("?").shift().toLowerCase()
                  , d = c.slice(c.lastIndexOf(".") + 1);
                l = l || t.MIME_TYPES[d] || "video/" + d,
                u.src = f,
                u.type = l,
                s.appendChild(u)
            }
            e = s
        }
        return n = r.call(this, e) || this,
        n.noSubImage = !0,
        n._autoUpdate = !0,
        n._isConnectedToTicker = !1,
        n._updateFPS = i.updateFPS || 0,
        n._msToNextUpdate = 0,
        n.autoPlay = i.autoPlay !== !1,
        n._load = null,
        n._resolve = null,
        n._onCanPlay = n._onCanPlay.bind(n),
        n._onError = n._onError.bind(n),
        i.autoLoad !== !1 && n.load(),
        n
    }
    return t.prototype.update = function(e) {
        if (!this.destroyed) {
            var i = Q.shared.elapsedMS * this.source.playbackRate;
            this._msToNextUpdate = Math.floor(this._msToNextUpdate - i),
            (!this._updateFPS || this._msToNextUpdate <= 0) && (r.prototype.update.call(this),
            this._msToNextUpdate = this._updateFPS ? Math.floor(1e3 / this._updateFPS) : 0)
        }
    }
    ,
    t.prototype.load = function() {
        var e = this;
        if (this._load)
            return this._load;
        var i = this.source;
        return (i.readyState === i.HAVE_ENOUGH_DATA || i.readyState === i.HAVE_FUTURE_DATA) && i.width && i.height && (i.complete = !0),
        i.addEventListener("play", this._onPlayStart.bind(this)),
        i.addEventListener("pause", this._onPlayStop.bind(this)),
        this._isSourceReady() ? this._onCanPlay() : (i.addEventListener("canplay", this._onCanPlay),
        i.addEventListener("canplaythrough", this._onCanPlay),
        i.addEventListener("error", this._onError, !0)),
        this._load = new Promise(function(n) {
            e.valid ? n(e) : (e._resolve = n,
            i.load())
        }
        ),
        this._load
    }
    ,
    t.prototype._onError = function(e) {
        this.source.removeEventListener("error", this._onError, !0),
        this.onError.emit(e)
    }
    ,
    t.prototype._isSourcePlaying = function() {
        var e = this.source;
        return e.currentTime > 0 && e.paused === !1 && e.ended === !1 && e.readyState > 2
    }
    ,
    t.prototype._isSourceReady = function() {
        var e = this.source;
        return e.readyState === 3 || e.readyState === 4
    }
    ,
    t.prototype._onPlayStart = function() {
        this.valid || this._onCanPlay(),
        this.autoUpdate && !this._isConnectedToTicker && (Q.shared.add(this.update, this),
        this._isConnectedToTicker = !0)
    }
    ,
    t.prototype._onPlayStop = function() {
        this._isConnectedToTicker && (Q.shared.remove(this.update, this),
        this._isConnectedToTicker = !1)
    }
    ,
    t.prototype._onCanPlay = function() {
        var e = this.source;
        e.removeEventListener("canplay", this._onCanPlay),
        e.removeEventListener("canplaythrough", this._onCanPlay);
        var i = this.valid;
        this.resize(e.videoWidth, e.videoHeight),
        !i && this._resolve && (this._resolve(this),
        this._resolve = null),
        this._isSourcePlaying() ? this._onPlayStart() : this.autoPlay && e.play()
    }
    ,
    t.prototype.dispose = function() {
        this._isConnectedToTicker && (Q.shared.remove(this.update, this),
        this._isConnectedToTicker = !1);
        var e = this.source;
        e && (e.removeEventListener("error", this._onError, !0),
        e.pause(),
        e.src = "",
        e.load()),
        r.prototype.dispose.call(this)
    }
    ,
    Object.defineProperty(t.prototype, "autoUpdate", {
        get: function() {
            return this._autoUpdate
        },
        set: function(e) {
            e !== this._autoUpdate && (this._autoUpdate = e,
            !this._autoUpdate && this._isConnectedToTicker ? (Q.shared.remove(this.update, this),
            this._isConnectedToTicker = !1) : this._autoUpdate && !this._isConnectedToTicker && this._isSourcePlaying() && (Q.shared.add(this.update, this),
            this._isConnectedToTicker = !0))
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "updateFPS", {
        get: function() {
            return this._updateFPS
        },
        set: function(e) {
            e !== this._updateFPS && (this._updateFPS = e)
        },
        enumerable: !1,
        configurable: !0
    }),
    t.test = function(e, i) {
        return globalThis.HTMLVideoElement && e instanceof HTMLVideoElement || t.TYPES.indexOf(i) > -1
    }
    ,
    t.TYPES = ["mp4", "m4v", "webm", "ogg", "ogv", "h264", "avi", "mov"],
    t.MIME_TYPES = {
        ogv: "video/ogg",
        mov: "video/quicktime",
        m4v: "video/mp4"
    },
    t
}(Rt)
  , Ys = function(r) {
    P(t, r);
    function t(e) {
        return r.call(this, e) || this
    }
    return t.test = function(e) {
        return !!globalThis.createImageBitmap && typeof ImageBitmap < "u" && e instanceof ImageBitmap
    }
    ,
    t
}(Rt);
Or.push(nn, Ys, Ws, Zs, $s, Ur, qs, zs);
var Ks = function(r) {
    P(t, r);
    function t() {
        return r !== null && r.apply(this, arguments) || this
    }
    return t.prototype.upload = function(e, i, n) {
        var s = e.gl;
        s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL, i.alphaMode === wt.UNPACK);
        var o = i.realWidth
          , a = i.realHeight;
        return n.width === o && n.height === a ? s.texSubImage2D(i.target, 0, 0, 0, o, a, i.format, n.type, this.data) : (n.width = o,
        n.height = a,
        s.texImage2D(i.target, 0, n.internalFormat, o, a, 0, i.format, n.type, this.data)),
        !0
    }
    ,
    t
}(Ur)
  , Sr = function() {
    function r(t, e) {
        this.width = Math.round(t || 100),
        this.height = Math.round(e || 100),
        this.stencil = !1,
        this.depth = !1,
        this.dirtyId = 0,
        this.dirtyFormat = 0,
        this.dirtySize = 0,
        this.depthTexture = null,
        this.colorTextures = [],
        this.glFramebuffers = {},
        this.disposeRunner = new $("disposeFramebuffer"),
        this.multisample = B.NONE
    }
    return Object.defineProperty(r.prototype, "colorTexture", {
        get: function() {
            return this.colorTextures[0]
        },
        enumerable: !1,
        configurable: !0
    }),
    r.prototype.addColorTexture = function(t, e) {
        return t === void 0 && (t = 0),
        this.colorTextures[t] = e || new X(null,{
            scaleMode: mt.NEAREST,
            resolution: 1,
            mipmap: Dt.OFF,
            width: this.width,
            height: this.height
        }),
        this.dirtyId++,
        this.dirtyFormat++,
        this
    }
    ,
    r.prototype.addDepthTexture = function(t) {
        return this.depthTexture = t || new X(new Ks(null,{
            width: this.width,
            height: this.height
        }),{
            scaleMode: mt.NEAREST,
            resolution: 1,
            width: this.width,
            height: this.height,
            mipmap: Dt.OFF,
            format: m.DEPTH_COMPONENT,
            type: N.UNSIGNED_SHORT
        }),
        this.dirtyId++,
        this.dirtyFormat++,
        this
    }
    ,
    r.prototype.enableDepth = function() {
        return this.depth = !0,
        this.dirtyId++,
        this.dirtyFormat++,
        this
    }
    ,
    r.prototype.enableStencil = function() {
        return this.stencil = !0,
        this.dirtyId++,
        this.dirtyFormat++,
        this
    }
    ,
    r.prototype.resize = function(t, e) {
        if (t = Math.round(t),
        e = Math.round(e),
        !(t === this.width && e === this.height)) {
            this.width = t,
            this.height = e,
            this.dirtyId++,
            this.dirtySize++;
            for (var i = 0; i < this.colorTextures.length; i++) {
                var n = this.colorTextures[i]
                  , s = n.resolution;
                n.setSize(t / s, e / s)
            }
            if (this.depthTexture) {
                var s = this.depthTexture.resolution;
                this.depthTexture.setSize(t / s, e / s)
            }
        }
    }
    ,
    r.prototype.dispose = function() {
        this.disposeRunner.emit(this, !1)
    }
    ,
    r.prototype.destroyDepthTexture = function() {
        this.depthTexture && (this.depthTexture.destroy(),
        this.depthTexture = null,
        ++this.dirtyId,
        ++this.dirtyFormat)
    }
    ,
    r
}()
  , sn = function(r) {
    P(t, r);
    function t(e) {
        e === void 0 && (e = {});
        var i = this;
        if (typeof e == "number") {
            var n = arguments[0]
              , s = arguments[1]
              , o = arguments[2]
              , a = arguments[3];
            e = {
                width: n,
                height: s,
                scaleMode: o,
                resolution: a
            }
        }
        return e.width = e.width || 100,
        e.height = e.height || 100,
        e.multisample = e.multisample !== void 0 ? e.multisample : B.NONE,
        i = r.call(this, null, e) || this,
        i.mipmap = Dt.OFF,
        i.valid = !0,
        i.clearColor = [0, 0, 0, 0],
        i.framebuffer = new Sr(i.realWidth,i.realHeight).addColorTexture(0, i),
        i.framebuffer.multisample = e.multisample,
        i.maskStack = [],
        i.filterStack = [{}],
        i
    }
    return t.prototype.resize = function(e, i) {
        this.framebuffer.resize(e * this.resolution, i * this.resolution),
        this.setRealSize(this.framebuffer.width, this.framebuffer.height)
    }
    ,
    t.prototype.dispose = function() {
        this.framebuffer.dispose(),
        r.prototype.dispose.call(this)
    }
    ,
    t.prototype.destroy = function() {
        r.prototype.destroy.call(this),
        this.framebuffer.destroyDepthTexture(),
        this.framebuffer = null
    }
    ,
    t
}(X)
  , on = function() {
    function r() {
        this.x0 = 0,
        this.y0 = 0,
        this.x1 = 1,
        this.y1 = 0,
        this.x2 = 1,
        this.y2 = 1,
        this.x3 = 0,
        this.y3 = 1,
        this.uvsFloat32 = new Float32Array(8)
    }
    return r.prototype.set = function(t, e, i) {
        var n = e.width
          , s = e.height;
        if (i) {
            var o = t.width / 2 / n
              , a = t.height / 2 / s
              , u = t.x / n + o
              , h = t.y / s + a;
            i = F.add(i, F.NW),
            this.x0 = u + o * F.uX(i),
            this.y0 = h + a * F.uY(i),
            i = F.add(i, 2),
            this.x1 = u + o * F.uX(i),
            this.y1 = h + a * F.uY(i),
            i = F.add(i, 2),
            this.x2 = u + o * F.uX(i),
            this.y2 = h + a * F.uY(i),
            i = F.add(i, 2),
            this.x3 = u + o * F.uX(i),
            this.y3 = h + a * F.uY(i)
        } else
            this.x0 = t.x / n,
            this.y0 = t.y / s,
            this.x1 = (t.x + t.width) / n,
            this.y1 = t.y / s,
            this.x2 = (t.x + t.width) / n,
            this.y2 = (t.y + t.height) / s,
            this.x3 = t.x / n,
            this.y3 = (t.y + t.height) / s;
        this.uvsFloat32[0] = this.x0,
        this.uvsFloat32[1] = this.y0,
        this.uvsFloat32[2] = this.x1,
        this.uvsFloat32[3] = this.y1,
        this.uvsFloat32[4] = this.x2,
        this.uvsFloat32[5] = this.y2,
        this.uvsFloat32[6] = this.x3,
        this.uvsFloat32[7] = this.y3
    }
    ,
    r.prototype.toString = function() {
        return "[@pixi/core:TextureUvs " + ("x0=" + this.x0 + " y0=" + this.y0 + " ") + ("x1=" + this.x1 + " y1=" + this.y1 + " x2=" + this.x2 + " ") + ("y2=" + this.y2 + " x3=" + this.x3 + " y3=" + this.y3) + "]"
    }
    ,
    r
}()
  , Oi = new on;
function Oe(r) {
    r.destroy = function() {}
    ,
    r.on = function() {}
    ,
    r.once = function() {}
    ,
    r.emit = function() {}
}
var an = function(r) {
    P(t, r);
    function t(e, i, n, s, o, a) {
        var u = r.call(this) || this;
        if (u.noFrame = !1,
        i || (u.noFrame = !0,
        i = new z(0,0,1,1)),
        e instanceof t && (e = e.baseTexture),
        u.baseTexture = e,
        u._frame = i,
        u.trim = s,
        u.valid = !1,
        u._uvs = Oi,
        u.uvMatrix = null,
        u.orig = n || i,
        u._rotate = Number(o || 0),
        o === !0)
            u._rotate = 2;
        else if (u._rotate % 2 !== 0)
            throw new Error("attempt to use diamond-shaped UVs. If you are sure, set rotation manually");
        return u.defaultAnchor = a ? new nt(a.x,a.y) : new nt(0,0),
        u._updateID = 0,
        u.textureCacheIds = [],
        e.valid ? u.noFrame ? e.valid && u.onBaseTextureUpdated(e) : u.frame = i : e.once("loaded", u.onBaseTextureUpdated, u),
        u.noFrame && e.on("update", u.onBaseTextureUpdated, u),
        u
    }
    return t.prototype.update = function() {
        this.baseTexture.resource && this.baseTexture.resource.update()
    }
    ,
    t.prototype.onBaseTextureUpdated = function(e) {
        if (this.noFrame) {
            if (!this.baseTexture.valid)
                return;
            this._frame.width = e.width,
            this._frame.height = e.height,
            this.valid = !0,
            this.updateUvs()
        } else
            this.frame = this._frame;
        this.emit("update", this)
    }
    ,
    t.prototype.destroy = function(e) {
        if (this.baseTexture) {
            if (e) {
                var i = this.baseTexture.resource;
                i && i.url && _t[i.url] && t.removeFromCache(i.url),
                this.baseTexture.destroy()
            }
            this.baseTexture.off("loaded", this.onBaseTextureUpdated, this),
            this.baseTexture.off("update", this.onBaseTextureUpdated, this),
            this.baseTexture = null
        }
        this._frame = null,
        this._uvs = null,
        this.trim = null,
        this.orig = null,
        this.valid = !1,
        t.removeFromCache(this),
        this.textureCacheIds = null
    }
    ,
    t.prototype.clone = function() {
        var e = this._frame.clone()
          , i = this._frame === this.orig ? e : this.orig.clone()
          , n = new t(this.baseTexture,!this.noFrame && e,i,this.trim && this.trim.clone(),this.rotate,this.defaultAnchor);
        return this.noFrame && (n._frame = e),
        n
    }
    ,
    t.prototype.updateUvs = function() {
        this._uvs === Oi && (this._uvs = new on),
        this._uvs.set(this._frame, this.baseTexture, this.rotate),
        this._updateID++
    }
    ,
    t.from = function(e, i, n) {
        i === void 0 && (i = {}),
        n === void 0 && (n = E.STRICT_TEXTURE_CACHE);
        var s = typeof e == "string"
          , o = null;
        if (s)
            o = e;
        else if (e instanceof X) {
            if (!e.cacheId) {
                var a = i && i.pixiIdPrefix || "pixiid";
                e.cacheId = a + "-" + ce(),
                X.addToCache(e, e.cacheId)
            }
            o = e.cacheId
        } else {
            if (!e._pixiId) {
                var a = i && i.pixiIdPrefix || "pixiid";
                e._pixiId = a + "_" + ce()
            }
            o = e._pixiId
        }
        var u = _t[o];
        if (s && n && !u)
            throw new Error('The cacheId "' + o + '" does not exist in TextureCache.');
        return !u && !(e instanceof X) ? (i.resolution || (i.resolution = Ai(e)),
        u = new t(new X(e,i)),
        u.baseTexture.cacheId = o,
        X.addToCache(u.baseTexture, o),
        t.addToCache(u, o)) : !u && e instanceof X && (u = new t(e),
        t.addToCache(u, o)),
        u
    }
    ,
    t.fromURL = function(e, i) {
        var n = Object.assign({
            autoLoad: !1
        }, i == null ? void 0 : i.resourceOptions)
          , s = t.from(e, Object.assign({
            resourceOptions: n
        }, i), !1)
          , o = s.baseTexture.resource;
        return s.baseTexture.valid ? Promise.resolve(s) : o.load().then(function() {
            return Promise.resolve(s)
        })
    }
    ,
    t.fromBuffer = function(e, i, n, s) {
        return new t(X.fromBuffer(e, i, n, s))
    }
    ,
    t.fromLoader = function(e, i, n, s) {
        var o = new X(e,Object.assign({
            scaleMode: E.SCALE_MODE,
            resolution: Ai(i)
        }, s))
          , a = o.resource;
        a instanceof nn && (a.url = i);
        var u = new t(o);
        return n || (n = i),
        X.addToCache(u.baseTexture, n),
        t.addToCache(u, n),
        n !== i && (X.addToCache(u.baseTexture, i),
        t.addToCache(u, i)),
        u.baseTexture.valid ? Promise.resolve(u) : new Promise(function(h) {
            u.baseTexture.once("loaded", function() {
                return h(u)
            })
        }
        )
    }
    ,
    t.addToCache = function(e, i) {
        i && (e.textureCacheIds.indexOf(i) === -1 && e.textureCacheIds.push(i),
        _t[i] && console.warn("Texture added to the cache with an id [" + i + "] that already had an entry"),
        _t[i] = e)
    }
    ,
    t.removeFromCache = function(e) {
        if (typeof e == "string") {
            var i = _t[e];
            if (i) {
                var n = i.textureCacheIds.indexOf(e);
                return n > -1 && i.textureCacheIds.splice(n, 1),
                delete _t[e],
                i
            }
        } else if (e && e.textureCacheIds) {
            for (var s = 0; s < e.textureCacheIds.length; ++s)
                _t[e.textureCacheIds[s]] === e && delete _t[e.textureCacheIds[s]];
            return e.textureCacheIds.length = 0,
            e
        }
        return null
    }
    ,
    Object.defineProperty(t.prototype, "resolution", {
        get: function() {
            return this.baseTexture.resolution
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "frame", {
        get: function() {
            return this._frame
        },
        set: function(e) {
            this._frame = e,
            this.noFrame = !1;
            var i = e.x
              , n = e.y
              , s = e.width
              , o = e.height
              , a = i + s > this.baseTexture.width
              , u = n + o > this.baseTexture.height;
            if (a || u) {
                var h = a && u ? "and" : "or"
                  , f = "X: " + i + " + " + s + " = " + (i + s) + " > " + this.baseTexture.width
                  , l = "Y: " + n + " + " + o + " = " + (n + o) + " > " + this.baseTexture.height;
                throw new Error("Texture Error: frame does not fit inside the base Texture dimensions: " + (f + " " + h + " " + l))
            }
            this.valid = s && o && this.baseTexture.valid,
            !this.trim && !this.rotate && (this.orig = e),
            this.valid && this.updateUvs()
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "rotate", {
        get: function() {
            return this._rotate
        },
        set: function(e) {
            this._rotate = e,
            this.valid && this.updateUvs()
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "width", {
        get: function() {
            return this.orig.width
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "height", {
        get: function() {
            return this.orig.height
        },
        enumerable: !1,
        configurable: !0
    }),
    t.prototype.castToBaseTexture = function() {
        return this.baseTexture
    }
    ,
    Object.defineProperty(t, "EMPTY", {
        get: function() {
            return t._EMPTY || (t._EMPTY = new t(new X),
            Oe(t._EMPTY),
            Oe(t._EMPTY.baseTexture)),
            t._EMPTY
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t, "WHITE", {
        get: function() {
            if (!t._WHITE) {
                var e = E.ADAPTER.createCanvas(16, 16)
                  , i = e.getContext("2d");
                e.width = 16,
                e.height = 16,
                i.fillStyle = "white",
                i.fillRect(0, 0, 16, 16),
                t._WHITE = new t(X.from(e)),
                Oe(t._WHITE),
                Oe(t._WHITE.baseTexture)
            }
            return t._WHITE
        },
        enumerable: !1,
        configurable: !0
    }),
    t
}(At)
  , Lr = function(r) {
    P(t, r);
    function t(e, i) {
        var n = r.call(this, e, i) || this;
        return n.valid = !0,
        n.filterFrame = null,
        n.filterPoolKey = null,
        n.updateUvs(),
        n
    }
    return Object.defineProperty(t.prototype, "framebuffer", {
        get: function() {
            return this.baseTexture.framebuffer
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "multisample", {
        get: function() {
            return this.framebuffer.multisample
        },
        set: function(e) {
            this.framebuffer.multisample = e
        },
        enumerable: !1,
        configurable: !0
    }),
    t.prototype.resize = function(e, i, n) {
        n === void 0 && (n = !0);
        var s = this.baseTexture.resolution
          , o = Math.round(e * s) / s
          , a = Math.round(i * s) / s;
        this.valid = o > 0 && a > 0,
        this._frame.width = this.orig.width = o,
        this._frame.height = this.orig.height = a,
        n && this.baseTexture.resize(o, a),
        this.updateUvs()
    }
    ,
    t.prototype.setResolution = function(e) {
        var i = this.baseTexture;
        i.resolution !== e && (i.setResolution(e),
        this.resize(i.width, i.height, !1))
    }
    ,
    t.create = function(e) {
        for (var i = arguments, n = [], s = 1; s < arguments.length; s++)
            n[s - 1] = i[s];
        return typeof e == "number" && (It("6.0.0", "Arguments (width, height, scaleMode, resolution) have been deprecated."),
        e = {
            width: e,
            height: n[0],
            scaleMode: n[1],
            resolution: n[2]
        }),
        new t(new sn(e))
    }
    ,
    t
}(an)
  , Js = function() {
    function r(t) {
        this.texturePool = {},
        this.textureOptions = t || {},
        this.enableFullScreen = !1,
        this._pixelsWidth = 0,
        this._pixelsHeight = 0
    }
    return r.prototype.createTexture = function(t, e, i) {
        i === void 0 && (i = B.NONE);
        var n = new sn(Object.assign({
            width: t,
            height: e,
            resolution: 1,
            multisample: i
        }, this.textureOptions));
        return new Lr(n)
    }
    ,
    r.prototype.getOptimalTexture = function(t, e, i, n) {
        i === void 0 && (i = 1),
        n === void 0 && (n = B.NONE);
        var s;
        t = Math.ceil(t * i - 1e-6),
        e = Math.ceil(e * i - 1e-6),
        !this.enableFullScreen || t !== this._pixelsWidth || e !== this._pixelsHeight ? (t = De(t),
        e = De(e),
        s = ((t & 65535) << 16 | e & 65535) >>> 0,
        n > 1 && (s += n * 4294967296)) : s = n > 1 ? -n : -1,
        this.texturePool[s] || (this.texturePool[s] = []);
        var o = this.texturePool[s].pop();
        return o || (o = this.createTexture(t, e, n)),
        o.filterPoolKey = s,
        o.setResolution(i),
        o
    }
    ,
    r.prototype.getFilterTexture = function(t, e, i) {
        var n = this.getOptimalTexture(t.width, t.height, e || t.resolution, i || B.NONE);
        return n.filterFrame = t.filterFrame,
        n
    }
    ,
    r.prototype.returnTexture = function(t) {
        var e = t.filterPoolKey;
        t.filterFrame = null,
        this.texturePool[e].push(t)
    }
    ,
    r.prototype.returnFilterTexture = function(t) {
        this.returnTexture(t)
    }
    ,
    r.prototype.clear = function(t) {
        if (t = t !== !1,
        t)
            for (var e in this.texturePool) {
                var i = this.texturePool[e];
                if (i)
                    for (var n = 0; n < i.length; n++)
                        i[n].destroy(!0)
            }
        this.texturePool = {}
    }
    ,
    r.prototype.setScreenSize = function(t) {
        if (!(t.width === this._pixelsWidth && t.height === this._pixelsHeight)) {
            this.enableFullScreen = t.width > 0 && t.height > 0;
            for (var e in this.texturePool)
                if (Number(e) < 0) {
                    var i = this.texturePool[e];
                    if (i)
                        for (var n = 0; n < i.length; n++)
                            i[n].destroy(!0);
                    this.texturePool[e] = []
                }
            this._pixelsWidth = t.width,
            this._pixelsHeight = t.height
        }
    }
    ,
    r.SCREEN_KEY = -1,
    r
}()
  , Ci = function() {
    function r(t, e, i, n, s, o, a) {
        e === void 0 && (e = 0),
        i === void 0 && (i = !1),
        n === void 0 && (n = N.FLOAT),
        this.buffer = t,
        this.size = e,
        this.normalized = i,
        this.type = n,
        this.stride = s,
        this.start = o,
        this.instance = a
    }
    return r.prototype.destroy = function() {
        this.buffer = null
    }
    ,
    r.from = function(t, e, i, n, s) {
        return new r(t,e,i,n,s)
    }
    ,
    r
}()
  , Qs = 0
  , K = function() {
    function r(t, e, i) {
        e === void 0 && (e = !0),
        i === void 0 && (i = !1),
        this.data = t || new Float32Array(1),
        this._glBuffers = {},
        this._updateID = 0,
        this.index = i,
        this.static = e,
        this.id = Qs++,
        this.disposeRunner = new $("disposeBuffer")
    }
    return r.prototype.update = function(t) {
        t instanceof Array && (t = new Float32Array(t)),
        this.data = t || this.data,
        this._updateID++
    }
    ,
    r.prototype.dispose = function() {
        this.disposeRunner.emit(this, !1)
    }
    ,
    r.prototype.destroy = function() {
        this.dispose(),
        this.data = null
    }
    ,
    Object.defineProperty(r.prototype, "index", {
        get: function() {
            return this.type === ct.ELEMENT_ARRAY_BUFFER
        },
        set: function(t) {
            this.type = t ? ct.ELEMENT_ARRAY_BUFFER : ct.ARRAY_BUFFER
        },
        enumerable: !1,
        configurable: !0
    }),
    r.from = function(t) {
        return t instanceof Array && (t = new Float32Array(t)),
        new r(t)
    }
    ,
    r
}()
  , to = {
    Float32Array,
    Uint32Array,
    Int32Array,
    Uint8Array
};
function eo(r, t) {
    for (var e = 0, i = 0, n = {}, s = 0; s < r.length; s++)
        i += t[s],
        e += r[s].length;
    for (var o = new ArrayBuffer(e * 4), a = null, u = 0, s = 0; s < r.length; s++) {
        var h = t[s]
          , f = r[s]
          , l = Qi(f);
        n[l] || (n[l] = new to[l](o)),
        a = n[l];
        for (var c = 0; c < f.length; c++) {
            var d = (c / h | 0) * i + u
              , p = c % h;
            a[d + p] = f[c]
        }
        u += h
    }
    return new Float32Array(o)
}
var Pi = {
    5126: 4,
    5123: 2,
    5121: 1
}
  , ro = 0
  , io = {
    Float32Array,
    Uint32Array,
    Int32Array,
    Uint8Array,
    Uint16Array
}
  , Mr = function() {
    function r(t, e) {
        t === void 0 && (t = []),
        e === void 0 && (e = {}),
        this.buffers = t,
        this.indexBuffer = null,
        this.attributes = e,
        this.glVertexArrayObjects = {},
        this.id = ro++,
        this.instanced = !1,
        this.instanceCount = 1,
        this.disposeRunner = new $("disposeGeometry"),
        this.refCount = 0
    }
    return r.prototype.addAttribute = function(t, e, i, n, s, o, a, u) {
        if (i === void 0 && (i = 0),
        n === void 0 && (n = !1),
        u === void 0 && (u = !1),
        !e)
            throw new Error("You must pass a buffer when creating an attribute");
        e instanceof K || (e instanceof Array && (e = new Float32Array(e)),
        e = new K(e));
        var h = t.split("|");
        if (h.length > 1) {
            for (var f = 0; f < h.length; f++)
                this.addAttribute(h[f], e, i, n, s);
            return this
        }
        var l = this.buffers.indexOf(e);
        return l === -1 && (this.buffers.push(e),
        l = this.buffers.length - 1),
        this.attributes[t] = new Ci(l,i,n,s,o,a,u),
        this.instanced = this.instanced || u,
        this
    }
    ,
    r.prototype.getAttribute = function(t) {
        return this.attributes[t]
    }
    ,
    r.prototype.getBuffer = function(t) {
        return this.buffers[this.getAttribute(t).buffer]
    }
    ,
    r.prototype.addIndex = function(t) {
        return t instanceof K || (t instanceof Array && (t = new Uint16Array(t)),
        t = new K(t)),
        t.type = ct.ELEMENT_ARRAY_BUFFER,
        this.indexBuffer = t,
        this.buffers.indexOf(t) === -1 && this.buffers.push(t),
        this
    }
    ,
    r.prototype.getIndex = function() {
        return this.indexBuffer
    }
    ,
    r.prototype.interleave = function() {
        if (this.buffers.length === 1 || this.buffers.length === 2 && this.indexBuffer)
            return this;
        var t = [], e = [], i = new K, n;
        for (n in this.attributes) {
            var s = this.attributes[n]
              , o = this.buffers[s.buffer];
            t.push(o.data),
            e.push(s.size * Pi[s.type] / 4),
            s.buffer = 0
        }
        for (i.data = eo(t, e),
        n = 0; n < this.buffers.length; n++)
            this.buffers[n] !== this.indexBuffer && this.buffers[n].destroy();
        return this.buffers = [i],
        this.indexBuffer && this.buffers.push(this.indexBuffer),
        this
    }
    ,
    r.prototype.getSize = function() {
        for (var t in this.attributes) {
            var e = this.attributes[t]
              , i = this.buffers[e.buffer];
            return i.data.length / (e.stride / 4 || e.size)
        }
        return 0
    }
    ,
    r.prototype.dispose = function() {
        this.disposeRunner.emit(this, !1)
    }
    ,
    r.prototype.destroy = function() {
        this.dispose(),
        this.buffers = null,
        this.indexBuffer = null,
        this.attributes = null
    }
    ,
    r.prototype.clone = function() {
        for (var t = new r, e = 0; e < this.buffers.length; e++)
            t.buffers[e] = new K(this.buffers[e].data.slice(0));
        for (var e in this.attributes) {
            var i = this.attributes[e];
            t.attributes[e] = new Ci(i.buffer,i.size,i.normalized,i.type,i.stride,i.start,i.instance)
        }
        return this.indexBuffer && (t.indexBuffer = t.buffers[this.buffers.indexOf(this.indexBuffer)],
        t.indexBuffer.type = ct.ELEMENT_ARRAY_BUFFER),
        t
    }
    ,
    r.merge = function(t) {
        for (var e = new r, i = [], n = [], s = [], o, a = 0; a < t.length; a++) {
            o = t[a];
            for (var u = 0; u < o.buffers.length; u++)
                n[u] = n[u] || 0,
                n[u] += o.buffers[u].data.length,
                s[u] = 0
        }
        for (var a = 0; a < o.buffers.length; a++)
            i[a] = new io[Qi(o.buffers[a].data)](n[a]),
            e.buffers[a] = new K(i[a]);
        for (var a = 0; a < t.length; a++) {
            o = t[a];
            for (var u = 0; u < o.buffers.length; u++)
                i[u].set(o.buffers[u].data, s[u]),
                s[u] += o.buffers[u].data.length
        }
        if (e.attributes = o.attributes,
        o.indexBuffer) {
            e.indexBuffer = e.buffers[o.buffers.indexOf(o.indexBuffer)],
            e.indexBuffer.type = ct.ELEMENT_ARRAY_BUFFER;
            for (var h = 0, f = 0, l = 0, c = 0, a = 0; a < o.buffers.length; a++)
                if (o.buffers[a] !== o.indexBuffer) {
                    c = a;
                    break
                }
            for (var a in o.attributes) {
                var d = o.attributes[a];
                (d.buffer | 0) === c && (f += d.size * Pi[d.type] / 4)
            }
            for (var a = 0; a < t.length; a++) {
                for (var p = t[a].indexBuffer.data, u = 0; u < p.length; u++)
                    e.indexBuffer.data[u + l] += h;
                h += t[a].buffers[c].data.length / f,
                l += p.length
            }
        }
        return e
    }
    ,
    r
}()
  , no = function(r) {
    P(t, r);
    function t() {
        var e = r.call(this) || this;
        return e.addAttribute("aVertexPosition", new Float32Array([0, 0, 1, 0, 1, 1, 0, 1])).addIndex([0, 1, 3, 2]),
        e
    }
    return t
}(Mr)
  , so = function(r) {
    P(t, r);
    function t() {
        var e = r.call(this) || this;
        return e.vertices = new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]),
        e.uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
        e.vertexBuffer = new K(e.vertices),
        e.uvBuffer = new K(e.uvs),
        e.addAttribute("aVertexPosition", e.vertexBuffer).addAttribute("aTextureCoord", e.uvBuffer).addIndex([0, 1, 2, 0, 2, 3]),
        e
    }
    return t.prototype.map = function(e, i) {
        var n = 0
          , s = 0;
        return this.uvs[0] = n,
        this.uvs[1] = s,
        this.uvs[2] = n + i.width / e.width,
        this.uvs[3] = s,
        this.uvs[4] = n + i.width / e.width,
        this.uvs[5] = s + i.height / e.height,
        this.uvs[6] = n,
        this.uvs[7] = s + i.height / e.height,
        n = i.x,
        s = i.y,
        this.vertices[0] = n,
        this.vertices[1] = s,
        this.vertices[2] = n + i.width,
        this.vertices[3] = s,
        this.vertices[4] = n + i.width,
        this.vertices[5] = s + i.height,
        this.vertices[6] = n,
        this.vertices[7] = s + i.height,
        this.invalidate(),
        this
    }
    ,
    t.prototype.invalidate = function() {
        return this.vertexBuffer._updateID++,
        this.uvBuffer._updateID++,
        this
    }
    ,
    t
}(Mr)
  , oo = 0
  , $t = function() {
    function r(t, e, i) {
        this.group = !0,
        this.syncUniforms = {},
        this.dirtyId = 0,
        this.id = oo++,
        this.static = !!e,
        this.ubo = !!i,
        t instanceof K ? (this.buffer = t,
        this.buffer.type = ct.UNIFORM_BUFFER,
        this.autoManage = !1,
        this.ubo = !0) : (this.uniforms = t,
        this.ubo && (this.buffer = new K(new Float32Array(1)),
        this.buffer.type = ct.UNIFORM_BUFFER,
        this.autoManage = !0))
    }
    return r.prototype.update = function() {
        this.dirtyId++,
        !this.autoManage && this.buffer && this.buffer.update()
    }
    ,
    r.prototype.add = function(t, e, i) {
        if (!this.ubo)
            this.uniforms[t] = new r(e,i);
        else
            throw new Error("[UniformGroup] uniform groups in ubo mode cannot be modified, or have uniform groups nested in them")
    }
    ,
    r.from = function(t, e, i) {
        return new r(t,e,i)
    }
    ,
    r.uboFrom = function(t, e) {
        return new r(t,e ?? !0,!0)
    }
    ,
    r
}()
  , ao = function() {
    function r() {
        this.renderTexture = null,
        this.target = null,
        this.legacy = !1,
        this.resolution = 1,
        this.multisample = B.NONE,
        this.sourceFrame = new z,
        this.destinationFrame = new z,
        this.bindingSourceFrame = new z,
        this.bindingDestinationFrame = new z,
        this.filters = [],
        this.transform = null
    }
    return r.prototype.clear = function() {
        this.target = null,
        this.filters = null,
        this.renderTexture = null
    }
    ,
    r
}()
  , Ce = [new nt, new nt, new nt, new nt]
  , Ye = new tt
  , uo = function() {
    function r(t) {
        this.renderer = t,
        this.defaultFilterStack = [{}],
        this.texturePool = new Js,
        this.texturePool.setScreenSize(t.view),
        this.statePool = [],
        this.quad = new no,
        this.quadUv = new so,
        this.tempRect = new z,
        this.activeState = {},
        this.globalUniforms = new $t({
            outputFrame: new z,
            inputSize: new Float32Array(4),
            inputPixel: new Float32Array(4),
            inputClamp: new Float32Array(4),
            resolution: 1,
            filterArea: new Float32Array(4),
            filterClamp: new Float32Array(4)
        },!0),
        this.forceClear = !1,
        this.useMaxPadding = !1
    }
    return r.prototype.push = function(t, e) {
        for (var i, n, s = this.renderer, o = this.defaultFilterStack, a = this.statePool.pop() || new ao, u = this.renderer.renderTexture, h = e[0].resolution, f = e[0].multisample, l = e[0].padding, c = e[0].autoFit, d = (i = e[0].legacy) !== null && i !== void 0 ? i : !0, p = 1; p < e.length; p++) {
            var y = e[p];
            h = Math.min(h, y.resolution),
            f = Math.min(f, y.multisample),
            l = this.useMaxPadding ? Math.max(l, y.padding) : l + y.padding,
            c = c && y.autoFit,
            d = d || ((n = y.legacy) !== null && n !== void 0 ? n : !0)
        }
        o.length === 1 && (this.defaultFilterStack[0].renderTexture = u.current),
        o.push(a),
        a.resolution = h,
        a.multisample = f,
        a.legacy = d,
        a.target = t,
        a.sourceFrame.copyFrom(t.filterArea || t.getBounds(!0)),
        a.sourceFrame.pad(l);
        var v = this.tempRect.copyFrom(u.sourceFrame);
        s.projection.transform && this.transformAABB(Ye.copyFrom(s.projection.transform).invert(), v),
        c ? (a.sourceFrame.fit(v),
        (a.sourceFrame.width <= 0 || a.sourceFrame.height <= 0) && (a.sourceFrame.width = 0,
        a.sourceFrame.height = 0)) : a.sourceFrame.intersects(v) || (a.sourceFrame.width = 0,
        a.sourceFrame.height = 0),
        this.roundFrame(a.sourceFrame, u.current ? u.current.resolution : s.resolution, u.sourceFrame, u.destinationFrame, s.projection.transform),
        a.renderTexture = this.getOptimalFilterTexture(a.sourceFrame.width, a.sourceFrame.height, h, f),
        a.filters = e,
        a.destinationFrame.width = a.renderTexture.width,
        a.destinationFrame.height = a.renderTexture.height;
        var T = this.tempRect;
        T.x = 0,
        T.y = 0,
        T.width = a.sourceFrame.width,
        T.height = a.sourceFrame.height,
        a.renderTexture.filterFrame = a.sourceFrame,
        a.bindingSourceFrame.copyFrom(u.sourceFrame),
        a.bindingDestinationFrame.copyFrom(u.destinationFrame),
        a.transform = s.projection.transform,
        s.projection.transform = null,
        u.bind(a.renderTexture, a.sourceFrame, T),
        s.framebuffer.clear(0, 0, 0, 0)
    }
    ,
    r.prototype.pop = function() {
        var t = this.defaultFilterStack
          , e = t.pop()
          , i = e.filters;
        this.activeState = e;
        var n = this.globalUniforms.uniforms;
        n.outputFrame = e.sourceFrame,
        n.resolution = e.resolution;
        var s = n.inputSize
          , o = n.inputPixel
          , a = n.inputClamp;
        if (s[0] = e.destinationFrame.width,
        s[1] = e.destinationFrame.height,
        s[2] = 1 / s[0],
        s[3] = 1 / s[1],
        o[0] = Math.round(s[0] * e.resolution),
        o[1] = Math.round(s[1] * e.resolution),
        o[2] = 1 / o[0],
        o[3] = 1 / o[1],
        a[0] = .5 * o[2],
        a[1] = .5 * o[3],
        a[2] = e.sourceFrame.width * s[2] - .5 * o[2],
        a[3] = e.sourceFrame.height * s[3] - .5 * o[3],
        e.legacy) {
            var u = n.filterArea;
            u[0] = e.destinationFrame.width,
            u[1] = e.destinationFrame.height,
            u[2] = e.sourceFrame.x,
            u[3] = e.sourceFrame.y,
            n.filterClamp = n.inputClamp
        }
        this.globalUniforms.update();
        var h = t[t.length - 1];
        if (this.renderer.framebuffer.blit(),
        i.length === 1)
            i[0].apply(this, e.renderTexture, h.renderTexture, Tt.BLEND, e),
            this.returnFilterTexture(e.renderTexture);
        else {
            var f = e.renderTexture
              , l = this.getOptimalFilterTexture(f.width, f.height, e.resolution);
            l.filterFrame = f.filterFrame;
            var c = 0;
            for (c = 0; c < i.length - 1; ++c) {
                c === 1 && e.multisample > 1 && (l = this.getOptimalFilterTexture(f.width, f.height, e.resolution),
                l.filterFrame = f.filterFrame),
                i[c].apply(this, f, l, Tt.CLEAR, e);
                var d = f;
                f = l,
                l = d
            }
            i[c].apply(this, f, h.renderTexture, Tt.BLEND, e),
            c > 1 && e.multisample > 1 && this.returnFilterTexture(e.renderTexture),
            this.returnFilterTexture(f),
            this.returnFilterTexture(l)
        }
        e.clear(),
        this.statePool.push(e)
    }
    ,
    r.prototype.bindAndClear = function(t, e) {
        e === void 0 && (e = Tt.CLEAR);
        var i = this.renderer
          , n = i.renderTexture
          , s = i.state;
        if (t === this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture ? this.renderer.projection.transform = this.activeState.transform : this.renderer.projection.transform = null,
        t && t.filterFrame) {
            var o = this.tempRect;
            o.x = 0,
            o.y = 0,
            o.width = t.filterFrame.width,
            o.height = t.filterFrame.height,
            n.bind(t, t.filterFrame, o)
        } else
            t !== this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture ? n.bind(t) : this.renderer.renderTexture.bind(t, this.activeState.bindingSourceFrame, this.activeState.bindingDestinationFrame);
        var a = s.stateId & 1 || this.forceClear;
        (e === Tt.CLEAR || e === Tt.BLIT && a) && this.renderer.framebuffer.clear(0, 0, 0, 0)
    }
    ,
    r.prototype.applyFilter = function(t, e, i, n) {
        var s = this.renderer;
        s.state.set(t.state),
        this.bindAndClear(i, n),
        t.uniforms.uSampler = e,
        t.uniforms.filterGlobals = this.globalUniforms,
        s.shader.bind(t),
        t.legacy = !!t.program.attributeData.aTextureCoord,
        t.legacy ? (this.quadUv.map(e._frame, e.filterFrame),
        s.geometry.bind(this.quadUv),
        s.geometry.draw(ae.TRIANGLES)) : (s.geometry.bind(this.quad),
        s.geometry.draw(ae.TRIANGLE_STRIP))
    }
    ,
    r.prototype.calculateSpriteMatrix = function(t, e) {
        var i = this.activeState
          , n = i.sourceFrame
          , s = i.destinationFrame
          , o = e._texture.orig
          , a = t.set(s.width, 0, 0, s.height, n.x, n.y)
          , u = e.worldTransform.copyTo(tt.TEMP_MATRIX);
        return u.invert(),
        a.prepend(u),
        a.scale(1 / o.width, 1 / o.height),
        a.translate(e.anchor.x, e.anchor.y),
        a
    }
    ,
    r.prototype.destroy = function() {
        this.renderer = null,
        this.texturePool.clear(!1)
    }
    ,
    r.prototype.getOptimalFilterTexture = function(t, e, i, n) {
        return i === void 0 && (i = 1),
        n === void 0 && (n = B.NONE),
        this.texturePool.getOptimalTexture(t, e, i, n)
    }
    ,
    r.prototype.getFilterTexture = function(t, e, i) {
        if (typeof t == "number") {
            var n = t;
            t = e,
            e = n
        }
        t = t || this.activeState.renderTexture;
        var s = this.texturePool.getOptimalTexture(t.width, t.height, e || t.resolution, i || B.NONE);
        return s.filterFrame = t.filterFrame,
        s
    }
    ,
    r.prototype.returnFilterTexture = function(t) {
        this.texturePool.returnTexture(t)
    }
    ,
    r.prototype.emptyPool = function() {
        this.texturePool.clear(!0)
    }
    ,
    r.prototype.resize = function() {
        this.texturePool.setScreenSize(this.renderer.view)
    }
    ,
    r.prototype.transformAABB = function(t, e) {
        var i = Ce[0]
          , n = Ce[1]
          , s = Ce[2]
          , o = Ce[3];
        i.set(e.left, e.top),
        n.set(e.left, e.bottom),
        s.set(e.right, e.top),
        o.set(e.right, e.bottom),
        t.apply(i, i),
        t.apply(n, n),
        t.apply(s, s),
        t.apply(o, o);
        var a = Math.min(i.x, n.x, s.x, o.x)
          , u = Math.min(i.y, n.y, s.y, o.y)
          , h = Math.max(i.x, n.x, s.x, o.x)
          , f = Math.max(i.y, n.y, s.y, o.y);
        e.x = a,
        e.y = u,
        e.width = h - a,
        e.height = f - u
    }
    ,
    r.prototype.roundFrame = function(t, e, i, n, s) {
        if (!(t.width <= 0 || t.height <= 0 || i.width <= 0 || i.height <= 0)) {
            if (s) {
                var o = s.a
                  , a = s.b
                  , u = s.c
                  , h = s.d;
                if ((Math.abs(a) > 1e-4 || Math.abs(u) > 1e-4) && (Math.abs(o) > 1e-4 || Math.abs(h) > 1e-4))
                    return
            }
            s = s ? Ye.copyFrom(s) : Ye.identity(),
            s.translate(-i.x, -i.y).scale(n.width / i.width, n.height / i.height).translate(n.x, n.y),
            this.transformAABB(s, t),
            t.ceil(e),
            this.transformAABB(s.invert(), t)
        }
    }
    ,
    r
}()
  , un = function() {
    function r(t) {
        this.renderer = t
    }
    return r.prototype.flush = function() {}
    ,
    r.prototype.destroy = function() {
        this.renderer = null
    }
    ,
    r.prototype.start = function() {}
    ,
    r.prototype.stop = function() {
        this.flush()
    }
    ,
    r.prototype.render = function(t) {}
    ,
    r
}()
  , ho = function() {
    function r(t) {
        this.renderer = t,
        this.emptyRenderer = new un(t),
        this.currentRenderer = this.emptyRenderer
    }
    return r.prototype.setObjectRenderer = function(t) {
        this.currentRenderer !== t && (this.currentRenderer.stop(),
        this.currentRenderer = t,
        this.currentRenderer.start())
    }
    ,
    r.prototype.flush = function() {
        this.setObjectRenderer(this.emptyRenderer)
    }
    ,
    r.prototype.reset = function() {
        this.setObjectRenderer(this.emptyRenderer)
    }
    ,
    r.prototype.copyBoundTextures = function(t, e) {
        for (var i = this.renderer.texture.boundTextures, n = e - 1; n >= 0; --n)
            t[n] = i[n] || null,
            t[n] && (t[n]._batchLocation = n)
    }
    ,
    r.prototype.boundArray = function(t, e, i, n) {
        for (var s = t.elements, o = t.ids, a = t.count, u = 0, h = 0; h < a; h++) {
            var f = s[h]
              , l = f._batchLocation;
            if (l >= 0 && l < n && e[l] === f) {
                o[h] = l;
                continue
            }
            for (; u < n; ) {
                var c = e[u];
                if (c && c._batchEnabled === i && c._batchLocation === u) {
                    u++;
                    continue
                }
                o[h] = u,
                f._batchLocation = u,
                e[u] = f;
                break
            }
        }
    }
    ,
    r.prototype.destroy = function() {
        this.renderer = null
    }
    ,
    r
}()
  , Si = 0
  , fo = function() {
    function r(t) {
        this.renderer = t,
        this.webGLVersion = 1,
        this.extensions = {},
        this.supports = {
            uint32Indices: !1
        },
        this.handleContextLost = this.handleContextLost.bind(this),
        this.handleContextRestored = this.handleContextRestored.bind(this),
        t.view.addEventListener("webglcontextlost", this.handleContextLost, !1),
        t.view.addEventListener("webglcontextrestored", this.handleContextRestored, !1)
    }
    return Object.defineProperty(r.prototype, "isLost", {
        get: function() {
            return !this.gl || this.gl.isContextLost()
        },
        enumerable: !1,
        configurable: !0
    }),
    r.prototype.contextChange = function(t) {
        this.gl = t,
        this.renderer.gl = t,
        this.renderer.CONTEXT_UID = Si++,
        t.isContextLost() && t.getExtension("WEBGL_lose_context") && t.getExtension("WEBGL_lose_context").restoreContext()
    }
    ,
    r.prototype.initFromContext = function(t) {
        this.gl = t,
        this.validateContext(t),
        this.renderer.gl = t,
        this.renderer.CONTEXT_UID = Si++,
        this.renderer.runners.contextChange.emit(t)
    }
    ,
    r.prototype.initFromOptions = function(t) {
        var e = this.createContext(this.renderer.view, t);
        this.initFromContext(e)
    }
    ,
    r.prototype.createContext = function(t, e) {
        var i;
        if (E.PREFER_ENV >= bt.WEBGL2 && (i = t.getContext("webgl2", e)),
        i)
            this.webGLVersion = 2;
        else if (this.webGLVersion = 1,
        i = t.getContext("webgl", e) || t.getContext("experimental-webgl", e),
        !i)
            throw new Error("This browser does not support WebGL. Try using the canvas renderer");
        return this.gl = i,
        this.getExtensions(),
        this.gl
    }
    ,
    r.prototype.getExtensions = function() {
        var t = this.gl
          , e = {
            anisotropicFiltering: t.getExtension("EXT_texture_filter_anisotropic"),
            floatTextureLinear: t.getExtension("OES_texture_float_linear"),
            s3tc: t.getExtension("WEBGL_compressed_texture_s3tc"),
            s3tc_sRGB: t.getExtension("WEBGL_compressed_texture_s3tc_srgb"),
            etc: t.getExtension("WEBGL_compressed_texture_etc"),
            etc1: t.getExtension("WEBGL_compressed_texture_etc1"),
            pvrtc: t.getExtension("WEBGL_compressed_texture_pvrtc") || t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),
            atc: t.getExtension("WEBGL_compressed_texture_atc"),
            astc: t.getExtension("WEBGL_compressed_texture_astc")
        };
        this.webGLVersion === 1 ? Object.assign(this.extensions, e, {
            drawBuffers: t.getExtension("WEBGL_draw_buffers"),
            depthTexture: t.getExtension("WEBGL_depth_texture"),
            loseContext: t.getExtension("WEBGL_lose_context"),
            vertexArrayObject: t.getExtension("OES_vertex_array_object") || t.getExtension("MOZ_OES_vertex_array_object") || t.getExtension("WEBKIT_OES_vertex_array_object"),
            uint32ElementIndex: t.getExtension("OES_element_index_uint"),
            floatTexture: t.getExtension("OES_texture_float"),
            floatTextureLinear: t.getExtension("OES_texture_float_linear"),
            textureHalfFloat: t.getExtension("OES_texture_half_float"),
            textureHalfFloatLinear: t.getExtension("OES_texture_half_float_linear")
        }) : this.webGLVersion === 2 && Object.assign(this.extensions, e, {
            colorBufferFloat: t.getExtension("EXT_color_buffer_float")
        })
    }
    ,
    r.prototype.handleContextLost = function(t) {
        t.preventDefault()
    }
    ,
    r.prototype.handleContextRestored = function() {
        this.renderer.runners.contextChange.emit(this.gl)
    }
    ,
    r.prototype.destroy = function() {
        var t = this.renderer.view;
        this.renderer = null,
        t.removeEventListener("webglcontextlost", this.handleContextLost),
        t.removeEventListener("webglcontextrestored", this.handleContextRestored),
        this.gl.useProgram(null),
        this.extensions.loseContext && this.extensions.loseContext.loseContext()
    }
    ,
    r.prototype.postrender = function() {
        this.renderer.renderingToScreen && this.gl.flush()
    }
    ,
    r.prototype.validateContext = function(t) {
        var e = t.getContextAttributes()
          , i = "WebGL2RenderingContext"in globalThis && t instanceof globalThis.WebGL2RenderingContext;
        i && (this.webGLVersion = 2),
        e && !e.stencil && console.warn("Provided WebGL context does not have a stencil buffer, masks may not render correctly");
        var n = i || !!t.getExtension("OES_element_index_uint");
        this.supports.uint32Indices = n,
        n || console.warn("Provided WebGL context does not support 32 index buffer, complex graphics may not render correctly")
    }
    ,
    r
}()
  , lo = function() {
    function r(t) {
        this.framebuffer = t,
        this.stencil = null,
        this.dirtyId = -1,
        this.dirtyFormat = -1,
        this.dirtySize = -1,
        this.multisample = B.NONE,
        this.msaaBuffer = null,
        this.blitFramebuffer = null,
        this.mipLevel = 0
    }
    return r
}()
  , co = new z
  , po = function() {
    function r(t) {
        this.renderer = t,
        this.managedFramebuffers = [],
        this.unknownFramebuffer = new Sr(10,10),
        this.msaaSamples = null
    }
    return r.prototype.contextChange = function() {
        var t = this.gl = this.renderer.gl;
        if (this.CONTEXT_UID = this.renderer.CONTEXT_UID,
        this.current = this.unknownFramebuffer,
        this.viewport = new z,
        this.hasMRT = !0,
        this.writeDepthTexture = !0,
        this.disposeAll(!0),
        this.renderer.context.webGLVersion === 1) {
            var e = this.renderer.context.extensions.drawBuffers
              , i = this.renderer.context.extensions.depthTexture;
            E.PREFER_ENV === bt.WEBGL_LEGACY && (e = null,
            i = null),
            e ? t.drawBuffers = function(n) {
                return e.drawBuffersWEBGL(n)
            }
            : (this.hasMRT = !1,
            t.drawBuffers = function() {}
            ),
            i || (this.writeDepthTexture = !1)
        } else
            this.msaaSamples = t.getInternalformatParameter(t.RENDERBUFFER, t.RGBA8, t.SAMPLES)
    }
    ,
    r.prototype.bind = function(t, e, i) {
        i === void 0 && (i = 0);
        var n = this.gl;
        if (t) {
            var s = t.glFramebuffers[this.CONTEXT_UID] || this.initFramebuffer(t);
            this.current !== t && (this.current = t,
            n.bindFramebuffer(n.FRAMEBUFFER, s.framebuffer)),
            s.mipLevel !== i && (t.dirtyId++,
            t.dirtyFormat++,
            s.mipLevel = i),
            s.dirtyId !== t.dirtyId && (s.dirtyId = t.dirtyId,
            s.dirtyFormat !== t.dirtyFormat ? (s.dirtyFormat = t.dirtyFormat,
            s.dirtySize = t.dirtySize,
            this.updateFramebuffer(t, i)) : s.dirtySize !== t.dirtySize && (s.dirtySize = t.dirtySize,
            this.resizeFramebuffer(t)));
            for (var o = 0; o < t.colorTextures.length; o++) {
                var a = t.colorTextures[o];
                this.renderer.texture.unbind(a.parentTextureArray || a)
            }
            if (t.depthTexture && this.renderer.texture.unbind(t.depthTexture),
            e) {
                var u = e.width >> i
                  , h = e.height >> i
                  , f = u / e.width;
                this.setViewport(e.x * f, e.y * f, u, h)
            } else {
                var u = t.width >> i
                  , h = t.height >> i;
                this.setViewport(0, 0, u, h)
            }
        } else
            this.current && (this.current = null,
            n.bindFramebuffer(n.FRAMEBUFFER, null)),
            e ? this.setViewport(e.x, e.y, e.width, e.height) : this.setViewport(0, 0, this.renderer.width, this.renderer.height)
    }
    ,
    r.prototype.setViewport = function(t, e, i, n) {
        var s = this.viewport;
        t = Math.round(t),
        e = Math.round(e),
        i = Math.round(i),
        n = Math.round(n),
        (s.width !== i || s.height !== n || s.x !== t || s.y !== e) && (s.x = t,
        s.y = e,
        s.width = i,
        s.height = n,
        this.gl.viewport(t, e, i, n))
    }
    ,
    Object.defineProperty(r.prototype, "size", {
        get: function() {
            return this.current ? {
                x: 0,
                y: 0,
                width: this.current.width,
                height: this.current.height
            } : {
                x: 0,
                y: 0,
                width: this.renderer.width,
                height: this.renderer.height
            }
        },
        enumerable: !1,
        configurable: !0
    }),
    r.prototype.clear = function(t, e, i, n, s) {
        s === void 0 && (s = Ge.COLOR | Ge.DEPTH);
        var o = this.gl;
        o.clearColor(t, e, i, n),
        o.clear(s)
    }
    ,
    r.prototype.initFramebuffer = function(t) {
        var e = this.gl
          , i = new lo(e.createFramebuffer());
        return i.multisample = this.detectSamples(t.multisample),
        t.glFramebuffers[this.CONTEXT_UID] = i,
        this.managedFramebuffers.push(t),
        t.disposeRunner.add(this),
        i
    }
    ,
    r.prototype.resizeFramebuffer = function(t) {
        var e = this.gl
          , i = t.glFramebuffers[this.CONTEXT_UID];
        i.msaaBuffer && (e.bindRenderbuffer(e.RENDERBUFFER, i.msaaBuffer),
        e.renderbufferStorageMultisample(e.RENDERBUFFER, i.multisample, e.RGBA8, t.width, t.height)),
        i.stencil && (e.bindRenderbuffer(e.RENDERBUFFER, i.stencil),
        i.msaaBuffer ? e.renderbufferStorageMultisample(e.RENDERBUFFER, i.multisample, e.DEPTH24_STENCIL8, t.width, t.height) : e.renderbufferStorage(e.RENDERBUFFER, e.DEPTH_STENCIL, t.width, t.height));
        var n = t.colorTextures
          , s = n.length;
        e.drawBuffers || (s = Math.min(s, 1));
        for (var o = 0; o < s; o++) {
            var a = n[o]
              , u = a.parentTextureArray || a;
            this.renderer.texture.bind(u, 0)
        }
        t.depthTexture && this.writeDepthTexture && this.renderer.texture.bind(t.depthTexture, 0)
    }
    ,
    r.prototype.updateFramebuffer = function(t, e) {
        var i = this.gl
          , n = t.glFramebuffers[this.CONTEXT_UID]
          , s = t.colorTextures
          , o = s.length;
        i.drawBuffers || (o = Math.min(o, 1)),
        n.multisample > 1 && this.canMultisampleFramebuffer(t) ? (n.msaaBuffer = n.msaaBuffer || i.createRenderbuffer(),
        i.bindRenderbuffer(i.RENDERBUFFER, n.msaaBuffer),
        i.renderbufferStorageMultisample(i.RENDERBUFFER, n.multisample, i.RGBA8, t.width, t.height),
        i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.RENDERBUFFER, n.msaaBuffer)) : n.msaaBuffer && (i.deleteRenderbuffer(n.msaaBuffer),
        n.msaaBuffer = null,
        n.blitFramebuffer && (n.blitFramebuffer.dispose(),
        n.blitFramebuffer = null));
        for (var a = [], u = 0; u < o; u++) {
            var h = s[u]
              , f = h.parentTextureArray || h;
            this.renderer.texture.bind(f, 0),
            !(u === 0 && n.msaaBuffer) && (i.framebufferTexture2D(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + u, h.target, f._glTextures[this.CONTEXT_UID].texture, e),
            a.push(i.COLOR_ATTACHMENT0 + u))
        }
        if (a.length > 1 && i.drawBuffers(a),
        t.depthTexture) {
            var l = this.writeDepthTexture;
            if (l) {
                var c = t.depthTexture;
                this.renderer.texture.bind(c, 0),
                i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, c._glTextures[this.CONTEXT_UID].texture, e)
            }
        }
        (t.stencil || t.depth) && !(t.depthTexture && this.writeDepthTexture) ? (n.stencil = n.stencil || i.createRenderbuffer(),
        i.bindRenderbuffer(i.RENDERBUFFER, n.stencil),
        n.msaaBuffer ? i.renderbufferStorageMultisample(i.RENDERBUFFER, n.multisample, i.DEPTH24_STENCIL8, t.width, t.height) : i.renderbufferStorage(i.RENDERBUFFER, i.DEPTH_STENCIL, t.width, t.height),
        i.framebufferRenderbuffer(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.RENDERBUFFER, n.stencil)) : n.stencil && (i.deleteRenderbuffer(n.stencil),
        n.stencil = null)
    }
    ,
    r.prototype.canMultisampleFramebuffer = function(t) {
        return this.renderer.context.webGLVersion !== 1 && t.colorTextures.length <= 1 && !t.depthTexture
    }
    ,
    r.prototype.detectSamples = function(t) {
        var e = this.msaaSamples
          , i = B.NONE;
        if (t <= 1 || e === null)
            return i;
        for (var n = 0; n < e.length; n++)
            if (e[n] <= t) {
                i = e[n];
                break
            }
        return i === 1 && (i = B.NONE),
        i
    }
    ,
    r.prototype.blit = function(t, e, i) {
        var n = this
          , s = n.current
          , o = n.renderer
          , a = n.gl
          , u = n.CONTEXT_UID;
        if (o.context.webGLVersion === 2 && s) {
            var h = s.glFramebuffers[u];
            if (h) {
                if (!t) {
                    if (!h.msaaBuffer)
                        return;
                    var f = s.colorTextures[0];
                    if (!f)
                        return;
                    h.blitFramebuffer || (h.blitFramebuffer = new Sr(s.width,s.height),
                    h.blitFramebuffer.addColorTexture(0, f)),
                    t = h.blitFramebuffer,
                    t.colorTextures[0] !== f && (t.colorTextures[0] = f,
                    t.dirtyId++,
                    t.dirtyFormat++),
                    (t.width !== s.width || t.height !== s.height) && (t.width = s.width,
                    t.height = s.height,
                    t.dirtyId++,
                    t.dirtySize++)
                }
                e || (e = co,
                e.width = s.width,
                e.height = s.height),
                i || (i = e);
                var l = e.width === i.width && e.height === i.height;
                this.bind(t),
                a.bindFramebuffer(a.READ_FRAMEBUFFER, h.framebuffer),
                a.blitFramebuffer(e.left, e.top, e.right, e.bottom, i.left, i.top, i.right, i.bottom, a.COLOR_BUFFER_BIT, l ? a.NEAREST : a.LINEAR)
            }
        }
    }
    ,
    r.prototype.disposeFramebuffer = function(t, e) {
        var i = t.glFramebuffers[this.CONTEXT_UID]
          , n = this.gl;
        if (i) {
            delete t.glFramebuffers[this.CONTEXT_UID];
            var s = this.managedFramebuffers.indexOf(t);
            s >= 0 && this.managedFramebuffers.splice(s, 1),
            t.disposeRunner.remove(this),
            e || (n.deleteFramebuffer(i.framebuffer),
            i.msaaBuffer && n.deleteRenderbuffer(i.msaaBuffer),
            i.stencil && n.deleteRenderbuffer(i.stencil)),
            i.blitFramebuffer && i.blitFramebuffer.dispose()
        }
    }
    ,
    r.prototype.disposeAll = function(t) {
        var e = this.managedFramebuffers;
        this.managedFramebuffers = [];
        for (var i = 0; i < e.length; i++)
            this.disposeFramebuffer(e[i], t)
    }
    ,
    r.prototype.forceStencil = function() {
        var t = this.current;
        if (t) {
            var e = t.glFramebuffers[this.CONTEXT_UID];
            if (!(!e || e.stencil)) {
                t.stencil = !0;
                var i = t.width
                  , n = t.height
                  , s = this.gl
                  , o = s.createRenderbuffer();
                s.bindRenderbuffer(s.RENDERBUFFER, o),
                e.msaaBuffer ? s.renderbufferStorageMultisample(s.RENDERBUFFER, e.multisample, s.DEPTH24_STENCIL8, i, n) : s.renderbufferStorage(s.RENDERBUFFER, s.DEPTH_STENCIL, i, n),
                e.stencil = o,
                s.framebufferRenderbuffer(s.FRAMEBUFFER, s.DEPTH_STENCIL_ATTACHMENT, s.RENDERBUFFER, o)
            }
        }
    }
    ,
    r.prototype.reset = function() {
        this.current = this.unknownFramebuffer,
        this.viewport = new z
    }
    ,
    r.prototype.destroy = function() {
        this.renderer = null
    }
    ,
    r
}()
  , Ke = {
    5126: 4,
    5123: 2,
    5121: 1
}
  , vo = function() {
    function r(t) {
        this.renderer = t,
        this._activeGeometry = null,
        this._activeVao = null,
        this.hasVao = !0,
        this.hasInstance = !0,
        this.canUseUInt32ElementIndex = !1,
        this.managedGeometries = {}
    }
    return r.prototype.contextChange = function() {
        this.disposeAll(!0);
        var t = this.gl = this.renderer.gl
          , e = this.renderer.context;
        if (this.CONTEXT_UID = this.renderer.CONTEXT_UID,
        e.webGLVersion !== 2) {
            var i = this.renderer.context.extensions.vertexArrayObject;
            E.PREFER_ENV === bt.WEBGL_LEGACY && (i = null),
            i ? (t.createVertexArray = function() {
                return i.createVertexArrayOES()
            }
            ,
            t.bindVertexArray = function(s) {
                return i.bindVertexArrayOES(s)
            }
            ,
            t.deleteVertexArray = function(s) {
                return i.deleteVertexArrayOES(s)
            }
            ) : (this.hasVao = !1,
            t.createVertexArray = function() {
                return null
            }
            ,
            t.bindVertexArray = function() {
                return null
            }
            ,
            t.deleteVertexArray = function() {
                return null
            }
            )
        }
        if (e.webGLVersion !== 2) {
            var n = t.getExtension("ANGLE_instanced_arrays");
            n ? (t.vertexAttribDivisor = function(s, o) {
                return n.vertexAttribDivisorANGLE(s, o)
            }
            ,
            t.drawElementsInstanced = function(s, o, a, u, h) {
                return n.drawElementsInstancedANGLE(s, o, a, u, h)
            }
            ,
            t.drawArraysInstanced = function(s, o, a, u) {
                return n.drawArraysInstancedANGLE(s, o, a, u)
            }
            ) : this.hasInstance = !1
        }
        this.canUseUInt32ElementIndex = e.webGLVersion === 2 || !!e.extensions.uint32ElementIndex
    }
    ,
    r.prototype.bind = function(t, e) {
        e = e || this.renderer.shader.shader;
        var i = this.gl
          , n = t.glVertexArrayObjects[this.CONTEXT_UID]
          , s = !1;
        n || (this.managedGeometries[t.id] = t,
        t.disposeRunner.add(this),
        t.glVertexArrayObjects[this.CONTEXT_UID] = n = {},
        s = !0);
        var o = n[e.program.id] || this.initGeometryVao(t, e, s);
        this._activeGeometry = t,
        this._activeVao !== o && (this._activeVao = o,
        this.hasVao ? i.bindVertexArray(o) : this.activateVao(t, e.program)),
        this.updateBuffers()
    }
    ,
    r.prototype.reset = function() {
        this.unbind()
    }
    ,
    r.prototype.updateBuffers = function() {
        for (var t = this._activeGeometry, e = this.renderer.buffer, i = 0; i < t.buffers.length; i++) {
            var n = t.buffers[i];
            e.update(n)
        }
    }
    ,
    r.prototype.checkCompatibility = function(t, e) {
        var i = t.attributes
          , n = e.attributeData;
        for (var s in n)
            if (!i[s])
                throw new Error('shader and geometry incompatible, geometry missing the "' + s + '" attribute')
    }
    ,
    r.prototype.getSignature = function(t, e) {
        var i = t.attributes
          , n = e.attributeData
          , s = ["g", t.id];
        for (var o in i)
            n[o] && s.push(o, n[o].location);
        return s.join("-")
    }
    ,
    r.prototype.initGeometryVao = function(t, e, i) {
        i === void 0 && (i = !0);
        var n = this.gl
          , s = this.CONTEXT_UID
          , o = this.renderer.buffer
          , a = e.program;
        a.glPrograms[s] || this.renderer.shader.generateProgram(e),
        this.checkCompatibility(t, a);
        var u = this.getSignature(t, a)
          , h = t.glVertexArrayObjects[this.CONTEXT_UID]
          , f = h[u];
        if (f)
            return h[a.id] = f,
            f;
        var l = t.buffers
          , c = t.attributes
          , d = {}
          , p = {};
        for (var y in l)
            d[y] = 0,
            p[y] = 0;
        for (var y in c)
            !c[y].size && a.attributeData[y] ? c[y].size = a.attributeData[y].size : c[y].size || console.warn("PIXI Geometry attribute '" + y + "' size cannot be determined (likely the bound shader does not have the attribute)"),
            d[c[y].buffer] += c[y].size * Ke[c[y].type];
        for (var y in c) {
            var v = c[y]
              , T = v.size;
            v.stride === void 0 && (d[v.buffer] === T * Ke[v.type] ? v.stride = 0 : v.stride = d[v.buffer]),
            v.start === void 0 && (v.start = p[v.buffer],
            p[v.buffer] += T * Ke[v.type])
        }
        f = n.createVertexArray(),
        n.bindVertexArray(f);
        for (var g = 0; g < l.length; g++) {
            var _ = l[g];
            o.bind(_),
            i && _._glBuffers[s].refCount++
        }
        return this.activateVao(t, a),
        this._activeVao = f,
        h[a.id] = f,
        h[u] = f,
        f
    }
    ,
    r.prototype.disposeGeometry = function(t, e) {
        var i;
        if (this.managedGeometries[t.id]) {
            delete this.managedGeometries[t.id];
            var n = t.glVertexArrayObjects[this.CONTEXT_UID]
              , s = this.gl
              , o = t.buffers
              , a = (i = this.renderer) === null || i === void 0 ? void 0 : i.buffer;
            if (t.disposeRunner.remove(this),
            !!n) {
                if (a)
                    for (var u = 0; u < o.length; u++) {
                        var h = o[u]._glBuffers[this.CONTEXT_UID];
                        h && (h.refCount--,
                        h.refCount === 0 && !e && a.dispose(o[u], e))
                    }
                if (!e) {
                    for (var f in n)
                        if (f[0] === "g") {
                            var l = n[f];
                            this._activeVao === l && this.unbind(),
                            s.deleteVertexArray(l)
                        }
                }
                delete t.glVertexArrayObjects[this.CONTEXT_UID]
            }
        }
    }
    ,
    r.prototype.disposeAll = function(t) {
        for (var e = Object.keys(this.managedGeometries), i = 0; i < e.length; i++)
            this.disposeGeometry(this.managedGeometries[e[i]], t)
    }
    ,
    r.prototype.activateVao = function(t, e) {
        var i = this.gl
          , n = this.CONTEXT_UID
          , s = this.renderer.buffer
          , o = t.buffers
          , a = t.attributes;
        t.indexBuffer && s.bind(t.indexBuffer);
        var u = null;
        for (var h in a) {
            var f = a[h]
              , l = o[f.buffer]
              , c = l._glBuffers[n];
            if (e.attributeData[h]) {
                u !== c && (s.bind(l),
                u = c);
                var d = e.attributeData[h].location;
                if (i.enableVertexAttribArray(d),
                i.vertexAttribPointer(d, f.size, f.type || i.FLOAT, f.normalized, f.stride, f.start),
                f.instance)
                    if (this.hasInstance)
                        i.vertexAttribDivisor(d, 1);
                    else
                        throw new Error("geometry error, GPU Instancing is not supported on this device")
            }
        }
    }
    ,
    r.prototype.draw = function(t, e, i, n) {
        var s = this.gl
          , o = this._activeGeometry;
        if (o.indexBuffer) {
            var a = o.indexBuffer.data.BYTES_PER_ELEMENT
              , u = a === 2 ? s.UNSIGNED_SHORT : s.UNSIGNED_INT;
            a === 2 || a === 4 && this.canUseUInt32ElementIndex ? o.instanced ? s.drawElementsInstanced(t, e || o.indexBuffer.data.length, u, (i || 0) * a, n || 1) : s.drawElements(t, e || o.indexBuffer.data.length, u, (i || 0) * a) : console.warn("unsupported index buffer type: uint32")
        } else
            o.instanced ? s.drawArraysInstanced(t, i, e || o.getSize(), n || 1) : s.drawArrays(t, i, e || o.getSize());
        return this
    }
    ,
    r.prototype.unbind = function() {
        this.gl.bindVertexArray(null),
        this._activeVao = null,
        this._activeGeometry = null
    }
    ,
    r.prototype.destroy = function() {
        this.renderer = null
    }
    ,
    r
}()
  , _o = function() {
    function r(t) {
        t === void 0 && (t = null),
        this.type = H.NONE,
        this.autoDetect = !0,
        this.maskObject = t || null,
        this.pooled = !1,
        this.isMaskData = !0,
        this.resolution = null,
        this.multisample = E.FILTER_MULTISAMPLE,
        this.enabled = !0,
        this.colorMask = 15,
        this._filters = null,
        this._stencilCounter = 0,
        this._scissorCounter = 0,
        this._scissorRect = null,
        this._scissorRectLocal = null,
        this._colorMask = 15,
        this._target = null
    }
    return Object.defineProperty(r.prototype, "filter", {
        get: function() {
            return this._filters ? this._filters[0] : null
        },
        set: function(t) {
            t ? this._filters ? this._filters[0] = t : this._filters = [t] : this._filters = null
        },
        enumerable: !1,
        configurable: !0
    }),
    r.prototype.reset = function() {
        this.pooled && (this.maskObject = null,
        this.type = H.NONE,
        this.autoDetect = !0),
        this._target = null,
        this._scissorRectLocal = null
    }
    ,
    r.prototype.copyCountersOrReset = function(t) {
        t ? (this._stencilCounter = t._stencilCounter,
        this._scissorCounter = t._scissorCounter,
        this._scissorRect = t._scissorRect) : (this._stencilCounter = 0,
        this._scissorCounter = 0,
        this._scissorRect = null)
    }
    ,
    r
}();
function Fi(r, t, e) {
    var i = r.createShader(t);
    return r.shaderSource(i, e),
    r.compileShader(i),
    i
}
function Ui(r, t) {
    var e = r.getShaderSource(t).split(`
`).map(function(h, f) {
        return f + ": " + h
    })
      , i = r.getShaderInfoLog(t)
      , n = i.split(`
`)
      , s = {}
      , o = n.map(function(h) {
        return parseFloat(h.replace(/^ERROR\: 0\:([\d]+)\:.*$/, "$1"))
    }).filter(function(h) {
        return h && !s[h] ? (s[h] = !0,
        !0) : !1
    })
      , a = [""];
    o.forEach(function(h) {
        e[h - 1] = "%c" + e[h - 1] + "%c",
        a.push("background: #FF0000; color:#FFFFFF; font-size: 10px", "font-size: 10px")
    });
    var u = e.join(`
`);
    a[0] = u,
    console.error(i),
    console.groupCollapsed("click to view full shader code"),
    console.warn.apply(console, a),
    console.groupEnd()
}
function yo(r, t, e, i) {
    r.getProgramParameter(t, r.LINK_STATUS) || (r.getShaderParameter(e, r.COMPILE_STATUS) || Ui(r, e),
    r.getShaderParameter(i, r.COMPILE_STATUS) || Ui(r, i),
    console.error("PixiJS Error: Could not initialize shader."),
    r.getProgramInfoLog(t) !== "" && console.warn("PixiJS Warning: gl.getProgramInfoLog()", r.getProgramInfoLog(t)))
}
function Je(r) {
    for (var t = new Array(r), e = 0; e < t.length; e++)
        t[e] = !1;
    return t
}
function hn(r, t) {
    switch (r) {
    case "float":
        return 0;
    case "vec2":
        return new Float32Array(2 * t);
    case "vec3":
        return new Float32Array(3 * t);
    case "vec4":
        return new Float32Array(4 * t);
    case "int":
    case "uint":
    case "sampler2D":
    case "sampler2DArray":
        return 0;
    case "ivec2":
        return new Int32Array(2 * t);
    case "ivec3":
        return new Int32Array(3 * t);
    case "ivec4":
        return new Int32Array(4 * t);
    case "uvec2":
        return new Uint32Array(2 * t);
    case "uvec3":
        return new Uint32Array(3 * t);
    case "uvec4":
        return new Uint32Array(4 * t);
    case "bool":
        return !1;
    case "bvec2":
        return Je(2 * t);
    case "bvec3":
        return Je(3 * t);
    case "bvec4":
        return Je(4 * t);
    case "mat2":
        return new Float32Array([1, 0, 0, 1]);
    case "mat3":
        return new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
    case "mat4":
        return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
    }
    return null
}
var fn = {}
  , Qt = fn;
function go() {
    if (Qt === fn || Qt && Qt.isContextLost()) {
        var r = E.ADAPTER.createCanvas()
          , t = void 0;
        E.PREFER_ENV >= bt.WEBGL2 && (t = r.getContext("webgl2", {})),
        t || (t = r.getContext("webgl", {}) || r.getContext("experimental-webgl", {}),
        t ? t.getExtension("WEBGL_draw_buffers") : t = null),
        Qt = t
    }
    return Qt
}
var Pe;
function mo() {
    if (!Pe) {
        Pe = lt.MEDIUM;
        var r = go();
        if (r && r.getShaderPrecisionFormat) {
            var t = r.getShaderPrecisionFormat(r.FRAGMENT_SHADER, r.HIGH_FLOAT);
            Pe = t.precision ? lt.HIGH : lt.MEDIUM
        }
    }
    return Pe
}
function Li(r, t, e) {
    if (r.substring(0, 9) !== "precision") {
        var i = t;
        return t === lt.HIGH && e !== lt.HIGH && (i = lt.MEDIUM),
        "precision " + i + ` float;
` + r
    } else if (e !== lt.HIGH && r.substring(0, 15) === "precision highp")
        return r.replace("precision highp", "precision mediump");
    return r
}
var bo = {
    float: 1,
    vec2: 2,
    vec3: 3,
    vec4: 4,
    int: 1,
    ivec2: 2,
    ivec3: 3,
    ivec4: 4,
    uint: 1,
    uvec2: 2,
    uvec3: 3,
    uvec4: 4,
    bool: 1,
    bvec2: 2,
    bvec3: 3,
    bvec4: 4,
    mat2: 4,
    mat3: 9,
    mat4: 16,
    sampler2D: 1
};
function ln(r) {
    return bo[r]
}
var Se = null
  , Mi = {
    FLOAT: "float",
    FLOAT_VEC2: "vec2",
    FLOAT_VEC3: "vec3",
    FLOAT_VEC4: "vec4",
    INT: "int",
    INT_VEC2: "ivec2",
    INT_VEC3: "ivec3",
    INT_VEC4: "ivec4",
    UNSIGNED_INT: "uint",
    UNSIGNED_INT_VEC2: "uvec2",
    UNSIGNED_INT_VEC3: "uvec3",
    UNSIGNED_INT_VEC4: "uvec4",
    BOOL: "bool",
    BOOL_VEC2: "bvec2",
    BOOL_VEC3: "bvec3",
    BOOL_VEC4: "bvec4",
    FLOAT_MAT2: "mat2",
    FLOAT_MAT3: "mat3",
    FLOAT_MAT4: "mat4",
    SAMPLER_2D: "sampler2D",
    INT_SAMPLER_2D: "sampler2D",
    UNSIGNED_INT_SAMPLER_2D: "sampler2D",
    SAMPLER_CUBE: "samplerCube",
    INT_SAMPLER_CUBE: "samplerCube",
    UNSIGNED_INT_SAMPLER_CUBE: "samplerCube",
    SAMPLER_2D_ARRAY: "sampler2DArray",
    INT_SAMPLER_2D_ARRAY: "sampler2DArray",
    UNSIGNED_INT_SAMPLER_2D_ARRAY: "sampler2DArray"
};
function cn(r, t) {
    if (!Se) {
        var e = Object.keys(Mi);
        Se = {};
        for (var i = 0; i < e.length; ++i) {
            var n = e[i];
            Se[r[n]] = Mi[n]
        }
    }
    return Se[t]
}
var Zt = [{
    test: function(r) {
        return r.type === "float" && r.size === 1
    },
    code: function(r) {
        return `
            if(uv["` + r + '"] !== ud["' + r + `"].value)
            {
                ud["` + r + '"].value = uv["' + r + `"]
                gl.uniform1f(ud["` + r + '"].location, uv["' + r + `"])
            }
            `
    }
}, {
    test: function(r) {
        return (r.type === "sampler2D" || r.type === "samplerCube" || r.type === "sampler2DArray") && r.size === 1 && !r.isArray
    },
    code: function(r) {
        return `t = syncData.textureCount++;

            renderer.texture.bind(uv["` + r + `"], t);

            if(ud["` + r + `"].value !== t)
            {
                ud["` + r + `"].value = t;
                gl.uniform1i(ud["` + r + `"].location, t);
; // eslint-disable-line max-len
            }`
    }
}, {
    test: function(r, t) {
        return r.type === "mat3" && r.size === 1 && t.a !== void 0
    },
    code: function(r) {
        return `
            gl.uniformMatrix3fv(ud["` + r + '"].location, false, uv["' + r + `"].toArray(true));
            `
    },
    codeUbo: function(r) {
        return `
                var ` + r + "_matrix = uv." + r + `.toArray(true);

                data[offset] = ` + r + `_matrix[0];
                data[offset+1] = ` + r + `_matrix[1];
                data[offset+2] = ` + r + `_matrix[2];
        
                data[offset + 4] = ` + r + `_matrix[3];
                data[offset + 5] = ` + r + `_matrix[4];
                data[offset + 6] = ` + r + `_matrix[5];
        
                data[offset + 8] = ` + r + `_matrix[6];
                data[offset + 9] = ` + r + `_matrix[7];
                data[offset + 10] = ` + r + `_matrix[8];
            `
    }
}, {
    test: function(r, t) {
        return r.type === "vec2" && r.size === 1 && t.x !== void 0
    },
    code: function(r) {
        return `
                cv = ud["` + r + `"].value;
                v = uv["` + r + `"];

                if(cv[0] !== v.x || cv[1] !== v.y)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    gl.uniform2f(ud["` + r + `"].location, v.x, v.y);
                }`
    },
    codeUbo: function(r) {
        return `
                v = uv.` + r + `;

                data[offset] = v.x;
                data[offset+1] = v.y;
            `
    }
}, {
    test: function(r) {
        return r.type === "vec2" && r.size === 1
    },
    code: function(r) {
        return `
                cv = ud["` + r + `"].value;
                v = uv["` + r + `"];

                if(cv[0] !== v[0] || cv[1] !== v[1])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    gl.uniform2f(ud["` + r + `"].location, v[0], v[1]);
                }
            `
    }
}, {
    test: function(r, t) {
        return r.type === "vec4" && r.size === 1 && t.width !== void 0
    },
    code: function(r) {
        return `
                cv = ud["` + r + `"].value;
                v = uv["` + r + `"];

                if(cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    cv[2] = v.width;
                    cv[3] = v.height;
                    gl.uniform4f(ud["` + r + `"].location, v.x, v.y, v.width, v.height)
                }`
    },
    codeUbo: function(r) {
        return `
                    v = uv.` + r + `;

                    data[offset] = v.x;
                    data[offset+1] = v.y;
                    data[offset+2] = v.width;
                    data[offset+3] = v.height;
                `
    }
}, {
    test: function(r) {
        return r.type === "vec4" && r.size === 1
    },
    code: function(r) {
        return `
                cv = ud["` + r + `"].value;
                v = uv["` + r + `"];

                if(cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    cv[2] = v[2];
                    cv[3] = v[3];

                    gl.uniform4f(ud["` + r + `"].location, v[0], v[1], v[2], v[3])
                }`
    }
}]
  , xo = {
    float: `
    if (cv !== v)
    {
        cu.value = v;
        gl.uniform1f(location, v);
    }`,
    vec2: `
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2f(location, v[0], v[1])
    }`,
    vec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3f(location, v[0], v[1], v[2])
    }`,
    vec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4f(location, v[0], v[1], v[2], v[3]);
    }`,
    int: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,
    ivec2: `
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2i(location, v[0], v[1]);
    }`,
    ivec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3i(location, v[0], v[1], v[2]);
    }`,
    ivec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4i(location, v[0], v[1], v[2], v[3]);
    }`,
    uint: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1ui(location, v);
    }`,
    uvec2: `
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2ui(location, v[0], v[1]);
    }`,
    uvec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3ui(location, v[0], v[1], v[2]);
    }`,
    uvec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4ui(location, v[0], v[1], v[2], v[3]);
    }`,
    bool: `
    if (cv !== v)
    {
        cu.value = v;
        gl.uniform1i(location, v);
    }`,
    bvec2: `
    if (cv[0] != v[0] || cv[1] != v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2i(location, v[0], v[1]);
    }`,
    bvec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3i(location, v[0], v[1], v[2]);
    }`,
    bvec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4i(location, v[0], v[1], v[2], v[3]);
    }`,
    mat2: "gl.uniformMatrix2fv(location, false, v)",
    mat3: "gl.uniformMatrix3fv(location, false, v)",
    mat4: "gl.uniformMatrix4fv(location, false, v)",
    sampler2D: "gl.uniform1i(location, v)",
    samplerCube: "gl.uniform1i(location, v)",
    sampler2DArray: "gl.uniform1i(location, v)"
}
  , Eo = {
    float: "gl.uniform1fv(location, v)",
    vec2: "gl.uniform2fv(location, v)",
    vec3: "gl.uniform3fv(location, v)",
    vec4: "gl.uniform4fv(location, v)",
    mat4: "gl.uniformMatrix4fv(location, false, v)",
    mat3: "gl.uniformMatrix3fv(location, false, v)",
    mat2: "gl.uniformMatrix2fv(location, false, v)",
    int: "gl.uniform1iv(location, v)",
    ivec2: "gl.uniform2iv(location, v)",
    ivec3: "gl.uniform3iv(location, v)",
    ivec4: "gl.uniform4iv(location, v)",
    uint: "gl.uniform1uiv(location, v)",
    uvec2: "gl.uniform2uiv(location, v)",
    uvec3: "gl.uniform3uiv(location, v)",
    uvec4: "gl.uniform4uiv(location, v)",
    bool: "gl.uniform1iv(location, v)",
    bvec2: "gl.uniform2iv(location, v)",
    bvec3: "gl.uniform3iv(location, v)",
    bvec4: "gl.uniform4iv(location, v)",
    sampler2D: "gl.uniform1iv(location, v)",
    samplerCube: "gl.uniform1iv(location, v)",
    sampler2DArray: "gl.uniform1iv(location, v)"
};
function To(r, t) {
    var e, i = [`
        var v = null;
        var cv = null;
        var cu = null;
        var t = 0;
        var gl = renderer.gl;
    `];
    for (var n in r.uniforms) {
        var s = t[n];
        if (!s) {
            !((e = r.uniforms[n]) === null || e === void 0) && e.group && (r.uniforms[n].ubo ? i.push(`
                        renderer.shader.syncUniformBufferGroup(uv.` + n + ", '" + n + `');
                    `) : i.push(`
                        renderer.shader.syncUniformGroup(uv.` + n + `, syncData);
                    `));
            continue
        }
        for (var o = r.uniforms[n], a = !1, u = 0; u < Zt.length; u++)
            if (Zt[u].test(s, o)) {
                i.push(Zt[u].code(n, o)),
                a = !0;
                break
            }
        if (!a) {
            var h = s.size === 1 ? xo : Eo
              , f = h[s.type].replace("location", 'ud["' + n + '"].location');
            i.push(`
            cu = ud["` + n + `"];
            cv = cu.value;
            v = uv["` + n + `"];
            ` + f + ";")
        }
    }
    return new Function("ud","uv","renderer","syncData",i.join(`
`))
}
var Io = ["precision mediump float;", "void main(void){", "float test = 0.1;", "%forloop%", "gl_FragColor = vec4(0.0);", "}"].join(`
`);
function wo(r) {
    for (var t = "", e = 0; e < r; ++e)
        e > 0 && (t += `
else `),
        e < r - 1 && (t += "if(test == " + e + ".0){}");
    return t
}
function Ro(r, t) {
    if (r === 0)
        throw new Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");
    for (var e = t.createShader(t.FRAGMENT_SHADER); ; ) {
        var i = Io.replace(/%forloop%/gi, wo(r));
        if (t.shaderSource(e, i),
        t.compileShader(e),
        !t.getShaderParameter(e, t.COMPILE_STATUS))
            r = r / 2 | 0;
        else
            break
    }
    return r
}
var te;
function Ao() {
    if (typeof te == "boolean")
        return te;
    try {
        var r = new Function("param1","param2","param3","return param1[param2] === param3;");
        te = r({
            a: "b"
        }, "a", "b") === !0
    } catch {
        te = !1
    }
    return te
}
var No = `varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void){
   gl_FragColor *= texture2D(uSampler, vTextureCoord);
}`
  , Oo = `attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void){
   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
   vTextureCoord = aTextureCoord;
}
`
  , Co = 0
  , Fe = {}
  , Gr = function() {
    function r(t, e, i) {
        i === void 0 && (i = "pixi-shader"),
        this.id = Co++,
        this.vertexSrc = t || r.defaultVertexSrc,
        this.fragmentSrc = e || r.defaultFragmentSrc,
        this.vertexSrc = this.vertexSrc.trim(),
        this.fragmentSrc = this.fragmentSrc.trim(),
        this.vertexSrc.substring(0, 8) !== "#version" && (i = i.replace(/\s+/g, "-"),
        Fe[i] ? (Fe[i]++,
        i += "-" + Fe[i]) : Fe[i] = 1,
        this.vertexSrc = "#define SHADER_NAME " + i + `
` + this.vertexSrc,
        this.fragmentSrc = "#define SHADER_NAME " + i + `
` + this.fragmentSrc,
        this.vertexSrc = Li(this.vertexSrc, E.PRECISION_VERTEX, lt.HIGH),
        this.fragmentSrc = Li(this.fragmentSrc, E.PRECISION_FRAGMENT, mo())),
        this.glPrograms = {},
        this.syncUniforms = null
    }
    return Object.defineProperty(r, "defaultVertexSrc", {
        get: function() {
            return Oo
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r, "defaultFragmentSrc", {
        get: function() {
            return No
        },
        enumerable: !1,
        configurable: !0
    }),
    r.from = function(t, e, i) {
        var n = t + e
          , s = Ri[n];
        return s || (Ri[n] = s = new r(t,e,i)),
        s
    }
    ,
    r
}()
  , dn = function() {
    function r(t, e) {
        this.uniformBindCount = 0,
        this.program = t,
        e ? e instanceof $t ? this.uniformGroup = e : this.uniformGroup = new $t(e) : this.uniformGroup = new $t({})
    }
    return r.prototype.checkUniformExists = function(t, e) {
        if (e.uniforms[t])
            return !0;
        for (var i in e.uniforms) {
            var n = e.uniforms[i];
            if (n.group && this.checkUniformExists(t, n))
                return !0
        }
        return !1
    }
    ,
    r.prototype.destroy = function() {
        this.uniformGroup = null
    }
    ,
    Object.defineProperty(r.prototype, "uniforms", {
        get: function() {
            return this.uniformGroup.uniforms
        },
        enumerable: !1,
        configurable: !0
    }),
    r.from = function(t, e, i) {
        var n = Gr.from(t, e);
        return new r(n,i)
    }
    ,
    r
}()
  , Qe = 0
  , tr = 1
  , er = 2
  , rr = 3
  , ir = 4
  , nr = 5
  , Br = function() {
    function r() {
        this.data = 0,
        this.blendMode = I.NORMAL,
        this.polygonOffset = 0,
        this.blend = !0,
        this.depthMask = !0
    }
    return Object.defineProperty(r.prototype, "blend", {
        get: function() {
            return !!(this.data & 1 << Qe)
        },
        set: function(t) {
            !!(this.data & 1 << Qe) !== t && (this.data ^= 1 << Qe)
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r.prototype, "offsets", {
        get: function() {
            return !!(this.data & 1 << tr)
        },
        set: function(t) {
            !!(this.data & 1 << tr) !== t && (this.data ^= 1 << tr)
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r.prototype, "culling", {
        get: function() {
            return !!(this.data & 1 << er)
        },
        set: function(t) {
            !!(this.data & 1 << er) !== t && (this.data ^= 1 << er)
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r.prototype, "depthTest", {
        get: function() {
            return !!(this.data & 1 << rr)
        },
        set: function(t) {
            !!(this.data & 1 << rr) !== t && (this.data ^= 1 << rr)
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r.prototype, "depthMask", {
        get: function() {
            return !!(this.data & 1 << nr)
        },
        set: function(t) {
            !!(this.data & 1 << nr) !== t && (this.data ^= 1 << nr)
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r.prototype, "clockwiseFrontFace", {
        get: function() {
            return !!(this.data & 1 << ir)
        },
        set: function(t) {
            !!(this.data & 1 << ir) !== t && (this.data ^= 1 << ir)
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r.prototype, "blendMode", {
        get: function() {
            return this._blendMode
        },
        set: function(t) {
            this.blend = t !== I.NONE,
            this._blendMode = t
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r.prototype, "polygonOffset", {
        get: function() {
            return this._polygonOffset
        },
        set: function(t) {
            this.offsets = !!t,
            this._polygonOffset = t
        },
        enumerable: !1,
        configurable: !0
    }),
    r.prototype.toString = function() {
        return "[@pixi/core:State " + ("blendMode=" + this.blendMode + " ") + ("clockwiseFrontFace=" + this.clockwiseFrontFace + " ") + ("culling=" + this.culling + " ") + ("depthMask=" + this.depthMask + " ") + ("polygonOffset=" + this.polygonOffset) + "]"
    }
    ,
    r.for2d = function() {
        var t = new r;
        return t.depthTest = !1,
        t.blend = !0,
        t
    }
    ,
    r
}()
  , Po = `varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void){
   gl_FragColor = texture2D(uSampler, vTextureCoord);
}
`
  , So = `attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

uniform vec4 inputSize;
uniform vec4 outputFrame;

vec4 filterVertexPosition( void )
{
    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aVertexPosition * (outputFrame.zw * inputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`
  , Fo = function(r) {
    P(t, r);
    function t(e, i, n) {
        var s = this
          , o = Gr.from(e || t.defaultVertexSrc, i || t.defaultFragmentSrc);
        return s = r.call(this, o, n) || this,
        s.padding = 0,
        s.resolution = E.FILTER_RESOLUTION,
        s.multisample = E.FILTER_MULTISAMPLE,
        s.enabled = !0,
        s.autoFit = !0,
        s.state = new Br,
        s
    }
    return t.prototype.apply = function(e, i, n, s, o) {
        e.applyFilter(this, i, n, s)
    }
    ,
    Object.defineProperty(t.prototype, "blendMode", {
        get: function() {
            return this.state.blendMode
        },
        set: function(e) {
            this.state.blendMode = e
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "resolution", {
        get: function() {
            return this._resolution
        },
        set: function(e) {
            this._resolution = e
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t, "defaultVertexSrc", {
        get: function() {
            return So
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t, "defaultFragmentSrc", {
        get: function() {
            return Po
        },
        enumerable: !1,
        configurable: !0
    }),
    t
}(dn)
  , Uo = `attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform mat3 otherMatrix;

varying vec2 vMaskCoord;
varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = aTextureCoord;
    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;
}
`
  , Lo = `varying vec2 vMaskCoord;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D mask;
uniform float alpha;
uniform float npmAlpha;
uniform vec4 maskClamp;

void main(void)
{
    float clip = step(3.5,
        step(maskClamp.x, vMaskCoord.x) +
        step(maskClamp.y, vMaskCoord.y) +
        step(vMaskCoord.x, maskClamp.z) +
        step(vMaskCoord.y, maskClamp.w));

    vec4 original = texture2D(uSampler, vTextureCoord);
    vec4 masky = texture2D(mask, vMaskCoord);
    float alphaMul = 1.0 - npmAlpha * (1.0 - masky.a);

    original *= (alphaMul * masky.r * alpha * clip);

    gl_FragColor = original;
}
`
  , Gi = new tt
  , Mo = function() {
    function r(t, e) {
        this._texture = t,
        this.mapCoord = new tt,
        this.uClampFrame = new Float32Array(4),
        this.uClampOffset = new Float32Array(2),
        this._textureID = -1,
        this._updateID = 0,
        this.clampOffset = 0,
        this.clampMargin = typeof e > "u" ? .5 : e,
        this.isSimple = !1
    }
    return Object.defineProperty(r.prototype, "texture", {
        get: function() {
            return this._texture
        },
        set: function(t) {
            this._texture = t,
            this._textureID = -1
        },
        enumerable: !1,
        configurable: !0
    }),
    r.prototype.multiplyUvs = function(t, e) {
        e === void 0 && (e = t);
        for (var i = this.mapCoord, n = 0; n < t.length; n += 2) {
            var s = t[n]
              , o = t[n + 1];
            e[n] = s * i.a + o * i.c + i.tx,
            e[n + 1] = s * i.b + o * i.d + i.ty
        }
        return e
    }
    ,
    r.prototype.update = function(t) {
        var e = this._texture;
        if (!e || !e.valid || !t && this._textureID === e._updateID)
            return !1;
        this._textureID = e._updateID,
        this._updateID++;
        var i = e._uvs;
        this.mapCoord.set(i.x1 - i.x0, i.y1 - i.y0, i.x3 - i.x0, i.y3 - i.y0, i.x0, i.y0);
        var n = e.orig
          , s = e.trim;
        s && (Gi.set(n.width / s.width, 0, 0, n.height / s.height, -s.x / s.width, -s.y / s.height),
        this.mapCoord.append(Gi));
        var o = e.baseTexture
          , a = this.uClampFrame
          , u = this.clampMargin / o.resolution
          , h = this.clampOffset;
        return a[0] = (e._frame.x + u + h) / o.width,
        a[1] = (e._frame.y + u + h) / o.height,
        a[2] = (e._frame.x + e._frame.width - u + h) / o.width,
        a[3] = (e._frame.y + e._frame.height - u + h) / o.height,
        this.uClampOffset[0] = h / o.realWidth,
        this.uClampOffset[1] = h / o.realHeight,
        this.isSimple = e._frame.width === o.width && e._frame.height === o.height && e.rotate === 0,
        !0
    }
    ,
    r
}()
  , Go = function(r) {
    P(t, r);
    function t(e, i, n) {
        var s = this
          , o = null;
        return typeof e != "string" && i === void 0 && n === void 0 && (o = e,
        e = void 0,
        i = void 0,
        n = void 0),
        s = r.call(this, e || Uo, i || Lo, n) || this,
        s.maskSprite = o,
        s.maskMatrix = new tt,
        s
    }
    return Object.defineProperty(t.prototype, "maskSprite", {
        get: function() {
            return this._maskSprite
        },
        set: function(e) {
            this._maskSprite = e,
            this._maskSprite && (this._maskSprite.renderable = !1)
        },
        enumerable: !1,
        configurable: !0
    }),
    t.prototype.apply = function(e, i, n, s) {
        var o = this._maskSprite
          , a = o._texture;
        a.valid && (a.uvMatrix || (a.uvMatrix = new Mo(a,0)),
        a.uvMatrix.update(),
        this.uniforms.npmAlpha = a.baseTexture.alphaMode ? 0 : 1,
        this.uniforms.mask = a,
        this.uniforms.otherMatrix = e.calculateSpriteMatrix(this.maskMatrix, o).prepend(a.uvMatrix.mapCoord),
        this.uniforms.alpha = o.worldAlpha,
        this.uniforms.maskClamp = a.uvMatrix.uClampFrame,
        e.applyFilter(this, i, n, s))
    }
    ,
    t
}(Fo)
  , Bo = function() {
    function r(t) {
        this.renderer = t,
        this.enableScissor = !0,
        this.alphaMaskPool = [],
        this.maskDataPool = [],
        this.maskStack = [],
        this.alphaMaskIndex = 0
    }
    return r.prototype.setMaskStack = function(t) {
        this.maskStack = t,
        this.renderer.scissor.setMaskStack(t),
        this.renderer.stencil.setMaskStack(t)
    }
    ,
    r.prototype.push = function(t, e) {
        var i = e;
        if (!i.isMaskData) {
            var n = this.maskDataPool.pop() || new _o;
            n.pooled = !0,
            n.maskObject = e,
            i = n
        }
        var s = this.maskStack.length !== 0 ? this.maskStack[this.maskStack.length - 1] : null;
        if (i.copyCountersOrReset(s),
        i._colorMask = s ? s._colorMask : 15,
        i.autoDetect && this.detect(i),
        i._target = t,
        i.type !== H.SPRITE && this.maskStack.push(i),
        i.enabled)
            switch (i.type) {
            case H.SCISSOR:
                this.renderer.scissor.push(i);
                break;
            case H.STENCIL:
                this.renderer.stencil.push(i);
                break;
            case H.SPRITE:
                i.copyCountersOrReset(null),
                this.pushSpriteMask(i);
                break;
            case H.COLOR:
                this.pushColorMask(i);
                break
            }
        i.type === H.SPRITE && this.maskStack.push(i)
    }
    ,
    r.prototype.pop = function(t) {
        var e = this.maskStack.pop();
        if (!(!e || e._target !== t)) {
            if (e.enabled)
                switch (e.type) {
                case H.SCISSOR:
                    this.renderer.scissor.pop(e);
                    break;
                case H.STENCIL:
                    this.renderer.stencil.pop(e.maskObject);
                    break;
                case H.SPRITE:
                    this.popSpriteMask(e);
                    break;
                case H.COLOR:
                    this.popColorMask(e);
                    break
                }
            if (e.reset(),
            e.pooled && this.maskDataPool.push(e),
            this.maskStack.length !== 0) {
                var i = this.maskStack[this.maskStack.length - 1];
                i.type === H.SPRITE && i._filters && (i._filters[0].maskSprite = i.maskObject)
            }
        }
    }
    ,
    r.prototype.detect = function(t) {
        var e = t.maskObject;
        e ? e.isSprite ? t.type = H.SPRITE : this.enableScissor && this.renderer.scissor.testScissor(t) ? t.type = H.SCISSOR : t.type = H.STENCIL : t.type = H.COLOR
    }
    ,
    r.prototype.pushSpriteMask = function(t) {
        var e, i, n = t.maskObject, s = t._target, o = t._filters;
        o || (o = this.alphaMaskPool[this.alphaMaskIndex],
        o || (o = this.alphaMaskPool[this.alphaMaskIndex] = [new Go]));
        var a = this.renderer, u = a.renderTexture, h, f;
        if (u.current) {
            var l = u.current;
            h = t.resolution || l.resolution,
            f = (e = t.multisample) !== null && e !== void 0 ? e : l.multisample
        } else
            h = t.resolution || a.resolution,
            f = (i = t.multisample) !== null && i !== void 0 ? i : a.multisample;
        o[0].resolution = h,
        o[0].multisample = f,
        o[0].maskSprite = n;
        var c = s.filterArea;
        s.filterArea = n.getBounds(!0),
        a.filter.push(s, o),
        s.filterArea = c,
        t._filters || this.alphaMaskIndex++
    }
    ,
    r.prototype.popSpriteMask = function(t) {
        this.renderer.filter.pop(),
        t._filters ? t._filters[0].maskSprite = null : (this.alphaMaskIndex--,
        this.alphaMaskPool[this.alphaMaskIndex][0].maskSprite = null)
    }
    ,
    r.prototype.pushColorMask = function(t) {
        var e = t._colorMask
          , i = t._colorMask = e & t.colorMask;
        i !== e && this.renderer.gl.colorMask((i & 1) !== 0, (i & 2) !== 0, (i & 4) !== 0, (i & 8) !== 0)
    }
    ,
    r.prototype.popColorMask = function(t) {
        var e = t._colorMask
          , i = this.maskStack.length > 0 ? this.maskStack[this.maskStack.length - 1]._colorMask : 15;
        i !== e && this.renderer.gl.colorMask((i & 1) !== 0, (i & 2) !== 0, (i & 4) !== 0, (i & 8) !== 0)
    }
    ,
    r.prototype.destroy = function() {
        this.renderer = null
    }
    ,
    r
}()
  , pn = function() {
    function r(t) {
        this.renderer = t,
        this.maskStack = [],
        this.glConst = 0
    }
    return r.prototype.getStackLength = function() {
        return this.maskStack.length
    }
    ,
    r.prototype.setMaskStack = function(t) {
        var e = this.renderer.gl
          , i = this.getStackLength();
        this.maskStack = t;
        var n = this.getStackLength();
        n !== i && (n === 0 ? e.disable(this.glConst) : (e.enable(this.glConst),
        this._useCurrent()))
    }
    ,
    r.prototype._useCurrent = function() {}
    ,
    r.prototype.destroy = function() {
        this.renderer = null,
        this.maskStack = null
    }
    ,
    r
}()
  , Bi = new tt
  , ki = []
  , ko = function(r) {
    P(t, r);
    function t(e) {
        var i = r.call(this, e) || this;
        return i.glConst = E.ADAPTER.getWebGLRenderingContext().SCISSOR_TEST,
        i
    }
    return t.prototype.getStackLength = function() {
        var e = this.maskStack[this.maskStack.length - 1];
        return e ? e._scissorCounter : 0
    }
    ,
    t.prototype.calcScissorRect = function(e) {
        var i;
        if (!e._scissorRectLocal) {
            var n = e._scissorRect
              , s = e.maskObject
              , o = this.renderer
              , a = o.renderTexture
              , u = s.getBounds(!0, (i = ki.pop()) !== null && i !== void 0 ? i : new z);
            this.roundFrameToPixels(u, a.current ? a.current.resolution : o.resolution, a.sourceFrame, a.destinationFrame, o.projection.transform),
            n && u.fit(n),
            e._scissorRectLocal = u
        }
    }
    ,
    t.isMatrixRotated = function(e) {
        if (!e)
            return !1;
        var i = e.a
          , n = e.b
          , s = e.c
          , o = e.d;
        return (Math.abs(n) > 1e-4 || Math.abs(s) > 1e-4) && (Math.abs(i) > 1e-4 || Math.abs(o) > 1e-4)
    }
    ,
    t.prototype.testScissor = function(e) {
        var i = e.maskObject;
        if (!i.isFastRect || !i.isFastRect() || t.isMatrixRotated(i.worldTransform) || t.isMatrixRotated(this.renderer.projection.transform))
            return !1;
        this.calcScissorRect(e);
        var n = e._scissorRectLocal;
        return n.width > 0 && n.height > 0
    }
    ,
    t.prototype.roundFrameToPixels = function(e, i, n, s, o) {
        t.isMatrixRotated(o) || (o = o ? Bi.copyFrom(o) : Bi.identity(),
        o.translate(-n.x, -n.y).scale(s.width / n.width, s.height / n.height).translate(s.x, s.y),
        this.renderer.filter.transformAABB(o, e),
        e.fit(s),
        e.x = Math.round(e.x * i),
        e.y = Math.round(e.y * i),
        e.width = Math.round(e.width * i),
        e.height = Math.round(e.height * i))
    }
    ,
    t.prototype.push = function(e) {
        e._scissorRectLocal || this.calcScissorRect(e);
        var i = this.renderer.gl;
        e._scissorRect || i.enable(i.SCISSOR_TEST),
        e._scissorCounter++,
        e._scissorRect = e._scissorRectLocal,
        this._useCurrent()
    }
    ,
    t.prototype.pop = function(e) {
        var i = this.renderer.gl;
        e && ki.push(e._scissorRectLocal),
        this.getStackLength() > 0 ? this._useCurrent() : i.disable(i.SCISSOR_TEST)
    }
    ,
    t.prototype._useCurrent = function() {
        var e = this.maskStack[this.maskStack.length - 1]._scissorRect, i;
        this.renderer.renderTexture.current ? i = e.y : i = this.renderer.height - e.height - e.y,
        this.renderer.gl.scissor(e.x, i, e.width, e.height)
    }
    ,
    t
}(pn)
  , Do = function(r) {
    P(t, r);
    function t(e) {
        var i = r.call(this, e) || this;
        return i.glConst = E.ADAPTER.getWebGLRenderingContext().STENCIL_TEST,
        i
    }
    return t.prototype.getStackLength = function() {
        var e = this.maskStack[this.maskStack.length - 1];
        return e ? e._stencilCounter : 0
    }
    ,
    t.prototype.push = function(e) {
        var i = e.maskObject
          , n = this.renderer.gl
          , s = e._stencilCounter;
        s === 0 && (this.renderer.framebuffer.forceStencil(),
        n.clearStencil(0),
        n.clear(n.STENCIL_BUFFER_BIT),
        n.enable(n.STENCIL_TEST)),
        e._stencilCounter++;
        var o = e._colorMask;
        o !== 0 && (e._colorMask = 0,
        n.colorMask(!1, !1, !1, !1)),
        n.stencilFunc(n.EQUAL, s, 4294967295),
        n.stencilOp(n.KEEP, n.KEEP, n.INCR),
        i.renderable = !0,
        i.render(this.renderer),
        this.renderer.batch.flush(),
        i.renderable = !1,
        o !== 0 && (e._colorMask = o,
        n.colorMask((o & 1) !== 0, (o & 2) !== 0, (o & 4) !== 0, (o & 8) !== 0)),
        this._useCurrent()
    }
    ,
    t.prototype.pop = function(e) {
        var i = this.renderer.gl;
        if (this.getStackLength() === 0)
            i.disable(i.STENCIL_TEST);
        else {
            var n = this.maskStack.length !== 0 ? this.maskStack[this.maskStack.length - 1] : null
              , s = n ? n._colorMask : 15;
            s !== 0 && (n._colorMask = 0,
            i.colorMask(!1, !1, !1, !1)),
            i.stencilOp(i.KEEP, i.KEEP, i.DECR),
            e.renderable = !0,
            e.render(this.renderer),
            this.renderer.batch.flush(),
            e.renderable = !1,
            s !== 0 && (n._colorMask = s,
            i.colorMask((s & 1) !== 0, (s & 2) !== 0, (s & 4) !== 0, (s & 8) !== 0)),
            this._useCurrent()
        }
    }
    ,
    t.prototype._useCurrent = function() {
        var e = this.renderer.gl;
        e.stencilFunc(e.EQUAL, this.getStackLength(), 4294967295),
        e.stencilOp(e.KEEP, e.KEEP, e.KEEP)
    }
    ,
    t
}(pn)
  , Ho = function() {
    function r(t) {
        this.renderer = t,
        this.destinationFrame = null,
        this.sourceFrame = null,
        this.defaultFrame = null,
        this.projectionMatrix = new tt,
        this.transform = null
    }
    return r.prototype.update = function(t, e, i, n) {
        this.destinationFrame = t || this.destinationFrame || this.defaultFrame,
        this.sourceFrame = e || this.sourceFrame || t,
        this.calculateProjection(this.destinationFrame, this.sourceFrame, i, n),
        this.transform && this.projectionMatrix.append(this.transform);
        var s = this.renderer;
        s.globalUniforms.uniforms.projectionMatrix = this.projectionMatrix,
        s.globalUniforms.update(),
        s.shader.shader && s.shader.syncUniformGroup(s.shader.shader.uniforms.globals)
    }
    ,
    r.prototype.calculateProjection = function(t, e, i, n) {
        var s = this.projectionMatrix
          , o = n ? -1 : 1;
        s.identity(),
        s.a = 1 / e.width * 2,
        s.d = o * (1 / e.height * 2),
        s.tx = -1 - e.x * s.a,
        s.ty = -o - e.y * s.d
    }
    ,
    r.prototype.setTransform = function(t) {}
    ,
    r.prototype.destroy = function() {
        this.renderer = null
    }
    ,
    r
}()
  , St = new z
  , ee = new z
  , Xo = function() {
    function r(t) {
        this.renderer = t,
        this.clearColor = t._backgroundColorRgba,
        this.defaultMaskStack = [],
        this.current = null,
        this.sourceFrame = new z,
        this.destinationFrame = new z,
        this.viewportFrame = new z
    }
    return r.prototype.bind = function(t, e, i) {
        t === void 0 && (t = null);
        var n = this.renderer;
        this.current = t;
        var s, o, a;
        t ? (s = t.baseTexture,
        a = s.resolution,
        e || (St.width = t.frame.width,
        St.height = t.frame.height,
        e = St),
        i || (ee.x = t.frame.x,
        ee.y = t.frame.y,
        ee.width = e.width,
        ee.height = e.height,
        i = ee),
        o = s.framebuffer) : (a = n.resolution,
        e || (St.width = n.screen.width,
        St.height = n.screen.height,
        e = St),
        i || (i = St,
        i.width = e.width,
        i.height = e.height));
        var u = this.viewportFrame;
        u.x = i.x * a,
        u.y = i.y * a,
        u.width = i.width * a,
        u.height = i.height * a,
        t || (u.y = n.view.height - (u.y + u.height)),
        u.ceil(),
        this.renderer.framebuffer.bind(o, u),
        this.renderer.projection.update(i, e, a, !o),
        t ? this.renderer.mask.setMaskStack(s.maskStack) : this.renderer.mask.setMaskStack(this.defaultMaskStack),
        this.sourceFrame.copyFrom(e),
        this.destinationFrame.copyFrom(i)
    }
    ,
    r.prototype.clear = function(t, e) {
        this.current ? t = t || this.current.baseTexture.clearColor : t = t || this.clearColor;
        var i = this.destinationFrame
          , n = this.current ? this.current.baseTexture : this.renderer.screen
          , s = i.width !== n.width || i.height !== n.height;
        if (s) {
            var o = this.viewportFrame
              , a = o.x
              , u = o.y
              , h = o.width
              , f = o.height;
            a = Math.round(a),
            u = Math.round(u),
            h = Math.round(h),
            f = Math.round(f),
            this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST),
            this.renderer.gl.scissor(a, u, h, f)
        }
        this.renderer.framebuffer.clear(t[0], t[1], t[2], t[3], e),
        s && this.renderer.scissor.pop()
    }
    ,
    r.prototype.resize = function() {
        this.bind(null)
    }
    ,
    r.prototype.reset = function() {
        this.bind(null)
    }
    ,
    r.prototype.destroy = function() {
        this.renderer = null
    }
    ,
    r
}();
function Vo(r, t, e, i, n) {
    e.buffer.update(n)
}
var jo = {
    float: `
        data[offset] = v;
    `,
    vec2: `
        data[offset] = v[0];
        data[offset+1] = v[1];
    `,
    vec3: `
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];

    `,
    vec4: `
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];
        data[offset+3] = v[3];
    `,
    mat2: `
        data[offset] = v[0];
        data[offset+1] = v[1];

        data[offset+4] = v[2];
        data[offset+5] = v[3];
    `,
    mat3: `
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];

        data[offset + 4] = v[3];
        data[offset + 5] = v[4];
        data[offset + 6] = v[5];

        data[offset + 8] = v[6];
        data[offset + 9] = v[7];
        data[offset + 10] = v[8];
    `,
    mat4: `
        for(var i = 0; i < 16; i++)
        {
            data[offset + i] = v[i];
        }
    `
}
  , vn = {
    float: 4,
    vec2: 8,
    vec3: 12,
    vec4: 16,
    int: 4,
    ivec2: 8,
    ivec3: 12,
    ivec4: 16,
    uint: 4,
    uvec2: 8,
    uvec3: 12,
    uvec4: 16,
    bool: 4,
    bvec2: 8,
    bvec3: 12,
    bvec4: 16,
    mat2: 16 * 2,
    mat3: 16 * 3,
    mat4: 16 * 4
};
function zo(r) {
    for (var t = r.map(function(u) {
        return {
            data: u,
            offset: 0,
            dataLen: 0,
            dirty: 0
        }
    }), e = 0, i = 0, n = 0, s = 0; s < t.length; s++) {
        var o = t[s];
        if (e = vn[o.data.type],
        o.data.size > 1 && (e = Math.max(e, 16) * o.data.size),
        o.dataLen = e,
        i % e !== 0 && i < 16) {
            var a = i % e % 16;
            i += a,
            n += a
        }
        i + e > 16 ? (n = Math.ceil(n / 16) * 16,
        o.offset = n,
        n += e,
        i = e) : (o.offset = n,
        i += e,
        n += e)
    }
    return n = Math.ceil(n / 16) * 16,
    {
        uboElements: t,
        size: n
    }
}
function Wo(r, t) {
    var e = [];
    for (var i in r)
        t[i] && e.push(t[i]);
    return e.sort(function(n, s) {
        return n.index - s.index
    }),
    e
}
function qo(r, t) {
    if (!r.autoManage)
        return {
            size: 0,
            syncFunc: Vo
        };
    for (var e = Wo(r.uniforms, t), i = zo(e), n = i.uboElements, s = i.size, o = [`
    var v = null;
    var v2 = null;
    var cv = null;
    var t = 0;
    var gl = renderer.gl
    var index = 0;
    var data = buffer.data;
    `], a = 0; a < n.length; a++) {
        for (var u = n[a], h = r.uniforms[u.data.name], f = u.data.name, l = !1, c = 0; c < Zt.length; c++) {
            var d = Zt[c];
            if (d.codeUbo && d.test(u.data, h)) {
                o.push("offset = " + u.offset / 4 + ";", Zt[c].codeUbo(u.data.name, h)),
                l = !0;
                break
            }
        }
        if (!l)
            if (u.data.size > 1) {
                var p = ln(u.data.type)
                  , y = Math.max(vn[u.data.type] / 16, 1)
                  , v = p / y
                  , T = (4 - v % 4) % 4;
                o.push(`
                cv = ud.` + f + `.value;
                v = uv.` + f + `;
                offset = ` + u.offset / 4 + `;

                t = 0;

                for(var i=0; i < ` + u.data.size * y + `; i++)
                {
                    for(var j = 0; j < ` + v + `; j++)
                    {
                        data[offset++] = v[t++];
                    }
                    offset += ` + T + `;
                }

                `)
            } else {
                var g = jo[u.data.type];
                o.push(`
                cv = ud.` + f + `.value;
                v = uv.` + f + `;
                offset = ` + u.offset / 4 + `;
                ` + g + `;
                `)
            }
    }
    return o.push(`
       renderer.buffer.update(buffer);
    `),
    {
        size: s,
        syncFunc: new Function("ud","uv","renderer","syncData","buffer",o.join(`
`))
    }
}
var $o = function() {
    function r(t, e) {
        this.program = t,
        this.uniformData = e,
        this.uniformGroups = {},
        this.uniformDirtyGroups = {},
        this.uniformBufferBindings = {}
    }
    return r.prototype.destroy = function() {
        this.uniformData = null,
        this.uniformGroups = null,
        this.uniformDirtyGroups = null,
        this.uniformBufferBindings = null,
        this.program = null
    }
    ,
    r
}();
function Zo(r, t) {
    for (var e = {}, i = t.getProgramParameter(r, t.ACTIVE_ATTRIBUTES), n = 0; n < i; n++) {
        var s = t.getActiveAttrib(r, n);
        if (s.name.indexOf("gl_") !== 0) {
            var o = cn(t, s.type)
              , a = {
                type: o,
                name: s.name,
                size: ln(o),
                location: t.getAttribLocation(r, s.name)
            };
            e[s.name] = a
        }
    }
    return e
}
function Yo(r, t) {
    for (var e = {}, i = t.getProgramParameter(r, t.ACTIVE_UNIFORMS), n = 0; n < i; n++) {
        var s = t.getActiveUniform(r, n)
          , o = s.name.replace(/\[.*?\]$/, "")
          , a = !!s.name.match(/\[.*?\]$/)
          , u = cn(t, s.type);
        e[o] = {
            name: o,
            index: n,
            type: u,
            size: s.size,
            isArray: a,
            value: hn(u, s.size)
        }
    }
    return e
}
function Ko(r, t) {
    var e = Fi(r, r.VERTEX_SHADER, t.vertexSrc)
      , i = Fi(r, r.FRAGMENT_SHADER, t.fragmentSrc)
      , n = r.createProgram();
    if (r.attachShader(n, e),
    r.attachShader(n, i),
    r.linkProgram(n),
    r.getProgramParameter(n, r.LINK_STATUS) || yo(r, n, e, i),
    t.attributeData = Zo(n, r),
    t.uniformData = Yo(n, r),
    !/^[ \t]*#[ \t]*version[ \t]+300[ \t]+es[ \t]*$/m.test(t.vertexSrc)) {
        var s = Object.keys(t.attributeData);
        s.sort(function(f, l) {
            return f > l ? 1 : -1
        });
        for (var o = 0; o < s.length; o++)
            t.attributeData[s[o]].location = o,
            r.bindAttribLocation(n, o, s[o]);
        r.linkProgram(n)
    }
    r.deleteShader(e),
    r.deleteShader(i);
    var a = {};
    for (var o in t.uniformData) {
        var u = t.uniformData[o];
        a[o] = {
            location: r.getUniformLocation(n, o),
            value: hn(u.type, u.size)
        }
    }
    var h = new $o(n,a);
    return h
}
var Jo = 0
  , Ue = {
    textureCount: 0,
    uboCount: 0
}
  , Qo = function() {
    function r(t) {
        this.destroyed = !1,
        this.renderer = t,
        this.systemCheck(),
        this.gl = null,
        this.shader = null,
        this.program = null,
        this.cache = {},
        this._uboCache = {},
        this.id = Jo++
    }
    return r.prototype.systemCheck = function() {
        if (!Ao())
            throw new Error("Current environment does not allow unsafe-eval, please use @pixi/unsafe-eval module to enable support.")
    }
    ,
    r.prototype.contextChange = function(t) {
        this.gl = t,
        this.reset()
    }
    ,
    r.prototype.bind = function(t, e) {
        t.uniforms.globals = this.renderer.globalUniforms;
        var i = t.program
          , n = i.glPrograms[this.renderer.CONTEXT_UID] || this.generateProgram(t);
        return this.shader = t,
        this.program !== i && (this.program = i,
        this.gl.useProgram(n.program)),
        e || (Ue.textureCount = 0,
        Ue.uboCount = 0,
        this.syncUniformGroup(t.uniformGroup, Ue)),
        n
    }
    ,
    r.prototype.setUniforms = function(t) {
        var e = this.shader.program
          , i = e.glPrograms[this.renderer.CONTEXT_UID];
        e.syncUniforms(i.uniformData, t, this.renderer)
    }
    ,
    r.prototype.syncUniformGroup = function(t, e) {
        var i = this.getGlProgram();
        (!t.static || t.dirtyId !== i.uniformDirtyGroups[t.id]) && (i.uniformDirtyGroups[t.id] = t.dirtyId,
        this.syncUniforms(t, i, e))
    }
    ,
    r.prototype.syncUniforms = function(t, e, i) {
        var n = t.syncUniforms[this.shader.program.id] || this.createSyncGroups(t);
        n(e.uniformData, t.uniforms, this.renderer, i)
    }
    ,
    r.prototype.createSyncGroups = function(t) {
        var e = this.getSignature(t, this.shader.program.uniformData, "u");
        return this.cache[e] || (this.cache[e] = To(t, this.shader.program.uniformData)),
        t.syncUniforms[this.shader.program.id] = this.cache[e],
        t.syncUniforms[this.shader.program.id]
    }
    ,
    r.prototype.syncUniformBufferGroup = function(t, e) {
        var i = this.getGlProgram();
        if (!t.static || t.dirtyId !== 0 || !i.uniformGroups[t.id]) {
            t.dirtyId = 0;
            var n = i.uniformGroups[t.id] || this.createSyncBufferGroup(t, i, e);
            t.buffer.update(),
            n(i.uniformData, t.uniforms, this.renderer, Ue, t.buffer)
        }
        this.renderer.buffer.bindBufferBase(t.buffer, i.uniformBufferBindings[e])
    }
    ,
    r.prototype.createSyncBufferGroup = function(t, e, i) {
        var n = this.renderer.gl;
        this.renderer.buffer.bind(t.buffer);
        var s = this.gl.getUniformBlockIndex(e.program, i);
        e.uniformBufferBindings[i] = this.shader.uniformBindCount,
        n.uniformBlockBinding(e.program, s, this.shader.uniformBindCount),
        this.shader.uniformBindCount++;
        var o = this.getSignature(t, this.shader.program.uniformData, "ubo")
          , a = this._uboCache[o];
        if (a || (a = this._uboCache[o] = qo(t, this.shader.program.uniformData)),
        t.autoManage) {
            var u = new Float32Array(a.size / 4);
            t.buffer.update(u)
        }
        return e.uniformGroups[t.id] = a.syncFunc,
        e.uniformGroups[t.id]
    }
    ,
    r.prototype.getSignature = function(t, e, i) {
        var n = t.uniforms
          , s = [i + "-"];
        for (var o in n)
            s.push(o),
            e[o] && s.push(e[o].type);
        return s.join("-")
    }
    ,
    r.prototype.getGlProgram = function() {
        return this.shader ? this.shader.program.glPrograms[this.renderer.CONTEXT_UID] : null
    }
    ,
    r.prototype.generateProgram = function(t) {
        var e = this.gl
          , i = t.program
          , n = Ko(e, i);
        return i.glPrograms[this.renderer.CONTEXT_UID] = n,
        n
    }
    ,
    r.prototype.reset = function() {
        this.program = null,
        this.shader = null
    }
    ,
    r.prototype.destroy = function() {
        this.renderer = null,
        this.destroyed = !0
    }
    ,
    r
}();
function ta(r, t) {
    return t === void 0 && (t = []),
    t[I.NORMAL] = [r.ONE, r.ONE_MINUS_SRC_ALPHA],
    t[I.ADD] = [r.ONE, r.ONE],
    t[I.MULTIPLY] = [r.DST_COLOR, r.ONE_MINUS_SRC_ALPHA, r.ONE, r.ONE_MINUS_SRC_ALPHA],
    t[I.SCREEN] = [r.ONE, r.ONE_MINUS_SRC_COLOR, r.ONE, r.ONE_MINUS_SRC_ALPHA],
    t[I.OVERLAY] = [r.ONE, r.ONE_MINUS_SRC_ALPHA],
    t[I.DARKEN] = [r.ONE, r.ONE_MINUS_SRC_ALPHA],
    t[I.LIGHTEN] = [r.ONE, r.ONE_MINUS_SRC_ALPHA],
    t[I.COLOR_DODGE] = [r.ONE, r.ONE_MINUS_SRC_ALPHA],
    t[I.COLOR_BURN] = [r.ONE, r.ONE_MINUS_SRC_ALPHA],
    t[I.HARD_LIGHT] = [r.ONE, r.ONE_MINUS_SRC_ALPHA],
    t[I.SOFT_LIGHT] = [r.ONE, r.ONE_MINUS_SRC_ALPHA],
    t[I.DIFFERENCE] = [r.ONE, r.ONE_MINUS_SRC_ALPHA],
    t[I.EXCLUSION] = [r.ONE, r.ONE_MINUS_SRC_ALPHA],
    t[I.HUE] = [r.ONE, r.ONE_MINUS_SRC_ALPHA],
    t[I.SATURATION] = [r.ONE, r.ONE_MINUS_SRC_ALPHA],
    t[I.COLOR] = [r.ONE, r.ONE_MINUS_SRC_ALPHA],
    t[I.LUMINOSITY] = [r.ONE, r.ONE_MINUS_SRC_ALPHA],
    t[I.NONE] = [0, 0],
    t[I.NORMAL_NPM] = [r.SRC_ALPHA, r.ONE_MINUS_SRC_ALPHA, r.ONE, r.ONE_MINUS_SRC_ALPHA],
    t[I.ADD_NPM] = [r.SRC_ALPHA, r.ONE, r.ONE, r.ONE],
    t[I.SCREEN_NPM] = [r.SRC_ALPHA, r.ONE_MINUS_SRC_COLOR, r.ONE, r.ONE_MINUS_SRC_ALPHA],
    t[I.SRC_IN] = [r.DST_ALPHA, r.ZERO],
    t[I.SRC_OUT] = [r.ONE_MINUS_DST_ALPHA, r.ZERO],
    t[I.SRC_ATOP] = [r.DST_ALPHA, r.ONE_MINUS_SRC_ALPHA],
    t[I.DST_OVER] = [r.ONE_MINUS_DST_ALPHA, r.ONE],
    t[I.DST_IN] = [r.ZERO, r.SRC_ALPHA],
    t[I.DST_OUT] = [r.ZERO, r.ONE_MINUS_SRC_ALPHA],
    t[I.DST_ATOP] = [r.ONE_MINUS_DST_ALPHA, r.SRC_ALPHA],
    t[I.XOR] = [r.ONE_MINUS_DST_ALPHA, r.ONE_MINUS_SRC_ALPHA],
    t[I.SUBTRACT] = [r.ONE, r.ONE, r.ONE, r.ONE, r.FUNC_REVERSE_SUBTRACT, r.FUNC_ADD],
    t
}
var ea = 0
  , ra = 1
  , ia = 2
  , na = 3
  , sa = 4
  , oa = 5
  , aa = function() {
    function r() {
        this.gl = null,
        this.stateId = 0,
        this.polygonOffset = 0,
        this.blendMode = I.NONE,
        this._blendEq = !1,
        this.map = [],
        this.map[ea] = this.setBlend,
        this.map[ra] = this.setOffset,
        this.map[ia] = this.setCullFace,
        this.map[na] = this.setDepthTest,
        this.map[sa] = this.setFrontFace,
        this.map[oa] = this.setDepthMask,
        this.checks = [],
        this.defaultState = new Br,
        this.defaultState.blend = !0
    }
    return r.prototype.contextChange = function(t) {
        this.gl = t,
        this.blendModes = ta(t),
        this.set(this.defaultState),
        this.reset()
    }
    ,
    r.prototype.set = function(t) {
        if (t = t || this.defaultState,
        this.stateId !== t.data) {
            for (var e = this.stateId ^ t.data, i = 0; e; )
                e & 1 && this.map[i].call(this, !!(t.data & 1 << i)),
                e = e >> 1,
                i++;
            this.stateId = t.data
        }
        for (var i = 0; i < this.checks.length; i++)
            this.checks[i](this, t)
    }
    ,
    r.prototype.forceState = function(t) {
        t = t || this.defaultState;
        for (var e = 0; e < this.map.length; e++)
            this.map[e].call(this, !!(t.data & 1 << e));
        for (var e = 0; e < this.checks.length; e++)
            this.checks[e](this, t);
        this.stateId = t.data
    }
    ,
    r.prototype.setBlend = function(t) {
        this.updateCheck(r.checkBlendMode, t),
        this.gl[t ? "enable" : "disable"](this.gl.BLEND)
    }
    ,
    r.prototype.setOffset = function(t) {
        this.updateCheck(r.checkPolygonOffset, t),
        this.gl[t ? "enable" : "disable"](this.gl.POLYGON_OFFSET_FILL)
    }
    ,
    r.prototype.setDepthTest = function(t) {
        this.gl[t ? "enable" : "disable"](this.gl.DEPTH_TEST)
    }
    ,
    r.prototype.setDepthMask = function(t) {
        this.gl.depthMask(t)
    }
    ,
    r.prototype.setCullFace = function(t) {
        this.gl[t ? "enable" : "disable"](this.gl.CULL_FACE)
    }
    ,
    r.prototype.setFrontFace = function(t) {
        this.gl.frontFace(this.gl[t ? "CW" : "CCW"])
    }
    ,
    r.prototype.setBlendMode = function(t) {
        if (t !== this.blendMode) {
            this.blendMode = t;
            var e = this.blendModes[t]
              , i = this.gl;
            e.length === 2 ? i.blendFunc(e[0], e[1]) : i.blendFuncSeparate(e[0], e[1], e[2], e[3]),
            e.length === 6 ? (this._blendEq = !0,
            i.blendEquationSeparate(e[4], e[5])) : this._blendEq && (this._blendEq = !1,
            i.blendEquationSeparate(i.FUNC_ADD, i.FUNC_ADD))
        }
    }
    ,
    r.prototype.setPolygonOffset = function(t, e) {
        this.gl.polygonOffset(t, e)
    }
    ,
    r.prototype.reset = function() {
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, !1),
        this.forceState(this.defaultState),
        this._blendEq = !0,
        this.blendMode = -1,
        this.setBlendMode(0)
    }
    ,
    r.prototype.updateCheck = function(t, e) {
        var i = this.checks.indexOf(t);
        e && i === -1 ? this.checks.push(t) : !e && i !== -1 && this.checks.splice(i, 1)
    }
    ,
    r.checkBlendMode = function(t, e) {
        t.setBlendMode(e.blendMode)
    }
    ,
    r.checkPolygonOffset = function(t, e) {
        t.setPolygonOffset(1, e.polygonOffset)
    }
    ,
    r.prototype.destroy = function() {
        this.gl = null
    }
    ,
    r
}()
  , ua = function() {
    function r(t) {
        this.renderer = t,
        this.count = 0,
        this.checkCount = 0,
        this.maxIdle = E.GC_MAX_IDLE,
        this.checkCountMax = E.GC_MAX_CHECK_COUNT,
        this.mode = E.GC_MODE
    }
    return r.prototype.postrender = function() {
        this.renderer.renderingToScreen && (this.count++,
        this.mode !== gr.MANUAL && (this.checkCount++,
        this.checkCount > this.checkCountMax && (this.checkCount = 0,
        this.run())))
    }
    ,
    r.prototype.run = function() {
        for (var t = this.renderer.texture, e = t.managedTextures, i = !1, n = 0; n < e.length; n++) {
            var s = e[n];
            !s.framebuffer && this.count - s.touched > this.maxIdle && (t.destroyTexture(s, !0),
            e[n] = null,
            i = !0)
        }
        if (i) {
            for (var o = 0, n = 0; n < e.length; n++)
                e[n] !== null && (e[o++] = e[n]);
            e.length = o
        }
    }
    ,
    r.prototype.unload = function(t) {
        var e = this.renderer.texture
          , i = t._texture;
        i && !i.framebuffer && e.destroyTexture(i);
        for (var n = t.children.length - 1; n >= 0; n--)
            this.unload(t.children[n])
    }
    ,
    r.prototype.destroy = function() {
        this.renderer = null
    }
    ,
    r
}();
function ha(r) {
    var t, e, i, n, s, o, a, u, h, f, l, c, d, p, y, v, T, g, _, b, A, C, k;
    return "WebGL2RenderingContext"in globalThis && r instanceof globalThis.WebGL2RenderingContext ? k = (t = {},
    t[N.UNSIGNED_BYTE] = (e = {},
    e[m.RGBA] = r.RGBA8,
    e[m.RGB] = r.RGB8,
    e[m.RG] = r.RG8,
    e[m.RED] = r.R8,
    e[m.RGBA_INTEGER] = r.RGBA8UI,
    e[m.RGB_INTEGER] = r.RGB8UI,
    e[m.RG_INTEGER] = r.RG8UI,
    e[m.RED_INTEGER] = r.R8UI,
    e[m.ALPHA] = r.ALPHA,
    e[m.LUMINANCE] = r.LUMINANCE,
    e[m.LUMINANCE_ALPHA] = r.LUMINANCE_ALPHA,
    e),
    t[N.BYTE] = (i = {},
    i[m.RGBA] = r.RGBA8_SNORM,
    i[m.RGB] = r.RGB8_SNORM,
    i[m.RG] = r.RG8_SNORM,
    i[m.RED] = r.R8_SNORM,
    i[m.RGBA_INTEGER] = r.RGBA8I,
    i[m.RGB_INTEGER] = r.RGB8I,
    i[m.RG_INTEGER] = r.RG8I,
    i[m.RED_INTEGER] = r.R8I,
    i),
    t[N.UNSIGNED_SHORT] = (n = {},
    n[m.RGBA_INTEGER] = r.RGBA16UI,
    n[m.RGB_INTEGER] = r.RGB16UI,
    n[m.RG_INTEGER] = r.RG16UI,
    n[m.RED_INTEGER] = r.R16UI,
    n[m.DEPTH_COMPONENT] = r.DEPTH_COMPONENT16,
    n),
    t[N.SHORT] = (s = {},
    s[m.RGBA_INTEGER] = r.RGBA16I,
    s[m.RGB_INTEGER] = r.RGB16I,
    s[m.RG_INTEGER] = r.RG16I,
    s[m.RED_INTEGER] = r.R16I,
    s),
    t[N.UNSIGNED_INT] = (o = {},
    o[m.RGBA_INTEGER] = r.RGBA32UI,
    o[m.RGB_INTEGER] = r.RGB32UI,
    o[m.RG_INTEGER] = r.RG32UI,
    o[m.RED_INTEGER] = r.R32UI,
    o[m.DEPTH_COMPONENT] = r.DEPTH_COMPONENT24,
    o),
    t[N.INT] = (a = {},
    a[m.RGBA_INTEGER] = r.RGBA32I,
    a[m.RGB_INTEGER] = r.RGB32I,
    a[m.RG_INTEGER] = r.RG32I,
    a[m.RED_INTEGER] = r.R32I,
    a),
    t[N.FLOAT] = (u = {},
    u[m.RGBA] = r.RGBA32F,
    u[m.RGB] = r.RGB32F,
    u[m.RG] = r.RG32F,
    u[m.RED] = r.R32F,
    u[m.DEPTH_COMPONENT] = r.DEPTH_COMPONENT32F,
    u),
    t[N.HALF_FLOAT] = (h = {},
    h[m.RGBA] = r.RGBA16F,
    h[m.RGB] = r.RGB16F,
    h[m.RG] = r.RG16F,
    h[m.RED] = r.R16F,
    h),
    t[N.UNSIGNED_SHORT_5_6_5] = (f = {},
    f[m.RGB] = r.RGB565,
    f),
    t[N.UNSIGNED_SHORT_4_4_4_4] = (l = {},
    l[m.RGBA] = r.RGBA4,
    l),
    t[N.UNSIGNED_SHORT_5_5_5_1] = (c = {},
    c[m.RGBA] = r.RGB5_A1,
    c),
    t[N.UNSIGNED_INT_2_10_10_10_REV] = (d = {},
    d[m.RGBA] = r.RGB10_A2,
    d[m.RGBA_INTEGER] = r.RGB10_A2UI,
    d),
    t[N.UNSIGNED_INT_10F_11F_11F_REV] = (p = {},
    p[m.RGB] = r.R11F_G11F_B10F,
    p),
    t[N.UNSIGNED_INT_5_9_9_9_REV] = (y = {},
    y[m.RGB] = r.RGB9_E5,
    y),
    t[N.UNSIGNED_INT_24_8] = (v = {},
    v[m.DEPTH_STENCIL] = r.DEPTH24_STENCIL8,
    v),
    t[N.FLOAT_32_UNSIGNED_INT_24_8_REV] = (T = {},
    T[m.DEPTH_STENCIL] = r.DEPTH32F_STENCIL8,
    T),
    t) : k = (g = {},
    g[N.UNSIGNED_BYTE] = (_ = {},
    _[m.RGBA] = r.RGBA,
    _[m.RGB] = r.RGB,
    _[m.ALPHA] = r.ALPHA,
    _[m.LUMINANCE] = r.LUMINANCE,
    _[m.LUMINANCE_ALPHA] = r.LUMINANCE_ALPHA,
    _),
    g[N.UNSIGNED_SHORT_5_6_5] = (b = {},
    b[m.RGB] = r.RGB,
    b),
    g[N.UNSIGNED_SHORT_4_4_4_4] = (A = {},
    A[m.RGBA] = r.RGBA,
    A),
    g[N.UNSIGNED_SHORT_5_5_5_1] = (C = {},
    C[m.RGBA] = r.RGBA,
    C),
    g),
    k
}
var sr = function() {
    function r(t) {
        this.texture = t,
        this.width = -1,
        this.height = -1,
        this.dirtyId = -1,
        this.dirtyStyleId = -1,
        this.mipmap = !1,
        this.wrapMode = 33071,
        this.type = N.UNSIGNED_BYTE,
        this.internalFormat = m.RGBA,
        this.samplerType = 0
    }
    return r
}()
  , fa = function() {
    function r(t) {
        this.renderer = t,
        this.boundTextures = [],
        this.currentLocation = -1,
        this.managedTextures = [],
        this._unknownBoundTextures = !1,
        this.unknownTexture = new X,
        this.hasIntegerTextures = !1
    }
    return r.prototype.contextChange = function() {
        var t = this.gl = this.renderer.gl;
        this.CONTEXT_UID = this.renderer.CONTEXT_UID,
        this.webGLVersion = this.renderer.context.webGLVersion,
        this.internalFormats = ha(t);
        var e = t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS);
        this.boundTextures.length = e;
        for (var i = 0; i < e; i++)
            this.boundTextures[i] = null;
        this.emptyTextures = {};
        var n = new sr(t.createTexture());
        t.bindTexture(t.TEXTURE_2D, n.texture),
        t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, new Uint8Array(4)),
        this.emptyTextures[t.TEXTURE_2D] = n,
        this.emptyTextures[t.TEXTURE_CUBE_MAP] = new sr(t.createTexture()),
        t.bindTexture(t.TEXTURE_CUBE_MAP, this.emptyTextures[t.TEXTURE_CUBE_MAP].texture);
        for (var i = 0; i < 6; i++)
            t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, null);
        t.texParameteri(t.TEXTURE_CUBE_MAP, t.TEXTURE_MAG_FILTER, t.LINEAR),
        t.texParameteri(t.TEXTURE_CUBE_MAP, t.TEXTURE_MIN_FILTER, t.LINEAR);
        for (var i = 0; i < this.boundTextures.length; i++)
            this.bind(null, i)
    }
    ,
    r.prototype.bind = function(t, e) {
        e === void 0 && (e = 0);
        var i = this.gl;
        if (t = t == null ? void 0 : t.castToBaseTexture(),
        t && t.valid && !t.parentTextureArray) {
            t.touched = this.renderer.textureGC.count;
            var n = t._glTextures[this.CONTEXT_UID] || this.initTexture(t);
            this.boundTextures[e] !== t && (this.currentLocation !== e && (this.currentLocation = e,
            i.activeTexture(i.TEXTURE0 + e)),
            i.bindTexture(t.target, n.texture)),
            n.dirtyId !== t.dirtyId && (this.currentLocation !== e && (this.currentLocation = e,
            i.activeTexture(i.TEXTURE0 + e)),
            this.updateTexture(t)),
            this.boundTextures[e] = t
        } else
            this.currentLocation !== e && (this.currentLocation = e,
            i.activeTexture(i.TEXTURE0 + e)),
            i.bindTexture(i.TEXTURE_2D, this.emptyTextures[i.TEXTURE_2D].texture),
            this.boundTextures[e] = null
    }
    ,
    r.prototype.reset = function() {
        this._unknownBoundTextures = !0,
        this.hasIntegerTextures = !1,
        this.currentLocation = -1;
        for (var t = 0; t < this.boundTextures.length; t++)
            this.boundTextures[t] = this.unknownTexture
    }
    ,
    r.prototype.unbind = function(t) {
        var e = this
          , i = e.gl
          , n = e.boundTextures;
        if (this._unknownBoundTextures) {
            this._unknownBoundTextures = !1;
            for (var s = 0; s < n.length; s++)
                n[s] === this.unknownTexture && this.bind(null, s)
        }
        for (var s = 0; s < n.length; s++)
            n[s] === t && (this.currentLocation !== s && (i.activeTexture(i.TEXTURE0 + s),
            this.currentLocation = s),
            i.bindTexture(t.target, this.emptyTextures[t.target].texture),
            n[s] = null)
    }
    ,
    r.prototype.ensureSamplerType = function(t) {
        var e = this
          , i = e.boundTextures
          , n = e.hasIntegerTextures
          , s = e.CONTEXT_UID;
        if (n)
            for (var o = t - 1; o >= 0; --o) {
                var a = i[o];
                if (a) {
                    var u = a._glTextures[s];
                    u.samplerType !== Be.FLOAT && this.renderer.texture.unbind(a)
                }
            }
    }
    ,
    r.prototype.initTexture = function(t) {
        var e = new sr(this.gl.createTexture());
        return e.dirtyId = -1,
        t._glTextures[this.CONTEXT_UID] = e,
        this.managedTextures.push(t),
        t.on("dispose", this.destroyTexture, this),
        e
    }
    ,
    r.prototype.initTextureType = function(t, e) {
        var i, n;
        e.internalFormat = (n = (i = this.internalFormats[t.type]) === null || i === void 0 ? void 0 : i[t.format]) !== null && n !== void 0 ? n : t.format,
        this.webGLVersion === 2 && t.type === N.HALF_FLOAT ? e.type = this.gl.HALF_FLOAT : e.type = t.type
    }
    ,
    r.prototype.updateTexture = function(t) {
        var e = t._glTextures[this.CONTEXT_UID];
        if (e) {
            var i = this.renderer;
            if (this.initTextureType(t, e),
            t.resource && t.resource.upload(i, t, e))
                e.samplerType !== Be.FLOAT && (this.hasIntegerTextures = !0);
            else {
                var n = t.realWidth
                  , s = t.realHeight
                  , o = i.gl;
                (e.width !== n || e.height !== s || e.dirtyId < 0) && (e.width = n,
                e.height = s,
                o.texImage2D(t.target, 0, e.internalFormat, n, s, 0, t.format, e.type, null))
            }
            t.dirtyStyleId !== e.dirtyStyleId && this.updateTextureStyle(t),
            e.dirtyId = t.dirtyId
        }
    }
    ,
    r.prototype.destroyTexture = function(t, e) {
        var i = this.gl;
        if (t = t.castToBaseTexture(),
        t._glTextures[this.CONTEXT_UID] && (this.unbind(t),
        i.deleteTexture(t._glTextures[this.CONTEXT_UID].texture),
        t.off("dispose", this.destroyTexture, this),
        delete t._glTextures[this.CONTEXT_UID],
        !e)) {
            var n = this.managedTextures.indexOf(t);
            n !== -1 && Bs(this.managedTextures, n, 1)
        }
    }
    ,
    r.prototype.updateTextureStyle = function(t) {
        var e = t._glTextures[this.CONTEXT_UID];
        e && ((t.mipmap === Dt.POW2 || this.webGLVersion !== 2) && !t.isPowerOfTwo ? e.mipmap = !1 : e.mipmap = t.mipmap >= 1,
        this.webGLVersion !== 2 && !t.isPowerOfTwo ? e.wrapMode = yr.CLAMP : e.wrapMode = t.wrapMode,
        t.resource && t.resource.style(this.renderer, t, e) || this.setStyle(t, e),
        e.dirtyStyleId = t.dirtyStyleId)
    }
    ,
    r.prototype.setStyle = function(t, e) {
        var i = this.gl;
        if (e.mipmap && t.mipmap !== Dt.ON_MANUAL && i.generateMipmap(t.target),
        i.texParameteri(t.target, i.TEXTURE_WRAP_S, e.wrapMode),
        i.texParameteri(t.target, i.TEXTURE_WRAP_T, e.wrapMode),
        e.mipmap) {
            i.texParameteri(t.target, i.TEXTURE_MIN_FILTER, t.scaleMode === mt.LINEAR ? i.LINEAR_MIPMAP_LINEAR : i.NEAREST_MIPMAP_NEAREST);
            var n = this.renderer.context.extensions.anisotropicFiltering;
            if (n && t.anisotropicLevel > 0 && t.scaleMode === mt.LINEAR) {
                var s = Math.min(t.anisotropicLevel, i.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT));
                i.texParameterf(t.target, n.TEXTURE_MAX_ANISOTROPY_EXT, s)
            }
        } else
            i.texParameteri(t.target, i.TEXTURE_MIN_FILTER, t.scaleMode === mt.LINEAR ? i.LINEAR : i.NEAREST);
        i.texParameteri(t.target, i.TEXTURE_MAG_FILTER, t.scaleMode === mt.LINEAR ? i.LINEAR : i.NEAREST)
    }
    ,
    r.prototype.destroy = function() {
        this.renderer = null
    }
    ,
    r
}()
  , or = new tt
  , la = function(r) {
    P(t, r);
    function t(e, i) {
        e === void 0 && (e = oe.UNKNOWN);
        var n = r.call(this) || this;
        return i = Object.assign({}, E.RENDER_OPTIONS, i),
        n.options = i,
        n.type = e,
        n.screen = new z(0,0,i.width,i.height),
        n.view = i.view || E.ADAPTER.createCanvas(),
        n.resolution = i.resolution || E.RESOLUTION,
        n.useContextAlpha = i.useContextAlpha,
        n.autoDensity = !!i.autoDensity,
        n.preserveDrawingBuffer = i.preserveDrawingBuffer,
        n.clearBeforeRender = i.clearBeforeRender,
        n._backgroundColor = 0,
        n._backgroundColorRgba = [0, 0, 0, 1],
        n._backgroundColorString = "#000000",
        n.backgroundColor = i.backgroundColor || n._backgroundColor,
        n.backgroundAlpha = i.backgroundAlpha,
        i.transparent !== void 0 && (It("6.0.0", "Option transparent is deprecated, please use backgroundAlpha instead."),
        n.useContextAlpha = i.transparent,
        n.backgroundAlpha = i.transparent ? 0 : 1),
        n._lastObjectRendered = null,
        n.plugins = {},
        n
    }
    return t.prototype.initPlugins = function(e) {
        for (var i in e)
            this.plugins[i] = new e[i](this)
    }
    ,
    Object.defineProperty(t.prototype, "width", {
        get: function() {
            return this.view.width
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "height", {
        get: function() {
            return this.view.height
        },
        enumerable: !1,
        configurable: !0
    }),
    t.prototype.resize = function(e, i) {
        this.view.width = Math.round(e * this.resolution),
        this.view.height = Math.round(i * this.resolution);
        var n = this.view.width / this.resolution
          , s = this.view.height / this.resolution;
        this.screen.width = n,
        this.screen.height = s,
        this.autoDensity && (this.view.style.width = n + "px",
        this.view.style.height = s + "px"),
        this.emit("resize", n, s)
    }
    ,
    t.prototype.generateTexture = function(e, i, n, s) {
        i === void 0 && (i = {}),
        typeof i == "number" && (It("6.1.0", "generateTexture options (scaleMode, resolution, region) are now object options."),
        i = {
            scaleMode: i,
            resolution: n,
            region: s
        });
        var o = i.region
          , a = Vs(i, ["region"]);
        s = o || e.getLocalBounds(null, !0),
        s.width === 0 && (s.width = 1),
        s.height === 0 && (s.height = 1);
        var u = Lr.create(Pr({
            width: s.width,
            height: s.height
        }, a));
        return or.tx = -s.x,
        or.ty = -s.y,
        this.render(e, {
            renderTexture: u,
            clear: !1,
            transform: or,
            skipUpdateTransform: !!e.parent
        }),
        u
    }
    ,
    t.prototype.destroy = function(e) {
        for (var i in this.plugins)
            this.plugins[i].destroy(),
            this.plugins[i] = null;
        e && this.view.parentNode && this.view.parentNode.removeChild(this.view);
        var n = this;
        n.plugins = null,
        n.type = oe.UNKNOWN,
        n.view = null,
        n.screen = null,
        n._tempDisplayObjectParent = null,
        n.options = null,
        this._backgroundColorRgba = null,
        this._backgroundColorString = null,
        this._lastObjectRendered = null
    }
    ,
    Object.defineProperty(t.prototype, "backgroundColor", {
        get: function() {
            return this._backgroundColor
        },
        set: function(e) {
            this._backgroundColor = e,
            this._backgroundColorString = Us(e),
            Fs(e, this._backgroundColorRgba)
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "backgroundAlpha", {
        get: function() {
            return this._backgroundColorRgba[3]
        },
        set: function(e) {
            this._backgroundColorRgba[3] = e
        },
        enumerable: !1,
        configurable: !0
    }),
    t
}(At)
  , ca = function() {
    function r(t) {
        this.buffer = t || null,
        this.updateID = -1,
        this.byteLength = -1,
        this.refCount = 0
    }
    return r
}()
  , da = function() {
    function r(t) {
        this.renderer = t,
        this.managedBuffers = {},
        this.boundBufferBases = {}
    }
    return r.prototype.destroy = function() {
        this.renderer = null
    }
    ,
    r.prototype.contextChange = function() {
        this.disposeAll(!0),
        this.gl = this.renderer.gl,
        this.CONTEXT_UID = this.renderer.CONTEXT_UID
    }
    ,
    r.prototype.bind = function(t) {
        var e = this
          , i = e.gl
          , n = e.CONTEXT_UID
          , s = t._glBuffers[n] || this.createGLBuffer(t);
        i.bindBuffer(t.type, s.buffer)
    }
    ,
    r.prototype.bindBufferBase = function(t, e) {
        var i = this
          , n = i.gl
          , s = i.CONTEXT_UID;
        if (this.boundBufferBases[e] !== t) {
            var o = t._glBuffers[s] || this.createGLBuffer(t);
            this.boundBufferBases[e] = t,
            n.bindBufferBase(n.UNIFORM_BUFFER, e, o.buffer)
        }
    }
    ,
    r.prototype.bindBufferRange = function(t, e, i) {
        var n = this
          , s = n.gl
          , o = n.CONTEXT_UID;
        i = i || 0;
        var a = t._glBuffers[o] || this.createGLBuffer(t);
        s.bindBufferRange(s.UNIFORM_BUFFER, e || 0, a.buffer, i * 256, 256)
    }
    ,
    r.prototype.update = function(t) {
        var e = this
          , i = e.gl
          , n = e.CONTEXT_UID
          , s = t._glBuffers[n];
        if (t._updateID !== s.updateID)
            if (s.updateID = t._updateID,
            i.bindBuffer(t.type, s.buffer),
            s.byteLength >= t.data.byteLength)
                i.bufferSubData(t.type, 0, t.data);
            else {
                var o = t.static ? i.STATIC_DRAW : i.DYNAMIC_DRAW;
                s.byteLength = t.data.byteLength,
                i.bufferData(t.type, t.data, o)
            }
    }
    ,
    r.prototype.dispose = function(t, e) {
        if (this.managedBuffers[t.id]) {
            delete this.managedBuffers[t.id];
            var i = t._glBuffers[this.CONTEXT_UID]
              , n = this.gl;
            t.disposeRunner.remove(this),
            i && (e || n.deleteBuffer(i.buffer),
            delete t._glBuffers[this.CONTEXT_UID])
        }
    }
    ,
    r.prototype.disposeAll = function(t) {
        for (var e = Object.keys(this.managedBuffers), i = 0; i < e.length; i++)
            this.dispose(this.managedBuffers[e[i]], t)
    }
    ,
    r.prototype.createGLBuffer = function(t) {
        var e = this
          , i = e.CONTEXT_UID
          , n = e.gl;
        return t._glBuffers[i] = new ca(n.createBuffer()),
        this.managedBuffers[t.id] = t,
        t.disposeRunner.add(this),
        t._glBuffers[i]
    }
    ,
    r
}()
  , pa = function(r) {
    P(t, r);
    function t(e) {
        var i = r.call(this, oe.WEBGL, e) || this;
        return e = i.options,
        i.gl = null,
        i.CONTEXT_UID = 0,
        i.runners = {
            destroy: new $("destroy"),
            contextChange: new $("contextChange"),
            reset: new $("reset"),
            update: new $("update"),
            postrender: new $("postrender"),
            prerender: new $("prerender"),
            resize: new $("resize")
        },
        i.runners.contextChange.add(i),
        i.globalUniforms = new $t({
            projectionMatrix: new tt
        },!0),
        i.addSystem(Bo, "mask").addSystem(fo, "context").addSystem(aa, "state").addSystem(Qo, "shader").addSystem(fa, "texture").addSystem(da, "buffer").addSystem(vo, "geometry").addSystem(po, "framebuffer").addSystem(ko, "scissor").addSystem(Do, "stencil").addSystem(Ho, "projection").addSystem(ua, "textureGC").addSystem(uo, "filter").addSystem(Xo, "renderTexture").addSystem(ho, "batch"),
        i.initPlugins(t.__plugins),
        i.multisample = void 0,
        e.context ? i.context.initFromContext(e.context) : i.context.initFromOptions({
            alpha: !!i.useContextAlpha,
            antialias: e.antialias,
            premultipliedAlpha: i.useContextAlpha && i.useContextAlpha !== "notMultiplied",
            stencil: !0,
            preserveDrawingBuffer: e.preserveDrawingBuffer,
            powerPreference: i.options.powerPreference
        }),
        i.renderingToScreen = !0,
        Ps(i.context.webGLVersion === 2 ? "WebGL 2" : "WebGL 1"),
        i.resize(i.options.width, i.options.height),
        i
    }
    return t.create = function(e) {
        if (Ss())
            return new t(e);
        throw new Error('WebGL unsupported in this browser, use "pixi.js-legacy" for fallback canvas2d support.')
    }
    ,
    t.prototype.contextChange = function() {
        var e = this.gl, i;
        if (this.context.webGLVersion === 1) {
            var n = e.getParameter(e.FRAMEBUFFER_BINDING);
            e.bindFramebuffer(e.FRAMEBUFFER, null),
            i = e.getParameter(e.SAMPLES),
            e.bindFramebuffer(e.FRAMEBUFFER, n)
        } else {
            var n = e.getParameter(e.DRAW_FRAMEBUFFER_BINDING);
            e.bindFramebuffer(e.DRAW_FRAMEBUFFER, null),
            i = e.getParameter(e.SAMPLES),
            e.bindFramebuffer(e.DRAW_FRAMEBUFFER, n)
        }
        i >= B.HIGH ? this.multisample = B.HIGH : i >= B.MEDIUM ? this.multisample = B.MEDIUM : i >= B.LOW ? this.multisample = B.LOW : this.multisample = B.NONE
    }
    ,
    t.prototype.addSystem = function(e, i) {
        var n = new e(this);
        if (this[i])
            throw new Error('Whoops! The name "' + i + '" is already in use');
        this[i] = n;
        for (var s in this.runners)
            this.runners[s].add(n);
        return this
    }
    ,
    t.prototype.render = function(e, i) {
        var n, s, o, a;
        if (i && (i instanceof Lr ? (It("6.0.0", "Renderer#render arguments changed, use options instead."),
        n = i,
        s = arguments[2],
        o = arguments[3],
        a = arguments[4]) : (n = i.renderTexture,
        s = i.clear,
        o = i.transform,
        a = i.skipUpdateTransform)),
        this.renderingToScreen = !n,
        this.runners.prerender.emit(),
        this.emit("prerender"),
        this.projection.transform = o,
        !this.context.isLost) {
            if (n || (this._lastObjectRendered = e),
            !a) {
                var u = e.enableTempParent();
                e.updateTransform(),
                e.disableTempParent(u)
            }
            this.renderTexture.bind(n),
            this.batch.currentRenderer.start(),
            (s !== void 0 ? s : this.clearBeforeRender) && this.renderTexture.clear(),
            e.render(this),
            this.batch.currentRenderer.flush(),
            n && n.baseTexture.update(),
            this.runners.postrender.emit(),
            this.projection.transform = null,
            this.emit("postrender")
        }
    }
    ,
    t.prototype.generateTexture = function(e, i, n, s) {
        i === void 0 && (i = {});
        var o = r.prototype.generateTexture.call(this, e, i, n, s);
        return this.framebuffer.blit(),
        o
    }
    ,
    t.prototype.resize = function(e, i) {
        r.prototype.resize.call(this, e, i),
        this.runners.resize.emit(this.screen.height, this.screen.width)
    }
    ,
    t.prototype.reset = function() {
        return this.runners.reset.emit(),
        this
    }
    ,
    t.prototype.clear = function() {
        this.renderTexture.bind(),
        this.renderTexture.clear()
    }
    ,
    t.prototype.destroy = function(e) {
        this.runners.destroy.emit();
        for (var i in this.runners)
            this.runners[i].destroy();
        r.prototype.destroy.call(this, e),
        this.gl = null
    }
    ,
    Object.defineProperty(t.prototype, "extract", {
        get: function() {
            return It("6.0.0", "Renderer#extract has been deprecated, please use Renderer#plugins.extract instead."),
            this.plugins.extract
        },
        enumerable: !1,
        configurable: !0
    }),
    t.registerPlugin = function(e, i) {
        It("6.5.0", "Renderer.registerPlugin() has been deprecated, please use extensions.add() instead."),
        _e.add({
            name: e,
            type: st.RendererPlugin,
            ref: i
        })
    }
    ,
    t.__plugins = {},
    t
}(la);
_e.handleByMap(st.RendererPlugin, pa.__plugins);
var va = function() {
    function r() {
        this.texArray = null,
        this.blend = 0,
        this.type = ae.TRIANGLES,
        this.start = 0,
        this.size = 0,
        this.data = null
    }
    return r
}()
  , _a = function() {
    function r() {
        this.elements = [],
        this.ids = [],
        this.count = 0
    }
    return r.prototype.clear = function() {
        for (var t = 0; t < this.count; t++)
            this.elements[t] = null;
        this.count = 0
    }
    ,
    r
}()
  , ya = function() {
    function r(t) {
        typeof t == "number" ? this.rawBinaryData = new ArrayBuffer(t) : t instanceof Uint8Array ? this.rawBinaryData = t.buffer : this.rawBinaryData = t,
        this.uint32View = new Uint32Array(this.rawBinaryData),
        this.float32View = new Float32Array(this.rawBinaryData)
    }
    return Object.defineProperty(r.prototype, "int8View", {
        get: function() {
            return this._int8View || (this._int8View = new Int8Array(this.rawBinaryData)),
            this._int8View
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r.prototype, "uint8View", {
        get: function() {
            return this._uint8View || (this._uint8View = new Uint8Array(this.rawBinaryData)),
            this._uint8View
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r.prototype, "int16View", {
        get: function() {
            return this._int16View || (this._int16View = new Int16Array(this.rawBinaryData)),
            this._int16View
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r.prototype, "uint16View", {
        get: function() {
            return this._uint16View || (this._uint16View = new Uint16Array(this.rawBinaryData)),
            this._uint16View
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r.prototype, "int32View", {
        get: function() {
            return this._int32View || (this._int32View = new Int32Array(this.rawBinaryData)),
            this._int32View
        },
        enumerable: !1,
        configurable: !0
    }),
    r.prototype.view = function(t) {
        return this[t + "View"]
    }
    ,
    r.prototype.destroy = function() {
        this.rawBinaryData = null,
        this._int8View = null,
        this._uint8View = null,
        this._int16View = null,
        this._uint16View = null,
        this._int32View = null,
        this.uint32View = null,
        this.float32View = null
    }
    ,
    r.sizeOf = function(t) {
        switch (t) {
        case "int8":
        case "uint8":
            return 1;
        case "int16":
        case "uint16":
            return 2;
        case "int32":
        case "uint32":
        case "float32":
            return 4;
        default:
            throw new Error(t + " isn't a valid view type")
        }
    }
    ,
    r
}()
  , ga = function(r) {
    P(t, r);
    function t(e) {
        var i = r.call(this, e) || this;
        return i.shaderGenerator = null,
        i.geometryClass = null,
        i.vertexSize = null,
        i.state = Br.for2d(),
        i.size = E.SPRITE_BATCH_SIZE * 4,
        i._vertexCount = 0,
        i._indexCount = 0,
        i._bufferedElements = [],
        i._bufferedTextures = [],
        i._bufferSize = 0,
        i._shader = null,
        i._packedGeometries = [],
        i._packedGeometryPoolSize = 2,
        i._flushId = 0,
        i._aBuffers = {},
        i._iBuffers = {},
        i.MAX_TEXTURES = 1,
        i.renderer.on("prerender", i.onPrerender, i),
        e.runners.contextChange.add(i),
        i._dcIndex = 0,
        i._aIndex = 0,
        i._iIndex = 0,
        i._attributeBuffer = null,
        i._indexBuffer = null,
        i._tempBoundTextures = [],
        i
    }
    return t.prototype.contextChange = function() {
        var e = this.renderer.gl;
        E.PREFER_ENV === bt.WEBGL_LEGACY ? this.MAX_TEXTURES = 1 : (this.MAX_TEXTURES = Math.min(e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS), E.SPRITE_MAX_TEXTURES),
        this.MAX_TEXTURES = Ro(this.MAX_TEXTURES, e)),
        this._shader = this.shaderGenerator.generateShader(this.MAX_TEXTURES);
        for (var i = 0; i < this._packedGeometryPoolSize; i++)
            this._packedGeometries[i] = new this.geometryClass;
        this.initFlushBuffers()
    }
    ,
    t.prototype.initFlushBuffers = function() {
        for (var e = t._drawCallPool, i = t._textureArrayPool, n = this.size / 4, s = Math.floor(n / this.MAX_TEXTURES) + 1; e.length < n; )
            e.push(new va);
        for (; i.length < s; )
            i.push(new _a);
        for (var o = 0; o < this.MAX_TEXTURES; o++)
            this._tempBoundTextures[o] = null
    }
    ,
    t.prototype.onPrerender = function() {
        this._flushId = 0
    }
    ,
    t.prototype.render = function(e) {
        e._texture.valid && (this._vertexCount + e.vertexData.length / 2 > this.size && this.flush(),
        this._vertexCount += e.vertexData.length / 2,
        this._indexCount += e.indices.length,
        this._bufferedTextures[this._bufferSize] = e._texture.baseTexture,
        this._bufferedElements[this._bufferSize++] = e)
    }
    ,
    t.prototype.buildTexturesAndDrawCalls = function() {
        var e = this
          , i = e._bufferedTextures
          , n = e.MAX_TEXTURES
          , s = t._textureArrayPool
          , o = this.renderer.batch
          , a = this._tempBoundTextures
          , u = this.renderer.textureGC.count
          , h = ++X._globalBatch
          , f = 0
          , l = s[0]
          , c = 0;
        o.copyBoundTextures(a, n);
        for (var d = 0; d < this._bufferSize; ++d) {
            var p = i[d];
            i[d] = null,
            p._batchEnabled !== h && (l.count >= n && (o.boundArray(l, a, h, n),
            this.buildDrawCalls(l, c, d),
            c = d,
            l = s[++f],
            ++h),
            p._batchEnabled = h,
            p.touched = u,
            l.elements[l.count++] = p)
        }
        l.count > 0 && (o.boundArray(l, a, h, n),
        this.buildDrawCalls(l, c, this._bufferSize),
        ++f,
        ++h);
        for (var d = 0; d < a.length; d++)
            a[d] = null;
        X._globalBatch = h
    }
    ,
    t.prototype.buildDrawCalls = function(e, i, n) {
        var s = this
          , o = s._bufferedElements
          , a = s._attributeBuffer
          , u = s._indexBuffer
          , h = s.vertexSize
          , f = t._drawCallPool
          , l = this._dcIndex
          , c = this._aIndex
          , d = this._iIndex
          , p = f[l];
        p.start = this._iIndex,
        p.texArray = e;
        for (var y = i; y < n; ++y) {
            var v = o[y]
              , T = v._texture.baseTexture
              , g = Ms[T.alphaMode ? 1 : 0][v.blendMode];
            o[y] = null,
            i < y && p.blend !== g && (p.size = d - p.start,
            i = y,
            p = f[++l],
            p.texArray = e,
            p.start = d),
            this.packInterleavedGeometry(v, a, u, c, d),
            c += v.vertexData.length / 2 * h,
            d += v.indices.length,
            p.blend = g
        }
        i < n && (p.size = d - p.start,
        ++l),
        this._dcIndex = l,
        this._aIndex = c,
        this._iIndex = d
    }
    ,
    t.prototype.bindAndClearTexArray = function(e) {
        for (var i = this.renderer.texture, n = 0; n < e.count; n++)
            i.bind(e.elements[n], e.ids[n]),
            e.elements[n] = null;
        e.count = 0
    }
    ,
    t.prototype.updateGeometry = function() {
        var e = this
          , i = e._packedGeometries
          , n = e._attributeBuffer
          , s = e._indexBuffer;
        E.CAN_UPLOAD_SAME_BUFFER ? (i[this._flushId]._buffer.update(n.rawBinaryData),
        i[this._flushId]._indexBuffer.update(s),
        this.renderer.geometry.updateBuffers()) : (this._packedGeometryPoolSize <= this._flushId && (this._packedGeometryPoolSize++,
        i[this._flushId] = new this.geometryClass),
        i[this._flushId]._buffer.update(n.rawBinaryData),
        i[this._flushId]._indexBuffer.update(s),
        this.renderer.geometry.bind(i[this._flushId]),
        this.renderer.geometry.updateBuffers(),
        this._flushId++)
    }
    ,
    t.prototype.drawBatches = function() {
        for (var e = this._dcIndex, i = this.renderer, n = i.gl, s = i.state, o = t._drawCallPool, a = null, u = 0; u < e; u++) {
            var h = o[u]
              , f = h.texArray
              , l = h.type
              , c = h.size
              , d = h.start
              , p = h.blend;
            a !== f && (a = f,
            this.bindAndClearTexArray(f)),
            this.state.blendMode = p,
            s.set(this.state),
            n.drawElements(l, c, n.UNSIGNED_SHORT, d * 2)
        }
    }
    ,
    t.prototype.flush = function() {
        this._vertexCount !== 0 && (this._attributeBuffer = this.getAttributeBuffer(this._vertexCount),
        this._indexBuffer = this.getIndexBuffer(this._indexCount),
        this._aIndex = 0,
        this._iIndex = 0,
        this._dcIndex = 0,
        this.buildTexturesAndDrawCalls(),
        this.updateGeometry(),
        this.drawBatches(),
        this._bufferSize = 0,
        this._vertexCount = 0,
        this._indexCount = 0)
    }
    ,
    t.prototype.start = function() {
        this.renderer.state.set(this.state),
        this.renderer.texture.ensureSamplerType(this.MAX_TEXTURES),
        this.renderer.shader.bind(this._shader),
        E.CAN_UPLOAD_SAME_BUFFER && this.renderer.geometry.bind(this._packedGeometries[this._flushId])
    }
    ,
    t.prototype.stop = function() {
        this.flush()
    }
    ,
    t.prototype.destroy = function() {
        for (var e = 0; e < this._packedGeometryPoolSize; e++)
            this._packedGeometries[e] && this._packedGeometries[e].destroy();
        this.renderer.off("prerender", this.onPrerender, this),
        this._aBuffers = null,
        this._iBuffers = null,
        this._packedGeometries = null,
        this._attributeBuffer = null,
        this._indexBuffer = null,
        this._shader && (this._shader.destroy(),
        this._shader = null),
        r.prototype.destroy.call(this)
    }
    ,
    t.prototype.getAttributeBuffer = function(e) {
        var i = De(Math.ceil(e / 8))
          , n = Ii(i)
          , s = i * 8;
        this._aBuffers.length <= n && (this._iBuffers.length = n + 1);
        var o = this._aBuffers[s];
        return o || (this._aBuffers[s] = o = new ya(s * this.vertexSize * 4)),
        o
    }
    ,
    t.prototype.getIndexBuffer = function(e) {
        var i = De(Math.ceil(e / 12))
          , n = Ii(i)
          , s = i * 12;
        this._iBuffers.length <= n && (this._iBuffers.length = n + 1);
        var o = this._iBuffers[n];
        return o || (this._iBuffers[n] = o = new Uint16Array(s)),
        o
    }
    ,
    t.prototype.packInterleavedGeometry = function(e, i, n, s, o) {
        for (var a = i.uint32View, u = i.float32View, h = s / this.vertexSize, f = e.uvs, l = e.indices, c = e.vertexData, d = e._texture.baseTexture._batchLocation, p = Math.min(e.worldAlpha, 1), y = p < 1 && e._texture.baseTexture.alphaMode ? Gs(e._tintRGB, p) : e._tintRGB + (p * 255 << 24), v = 0; v < c.length; v += 2)
            u[s++] = c[v],
            u[s++] = c[v + 1],
            u[s++] = f[v],
            u[s++] = f[v + 1],
            a[s++] = y,
            u[s++] = d;
        for (var v = 0; v < l.length; v++)
            n[o++] = h + l[v]
    }
    ,
    t._drawCallPool = [],
    t._textureArrayPool = [],
    t
}(un)
  , ma = function() {
    function r(t, e) {
        if (this.vertexSrc = t,
        this.fragTemplate = e,
        this.programCache = {},
        this.defaultGroupCache = {},
        e.indexOf("%count%") < 0)
            throw new Error('Fragment template must contain "%count%".');
        if (e.indexOf("%forloop%") < 0)
            throw new Error('Fragment template must contain "%forloop%".')
    }
    return r.prototype.generateShader = function(t) {
        if (!this.programCache[t]) {
            for (var e = new Int32Array(t), i = 0; i < t; i++)
                e[i] = i;
            this.defaultGroupCache[t] = $t.from({
                uSamplers: e
            }, !0);
            var n = this.fragTemplate;
            n = n.replace(/%count%/gi, "" + t),
            n = n.replace(/%forloop%/gi, this.generateSampleSrc(t)),
            this.programCache[t] = new Gr(this.vertexSrc,n)
        }
        var s = {
            tint: new Float32Array([1, 1, 1, 1]),
            translationMatrix: new tt,
            default: this.defaultGroupCache[t]
        };
        return new dn(this.programCache[t],s)
    }
    ,
    r.prototype.generateSampleSrc = function(t) {
        var e = "";
        e += `
`,
        e += `
`;
        for (var i = 0; i < t; i++)
            i > 0 && (e += `
else `),
            i < t - 1 && (e += "if(vTextureId < " + i + ".5)"),
            e += `
{`,
            e += `
	color = texture2D(uSamplers[` + i + "], vTextureCoord);",
            e += `
}`;
        return e += `
`,
        e += `
`,
        e
    }
    ,
    r
}()
  , ba = function(r) {
    P(t, r);
    function t(e) {
        e === void 0 && (e = !1);
        var i = r.call(this) || this;
        return i._buffer = new K(null,e,!1),
        i._indexBuffer = new K(null,e,!0),
        i.addAttribute("aVertexPosition", i._buffer, 2, !1, N.FLOAT).addAttribute("aTextureCoord", i._buffer, 2, !1, N.FLOAT).addAttribute("aColor", i._buffer, 4, !0, N.UNSIGNED_BYTE).addAttribute("aTextureId", i._buffer, 1, !0, N.FLOAT).addIndex(i._indexBuffer),
        i
    }
    return t
}(Mr)
  , Di = `precision highp float;
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec4 aColor;
attribute float aTextureId;

uniform mat3 projectionMatrix;
uniform mat3 translationMatrix;
uniform vec4 tint;

varying vec2 vTextureCoord;
varying vec4 vColor;
varying float vTextureId;

void main(void){
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = aTextureCoord;
    vTextureId = aTextureId;
    vColor = aColor * tint;
}
`
  , Hi = `varying vec2 vTextureCoord;
varying vec4 vColor;
varying float vTextureId;
uniform sampler2D uSamplers[%count%];

void main(void){
    vec4 color;
    %forloop%
    gl_FragColor = color * vColor;
}
`
  , xa = function() {
    function r() {}
    return r.create = function(t) {
        var e = Object.assign({
            vertex: Di,
            fragment: Hi,
            geometryClass: ba,
            vertexSize: 6
        }, t)
          , i = e.vertex
          , n = e.fragment
          , s = e.vertexSize
          , o = e.geometryClass;
        return function(a) {
            P(u, a);
            function u(h) {
                var f = a.call(this, h) || this;
                return f.shaderGenerator = new ma(i,n),
                f.geometryClass = o,
                f.vertexSize = s,
                f
            }
            return u
        }(ga)
    }
    ,
    Object.defineProperty(r, "defaultVertexSrc", {
        get: function() {
            return Di
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r, "defaultFragmentTemplate", {
        get: function() {
            return Hi
        },
        enumerable: !1,
        configurable: !0
    }),
    r
}()
  , Ea = xa.create();
Object.assign(Ea, {
    extension: {
        name: "batch",
        type: st.RendererPlugin
    }
});
/*!
 * @pixi/loaders - v6.5.2
 * Compiled Wed, 24 Aug 2022 13:51:19 UTC
 *
 * @pixi/loaders is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var Le = function() {
    function r(t, e, i) {
        e === void 0 && (e = !1),
        this._fn = t,
        this._once = e,
        this._thisArg = i,
        this._next = this._prev = this._owner = null
    }
    return r.prototype.detach = function() {
        return this._owner === null ? !1 : (this._owner.detach(this),
        !0)
    }
    ,
    r
}();
function Xi(r, t) {
    return r._head ? (r._tail._next = t,
    t._prev = r._tail,
    r._tail = t) : (r._head = t,
    r._tail = t),
    t._owner = r,
    t
}
var gt = function() {
    function r() {
        this._head = this._tail = void 0
    }
    return r.prototype.handlers = function(t) {
        t === void 0 && (t = !1);
        var e = this._head;
        if (t)
            return !!e;
        for (var i = []; e; )
            i.push(e),
            e = e._next;
        return i
    }
    ,
    r.prototype.has = function(t) {
        if (!(t instanceof Le))
            throw new Error("MiniSignal#has(): First arg must be a SignalBinding object.");
        return t._owner === this
    }
    ,
    r.prototype.dispatch = function() {
        for (var t = arguments, e = [], i = 0; i < arguments.length; i++)
            e[i] = t[i];
        var n = this._head;
        if (!n)
            return !1;
        for (; n; )
            n._once && this.detach(n),
            n._fn.apply(n._thisArg, e),
            n = n._next;
        return !0
    }
    ,
    r.prototype.add = function(t, e) {
        if (e === void 0 && (e = null),
        typeof t != "function")
            throw new Error("MiniSignal#add(): First arg must be a Function.");
        return Xi(this, new Le(t,!1,e))
    }
    ,
    r.prototype.once = function(t, e) {
        if (e === void 0 && (e = null),
        typeof t != "function")
            throw new Error("MiniSignal#once(): First arg must be a Function.");
        return Xi(this, new Le(t,!0,e))
    }
    ,
    r.prototype.detach = function(t) {
        if (!(t instanceof Le))
            throw new Error("MiniSignal#detach(): First arg must be a SignalBinding object.");
        return t._owner !== this ? this : (t._prev && (t._prev._next = t._next),
        t._next && (t._next._prev = t._prev),
        t === this._head ? (this._head = t._next,
        t._next === null && (this._tail = null)) : t === this._tail && (this._tail = t._prev,
        this._tail._next = null),
        t._owner = null,
        this)
    }
    ,
    r.prototype.detachAll = function() {
        var t = this._head;
        if (!t)
            return this;
        for (this._head = this._tail = null; t; )
            t._owner = null,
            t = t._next;
        return this
    }
    ,
    r
}();
function _n(r, t) {
    t = t || {};
    for (var e = {
        key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
        q: {
            name: "queryKey",
            parser: /(?:^|&)([^&=]*)=?([^&]*)/g
        },
        parser: {
            strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
        }
    }, i = e.parser[t.strictMode ? "strict" : "loose"].exec(r), n = {}, s = 14; s--; )
        n[e.key[s]] = i[s] || "";
    return n[e.q.name] = {},
    n[e.key[12]].replace(e.q.parser, function(o, a, u) {
        a && (n[e.q.name][a] = u)
    }),
    n
}
var ar, Me = null, Ta = 0, Vi = 200, Ia = 204, wa = 1223, Ra = 2;
function ji() {}
function zi(r, t, e) {
    t && t.indexOf(".") === 0 && (t = t.substring(1)),
    t && (r[t] = e)
}
function ur(r) {
    return r.toString().replace("object ", "")
}
var V = function() {
    function r(t, e, i) {
        if (this._dequeue = ji,
        this._onLoadBinding = null,
        this._elementTimer = 0,
        this._boundComplete = null,
        this._boundOnError = null,
        this._boundOnProgress = null,
        this._boundOnTimeout = null,
        this._boundXhrOnError = null,
        this._boundXhrOnTimeout = null,
        this._boundXhrOnAbort = null,
        this._boundXhrOnLoad = null,
        typeof t != "string" || typeof e != "string")
            throw new Error("Both name and url are required for constructing a resource.");
        i = i || {},
        this._flags = 0,
        this._setFlag(r.STATUS_FLAGS.DATA_URL, e.indexOf("data:") === 0),
        this.name = t,
        this.url = e,
        this.extension = this._getExtension(),
        this.data = null,
        this.crossOrigin = i.crossOrigin === !0 ? "anonymous" : i.crossOrigin,
        this.timeout = i.timeout || 0,
        this.loadType = i.loadType || this._determineLoadType(),
        this.xhrType = i.xhrType,
        this.metadata = i.metadata || {},
        this.error = null,
        this.xhr = null,
        this.children = [],
        this.type = r.TYPE.UNKNOWN,
        this.progressChunk = 0,
        this._dequeue = ji,
        this._onLoadBinding = null,
        this._elementTimer = 0,
        this._boundComplete = this.complete.bind(this),
        this._boundOnError = this._onError.bind(this),
        this._boundOnProgress = this._onProgress.bind(this),
        this._boundOnTimeout = this._onTimeout.bind(this),
        this._boundXhrOnError = this._xhrOnError.bind(this),
        this._boundXhrOnTimeout = this._xhrOnTimeout.bind(this),
        this._boundXhrOnAbort = this._xhrOnAbort.bind(this),
        this._boundXhrOnLoad = this._xhrOnLoad.bind(this),
        this.onStart = new gt,
        this.onProgress = new gt,
        this.onComplete = new gt,
        this.onAfterMiddleware = new gt
    }
    return r.setExtensionLoadType = function(t, e) {
        zi(r._loadTypeMap, t, e)
    }
    ,
    r.setExtensionXhrType = function(t, e) {
        zi(r._xhrTypeMap, t, e)
    }
    ,
    Object.defineProperty(r.prototype, "isDataUrl", {
        get: function() {
            return this._hasFlag(r.STATUS_FLAGS.DATA_URL)
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r.prototype, "isComplete", {
        get: function() {
            return this._hasFlag(r.STATUS_FLAGS.COMPLETE)
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r.prototype, "isLoading", {
        get: function() {
            return this._hasFlag(r.STATUS_FLAGS.LOADING)
        },
        enumerable: !1,
        configurable: !0
    }),
    r.prototype.complete = function() {
        this._clearEvents(),
        this._finish()
    }
    ,
    r.prototype.abort = function(t) {
        if (!this.error) {
            if (this.error = new Error(t),
            this._clearEvents(),
            this.xhr)
                this.xhr.abort();
            else if (this.xdr)
                this.xdr.abort();
            else if (this.data)
                if (this.data.src)
                    this.data.src = r.EMPTY_GIF;
                else
                    for (; this.data.firstChild; )
                        this.data.removeChild(this.data.firstChild);
            this._finish()
        }
    }
    ,
    r.prototype.load = function(t) {
        var e = this;
        if (!this.isLoading) {
            if (this.isComplete) {
                t && setTimeout(function() {
                    return t(e)
                }, 1);
                return
            } else
                t && this.onComplete.once(t);
            switch (this._setFlag(r.STATUS_FLAGS.LOADING, !0),
            this.onStart.dispatch(this),
            (this.crossOrigin === !1 || typeof this.crossOrigin != "string") && (this.crossOrigin = this._determineCrossOrigin(this.url)),
            this.loadType) {
            case r.LOAD_TYPE.IMAGE:
                this.type = r.TYPE.IMAGE,
                this._loadElement("image");
                break;
            case r.LOAD_TYPE.AUDIO:
                this.type = r.TYPE.AUDIO,
                this._loadSourceElement("audio");
                break;
            case r.LOAD_TYPE.VIDEO:
                this.type = r.TYPE.VIDEO,
                this._loadSourceElement("video");
                break;
            case r.LOAD_TYPE.XHR:
            default:
                typeof ar > "u" && (ar = !!(globalThis.XDomainRequest && !("withCredentials"in new XMLHttpRequest))),
                ar && this.crossOrigin ? this._loadXdr() : this._loadXhr();
                break
            }
        }
    }
    ,
    r.prototype._hasFlag = function(t) {
        return (this._flags & t) !== 0
    }
    ,
    r.prototype._setFlag = function(t, e) {
        this._flags = e ? this._flags | t : this._flags & ~t
    }
    ,
    r.prototype._clearEvents = function() {
        clearTimeout(this._elementTimer),
        this.data && this.data.removeEventListener && (this.data.removeEventListener("error", this._boundOnError, !1),
        this.data.removeEventListener("load", this._boundComplete, !1),
        this.data.removeEventListener("progress", this._boundOnProgress, !1),
        this.data.removeEventListener("canplaythrough", this._boundComplete, !1)),
        this.xhr && (this.xhr.removeEventListener ? (this.xhr.removeEventListener("error", this._boundXhrOnError, !1),
        this.xhr.removeEventListener("timeout", this._boundXhrOnTimeout, !1),
        this.xhr.removeEventListener("abort", this._boundXhrOnAbort, !1),
        this.xhr.removeEventListener("progress", this._boundOnProgress, !1),
        this.xhr.removeEventListener("load", this._boundXhrOnLoad, !1)) : (this.xhr.onerror = null,
        this.xhr.ontimeout = null,
        this.xhr.onprogress = null,
        this.xhr.onload = null))
    }
    ,
    r.prototype._finish = function() {
        if (this.isComplete)
            throw new Error("Complete called again for an already completed resource.");
        this._setFlag(r.STATUS_FLAGS.COMPLETE, !0),
        this._setFlag(r.STATUS_FLAGS.LOADING, !1),
        this.onComplete.dispatch(this)
    }
    ,
    r.prototype._loadElement = function(t) {
        this.metadata.loadElement ? this.data = this.metadata.loadElement : t === "image" && typeof globalThis.Image < "u" ? this.data = new Image : this.data = document.createElement(t),
        this.crossOrigin && (this.data.crossOrigin = this.crossOrigin),
        this.metadata.skipSource || (this.data.src = this.url),
        this.data.addEventListener("error", this._boundOnError, !1),
        this.data.addEventListener("load", this._boundComplete, !1),
        this.data.addEventListener("progress", this._boundOnProgress, !1),
        this.timeout && (this._elementTimer = setTimeout(this._boundOnTimeout, this.timeout))
    }
    ,
    r.prototype._loadSourceElement = function(t) {
        if (this.metadata.loadElement ? this.data = this.metadata.loadElement : t === "audio" && typeof globalThis.Audio < "u" ? this.data = new Audio : this.data = document.createElement(t),
        this.data === null) {
            this.abort("Unsupported element: " + t);
            return
        }
        if (this.crossOrigin && (this.data.crossOrigin = this.crossOrigin),
        !this.metadata.skipSource)
            if (navigator.isCocoonJS)
                this.data.src = Array.isArray(this.url) ? this.url[0] : this.url;
            else if (Array.isArray(this.url))
                for (var e = this.metadata.mimeType, i = 0; i < this.url.length; ++i)
                    this.data.appendChild(this._createSource(t, this.url[i], Array.isArray(e) ? e[i] : e));
            else {
                var e = this.metadata.mimeType;
                this.data.appendChild(this._createSource(t, this.url, Array.isArray(e) ? e[0] : e))
            }
        this.data.addEventListener("error", this._boundOnError, !1),
        this.data.addEventListener("load", this._boundComplete, !1),
        this.data.addEventListener("progress", this._boundOnProgress, !1),
        this.data.addEventListener("canplaythrough", this._boundComplete, !1),
        this.data.load(),
        this.timeout && (this._elementTimer = setTimeout(this._boundOnTimeout, this.timeout))
    }
    ,
    r.prototype._loadXhr = function() {
        typeof this.xhrType != "string" && (this.xhrType = this._determineXhrType());
        var t = this.xhr = new XMLHttpRequest;
        this.crossOrigin === "use-credentials" && (t.withCredentials = !0),
        t.open("GET", this.url, !0),
        t.timeout = this.timeout,
        this.xhrType === r.XHR_RESPONSE_TYPE.JSON || this.xhrType === r.XHR_RESPONSE_TYPE.DOCUMENT ? t.responseType = r.XHR_RESPONSE_TYPE.TEXT : t.responseType = this.xhrType,
        t.addEventListener("error", this._boundXhrOnError, !1),
        t.addEventListener("timeout", this._boundXhrOnTimeout, !1),
        t.addEventListener("abort", this._boundXhrOnAbort, !1),
        t.addEventListener("progress", this._boundOnProgress, !1),
        t.addEventListener("load", this._boundXhrOnLoad, !1),
        t.send()
    }
    ,
    r.prototype._loadXdr = function() {
        typeof this.xhrType != "string" && (this.xhrType = this._determineXhrType());
        var t = this.xhr = new globalThis.XDomainRequest;
        t.timeout = this.timeout || 5e3,
        t.onerror = this._boundXhrOnError,
        t.ontimeout = this._boundXhrOnTimeout,
        t.onprogress = this._boundOnProgress,
        t.onload = this._boundXhrOnLoad,
        t.open("GET", this.url, !0),
        setTimeout(function() {
            return t.send()
        }, 1)
    }
    ,
    r.prototype._createSource = function(t, e, i) {
        i || (i = t + "/" + this._getExtension(e));
        var n = document.createElement("source");
        return n.src = e,
        n.type = i,
        n
    }
    ,
    r.prototype._onError = function(t) {
        this.abort("Failed to load element using: " + t.target.nodeName)
    }
    ,
    r.prototype._onProgress = function(t) {
        t && t.lengthComputable && this.onProgress.dispatch(this, t.loaded / t.total)
    }
    ,
    r.prototype._onTimeout = function() {
        this.abort("Load timed out.")
    }
    ,
    r.prototype._xhrOnError = function() {
        var t = this.xhr;
        this.abort(ur(t) + " Request failed. Status: " + t.status + ', text: "' + t.statusText + '"')
    }
    ,
    r.prototype._xhrOnTimeout = function() {
        var t = this.xhr;
        this.abort(ur(t) + " Request timed out.")
    }
    ,
    r.prototype._xhrOnAbort = function() {
        var t = this.xhr;
        this.abort(ur(t) + " Request was aborted by the user.")
    }
    ,
    r.prototype._xhrOnLoad = function() {
        var t = this.xhr
          , e = ""
          , i = typeof t.status > "u" ? Vi : t.status;
        (t.responseType === "" || t.responseType === "text" || typeof t.responseType > "u") && (e = t.responseText),
        i === Ta && (e.length > 0 || t.responseType === r.XHR_RESPONSE_TYPE.BUFFER) ? i = Vi : i === wa && (i = Ia);
        var n = i / 100 | 0;
        if (n === Ra)
            if (this.xhrType === r.XHR_RESPONSE_TYPE.TEXT)
                this.data = e,
                this.type = r.TYPE.TEXT;
            else if (this.xhrType === r.XHR_RESPONSE_TYPE.JSON)
                try {
                    this.data = JSON.parse(e),
                    this.type = r.TYPE.JSON
                } catch (a) {
                    this.abort("Error trying to parse loaded json: " + a);
                    return
                }
            else if (this.xhrType === r.XHR_RESPONSE_TYPE.DOCUMENT)
                try {
                    if (globalThis.DOMParser) {
                        var s = new DOMParser;
                        this.data = s.parseFromString(e, "text/xml")
                    } else {
                        var o = document.createElement("div");
                        o.innerHTML = e,
                        this.data = o
                    }
                    this.type = r.TYPE.XML
                } catch (a) {
                    this.abort("Error trying to parse loaded xml: " + a);
                    return
                }
            else
                this.data = t.response || e;
        else {
            this.abort("[" + t.status + "] " + t.statusText + ": " + t.responseURL);
            return
        }
        this.complete()
    }
    ,
    r.prototype._determineCrossOrigin = function(t, e) {
        if (t.indexOf("data:") === 0)
            return "";
        if (globalThis.origin !== globalThis.location.origin)
            return "anonymous";
        e = e || globalThis.location,
        Me || (Me = document.createElement("a")),
        Me.href = t;
        var i = _n(Me.href, {
            strictMode: !0
        })
          , n = !i.port && e.port === "" || i.port === e.port
          , s = i.protocol ? i.protocol + ":" : "";
        return i.host !== e.hostname || !n || s !== e.protocol ? "anonymous" : ""
    }
    ,
    r.prototype._determineXhrType = function() {
        return r._xhrTypeMap[this.extension] || r.XHR_RESPONSE_TYPE.TEXT
    }
    ,
    r.prototype._determineLoadType = function() {
        return r._loadTypeMap[this.extension] || r.LOAD_TYPE.XHR
    }
    ,
    r.prototype._getExtension = function(t) {
        t === void 0 && (t = this.url);
        var e = "";
        if (this.isDataUrl) {
            var i = t.indexOf("/");
            e = t.substring(i + 1, t.indexOf(";", i))
        } else {
            var n = t.indexOf("?")
              , s = t.indexOf("#")
              , o = Math.min(n > -1 ? n : t.length, s > -1 ? s : t.length);
            t = t.substring(0, o),
            e = t.substring(t.lastIndexOf(".") + 1)
        }
        return e.toLowerCase()
    }
    ,
    r.prototype._getMimeFromXhrType = function(t) {
        switch (t) {
        case r.XHR_RESPONSE_TYPE.BUFFER:
            return "application/octet-binary";
        case r.XHR_RESPONSE_TYPE.BLOB:
            return "application/blob";
        case r.XHR_RESPONSE_TYPE.DOCUMENT:
            return "application/xml";
        case r.XHR_RESPONSE_TYPE.JSON:
            return "application/json";
        case r.XHR_RESPONSE_TYPE.DEFAULT:
        case r.XHR_RESPONSE_TYPE.TEXT:
        default:
            return "text/plain"
        }
    }
    ,
    r
}();
(function(r) {
    (function(t) {
        t[t.NONE = 0] = "NONE",
        t[t.DATA_URL = 1] = "DATA_URL",
        t[t.COMPLETE = 2] = "COMPLETE",
        t[t.LOADING = 4] = "LOADING"
    }
    )(r.STATUS_FLAGS || (r.STATUS_FLAGS = {})),
    function(t) {
        t[t.UNKNOWN = 0] = "UNKNOWN",
        t[t.JSON = 1] = "JSON",
        t[t.XML = 2] = "XML",
        t[t.IMAGE = 3] = "IMAGE",
        t[t.AUDIO = 4] = "AUDIO",
        t[t.VIDEO = 5] = "VIDEO",
        t[t.TEXT = 6] = "TEXT"
    }(r.TYPE || (r.TYPE = {})),
    function(t) {
        t[t.XHR = 1] = "XHR",
        t[t.IMAGE = 2] = "IMAGE",
        t[t.AUDIO = 3] = "AUDIO",
        t[t.VIDEO = 4] = "VIDEO"
    }(r.LOAD_TYPE || (r.LOAD_TYPE = {})),
    function(t) {
        t.DEFAULT = "text",
        t.BUFFER = "arraybuffer",
        t.BLOB = "blob",
        t.DOCUMENT = "document",
        t.JSON = "json",
        t.TEXT = "text"
    }(r.XHR_RESPONSE_TYPE || (r.XHR_RESPONSE_TYPE = {})),
    r._loadTypeMap = {
        gif: r.LOAD_TYPE.IMAGE,
        png: r.LOAD_TYPE.IMAGE,
        bmp: r.LOAD_TYPE.IMAGE,
        jpg: r.LOAD_TYPE.IMAGE,
        jpeg: r.LOAD_TYPE.IMAGE,
        tif: r.LOAD_TYPE.IMAGE,
        tiff: r.LOAD_TYPE.IMAGE,
        webp: r.LOAD_TYPE.IMAGE,
        tga: r.LOAD_TYPE.IMAGE,
        svg: r.LOAD_TYPE.IMAGE,
        "svg+xml": r.LOAD_TYPE.IMAGE,
        mp3: r.LOAD_TYPE.AUDIO,
        ogg: r.LOAD_TYPE.AUDIO,
        wav: r.LOAD_TYPE.AUDIO,
        mp4: r.LOAD_TYPE.VIDEO,
        webm: r.LOAD_TYPE.VIDEO
    },
    r._xhrTypeMap = {
        xhtml: r.XHR_RESPONSE_TYPE.DOCUMENT,
        html: r.XHR_RESPONSE_TYPE.DOCUMENT,
        htm: r.XHR_RESPONSE_TYPE.DOCUMENT,
        xml: r.XHR_RESPONSE_TYPE.DOCUMENT,
        tmx: r.XHR_RESPONSE_TYPE.DOCUMENT,
        svg: r.XHR_RESPONSE_TYPE.DOCUMENT,
        tsx: r.XHR_RESPONSE_TYPE.DOCUMENT,
        gif: r.XHR_RESPONSE_TYPE.BLOB,
        png: r.XHR_RESPONSE_TYPE.BLOB,
        bmp: r.XHR_RESPONSE_TYPE.BLOB,
        jpg: r.XHR_RESPONSE_TYPE.BLOB,
        jpeg: r.XHR_RESPONSE_TYPE.BLOB,
        tif: r.XHR_RESPONSE_TYPE.BLOB,
        tiff: r.XHR_RESPONSE_TYPE.BLOB,
        webp: r.XHR_RESPONSE_TYPE.BLOB,
        tga: r.XHR_RESPONSE_TYPE.BLOB,
        json: r.XHR_RESPONSE_TYPE.JSON,
        text: r.XHR_RESPONSE_TYPE.TEXT,
        txt: r.XHR_RESPONSE_TYPE.TEXT,
        ttf: r.XHR_RESPONSE_TYPE.BUFFER,
        otf: r.XHR_RESPONSE_TYPE.BUFFER
    },
    r.EMPTY_GIF = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
}
)(V || (V = {}));
function Ft() {}
function Aa(r) {
    return function() {
        for (var e = arguments, i = [], n = 0; n < arguments.length; n++)
            i[n] = e[n];
        if (r === null)
            throw new Error("Callback was already called.");
        var s = r;
        r = null,
        s.apply(this, i)
    }
}
var Na = function() {
    function r(t, e) {
        this.data = t,
        this.callback = e
    }
    return r
}()
  , hr = function() {
    function r(t, e) {
        var i = this;
        if (e === void 0 && (e = 1),
        this.workers = 0,
        this.saturated = Ft,
        this.unsaturated = Ft,
        this.empty = Ft,
        this.drain = Ft,
        this.error = Ft,
        this.started = !1,
        this.paused = !1,
        this._tasks = [],
        this._insert = function(n, s, o) {
            if (o && typeof o != "function")
                throw new Error("task callback must be a function");
            if (i.started = !0,
            n == null && i.idle()) {
                setTimeout(function() {
                    return i.drain()
                }, 1);
                return
            }
            var a = new Na(n,typeof o == "function" ? o : Ft);
            s ? i._tasks.unshift(a) : i._tasks.push(a),
            setTimeout(i.process, 1)
        }
        ,
        this.process = function() {
            for (; !i.paused && i.workers < i.concurrency && i._tasks.length; ) {
                var n = i._tasks.shift();
                i._tasks.length === 0 && i.empty(),
                i.workers += 1,
                i.workers === i.concurrency && i.saturated(),
                i._worker(n.data, Aa(i._next(n)))
            }
        }
        ,
        this._worker = t,
        e === 0)
            throw new Error("Concurrency must not be zero");
        this.concurrency = e,
        this.buffer = e / 4
    }
    return r.prototype._next = function(t) {
        var e = this;
        return function() {
            for (var i = arguments, n = [], s = 0; s < arguments.length; s++)
                n[s] = i[s];
            e.workers -= 1,
            t.callback.apply(t, n),
            n[0] != null && e.error(n[0], t.data),
            e.workers <= e.concurrency - e.buffer && e.unsaturated(),
            e.idle() && e.drain(),
            e.process()
        }
    }
    ,
    r.prototype.push = function(t, e) {
        this._insert(t, !1, e)
    }
    ,
    r.prototype.kill = function() {
        this.workers = 0,
        this.drain = Ft,
        this.started = !1,
        this._tasks = []
    }
    ,
    r.prototype.unshift = function(t, e) {
        this._insert(t, !0, e)
    }
    ,
    r.prototype.length = function() {
        return this._tasks.length
    }
    ,
    r.prototype.running = function() {
        return this.workers
    }
    ,
    r.prototype.idle = function() {
        return this._tasks.length + this.workers === 0
    }
    ,
    r.prototype.pause = function() {
        this.paused !== !0 && (this.paused = !0)
    }
    ,
    r.prototype.resume = function() {
        if (this.paused !== !1) {
            this.paused = !1;
            for (var t = 1; t <= this.concurrency; t++)
                this.process()
        }
    }
    ,
    r.eachSeries = function(t, e, i, n) {
        var s = 0
          , o = t.length;
        function a(u) {
            if (u || s === o) {
                i && i(u);
                return
            }
            n ? setTimeout(function() {
                e(t[s++], a)
            }, 1) : e(t[s++], a)
        }
        a()
    }
    ,
    r.queue = function(t, e) {
        return new r(t,e)
    }
    ,
    r
}()
  , fr = 100
  , Oa = /(#[\w-]+)?$/
  , ve = function() {
    function r(t, e) {
        var i = this;
        t === void 0 && (t = ""),
        e === void 0 && (e = 10),
        this.progress = 0,
        this.loading = !1,
        this.defaultQueryString = "",
        this._beforeMiddleware = [],
        this._afterMiddleware = [],
        this._resourcesParsing = [],
        this._boundLoadResource = function(u, h) {
            return i._loadResource(u, h)
        }
        ,
        this.resources = {},
        this.baseUrl = t,
        this._beforeMiddleware = [],
        this._afterMiddleware = [],
        this._resourcesParsing = [],
        this._boundLoadResource = function(u, h) {
            return i._loadResource(u, h)
        }
        ,
        this._queue = hr.queue(this._boundLoadResource, e),
        this._queue.pause(),
        this.resources = {},
        this.onProgress = new gt,
        this.onError = new gt,
        this.onLoad = new gt,
        this.onStart = new gt,
        this.onComplete = new gt;
        for (var n = 0; n < r._plugins.length; ++n) {
            var s = r._plugins[n]
              , o = s.pre
              , a = s.use;
            o && this.pre(o),
            a && this.use(a)
        }
        this._protected = !1
    }
    return r.prototype._add = function(t, e, i, n) {
        if (this.loading && (!i || !i.parentResource))
            throw new Error("Cannot add resources while the loader is running.");
        if (this.resources[t])
            throw new Error('Resource named "' + t + '" already exists.');
        if (e = this._prepareUrl(e),
        this.resources[t] = new V(t,e,i),
        typeof n == "function" && this.resources[t].onAfterMiddleware.once(n),
        this.loading) {
            for (var s = i.parentResource, o = [], a = 0; a < s.children.length; ++a)
                s.children[a].isComplete || o.push(s.children[a]);
            var u = s.progressChunk * (o.length + 1)
              , h = u / (o.length + 2);
            s.children.push(this.resources[t]),
            s.progressChunk = h;
            for (var a = 0; a < o.length; ++a)
                o[a].progressChunk = h;
            this.resources[t].progressChunk = h
        }
        return this._queue.push(this.resources[t]),
        this
    }
    ,
    r.prototype.pre = function(t) {
        return this._beforeMiddleware.push(t),
        this
    }
    ,
    r.prototype.use = function(t) {
        return this._afterMiddleware.push(t),
        this
    }
    ,
    r.prototype.reset = function() {
        this.progress = 0,
        this.loading = !1,
        this._queue.kill(),
        this._queue.pause();
        for (var t in this.resources) {
            var e = this.resources[t];
            e._onLoadBinding && e._onLoadBinding.detach(),
            e.isLoading && e.abort("loader reset")
        }
        return this.resources = {},
        this
    }
    ,
    r.prototype.load = function(t) {
        if (It("6.5.0", "@pixi/loaders is being replaced with @pixi/assets in the next major release."),
        typeof t == "function" && this.onComplete.once(t),
        this.loading)
            return this;
        if (this._queue.idle())
            this._onStart(),
            this._onComplete();
        else {
            for (var e = this._queue._tasks.length, i = fr / e, n = 0; n < this._queue._tasks.length; ++n)
                this._queue._tasks[n].data.progressChunk = i;
            this._onStart(),
            this._queue.resume()
        }
        return this
    }
    ,
    Object.defineProperty(r.prototype, "concurrency", {
        get: function() {
            return this._queue.concurrency
        },
        set: function(t) {
            this._queue.concurrency = t
        },
        enumerable: !1,
        configurable: !0
    }),
    r.prototype._prepareUrl = function(t) {
        var e = _n(t, {
            strictMode: !0
        }), i;
        if (e.protocol || !e.path || t.indexOf("//") === 0 ? i = t : this.baseUrl.length && this.baseUrl.lastIndexOf("/") !== this.baseUrl.length - 1 && t.charAt(0) !== "/" ? i = this.baseUrl + "/" + t : i = this.baseUrl + t,
        this.defaultQueryString) {
            var n = Oa.exec(i)[0];
            i = i.slice(0, i.length - n.length),
            i.indexOf("?") !== -1 ? i += "&" + this.defaultQueryString : i += "?" + this.defaultQueryString,
            i += n
        }
        return i
    }
    ,
    r.prototype._loadResource = function(t, e) {
        var i = this;
        t._dequeue = e,
        hr.eachSeries(this._beforeMiddleware, function(n, s) {
            n.call(i, t, function() {
                s(t.isComplete ? {} : null)
            })
        }, function() {
            t.isComplete ? i._onLoad(t) : (t._onLoadBinding = t.onComplete.once(i._onLoad, i),
            t.load())
        }, !0)
    }
    ,
    r.prototype._onStart = function() {
        this.progress = 0,
        this.loading = !0,
        this.onStart.dispatch(this)
    }
    ,
    r.prototype._onComplete = function() {
        this.progress = fr,
        this.loading = !1,
        this.onComplete.dispatch(this, this.resources)
    }
    ,
    r.prototype._onLoad = function(t) {
        var e = this;
        t._onLoadBinding = null,
        this._resourcesParsing.push(t),
        t._dequeue(),
        hr.eachSeries(this._afterMiddleware, function(i, n) {
            i.call(e, t, n)
        }, function() {
            t.onAfterMiddleware.dispatch(t),
            e.progress = Math.min(fr, e.progress + t.progressChunk),
            e.onProgress.dispatch(e, t),
            t.error ? e.onError.dispatch(t.error, e, t) : e.onLoad.dispatch(e, t),
            e._resourcesParsing.splice(e._resourcesParsing.indexOf(t), 1),
            e._queue.idle() && e._resourcesParsing.length === 0 && e._onComplete()
        }, !0)
    }
    ,
    r.prototype.destroy = function() {
        this._protected || this.reset()
    }
    ,
    Object.defineProperty(r, "shared", {
        get: function() {
            var t = r._shared;
            return t || (t = new r,
            t._protected = !0,
            r._shared = t),
            t
        },
        enumerable: !1,
        configurable: !0
    }),
    r.registerPlugin = function(t) {
        return It("6.5.0", "Loader.registerPlugin() is deprecated, use extensions.add() instead."),
        _e.add({
            type: st.Loader,
            ref: t
        }),
        r
    }
    ,
    r._plugins = [],
    r
}();
_e.handleByList(st.Loader, ve._plugins);
ve.prototype.add = function(t, e, i, n) {
    if (Array.isArray(t)) {
        for (var s = 0; s < t.length; ++s)
            this.add(t[s]);
        return this
    }
    if (typeof t == "object" && (i = t,
    n = e || i.callback || i.onComplete,
    e = i.url,
    t = i.name || i.key || i.url),
    typeof e != "string" && (n = i,
    i = e,
    e = t),
    typeof e != "string")
        throw new Error("No url passed to add resource to loader.");
    return typeof i == "function" && (n = i,
    i = null),
    this._add(t, e, i, n)
}
;
(function() {
    function r() {}
    return r.init = function(t) {
        t = Object.assign({
            sharedLoader: !1
        }, t),
        this.loader = t.sharedLoader ? ve.shared : new ve
    }
    ,
    r.destroy = function() {
        this.loader && (this.loader.destroy(),
        this.loader = null)
    }
    ,
    r.extension = st.Application,
    r
}
)();
var Ca = function() {
    function r() {}
    return r.add = function() {
        V.setExtensionLoadType("svg", V.LOAD_TYPE.XHR),
        V.setExtensionXhrType("svg", V.XHR_RESPONSE_TYPE.TEXT)
    }
    ,
    r.use = function(t, e) {
        if (t.data && (t.type === V.TYPE.IMAGE || t.extension === "svg")) {
            var i = t.data
              , n = t.url
              , s = t.name
              , o = t.metadata;
            an.fromLoader(i, n, s, o).then(function(a) {
                t.texture = a,
                e()
            }).catch(e)
        } else
            e()
    }
    ,
    r.extension = st.Loader,
    r
}()
  , Pa = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function Sa(r) {
    for (var t = "", e = 0; e < r.length; ) {
        for (var i = [0, 0, 0], n = [0, 0, 0, 0], s = 0; s < i.length; ++s)
            e < r.length ? i[s] = r.charCodeAt(e++) & 255 : i[s] = 0;
        n[0] = i[0] >> 2,
        n[1] = (i[0] & 3) << 4 | i[1] >> 4,
        n[2] = (i[1] & 15) << 2 | i[2] >> 6,
        n[3] = i[2] & 63;
        var o = e - (r.length - 1);
        switch (o) {
        case 2:
            n[3] = 64,
            n[2] = 64;
            break;
        case 1:
            n[3] = 64;
            break
        }
        for (var s = 0; s < n.length; ++s)
            t += Pa.charAt(n[s])
    }
    return t
}
function Fa(r, t) {
    if (!r.data) {
        t();
        return
    }
    if (r.xhr && r.xhrType === V.XHR_RESPONSE_TYPE.BLOB) {
        if (!self.Blob || typeof r.data == "string") {
            var e = r.xhr.getResponseHeader("content-type");
            if (e && e.indexOf("image") === 0) {
                r.data = new Image,
                r.data.src = "data:" + e + ";base64," + Sa(r.xhr.responseText),
                r.type = V.TYPE.IMAGE,
                r.data.onload = function() {
                    r.data.onload = null,
                    t()
                }
                ;
                return
            }
        } else if (r.data.type.indexOf("image") === 0) {
            var i = globalThis.URL || globalThis.webkitURL
              , n = i.createObjectURL(r.data);
            r.blob = r.data,
            r.data = new Image,
            r.data.src = n,
            r.type = V.TYPE.IMAGE,
            r.data.onload = function() {
                i.revokeObjectURL(n),
                r.data.onload = null,
                t()
            }
            ;
            return
        }
    }
    t()
}
var Ua = function() {
    function r() {}
    return r.extension = st.Loader,
    r.use = Fa,
    r
}();
_e.add(Ca, Ua);
/*!
 * @pixi/sound - v4.3.0
 * https://github.com/pixijs/pixi-sound
 * Compiled Fri, 05 Aug 2022 20:12:47 UTC
 *
 * @pixi/sound is licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license
 */
var yn;
function G() {
    return yn
}
var gn = function(r, t) {
    return (gn = Object.setPrototypeOf || {
        __proto__: []
    }instanceof Array && function(e, i) {
        e.__proto__ = i
    }
    || function(e, i) {
        for (var n in i)
            Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n])
    }
    )(r, t)
};
function J(r, t) {
    if (typeof t != "function" && t !== null)
        throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    function e() {
        this.constructor = r
    }
    gn(r, t),
    r.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype,
    new e)
}
var Yt = function() {
    return (Yt = Object.assign || function(r) {
        for (var t, e = 1, i = arguments.length; e < i; e++)
            for (var n in t = arguments[e])
                Object.prototype.hasOwnProperty.call(t, n) && (r[n] = t[n]);
        return r
    }
    ).apply(this, arguments)
}
  , Fr = ["mp3", "ogg", "oga", "opus", "mpeg", "wav", "m4a", "aiff", "wma", "mid", "caf"]
  , mn = {};
function La(r) {
    var t = Yt({
        m4a: "audio/mp4",
        oga: "audio/ogg",
        opus: 'audio/ogg; codecs="opus"',
        caf: 'audio/x-caf; codecs="opus"'
    }, r || {})
      , e = document.createElement("audio")
      , i = {}
      , n = /^no$/;
    Fr.forEach(function(s) {
        var o = e.canPlayType("audio/".concat(s)).replace(n, "")
          , a = t[s] ? e.canPlayType(t[s]).replace(n, "") : "";
        i[s] = !!o || !!a
    }),
    Object.assign(mn, i)
}
La();
var Ma = /\.(\{([^\}]+)\})(\?.*)?$/;
function bn(r) {
    var t = Ma
      , e = typeof r == "string" ? r : r.url;
    if (!t.test(e))
        return e;
    for (var i = t.exec(e), n = i[2].split(","), s = n[n.length - 1], o = 0, a = n.length; o < a; o++) {
        var u = n[o];
        if (mn[u]) {
            s = u;
            break
        }
    }
    var h = e.replace(i[1], s);
    if (typeof r != "string") {
        var f = r;
        f.extension = s,
        f.url = h
    }
    return h
}
var xn = function() {
    function r() {}
    return r.add = function() {
        r.setLegacy(G().useLegacy)
    }
    ,
    r.setLegacy = function(t) {
        var e = Fr;
        t ? e.forEach(function(i) {
            V.setExtensionXhrType(i, V.XHR_RESPONSE_TYPE.DEFAULT),
            V.setExtensionLoadType(i, V.LOAD_TYPE.AUDIO)
        }) : e.forEach(function(i) {
            V.setExtensionXhrType(i, V.XHR_RESPONSE_TYPE.BUFFER),
            V.setExtensionLoadType(i, V.LOAD_TYPE.XHR)
        })
    }
    ,
    r.pre = function(t, e) {
        bn(t),
        e()
    }
    ,
    r.use = function(t, e) {
        t.data && Fr.indexOf(t.extension) > -1 ? t.sound = G().add(t.name, {
            loaded: e,
            preload: !0,
            url: t.url,
            source: t.data
        }) : e()
    }
    ,
    r
}()
  , Ga = 0
  , Ba = function(r) {
    function t(e) {
        var i = r.call(this) || this;
        return i.id = Ga++,
        i.init(e),
        i
    }
    return J(t, r),
    t.prototype.set = function(e, i) {
        if (this[e] === void 0)
            throw new Error("Property with name ".concat(e, " does not exist."));
        switch (e) {
        case "speed":
            this.speed = i;
            break;
        case "volume":
            this.volume = i;
            break;
        case "paused":
            this.paused = i;
            break;
        case "loop":
            this.loop = i;
            break;
        case "muted":
            this.muted = i
        }
        return this
    }
    ,
    Object.defineProperty(t.prototype, "progress", {
        get: function() {
            return this._source.currentTime / this._duration
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "paused", {
        get: function() {
            return this._paused
        },
        set: function(e) {
            this._paused = e,
            this.refreshPaused()
        },
        enumerable: !1,
        configurable: !0
    }),
    t.prototype._onPlay = function() {
        this._playing = !0
    }
    ,
    t.prototype._onPause = function() {
        this._playing = !1
    }
    ,
    t.prototype.init = function(e) {
        this._playing = !1,
        this._duration = e.source.duration;
        var i = this._source = e.source.cloneNode(!1);
        i.src = e.parent.url,
        i.onplay = this._onPlay.bind(this),
        i.onpause = this._onPause.bind(this),
        e.context.on("refresh", this.refresh, this),
        e.context.on("refreshPaused", this.refreshPaused, this),
        this._media = e
    }
    ,
    t.prototype._internalStop = function() {
        this._source && this._playing && (this._source.onended = null,
        this._source.pause())
    }
    ,
    t.prototype.stop = function() {
        this._internalStop(),
        this._source && this.emit("stop")
    }
    ,
    Object.defineProperty(t.prototype, "speed", {
        get: function() {
            return this._speed
        },
        set: function(e) {
            this._speed = e,
            this.refresh()
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "volume", {
        get: function() {
            return this._volume
        },
        set: function(e) {
            this._volume = e,
            this.refresh()
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "loop", {
        get: function() {
            return this._loop
        },
        set: function(e) {
            this._loop = e,
            this.refresh()
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "muted", {
        get: function() {
            return this._muted
        },
        set: function(e) {
            this._muted = e,
            this.refresh()
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "filters", {
        get: function() {
            return null
        },
        set: function(e) {},
        enumerable: !1,
        configurable: !0
    }),
    t.prototype.refresh = function() {
        var e = this._media.context
          , i = this._media.parent;
        this._source.loop = this._loop || i.loop;
        var n = e.volume * (e.muted ? 0 : 1)
          , s = i.volume * (i.muted ? 0 : 1)
          , o = this._volume * (this._muted ? 0 : 1);
        this._source.volume = o * n * s,
        this._source.playbackRate = this._speed * e.speed * i.speed
    }
    ,
    t.prototype.refreshPaused = function() {
        var e = this._media.context
          , i = this._media.parent
          , n = this._paused || i.paused || e.paused;
        n !== this._pausedReal && (this._pausedReal = n,
        n ? (this._internalStop(),
        this.emit("paused")) : (this.emit("resumed"),
        this.play({
            start: this._source.currentTime,
            end: this._end,
            volume: this._volume,
            speed: this._speed,
            loop: this._loop
        })),
        this.emit("pause", n))
    }
    ,
    t.prototype.play = function(e) {
        var i = this
          , n = e.start
          , s = e.end
          , o = e.speed
          , a = e.loop
          , u = e.volume
          , h = e.muted;
        this._speed = o,
        this._volume = u,
        this._loop = !!a,
        this._muted = h,
        this.refresh(),
        this.loop && s !== null && (this.loop = !1),
        this._start = n,
        this._end = s || this._duration,
        this._start = Math.max(0, this._start - t.PADDING),
        this._end = Math.min(this._end + t.PADDING, this._duration),
        this._source.onloadedmetadata = function() {
            i._source && (i._source.currentTime = n,
            i._source.onloadedmetadata = null,
            i.emit("progress", n, i._duration),
            Q.shared.add(i._onUpdate, i))
        }
        ,
        this._source.onended = this._onComplete.bind(this),
        this._source.play(),
        this.emit("start")
    }
    ,
    t.prototype._onUpdate = function() {
        this.emit("progress", this.progress, this._duration),
        this._source.currentTime >= this._end && !this._source.loop && this._onComplete()
    }
    ,
    t.prototype._onComplete = function() {
        Q.shared.remove(this._onUpdate, this),
        this._internalStop(),
        this.emit("progress", 1, this._duration),
        this.emit("end", this)
    }
    ,
    t.prototype.destroy = function() {
        Q.shared.remove(this._onUpdate, this),
        this.removeAllListeners();
        var e = this._source;
        e && (e.onended = null,
        e.onplay = null,
        e.onpause = null,
        this._internalStop()),
        this._source = null,
        this._speed = 1,
        this._volume = 1,
        this._loop = !1,
        this._end = null,
        this._start = 0,
        this._duration = 0,
        this._playing = !1,
        this._pausedReal = !1,
        this._paused = !1,
        this._muted = !1,
        this._media && (this._media.context.off("refresh", this.refresh, this),
        this._media.context.off("refreshPaused", this.refreshPaused, this),
        this._media = null)
    }
    ,
    t.prototype.toString = function() {
        return "[HTMLAudioInstance id=".concat(this.id, "]")
    }
    ,
    t.PADDING = .1,
    t
}(At)
  , ka = function(r) {
    function t() {
        return r !== null && r.apply(this, arguments) || this
    }
    return J(t, r),
    t.prototype.init = function(e) {
        this.parent = e,
        this._source = e.options.source || new Audio,
        e.url && (this._source.src = e.url)
    }
    ,
    t.prototype.create = function() {
        return new Ba(this)
    }
    ,
    Object.defineProperty(t.prototype, "isPlayable", {
        get: function() {
            return !!this._source && this._source.readyState === 4
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "duration", {
        get: function() {
            return this._source.duration
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "context", {
        get: function() {
            return this.parent.context
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "filters", {
        get: function() {
            return null
        },
        set: function(e) {},
        enumerable: !1,
        configurable: !0
    }),
    t.prototype.destroy = function() {
        this.removeAllListeners(),
        this.parent = null,
        this._source && (this._source.src = "",
        this._source.load(),
        this._source = null)
    }
    ,
    Object.defineProperty(t.prototype, "source", {
        get: function() {
            return this._source
        },
        enumerable: !1,
        configurable: !0
    }),
    t.prototype.load = function(e) {
        var i = this._source
          , n = this.parent;
        if (i.readyState !== 4)
            if (n.url) {
                i.src = n.url;
                var s = function() {
                    u(),
                    n.isLoaded = !0;
                    var f = n.autoPlayStart();
                    e && e(null, n, f)
                }
                  , o = function() {
                    u(),
                    e && e(new Error("Sound loading has been aborted"))
                }
                  , a = function() {
                    u();
                    var f = "Failed to load audio element (code: ".concat(i.error.code, ")");
                    e && e(new Error(f))
                }
                  , u = function() {
                    i.removeEventListener("canplaythrough", s),
                    i.removeEventListener("load", s),
                    i.removeEventListener("abort", o),
                    i.removeEventListener("error", a)
                };
                i.addEventListener("canplaythrough", s, !1),
                i.addEventListener("load", s, !1),
                i.addEventListener("abort", o, !1),
                i.addEventListener("error", a, !1),
                i.load()
            } else
                e(new Error("sound.url or sound.source must be set"));
        else {
            n.isLoaded = !0;
            var h = n.autoPlayStart();
            e && setTimeout(function() {
                e(null, n, h)
            }, 0)
        }
    }
    ,
    t
}(At)
  , Da = function() {
    function r(t, e) {
        this.parent = t,
        Object.assign(this, e),
        this.duration = this.end - this.start
    }
    return r.prototype.play = function(t) {
        return this.parent.play({
            complete: t,
            speed: this.speed || this.parent.speed,
            end: this.end,
            start: this.start,
            loop: this.loop
        })
    }
    ,
    r.prototype.destroy = function() {
        this.parent = null
    }
    ,
    r
}()
  , it = function() {
    function r() {}
    return r.setParamValue = function(t, e) {
        if (t.setValueAtTime) {
            var i = G().context;
            t.setValueAtTime(e, i.audioContext.currentTime)
        } else
            t.value = e;
        return e
    }
    ,
    r
}()
  , Ha = 0
  , Xa = function(r) {
    function t(e) {
        var i = r.call(this) || this;
        return i.id = Ha++,
        i._media = null,
        i._paused = !1,
        i._muted = !1,
        i._elapsed = 0,
        i.init(e),
        i
    }
    return J(t, r),
    t.prototype.set = function(e, i) {
        if (this[e] === void 0)
            throw new Error("Property with name ".concat(e, " does not exist."));
        switch (e) {
        case "speed":
            this.speed = i;
            break;
        case "volume":
            this.volume = i;
            break;
        case "muted":
            this.muted = i;
            break;
        case "loop":
            this.loop = i;
            break;
        case "paused":
            this.paused = i
        }
        return this
    }
    ,
    t.prototype.stop = function() {
        this._source && (this._internalStop(),
        this.emit("stop"))
    }
    ,
    Object.defineProperty(t.prototype, "speed", {
        get: function() {
            return this._speed
        },
        set: function(e) {
            this._speed = e,
            this.refresh(),
            this._update(!0)
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "volume", {
        get: function() {
            return this._volume
        },
        set: function(e) {
            this._volume = e,
            this.refresh()
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "muted", {
        get: function() {
            return this._muted
        },
        set: function(e) {
            this._muted = e,
            this.refresh()
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "loop", {
        get: function() {
            return this._loop
        },
        set: function(e) {
            this._loop = e,
            this.refresh()
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "filters", {
        get: function() {
            return this._filters
        },
        set: function(e) {
            var i;
            this._filters && ((i = this._filters) === null || i === void 0 || i.filter(function(n) {
                return n
            }).forEach(function(n) {
                return n.disconnect()
            }),
            this._filters = null,
            this._source.connect(this._gain)),
            this._filters = e != null && e.length ? e.slice(0) : null,
            this.refresh()
        },
        enumerable: !1,
        configurable: !0
    }),
    t.prototype.refresh = function() {
        if (this._source) {
            var e = this._media.context
              , i = this._media.parent;
            this._source.loop = this._loop || i.loop;
            var n = e.volume * (e.muted ? 0 : 1)
              , s = i.volume * (i.muted ? 0 : 1)
              , o = this._volume * (this._muted ? 0 : 1);
            it.setParamValue(this._gain.gain, o * s * n),
            it.setParamValue(this._source.playbackRate, this._speed * i.speed * e.speed),
            this.applyFilters()
        }
    }
    ,
    t.prototype.applyFilters = function() {
        var e;
        if (!((e = this._filters) === null || e === void 0) && e.length) {
            this._source.disconnect();
            var i = this._source;
            this._filters.forEach(function(n) {
                i.connect(n.destination),
                i = n
            }),
            i.connect(this._gain)
        }
    }
    ,
    t.prototype.refreshPaused = function() {
        var e = this._media.context
          , i = this._media.parent
          , n = this._paused || i.paused || e.paused;
        n !== this._pausedReal && (this._pausedReal = n,
        n ? (this._internalStop(),
        this.emit("paused")) : (this.emit("resumed"),
        this.play({
            start: this._elapsed % this._duration,
            end: this._end,
            speed: this._speed,
            loop: this._loop,
            volume: this._volume
        })),
        this.emit("pause", n))
    }
    ,
    t.prototype.play = function(e) {
        var i = e.start
          , n = e.end
          , s = e.speed
          , o = e.loop
          , a = e.volume
          , u = e.muted
          , h = e.filters;
        this._paused = !1;
        var f = this._media.nodes.cloneBufferSource()
          , l = f.source
          , c = f.gain;
        this._source = l,
        this._gain = c,
        this._speed = s,
        this._volume = a,
        this._loop = !!o,
        this._muted = u,
        this._filters = h,
        this.refresh();
        var d = this._source.buffer.duration;
        this._duration = d,
        this._end = n,
        this._lastUpdate = this._now(),
        this._elapsed = i,
        this._source.onended = this._onComplete.bind(this),
        this._loop ? (this._source.loopEnd = n,
        this._source.loopStart = i,
        this._source.start(0, i)) : n ? this._source.start(0, i, n - i) : this._source.start(0, i),
        this.emit("start"),
        this._update(!0),
        this.enableTicker(!0)
    }
    ,
    t.prototype.enableTicker = function(e) {
        Q.shared.remove(this._updateListener, this),
        e && Q.shared.add(this._updateListener, this)
    }
    ,
    Object.defineProperty(t.prototype, "progress", {
        get: function() {
            return this._progress
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "paused", {
        get: function() {
            return this._paused
        },
        set: function(e) {
            this._paused = e,
            this.refreshPaused()
        },
        enumerable: !1,
        configurable: !0
    }),
    t.prototype.destroy = function() {
        var e;
        this.removeAllListeners(),
        this._internalStop(),
        this._gain && (this._gain.disconnect(),
        this._gain = null),
        this._media && (this._media.context.events.off("refresh", this.refresh, this),
        this._media.context.events.off("refreshPaused", this.refreshPaused, this),
        this._media = null),
        (e = this._filters) === null || e === void 0 || e.forEach(function(i) {
            return i.disconnect()
        }),
        this._filters = null,
        this._end = null,
        this._speed = 1,
        this._volume = 1,
        this._loop = !1,
        this._elapsed = 0,
        this._duration = 0,
        this._paused = !1,
        this._muted = !1,
        this._pausedReal = !1
    }
    ,
    t.prototype.toString = function() {
        return "[WebAudioInstance id=".concat(this.id, "]")
    }
    ,
    t.prototype._now = function() {
        return this._media.context.audioContext.currentTime
    }
    ,
    t.prototype._updateListener = function() {
        this._update()
    }
    ,
    t.prototype._update = function(e) {
        if (e === void 0 && (e = !1),
        this._source) {
            var i = this._now()
              , n = i - this._lastUpdate;
            if (n > 0 || e) {
                var s = this._source.playbackRate.value;
                this._elapsed += n * s,
                this._lastUpdate = i;
                var o = this._duration
                  , a = void 0;
                if (this._source.loopStart) {
                    var u = this._source.loopEnd - this._source.loopStart;
                    a = (this._source.loopStart + this._elapsed % u) / o
                } else
                    a = this._elapsed % o / o;
                this._progress = a,
                this.emit("progress", this._progress, o)
            }
        }
    }
    ,
    t.prototype.init = function(e) {
        this._media = e,
        e.context.events.on("refresh", this.refresh, this),
        e.context.events.on("refreshPaused", this.refreshPaused, this)
    }
    ,
    t.prototype._internalStop = function() {
        if (this._source) {
            this.enableTicker(!1),
            this._source.onended = null,
            this._source.stop(0),
            this._source.disconnect();
            try {
                this._source.buffer = null
            } catch {}
            this._source = null
        }
    }
    ,
    t.prototype._onComplete = function() {
        if (this._source) {
            this.enableTicker(!1),
            this._source.onended = null,
            this._source.disconnect();
            try {
                this._source.buffer = null
            } catch {}
        }
        this._source = null,
        this._progress = 1,
        this.emit("progress", 1, this._duration),
        this.emit("end", this)
    }
    ,
    t
}(At)
  , En = function() {
    function r(t, e) {
        this._output = e,
        this._input = t
    }
    return Object.defineProperty(r.prototype, "destination", {
        get: function() {
            return this._input
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r.prototype, "filters", {
        get: function() {
            return this._filters
        },
        set: function(t) {
            var e = this;
            if (this._filters && (this._filters.forEach(function(n) {
                n && n.disconnect()
            }),
            this._filters = null,
            this._input.connect(this._output)),
            t && t.length) {
                this._filters = t.slice(0),
                this._input.disconnect();
                var i = null;
                t.forEach(function(n) {
                    i === null ? e._input.connect(n.destination) : i.connect(n.destination),
                    i = n
                }),
                i.connect(this._output)
            }
        },
        enumerable: !1,
        configurable: !0
    }),
    r.prototype.destroy = function() {
        this.filters = null,
        this._input = null,
        this._output = null
    }
    ,
    r
}()
  , Va = function(r) {
    function t(e) {
        var i = this
          , n = e.audioContext
          , s = n.createBufferSource()
          , o = n.createGain()
          , a = n.createAnalyser();
        return s.connect(a),
        a.connect(o),
        o.connect(e.destination),
        (i = r.call(this, a, o) || this).context = e,
        i.bufferSource = s,
        i.gain = o,
        i.analyser = a,
        i
    }
    return J(t, r),
    Object.defineProperty(t.prototype, "script", {
        get: function() {
            return this._script || (this._script = this.context.audioContext.createScriptProcessor(t.BUFFER_SIZE),
            this._script.connect(this.context.destination)),
            this._script
        },
        enumerable: !1,
        configurable: !0
    }),
    t.prototype.destroy = function() {
        r.prototype.destroy.call(this),
        this.bufferSource.disconnect(),
        this._script && this._script.disconnect(),
        this.gain.disconnect(),
        this.analyser.disconnect(),
        this.bufferSource = null,
        this._script = null,
        this.gain = null,
        this.analyser = null,
        this.context = null
    }
    ,
    t.prototype.cloneBufferSource = function() {
        var e = this.bufferSource
          , i = this.context.audioContext.createBufferSource();
        i.buffer = e.buffer,
        it.setParamValue(i.playbackRate, e.playbackRate.value),
        i.loop = e.loop;
        var n = this.context.audioContext.createGain();
        return i.connect(n),
        n.connect(this.destination),
        {
            source: i,
            gain: n
        }
    }
    ,
    Object.defineProperty(t.prototype, "bufferSize", {
        get: function() {
            return this.script.bufferSize
        },
        enumerable: !1,
        configurable: !0
    }),
    t.BUFFER_SIZE = 0,
    t
}(En)
  , ja = function() {
    function r() {}
    return r.prototype.init = function(t) {
        this.parent = t,
        this._nodes = new Va(this.context),
        this._source = this._nodes.bufferSource,
        this.source = t.options.source
    }
    ,
    r.prototype.destroy = function() {
        this.parent = null,
        this._nodes.destroy(),
        this._nodes = null;
        try {
            this._source.buffer = null
        } catch {}
        this._source = null,
        this.source = null
    }
    ,
    r.prototype.create = function() {
        return new Xa(this)
    }
    ,
    Object.defineProperty(r.prototype, "context", {
        get: function() {
            return this.parent.context
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r.prototype, "isPlayable", {
        get: function() {
            return !!this._source && !!this._source.buffer
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r.prototype, "filters", {
        get: function() {
            return this._nodes.filters
        },
        set: function(t) {
            this._nodes.filters = t
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r.prototype, "duration", {
        get: function() {
            return this._source.buffer.duration
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r.prototype, "buffer", {
        get: function() {
            return this._source.buffer
        },
        set: function(t) {
            this._source.buffer = t
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r.prototype, "nodes", {
        get: function() {
            return this._nodes
        },
        enumerable: !1,
        configurable: !0
    }),
    r.prototype.load = function(t) {
        this.source ? this._decode(this.source, t) : this.parent.url ? this._loadUrl(t) : t && t(new Error("sound.url or sound.source must be set"))
    }
    ,
    r.prototype._loadUrl = function(t) {
        var e = this
          , i = new XMLHttpRequest
          , n = this.parent.url;
        i.open("GET", n, !0),
        i.responseType = "arraybuffer",
        i.onload = function() {
            e.source = i.response,
            e._decode(i.response, t)
        }
        ,
        i.send()
    }
    ,
    r.prototype._decode = function(t, e) {
        var i = this
          , n = function(s, o) {
            if (s)
                e && e(s);
            else {
                i.parent.isLoaded = !0,
                i.buffer = o;
                var a = i.parent.autoPlayStart();
                e && e(null, i.parent, a)
            }
        };
        t instanceof AudioBuffer ? n(null, t) : this.parent.context.decode(t, n)
    }
    ,
    r
}()
  , se = function() {
    function r(t, e) {
        this.media = t,
        this.options = e,
        this._instances = [],
        this._sprites = {},
        this.media.init(this);
        var i = e.complete;
        this._autoPlayOptions = i ? {
            complete: i
        } : null,
        this.isLoaded = !1,
        this.isPlaying = !1,
        this.autoPlay = e.autoPlay,
        this.singleInstance = e.singleInstance,
        this.preload = e.preload || this.autoPlay,
        this.url = e.url,
        this.speed = e.speed,
        this.volume = e.volume,
        this.loop = e.loop,
        e.sprites && this.addSprites(e.sprites),
        this.preload && this._preload(e.loaded)
    }
    return r.from = function(t) {
        var e = {};
        return typeof t == "string" ? e.url = t : t instanceof ArrayBuffer || t instanceof AudioBuffer || t instanceof HTMLAudioElement ? e.source = t : e = t,
        (e = Yt({
            autoPlay: !1,
            singleInstance: !1,
            url: null,
            source: null,
            preload: !1,
            volume: 1,
            speed: 1,
            complete: null,
            loaded: null,
            loop: !1
        }, e)).url && (e.url = bn(e.url)),
        Object.freeze(e),
        new r(G().useLegacy ? new ka : new ja,e)
    }
    ,
    Object.defineProperty(r.prototype, "context", {
        get: function() {
            return G().context
        },
        enumerable: !1,
        configurable: !0
    }),
    r.prototype.pause = function() {
        return this.isPlaying = !1,
        this.paused = !0,
        this
    }
    ,
    r.prototype.resume = function() {
        return this.isPlaying = this._instances.length > 0,
        this.paused = !1,
        this
    }
    ,
    Object.defineProperty(r.prototype, "paused", {
        get: function() {
            return this._paused
        },
        set: function(t) {
            this._paused = t,
            this.refreshPaused()
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r.prototype, "speed", {
        get: function() {
            return this._speed
        },
        set: function(t) {
            this._speed = t,
            this.refresh()
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r.prototype, "filters", {
        get: function() {
            return this.media.filters
        },
        set: function(t) {
            this.media.filters = t
        },
        enumerable: !1,
        configurable: !0
    }),
    r.prototype.addSprites = function(t, e) {
        if (typeof t == "object") {
            var i = {};
            for (var n in t)
                i[n] = this.addSprites(n, t[n]);
            return i
        }
        var s = new Da(this,e);
        return this._sprites[t] = s,
        s
    }
    ,
    r.prototype.destroy = function() {
        this._removeInstances(),
        this.removeSprites(),
        this.media.destroy(),
        this.media = null,
        this._sprites = null,
        this._instances = null
    }
    ,
    r.prototype.removeSprites = function(t) {
        if (t) {
            var e = this._sprites[t];
            e !== void 0 && (e.destroy(),
            delete this._sprites[t])
        } else
            for (var i in this._sprites)
                this.removeSprites(i);
        return this
    }
    ,
    Object.defineProperty(r.prototype, "isPlayable", {
        get: function() {
            return this.isLoaded && this.media && this.media.isPlayable
        },
        enumerable: !1,
        configurable: !0
    }),
    r.prototype.stop = function() {
        if (!this.isPlayable)
            return this.autoPlay = !1,
            this._autoPlayOptions = null,
            this;
        this.isPlaying = !1;
        for (var t = this._instances.length - 1; t >= 0; t--)
            this._instances[t].stop();
        return this
    }
    ,
    r.prototype.play = function(t, e) {
        var i, n = this;
        if (typeof t == "string" ? i = {
            sprite: o = t,
            loop: this.loop,
            complete: e
        } : typeof t == "function" ? (i = {}).complete = t : i = t,
        (i = Yt({
            complete: null,
            loaded: null,
            sprite: null,
            end: null,
            start: 0,
            volume: 1,
            speed: 1,
            muted: !1,
            loop: !1
        }, i || {})).sprite) {
            var s = i.sprite
              , o = this._sprites[s];
            i.start = o.start + (i.start || 0),
            i.end = o.end,
            i.speed = o.speed || 1,
            i.loop = o.loop || i.loop,
            delete i.sprite
        }
        if (i.offset && (i.start = i.offset),
        !this.isLoaded)
            return new Promise(function(u, h) {
                n.autoPlay = !0,
                n._autoPlayOptions = i,
                n._preload(function(f, l, c) {
                    f ? h(f) : (i.loaded && i.loaded(f, l, c),
                    u(c))
                })
            }
            );
        (this.singleInstance || i.singleInstance) && this._removeInstances();
        var a = this._createInstance();
        return this._instances.push(a),
        this.isPlaying = !0,
        a.once("end", function() {
            i.complete && i.complete(n),
            n._onComplete(a)
        }),
        a.once("stop", function() {
            n._onComplete(a)
        }),
        a.play(i),
        a
    }
    ,
    r.prototype.refresh = function() {
        for (var t = this._instances.length, e = 0; e < t; e++)
            this._instances[e].refresh()
    }
    ,
    r.prototype.refreshPaused = function() {
        for (var t = this._instances.length, e = 0; e < t; e++)
            this._instances[e].refreshPaused()
    }
    ,
    Object.defineProperty(r.prototype, "volume", {
        get: function() {
            return this._volume
        },
        set: function(t) {
            this._volume = t,
            this.refresh()
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r.prototype, "muted", {
        get: function() {
            return this._muted
        },
        set: function(t) {
            this._muted = t,
            this.refresh()
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r.prototype, "loop", {
        get: function() {
            return this._loop
        },
        set: function(t) {
            this._loop = t,
            this.refresh()
        },
        enumerable: !1,
        configurable: !0
    }),
    r.prototype._preload = function(t) {
        this.media.load(t)
    }
    ,
    Object.defineProperty(r.prototype, "instances", {
        get: function() {
            return this._instances
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r.prototype, "sprites", {
        get: function() {
            return this._sprites
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r.prototype, "duration", {
        get: function() {
            return this.media.duration
        },
        enumerable: !1,
        configurable: !0
    }),
    r.prototype.autoPlayStart = function() {
        var t;
        return this.autoPlay && (t = this.play(this._autoPlayOptions)),
        t
    }
    ,
    r.prototype._removeInstances = function() {
        for (var t = this._instances.length - 1; t >= 0; t--)
            this._poolInstance(this._instances[t]);
        this._instances.length = 0
    }
    ,
    r.prototype._onComplete = function(t) {
        if (this._instances) {
            var e = this._instances.indexOf(t);
            e > -1 && this._instances.splice(e, 1),
            this.isPlaying = this._instances.length > 0
        }
        this._poolInstance(t)
    }
    ,
    r.prototype._createInstance = function() {
        if (r._pool.length > 0) {
            var t = r._pool.pop();
            return t.init(this.media),
            t
        }
        return this.media.create()
    }
    ,
    r.prototype._poolInstance = function(t) {
        t.destroy(),
        r._pool.indexOf(t) < 0 && r._pool.push(t)
    }
    ,
    r._pool = [],
    r
}()
  , za = function(r) {
    function t() {
        var e = r !== null && r.apply(this, arguments) || this;
        return e.speed = 1,
        e.muted = !1,
        e.volume = 1,
        e.paused = !1,
        e
    }
    return J(t, r),
    t.prototype.refresh = function() {
        this.emit("refresh")
    }
    ,
    t.prototype.refreshPaused = function() {
        this.emit("refreshPaused")
    }
    ,
    Object.defineProperty(t.prototype, "filters", {
        get: function() {
            return null
        },
        set: function(e) {},
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "audioContext", {
        get: function() {
            return null
        },
        enumerable: !1,
        configurable: !0
    }),
    t.prototype.toggleMute = function() {
        return this.muted = !this.muted,
        this.refresh(),
        this.muted
    }
    ,
    t.prototype.togglePause = function() {
        return this.paused = !this.paused,
        this.refreshPaused(),
        this.paused
    }
    ,
    t.prototype.destroy = function() {
        this.removeAllListeners()
    }
    ,
    t
}(At)
  , Wi = function(r) {
    function t() {
        var e = this
          , i = window
          , n = new t.AudioContext
          , s = n.createDynamicsCompressor()
          , o = n.createAnalyser();
        return o.connect(s),
        s.connect(n.destination),
        (e = r.call(this, o, s) || this)._ctx = n,
        e._offlineCtx = new t.OfflineAudioContext(1,2,i.OfflineAudioContext ? Math.max(8e3, Math.min(96e3, n.sampleRate)) : 44100),
        e._unlocked = !1,
        e.compressor = s,
        e.analyser = o,
        e.events = new At,
        e.volume = 1,
        e.speed = 1,
        e.muted = !1,
        e.paused = !1,
        n.state !== "running" && (e._unlock(),
        e._unlock = e._unlock.bind(e),
        document.addEventListener("mousedown", e._unlock, !0),
        document.addEventListener("touchstart", e._unlock, !0),
        document.addEventListener("touchend", e._unlock, !0)),
        e
    }
    return J(t, r),
    t.prototype._unlock = function() {
        this._unlocked || (this.playEmptySound(),
        this._ctx.state === "running" && (document.removeEventListener("mousedown", this._unlock, !0),
        document.removeEventListener("touchend", this._unlock, !0),
        document.removeEventListener("touchstart", this._unlock, !0),
        this._unlocked = !0))
    }
    ,
    t.prototype.playEmptySound = function() {
        var e = this._ctx.createBufferSource();
        e.buffer = this._ctx.createBuffer(1, 1, 22050),
        e.connect(this._ctx.destination),
        e.start(0, 0, 0),
        e.context.state === "suspended" && e.context.resume()
    }
    ,
    Object.defineProperty(t, "AudioContext", {
        get: function() {
            var e = window;
            return e.AudioContext || e.webkitAudioContext || null
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t, "OfflineAudioContext", {
        get: function() {
            var e = window;
            return e.OfflineAudioContext || e.webkitOfflineAudioContext || null
        },
        enumerable: !1,
        configurable: !0
    }),
    t.prototype.destroy = function() {
        r.prototype.destroy.call(this);
        var e = this._ctx;
        e.close !== void 0 && e.close(),
        this.events.removeAllListeners(),
        this.analyser.disconnect(),
        this.compressor.disconnect(),
        this.analyser = null,
        this.compressor = null,
        this.events = null,
        this._offlineCtx = null,
        this._ctx = null
    }
    ,
    Object.defineProperty(t.prototype, "audioContext", {
        get: function() {
            return this._ctx
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "offlineContext", {
        get: function() {
            return this._offlineCtx
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "paused", {
        get: function() {
            return this._paused
        },
        set: function(e) {
            e && this._ctx.state === "running" ? this._ctx.suspend() : e || this._ctx.state !== "suspended" || this._ctx.resume(),
            this._paused = e
        },
        enumerable: !1,
        configurable: !0
    }),
    t.prototype.refresh = function() {
        this.events.emit("refresh")
    }
    ,
    t.prototype.refreshPaused = function() {
        this.events.emit("refreshPaused")
    }
    ,
    t.prototype.toggleMute = function() {
        return this.muted = !this.muted,
        this.refresh(),
        this.muted
    }
    ,
    t.prototype.togglePause = function() {
        return this.paused = !this.paused,
        this.refreshPaused(),
        this._paused
    }
    ,
    t.prototype.decode = function(e, i) {
        var n = function(o) {
            i(new Error((o == null ? void 0 : o.message) || "Unable to decode file"))
        }
          , s = this._offlineCtx.decodeAudioData(e, function(o) {
            i(null, o)
        }, n);
        s && s.catch(n)
    }
    ,
    t
}(En)
  , Wa = function() {
    function r() {
        this.init()
    }
    return r.prototype.init = function() {
        return this.supported && (this._webAudioContext = new Wi),
        this._htmlAudioContext = new za,
        this._sounds = {},
        this.useLegacy = !this.supported,
        this
    }
    ,
    Object.defineProperty(r.prototype, "context", {
        get: function() {
            return this._context
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r.prototype, "filtersAll", {
        get: function() {
            return this.useLegacy ? [] : this._context.filters
        },
        set: function(t) {
            this.useLegacy || (this._context.filters = t)
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r.prototype, "supported", {
        get: function() {
            return Wi.AudioContext !== null
        },
        enumerable: !1,
        configurable: !0
    }),
    r.prototype.add = function(t, e) {
        if (typeof t == "object") {
            var i = {};
            for (var n in t) {
                var s = this._getOptions(t[n], e);
                i[n] = this.add(n, s)
            }
            return i
        }
        if (e instanceof se)
            return this._sounds[t] = e,
            e;
        var o = this._getOptions(e)
          , a = se.from(o);
        return this._sounds[t] = a,
        a
    }
    ,
    r.prototype._getOptions = function(t, e) {
        var i;
        return i = typeof t == "string" ? {
            url: t
        } : t instanceof ArrayBuffer || t instanceof AudioBuffer || t instanceof HTMLAudioElement ? {
            source: t
        } : t,
        i = Yt(Yt({}, i), e || {})
    }
    ,
    Object.defineProperty(r.prototype, "useLegacy", {
        get: function() {
            return this._useLegacy
        },
        set: function(t) {
            xn.setLegacy(t),
            this._useLegacy = t,
            this._context = !t && this.supported ? this._webAudioContext : this._htmlAudioContext
        },
        enumerable: !1,
        configurable: !0
    }),
    r.prototype.remove = function(t) {
        return this.exists(t, !0),
        this._sounds[t].destroy(),
        delete this._sounds[t],
        this
    }
    ,
    Object.defineProperty(r.prototype, "volumeAll", {
        get: function() {
            return this._context.volume
        },
        set: function(t) {
            this._context.volume = t,
            this._context.refresh()
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(r.prototype, "speedAll", {
        get: function() {
            return this._context.speed
        },
        set: function(t) {
            this._context.speed = t,
            this._context.refresh()
        },
        enumerable: !1,
        configurable: !0
    }),
    r.prototype.togglePauseAll = function() {
        return this._context.togglePause()
    }
    ,
    r.prototype.pauseAll = function() {
        return this._context.paused = !0,
        this._context.refreshPaused(),
        this
    }
    ,
    r.prototype.resumeAll = function() {
        return this._context.paused = !1,
        this._context.refreshPaused(),
        this
    }
    ,
    r.prototype.toggleMuteAll = function() {
        return this._context.toggleMute()
    }
    ,
    r.prototype.muteAll = function() {
        return this._context.muted = !0,
        this._context.refresh(),
        this
    }
    ,
    r.prototype.unmuteAll = function() {
        return this._context.muted = !1,
        this._context.refresh(),
        this
    }
    ,
    r.prototype.removeAll = function() {
        for (var t in this._sounds)
            this._sounds[t].destroy(),
            delete this._sounds[t];
        return this
    }
    ,
    r.prototype.stopAll = function() {
        for (var t in this._sounds)
            this._sounds[t].stop();
        return this
    }
    ,
    r.prototype.exists = function(t, e) {
        return !!this._sounds[t]
    }
    ,
    r.prototype.find = function(t) {
        return this.exists(t, !0),
        this._sounds[t]
    }
    ,
    r.prototype.play = function(t, e) {
        return this.find(t).play(e)
    }
    ,
    r.prototype.stop = function(t) {
        return this.find(t).stop()
    }
    ,
    r.prototype.pause = function(t) {
        return this.find(t).pause()
    }
    ,
    r.prototype.resume = function(t) {
        return this.find(t).resume()
    }
    ,
    r.prototype.volume = function(t, e) {
        var i = this.find(t);
        return e !== void 0 && (i.volume = e),
        i.volume
    }
    ,
    r.prototype.speed = function(t, e) {
        var i = this.find(t);
        return e !== void 0 && (i.speed = e),
        i.speed
    }
    ,
    r.prototype.duration = function(t) {
        return this.find(t).duration
    }
    ,
    r.prototype.close = function() {
        return this.removeAll(),
        this._sounds = null,
        this._webAudioContext && (this._webAudioContext.destroy(),
        this._webAudioContext = null),
        this._htmlAudioContext && (this._htmlAudioContext.destroy(),
        this._htmlAudioContext = null),
        this._context = null,
        this
    }
    ,
    r
}()
  , Et = function() {
    function r(t, e) {
        this.init(t, e)
    }
    return r.prototype.init = function(t, e) {
        this.destination = t,
        this.source = e || t
    }
    ,
    r.prototype.connect = function(t) {
        this.source.connect(t)
    }
    ,
    r.prototype.disconnect = function() {
        this.source.disconnect()
    }
    ,
    r.prototype.destroy = function() {
        this.disconnect(),
        this.destination = null,
        this.source = null
    }
    ,
    r
}();
(function(r) {
    function t(e, i, n, s, o, a, u, h, f, l) {
        e === void 0 && (e = 0),
        i === void 0 && (i = 0),
        n === void 0 && (n = 0),
        s === void 0 && (s = 0),
        o === void 0 && (o = 0),
        a === void 0 && (a = 0),
        u === void 0 && (u = 0),
        h === void 0 && (h = 0),
        f === void 0 && (f = 0),
        l === void 0 && (l = 0);
        var c = this;
        if (!G().useLegacy) {
            var d = [{
                f: t.F32,
                type: "lowshelf",
                gain: e
            }, {
                f: t.F64,
                type: "peaking",
                gain: i
            }, {
                f: t.F125,
                type: "peaking",
                gain: n
            }, {
                f: t.F250,
                type: "peaking",
                gain: s
            }, {
                f: t.F500,
                type: "peaking",
                gain: o
            }, {
                f: t.F1K,
                type: "peaking",
                gain: a
            }, {
                f: t.F2K,
                type: "peaking",
                gain: u
            }, {
                f: t.F4K,
                type: "peaking",
                gain: h
            }, {
                f: t.F8K,
                type: "peaking",
                gain: f
            }, {
                f: t.F16K,
                type: "highshelf",
                gain: l
            }].map(function(v) {
                var T = G().context.audioContext.createBiquadFilter();
                return T.type = v.type,
                it.setParamValue(T.Q, 1),
                T.frequency.value = v.f,
                it.setParamValue(T.gain, v.gain),
                T
            });
            (c = r.call(this, d[0], d[d.length - 1]) || this).bands = d,
            c.bandsMap = {};
            for (var p = 0; p < c.bands.length; p++) {
                var y = c.bands[p];
                p > 0 && c.bands[p - 1].connect(y),
                c.bandsMap[y.frequency.value] = y
            }
            return c
        }
        c = r.call(this, null) || this
    }
    return J(t, r),
    t.prototype.setGain = function(e, i) {
        if (i === void 0 && (i = 0),
        !this.bandsMap[e])
            throw new Error("No band found for frequency ".concat(e));
        it.setParamValue(this.bandsMap[e].gain, i)
    }
    ,
    t.prototype.getGain = function(e) {
        if (!this.bandsMap[e])
            throw new Error("No band found for frequency ".concat(e));
        return this.bandsMap[e].gain.value
    }
    ,
    Object.defineProperty(t.prototype, "f32", {
        get: function() {
            return this.getGain(t.F32)
        },
        set: function(e) {
            this.setGain(t.F32, e)
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "f64", {
        get: function() {
            return this.getGain(t.F64)
        },
        set: function(e) {
            this.setGain(t.F64, e)
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "f125", {
        get: function() {
            return this.getGain(t.F125)
        },
        set: function(e) {
            this.setGain(t.F125, e)
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "f250", {
        get: function() {
            return this.getGain(t.F250)
        },
        set: function(e) {
            this.setGain(t.F250, e)
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "f500", {
        get: function() {
            return this.getGain(t.F500)
        },
        set: function(e) {
            this.setGain(t.F500, e)
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "f1k", {
        get: function() {
            return this.getGain(t.F1K)
        },
        set: function(e) {
            this.setGain(t.F1K, e)
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "f2k", {
        get: function() {
            return this.getGain(t.F2K)
        },
        set: function(e) {
            this.setGain(t.F2K, e)
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "f4k", {
        get: function() {
            return this.getGain(t.F4K)
        },
        set: function(e) {
            this.setGain(t.F4K, e)
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "f8k", {
        get: function() {
            return this.getGain(t.F8K)
        },
        set: function(e) {
            this.setGain(t.F8K, e)
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "f16k", {
        get: function() {
            return this.getGain(t.F16K)
        },
        set: function(e) {
            this.setGain(t.F16K, e)
        },
        enumerable: !1,
        configurable: !0
    }),
    t.prototype.reset = function() {
        this.bands.forEach(function(e) {
            it.setParamValue(e.gain, 0)
        })
    }
    ,
    t.prototype.destroy = function() {
        this.bands.forEach(function(e) {
            e.disconnect()
        }),
        this.bands = null,
        this.bandsMap = null
    }
    ,
    t.F32 = 32,
    t.F64 = 64,
    t.F125 = 125,
    t.F250 = 250,
    t.F500 = 500,
    t.F1K = 1e3,
    t.F2K = 2e3,
    t.F4K = 4e3,
    t.F8K = 8e3,
    t.F16K = 16e3,
    t
}
)(Et),
function(r) {
    function t(e) {
        e === void 0 && (e = 0);
        var i = this;
        if (!G().useLegacy) {
            var n = G().context.audioContext.createWaveShaper();
            return (i = r.call(this, n) || this)._distortion = n,
            i.amount = e,
            i
        }
        i = r.call(this, null) || this
    }
    return J(t, r),
    Object.defineProperty(t.prototype, "amount", {
        get: function() {
            return this._amount
        },
        set: function(e) {
            this._amount = e;
            for (var i, n = 1e3 * e, s = 44100, o = new Float32Array(s), a = Math.PI / 180, u = 0; u < s; ++u)
                i = 2 * u / s - 1,
                o[u] = (3 + n) * i * 20 * a / (Math.PI + n * Math.abs(i));
            this._distortion.curve = o,
            this._distortion.oversample = "4x"
        },
        enumerable: !1,
        configurable: !0
    }),
    t.prototype.destroy = function() {
        this._distortion = null,
        r.prototype.destroy.call(this)
    }
    ,
    t
}(Et),
function(r) {
    function t(e) {
        e === void 0 && (e = 0);
        var i = this;
        if (!G().useLegacy) {
            var n, s, o, a = G().context.audioContext;
            return a.createStereoPanner ? o = n = a.createStereoPanner() : ((s = a.createPanner()).panningModel = "equalpower",
            o = s),
            (i = r.call(this, o) || this)._stereo = n,
            i._panner = s,
            i.pan = e,
            i
        }
        i = r.call(this, null) || this
    }
    return J(t, r),
    Object.defineProperty(t.prototype, "pan", {
        get: function() {
            return this._pan
        },
        set: function(e) {
            this._pan = e,
            this._stereo ? it.setParamValue(this._stereo.pan, e) : this._panner.setPosition(e, 0, 1 - Math.abs(e))
        },
        enumerable: !1,
        configurable: !0
    }),
    t.prototype.destroy = function() {
        r.prototype.destroy.call(this),
        this._stereo = null,
        this._panner = null
    }
    ,
    t
}(Et),
function(r) {
    function t(e, i, n) {
        e === void 0 && (e = 3),
        i === void 0 && (i = 2),
        n === void 0 && (n = !1);
        var s = this;
        if (!G().useLegacy)
            return (s = r.call(this, null) || this)._seconds = s._clamp(e, 1, 50),
            s._decay = s._clamp(i, 0, 100),
            s._reverse = n,
            s._rebuild(),
            s;
        s = r.call(this, null) || this
    }
    return J(t, r),
    t.prototype._clamp = function(e, i, n) {
        return Math.min(n, Math.max(i, e))
    }
    ,
    Object.defineProperty(t.prototype, "seconds", {
        get: function() {
            return this._seconds
        },
        set: function(e) {
            this._seconds = this._clamp(e, 1, 50),
            this._rebuild()
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "decay", {
        get: function() {
            return this._decay
        },
        set: function(e) {
            this._decay = this._clamp(e, 0, 100),
            this._rebuild()
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "reverse", {
        get: function() {
            return this._reverse
        },
        set: function(e) {
            this._reverse = e,
            this._rebuild()
        },
        enumerable: !1,
        configurable: !0
    }),
    t.prototype._rebuild = function() {
        for (var e, i = G().context.audioContext, n = i.sampleRate, s = n * this._seconds, o = i.createBuffer(2, s, n), a = o.getChannelData(0), u = o.getChannelData(1), h = 0; h < s; h++)
            e = this._reverse ? s - h : h,
            a[h] = (2 * Math.random() - 1) * Math.pow(1 - e / s, this._decay),
            u[h] = (2 * Math.random() - 1) * Math.pow(1 - e / s, this._decay);
        var f = G().context.audioContext.createConvolver();
        f.buffer = o,
        this.init(f)
    }
    ,
    t
}(Et),
function(r) {
    function t() {
        var e = this;
        if (!G().useLegacy) {
            var i = G().context.audioContext
              , n = i.createChannelSplitter()
              , s = i.createChannelMerger();
            return s.connect(n),
            (e = r.call(this, s, n) || this)._merger = s,
            e
        }
        e = r.call(this, null) || this
    }
    return J(t, r),
    t.prototype.destroy = function() {
        this._merger.disconnect(),
        this._merger = null,
        r.prototype.destroy.call(this)
    }
    ,
    t
}(Et),
function(r) {
    function t() {
        var e = this;
        if (!G().useLegacy) {
            var i = G().context.audioContext
              , n = i.createMediaStreamDestination()
              , s = i.createMediaStreamSource(n.stream);
            return (e = r.call(this, n, s) || this)._stream = n.stream,
            e
        }
        e = r.call(this, null) || this
    }
    return J(t, r),
    Object.defineProperty(t.prototype, "stream", {
        get: function() {
            return this._stream
        },
        enumerable: !1,
        configurable: !0
    }),
    t.prototype.destroy = function() {
        this._stream = null,
        r.prototype.destroy.call(this)
    }
    ,
    t
}(Et),
function(r) {
    function t() {
        if (!G().useLegacy) {
            var e = G().context.audioContext
              , i = e.createBiquadFilter()
              , n = e.createBiquadFilter()
              , s = e.createBiquadFilter()
              , o = e.createBiquadFilter();
            return i.type = "lowpass",
            it.setParamValue(i.frequency, 2e3),
            n.type = "lowpass",
            it.setParamValue(n.frequency, 2e3),
            s.type = "highpass",
            it.setParamValue(s.frequency, 500),
            o.type = "highpass",
            it.setParamValue(o.frequency, 500),
            i.connect(n),
            n.connect(s),
            s.connect(o),
            r.call(this, i, o) || this
        }
        r.call(this, null)
    }
    return J(t, r),
    t
}(Et);
(function(r) {
    return yn = r,
    r
}
)(new Wa);
ve.registerPlugin(xn);
class Tn {
    constructor(t) {
        w(this, "world");
        w(this, "overlayToggleSoundImg");
        w(this, "sounds", {});
        w(this, "backgroundMusic", null);
        w(this, "menuMusic", null);
        w(this, "isSoundOn", !1);
        this.world = t,
        this.overlayToggleSoundImg = document.getElementById("overlayToggleSound");
        for (const e of Pn)
            this.sounds[e] = this.loadSound(e);
        this.menuMusic = this.createMenuMusic(),
        this.updateIsSoundOn(),
        this.overlayToggleSoundImg.onclick = ()=>this.onToggleSoundClicked()
    }
    async onToggleSoundClicked() {
        const t = this.isSoundOn ? M.Off : M.On;
        await re.set(yt.IsSoundOn, t),
        await this.updateIsSoundOn();
        const e = Sn.getAllSettingsItems().find(i=>i.storageKey === yt.IsSoundOn);
        if (e == null)
            throw new Error("Sound settings item not found");
        this.world.onSettingsItemChanged(e, t)
    }
    async onMapLoaded() {
        this.stopMenuMusic(),
        this.stopBackgroundMusic(),
        await this.updateIsSoundOn(),
        this.backgroundMusic = await this.createBackgroundMusic(),
        this.playBackgroundMusic()
    }
    async updateIsSoundOn() {
        const t = await re.getString(yt.IsSoundOn);
        this.isSoundOn = t === M.On;
        const e = this.isSoundOn ? "sound-on.svg" : "sound-off.svg";
        this.overlayToggleSoundImg.src = "/assets/svgs/" + e
    }
    async createBackgroundMusic() {
        const t = await re.getString(yt.SelectedSoundtrack);
        return se.from({
            url: "/assets/" + this.getSoundTrackSelected(t ?? M.MusicDefault),
            autoPlay: !1,
            loop: !0,
            volume: .35,
            complete: function() {}
        })
    }
    createMenuMusic() {
        return se.from({
            url: "/assets/" + jt.Brink,
            autoPlay: !1,
            loop: !0,
            volume: .2,
            complete: function() {}
        })
    }
    loadSound(t) {
        const e = "/assets/" + t;
        return se.from(e)
    }
    getSoundTrackSelected(t) {
        switch (t) {
        case M.Music1:
            return jt.Uprise;
        case M.Music2:
            return jt.Bloom;
        case M.Music3:
            return jt.Dodosynthesis;
        case M.Music4:
            return jt.Brink;
        case M.MusicDefault:
        default:
            return $i.getBackgroundMusicForCup(this.getCupIdForBackgroundMusic())
        }
    }
    playSound(t) {
        if (!this.isSoundOn)
            return;
        const e = this.sounds[t];
        if (e == null)
            throw new Error("Sound not found: " + t);
        e.volume = Tn.getVolume(t),
        e.play()
    }
    playBackgroundMusic() {
        this.isSoundOn && this.backgroundMusic != null && (this.backgroundMusic.isPlaying || this.backgroundMusic.play())
    }
    stopBackgroundMusic() {
        this.backgroundMusic != null && this.backgroundMusic.stop()
    }
    playMenuMusic() {
        this.isSoundOn && this.menuMusic != null && (this.menuMusic.isPlaying || this.menuMusic.play())
    }
    stopMenuMusic() {
        this.menuMusic != null && this.menuMusic.stop()
    }
    static getVolume(t) {
        switch (t) {
        case jt.Click:
            return .7;
        default:
            return 1
        }
    }
}
const qa = 4 / 3
  , $a = 340
  , Za = 600
  , Ya = 800
  , Ka = 600;
class In {
    constructor(t) {
        w(this, "appDiv", document.getElementById("app"));
        w(this, "renderCanvas", document.getElementById("renderCanvas"));
        w(this, "world");
        w(this, "targetWidth", 1);
        w(this, "targetHeight", 1);
        this.world = t
    }
    resizeScreenForMenu() {
        document.body.style.overflow = "auto",
        this.appDiv.style.overflow = "auto",
        Dr.isExtension() && (document.body.style.width = $a + "px",
        document.body.style.height = Za + "px")
    }
    resizeScreenForGame() {
        if (document.body.style.overflow = "hidden",
        this.appDiv.style.overflow = "hidden",
        Dr.isExtension()) {
            document.body.style.width = Ya + "px",
            document.body.style.height = Ka + "px",
            engine.resize();
            return
        }
        const t = this.renderCanvas.clientHeight
          , e = this.renderCanvas.clientWidth
          , i = t / e > this.targetHeight / this.targetWidth ? Math.min(t, this.targetHeight) / t : Math.min(e, this.targetWidth) / e
          , n = t * i
          , s = e * i;
        engine.setSize(s, n)
    }
    setResolution(t) {
        this.targetHeight = In.getHeightFromResolution(t),
        this.targetWidth = this.targetHeight * qa
    }
    static getHeightFromResolution(t) {
        switch (t) {
        case M.Resolution400:
            return 400;
        case M.Resolution600:
            return 600;
        case M.Resolution900:
            return 900;
        default:
            throw new Error(`Invalid storage value: ${t}`)
        }
    }
}
const qi = 60
  , Ja = 100
  , Qa = 72
  , tu = 35;
class hu {
    constructor(t) {
        w(this, "world");
        w(this, "currentStorageValue", null);
        w(this, "interval", null);
        w(this, "didStartAnyInterval", !1);
        w(this, "detectedFpsList", []);
        w(this, "didFpsDetectFinish", !1);
        this.world = t
    }
    startInterval() {
        if (!this.didStartAnyInterval)
            switch (this.didStartAnyInterval = !0,
            window.settings.renderLoop) {
            case M.Fixed:
                Kt.pink("Starting fixed interval"),
                this.interval = setInterval(()=>this.onRenderLoop(), 1e3 / qi),
                this.currentStorageValue = M.Fixed;
                break;
            case M.Vsync:
                Kt.pink("Starting vsync interval"),
                engine.runRenderLoop(()=>this.onRenderLoop()),
                this.currentStorageValue = M.Vsync;
                break;
            default:
                throw new Error(`Unknown renderLoop value: ${window.settings.renderLoop}`)
            }
    }
    onSettingsItemChanged(t) {
        this.currentStorageValue !== t && (this.currentStorageValue = t,
        this.currentStorageValue === M.Fixed ? this.switchToFixedInterval() : this.currentStorageValue === M.Vsync && this.switchToVsyncInterval())
    }
    onRenderLoop() {
        update.loop();
        const t = engine.getFps();
        this.detectFpsAndSwitchToFixedIntervalIfNeeded(t),
        this.world.overlayManager.updateFpsText(t)
    }
    detectFpsAndSwitchToFixedIntervalIfNeeded(t) {
        if (this.didFpsDetectFinish)
            return;
        if (this.detectedFpsList.length < Ja) {
            this.detectedFpsList.push(t);
            return
        }
        this.didFpsDetectFinish = !0;
        const e = Fn.getAverage(this.detectedFpsList);
        if (e > Qa && this.currentStorageValue === M.Vsync) {
            this.switchToFixedInterval(),
            Kt.pink("Switched to fixed interval due ot high FPS");
            return
        }
        e < tu && this.onLowFpsDetected()
    }
    switchToFixedInterval() {
        Kt.pink("switchToFixedInterval"),
        this.didStartAnyInterval && this.currentStorageValue !== M.Fixed && (engine.stopRenderLoop(),
        this.interval = setInterval(()=>this.onRenderLoop(), 1e3 / qi))
    }
    switchToVsyncInterval() {
        Kt.pink("switchToVsyncInterval"),
        this.didStartAnyInterval && this.currentStorageValue !== M.Vsync && (this.interval != null && clearInterval(this.interval),
        engine.runRenderLoop(()=>this.onRenderLoop()))
    }
}
const fu = "/assets/svgs/sound-on.svg"
  , lu = "/assets/svgs/jump_enabled.svg"
  , cu = "/assets/svgs/controls_reversed.svg"
  , du = "/assets/svgs/drift_enabled.svg";
export {su as F, fu as _, au as a, Zi as b, Hn as c, Xn as d, uu as e, Tn as f, hu as g, nu as h, ou as i, In as j, lr as k, lu as l, cu as m, du as n};
