var be = Object.defineProperty;
var Pe = (e,t,n)=>t in e ? be(e, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: n
}) : e[t] = n;
var p = (e,t,n)=>(Pe(e, typeof t != "symbol" ? t + "" : t, n),
n);
import {U as ue, C as f, A as W, M as A, a as x, P as m, N as ce, b as $e, F as g, S, c as J, d as E, L as U, W as ae, e as R, f as Be, D as b, g as se, h as Q, i as Le, R as De, j as Ae, k as v, _ as I, l as s, m as i, n as y, o as Z, p as o, q as T, r as O, s as k, t as me, u as c, v as _, w as B, x as L, y as w, z as C, B as he, E as q, G as oe, H as re, I as Ee, J as Te, K as Oe, O as Ne, Q as X} from "./index-4aa39886.js";
import {C as V} from "./CompletedMapUtils-7d481307.js";
import {S as N} from "./SkinUtils-f9a379f3.js";
import {F as Re, a as Fe, b as Ue, c as He, d as We, e as Ve, f as Ge, g as je, h as Ke, i as ze, j as Ye, k as qe, _ as Je, l as Xe, m as xe, n as Qe} from "./drift_enabled-5ab2ce45.js";
import {F as ee, A as te} from "./ApiEndpoints-6ecf6ed0.js";
import {_ as G} from "./back_arrow-cfdf76e9.js";
class ge {
    static getTextWithSymbol(t) {
        return Math.floor(t * 100) + "%"
    }
}
class $ {
    static getPercentTextFromProgress(t) {
        if (t.totalMaps == 0)
            return "NA";
        const n = t.completedMaps / t.totalMaps;
        return ge.getTextWithSymbol(n)
    }
    static getMainProgressState(t) {
        const n = $.getCupProgressDictionaryFromMapCompletionDictionary(t);
        return {
            cupProgressDictionary: n,
            diffProgressDictionary: $.getDiffProgressDictionaryFromMapCompletionDictionary(t),
            overallProgress: $.getOverallProgressFromCupProgressDictionary(n)
        }
    }
    static isUltrahardUnlocked(t) {
        return t.completedMaps / t.totalMaps >= ue
    }
    static isUltraHardAndLocked(t, n) {
        return t !== f.Ultrahard ? !1 : !$.isUltrahardUnlocked(n.overallProgress)
    }
    static getCupProgressDictionaryFromMapCompletionDictionary(t) {
        const n = {};
        for (const a of W) {
            let l = 0
              , u = 0
              , r = 0;
            const d = A.getMapListings(a);
            for (const P of d)
                l += 1,
                t[P.mapId].count > 0 && (u += 1),
                r += t[P.mapId].count * P.diff;
            n[a] = {
                totalPoints: r,
                totalMaps: l,
                completedMaps: u
            }
        }
        return n
    }
    static getOverallProgressFromCupProgressDictionary(t) {
        let n = 0
          , a = 0
          , l = 0;
        for (const u of W)
            u != f.Vault && u != f.Newcomer && u != f.Brew && (l += t[u].totalPoints,
            n += t[u].completedMaps,
            a += t[u].totalMaps);
        return {
            totalPoints: l,
            totalMaps: a,
            completedMaps: n
        }
    }
    static getDiffProgressDictionaryFromMapCompletionDictionary(t) {
        const n = [];
        for (const a of x)
            n[a] = {
                totalPoints: 0,
                totalMaps: 0,
                completedMaps: 0
            };
        for (const a of W)
            if (a != f.Vault && a != f.Newcomer && a != f.Brew)
                for (const l of A.getMapListings(a)) {
                    if (!x.includes(l.diff))
                        continue;
                    const u = t[l.mapId];
                    n[l.diff].totalPoints += u.count * l.diff,
                    n[l.diff].totalMaps += 1,
                    n[l.diff].completedMaps += u.count > 0 ? 1 : 0
                }
        return n
    }
}
class j {
    static getInitialMainState() {
        return {
            isNewcomer: !1,
            isUltrahardUnlocked: !1,
            browsingCupId: f.Newcomer,
            mapListing: null,
            mapUrl: null,
            pageId: m.Menu,
            mapCompletionDictionary: {},
            mainProgressState: {},
            skinIdsSortedByOwned: [],
            skinStateDictionary: {}
        }
    }
    static async getNewMainState(t) {
        const n = await V.getCompletionDictionary()
          , a = $.getMainProgressState(n)
          , l = await ce.isNewcomer(a)
          , u = $.isUltrahardUnlocked(a.overallProgress)
          , r = await N.getSkinStateDictionary(a)
          , d = N.getSkinIdsSorted(r);
        return {
            isNewcomer: l,
            isUltrahardUnlocked: u,
            mapCompletionDictionary: n,
            mainProgressState: a,
            skinStateDictionary: r,
            skinIdsSortedByOwned: d,
            browsingCupId: t.browsingCupId,
            pageId: t.pageId,
            mapListing: t.mapListing,
            mapUrl: t.mapUrl
        }
    }
    static getMainStateChange(t, n) {
        return {
            didGraduateNewcomer: t.isNewcomer && !n.isNewcomer,
            didUnlockUltrahardCup: !t.isUltrahardUnlocked && n.isUltrahardUnlocked,
            unlockedSkinId: j.getNewlyAddedSkin(t.skinStateDictionary, n.skinStateDictionary)
        }
    }
    static getNewlyAddedSkin(t, n) {
        for (const a of $e)
            if (t[a] != null && t[a].percent != 1 && !(n[a].percent < 1))
                return a;
        return null
    }
}
class Ze extends Re {
    constructor(n) {
        super();
        p(this, "world");
        this.world = n
    }
    onKeyDown(n) {
        switch (n.code) {
        case "KeyA":
        case "ArrowLeft":
            if (!this.isOnMenuOrGame() || this.world.isShowingPopup)
                break;
            n.preventDefault(),
            window.controls.left = !0,
            window.controls.right = !1,
            this.canNavigateCupInMenu() && this.world.changeCupByDeltaIndex(-1);
            break;
        case "KeyD":
        case "ArrowRight":
            if (!this.isOnMenuOrGame() || this.world.isShowingPopup)
                break;
            n.preventDefault(),
            window.controls.right = !0,
            window.controls.left = !1,
            this.canNavigateCupInMenu() && this.world.changeCupByDeltaIndex(1);
            break;
        case "KeyW":
        case "ArrowUp":
        case "Space":
            if (!this.isOnMenuOrGame() || this.world.isShowingPopup || this.world.mainState.pageId !== m.Game)
                break;
            n.preventDefault(),
            window.controls.space = !0,
            this.world.endingManager.onSpacePressed();
            break;
        case "KeyS":
        case "ArrowDown":
        case "ShiftLeft":
            if (!this.isOnMenuOrGame() || this.world.isShowingPopup || this.world.mainState.pageId !== m.Game)
                break;
            n.preventDefault(),
            window.controls.down = !0;
            break;
        case "KeyR":
            if (!this.isOnMenuOrGame() || this.world.isShowingPopup || !window.isMapLoaded || this.world.mainState.pageId !== m.Game)
                break;
            this.world.endingManager.onSelfDestructPressed();
            break;
        case "KeyX":
            this.onPressedKeyX();
            break
        }
    }
    onKeyUp(n) {
        if (this.isOnMenuOrGame())
            switch (n.code) {
            case "KeyA":
            case "ArrowLeft":
                window.controls.left = !1;
                break;
            case "KeyD":
            case "ArrowRight":
                window.controls.right = !1;
                break;
            case "KeyS":
            case "ArrowDown":
            case "ShiftLeft":
                if (this.world.mainState.pageId !== m.Game)
                    return;
                n.preventDefault(),
                window.controls.down = !1;
                break;
            case "KeyW":
            case "ArrowUp":
            case "Space":
                window.controls.space = !1;
                break
            }
    }
    canNavigateCupInMenu() {
        return !(this.world.mainState.pageId !== m.Menu || this.world.mainState.isNewcomer)
    }
    onPressedKeyX() {
        if (this.world.isPopupShowing()) {
            this.world.closeCurrentPopup();
            return
        }
        this.world.mainState.pageId === m.Game && window.isMapLoaded && (window.alive || this.world.overlayManager.onMenuButtonClicked())
    }
    isOnMenuOrGame() {
        switch (this.world.mainState.pageId) {
        case m.Menu:
        case m.Game:
            return !0;
        default:
            return !1
        }
    }
}
class M {
    constructor(t) {
        p(this, "world");
        this.world = t
    }
    async displayPopups() {
        (await this.displayPopupForPoints()).didShow || (await this.displayNewsPopup()).didShow
    }
    async displayNewsPopup() {
        if (this.world.mainState.mainProgressState.overallProgress.completedMaps === 0)
            return {
                didShow: !1
            };
        const t = await g.getInteger(S.LastReadNewsSimpleHash)
          , n = await ee.fetch(te.GetNews.Path, {}, !0);
        if (n == null)
            return {
                didShow: !1
            };
        if (this.world.mainState.pageId !== m.Menu)
            return {
                didShow: !1
            };
        const a = J.getSimpleHash(n.html);
        return t === a ? {
            didShow: !1
        } : (this.world.createPopupItem({
            title: "News!",
            bodyAsHtml: n.html,
            buttons: [{
                text: E,
                onClick: ()=>{
                    g.set(S.LastReadNewsSimpleHash, a)
                }
            }]
        }),
        {
            didShow: !0
        })
    }
    displayBrewCupActionBlockedPopup() {
        const t = {
            title: "Not allowed",
            bodyAsHtml: "This feature is not available for test maps in Brew Cup.",
            buttons: []
        };
        this.world.createPopupItem(t)
    }
    displayTestMapActionBlockedPopup() {
        const t = {
            title: "Not allowed",
            bodyAsHtml: "This feature is not available for maps that are being tested.",
            buttons: []
        };
        this.world.createPopupItem(t)
    }
    displayEngineFailedPopup() {
        const t = {
            title: "WebGL Error",
            bodyAsHtml: `
                <p>WebGL is required for this game. Please enable WebGL. For Chrome:</p>
                <ul>
                    <li>Copy this into your URL bar: <span style="color: orange">chrome://settings/?search=hardware</span></li>
                    <li>Turn on "Use hardware acceleration when available"</li>
                    <li>Click the "Relaunch" button</li>
                </ul>
                <img src="/assets/other/engine_error.gif" style="width: 100%" />
            `,
            buttons: [{
                text: E,
                onClick: ()=>{
                    location.reload()
                }
            }]
        };
        this.world.createPopupItem(t)
    }
    async displayPopupForPoints() {
        let t = await g.getInteger(S.NextPointPopupIndex);
        t == null && (t = 0);
        const n = this.getPointPopup(t);
        if (n == null)
            return {
                didShow: !1
            };
        const a = t + 1
          , l = {
            title: n.title,
            bodyAsHtml: n.bodyAsHtml,
            buttons: [{
                text: E,
                onClick: ()=>{
                    g.set(S.NextPointPopupIndex, a)
                }
            }]
        };
        return this.world.createPopupItem(l),
        {
            didShow: !0
        }
    }
    getPointPopup(t) {
        const n = [{
            minPoints: 10,
            title: "Discord",
            bodyAsHtml: `Join our Discord server!<br><br><a href="${U.Discord}" target="_blank">Discord Server</a>`
        }, {
            minPoints: 20,
            title: "Other games",
            bodyAsHtml: `Onionfist Studio makes more games! Check out some of our other games.<br><br>
                    Play our other games: <a href="${U.Homepage}" target="_blank">www.onionfist.com</a><br>
                    `
        }, {
            minPoints: 45,
            title: "Follow me",
            bodyAsHtml: `Follow the game creator on instagram!<br><br><a href="${U.Instagram}" target="_blank">@seojoon.y</a>`
        }, {
            minPoints: 60,
            title: "Rate Us",
            bodyAsHtml: `Wow! You completed so many levels. If you are enjoying the game, please rate our free game to help us grow.<br><br>
                    Step 1: Go to <a href="${U.IceDodoOnWebstore}" target="_blank">the web store</a><br>
                    Step 2: Click on "Reviews"
                    Step 3: Click on "Write a review"
                    `
        }, {
            minPoints: 75,
            title: "Hmmm",
            bodyAsHtml: `Best instagram account on earth<br><br><a href="${U.Instagram}" target="_blank">@seojoon.y</a>`
        }, {
            minPoints: 90,
            title: "Make Maps",
            bodyAsHtml: `You can make your own Ice Dodo level. It is easier than you think!<br><br>
                    Make your first map: <a href="${U.MapMakingTutorial}" target="_blank">Map making guide</a><br>
                    `
        }];
        if (t >= n.length)
            return null;
        const a = this.world.mainState.mainProgressState.overallProgress.totalPoints
          , l = n[t];
        return a < l.minPoints ? null : l
    }
    static createMultiplayerPopupItem() {
        return {
            title: "Multiplayer",
            bodyAsHtml: "Race against your friends in real-time!",
            buttons: [{
                text: "Play online",
                onClick: ()=>{
                    window.open(ae + "/multiplayer", "_blank")
                }
            }]
        }
    }
    static createSyncPopupItem() {
        return {
            title: "Sync",
            bodyAsHtml: "Sync data across extension and website. You can also sync your data across devices using the cloud.",
            buttons: [{
                text: "Go to sync",
                onClick: ()=>{
                    window.open(ae + "/sync", "_blank")
                }
            }]
        }
    }
    static createWebsiteOnlyPopupItem(t, n) {
        return {
            title: `Online ${n}`,
            bodyAsHtml: `This ${n} is only available online. Proceed to the website?`,
            buttons: [{
                text: "Cancel",
                onClick: ()=>{}
            }, {
                text: "Yep! I want to play",
                onClick: ()=>V.openMapListingInWebsite(t)
            }]
        }
    }
    static createBrewOpenOnWebsitePopupItem(t) {
        return {
            title: "Play on web",
            bodyAsHtml: `${t.name} is only available online because it is an experimental map in Brew Cup. Proceed to the website?`,
            buttons: [{
                text: "Cancel",
                onClick: ()=>{}
            }, {
                text: "Yep! I want to play",
                onClick: ()=>V.openBrewListingInWebsite(t)
            }]
        }
    }
    static createBrewPopupItem() {
        return {
            title: "Brewing maps",
            bodyAsHtml: "Maps brewing in the map development pool.<br><br>Test out a map before it is officially added to the game! You can play now but the level completions will not be saved.<br><br>Now choose a map to play!",
            buttons: []
        }
    }
    static createBrewMapCompleteNotSavedPopupItem() {
        return {
            title: "Not saved",
            bodyAsHtml: "You completed this map but the completion will not be saved because this is a test map in Brew Cup.",
            buttons: []
        }
    }
    static createUltraHardLockedPopupItem(t, n) {
        return {
            title: "Ultrahard",
            bodyAsHtml: `
                For your own safety, this ultrahard ${n} is locked for now.
                <br><br>
                Complete ${ge.getTextWithSymbol(ue)} of all maps to unlock ultrahard maps. Your progress: ${$.getPercentTextFromProgress(t.overallProgress)}
            `,
            buttons: [{
                text: E,
                onClick: ()=>{}
            }]
        }
    }
    static createEpilepsyWarningPopup(t) {
        return {
            title: "Epilepsy",
            bodyAsHtml: `
                Please be warned that this map contains flashing lights and could be harmful to people with photosensitive epilepsy.
            `,
            buttons: [{
                text: "Play",
                onClick: t
            }, {
                text: "Cancel",
                onClick: ()=>{}
            }, {
                text: "I have no epilepsy",
                onClick: async()=>{
                    await g.set(S.DoesUserHaveEpilepsy, R.No),
                    t()
                }
            }]
        }
    }
    static createInGameHelpPopupItem() {
        return {
            title: "How to Play",
            bodyAsHtml: `
                Use the arrow keys to move.<br>
                Hit the green portal to win.<br>
                Do not fall off or hit the spikes.<br>
                <img style="width: 140px;" src="/assets/icons/controls.png" alt="controls">
                <br><br>
                In-game keyboard shortcuts:
                <ul>
                    <li>Left, right = Turning</li>
                    <li>Up = Jumping (when enabled)</li>
                    <li>Down = Drifting (when enabled)</li>
                    <li>R = Self destruct</li>
                </ul>
                Death / win screen keyboard shortcuts:
                <ul>
                    <li>X = Back to menu</li>
                    <li>Spacebar = respawn</li>
                </ul>
                `,
            buttons: []
        }
    }
    static createSpeedrunPopupItem(t, n) {
        return {
            title: "Speedrun",
            bodyAsHtml: `
                You got a new speedrun time! (${n - t})<br>
                Previous time: ${t}<br>
                New time: ${n}
            `,
            buttons: []
        }
    }
}
class z {
    static newcomerGraduation() {
        return {
            title: "Congrats!",
            bodyAsHtml: `
                You completed ${Be} maps in the game!
                <br><br>
                All maps and cups are unlocked. Go to the menu to check it out!`,
            buttons: []
        }
    }
    static ultrahardUnlocked() {
        return {
            title: "Congrats!",
            bodyAsHtml: `
                You unlocked the ultrahard cup!! This is a super rare achievement.`,
            buttons: []
        }
    }
    static skinUnlocked(t) {
        return {
            title: "New Skin!",
            bodyAsHtml: `
                You unlocked a new skin:
                <br>
                <img src="${N.getSkinImageSrc(t)}" style="width: 100%; height: auto;"/>
                <br><br>
                Go to the skin tab to equip it!`,
            buttons: []
        }
    }
    static lowFpsDetected() {
        return {
            title: "Low FPS",
            bodyAsHtml: `
                Your FPS is too low. Tips to increase FPS:
                <ul>
                    <li>If using Chrome: Turn off Energy Saver</li>
                    <li>Close other tabs</li>
                    ${b.isExtension() ? "" : "<li>Use 400P resolution, in game settings.</li>"}
                </ul>
                `,
            buttons: []
        }
    }
}
class ne extends Fe {
    constructor(n) {
        super();
        p(this, "world");
        p(this, "endingDiv", document.getElementById("ending"));
        p(this, "endingMainTextDiv", document.getElementById("endingMainText"));
        p(this, "endingMenuButtonDivs", Array.from(document.querySelectorAll(".endingMenuButton")));
        p(this, "endingDeathRestartButtonDiv", document.getElementById("endingDeathRestartButton"));
        p(this, "endingWinRestartButtonDiv", document.getElementById("endingWinRestartButton"));
        p(this, "endingNextMapButtonDiv", document.getElementById("endingNextMapButton"));
        p(this, "endingDeathInfoDiv", document.getElementById("endingDeathInfo"));
        p(this, "endingWinInfoDiv", document.getElementById("endingWinInfo"));
        p(this, "endingHelpDiv", document.getElementById("endingHelp"));
        p(this, "endingTimeDiv", document.getElementById("endingTime"));
        p(this, "didWin", !1);
        p(this, "showedEndingAtMs", 0);
        this.world = n,
        this.endingDeathRestartButtonDiv.onclick = ()=>this.onRestartButtonClicked(),
        this.endingWinRestartButtonDiv.onclick = ()=>this.onRestartButtonClicked();
        for (const a of this.endingMenuButtonDivs)
            a.onclick = ()=>this.world.overlayManager.onMenuButtonClicked();
        this.endingNextMapButtonDiv.onclick = ()=>this.onNextMapButtonClicked(),
        this.endingDeathInfoDiv.onclick = ()=>this.onInfoButtonClicked(),
        this.endingWinInfoDiv.onclick = ()=>this.onInfoButtonClicked(),
        this.endingHelpDiv.onclick = ()=>this.onHelpButtonClicked()
    }
    onMapLoaded() {
        this.writeMapAndMakerName(this.getCupId())
    }
    getCupId() {
        return this.world.mainState == null ? f.Brew : this.world.mainState.mapListing == null ? f.Brew : this.world.mainState.mapListing.cupId
    }
    async onDeath(n) {
        if (!window.isMapLoaded)
            return;
        this.showEnding(!1),
        this.world.overlayManager.hideInGameMessage(),
        this.endingMainTextDiv.innerText = n,
        this.endingMainTextDiv.style.color = se.Red,
        this.world.soundPlayer.stopBackgroundMusic(),
        this.world.soundPlayer.playSound(Q.Death);
        const a = await this.getShouldDisplayJumpEnabledPopup();
        a && this.displayJumpEnabledPopup();
        const l = await this.getShouldDisplayDriftEnabledPopup();
        l && this.displayDriftEnabledPopup();
        const u = a || l;
        window.sponsorManager != null && window.sponsorManager.onDeath();
        const {didStartPreroll: r} = window.bagManager == null ? {
            didStartPreroll: !1
        } : window.bagManager.videoBagManager.onDeath()
          , {didAutoRestart: d} = await this.autoRestartOnDeath(r, u);
        !d && window.bagManager != null && window.bagManager.reloadManager.reloadDisplayBags(!0)
    }
    async autoRestartOnDeath(n, a) {
        return n ? {
            didAutoRestart: !1
        } : a ? {
            didAutoRestart: !1
        } : this.world.mainState == null ? {
            didAutoRestart: !1
        } : await g.getString(S.IsAutoRestartOn) !== R.On ? {
            didAutoRestart: !1
        } : this.world.mainState.pageId !== m.Game ? {
            didAutoRestart: !1
        } : (this.onRestartButtonClicked(),
        {
            didAutoRestart: !0
        })
    }
    async onWin() {
        if (!window.isMapLoaded)
            return;
        if (this.showEnding(!0),
        this.endingMainTextDiv.innerText = "Map Complete",
        this.endingMainTextDiv.style.color = se.Green,
        this.world.soundPlayer.stopBackgroundMusic(),
        this.world.soundPlayer.playSound(Q.LevelComplete),
        this.world.mainState == null || this.world.mainState.mapListing == null) {
            this.world.createPopupItem(M.createBrewMapCompleteNotSavedPopupItem());
            return
        }
        const n = this.world.mainState.mapListing.mapId
          , a = this.world.mainState.mapCompletionDictionary[n].time
          , l = window.score;
        await V.onMapCompleted(n, l);
        const u = await this.world.reloadMainState();
        this.world.overlayManager.updateBestTime();
        const r = this.getWinPopupItem(u, a, l);
        r != null && this.world.createPopupItem(r),
        window.bagManager != null && window.bagManager.videoBagManager.onWin()
    }
    getWinPopupItem(n, a, l) {
        return n.didGraduateNewcomer ? z.newcomerGraduation() : n.didUnlockUltrahardCup ? z.ultrahardUnlocked() : n.unlockedSkinId != null ? z.skinUnlocked(n.unlockedSkinId) : ne.isNewSpeedrun(a, l) ? M.createSpeedrunPopupItem(a, l) : null
    }
    static isNewSpeedrun(n, a) {
        return n == 1 / 0 ? !1 : a < n
    }
    async getShouldDisplayDriftEnabledPopup() {
        return !(this.world.mainState == null || this.world.mainState.mapListing == null || this.world.overlayManager.mapIdWithControlChangeEndingPopup === this.world.mainState.mapListing.mapId || !this.world.overlayManager.didEncounterDriftRegion || await g.getString(S.DoNotShowDriftEnabledPopupAgain) === R.On)
    }
    displayDriftEnabledPopup() {
        this.world.mainState == null || this.world.mainState.mapListing == null || (this.world.overlayManager.mapIdWithControlChangeEndingPopup = this.world.mainState.mapListing.mapId,
        this.world.createPopupItem({
            title: "Drifting Map",
            bodyAsHtml: "You can drift in some parts of this map. Hold shift to drift around corners.",
            buttons: [{
                text: E,
                onClick: ()=>{}
            }, {
                text: "Don't show again",
                onClick: ()=>{
                    g.set(S.DoNotShowDriftEnabledPopupAgain, R.On)
                }
            }]
        }))
    }
    async getShouldDisplayJumpEnabledPopup() {
        return !(this.world.mainState == null || this.world.mainState.mapListing == null || this.world.overlayManager.mapIdWithControlChangeEndingPopup === this.world.mainState.mapListing.mapId || !this.world.overlayManager.didEncounterJumpRegion || await g.getString(S.DoNotShowJumpEnabledPopupAgain) === R.On)
    }
    displayJumpEnabledPopup() {
        if (this.world.mainState == null || this.world.mainState.mapListing == null)
            return !1;
        this.world.overlayManager.mapIdWithControlChangeEndingPopup = this.world.mainState.mapListing.mapId,
        this.world.createPopupItem({
            title: "Jumping Map",
            bodyAsHtml: "You can jump in some parts of this map. Press spacebar to jump.",
            buttons: [{
                text: E,
                onClick: ()=>{}
            }, {
                text: "Don't show again",
                onClick: ()=>{
                    g.set(S.DoNotShowJumpEnabledPopupAgain, R.On)
                }
            }]
        })
    }
    onSpacePressed() {
        window.alive || (this.didWin ? this.onNextMapButtonClicked() : this.onRestartButtonClicked())
    }
    showEnding(n) {
        this.showedEndingAtMs = Date.now(),
        this.didWin = n,
        this.endingDiv.style.display = "flex",
        this.endingTimeDiv.innerText = "Time: " + window.score.toString();
        const a = n ? "endingWinActions" : "endingDeathActions"
          , l = n ? "endingDeathActions" : "endingWinActions"
          , u = document.getElementById(a)
          , r = document.getElementById(l);
        u.style.display = "inline-flex",
        r.style.display = "none",
        this.world.overlayManager.hideAllSigns(),
        this.world.overlayManager.onEndingScreenShow()
    }
    hideEnding() {
        this.endingDiv.style.display = "none",
        this.world.overlayManager.onEndingScreenHide()
    }
    onHelpButtonClicked() {
        this.world.createPopupItem(M.createInGameHelpPopupItem())
    }
    onRestartButtonClicked() {
        window.alive || (this.hideEnding(),
        change_state.spawn(),
        this.world.soundPlayer.playBackgroundMusic(),
        this.world.overlayManager.onMapLoaded(),
        this.world.playerManager.driftManager.onRestart())
    }
    async onNextMapButtonClicked() {
        this.canChangePageOrMap() && (await this.startChangingPageOrMap(),
        !(this.world.mainState == null || this.world.mainState.mapListing == null) && this.world.onClickMap(A.getNextMapListing(this.world.mainState.mapListing, b.isExtension())))
    }
    async onInfoButtonClicked() {
        if (!this.canChangePageOrMap() || (await this.startChangingPageOrMap(),
        this.world.mainState == null || this.world.mainState.mapListing == null))
            return;
        const n = "?mapId=" + this.world.mainState.mapListing.mapId;
        Le.goToRoute(De.Info, n)
    }
    canChangePageOrMap() {
        return window.alive || !window.isMapLoaded || this.world.overlayManager.isLoadingScreenVisible() ? !1 : this.world.isBrewCupMap() ? (this.world.popupManager.displayBrewCupActionBlockedPopup(),
        !1) : !(Date.now() - this.showedEndingAtMs < 200)
    }
    startChangingPageOrMap() {
        return this.hideEnding(),
        this.world.overlayManager.showLoadingScreen(),
        this.world.objectManager.onCleanup(),
        J.getSmallDelay()
    }
}
class et extends Ue {
    constructor(n) {
        super(n);
        p(this, "driftManager");
        p(this, "moveManager");
        this.driftManager = new He(n,this),
        this.moveManager = new We(n,this)
    }
    onFrame() {
        super.onFrame()
    }
}
class tt extends Ve {
    constructor(n) {
        super();
        p(this, "world");
        p(this, "overlayBestTimeDiv", document.getElementById("overlayBestTime"));
        p(this, "overlayMenuButtonDiv", document.getElementById("overlayMenuButton"));
        this.world = n,
        this.overlayMenuButtonDiv.onclick = ()=>this.onMenuButtonClicked()
    }
    onFrame() {
        this.updateCurrentTime()
    }
    onMapLoaded() {
        super.onMapLoaded(),
        this.updateBestTime()
    }
    updateBestTime() {
        if (this.world.mainState.mapListing == null)
            return;
        const n = this.world.mainState.mapListing.mapId
          , a = this.world.mainState.mapCompletionDictionary[n];
        this.overlayBestTimeDiv.innerText = a.count === 0 ? "" : "BEST: " + a.time
    }
    onEndingScreenShow() {
        this.overlayCurrentTimeDiv.style.visibility = "hidden",
        this.overlayBestTimeDiv.style.visibility = "hidden",
        this.overlayMapNameDiv.style.visibility = "hidden",
        this.overlayFpsDiv.style.visibility = "hidden"
    }
    onEndingScreenHide() {
        this.overlayCurrentTimeDiv.style.visibility = "visible",
        this.overlayBestTimeDiv.style.visibility = "visible",
        this.overlayMapNameDiv.style.visibility = "visible",
        this.overlayFpsDiv.style.visibility = "visible"
    }
    async onMenuButtonClicked() {
        if (window.isMapLoaded && !this.isLoadingScreenVisible()) {
            if (this.world.isTestingMap()) {
                this.world.popupManager.displayTestMapActionBlockedPopup();
                return
            }
            this.showLoadingScreen(),
            this.world.endingManager.hideEnding(),
            this.world.soundPlayer.stopBackgroundMusic(),
            this.world.soundPlayer.playMenuMusic(),
            this.world.objectManager.onCleanup(),
            await J.getSmallDelay(),
            this.world.returnToMenuFromGame()
        }
    }
}
class nt extends Ge {
    constructor(n) {
        super(n);
        p(this, "singleWorld");
        this.singleWorld = n
    }
    onSettingsItemChanged(n) {
        this.isSoundOn = n === R.On,
        this.singleWorld.mainState.pageId === m.Game ? this.isSoundOn ? this.playBackgroundMusic() : this.stopBackgroundMusic() : this.isSoundOn ? this.playMenuMusic() : this.stopMenuMusic()
    }
    getCupIdForBackgroundMusic() {
        return this.singleWorld.mainState.mapListing == null ? this.singleWorld.mainState.browsingCupId : this.singleWorld.mainState.mapListing.cupId
    }
}
class it extends je {
    constructor(n) {
        super(n);
        p(this, "singleWorld");
        this.singleWorld = n
    }
    onLowFpsDetected() {
        this.singleWorld.createPopupItem(z.lowFpsDetected())
    }
}
class at extends Ke {
    constructor(n, a, l, u, r, d, P, h) {
        super();
        p(this, "createPopupItem");
        p(this, "returnToMenuFromGame");
        p(this, "changeCupByDeltaIndex");
        p(this, "onClickMap");
        p(this, "reloadMainState");
        p(this, "isPopupShowing");
        p(this, "closeCurrentPopup");
        p(this, "inputManager");
        p(this, "endingManager");
        p(this, "soundPlayer");
        p(this, "overlayManager");
        p(this, "globalManager");
        p(this, "intervalManager");
        p(this, "popupManager");
        p(this, "playerManager");
        p(this, "objectManager");
        p(this, "resolutionManager");
        p(this, "isShowingPopup", !1);
        p(this, "mainState");
        this.mainState = n,
        this.createPopupItem = a,
        this.changeCupByDeltaIndex = u,
        this.returnToMenuFromGame = l,
        this.onClickMap = r,
        this.reloadMainState = d,
        this.isPopupShowing = P,
        this.closeCurrentPopup = h,
        this.inputManager = new Ze(this),
        this.endingManager = new ne(this),
        this.soundPlayer = new nt(this),
        this.overlayManager = new tt(this),
        this.globalManager = new Ae(this),
        this.popupManager = new M(this),
        this.playerManager = new et(this),
        this.objectManager = new ze(this),
        this.intervalManager = new it(this),
        this.resolutionManager = new Ye(this),
        this.asyncInit()
    }
    async playMap(n) {
        var a;
        this.mainState = n,
        await qe.loadMap(((a = this.mainState.mapListing) == null ? void 0 : a.mapId) ?? null, this.mainState.mapUrl),
        await this.onMapLoaded()
    }
    setMainState(n) {
        this.mainState = n
    }
    setIsShowingPopup(n) {
        this.isShowingPopup = n
    }
    displayEngineFailedPopup() {
        this.popupManager.displayEngineFailedPopup()
    }
    isBrewCupMap() {
        return this.mainState == null ? !1 : this.mainState.mapUrl != null
    }
    isTestingMap() {
        return this.mainState == null || this.mainState.mapUrl == null ? !1 : !this.mainState.mapUrl.includes("cdn.discordapp.com/attachments")
    }
    onLoaded() {}
}
const st = v({
    props: {
        mainState: {
            type: Object,
            required: !0
        }
    },
    data() {
        return {
            isExtension: b.isExtension()
        }
    },
    methods: {
        onClickFullScreen() {
            V.openMapListingInWebsite(this.mainState.mapListing)
        }
    }
})
  , ot = "/assets/svgs/fullscreen.svg"
  , rt = "/assets/svgs/arrow-left.svg"
  , we = "/assets/svgs/help.svg"
  , le = "/assets/svgs/info.svg";
const K = e=>(T("data-v-31fa11aa"),
e = e(),
O(),
e)
  , lt = {
    id: "gameMain"
}
  , dt = K(()=>i("canvas", {
    id: "renderCanvas"
}, null, -1))
  , pt = {
    id: "overlay"
}
  , ut = K(()=>i("div", {
    id: "overlayLoadingScreen"
}, [i("h1", {
    class: "textLarge"
}, "Loading map ...")], -1))
  , ct = Z('<img id="overlayToggleSound" class="hoverGrow noDrag" src="' + Je + '" data-v-31fa11aa><img id="overlayMenuButton" class="hoverGrow noDrag" src="' + rt + '" data-v-31fa11aa><div id="overlayCurrentTime" class="textLarge overlayTime" data-v-31fa11aa>TIME: ??</div><div id="overlayBestTime" class="textLarge overlayTime" data-v-31fa11aa>BEST: ??</div><div id="overlayMapName" class="textLarge" data-v-31fa11aa>??</div><div id="overlayFps" class="textLarge" data-v-31fa11aa>?? FPS</div><div id="overlayInGameMessage" data-v-31fa11aa>??</div><div id="overlayControlChangeContainer" data-v-31fa11aa><div class="overlayControlChangeItem" id="overlayJumpEnabled" data-v-31fa11aa><h1 class="textLarge" data-v-31fa11aa>JUMP ENABLED</h1><img src="' + Xe + '" data-v-31fa11aa></div><div class="overlayControlChangeItem" id="overlayControlsReversed" data-v-31fa11aa><h1 class="textLarge" data-v-31fa11aa>CONTROLS REVERSED</h1><img src="' + xe + '" data-v-31fa11aa></div><div class="overlayControlChangeItem" id="overlayDriftEnabled" data-v-31fa11aa><h1 class="textLarge" data-v-31fa11aa>DRIFT ENABLED</h1><img src="' + Qe + '" data-v-31fa11aa></div></div>', 8)
  , mt = {
    id: "ending"
}
  , ht = Z('<div class="endingSpacer" data-v-31fa11aa></div><h1 id="endingMakerName" class="textLarge" data-v-31fa11aa>??</h1><div id="endingGradientStripe" data-v-31fa11aa><h1 id="endingMapName" class="textLarge" data-v-31fa11aa>??</h1><h1 id="endingMainText" class="textLarge" data-v-31fa11aa>You won!</h1></div><div id="endingTime" class="textArial" data-v-31fa11aa>TIME: ??</div><div id="endingDeathActions" data-v-31fa11aa><img id="endingHelp" class="endingIcon hoverGrow" src="' + we + '" data-v-31fa11aa><div class="endingMenuButton buttonLarge noHighlight" data-v-31fa11aa>Menu [X]</div><div id="endingDeathRestartButton" class="buttonLarge noHighlight" data-v-31fa11aa>Restart [_]</div><img id="endingDeathInfo" class="endingIcon hoverGrow" src="' + le + '" data-v-31fa11aa></div><div id="endingWinActions" data-v-31fa11aa><div class="endingMenuButton buttonLarge noHighlight" data-v-31fa11aa>Menu [X]</div><div id="endingWinRestartButton" class="buttonLarge noHighlight" data-v-31fa11aa>Play Again</div><div id="endingNextMapButton" class="buttonLarge noHighlight" data-v-31fa11aa>Next [_]</div><img id="endingWinInfo" class="endingIcon hoverGrow" src="' + le + '" data-v-31fa11aa></div>', 6)
  , gt = {
    key: 0,
    class: "textArial"
}
  , wt = K(()=>i("span", {
    id: "sponsorName"
}, null, -1))
  , yt = K(()=>i("a", {
    id: "sponsorInquiryLink",
    class: "clickableText",
    href: "https://docs.google.com/document/d/e/2PACX-1vQzn2YZMyUGC8-kHo7hpcfT_haHklJEuIO4FVR7wrcXvvcOyRPVkv7DAYkHt-8nIyh5IdwTt0r2RgF3/pub",
    target: "_blank"
}, "Interested in sponsoring?", -1))
  , St = [wt, yt]
  , Ct = K(()=>i("div", {
    id: "endingHorizontalBag",
    class: "bagSpace bagSpaceHorizontal"
}, null, -1));
function ft(e, t, n, a, l, u) {
    return o(),
    s("main", lt, [dt, i("div", pt, [ut, e.isExtension ? (o(),
    s("img", {
        key: 0,
        id: "overlayFullScreen",
        class: "hoverGrow noDrag",
        src: ot,
        onClick: t[0] || (t[0] = (...r)=>e.onClickFullScreen && e.onClickFullScreen(...r))
    })) : y("", !0), ct]), i("div", mt, [ht, e.isExtension ? (o(),
    s("h1", gt, St)) : y("", !0), Ct])])
}
const vt = I(st, [["render", ft], ["__scopeId", "data-v-31fa11aa"]])
  , It = v({
    props: {
        mapListing: {
            type: Object,
            required: !0
        },
        mainState: {
            type: Object,
            required: !0
        }
    },
    data() {
        return {
            colorClass: this.getColorClass()
        }
    },
    watch: {
        mainState: {
            handler() {
                this.colorClass = this.getColorClass()
            },
            deep: !0
        }
    },
    methods: {
        async onClickMap(e) {
            if (k.isOnlyOnWebsite(e.cupId, b.isExtension())) {
                this.$emit("createPopupItem", M.createWebsiteOnlyPopupItem(e, "map"));
                return
            }
            if ($.isUltraHardAndLocked(e.cupId, this.mainState.mainProgressState)) {
                this.$emit("createPopupItem", M.createUltraHardLockedPopupItem(this.mainState.mainProgressState, "map"));
                return
            }
            if (await me.shouldDisplayEpilepsyWarning(e.mapId)) {
                this.$emit("createPopupItem", M.createEpilepsyWarningPopup(()=>this.openMap(e)));
                return
            }
            this.openMap(e)
        },
        openMap(e) {
            this.$emit("onClickMap", e)
        },
        getColorClass() {
            if (!this.mainState.isUltrahardUnlocked && this.mapListing.cupId === f.Ultrahard)
                return "colorRed";
            if (this.isBetweenIncluding(this.mainState.mapCompletionDictionary[this.mapListing.mapId].count, 0, 0))
                return "done_z";
            if (this.isBetweenIncluding(this.mainState.mapCompletionDictionary[this.mapListing.mapId].count, 1, 1))
                return "done_a";
            if (this.isBetweenIncluding(this.mainState.mapCompletionDictionary[this.mapListing.mapId].count, 2, 2))
                return "done_b";
            if (this.isBetweenIncluding(this.mainState.mapCompletionDictionary[this.mapListing.mapId].count, 3, 9))
                return "done_c";
            if (this.isBetweenIncluding(this.mainState.mapCompletionDictionary[this.mapListing.mapId].count, 10, 99))
                return "done_d";
            if (this.isBetweenIncluding(this.mainState.mapCompletionDictionary[this.mapListing.mapId].count, 100, 999))
                return "done_e";
            if (this.isBetweenIncluding(this.mainState.mapCompletionDictionary[this.mapListing.mapId].count, 1e3, 1 / 0))
                return "done_f";
            throw new Error("Invalid map completion count")
        },
        isBetweenIncluding(e, t, n) {
            return e >= t && e <= n
        }
    },
    async mounted() {}
});
const kt = e=>(T("data-v-2dc2a0c5"),
e = e(),
O(),
e)
  , Mt = {
    class: "mapListingName"
}
  , _t = {
    class: "mapListingDescription"
}
  , bt = kt(()=>i("span", null, " - ", -1))
  , Pt = {
    key: 0
}
  , $t = {
    key: 1
}
  , Bt = {
    key: 2
}
  , Lt = {
    key: 3
};
function Dt(e, t, n, a, l, u) {
    return o(),
    s("main", null, [i("div", {
        class: _(e.colorClass + " mapListing noHighlight"),
        onClick: t[0] || (t[0] = ()=>e.onClickMap(e.mapListing))
    }, [i("h2", Mt, c(e.mapListing.name), 1), i("p", _t, [i("span", null, "Difficulty: " + c(e.mapListing.diff), 1), bt, e.mainState.mapCompletionDictionary[e.mapListing.mapId].count === 0 ? (o(),
    s("span", Pt, "Click to play")) : e.mainState.mapCompletionDictionary[e.mapListing.mapId].count === 1 ? (o(),
    s("span", $t, "Completed")) : e.mainState.mapCompletionDictionary[e.mapListing.mapId].count === 2 ? (o(),
    s("span", Bt, "Completed Twice")) : e.mainState.mapCompletionDictionary[e.mapListing.mapId].count >= 3 ? (o(),
    s("span", Lt, "Completed " + c(e.mainState.mapCompletionDictionary[e.mapListing.mapId].count) + " times", 1)) : y("", !0)])], 2)])
}
const ye = I(It, [["render", Dt], ["__scopeId", "data-v-2dc2a0c5"]])
  , At = v({
    data() {
        return {
            isStickyVisible: !1,
            stickyHtml: ""
        }
    },
    methods: {
        onClickHideButton() {
            this.isStickyVisible = !1
        }
    },
    async mounted() {
        const e = await ee.fetch(te.GetSticky.Path, {}, !0);
        e != null && e.html != "none" && (this.stickyHtml = e.html,
        this.isStickyVisible = !0)
    }
})
  , Se = "/assets/svgs/cross.svg";
const Et = {
    key: 0,
    class: "stickyMain"
}
  , Tt = ["innerHTML"];
function Ot(e, t, n, a, l, u) {
    return e.isStickyVisible ? (o(),
    s("main", Et, [i("div", {
        class: "stickyContents htmlContents",
        innerHTML: e.stickyHtml
    }, null, 8, Tt), i("img", {
        class: "hideButton hoverGrow noDrag",
        onClick: t[0] || (t[0] = (...r)=>e.onClickHideButton && e.onClickHideButton(...r)),
        src: Se
    })])) : y("", !0)
}
const Nt = I(At, [["render", Ot], ["__scopeId", "data-v-92828c32"]])
  , Rt = v({
    props: {
        brewListing: {
            type: Object,
            required: !0
        }
    },
    data() {
        return {}
    },
    methods: {
        async onClickMap(e) {
            if (b.isExtension()) {
                this.$emit("createPopupItem", M.createBrewOpenOnWebsitePopupItem(e));
                return
            }
            this.openMap(e)
        },
        openMap(e) {
            const t = this.brewListing.jsUrl;
            this.$emit("onClickMap", null, t)
        }
    },
    async mounted() {}
});
const Ft = e=>(T("data-v-2e7fa0b3"),
e = e(),
O(),
e)
  , Ut = {
    class: "mapListingName"
}
  , Ht = {
    class: "mapListingDescription"
}
  , Wt = Ft(()=>i("span", null, " - ", -1));
function Vt(e, t, n, a, l, u) {
    return o(),
    s("main", null, [i("div", {
        class: "mapListing noHighlight done_z",
        onClick: t[0] || (t[0] = ()=>e.onClickMap(e.brewListing))
    }, [i("h2", Ut, c(e.brewListing.name), 1), i("p", Ht, [i("span", null, "Difficulty: " + c(e.brewListing.diff), 1), Wt, i("span", null, "Cup: " + c(e.brewListing.expectedCup), 1)])])])
}
const Gt = I(Rt, [["render", Vt], ["__scopeId", "data-v-2e7fa0b3"]])
  , jt = v({
    props: {
        mainState: {
            type: Object,
            required: !0
        }
    },
    data() {
        return {
            cupName: "",
            cupImageUrl: "",
            brewLoadText: "Loading brew maps ...",
            mapListings: [],
            brewListings: [],
            isWebsiteOnlyCup: !1,
            PageIdEnum: m,
            ProgressUtils: $,
            LinkEnum: U,
            CupIdEnum: f
        }
    },
    methods: {
        onClickChangeCup(e) {
            this.$emit("changeCupByDeltaIndex", e)
        },
        onClickMap(e, t) {
            this.$emit("onClickMap", e, t)
        },
        changePageId(e) {
            this.$emit("changePageId", e)
        },
        createPopupItem(e) {
            this.$emit("createPopupItem", e)
        },
        isBetweenIncluding(e, t, n) {
            return e >= t && e <= n
        },
        async onClickPlayButton() {
            if (this.mainState.browsingCupId === f.Brew) {
                this.createPopupItem(M.createBrewPopupItem());
                return
            }
            const e = A.getNextMapListingToPlayInCup(this.mainState.browsingCupId, this.mainState.mapCompletionDictionary, b.isExtension());
            if (k.isOnlyOnWebsite(this.mainState.browsingCupId, b.isExtension())) {
                this.createPopupItem(M.createWebsiteOnlyPopupItem(e, "cup"));
                return
            }
            if ($.isUltraHardAndLocked(this.mainState.browsingCupId, this.mainState.mainProgressState)) {
                this.createPopupItem(M.createUltraHardLockedPopupItem(this.mainState.mainProgressState, "cup"));
                return
            }
            if (await me.shouldDisplayEpilepsyWarning(e.mapId)) {
                this.$emit("createPopupItem", M.createEpilepsyWarningPopup(()=>this.onClickMap(e)));
                return
            }
            this.onClickMap(e)
        },
        onClickMultiplayer() {
            b.isExtension() ? this.createPopupItem(M.createMultiplayerPopupItem()) : window.location.href = "/multiplayer"
        },
        onClickSync() {
            b.isExtension() ? this.createPopupItem(M.createSyncPopupItem()) : window.location.href = "/sync"
        },
        onClickNewcomerHelpButton() {
            this.createPopupItem(ce.createNewcomerHelpPopupItem(this.mainState.mainProgressState))
        },
        async getBrewListings() {
            const e = {}
              , t = await ee.fetch(te.GetBrewListings.Path, e, !0);
            if (t == null) {
                this.brewLoadText = "Failed to load brew maps";
                return
            }
            this.brewListings = t.brewListings,
            this.brewLoadText = ""
        }
    },
    watch: {
        mainState: {
            handler: function(e, t) {
                this.cupName = k.getCupName(e.browsingCupId),
                this.cupImageUrl = k.getCupSkinUrl(e.browsingCupId),
                this.mapListings = A.getMapListings(e.browsingCupId),
                this.isWebsiteOnlyCup = k.isOnlyOnWebsite(e.browsingCupId, b.isExtension())
            },
            deep: !0
        }
    },
    async mounted() {
        this.cupName = k.getCupName(this.mainState.browsingCupId),
        this.cupImageUrl = k.getCupSkinUrl(this.mainState.browsingCupId),
        this.mapListings = A.getMapListings(this.mainState.browsingCupId),
        this.isWebsiteOnlyCup = k.isOnlyOnWebsite(this.mainState.browsingCupId, b.isExtension()),
        this.getBrewListings()
    },
    components: {
        VMapListing: ye,
        VSticky: Nt,
        VBrewListing: Gt
    }
})
  , Kt = "/assets/svgs/skins.svg"
  , zt = "/assets/svgs/finder.svg"
  , Yt = "/assets/svgs/settings.svg"
  , qt = "/assets/svgs/multiplayer.svg"
  , Jt = "/assets/svgs/sync.svg"
  , Xt = "/assets/svgs/caret-left-fill.svg"
  , xt = "/assets/svgs/caret-right-fill.svg"
  , Qt = "/assets/icons/discord.svg"
  , Zt = "/assets/icons/instagram.svg";
const D = e=>(T("data-v-c2338e83"),
e = e(),
O(),
e)
  , en = {
    class: "menuMain"
}
  , tn = {
    class: "pageNav noHighlight"
}
  , nn = {
    class: "cupArea noHighlight"
}
  , an = ["src"]
  , sn = {
    class: "topAreaContents"
}
  , on = D(()=>i("div", {
    class: "topAreaSpacerRow"
}, null, -1))
  , rn = {
    class: "topAreaUpperRow"
}
  , ln = {
    class: "cupName"
}
  , dn = {
    key: 0,
    class: "isWebsiteOnlyCup"
}
  , pn = {
    class: "topAreaMiddleRow"
}
  , un = D(()=>i("div", {
    class: "topAreaSpacerColumn"
}, null, -1))
  , cn = {
    key: 0,
    class: "cupChangeArrowContainer"
}
  , mn = {
    class: "mainPlayButtonContainer"
}
  , hn = {
    key: 1,
    class: "cupChangeArrowContainer"
}
  , gn = D(()=>i("div", {
    class: "topAreaSpacerColumn"
}, null, -1))
  , wn = {
    class: "topAreaLowerRow"
}
  , yn = D(()=>i("div", {
    class: "topAreaSpacerColumn"
}, null, -1))
  , Sn = {
    class: "cupStatPoints"
}
  , Cn = {
    key: 0,
    class: "cupImageSmallContainer"
}
  , fn = ["src"]
  , vn = {
    class: "cupStatPercent"
}
  , In = D(()=>i("div", {
    class: "topAreaSpacerColumn"
}, null, -1))
  , kn = D(()=>i("div", {
    class: "topAreaSpacerRow"
}, null, -1))
  , Mn = {
    key: 0
}
  , _n = {
    class: "textArial"
}
  , bn = {
    key: 1
}
  , Pn = {
    key: 2,
    class: "footer"
}
  , $n = {
    key: 3,
    class: "footer"
}
  , Bn = ["href"]
  , Ln = D(()=>i("a", {
    class: "buttonSmall",
    href: "https://onionfist.com/",
    target: "_blank"
}, "More games like this", -1))
  , Dn = {
    class: "socialIcons"
}
  , An = ["href"]
  , En = D(()=>i("img", {
    src: Qt,
    alt: "discord"
}, null, -1))
  , Tn = [En]
  , On = ["href"]
  , Nn = D(()=>i("img", {
    src: Zt,
    alt: "instagram"
}, null, -1))
  , Rn = [Nn]
  , Fn = {
    class: "footer"
}
  , Un = {
    class: "textSmall colorGray3"
}
  , Hn = ["href"]
  , Wn = D(()=>i("span", {
    style: {
        margin: "0px 10px"
    }
}, "|", -1))
  , Vn = ["href"]
  , Gn = D(()=>i("p", {
    class: "textSmall colorGray3"
}, [i("span", null, "Onionfist 2023 | All Rights Reserved"), i("br"), i("span", null, "Ice Dodo Version 0.175")], -1))
  , jn = D(()=>i("br", null, null, -1));
function Kn(e, t, n, a, l, u) {
    const r = C("VBrewListing")
      , d = C("VMapListing")
      , P = C("VSticky");
    return o(),
    s("main", en, [i("div", tn, [i("img", {
        class: "noDrag hoverGrow",
        src: Kt,
        onClick: t[0] || (t[0] = ()=>e.changePageId(e.PageIdEnum.Skins))
    }), e.mainState.isNewcomer ? y("", !0) : (o(),
    s("img", {
        key: 0,
        class: "noDrag hoverGrow",
        src: zt,
        onClick: t[1] || (t[1] = ()=>e.changePageId(e.PageIdEnum.Finder))
    })), i("img", {
        class: "noDrag hoverGrow",
        src: Yt,
        onClick: t[2] || (t[2] = ()=>e.changePageId(e.PageIdEnum.Settings))
    }), e.mainState.isNewcomer ? y("", !0) : (o(),
    s("img", {
        key: 1,
        class: "noDrag hoverGrow",
        src: qt,
        onClick: t[3] || (t[3] = (...h)=>e.onClickMultiplayer && e.onClickMultiplayer(...h))
    })), i("img", {
        class: "noDrag hoverGrow",
        src: Jt,
        onClick: t[4] || (t[4] = (...h)=>e.onClickSync && e.onClickSync(...h))
    })]), i("div", nn, [i("img", {
        class: "cupImageBlurred",
        src: e.cupImageUrl
    }, null, 8, an), i("div", sn, [on, i("div", rn, [i("h1", ln, [i("span", null, c(e.cupName), 1), e.isWebsiteOnlyCup ? (o(),
    s("span", dn, "Online")) : y("", !0)])]), i("div", pn, [un, e.mainState.isNewcomer ? y("", !0) : (o(),
    s("div", cn, [i("img", {
        class: "cupChangeArrow invertImageColor noDrag hoverGrow",
        src: Xt,
        onClick: t[5] || (t[5] = ()=>e.onClickChangeCup(-1)),
        alt: "left"
    })])), i("div", mn, [i("div", {
        onClick: t[6] || (t[6] = (...h)=>e.onClickPlayButton && e.onClickPlayButton(...h)),
        class: _(["buttonLarge hoverPink", {
            colorRed: !e.mainState.isUltrahardUnlocked && e.mainState.browsingCupId === e.CupIdEnum.Ultrahard
        }])
    }, " PLAY ", 2)]), e.mainState.isNewcomer ? (o(),
    s("img", {
        key: 2,
        class: "invertImageColor noDrag hoverGrow newcomerHelpButton",
        src: we,
        onClick: t[8] || (t[8] = (...h)=>e.onClickNewcomerHelpButton && e.onClickNewcomerHelpButton(...h)),
        alt: "help button"
    })) : (o(),
    s("div", hn, [i("img", {
        class: "cupChangeArrow invertImageColor noDrag hoverGrow",
        src: xt,
        onClick: t[7] || (t[7] = ()=>e.onClickChangeCup(1)),
        alt: "right"
    })])), gn]), i("div", wn, [yn, i("h2", Sn, c(e.mainState.mainProgressState.cupProgressDictionary[e.mainState.browsingCupId].totalPoints) + " pt", 1), e.mainState.isNewcomer ? y("", !0) : (o(),
    s("div", Cn, [i("img", {
        class: "cupImageSmall noDrag hoverGrow",
        onClick: t[9] || (t[9] = ()=>e.changePageId(e.PageIdEnum.Cups)),
        src: e.cupImageUrl
    }, null, 8, fn)])), i("h2", vn, c(e.ProgressUtils.getPercentTextFromProgress(e.mainState.mainProgressState.cupProgressDictionary[e.mainState.browsingCupId])), 1), In]), kn])]), e.mainState.browsingCupId === e.CupIdEnum.Brew ? (o(),
    s("div", Mn, [i("div", _n, c(e.brewLoadText), 1), (o(!0),
    s(B, null, L(e.brewListings, h=>(o(),
    s("div", {
        key: h.mapId
    }, [w(r, {
        brewListing: h,
        onCreatePopupItem: e.createPopupItem,
        onOnClickMap: e.onClickMap
    }, null, 8, ["brewListing", "onCreatePopupItem", "onOnClickMap"])]))), 128))])) : (o(),
    s("div", bn, [(o(!0),
    s(B, null, L(e.mapListings, h=>(o(),
    s("div", {
        key: h.mapId
    }, [w(d, {
        mainState: e.mainState,
        mapListing: h,
        onCreatePopupItem: e.createPopupItem,
        onOnClickMap: e.onClickMap
    }, null, 8, ["mainState", "mapListing", "onCreatePopupItem", "onOnClickMap"])]))), 128))])), e.mainState.isNewcomer ? (o(),
    s("div", Pn, [i("div", {
        class: "buttonSmall",
        onClick: t[10] || (t[10] = (...h)=>e.onClickNewcomerHelpButton && e.onClickNewcomerHelpButton(...h))
    }, "How to Play"), i("div", {
        class: "buttonSmall",
        onClick: t[11] || (t[11] = ()=>e.changePageId(e.PageIdEnum.Credits))
    }, "Credits")])) : (o(),
    s("div", $n, [i("div", {
        class: "buttonSmall",
        onClick: t[12] || (t[12] = ()=>e.changePageId(e.PageIdEnum.Cups))
    }, "More maps"), i("div", {
        class: "buttonSmall",
        onClick: t[13] || (t[13] = ()=>e.changePageId(e.PageIdEnum.Credits))
    }, "Credits"), i("a", {
        class: "buttonSmall",
        href: e.LinkEnum.IceDodoOnWebstore,
        target: "_blank"
    }, "Please rate 5 stars", 8, Bn), Ln, i("div", {
        class: "buttonSmall",
        onClick: t[14] || (t[14] = ()=>e.changePageId(e.PageIdEnum.Achievements))
    }, " View achievements "), i("div", Dn, [i("a", {
        class: "socialIcon",
        href: e.LinkEnum.Discord,
        target: "_blank"
    }, Tn, 8, An), i("a", {
        class: "socialIcon",
        href: e.LinkEnum.Instagram,
        target: "_blank"
    }, Rn, 8, On)])])), i("div", Fn, [i("p", Un, [i("a", {
        class: "clickableText",
        href: e.LinkEnum.PrivacyPolicy
    }, "Privacy Policy", 8, Hn), Wn, i("a", {
        class: "clickableText",
        href: e.LinkEnum.TermsOfService
    }, "Terms of Service", 8, Vn)]), Gn, jn]), w(P)])
}
const zn = I(jt, [["render", Kn], ["__scopeId", "data-v-c2338e83"]])
  , Yn = v({
    data() {
        return {}
    },
    methods: {
        onClickMenuButton() {
            this.$emit("onClickMenuButton")
        }
    },
    mounted() {}
});
const qn = e=>(T("data-v-c7113168"),
e = e(),
O(),
e)
  , Jn = {
    class: "titleWithIcon"
}
  , Xn = qn(()=>i("h1", {
    class: "textLarge"
}, "Credits", -1))
  , xn = Z('<div class="creditsMain" data-v-c7113168><p class="textLarge" data-v-c7113168>Developer</p><p class="textArial" data-v-c7113168>Jason</p><ul style="text-align:left;" data-v-c7113168><li data-v-c7113168>Email: flyingdodo9000@gmail.com</li><li data-v-c7113168><span data-v-c7113168>Instagram:</span><a href="https://www.instagram.com/seojoon.y/" target="_blank" class="clickableText textArial" data-v-c7113168>@seojoon.y [CLICK]</a></li></ul><p class="textLarge" data-v-c7113168>Music</p><p class="textArial" data-v-c7113168>Valkyrie, Peneumatic Tokyo, Stairways, Uprise and Bloom by EnV</p><p class="textArial" data-v-c7113168>Ice Dodo Theme and Down Caves by ColBreakz</p><p class="textArial" data-v-c7113168>Dodozart, Dodosynthesis and Brink by The Insolence Watches You</p><p class="textLarge" data-v-c7113168>Map makers</p><p class="textArial" data-v-c7113168>!Vanta!, rytai3, ABC123, aethertrix, applepear, A KittenIsh Exponent, AnimeFan, anperson, asfhgsfhkj, awehero, bean, Bearded Baby, Bumpo, Burgerhero48, Butta_Knife, Carrots, catfishpie, cfurby27, ChappJack, Cr43zy, Dabossgama, DaEpicDuck, Dancing Axolotl, Darrk_77, datoneguy246, David Ye, DestroyerBall, Dododo73, DONKEYDUO, DonW15, DRV, EpicTaco, FNX, Ghoullsh, Gold3n d0d0, happyhockey, Hamster D0D0, Have2go2p, heck, Helloe, Hotdoggo, Ice Chicken, ItsDukki, jaspko, jay, Jerwo, June, Kazil, LEo, Liam, lil_debbie68, mapleandco.mapmaking, Maplez, massdebater6969, MasterMinx9000, Matt B, Milesrad, Moose_ManOK, MooshMM, MrMaas, MTHW, Neonturtle, Ninjisawesome, P!%89, Painkiller, PepsiPenguin, Possible Panda, Racoonboy2123, Revelboy, Rionte, RobotDestroyer39, rocky707, skilledandkilled, Skywolf, SourLemons, Soviet Coconut, Squirrel, Stevo, Sungjoon, SupaSnugz, TesT, The Insolence Watches You, Thero, TimTam, TomTEC, unfortxnate, uPilot, Usern, Waffle, Wienerdog, wuk903, Xdoomination, Zhou Yu, Zoni</p><p class="textLarge" data-v-c7113168>Pixel art</p><p class="textArial" data-v-c7113168>ItsYaBoiPoppin, Furby, Bumpo, Daniel, The Unsuspicious Imposter, anperson, Thero, Catfishpie, The Insolence Watches You, legendofme, supasnugz, ABC123, donkeyduo, beanos, FNX, Shogun, Future Pro, JayTheMystic, Destroyer, dwn, Ghoul, dwn, jAy, Unknown66, thezoomerguy, RunningOutOfSpaceToTypeInMyUsern, hotasiankid, skilledandkilled, Rocky707, Maplette, TemChez</p><p class="textLarge" data-v-c7113168>Special thanks</p><p class="textArial" data-v-c7113168>Furby, sungjoon, parke, sleepyhatake, skywolf, masterclutch, Golden, Rocky707, Thero, Jerome, Yusof</p><p class="textLarge" data-v-c7113168>Partners</p><p class="textArial" data-v-c7113168>Doppler, Kristian</p></div>', 1);
function Qn(e, t, n, a, l, u) {
    return o(),
    s("main", null, [i("div", Jn, [i("img", {
        src: G,
        onClick: t[0] || (t[0] = (...r)=>e.onClickMenuButton && e.onClickMenuButton(...r))
    }), Xn]), xn])
}
const Zn = I(Yn, [["render", Qn], ["__scopeId", "data-v-c7113168"]])
  , ei = v({
    props: {
        settingsItem: {
            type: Object,
            required: !0
        },
        mainState: {
            type: Object,
            required: !0
        }
    },
    data() {
        return {
            currentStorageValue: null
        }
    },
    watch: {
        mainState: {
            handler: async function(e) {
                e.pageId === m.Settings && (this.currentStorageValue = await g.getString(this.settingsItem.storageKey))
            },
            deep: !0
        }
    },
    methods: {
        async onClickButton(e) {
            this.currentStorageValue = e,
            he.setSettingsItemGlobalVariable(this.settingsItem, e),
            this.$emit("onSettingsItemChanged", this.settingsItem, e),
            await g.set(this.settingsItem.storageKey, e)
        }
    },
    async mounted() {
        this.currentStorageValue = await g.getString(this.settingsItem.storageKey)
    }
});
const ti = {
    key: 0,
    class: "settingsItemMain"
}
  , ni = {
    class: "textSmall"
}
  , ii = ["onClick"];
function ai(e, t, n, a, l, u) {
    return e.currentStorageValue != null ? (o(),
    s("main", ti, [i("p", ni, c(e.settingsItem.name), 1), (o(!0),
    s(B, null, L(e.settingsItem.storageValues, r=>(o(),
    s("div", {
        key: r,
        class: _([{
            isSelectedButton: r === e.currentStorageValue
        }, "buttonSmall"]),
        onClick: ()=>e.onClickButton(r)
    }, c(r), 11, ii))), 128))])) : y("", !0)
}
const si = I(ei, [["render", ai], ["__scopeId", "data-v-bb523b26"]])
  , oi = v({
    props: {
        mainState: {
            type: Object,
            required: !0
        }
    },
    data() {
        return {
            StorageKeyEnum: S,
            StorageValueEnum: R,
            isExtension: b.isExtension(),
            allSettingsItems: he.getAllSettingsItemsExceptResolutionIfExtension()
        }
    },
    methods: {
        onClickMenuButton() {
            this.$emit("onClickMenuButton")
        },
        onSettingsItemChanged(e, t) {
            this.$emit("onSettingsItemChanged", e, t)
        }
    },
    async mounted() {},
    components: {
        VSettingsItemVue: si
    }
});
const Ce = e=>(T("data-v-c12264ba"),
e = e(),
O(),
e)
  , ri = {
    class: "titleWithIcon"
}
  , li = Ce(()=>i("h1", {
    class: "textLarge"
}, "Settings", -1))
  , di = {
    class: "settingsMain"
}
  , pi = Ce(()=>i("br", null, null, -1));
function ui(e, t, n, a, l, u) {
    const r = C("VSettingsItemVue");
    return o(),
    s("main", null, [i("div", ri, [i("img", {
        src: G,
        onClick: t[0] || (t[0] = (...d)=>e.onClickMenuButton && e.onClickMenuButton(...d))
    }), li]), i("div", di, [(o(!0),
    s(B, null, L(e.allSettingsItems, d=>(o(),
    s("div", {
        key: d.storageKey
    }, [w(r, {
        settingsItem: d,
        mainState: e.mainState,
        onOnSettingsItemChanged: e.onSettingsItemChanged
    }, null, 8, ["settingsItem", "mainState", "onOnSettingsItemChanged"])]))), 128)), pi])])
}
const ci = I(oi, [["render", ui], ["__scopeId", "data-v-c12264ba"]])
  , mi = v({
    data() {
        return {
            ALL_CUP_IDS: W,
            CupUtils: k,
            selectedCupName: "Choose a cup",
            isSelectedCupOnlyOnWebsite: !1,
            selectedCupDescription: "??"
        }
    },
    methods: {
        onClickMenuButton() {
            this.selectedCupName = "Choose a cup",
            this.$emit("onClickMenuButton")
        },
        goToCupInMenu(e) {
            this.$emit("goToCupInMenu", e)
        },
        onHoverCup(e) {
            this.selectedCupName = k.getCupName(e),
            this.isSelectedCupOnlyOnWebsite = k.isOnlyOnWebsite(e, b.isExtension()),
            this.selectedCupDescription = k.getCupDescription(e)
        }
    },
    async mounted() {}
});
const ie = e=>(T("data-v-78871864"),
e = e(),
O(),
e)
  , hi = {
    class: "titleWithIcon"
}
  , gi = ie(()=>i("h1", {
    class: "textLarge"
}, "Cups", -1))
  , wi = {
    class: "cupsMain"
}
  , yi = {
    class: "textLarge"
}
  , Si = {
    key: 0,
    class: "isWebsiteOnlyCup"
}
  , Ci = ie(()=>i("br", null, null, -1))
  , fi = ["src", "onMouseover", "onClick"]
  , vi = ie(()=>i("br", null, null, -1))
  , Ii = {
    class: "cupDescription textArial"
};
function ki(e, t, n, a, l, u) {
    return o(),
    s("main", null, [i("div", hi, [i("img", {
        src: G,
        onClick: t[0] || (t[0] = (...r)=>e.onClickMenuButton && e.onClickMenuButton(...r))
    }), gi]), i("div", wi, [i("h2", yi, [i("span", null, c(e.selectedCupName), 1), e.isSelectedCupOnlyOnWebsite ? (o(),
    s("span", Si, "Online")) : y("", !0)]), Ci, (o(!0),
    s(B, null, L(e.ALL_CUP_IDS, r=>(o(),
    s("div", {
        class: "cupIcon",
        key: r
    }, [i("img", {
        src: e.CupUtils.getCupSkinUrl(r),
        class: "hoverGrow",
        onMouseover: ()=>e.onHoverCup(r),
        onClick: ()=>e.goToCupInMenu(r)
    }, null, 40, fi)]))), 128)), vi, i("p", Ii, c(e.selectedCupDescription), 1)])])
}
const Mi = I(mi, [["render", ki], ["__scopeId", "data-v-78871864"]])
  , de = 250
  , _i = v({
    props: {
        progressTextName: {
            type: String,
            required: !0
        },
        progress: {
            type: Object,
            required: !0
        }
    },
    data() {
        return {
            ProgressUtils: $
        }
    },
    methods: {
        getProgressBarWidth(e) {
            return Math.min(de, e * de) + "px"
        },
        getPercent() {
            return this.progress.completedMaps / this.progress.totalMaps
        }
    }
});
const bi = {
    class: "achievementsRowMain"
}
  , Pi = {
    class: "progressText"
}
  , $i = {
    class: "textSmall progressTextName"
}
  , Bi = {
    class: "textSmall progressTextPoints"
}
  , Li = {
    class: "textSmall progressTextPercent"
};
function Di(e, t, n, a, l, u) {
    return o(),
    s("main", bi, [i("div", Pi, [i("span", $i, c(e.progressTextName), 1), i("span", Bi, c(e.progress.totalPoints) + " pt", 1), i("span", Li, c(e.ProgressUtils.getPercentTextFromProgress(e.progress)), 1)]), i("div", {
        class: "progressBarOuter",
        style: q({
            width: e.getProgressBarWidth(1)
        })
    }, [i("div", {
        class: "progressBarInner",
        style: q({
            width: e.getProgressBarWidth(e.getPercent())
        })
    }, null, 4)], 4)])
}
const Ai = I(_i, [["render", Di], ["__scopeId", "data-v-d9dd273d"]])
  , pe = 250
  , Ei = v({
    props: {
        mainState: {
            type: Object,
            required: !0
        }
    },
    data() {
        return {
            ALL_CUP_IDS: W,
            CupUtils: k,
            overallPoints: 0,
            overallPercent: 0
        }
    },
    methods: {
        onClickMenuButton() {
            this.$emit("onClickMenuButton")
        },
        getProgressBarWidth(e) {
            return Math.min(pe, e * pe) + "px"
        },
        getPercent(e) {
            return e.completedMaps / e.totalMaps
        }
    },
    components: {
        VAchievementsRow: Ai
    }
});
const H = e=>(T("data-v-05212022"),
e = e(),
O(),
e)
  , Ti = {
    class: "titleWithIcon"
}
  , Oi = H(()=>i("h1", {
    class: "textLarge"
}, "Achievements", -1))
  , Ni = {
    class: "achievementsMain"
}
  , Ri = H(()=>i("h1", {
    class: "textLarge colorPink"
}, "Overall", -1))
  , Fi = H(()=>i("p", {
    class: "textSmall"
}, "Note: Vault cup not included", -1))
  , Ui = H(()=>i("div", {
    class: "achievementsSpacer"
}, null, -1))
  , Hi = H(()=>i("h1", {
    class: "textLarge colorPink"
}, "By Cup", -1))
  , Wi = H(()=>i("div", {
    class: "achievementsSpacer"
}, null, -1))
  , Vi = H(()=>i("h1", {
    class: "textLarge colorPink"
}, "By Difficulty", -1));
function Gi(e, t, n, a, l, u) {
    const r = C("VAchievementsRow");
    return o(),
    s("main", null, [i("div", Ti, [i("img", {
        src: G,
        onClick: t[0] || (t[0] = (...d)=>e.onClickMenuButton && e.onClickMenuButton(...d))
    }), Oi]), i("div", Ni, [Ri, i("div", null, [w(r, {
        progressTextName: "Overall",
        progress: e.mainState.mainProgressState.overallProgress
    }, null, 8, ["progress"]), Fi]), Ui, Hi, (o(!0),
    s(B, null, L(e.ALL_CUP_IDS, d=>(o(),
    s("div", {
        key: d
    }, [w(r, {
        progressTextName: e.CupUtils.getCupName(d),
        progress: e.mainState.mainProgressState.cupProgressDictionary[d]
    }, null, 8, ["progressTextName", "progress"])]))), 128)), Wi, Vi, (o(!0),
    s(B, null, L(e.mainState.mainProgressState.diffProgressDictionary, (d,P)=>(o(),
    s("div", {
        key: P
    }, [w(r, {
        progressTextName: "Diff " + P,
        progress: d
    }, null, 8, ["progressTextName", "progress"])]))), 128))])])
}
const ji = I(Ei, [["render", Gi], ["__scopeId", "data-v-05212022"]]);
var Y = (e=>(e[e.Name = 0] = "Name",
e[e.Difficulty = 1] = "Difficulty",
e[e.New = 2] = "New",
e[e.Favorite = 3] = "Favorite",
e[e.Unbeaten = 4] = "Unbeaten",
e[e.Random = 5] = "Random",
e))(Y || {});
const Ki = v({
    props: {
        mainState: {
            type: Object,
            required: !0
        }
    },
    data() {
        return {
            searchTerm: "",
            mapListingsFromSearch: [],
            errorFromSearch: null,
            difficulties: x,
            SearchMethodEnum: Y,
            selectedSearchMethod: 0,
            ALL_SEARCH_METHODS: J.getNumberEnumKeys(Y),
            FINDER_MAX_RESULTS: oe
        }
    },
    methods: {
        onClickMenuButton() {
            this.$emit("onClickMenuButton")
        },
        getSearchResults() {
            const e = this.searchTerm.trim().toLowerCase();
            if (e.length === 0)
                throw new Error("Search term is empty");
            const t = [];
            for (const n of W) {
                const a = A.getMapListings(n);
                for (const l of a)
                    if (!A.doesContain(t, l)) {
                        if (l.name.toLowerCase().includes(e)) {
                            t.push(l);
                            continue
                        }
                        if (l.mapId.toLowerCase().includes(e)) {
                            t.push(l);
                            continue
                        }
                    }
            }
            if (t.length > oe)
                throw new Error("Too many search results. Please be more specific");
            return t
        },
        onClickDifficulty(e) {
            this.mapListingsFromSearch = A.getAllMapListingsOfDifficulty(e, !0),
            this.errorFromSearch = null
        },
        onClickSearch() {
            try {
                this.mapListingsFromSearch = this.getSearchResults(),
                this.errorFromSearch = null
            } catch (e) {
                this.mapListingsFromSearch = [],
                this.errorFromSearch = e.message
            }
        },
        onClickMap(e) {
            this.$emit("onClickMap", e)
        },
        createPopupItem(e) {
            this.$emit("createPopupItem", e)
        },
        getSearchMethodName(e) {
            return Y[e]
        },
        async onClickSearchMethod(e) {
            this.selectedSearchMethod = e,
            this.errorFromSearch = null,
            this.mapListingsFromSearch = await this.getMapListingsAfterChangingMethod()
        },
        async getMapListingsAfterChangingMethod() {
            switch (this.selectedSearchMethod) {
            case 2:
                return re.getRecentMapListings();
            case 3:
                return re.getFavoriteMapListings();
            case 4:
                return V.getUnbeatenMapListings(this.mainState.mapCompletionDictionary);
            case 5:
                return [A.getRandomMapListing()];
            case 0:
            case 1:
                return []
            }
        }
    },
    async mounted() {},
    components: {
        VMapListing: ye
    }
});
const F = e=>(T("data-v-0d1be72d"),
e = e(),
O(),
e)
  , zi = {
    class: "titleWithIcon"
}
  , Yi = F(()=>i("h1", {
    class: "textLarge"
}, "Map Search", -1))
  , qi = {
    class: "finderMain"
}
  , Ji = {
    class: "searchMethodRow"
}
  , Xi = ["onClick"]
  , xi = {
    key: 0
}
  , Qi = F(()=>i("p", {
    class: "textArial"
}, "Enter Map Name or ID", -1))
  , Zi = {
    class: "searchInputRow"
}
  , ea = {
    key: 1
}
  , ta = F(()=>i("p", {
    class: "textArial"
}, "Maps recently added to the game.", -1))
  , na = [ta]
  , ia = {
    key: 2
}
  , aa = F(()=>i("p", {
    class: "textArial"
}, "Maps that you rated 5 stars. To use this feature: Go to the menu screen, Sign in with Google in the Sync tab, and then leave a map review!", -1))
  , sa = [aa]
  , oa = {
    key: 3
}
  , ra = {
    class: "textArial"
}
  , la = {
    key: 4
}
  , da = F(()=>i("p", {
    class: "textArial"
}, "Recommends totally random maps.", -1))
  , pa = [da]
  , ua = {
    key: 5
}
  , ca = F(()=>i("p", {
    class: "textArial"
}, "Choose Difficulty", -1))
  , ma = ["onClick"]
  , ha = F(()=>i("br", null, null, -1))
  , ga = {
    key: 6
}
  , wa = {
    class: "textArial finderError"
}
  , ya = {
    key: 7
}
  , Sa = F(()=>i("h2", {
    class: "textArial"
}, "No results", -1))
  , Ca = [Sa]
  , fa = {
    key: 8
}
  , va = {
    class: "textArial"
}
  , Ia = {
    key: 0
};
function ka(e, t, n, a, l, u) {
    const r = C("VMapListing");
    return o(),
    s("main", null, [i("div", zi, [i("img", {
        src: G,
        onClick: t[0] || (t[0] = (...d)=>e.onClickMenuButton && e.onClickMenuButton(...d))
    }), Yi]), i("div", qi, [i("div", Ji, [(o(!0),
    s(B, null, L(e.ALL_SEARCH_METHODS, d=>(o(),
    s("div", {
        key: d,
        class: _(["buttonSmall noHighlight", {
            isSelectedButton: e.selectedSearchMethod === d
        }]),
        onClick: ()=>e.onClickSearchMethod(d)
    }, c(e.getSearchMethodName(d)), 11, Xi))), 128))]), e.selectedSearchMethod === e.SearchMethodEnum.Name ? (o(),
    s("div", xi, [Qi, i("div", Zi, [Ee(i("input", {
        class: "inputSmall",
        type: "text",
        maxlength: "16",
        onKeyup: t[1] || (t[1] = Oe((...d)=>e.onClickSearch && e.onClickSearch(...d), ["enter"])),
        "onUpdate:modelValue": t[2] || (t[2] = d=>e.searchTerm = d)
    }, null, 544), [[Te, e.searchTerm]]), i("div", {
        class: "buttonSmall",
        onClick: t[3] || (t[3] = (...d)=>e.onClickSearch && e.onClickSearch(...d))
    }, "Search")])])) : e.selectedSearchMethod === e.SearchMethodEnum.New ? (o(),
    s("div", ea, na)) : e.selectedSearchMethod === e.SearchMethodEnum.Favorite ? (o(),
    s("div", ia, sa)) : e.selectedSearchMethod === e.SearchMethodEnum.Unbeaten ? (o(),
    s("div", oa, [i("p", ra, "Maps you haven't completed yet. Shows " + c(e.FINDER_MAX_RESULTS) + " results max.", 1)])) : e.selectedSearchMethod === e.SearchMethodEnum.Random ? (o(),
    s("div", la, pa)) : e.selectedSearchMethod === e.SearchMethodEnum.Difficulty ? (o(),
    s("div", ua, [ca, (o(!0),
    s(B, null, L(e.difficulties, d=>(o(),
    s("div", {
        class: "buttonSmall difficultyButton",
        onClick: ()=>e.onClickDifficulty(d),
        key: d
    }, c(d), 9, ma))), 128))])) : y("", !0), ha, e.errorFromSearch != null ? (o(),
    s("div", ga, [i("h2", wa, c(e.errorFromSearch), 1)])) : e.mapListingsFromSearch.length === 0 ? (o(),
    s("div", ya, Ca)) : (o(),
    s("div", fa, [i("h2", va, "Found " + c(e.mapListingsFromSearch.length) + " results", 1), Object.keys(e.mainState.mapCompletionDictionary).length > 0 ? (o(),
    s("div", Ia, [(o(!0),
    s(B, null, L(e.mapListingsFromSearch, d=>(o(),
    s("div", {
        key: d.mapId
    }, [w(r, {
        mainState: e.mainState,
        mapListing: d,
        onCreatePopupItem: e.createPopupItem,
        onOnClickMap: e.onClickMap
    }, null, 8, ["mainState", "mapListing", "onCreatePopupItem", "onOnClickMap"])]))), 128))])) : y("", !0)]))])])
}
const Ma = I(Ki, [["render", ka], ["__scopeId", "data-v-0d1be72d"]])
  , _a = 50
  , ba = v({
    props: {
        mainState: {
            type: Object,
            required: !0
        }
    },
    data() {
        return {
            SkinUtils: N,
            selectedSkinId: Ne.Default
        }
    },
    methods: {
        onClickMenuButton() {
            this.$emit("onClickMenuButton")
        },
        async onClickSkin(e) {
            if (this.mainState.skinStateDictionary[e].percent < 1) {
                N.isPuzzleSkin(e) ? this.createPuzzleSkinPopup(e) : this.createSkinHelpPopup(e);
                return
            }
            this.playClickSound(),
            this.selectedSkinId = e,
            decorations.decorate_player(N.getSkinImageSrc(e)),
            await g.set(S.SelectedSkinId, e)
        },
        playClickSound() {
            this.$emit("playClickSound")
        },
        getProgressBarWidth(e) {
            return e * _a + "px"
        },
        createSkinHelpPopup(e) {
            const t = this.mainState.skinStateDictionary[e]
              , n = Math.round(t.percent * 100) + "%"
              , a = {
                title: "Skin Locked",
                bodyAsHtml: `
          ${t.howToGet} to unlock this skin.
          <br><br>
          You are ${n} of the way there!
          <br>
          <img src="${N.getSkinImageSrc(e)}" style="width: 100px; height: 100px; margin-top: 10px;">
        `,
                buttons: []
            };
            this.$emit("createPopupItem", a)
        },
        createPuzzleSkinPopup(e) {
            const n = {
                title: "Puzzle Skin",
                bodyAsHtml: `
          ${this.mainState.skinStateDictionary[e].howToGet}
          <br><br>
          <img src="${N.getSkinImageSrc(e)}" style="width: 100px; height: 100px; margin-top: 10px;">
          <br>
          @seojoon.y
        `,
                buttons: [{
                    text: E,
                    onClick: ()=>{}
                }, {
                    text: "Guess now",
                    onClick: async()=>{
                        const a = prompt("What is the secret word?");
                        if (a != null) {
                            if (a.toUpperCase() != "WOOOOF") {
                                alert("Wrong!");
                                return
                            }
                            alert("Skin unlocked!"),
                            await N.unlockPuzzleSkin(e),
                            this.$emit("reloadMainState")
                        }
                    }
                }]
            };
            this.$emit("createPopupItem", n)
        }
    },
    async mounted() {
        const e = await g.getInteger(S.SelectedSkinId);
        e != null && (this.selectedSkinId = e)
    }
})
  , Pa = "/assets/svgs/lock.svg";
const fe = e=>(T("data-v-1a1c1d8c"),
e = e(),
O(),
e)
  , $a = {
    class: "titleWithIcon"
}
  , Ba = fe(()=>i("h1", {
    class: "textLarge"
}, "Skins", -1))
  , La = {
    class: "skinsMain"
}
  , Da = ["onClick"]
  , Aa = ["src"]
  , Ea = fe(()=>i("img", {
    class: "lockImage noDrag",
    src: Pa
}, null, -1))
  , Ta = {
    class: "skinRightPart"
}
  , Oa = {
    class: "textSmall"
};
function Na(e, t, n, a, l, u) {
    return o(),
    s("main", null, [i("div", $a, [i("img", {
        src: G,
        onClick: t[0] || (t[0] = (...r)=>e.onClickMenuButton && e.onClickMenuButton(...r))
    }), Ba]), i("div", La, [(o(!0),
    s(B, null, L(e.mainState.skinIdsSortedByOwned, r=>(o(),
    s("div", {
        class: _(["skinItem noHighlight", {
            isLocked: e.mainState.skinStateDictionary[r].percent < 1,
            isSelected: e.selectedSkinId === r
        }]),
        key: r
    }, [i("div", {
        class: "skinLeftPart hoverGrow",
        onClick: ()=>e.onClickSkin(r)
    }, [i("img", {
        class: "skinImage noDrag",
        src: e.SkinUtils.getSkinImageSrc(r)
    }, null, 8, Aa), Ea], 8, Da), i("div", Ta, [i("h1", Oa, c(e.mainState.skinStateDictionary[r].name), 1), i("div", {
        class: "progressBarOuter",
        style: q({
            width: e.getProgressBarWidth(1)
        })
    }, [i("div", {
        class: "progressBarInner",
        style: q({
            width: e.getProgressBarWidth(e.mainState.skinStateDictionary[r].percent)
        })
    }, null, 4)], 4)])], 2))), 128))])])
}
const Ra = I(ba, [["render", Na], ["__scopeId", "data-v-1a1c1d8c"]])
  , Fa = v({
    props: {
        popupItem: {
            type: Object,
            required: !0
        }
    },
    data() {
        return {
            CLOSE_BUTTON_TEXT: E
        }
    },
    methods: {
        onPopupItemClose() {
            this.$emit("onPopupItemClose", this.popupItem.id),
            this.$emit("playClickSound")
        },
        onClickButton(e) {
            e.onClick(),
            this.onPopupItemClose()
        },
        onClickCross() {
            const e = this.popupItem.buttons.find(t=>t.text === E);
            e ? this.onClickButton(e) : this.onPopupItemClose()
        }
    },
    mounted() {}
});
const Ua = {
    class: "popupItemMain"
}
  , Ha = {
    class: "popupItemRow popupItemTitle"
}
  , Wa = {
    class: "textLarge"
}
  , Va = {
    class: "popupItemRow popupItemBody htmlContents"
}
  , Ga = ["innerHTML"]
  , ja = {
    class: "popupItemRow popupItemButtons"
}
  , Ka = ["onClick"]
  , za = {
    key: 0
};
function Ya(e, t, n, a, l, u) {
    return o(),
    s("main", Ua, [i("div", Ha, [i("h1", Wa, c(e.popupItem.title), 1), i("img", {
        class: "closeButton hoverGrow noDrag",
        onClick: t[0] || (t[0] = (...r)=>e.onClickCross && e.onClickCross(...r)),
        src: Se
    })]), i("div", Va, [i("div", {
        innerHTML: e.popupItem.bodyAsHtml
    }, null, 8, Ga)]), i("div", ja, [(o(!0),
    s(B, null, L(e.popupItem.buttons, r=>(o(),
    s("div", {
        key: r.text,
        onClick: ()=>e.onClickButton(r),
        class: "popupItemButton buttonSmall noHighlight"
    }, c(r.text), 9, Ka))), 128)), e.popupItem.buttons.length === 0 ? (o(),
    s("div", za, [i("div", {
        onClick: t[1] || (t[1] = (...r)=>e.onClickCross && e.onClickCross(...r)),
        class: "popupItemButton buttonSmall noHighlight"
    }, c(e.CLOSE_BUTTON_TEXT), 1)])) : y("", !0)])])
}
const qa = I(Fa, [["render", Ya], ["__scopeId", "data-v-defa055d"]])
  , Ja = v({
    data() {
        return {
            isLoadingMain: !0,
            world: null,
            popupItemIdCounter: 0,
            PageIdEnum: m,
            popupItems: [],
            mainState: j.getInitialMainState()
        }
    },
    methods: {
        async changeCupByDeltaIndex(e) {
            this.playClickSound(),
            this.mainState = {
                ...this.mainState,
                browsingCupId: k.getCupByDeltaIndex(this.mainState.browsingCupId, e)
            },
            await g.set(S.LastOpenedCupId, this.mainState.browsingCupId)
        },
        onClickMap(e, t) {
            this.world != null && (this.playClickSound(),
            this.mainState = {
                ...this.mainState,
                mapListing: e,
                pageId: m.Game,
                mapUrl: t ?? null
            },
            this.world.resolutionManager.resizeScreenForGame(),
            this.world.playMap(this.mainState),
            this.mainState.mapUrl != null && (this.mainState.browsingCupId = f.Brew),
            window.currentPageId = this.mainState.pageId,
            window.bagManager != null && (window.bagManager.verticalBagManager.hideWideOnly(),
            window.bagManager.verticalBagManager.showThinOnly()))
        },
        returnToMenuFromGame() {
            this.world != null && (this.playClickSound(),
            this.mainState = {
                ...this.mainState,
                mapListing: null,
                pageId: m.Menu
            },
            this.world.resolutionManager.resizeScreenForMenu(),
            this.world.mainState = this.mainState,
            window.currentPageId = this.mainState.pageId,
            window.bagManager != null && (window.bagManager.verticalBagManager.showWideOnly(),
            window.bagManager.verticalBagManager.hideThinOnly()))
        },
        changePageId(e) {
            this.playClickSound(),
            this.mainState.pageId = e,
            document.getElementById("app").scrollTo(0, 0),
            window.scrollTo(0, 0)
        },
        onClickMenuButton() {
            this.playClickSound(),
            this.mainState.pageId = m.Menu
        },
        async goToCupInMenu(e) {
            this.playClickSound(),
            this.mainState = {
                ...this.mainState,
                browsingCupId: e,
                pageId: m.Menu
            },
            window.currentPageId = this.mainState.pageId,
            await g.set(S.LastOpenedCupId, this.mainState.browsingCupId)
        },
        onWindowResize() {
            this.mainState.pageId === m.Game && this.$nextTick(()=>{
                this.world != null && this.world.resolutionManager.resizeScreenForGame()
            }
            )
        },
        playClickSound() {
            this.world != null && this.world.soundPlayer.playSound(Q.Click)
        },
        onSettingsItemChanged(e, t) {
            this.world != null && this.world.onSettingsItemChanged(e, t)
        },
        closeCurrentPopup() {
            if (this.popupItems.length === 0)
                return;
            const e = this.popupItems[0];
            if (e.id == null)
                return;
            const t = e.buttons.find(n=>n.text === E);
            t != null && t.onClick(),
            this.onPopupItemClose(e.id)
        },
        onPopupItemClose(e) {
            const t = this.popupItems.findIndex(n=>n.id === e);
            t !== -1 && (this.popupItems.splice(t, 1),
            this.world != null && this.world.setIsShowingPopup(!1))
        },
        createPopupItem(e) {
            this.popupItemIdCounter += 1,
            e.id = this.popupItemIdCounter,
            this.popupItems.push(e),
            this.world != null && this.world.setIsShowingPopup(!0)
        },
        getLaunchMapListing() {
            const e = this.$route.query[X.MapId];
            return e == null ? null : A.getMapListingFromMapId(e)
        },
        onLoaded() {
            const e = this.$route.query[X.PageId];
            if (e != null) {
                this.changePageId(parseInt(e));
                return
            }
            const t = this.getLaunchMapListing();
            if (t != null) {
                this.onClickMap(t);
                return
            }
            const n = this.$route.query[X.MapUrl];
            if (n != null) {
                this.onClickMap(null, n);
                return
            }
            if (this.world == null)
                throw new Error("World is null");
            this.world.soundPlayer.playMenuMusic(),
            this.world.popupManager.displayPopups()
        },
        async reloadMainState() {
            var n;
            const e = await j.getNewMainState(this.mainState)
              , t = j.getMainStateChange(this.mainState, e);
            return this.mainState = e,
            (n = this.world) == null || n.setMainState(this.mainState),
            t
        },
        onLocationChange() {
            history.state.forward != null && window.location.reload()
        }
    },
    async mounted() {
        this.mainState.browsingCupId = await g.getInteger(S.LastOpenedCupId) ?? f.Newcomer,
        await this.reloadMainState(),
        this.isLoadingMain = !1,
        window.addEventListener("resize", ()=>this.onWindowResize()),
        window.addEventListener("locationchange", ()=>this.onLocationChange()),
        setTimeout(()=>this.onLoaded(), 200),
        this.$nextTick(()=>{
            window.bagManager != null && window.bagManager.onPageLoaded(),
            window.sponsorManager != null && window.sponsorManager.onPageLoaded(),
            this.world = new at(this.mainState,e=>this.createPopupItem(e),()=>this.returnToMenuFromGame(),e=>this.changeCupByDeltaIndex(e),e=>this.onClickMap(e),()=>this.reloadMainState(),()=>this.popupItems.length > 0,()=>this.closeCurrentPopup())
        }
        )
    },
    components: {
        VMenu: zn,
        VGame: vt,
        VCredits: Zn,
        VSettings: ci,
        VCups: Mi,
        VFinder: Ma,
        VAchievements: ji,
        VSkins: Ra,
        VPopupItem: qa
    }
});
const Xa = {
    key: 0,
    class: "main"
}
  , xa = {
    key: 0,
    class: "popupContainer"
}
  , Qa = {
    key: 0
};
function Za(e, t, n, a, l, u) {
    const r = C("VPopupItem")
      , d = C("VGame")
      , P = C("VMenu")
      , h = C("VCredits")
      , ve = C("VSettings")
      , Ie = C("VCups")
      , ke = C("VFinder")
      , Me = C("VAchievements")
      , _e = C("VSkins");
    return e.isLoadingMain === !1 ? (o(),
    s("main", Xa, [e.popupItems.length > 0 ? (o(),
    s("div", xa, [e.popupItems.length > 0 ? (o(),
    s("div", Qa, [w(r, {
        popupItem: e.popupItems[0],
        onPlayClickSound: e.playClickSound,
        onOnPopupItemClose: e.onPopupItemClose
    }, null, 8, ["popupItem", "onPlayClickSound", "onOnPopupItemClose"])])) : y("", !0)])) : y("", !0), i("div", {
        class: _(["pageContainer", {
            isVisible: e.mainState.pageId === e.PageIdEnum.Game
        }])
    }, [w(d, {
        mainState: e.mainState
    }, null, 8, ["mainState"])], 2), i("div", {
        class: _(["pageContainer", {
            isVisible: e.mainState.pageId === e.PageIdEnum.Menu
        }])
    }, [w(P, {
        mainState: e.mainState,
        onChangePageId: e.changePageId,
        onOnClickMap: e.onClickMap,
        onCreatePopupItem: e.createPopupItem,
        onChangeCupByDeltaIndex: e.changeCupByDeltaIndex
    }, null, 8, ["mainState", "onChangePageId", "onOnClickMap", "onCreatePopupItem", "onChangeCupByDeltaIndex"])], 2), i("div", {
        class: _(["pageContainer", {
            isVisible: e.mainState.pageId === e.PageIdEnum.Credits
        }])
    }, [w(h, {
        onOnClickMenuButton: e.onClickMenuButton
    }, null, 8, ["onOnClickMenuButton"])], 2), i("div", {
        class: _(["pageContainer", {
            isVisible: e.mainState.pageId === e.PageIdEnum.Settings
        }])
    }, [w(ve, {
        onOnClickMenuButton: e.onClickMenuButton,
        mainState: e.mainState,
        onOnSettingsItemChanged: e.onSettingsItemChanged
    }, null, 8, ["onOnClickMenuButton", "mainState", "onOnSettingsItemChanged"])], 2), i("div", {
        class: _(["pageContainer", {
            isVisible: e.mainState.pageId === e.PageIdEnum.Cups
        }])
    }, [w(Ie, {
        onOnClickMenuButton: e.onClickMenuButton,
        onGoToCupInMenu: e.goToCupInMenu
    }, null, 8, ["onOnClickMenuButton", "onGoToCupInMenu"])], 2), i("div", {
        class: _(["pageContainer", {
            isVisible: e.mainState.pageId === e.PageIdEnum.Finder
        }])
    }, [w(ke, {
        onOnClickMap: e.onClickMap,
        mainState: e.mainState,
        onCreatePopupItem: e.createPopupItem,
        onOnClickMenuButton: e.onClickMenuButton
    }, null, 8, ["onOnClickMap", "mainState", "onCreatePopupItem", "onOnClickMenuButton"])], 2), i("div", {
        class: _(["pageContainer", {
            isVisible: e.mainState.pageId === e.PageIdEnum.Achievements
        }])
    }, [w(Me, {
        mainState: e.mainState,
        onOnClickMenuButton: e.onClickMenuButton
    }, null, 8, ["mainState", "onOnClickMenuButton"])], 2), i("div", {
        class: _(["pageContainer", {
            isVisible: e.mainState.pageId === e.PageIdEnum.Skins
        }])
    }, [w(_e, {
        mainState: e.mainState,
        onPlayClickSound: e.playClickSound,
        onCreatePopupItem: e.createPopupItem,
        onChangePageId: e.changePageId,
        onReloadMainState: e.reloadMainState,
        onOnClickMenuButton: e.onClickMenuButton
    }, null, 8, ["mainState", "onPlayClickSound", "onCreatePopupItem", "onChangePageId", "onReloadMainState", "onOnClickMenuButton"])], 2)])) : y("", !0)
}
const rs = I(Ja, [["render", Za], ["__scopeId", "data-v-ebd70a9e"]]);
export {rs as default};
