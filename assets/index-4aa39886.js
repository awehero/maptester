var ao = Object.defineProperty;
var lo = (e,t,n)=>t in e ? ao(e, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: n
}) : e[t] = n;
var le = (e,t,n)=>(lo(e, typeof t != "symbol" ? t + "" : t, n),
n);
(function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload"))
        return;
    for (const s of document.querySelectorAll('link[rel="modulepreload"]'))
        i(s);
    new MutationObserver(s=>{
        for (const r of s)
            if (r.type === "childList")
                for (const o of r.addedNodes)
                    o.tagName === "LINK" && o.rel === "modulepreload" && i(o)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function n(s) {
        const r = {};
        return s.integrity && (r.integrity = s.integrity),
        s.referrerpolicy && (r.referrerPolicy = s.referrerpolicy),
        s.crossorigin === "use-credentials" ? r.credentials = "include" : s.crossorigin === "anonymous" ? r.credentials = "omit" : r.credentials = "same-origin",
        r
    }
    function i(s) {
        if (s.ep)
            return;
        s.ep = !0;
        const r = n(s);
        fetch(s.href, r)
    }
}
)();
class ct {
    static getNumberEnumKeys(t) {
        return Object.keys(t).map(n=>t[n]).filter(n=>typeof n == "number")
    }
    static getStringEnumKeys(t) {
        return Object.keys(t).filter(n=>isNaN(Number(n)))
    }
    static getStringEnumValues(t) {
        return ct.getStringEnumKeys(t).map(n=>t[n])
    }
    static getSimpleHash(t) {
        let n = 0;
        for (let i = 0, s = t.length; i < s; i++) {
            const r = t.charCodeAt(i);
            n = (n << 5) - n + r,
            n |= 0
        }
        return n
    }
    static deepCopy(t) {
        return JSON.parse(JSON.stringify(t))
    }
    static getSmallDelay() {
        return new Promise(t=>{
            setTimeout(()=>{
                t()
            }
            , 200)
        }
        )
    }
}
const fo = 20 * 1e3
  , co = 2 * 60 * 1e3
  , Yi = 6e3
  , uo = 17;
var wt = (e=>(e.LeftVerticalWide = "onionfist-com_300x600_5",
e.RightVerticalWide = "onionfist-com_300x600_6",
e.LeftVerticalThin = "onionfist-com_160x600_1",
e.RightVerticalThin = "onionfist-com_160x600_2",
e.Horizontal = "onionfist-com_728x90",
e))(wt || {});
const Xi = ct.getStringEnumValues(wt)
  , mc = "https://icedodo-api.onionfist.com"
  , po = "https://icedodo.onionfist.com"
  , hc = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  , Zi = "v8"
  , Qi = 15
  , gc = .9
  , _c = 50
  , yc = "Close [X]";
var mo = (e=>(e.Discord = "https://discord.com/invite/onionfist-studio-750973906986467349",
e.Instagram = "https://www.instagram.com/seojoon.y/",
e.Youtube = "https://www.youtube.com/@pepperblow8054",
e.IceDodoOnWebstore = "https://chrome.google.com/webstore/detail/ice-dodo/jhidcpailhmpjpbdbhceiaeeggkalgmd",
e.MapMakingTutorial = "https://onionfist.com/ice_map_tut/",
e.Homepage = "https://onionfist.com/",
e.PrivacyPolicy = "https://onionfist.com/privacy_policy",
e.TermsOfService = "https://onionfist.com/terms_of_service",
e))(mo || {})
  , Ys = (e=>(e[e.Game = 0] = "Game",
e[e.Menu = 1] = "Menu",
e[e.Credits = 2] = "Credits",
e[e.Settings = 3] = "Settings",
e[e.Cups = 4] = "Cups",
e[e.Skins = 5] = "Skins",
e[e.Finder = 6] = "Finder",
e[e.Achievements = 7] = "Achievements",
e))(Ys || {})
  , G = (e=>(e.IsNewcomer = "isNewcomer",
e.DeviceId = "deviceId",
e.IsSoundOn = "isSoundOn",
e.IsAutoRestartOn = "isAutoRestartOn",
e.LocalCompletedMaps = "completedMaps",
e.RemoteCompletedMaps = "remoteCompletedMaps",
e.CloudCompletedMaps = "cloudCompletedMaps",
e.BaseTexture = "baseTexture",
e.FovLevel = "fovLevel",
e.IsSkyboxOn = "isSkyboxOn",
e.ScreenResolution = "screenResolution",
e.DidMigrateLegacyData = "didMigrateLegacyData",
e.LastReadNewsSimpleHash = "lastReadNewsSimpleHash",
e.LastOpenedCupId = "lastOpenedCupId",
e.SelectedSkinId = "selectedSkinId",
e.RenderLoop = "renderLoop",
e.NextPointPopupIndex = "nextPointPopupIndex",
e.DoNotShowJumpEnabledPopupAgain = "doNotShowJumpEnabledPopupAgain",
e.DoNotShowDriftEnabledPopupAgain = "doNotShowDriftEnabledPopupAgain",
e.MultiplayerName = "multiplayerName",
e.FavoriteMapIds = "favoriteMapIds",
e.LastVersionText = "lastVersionText",
e.LastMapIds = "lastMapIds",
e.AddedMapIds = "addedMapIds",
e.SelectedSoundtrack = "selectedSoundtrack",
e.LastSyncTimeMs = "lastSyncTimeMs",
e.IsSortedByCompletion = "isSortedByCompletion",
e.DoesUserHaveEpilepsy = "doesUserHaveEpilepsy",
e.UnlockedPuzzleSkinIds = "unlockedPuzzleSkinIds",
e))(G || {})
  , U = (e=>(e.Yes = "yes",
e.No = "no",
e.Maybe = "maybe",
e.On = "on",
e.Off = "off",
e.Vsync = "vsync",
e.Fixed = "fixed",
e.Dark = "dark",
e.Bright = "bright",
e.X1 = "x1",
e.X2 = "x2",
e.X3 = "x3",
e.Resolution400 = "400p",
e.Resolution600 = "600p",
e.Resolution900 = "900p",
e.Music1 = "Uprise",
e.Music2 = "Bloom",
e.Music3 = "Dodo Synthesis",
e.Music4 = "Brink",
e.MusicDefault = "Cup",
e))(U || {})
  , Je = (e=>(e.MapId = "mapId",
e.MapUrl = "mapUrl",
e.MapCodeVersion = "mapCodeVersion",
e.RoomCode = "roomCode",
e.PageId = "pageId",
e.CrashedText = "crashedText",
e.IsMultiplayer = "isMultiplayer",
e.FirstRoute = "firstRoute",
e))(Je || {})
  , ho = (e=>(e.Green = "#56e04c",
e.Red = "#e04c4f",
e.Gray = "#666666",
e))(ho || {})
  , ae = (e=>(e.Boot = "/",
e))(ae || {});
class go {
    constructor(t) {
        le(this, "bagManager");
        this.bagManager = t
    }
    onPageLoaded() {
        this.createHorizontalBagDiv()
    }
    createHorizontalBagDiv() {
        const t = document.getElementById("endingHorizontalBag");
        if (t == null)
            return;
        const n = document.createElement("div");
        n.id = wt.Horizontal,
        n.classList.add("ad"),
        t.appendChild(n)
    }
    static getHorizontalBagSpaces() {
        return Array.from(document.querySelectorAll(".bagSpaceHorizontal"))
    }
}
class ce {
    static isLocalhost() {
        return window.location.hostname === "localhost"
    }
    static getIcedodoVersionText() {
        return .175
    }
    static isExtension() {
        return !(window.chrome == null || window.chrome.storage == null)
    }
}
class sn {
    static green(t) {
        console.log("%c " + t, "background: #222; color: #bada55")
    }
    static pink(t) {
        console.log("%c " + t, "background: #222; color: pink")
    }
}
const bc = 1e3 / 10
  , wc = "NO_GROUP_ID"
  , vc = [35 * 1e3, 50 * 1e3, 65 * 1e3, 80 * 1e3, 95 * 1e3]
  , Mc = ["1-3", "3-5", "5-7", "7-9", "9-10", "3-7", "7-11"]
  , Rc = [1, 3, 5, 7];
var g = (e=>(e[e.Newcomer = 0] = "Newcomer",
e[e.Pilot = 1] = "Pilot",
e[e.Ye = 2] = "Ye",
e[e.Jay = 3] = "Jay",
e[e.Tim = 4] = "Tim",
e[e.Golden = 5] = "Golden",
e[e.Rocky = 6] = "Rocky",
e[e.June = 7] = "June",
e[e.Bean = 8] = "Bean",
e[e.Fish = 9] = "Fish",
e[e.Furby = 10] = "Furby",
e[e.Abc = 11] = "Abc",
e[e.Crazy = 12] = "Crazy",
e[e.Kazil = 13] = "Kazil",
e[e.Mango = 14] = "Mango",
e[e.Sleepy = 15] = "Sleepy",
e[e.Moosh = 16] = "Moosh",
e[e.Thero = 17] = "Thero",
e[e.Awehero = 18] = "Awehero",
e[e.Doom = 19] = "Doom",
e[e.Carrot = 20] = "Carrot",
e[e.Dark = 21] = "Dark",
e[e.Rytai = 22] = "Rytai",
e[e.Ghoul = 23] = "Ghoul",
e[e.Zhou = 24] = "Zhou",
e[e.Insolence = 25] = "Insolence",
e[e.Skilled = 26] = "Skilled",
e[e.Squirrel = 27] = "Squirrel",
e[e.Modded = 28] = "Modded",
e[e.Collab = 29] = "Collab",
e[e.Dodo = 30] = "Dodo",
e[e.Og = 31] = "Og",
e[e.Brew = 32] = "Brew",
e[e.Vault = 33] = "Vault",
e[e.Ultrahard = 34] = "Ultrahard",
e))(g || {});
const Ye = ct.getNumberEnumKeys(g);
var Ri = (e=>(e[e.Default = 0] = "Default",
e[e.Newcomer = 1] = "Newcomer",
e[e.Pilot = 2] = "Pilot",
e[e.Carrot = 3] = "Carrot",
e[e.Rocky = 4] = "Rocky",
e[e.Dodo = 5] = "Dodo",
e[e.Skilled = 6] = "Skilled",
e[e.Furby = 7] = "Furby",
e[e.Doom = 8] = "Doom",
e[e.Kazil = 9] = "Kazil",
e[e.Zhou = 10] = "Zhou",
e[e.Ye = 11] = "Ye",
e[e.Tim = 12] = "Tim",
e[e.Ghoul = 13] = "Ghoul",
e[e.Abc = 14] = "Abc",
e[e.Rytai = 15] = "Rytai",
e[e.Moosh = 16] = "Moosh",
e[e.Dark = 17] = "Dark",
e[e.Awehero = 18] = "Awehero",
e[e.Jay = 19] = "Jay",
e[e.Golden = 20] = "Golden",
e[e.Bean = 21] = "Bean",
e[e.Fish = 22] = "Fish",
e[e.Thero = 23] = "Thero",
e[e.Crazy = 24] = "Crazy",
e[e.June = 25] = "June",
e[e.Sleepy = 26] = "Sleepy",
e[e.Mango = 27] = "Mango",
e[e.Insolence = 28] = "Insolence",
e[e.Squirrel = 29] = "Squirrel",
e[e.Modded = 30] = "Modded",
e[e.Collab = 31] = "Collab",
e[e.Og = 32] = "Og",
e[e.Ultrahard = 33] = "Ultrahard",
e[e.Diff1 = 34] = "Diff1",
e[e.Diff2 = 35] = "Diff2",
e[e.Diff3 = 36] = "Diff3",
e[e.Diff4 = 37] = "Diff4",
e[e.Diff5 = 38] = "Diff5",
e[e.Diff6 = 39] = "Diff6",
e[e.Diff7 = 40] = "Diff7",
e[e.Diff8 = 41] = "Diff8",
e[e.Diff9 = 42] = "Diff9",
e[e.Diff10 = 43] = "Diff10",
e[e.Diff11 = 44] = "Diff11",
e[e.PointsA = 45] = "PointsA",
e[e.PointsB = 46] = "PointsB",
e[e.PointsC = 47] = "PointsC",
e[e.PointsD = 48] = "PointsD",
e[e.PointsE = 49] = "PointsE",
e[e.PointsF = 50] = "PointsF",
e[e.PercentA = 51] = "PercentA",
e[e.PercentB = 52] = "PercentB",
e[e.PercentC = 53] = "PercentC",
e[e.PercentD = 54] = "PercentD",
e[e.PercentE = 55] = "PercentE",
e[e.PuzzleA = 56] = "PuzzleA",
e))(Ri || {});
const Tc = ct.getNumberEnumKeys(Ri);
var z = (e=>(e.Bloom = "music/bloom.mp3",
e.Brink = "music/brink.mp3",
e.Dodosynthesis = "music/dodosynthesis.mp3",
e.Dodozart_by_insolence = "music/dodozart_by_insolence.mp3",
e.Microburst = "music/microburst.mp3",
e.Stairways = "music/stairways.mp3",
e.Tokyo = "music/tokyo.mp3",
e.Valkyrie = "music/valkyrie.mp3",
e.Uprise = "music/uprise.mp3",
e.Death = "sounds/death.wav",
e.LevelComplete = "sounds/level_complete.wav",
e.Click = "sounds/click.wav",
e))(z || {});
const Cc = ct.getStringEnumValues(z);
var _o = (e=>(e[e.BeforeConnect = 0] = "BeforeConnect",
e[e.Connecting = 1] = "Connecting",
e[e.AfterConnect = 2] = "AfterConnect",
e))(_o || {})
  , yo = (e=>(e[e.Room = 0] = "Room",
e[e.Game = 1] = "Game",
e[e.Recap = 2] = "Recap",
e[e.End = 3] = "End",
e))(yo || {});
const Pc = 500
  , xc = 3;
class bo {
    static getCupName(t) {
        return t === g.Newcomer ? "Ice Dodo" : g[t] + " Cup"
    }
    static getShortCupName(t) {
        return t === g.Newcomer ? "Ice Dodo" : g[t]
    }
    static getCupSkinUrl(t) {
        return `/maptester/assets/skins/${g[t].toLowerCase()}.png`
    }
    static isOnlyOnWebsite(t, n) {
        if (!n)
            return !1;
        switch (t) {
        case g.Vault:
        case g.Dodo:
        case g.Brew:
        case g.Og:
            return !0;
        default:
            return !1
        }
    }
    static getCupByDeltaIndex(t, n) {
        const i = Ye.indexOf(t) + n;
        return i < 0 ? g.Ultrahard : i >= Ye.length ? g.Newcomer : Ye[i]
    }
    static getBackgroundMusicForCup(t) {
        switch (t) {
        case g.Newcomer:
            return z.Uprise;
        case g.Pilot:
            return z.Bloom;
        case g.Carrot:
            return z.Microburst;
        case g.Rocky:
            return z.Dodosynthesis;
        case g.Dodo:
            return z.Uprise;
        case g.Skilled:
            return z.Dodozart_by_insolence;
        case g.Furby:
            return z.Microburst;
        case g.Doom:
            return z.Uprise;
        case g.Insolence:
            return z.Microburst;
        case g.Dark:
            return z.Uprise;
        case g.Kazil:
            return z.Stairways;
        case g.Zhou:
            return z.Uprise;
        case g.Ye:
            return z.Tokyo;
        case g.Tim:
            return z.Valkyrie;
        case g.Ghoul:
            return z.Uprise;
        case g.Abc:
            return z.Bloom;
        case g.Rytai:
            return z.Uprise;
        case g.Jay:
            return z.Dodosynthesis;
        case g.Golden:
            return z.Uprise;
        case g.Bean:
            return z.Dodozart_by_insolence;
        case g.Fish:
            return z.Microburst;
        case g.Thero:
            return z.Uprise;
        case g.Crazy:
            return z.Stairways;
        case g.June:
            return z.Uprise;
        case g.Sleepy:
            return z.Tokyo;
        case g.Mango:
            return z.Valkyrie;
        case g.Squirrel:
            return z.Uprise;
        case g.Moosh:
            return z.Valkyrie;
        case g.Awehero:
            return z.Valkyrie;
        case g.Modded:
            return z.Bloom;
        case g.Collab:
            return z.Uprise;
        case g.Og:
            return z.Valkyrie;
        case g.Brew:
            return z.Dodosynthesis;
        case g.Vault:
            return z.Stairways;
        case g.Ultrahard:
            return z.Uprise
        }
    }
    static getCupDescription(t) {
        switch (t) {
        case g.Newcomer:
            return "Easy maps for beginners.";
        case g.Pilot:
            return "Maps made by handsome uPilot. He aimed for his maps to be for beginners or players who are just bad.";
        case g.Carrot:
            return "Maps made by Carrots";
        case g.Rocky:
            return "Maps made by Rocky707";
        case g.Dodo:
            return "Maps made by Dododo73, the creator of the game.";
        case g.Skilled:
            return "Maps made by SkilledAndKilled (Currently Retired from mapmaking)";
        case g.Furby:
            return "Maps made by Furby (Currently Retired from mapmaking)";
        case g.Doom:
            return "Maps made by XDoomation (Currently Retired from mapmaking)";
        case g.Kazil:
            return "Maps made by Kazil (Currently Retired from mapmaking)";
        case g.Zhou:
            return "Maps made by Zhou Yu";
        case g.Ye:
            return "Maps made by David Ye";
        case g.Tim:
            return "Maps made by TimTam";
        case g.Awehero:
            return "Maps made by Awehero";
        case g.Moosh:
            return "Maps made by Moosh";
        case g.Ghoul:
            return "Maps made by Ghoul (Currently Retired from mapmaking)";
        case g.Abc:
            return "Maps made by ABC123";
        case g.Dark:
            return "Maps made by Darrk";
        case g.Rytai:
            return "Maps made by Rytai (Currently Retired from mapmaking)";
        case g.Golden:
            return "Bonus cup made by multiple mapmakers, presented by Golden. She is the main founder of the Ice Dodo tournaments";
        case g.Bean:
            return "Bonus cup made by multiple mapmakers, presented by Bean. He was a maptester who would reject basically every map that would be submitted of the game.";
        case g.Fish:
            return "Bonus cup named after catfishpie who is a loyal mapmaker and let other mapmakers put maps in his cup.";
        case g.Crazy:
            return "Bonus cup with maps made by multiple mapmakers, presented by Cr4zy";
        case g.Jay:
            return "Maps made by Jay (Currently Retired from mapmaking)";
        case g.Thero:
            return "Bonus cup with maps made by multiple mapmakers, presented by Thero. ";
        case g.June:
            return "Bonus cup with maps made by multiple mapmakers, presented by June.";
        case g.Sleepy:
            return "Bonus cup with maps made by multiple mapmakers, by sleepy. He was the top leaderboard contestant for 8 months straight.";
        case g.Mango:
            return "Bonus cup with maps made by multiple mapmakers, presented by Mango";
        case g.Squirrel:
            return "Bonus cup with maps made by multiple mapmakers, presented by Squirrel";
        case g.Insolence:
            return "Bonus cup with maps made by multiple mapmakers, presented by The Insolence Watches You";
        case g.Modded:
            return "Maps that were hard-coded in Javascript. They run custom scripts. Play at your own risk!";
        case g.Collab:
            return "Maps made in collaboration by 2 or more map makers.";
        case g.Og:
            return "Maps made before 2018.";
        case g.Brew:
            return "Maps brewing in the map development pool! They are not officially added yet.";
        case g.Vault:
            return "Maps that were so bad we decided to get rid of them.";
        case g.Ultrahard:
            return "Extremely hard maps. Difficulty 10-11."
        }
    }
}
class es {
    static getCondensedMapListings(t) {
        switch (t) {
        case g.Newcomer:
            return [{
                diff: 1,
                id: "tut1",
                name: "Welcome Map"
            }, {
                diff: 1,
                id: "hello_world",
                name: "Hello World"
            }, {
                diff: 1,
                id: "trek",
                name: "Trek"
            }, {
                diff: 1,
                id: "coaster",
                name: "Coaster"
            }, {
                diff: 1,
                id: "slow_walk",
                name: "Slow Walk"
            }, {
                diff: 2,
                id: "bumper",
                name: "Bumper"
            }, {
                diff: 2,
                id: "ice2",
                name: "Snowboarder"
            }, {
                diff: 2,
                id: "ez_map",
                name: "EZ Map"
            }, {
                diff: 2,
                id: "heights",
                name: "Heights"
            }, {
                diff: 2,
                id: "beach",
                name: "Beach"
            }, {
                diff: 2,
                id: "beardedbaby",
                name: "Mountain"
            }, {
                diff: 2,
                id: "boat_bounce",
                name: "Boat Bounce"
            }, {
                diff: 2,
                id: "jetty",
                name: "Jetty"
            }, {
                diff: 3,
                id: "og2",
                name: "Challenge"
            }, {
                diff: 3,
                id: "og35",
                name: "Graphics Test"
            }, {
                diff: 3,
                id: "scorpion",
                name: "Scorpion"
            }, {
                diff: 3,
                id: "topsy_turvy",
                name: "Topsy Turvy"
            }, {
                diff: 3,
                id: "speed_jump",
                name: "Speed Jump"
            }, {
                diff: 3,
                id: "dodo_type_beat",
                name: "Dodo Type Beat"
            }, {
                diff: 3,
                id: "easydrifting",
                name: "Easy Drifting"
            }, {
                diff: 4,
                id: "conveyor",
                name: "Conveyor"
            }, {
                diff: 4,
                id: "frost_factory",
                name: "Frost Factory"
            }, {
                diff: 4,
                id: "blink_street",
                name: "Blink Street"
            }, {
                diff: 4,
                id: "motor",
                name: "Motor"
            }, {
                diff: 5,
                id: "coneycliffs",
                name: "Coney Cliffs"
            }, {
                diff: 5,
                id: "spacetest",
                name: "Space Test"
            }];
        case g.Pilot:
            return [{
                diff: 1,
                id: "bounce",
                name: "Bounce"
            }, {
                diff: 1,
                id: "coaster",
                name: "Coaster"
            }, {
                diff: 1,
                id: "nothing_is_easy",
                name: "Nothing is Easy"
            }, {
                diff: 2,
                id: "going_through",
                name: "Going Through"
            }, {
                diff: 2,
                id: "bottom_to_top",
                name: "Bottom To Top"
            }, {
                diff: 2,
                id: "bumper",
                name: "Bumper"
            }, {
                diff: 2,
                id: "steep_walls",
                name: "Steep Walls"
            }, {
                diff: 2,
                id: "crazy_cones",
                name: "Crazy Cones"
            }, {
                diff: 2,
                id: "trust",
                name: "Trust"
            }, {
                diff: 3,
                id: "gravity_bounce",
                name: "Gravity Bounce"
            }, {
                diff: 3,
                id: "launch",
                name: "Launch"
            }, {
                diff: 3,
                id: "soaring",
                name: "Soaring"
            }, {
                diff: 3,
                id: "first_person",
                name: "First Person"
            }, {
                diff: 3,
                id: "holographic",
                name: "Holographic"
            }, {
                diff: 3,
                id: "think_fast",
                name: "Think Fast"
            }, {
                diff: 3,
                id: "jump_path",
                name: "Jump Path"
            }, {
                diff: 3,
                id: "bridge_of_speed",
                name: "Bridge Of Speed"
            }, {
                diff: 3,
                id: "mixed_leaps",
                name: "Mixed Leaps"
            }, {
                diff: 3,
                id: "moving_bridge",
                name: "Moving Bridge"
            }];
        case g.Carrot:
            return [{
                diff: 1,
                id: "lanterns",
                name: "Lanterns"
            }, {
                diff: 3,
                id: "megafauna",
                name: "Megafauna"
            }, {
                diff: 3,
                id: "dodo_type_beat",
                name: "Dodo Type Beat"
            }, {
                diff: 3,
                id: "mirror",
                name: "Mirror"
            }, {
                diff: 3,
                id: "remote_control",
                name: "remote control"
            }, {
                diff: 3,
                id: "afterlife",
                name: "AFTERLIFE"
            }, {
                diff: 4,
                id: "blink_street",
                name: "Blink Street"
            }, {
                diff: 4,
                id: "asteroid_belt",
                name: "Asteroid Belt"
            }, {
                diff: 5,
                id: "redlights",
                name: "Red Lights Green Lights"
            }, {
                diff: 5,
                id: "conefield",
                name: "Conefield"
            }, {
                diff: 5,
                id: "necropolis",
                name: "Necropolis"
            }, {
                diff: 5,
                id: "solar_system",
                name: "Solar System"
            }, {
                diff: 5,
                id: "trial_by_magic",
                name: "Trial by Magic"
            }, {
                diff: 5,
                id: "celestial_magnetism",
                name: "Celestial Magnetism"
            }, {
                diff: 5,
                id: "phantasmagoria",
                name: "Phantasmagoria"
            }, {
                diff: 6,
                id: "snowmen_land",
                name: "Snowmen Land"
            }, {
                diff: 6,
                id: "snowmenace",
                name: "Snowmenace"
            }, {
                diff: 6,
                id: "stardust",
                name: "Project Stardust"
            }, {
                diff: 6,
                id: "climbing_dodo_fortress",
                name: "Climbing Dodo Fortress"
            }, {
                diff: 6,
                id: "utopia_is_up_there",
                name: "Utopia is Up There"
            }, {
                diff: 7,
                id: "prison_is_2d",
                name: "Prison is 2D"
            }, {
                diff: 7,
                id: "revolving_cube_floats",
                name: "Revolving Cube Floats"
            }, {
                diff: 7,
                id: "verdant_cubism",
                name: "Verdant Cubism"
            }, {
                diff: 8,
                id: "spacecanyon",
                name: "Space Canyon"
            }];
        case g.Awehero:
            return [{
                diff: 1,
                id: "dodo_circuit",
                name: "Dodo Circuit"
            }, {
                diff: 2,
                id: "colors",
                name: "Colors"
            }, {
                diff: 2,
                id: "fire_fighter",
                name: "Fire Fighter"
            }, {
                diff: 3,
                id: "gymnasium",
                name: "Gymnasium"
            }, {
                diff: 3,
                id: "moon_jumps",
                name: "Moon Jumps"
            }, {
                diff: 4,
                id: "sherbet_land",
                name: "Sherbet Land"
            }, {
                diff: 4,
                id: "play_fort",
                name: "Play Fort"
            }, {
                diff: 4,
                id: "push_the_block",
                name: "Push the Block"
            }, {
                diff: 4,
                id: "squid_dodo",
                name: "Squid Dodo"
            }, {
                diff: 5,
                id: "ice_hockey",
                name: "Ice Hockey"
            }, {
                diff: 5,
                id: "soccer",
                name: "Soccer"
            }, {
                diff: 5,
                id: "escape_the_box",
                name: "Escape the Box"
            }, {
                diff: 5,
                id: "dodo_says",
                name: "Dodo Says"
            }, {
                diff: 6,
                id: "button_maze",
                name: "Button maze"
            }, {
                diff: 6,
                id: "rock_climbing",
                name: "Rock Climbing"
            }, {
                diff: 7,
                id: "dodos_among_us",
                name: "Dodos among us"
            }];
        case g.Rocky:
            return [{
                diff: 0,
                id: "ice_bot",
                name: "Ice Bot"
            }, {
                diff: 1,
                id: "hello_world",
                name: "Hello World"
            }, {
                diff: 1,
                id: "temple",
                name: "Temple"
            }, {
                diff: 1,
                id: "neo",
                name: "Neo"
            }, {
                diff: 1,
                id: "jump_pads",
                name: "Jump Pads"
            }, {
                diff: 2,
                id: "gearbox",
                name: "Gearbox"
            }, {
                diff: 2,
                id: "rooftops",
                name: "Rooftops"
            }, {
                diff: 2,
                id: "pool",
                name: "Pool"
            }, {
                diff: 2,
                id: "parke",
                name: "Parke"
            }, {
                diff: 2,
                id: "hide_and_seek",
                name: "Hide and Seek"
            }, {
                diff: 2,
                id: "tilted_tracks",
                name: "Tilted Tracks"
            }, {
                diff: 2,
                id: "the_floor_is_lava",
                name: "The Floor Is Lava"
            }, {
                diff: 2,
                id: "stone_path",
                name: "Stone Path"
            }, {
                diff: 3,
                id: "pyrovision",
                name: "Pyrovision"
            }, {
                diff: 3,
                id: "asteroids",
                name: "Asteroids"
            }, {
                diff: 3,
                id: "triskaidekaphobia",
                name: "Triskaidekaphobia"
            }, {
                diff: 3,
                id: "automatic_and_manual",
                name: "Automatic and Manual"
            }, {
                diff: 3,
                id: "barn",
                name: "Barn"
            }, {
                diff: 3,
                id: "pathway",
                name: "Pathway"
            }, {
                diff: 3,
                id: "blindness",
                name: "Blindness"
            }, {
                diff: 3,
                id: "desserts",
                name: "Desserts"
            }, {
                diff: 3,
                id: "spook",
                name: "Spook"
            }, {
                diff: 3,
                id: "the_backrooms",
                name: "The Backrooms"
            }, {
                diff: 4,
                id: "cone_haven",
                name: "Cone Haven"
            }, {
                diff: 4,
                id: "shrink_ray",
                name: "Shrink Ray"
            }, {
                diff: 4,
                id: "pac_dodo",
                name: "Pac Dodo"
            }, {
                diff: 5,
                id: "rotating_spirals",
                name: "Rotating Spirals"
            }, {
                diff: 4,
                id: "memory_game",
                name: "Memory Game"
            }, {
                diff: 4,
                id: "colosseum",
                name: "Colosseum"
            }, {
                diff: 4,
                id: "wipeout",
                name: "Wipeout"
            }, {
                diff: 4,
                id: "icerace",
                name: "Icerace"
            }, {
                diff: 5,
                id: "minecarts",
                name: "Minecarts"
            }, {
                diff: 5,
                id: "thero",
                name: "Thero"
            }, {
                diff: 5,
                id: "troll_map",
                name: "Troll Map"
            }, {
                diff: 5,
                id: "point_of_no_return",
                name: "Point Of No Return"
            }, {
                diff: 5,
                id: "skating",
                name: "Skating"
            }, {
                diff: 5,
                id: "papercut",
                name: "Papercut"
            }, {
                diff: 6,
                id: "tight_path",
                name: "Tight Path"
            }, {
                diff: 6,
                id: "chase",
                name: "Chase"
            }, {
                diff: 6,
                id: "gravity_chamber",
                name: "Gravity Chamber"
            }, {
                diff: 6,
                id: "wall_jumps",
                name: "Wall Jumps"
            }, {
                diff: 7,
                id: "sinking_ship",
                name: "Sinking Ship"
            }, {
                diff: 8,
                id: "weaving",
                name: "Weaving"
            }, {
                diff: 8,
                id: "rhythm",
                name: "Rhythm"
            }, {
                diff: 9,
                id: "dragon_dance",
                name: "Dragon Dance"
            }];
        case g.Dodo:
            return [{
                diff: 1,
                id: "tut1",
                name: "Welcome Map"
            }, {
                diff: 2,
                id: "castle",
                name: "Castle"
            }, {
                diff: 2,
                id: "ice2",
                name: "Snowboarder"
            }, {
                diff: 2,
                id: "ravine",
                name: "Ravine"
            }, {
                diff: 3,
                id: "ice1",
                name: "Icy Path"
            }, {
                diff: 4,
                id: "motor",
                name: "Motor"
            }, {
                diff: 4,
                id: "floating_fortress",
                name: "Floating Fortress"
            }, {
                diff: 5,
                id: "cone2",
                name: "The Red Hats"
            }, {
                diff: 5,
                id: "cone3",
                name: "Dangerous Zone"
            }, {
                diff: 5,
                id: "tenet",
                name: "Tenet"
            }, {
                diff: 6,
                id: "cone1",
                name: "4D Demon Cinema"
            }, {
                diff: 8,
                id: "inverted_playground",
                name: "Inverted Playground"
            }];
        case g.Skilled:
            return [{
                diff: 1,
                id: "alley",
                name: "Alley"
            }, {
                diff: 4,
                id: "train",
                name: "Train"
            }, {
                diff: 4,
                id: "rotating_blades",
                name: "Rotating Blades"
            }, {
                diff: 5,
                id: "acceleration_and_brakes",
                name: "Acceleration and Brakes"
            }, {
                diff: 5,
                id: "broken_bridge",
                name: "Broken Bridge"
            }, {
                diff: 5,
                id: "sharp_turning",
                name: "Sharp turning"
            }, {
                diff: 5,
                id: "flipside",
                name: "Flipside"
            }, {
                diff: 5,
                id: "flame",
                name: "Flame"
            }, {
                diff: 6,
                id: "lightning",
                name: "Lightning"
            }, {
                diff: 6,
                id: "moving_blocks",
                name: "Moving Blocks"
            }, {
                diff: 6,
                id: "blind_spot",
                name: "Blind Spot"
            }, {
                diff: 6,
                id: "teleport",
                name: "Teleport"
            }, {
                diff: 6,
                id: "parkour",
                name: "Parkour"
            }, {
                diff: 6,
                id: "transcendence",
                name: "Transcendence"
            }, {
                diff: 6,
                id: "skiing",
                name: "Skiing"
            }, {
                diff: 7,
                id: "bridge_of_peril",
                name: "Bridge of Peril"
            }, {
                diff: 7,
                id: "racetrack",
                name: "Racetrack"
            }, {
                diff: 8,
                id: "encirclement",
                name: "Encirclement"
            }, {
                diff: 9,
                id: "phase_shift",
                name: "Phase shift"
            }];
        case g.Furby:
            return [{
                diff: 2,
                id: "the_sloth",
                name: "The Sloth"
            }, {
                diff: 2,
                id: "ice_cold",
                name: "Ice Cold"
            }, {
                diff: 2,
                id: "king_of_the_clouds",
                name: "King of the Clouds"
            }, {
                diff: 2,
                id: "geometrical",
                name: "Geometrical"
            }, {
                diff: 3,
                id: "invisible_maze",
                name: "Invisible Maze"
            }, {
                diff: 4,
                id: "trapped_temple",
                name: "Trapped Temple"
            }, {
                diff: 4,
                id: "glass_staircase",
                name: "Glass Staircase"
            }, {
                diff: 4,
                id: "micrododo",
                name: "Micrododo"
            }, {
                diff: 4,
                id: "super_dodo_bros",
                name: "Super Dodo Bros"
            }, {
                diff: 5,
                id: "the_cheetah",
                name: "The Cheetah"
            }, {
                diff: 5,
                id: "haunted_ruins",
                name: "Haunted Ruins"
            }, {
                diff: 6,
                id: "cutting_corners",
                name: "Cutting Corners"
            }, {
                diff: 6,
                id: "nascar",
                name: "NASCAR"
            }, {
                diff: 6,
                id: "ninja_warrior",
                name: "Ninja Warrior"
            }, {
                diff: 7,
                id: "spitting_spikes",
                name: "Spitting Spikes"
            }, {
                diff: 7,
                id: "chichen_itza",
                name: "Chichen Itza"
            }, {
                diff: 8,
                id: "balance_beam",
                name: "Balance Beam"
            }];
        case g.Doom:
            return [{
                diff: 1,
                id: "slow_walk",
                name: "Slow Walk"
            }, {
                diff: 2,
                id: "ez_map",
                name: "EZ Map"
            }, {
                diff: 2,
                id: "gradual_climb",
                name: "Gradual Climb"
            }, {
                diff: 3,
                id: "speed_jump",
                name: "Speed Jump"
            }, {
                diff: 3,
                id: "wall_of_force",
                name: "Wall of Force"
            }, {
                diff: 4,
                id: "invisible_road",
                name: "Invisible Road"
            }, {
                diff: 5,
                id: "dragon_domain",
                name: "Dragon Domain"
            }, {
                diff: 5,
                id: "volcano",
                name: "Volcano"
            }, {
                diff: 5,
                id: "cone_elevator",
                name: "Cone-Elevator"
            }, {
                diff: 6,
                id: "u_turn2",
                name: "U Turn"
            }, {
                diff: 7,
                id: "sea_of_fire",
                name: "Sea of Fire"
            }, {
                diff: 7,
                id: "into_the_sky",
                name: "Into the Sky"
            }, {
                diff: 7,
                id: "1c3d0d0",
                name: "1c3d0d0"
            }, {
                diff: 8,
                id: "tube_elevator",
                name: "Tube elevator"
            }, {
                diff: 8,
                id: "skilledorkilled",
                name: "Skilledorkilled"
            }];
        case g.Kazil:
            return [{
                diff: 0,
                id: "no_hands",
                name: "No Hands"
            }, {
                diff: 1,
                id: "trek",
                name: "Trek"
            }, {
                diff: 3,
                id: "scorpion",
                name: "Scorpion"
            }, {
                diff: 3,
                id: "trailblazer",
                name: "Trailblazer"
            }, {
                diff: 3,
                id: "easydrifting",
                name: "Easy Drifting"
            }, {
                diff: 3,
                id: "secrettunnel",
                name: "Secret Tunnel"
            }, {
                diff: 4,
                id: "snake_climb",
                name: "Snake Climb"
            }, {
                diff: 5,
                id: "moving_road",
                name: "Moving Road"
            }, {
                diff: 5,
                id: "sky_run",
                name: "Sky Run"
            }, {
                diff: 5,
                id: "race",
                name: "Race"
            }, {
                diff: 6,
                id: "observatory",
                name: "Observatory"
            }, {
                diff: 6,
                id: "crosspath",
                name: "Cross Path"
            }, {
                diff: 6,
                id: "apartment",
                name: "Apartment"
            }];
        case g.Zhou:
            return [{
                diff: 2,
                id: "autumn",
                name: "Autumn"
            }, {
                diff: 2,
                id: "beach",
                name: "Beach"
            }, {
                diff: 2,
                id: "chemistry",
                name: "Chemistry"
            }, {
                diff: 2,
                id: "memoirs",
                name: "Memoirs"
            }, {
                diff: 3,
                id: "ruins",
                name: "Ruins"
            }, {
                diff: 4,
                id: "dodo_eat_ice",
                name: "Dodo Eat Ice"
            }, {
                diff: 4,
                id: "castle_in_the_sky",
                name: "Castle in the Sky"
            }, {
                diff: 5,
                id: "mini_golf",
                name: "Mini Golf"
            }, {
                diff: 6,
                id: "sector_8",
                name: "Sector 8"
            }, {
                diff: 6,
                id: "spin_dodge",
                name: "Spin Dodge"
            }, {
                diff: 6,
                id: "cone_maze",
                name: "Cone Maze"
            }, {
                diff: 7,
                id: "portals",
                name: "Portals"
            }, {
                diff: 7,
                id: "dodo_tower",
                name: "Dodo Tower"
            }, {
                diff: 7,
                id: "piano",
                name: "Piano"
            }, {
                diff: 7,
                id: "air_road",
                name: "Air Road"
            }, {
                diff: 9,
                id: "skill_trail",
                name: "Skill Trial"
            }, {
                diff: 9,
                id: "cyan_citadel",
                name: "Cyan Citadel"
            }, {
                diff: 9,
                id: "upside_down_city",
                name: "Upside Down City"
            }];
        case g.Ye:
            return [{
                diff: 1,
                id: "flip_turn",
                name: "Flip Turn"
            }, {
                diff: 2,
                id: "arithmetic",
                name: "Arithmetic"
            }, {
                diff: 2,
                id: "through_the_block",
                name: "Through the Block"
            }, {
                diff: 2,
                id: "holes_and_cracks",
                name: "Holes and Cracks"
            }, {
                diff: 2,
                id: "jetty",
                name: "Jetty"
            }, {
                diff: 2,
                id: "the_golden_brick",
                name: "The Golden Brick"
            }, {
                diff: 3,
                id: "earthquake",
                name: "Earthquake"
            }, {
                diff: 3,
                id: "shapes",
                name: "Shapes"
            }, {
                diff: 3,
                id: "topsy_turvy",
                name: "Topsy Turvy"
            }, {
                diff: 4,
                id: "messiness",
                name: "Messiness"
            }, {
                diff: 4,
                id: "fade",
                name: "Fade"
            }, {
                diff: 4,
                id: "plot_twist",
                name: "Plot Twist"
            }, {
                diff: 4,
                id: "into_fire",
                name: "Into Fire"
            }, {
                diff: 5,
                id: "ambiguity",
                name: "Ambiguity"
            }, {
                diff: 5,
                id: "left_and_right",
                name: "Left and Right"
            }, {
                diff: 6,
                id: "triple_troll",
                name: "Triple Troll"
            }, {
                diff: 7,
                id: "finding_patterns",
                name: "finding patterns"
            }, {
                diff: 7,
                id: "deadly_precision",
                name: "Deadly Precision"
            }];
        case g.Tim:
            return [{
                diff: 2,
                id: "ffffff",
                name: "ffffff"
            }, {
                diff: 2,
                id: "pantheon",
                name: "Pantheon"
            }, {
                diff: 3,
                id: "dreamscapes",
                name: "Dreamscapes"
            }, {
                diff: 3,
                id: "badlands",
                name: "Badlands"
            }, {
                diff: 3,
                id: "honeylands",
                name: "Honeylands"
            }, {
                diff: 3,
                id: "silly_cube_level",
                name: "Silly Cube Level"
            }, {
                diff: 4,
                id: "reaction",
                name: "Reaction"
            }, {
                diff: 4,
                id: "block_flight",
                name: "Block Flight"
            }, {
                diff: 4,
                id: "industrial",
                name: "Industrial"
            }, {
                diff: 4,
                id: "firefrost",
                name: "Firefrost"
            }, {
                diff: 5,
                id: "falling_game",
                name: "Falling Game"
            }, {
                diff: 5,
                id: "sinking_incline",
                name: "Sinking Incline"
            }, {
                diff: 5,
                id: "symmetrism",
                name: "Symmetrism"
            }, {
                diff: 6,
                id: "moonrunner",
                name: "Moonrunner"
            }, {
                diff: 7,
                id: "power_rooms",
                name: "Power Rooms"
            }, {
                diff: 8,
                id: "ironriver_rapids",
                name: "Ironriver Rapids"
            }, {
                diff: 8,
                id: "spinwhirl_street",
                name: "Spinwhirl Street"
            }];
        case g.Ghoul:
            return [{
                diff: 2,
                id: "high_and_low",
                name: "High and Low"
            }, {
                diff: 4,
                id: "land_to_sky",
                name: "Land to sky"
            }, {
                diff: 4,
                id: "cave",
                name: "Cave"
            }, {
                diff: 4,
                id: "desert",
                name: "Desert"
            }, {
                diff: 4,
                id: "waterfall",
                name: "Waterfall"
            }, {
                diff: 5,
                id: "river",
                name: "River"
            }, {
                diff: 5,
                id: "space_junk",
                name: "Space Junk"
            }, {
                diff: 6,
                id: "polymorph",
                name: "Polymorph"
            }, {
                diff: 6,
                id: "technocracy",
                name: "Technocracy"
            }, {
                diff: 6,
                id: "city",
                name: "City"
            }, {
                diff: 7,
                id: "serpents_tail",
                name: "Serpents Tail"
            }, {
                diff: 7,
                id: "darkness",
                name: "Darkness"
            }, {
                diff: 8,
                id: "rabid",
                name: "Rabid"
            }];
        case g.Abc:
            return [{
                diff: 1,
                id: "sidewalk",
                name: "Sidewalk"
            }, {
                diff: 2,
                id: "trainway",
                name: "trainway"
            }, {
                diff: 2,
                id: "neighbourhood",
                name: "Neighbourhood"
            }, {
                diff: 3,
                id: "drums",
                name: "Drums"
            }, {
                diff: 3,
                id: "wilderness",
                name: "Wilderness"
            }, {
                diff: 4,
                id: "opposite_day",
                name: "Opposite Day"
            }, {
                diff: 4,
                id: "road_race",
                name: "Road Race"
            }, {
                diff: 4,
                id: "mushroom_peninsula",
                name: "Mushroom peninsula"
            }, {
                diff: 5,
                id: "a_thundery_journey",
                name: "A Thundery Journey"
            }, {
                diff: 5,
                id: "moonwalk",
                name: "moonwalk"
            }, {
                diff: 6,
                id: "wall_to_wall",
                name: "Wall To Wall"
            }, {
                diff: 6,
                id: "fatal_leaps",
                name: "Fatal Leaps"
            }, {
                diff: 6,
                id: "operations",
                name: "Operations"
            }, {
                diff: 7,
                id: "wall_paths",
                name: "Wall Paths"
            }, {
                diff: 7,
                id: "anguished",
                name: "Anguished"
            }, {
                diff: 8,
                id: "provoking",
                name: "Provoking"
            }];
        case g.Rytai:
            return [{
                diff: 3,
                id: "tubes",
                name: "Tubes"
            }, {
                diff: 4,
                id: "rebound",
                name: "Rebound"
            }, {
                diff: 4,
                id: "chemical_breakout",
                name: "Chemical breakout"
            }, {
                diff: 4,
                id: "eternal_atake",
                name: "Eternal Atake"
            }, {
                diff: 5,
                id: "entity",
                name: "Entity"
            }, {
                diff: 5,
                id: "blue_bird",
                name: "Blue Bird"
            }, {
                diff: 5,
                id: "rocky_climb",
                name: "Rocky Climb"
            }, {
                diff: 5,
                id: "dark_realm",
                name: "Dark Realm"
            }, {
                diff: 6,
                id: "heartattack",
                name: "Heart Attack"
            }, {
                diff: 6,
                id: "tremor",
                name: "Tremor"
            }, {
                diff: 7,
                id: "pinpoint",
                name: "PinPoint"
            }];
        case g.Jay:
            return [{
                diff: 3,
                id: "equilibrium",
                name: "Equilibrium"
            }, {
                diff: 3,
                id: "speedrunner",
                name: "Speedrunner"
            }, {
                diff: 3,
                id: "geyser",
                name: "Geyser"
            }, {
                diff: 3,
                id: "aurora",
                name: "Aurora"
            }, {
                diff: 4,
                id: "odyssey",
                name: "Odyssey"
            }, {
                diff: 4,
                id: "illusions",
                name: "Illusions"
            }, {
                diff: 4,
                id: "sunset",
                name: "Sunset"
            }, {
                diff: 4,
                id: "frost_factory",
                name: "Frost Factory"
            }, {
                diff: 5,
                id: "caik",
                name: "Caik"
            }, {
                diff: 5,
                id: "stratosphere",
                name: "Stratosphere"
            }, {
                diff: 6,
                id: "rust",
                name: "Rust"
            }, {
                diff: 6,
                id: "vindicated",
                name: "Vindicated"
            }];
        case g.Golden:
            return [{
                diff: 1,
                id: "infiltration",
                name: "Infiltration"
            }, {
                diff: 1,
                id: "dodo_cube",
                name: "Dodo Cube"
            }, {
                diff: 2,
                id: "snow_hill",
                name: "Snow hill"
            }, {
                diff: 2,
                id: "grass_hill",
                name: "Grass Hill"
            }, {
                diff: 2,
                id: "skittletopia",
                name: "Skittletopia"
            }, {
                diff: 3,
                id: "centred",
                name: "Centred"
            }, {
                diff: 3,
                id: "walking_with_wienerdogs",
                name: "walking with wienerdogs"
            }, {
                diff: 3,
                id: "2_dollar_minecraft",
                name: "2 Dollar Minecraft"
            }, {
                diff: 3,
                id: "trippy",
                name: "Trippy"
            }, {
                diff: 3,
                id: "ominous_cave",
                name: "Ominous cave"
            }, {
                diff: 4,
                id: "wrenched_water_pipes",
                name: "Wrenched Water Pipes"
            }, {
                diff: 4,
                id: "keyboard",
                name: "Keyboard"
            }, {
                diff: 4,
                id: "clocks",
                name: "Clocks"
            }, {
                diff: 4,
                id: "computer_realm",
                name: "Computer Realm"
            }, {
                diff: 4,
                id: "colour_wheel",
                name: "Colour Wheel"
            }, {
                diff: 5,
                id: "blind_maze",
                name: "Blind Maze"
            }, {
                diff: 5,
                id: "side_to_side",
                name: "Side to Side"
            }, {
                diff: 6,
                id: "slippery_path",
                name: "Slippery Path"
            }, {
                diff: 6,
                id: "cosmic_dogfight",
                name: "Cosmic Dogfight"
            }, {
                diff: 6,
                id: "albus",
                name: "Albus"
            }, {
                diff: 6,
                id: "the_unseen",
                name: "the unseen"
            }, {
                diff: 6,
                id: "gelatinous",
                name: "Gelatinous"
            }, {
                diff: 7,
                id: "anomaly",
                name: "Anomaly"
            }, {
                diff: 7,
                id: "dna",
                name: "DNA"
            }, {
                diff: 8,
                id: "chaos_zone",
                name: "Chaos Zone"
            }];
        case g.Bean:
            return [{
                diff: 1,
                id: "contrast",
                name: "Contrast"
            }, {
                diff: 1,
                id: "dash_of_the_canyon",
                name: "Dash Of The Canyon"
            }, {
                diff: 1,
                id: "basketball",
                name: "Basketball"
            }, {
                diff: 2,
                id: "beardedbaby",
                name: "Mountain"
            }, {
                diff: 3,
                id: "touchdown",
                name: "Touchdown"
            }, {
                diff: 4,
                id: "igloos",
                name: "Igloos"
            }, {
                diff: 4,
                id: "sungjoon",
                name: "Turning Challenge"
            }, {
                diff: 4,
                id: "treetops",
                name: "Treetops"
            }, {
                diff: 5,
                id: "dull_to_rainbow",
                name: "Dull to Rainbow"
            }, {
                diff: 5,
                id: "tack_zone",
                name: "tack zone"
            }, {
                diff: 5,
                id: "facility_failure",
                name: "facility failure"
            }, {
                diff: 6,
                id: "flight",
                name: "Flight"
            }, {
                diff: 6,
                id: "dodo_rebound",
                name: "Dodo Rebound"
            }, {
                diff: 7,
                id: "leaps_of_faith",
                name: "Leaps of Faith"
            }, {
                diff: 7,
                id: "everest",
                name: "Everest"
            }, {
                diff: 7,
                id: "dodo_kong",
                name: "Dodo Kong"
            }];
        case g.Fish:
            return [{
                diff: 2,
                id: "boat_bounce",
                name: "Boat Bounce"
            }, {
                diff: 3,
                id: "radioactive",
                name: "Radioactive"
            }, {
                diff: 3,
                id: "dark_alley",
                name: "Dark Alley"
            }, {
                diff: 3,
                id: "uphill_battle",
                name: "Uphill Battle"
            }, {
                diff: 3,
                id: "into_the_night",
                name: "Into the Night"
            }, {
                diff: 4,
                id: "space_invasion",
                name: "Space Invasion"
            }, {
                diff: 4,
                id: "city_parkour",
                name: "City Parkour"
            }, {
                diff: 4,
                id: "scale",
                name: "Scale"
            }, {
                diff: 4,
                id: "factory_escape",
                name: "Factory Escape"
            }, {
                diff: 4,
                id: "fish_parkour",
                name: "Fish Parkour"
            }, {
                diff: 5,
                id: "totally_not_gd",
                name: "Totally Not GD"
            }, {
                diff: 5,
                id: "underwater",
                name: "Underwater"
            }, {
                diff: 5,
                id: "gravity_jump",
                name: "Gravity Jump"
            }, {
                diff: 5,
                id: "spike_dash",
                name: "Spike Dash"
            }, {
                diff: 6,
                id: "road_rage",
                name: "Road Rage"
            }, {
                diff: 6,
                id: "ramp_rush",
                name: "Ramp Rush"
            }, {
                diff: 6,
                id: "coral_ocean",
                name: "Coral Ocean"
            }, {
                diff: 6,
                id: "dodo_launch",
                name: "Dodo Launch"
            }, {
                diff: 7,
                id: "permafrost",
                name: "Permafrost"
            }];
        case g.Thero:
            return [{
                diff: 1,
                id: "colour_panel",
                name: "Colour panel"
            }, {
                diff: 2,
                id: "ski_slope",
                name: "Ski Slope"
            }, {
                diff: 3,
                id: "blizzard",
                name: "Blizzard"
            }, {
                diff: 3,
                id: "smoke",
                name: "Smoke"
            }, {
                diff: 3,
                id: "cone_city",
                name: "Cone City"
            }, {
                diff: 3,
                id: "zestyverse",
                name: "zestyverse"
            }, {
                diff: 3,
                id: "frozen_cave",
                name: "Frozen Cave"
            }, {
                diff: 4,
                id: "treacherous_overpass",
                name: "Treacherous Overpass"
            }, {
                diff: 4,
                id: "behind_the_wall",
                name: "Behind the Wall"
            }, {
                diff: 5,
                id: "verglas",
                name: "Verglas"
            }, {
                diff: 5,
                id: "eyes_in_the_water",
                name: "Eyes in the Water"
            }, {
                diff: 5,
                id: "sawmill",
                name: "Sawmill"
            }, {
                diff: 5,
                id: "no_jokes",
                name: "no jokes"
            }, {
                diff: 5,
                id: "dukki_lake",
                name: "Dukki Lake"
            }, {
                diff: 5,
                id: "chicanery",
                name: "Chicanery"
            }, {
                diff: 5,
                id: "sunset_jump",
                name: "Sunset Jump"
            }, {
                diff: 6,
                id: "magma_outbreak",
                name: "Magma Outbreak"
            }, {
                diff: 6,
                id: "maple_leaf",
                name: "maple leaf"
            }, {
                diff: 6,
                id: "green_greens",
                name: "Green Greens"
            }, {
                diff: 6,
                id: "motion_medley",
                name: "Motion Medley"
            }, {
                diff: 7,
                id: "goofier_ahh",
                name: "goofier ahh"
            }, {
                diff: 7,
                id: "find_a_way",
                name: "Find a Way"
            }, {
                diff: 8,
                id: "skill_issue",
                name: "Skill Issue"
            }, {
                diff: 9,
                id: "goofy_ahh",
                name: "goofy ahh"
            }, {
                diff: 9,
                id: "diamond_blade",
                name: "Diamond Blade"
            }];
        case g.Crazy:
            return [{
                diff: 2,
                id: "shortcuts",
                name: "Shortcuts"
            }, {
                diff: 2,
                id: "odd_one_out",
                name: "Odd One Out"
            }, {
                diff: 3,
                id: "glitchy_dodo",
                name: "Glitchy Dodo"
            }, {
                diff: 3,
                id: "cone_cylinder",
                name: "Cone Cylinder"
            }, {
                diff: 3,
                id: "spaceshot",
                name: "Spaceshot"
            }, {
                diff: 3,
                id: "playground",
                name: "Playground"
            }, {
                diff: 3,
                id: "through_the_hole",
                name: "Through the Hole"
            }, {
                diff: 3,
                id: "primary_jumps",
                name: "Primary Jumps"
            }, {
                diff: 3,
                id: "dodo_crash",
                name: "dodo crash"
            }, {
                diff: 4,
                id: "rainbow",
                name: "Rainbow"
            }, {
                diff: 4,
                id: "cool_purple_crystals",
                name: "Cool Purple Crystals"
            }, {
                diff: 4,
                id: "in_a_machine",
                name: "In a Machine"
            }, {
                diff: 4,
                id: "a_dangerous_climb",
                name: "A Dangerous Climb"
            }, {
                diff: 4,
                id: "restart",
                name: "Restart"
            }, {
                diff: 5,
                id: "hyperdrive",
                name: "Hyperdrive"
            }, {
                diff: 5,
                id: "there_is_no_map",
                name: "There Is No Map"
            }, {
                diff: 5,
                id: "rainbow_cliffs",
                name: "Rainbow Cliffs"
            }, {
                diff: 6,
                id: "colour_land",
                name: "Colour Land"
            }, {
                diff: 6,
                id: "there_is_a_map",
                name: "There Is a Map"
            }, {
                diff: 6,
                id: "burning_bridge",
                name: "Burning Bridge"
            }, {
                diff: 6,
                id: "skimountain",
                name: "Skimountain"
            }, {
                diff: 7,
                id: "dodo_nullius",
                name: "Dodo Nullius"
            }, {
                diff: 7,
                id: "waterpark",
                name: "Waterpark"
            }];
        case g.June:
            return [{
                diff: 1,
                id: "u_main_one",
                name: "U_Main_One"
            }, {
                diff: 2,
                id: "u_main_two",
                name: "U_Main_Two"
            }, {
                diff: 2,
                id: "tracks",
                name: "Tracks"
            }, {
                diff: 2,
                id: "colourful_doors",
                name: "Colourful Doors"
            }, {
                diff: 3,
                id: "hills",
                name: "Hills"
            }, {
                diff: 3,
                id: "solar_land",
                name: "Solar Land"
            }, {
                diff: 4,
                id: "ready_player_1",
                name: "Ready Player 1"
            }, {
                diff: 4,
                id: "spiky_peaks",
                name: "Spiky Peaks"
            }, {
                diff: 4,
                id: "drops_of_doom",
                name: "Drops of Doom"
            }, {
                diff: 4,
                id: "hop_hop",
                name: "Hop Hop"
            }, {
                diff: 4,
                id: "tilty_blocks",
                name: "Tilty Blocks"
            }, {
                diff: 4,
                id: "dodge",
                name: "Dodge"
            }, {
                diff: 4,
                id: "icy_street",
                name: "Icy Street"
            }, {
                diff: 5,
                id: "twistedroad",
                name: "Twisted Road"
            }, {
                diff: 5,
                id: "speed_round",
                name: "Speed Round"
            }, {
                diff: 6,
                id: "speedway",
                name: "Speedway"
            }, {
                diff: 6,
                id: "the_cone_road",
                name: "The Cone Road"
            }, {
                diff: 6,
                id: "dual_path",
                name: "Dual Path"
            }, {
                diff: 6,
                id: "summit",
                name: "Summit"
            }, {
                diff: 6,
                id: "dodo_neo",
                name: "Dodo Neo"
            }];
        case g.Sleepy:
            return [{
                diff: 2,
                id: "centipede",
                name: "Centipede"
            }, {
                diff: 2,
                id: "relaxing_climb",
                name: "Relaxing Climb"
            }, {
                diff: 2,
                id: "haunted_manor",
                name: "Haunted Manor"
            }, {
                diff: 3,
                id: "atmosphere",
                name: "Atmosphere"
            }, {
                diff: 3,
                id: "agency",
                name: "Agency"
            }, {
                diff: 3,
                id: "unexpected",
                name: "Unexpected"
            }, {
                diff: 3,
                id: "outside_the_box",
                name: "Outside the Box"
            }, {
                diff: 4,
                id: "transported",
                name: "Transported"
            }, {
                diff: 4,
                id: "climbing_training",
                name: "Climbing Training"
            }, {
                diff: 4,
                id: "spacetrail",
                name: "SpaceTrail"
            }, {
                diff: 4,
                id: "slackline",
                name: "Slackline"
            }, {
                diff: 4,
                id: "fall_dodo",
                name: "Fall Dodo"
            }, {
                diff: 5,
                id: "roundabout",
                name: "Roundabout"
            }, {
                diff: 5,
                id: "fire_and_water",
                name: "Fire and Water"
            }, {
                diff: 5,
                id: "peak",
                name: "Peak"
            }, {
                diff: 5,
                id: "day_in_the_park",
                name: "Day In The Park"
            }, {
                diff: 5,
                id: "twisty_loops",
                name: "Twisty Loops"
            }, {
                diff: 5,
                id: "drifting_dodo",
                name: "Drifting Dodo"
            }, {
                diff: 6,
                id: "heist",
                name: "Heist"
            }, {
                diff: 6,
                id: "technique_track",
                name: "Technique Track"
            }, {
                diff: 7,
                id: "forest",
                name: "Forest"
            }, {
                diff: 7,
                id: "heaven_and_hell",
                name: "Heaven and Hell"
            }, {
                diff: 7,
                id: "neon_bridge",
                name: "neon bridge"
            }, {
                diff: 8,
                id: "china_grove",
                name: "China Grove"
            }, {
                diff: 9,
                id: "radiance",
                name: "Radiance"
            }];
        case g.Mango:
            return [{
                diff: 1,
                id: "open_world",
                name: "open world"
            }, {
                diff: 1,
                id: "dodo_shooter",
                name: "dodo shooter"
            }, {
                diff: 2,
                id: "heights",
                name: "Heights"
            }, {
                diff: 2,
                id: "ring_of_fire",
                name: "Ring of Fire"
            }, {
                diff: 2,
                id: "entity_overload",
                name: "Entity Overload"
            }, {
                diff: 3,
                id: "up_and_down",
                name: "Up And Down"
            }, {
                diff: 3,
                id: "doors_of_doom",
                name: "Doors of Doom"
            }, {
                diff: 4,
                id: "windingpath",
                name: "Winding Path"
            }, {
                diff: 4,
                id: "viridescent",
                name: "Viridescent"
            }, {
                diff: 4,
                id: "tumbles_and_turns",
                name: "Tumbles and Turns"
            }, {
                diff: 5,
                id: "archipelago",
                name: "Archipelago"
            }, {
                diff: 5,
                id: "road_chasing",
                name: "Road Chasing"
            }, {
                diff: 5,
                id: "dodo_on_ice",
                name: "Dodo on ice"
            }, {
                diff: 5,
                id: "earth_exploration",
                name: "Earth Exploration"
            }, {
                diff: 5,
                id: "leaps_in_the_limelight",
                name: "Leaps in the Limelight"
            }, {
                diff: 5,
                id: "tile_jump",
                name: "Tile Jump"
            }, {
                diff: 5,
                id: "patterns",
                name: "Patterns"
            }, {
                diff: 6,
                id: "spiral",
                name: "Spiral"
            }, {
                diff: 6,
                id: "cones_and_chaos",
                name: "Cones and Chaos"
            }, {
                diff: 6,
                id: "obstacle_lane",
                name: "Obstacle Lane"
            }, {
                diff: 6,
                id: "dodo_tiles",
                name: "Dodo tiles"
            }, {
                diff: 7,
                id: "coral_reef",
                name: "Coral Reef"
            }, {
                diff: 7,
                id: "spacewalk",
                name: "Spacewalk"
            }];
        case g.Moosh:
            return [{
                diff: 3,
                id: "rng_fun",
                name: "RNG Fun"
            }, {
                diff: 3,
                id: "house_of_doom",
                name: "House of Doom"
            }, {
                diff: 3,
                id: "jumping_challenge",
                name: "Jumping Challenge"
            }, {
                diff: 3,
                id: "mapmm",
                name: "MapMM"
            }, {
                diff: 3,
                id: "trickster",
                name: "Trickster"
            }, {
                diff: 4,
                id: "the_log",
                name: "The Log"
            }, {
                diff: 4,
                id: "across_lava",
                name: "Across Lava"
            }, {
                diff: 5,
                id: "trenches_and_ramps",
                name: "Trenches and Ramps"
            }, {
                diff: 6,
                id: "around_saturn",
                name: "Around Saturn"
            }, {
                diff: 6,
                id: "ice_age",
                name: "Ice Age"
            }, {
                diff: 6,
                id: "the_throwback",
                name: "The Throwback"
            }, {
                diff: 6,
                id: "dragonfly",
                name: "Dragonfly"
            }, {
                diff: 6,
                id: "unsettled_blocks",
                name: "Unsettled Blocks"
            }, {
                diff: 7,
                id: "spinnin",
                name: "Spinnin"
            }, {
                diff: 8,
                id: "pirate_lord",
                name: "Pirate Lord"
            }];
        case g.Squirrel:
            return [{
                diff: 1,
                id: "dodo_cinema",
                name: "Dodo Cinema"
            }, {
                diff: 2,
                id: "bored",
                name: "Bored"
            }, {
                diff: 2,
                id: "traintrouble",
                name: "TrainTrouble"
            }, {
                diff: 3,
                id: "do_not_jump",
                name: "Do Not Jump"
            }, {
                diff: 3,
                id: "ez_street",
                name: "Ez Street"
            }, {
                diff: 4,
                id: "prototype",
                name: "Prototype"
            }, {
                diff: 4,
                id: "the_dodo_escape",
                name: "The Dodo Escape"
            }, {
                diff: 4,
                id: "dodo_rex",
                name: "Dodo Rex"
            }, {
                diff: 4,
                id: "relics",
                name: "Relics"
            }, {
                diff: 5,
                id: "cylinder_insanity",
                name: "Cylinder Insanity"
            }, {
                diff: 5,
                id: "overflow",
                name: "Overflow"
            }, {
                diff: 5,
                id: "coneycliffs",
                name: "Coney Cliffs"
            }, {
                diff: 5,
                id: "spacetest",
                name: "Space Test"
            }, {
                diff: 5,
                id: "crossgravity",
                name: "Cross Gravity"
            }, {
                diff: 5,
                id: "ring_stacks",
                name: "Ring Stacks"
            }, {
                diff: 6,
                id: "dodo_a",
                name: "Dodo's Adventure"
            }, {
                diff: 7,
                id: "space_track",
                name: "Space Track"
            }, {
                diff: 7,
                id: "dodo_dash",
                name: "Dodo Dash"
            }];
        case g.Dark:
            return [{
                diff: 5,
                id: "oblivion",
                name: "Oblivion"
            }, {
                diff: 5,
                id: "caution",
                name: "Caution: Slippery Floor"
            }, {
                diff: 5,
                id: "neon_loops",
                name: "Neon Loops"
            }, {
                diff: 5,
                id: "orangescapes",
                name: "Orangescapes"
            }, {
                diff: 5,
                id: "subzero",
                name: "Subzero"
            }, {
                diff: 6,
                id: "a_cybers_world",
                name: "A CYBER'S WORLD?"
            }, {
                diff: 6,
                id: "acid_lake",
                name: "Acid Lake"
            }, {
                diff: 6,
                id: "functions",
                name: "Functions"
            }, {
                diff: 6,
                id: "achromatopsia",
                name: "Achromatopsia"
            }, {
                diff: 6,
                id: "decay",
                name: "Decay"
            }, {
                diff: 6,
                id: "the_salt_complex",
                name: "The Salt Complex"
            }, {
                diff: 7,
                id: "hotel",
                name: "Hotel"
            }, {
                diff: 7,
                id: "h",
                name: "H"
            }, {
                diff: 7,
                id: "the_drift_complex",
                name: "The Drift Complex"
            }, {
                diff: 7,
                id: "hourglass",
                name: "Hourglass"
            }, {
                diff: 7,
                id: "pipe_dreams",
                name: "Pipe Dreams"
            }, {
                diff: 7,
                id: "ominous_crypt",
                name: "Ominous Crypt"
            }, {
                diff: 7,
                id: "smart_not_nerd_fan_club",
                name: "Smart Not Nerd Fan Club"
            }, {
                diff: 7,
                id: "fried_tennis_ball",
                name: "Fried Tennis Ball"
            }, {
                diff: 8,
                id: "false_tranquility",
                name: "False Tranquility"
            }, {
                diff: 8,
                id: "test_unity_plugin_place_1",
                name: "test_unity_plugin_place_1"
            }];
        case g.Insolence:
            return [{
                diff: 1,
                id: "the_harvest",
                name: "The Harvest"
            }, {
                diff: 2,
                id: "ski_championship",
                name: "Ski Championship"
            }, {
                diff: 2,
                id: "tropical_paradise",
                name: "Tropical Paradise"
            }, {
                diff: 3,
                id: "sunset_forest",
                name: "Sunset Forest"
            }, {
                diff: 3,
                id: "portal_illusion",
                name: "Portal Illusion"
            }, {
                diff: 3,
                id: "rgb",
                name: "RGB"
            }, {
                diff: 3,
                id: "abandoned_warehouse",
                name: "Abandoned Warehouse"
            }, {
                diff: 4,
                id: "light_show",
                name: "Light Show"
            }, {
                diff: 4,
                id: "halloween",
                name: "Halloween"
            }, {
                diff: 4,
                id: "savanna",
                name: "Savanna"
            }, {
                diff: 4,
                id: "forest_trail",
                name: "Forest Trail"
            }, {
                diff: 5,
                id: "dementia",
                name: "dementia"
            }, {
                diff: 6,
                id: "warehouse_maintenance",
                name: "Warehouse Maintenance"
            }, {
                diff: 6,
                id: "360",
                name: "360"
            }, {
                diff: 7,
                id: "dune",
                name: "Dune"
            }, {
                diff: 7,
                id: "pull_force",
                name: "pull force"
            }, {
                diff: 7,
                id: "sewer_survival",
                name: "Sewer Survival"
            }, {
                diff: 9,
                id: "havoc_zone",
                name: "Havoc Zone"
            }];
        case g.Modded:
            return [{
                diff: 0,
                id: "bad_apple",
                name: "Bad Apple"
            }, {
                diff: 1,
                id: "orbit",
                name: "Orbit"
            }, {
                diff: 6,
                id: "ice_rhythm",
                name: "Ice Rhythm"
            }, {
                diff: 6,
                id: "space_gauntlet",
                name: "Space Gauntlet"
            }, {
                diff: 8,
                id: "dual",
                name: "Dual"
            }];
        case g.Collab:
            return [{
                diff: 1,
                id: "easter",
                name: "Easter"
            }, {
                diff: 3,
                id: "ghost_road",
                name: "Ghost road"
            }, {
                diff: 3,
                id: "darkest_depths",
                name: "Darkest Depths"
            }, {
                diff: 3,
                id: "microcosm",
                name: "Microcosm"
            }, {
                diff: 4,
                id: "tightrope",
                name: "Tightrope"
            }, {
                diff: 4,
                id: "conveyor",
                name: "Conveyor"
            }, {
                diff: 4,
                id: "bullseye",
                name: "Bullseye"
            }, {
                diff: 4,
                id: "cosmos_cruise",
                name: "Cosmos Cruise"
            }, {
                diff: 4,
                id: "lily_lotus_lake",
                name: "Lily Lotus Lake"
            }, {
                diff: 4,
                id: "snake",
                name: "Snake"
            }, {
                diff: 4,
                id: "track_together",
                name: "Track together"
            }, {
                diff: 4,
                id: "library",
                name: "Library"
            }, {
                diff: 4,
                id: "parkour_mountain",
                name: "Parkour Mountain"
            }, {
                diff: 5,
                id: "cliffhanger",
                name: "Cliffhanger"
            }, {
                diff: 5,
                id: "romantic_turnaround",
                name: "Romantic Turnaround"
            }, {
                diff: 5,
                id: "dual_colors",
                name: "Dual Colors"
            }, {
                diff: 5,
                id: "booby_traps",
                name: "Booby Traps"
            }, {
                diff: 5,
                id: "plane_crash",
                name: "Plane Crash"
            }, {
                diff: 5,
                id: "burst",
                name: "Burst"
            }, {
                diff: 6,
                id: "rocky_road",
                name: "Rocky Road"
            }, {
                diff: 6,
                id: "50_jumps",
                name: "50 Jumps"
            }, {
                diff: 6,
                id: "milk_flood",
                name: "Milk Flood"
            }, {
                diff: 6,
                id: "hotdog",
                name: "hotdog"
            }, {
                diff: 7,
                id: "ambush",
                name: "Ambush"
            }, {
                diff: 7,
                id: "portaltropolis",
                name: "Portaltropolis"
            }, {
                diff: 7,
                id: "danger_dragon",
                name: "Danger Dragon"
            }, {
                diff: 8,
                id: "circuit",
                name: "Circuit"
            }, {
                diff: 8,
                id: "azul_lights",
                name: "Azul Lights"
            }, {
                diff: 8,
                id: "megacollab",
                name: "Megacollab"
            }, {
                diff: 8,
                id: "the_poolrooms",
                name: "The Poolrooms"
            }, {
                diff: 9,
                id: "rage_fuel",
                name: "Rage Fuel"
            }, {
                diff: 9,
                id: "shuriken",
                name: "shuriken"
            }];
        case g.Og:
            return [{
                diff: 1,
                id: "og1",
                name: "Beginners Map"
            }, {
                diff: 2,
                id: "og16",
                name: "EZ Map"
            }, {
                diff: 3,
                id: "og2",
                name: "Challenge"
            }, {
                diff: 3,
                id: "og4",
                name: "Special Map"
            }, {
                diff: 3,
                id: "og35",
                name: "Graphics Test"
            }, {
                diff: 4,
                id: "og3",
                name: "Cones"
            }, {
                diff: 4,
                id: "og19",
                name: "Grandpa Hobo"
            }, {
                diff: 4,
                id: "og23",
                name: "Hop 2 3 4"
            }, {
                diff: 4,
                id: "og26",
                name: "Rip"
            }, {
                diff: 4,
                id: "og36",
                name: "ISKL"
            }, {
                diff: 4,
                id: "og38",
                name: "Horrible Map"
            }, {
                diff: 4,
                id: "og40",
                name: "Snake"
            }, {
                diff: 4,
                id: "og31",
                name: "2018 New Concept"
            }, {
                diff: 5,
                id: "og9",
                name: "Hacks"
            }, {
                diff: 5,
                id: "og15",
                name: "Doge"
            }, {
                diff: 5,
                id: "og24",
                name: "hi"
            }, {
                diff: 5,
                id: "og27",
                name: "OK"
            }, {
                diff: 5,
                id: "og37",
                name: "CLIMB"
            }, {
                diff: 5,
                id: "og39",
                name: "Gravity"
            }, {
                diff: 5,
                id: "og17",
                name: "Boost"
            }, {
                diff: 5,
                id: "og5",
                name: "Cake"
            }, {
                diff: 6,
                id: "og7",
                name: "Cloud"
            }, {
                diff: 6,
                id: "og11",
                name: "Volcano"
            }, {
                diff: 6,
                id: "og18",
                name: "Slowness"
            }, {
                diff: 6,
                id: "og22",
                name: "No Name"
            }, {
                diff: 6,
                id: "og25",
                name: "123456789"
            }, {
                diff: 7,
                id: "og8",
                name: "999999"
            }, {
                diff: 7,
                id: "og12",
                name: "Cats can fly"
            }, {
                diff: 7,
                id: "og10",
                name: "Liam"
            }, {
                diff: 7,
                id: "og14",
                name: "Bonus Level"
            }, {
                diff: 7,
                id: "og20",
                name: "Up Up and Away"
            }, {
                diff: 7,
                id: "og28",
                name: "kk Unicorn"
            }, {
                diff: 7,
                id: "og29",
                name: "Derp"
            }, {
                diff: 7,
                id: "og32",
                name: "Too Many Cones"
            }, {
                diff: 7,
                id: "og33",
                name: "Bounce & Jumps"
            }, {
                diff: 7,
                id: "og34",
                name: "Some Maze"
            }, {
                diff: 8,
                id: "og6",
                name: "Impossible Christmas Map"
            }, {
                diff: 8,
                id: "og13",
                name: ":D"
            }, {
                diff: 8,
                id: "og21",
                name: "Zigzag"
            }, {
                diff: 8,
                id: "og30",
                name: "-___-"
            }];
        case g.Vault:
            return [{
                diff: 1,
                id: "glass_walkway",
                name: "Glass Walkway"
            }, {
                diff: 1,
                id: "lucid_dreams",
                name: "Lucid Dreams"
            }, {
                diff: 2,
                id: "basic_training",
                name: "Basic Training"
            }, {
                diff: 3,
                id: "advanced_training",
                name: "Advanced Training"
            }, {
                diff: 3,
                id: "palindrome",
                name: "Palindrome"
            }, {
                diff: 3,
                id: "choice",
                name: "Choice"
            }, {
                diff: 3,
                id: "split_paths",
                name: "Split Paths"
            }, {
                diff: 3,
                id: "super_dodo_lane",
                name: "Super Dodo Lane"
            }, {
                diff: 3,
                id: "slides",
                name: "Slides"
            }, {
                diff: 4,
                id: "speed_tunnel",
                name: "Speed Tunnel"
            }, {
                diff: 4,
                id: "follow_the_path",
                name: "Follow the Path"
            }, {
                diff: 4,
                id: "green_gravity",
                name: "Green Gravity"
            }, {
                diff: 4,
                id: "reversed_jumping",
                name: "Reversed Jumping"
            }, {
                diff: 5,
                id: "bad_advice",
                name: "Bad Advice"
            }, {
                diff: 5,
                id: "route",
                name: "Route"
            }, {
                diff: 5,
                id: "skinny_road",
                name: "Skinny Road"
            }, {
                diff: 5,
                id: "ice_cocos",
                name: "Ice Cocos"
            }, {
                diff: 6,
                id: "avalanche",
                name: "Avalanche"
            }, {
                diff: 6,
                id: "anarchy",
                name: "Anarchy"
            }, {
                diff: 6,
                id: "gravity_chaos",
                name: "Gravity Chaos"
            }, {
                diff: 6,
                id: "ice_track",
                name: "Ice Track"
            }, {
                diff: 6,
                id: "reversed_road",
                name: "Reversed Road"
            }, {
                diff: 6,
                id: "spider",
                name: "Spider"
            }, {
                diff: 7,
                id: "intense_training",
                name: "Intense Training"
            }, {
                diff: 7,
                id: "maze",
                name: "Maze"
            }, {
                diff: 7,
                id: "thinning",
                name: "Thinning"
            }, {
                diff: 7,
                id: "spiral_staircase",
                name: "Spiral Staircase"
            }, {
                diff: 7,
                id: "cone_dodging",
                name: "Cone Dodging"
            }, {
                diff: 8,
                id: "the_extra_virgin_olive_oil_complex",
                name: "The Extra Virgin Olive Oil Complex"
            }, {
                diff: 8,
                id: "ascend",
                name: "Ascend"
            }, {
                diff: 8,
                id: "gravitational_pull",
                name: "Gravitational Pull"
            }, {
                diff: 8,
                id: "troll_track",
                name: "Troll Track"
            }, {
                diff: 9,
                id: "a_last_journey",
                name: "A Last Journey"
            }, {
                diff: 9,
                id: "finger_breaker",
                name: "Finger breaker"
            }];
        case g.Brew:
            return [];
        case g.Ultrahard:
            return [{
                diff: 10,
                id: "0001",
                name: ".0001"
            }, {
                diff: 10,
                id: "cosmic_canyon",
                name: "Cosmic Canyon"
            }, {
                diff: 10,
                id: "slider",
                name: "Slider"
            }, {
                diff: 10,
                id: "absolute_zero",
                name: "Absolute Zero"
            }, {
                diff: 10,
                id: "wall_riders",
                name: "Wall Riders"
            }, {
                diff: 10,
                id: "5d_demon_cinema",
                name: "5D Demon Cinema"
            }, {
                diff: 11,
                id: "mayhem",
                name: "Mayhem"
            }]
        }
    }
}
class ts {
    static getAverage(t) {
        if (t.length === 0)
            throw new Error("array is empty");
        let n = 0;
        for (let i = 0; i < t.length; i++)
            n += t[i];
        return n / t.length
    }
    static areEqual(t, n) {
        if (t.length !== n.length)
            return !1;
        for (let i = 0; i < t.length; i++)
            if (t[i] !== n[i])
                return !1;
        return !0
    }
    static getRandomElement(t) {
        if (t.length === 0)
            throw new Error("array is empty");
        const n = Math.floor(Math.random() * t.length);
        return t[n]
    }
    static getUniqueTexts(t) {
        const n = [];
        for (let i = 0; i < t.length; i++) {
            const s = t[i];
            n.includes(s) || n.push(s)
        }
        return n
    }
    static getArrayWithRemovedElement(t, n) {
        const i = [];
        for (const s of t)
            s != n && i.push(s);
        return i
    }
}
class ai {
    static doesMapNeedEpilepsyWarning(t) {
        switch (t) {
        case "lightning":
        case "into_fire":
        case "ghost_road":
        case "trippy":
        case "spin_dodge":
            return !0;
        default:
            return !1
        }
    }
}
class fe {
    static getNextMapListing(t, n) {
        const i = fe.getMapListings(t.cupId)
          , s = i.findIndex(r=>r.mapId === t.mapId);
        if (s === -1)
            throw new Error("Map not found in cup");
        return s === i.length - 1 ? fe.getRandomMapListingInCup(t.cupId) : i[s + 1]
    }
    static getAllMapIds() {
        const t = [];
        for (const n of Ye) {
            const i = es.getCondensedMapListings(n);
            for (const s of i)
                t.includes(s.id) || t.push(s.id)
        }
        return t
    }
    static getAllMapListingsOfDifficulty(t, n) {
        const i = [];
        for (const s of Ye) {
            if (s === g.Vault && n === !1)
                continue;
            const r = fe.getMapListings(s);
            for (const o of r)
                fe.doesContain(i, o) || o.diff == t && i.push(o)
        }
        return i
    }
    static doesContain(t, n) {
        return t.some(i=>i.mapId === n.mapId)
    }
    static getMapListingFromMapId(t) {
        for (const n of Ye) {
            const i = fe.getMapListings(n);
            for (const s of i)
                if (s.mapId === t)
                    return s
        }
        return null
    }
    static areMapListingsEqual(t, n) {
        return t == null && n == null ? !0 : t == null || n == null ? !1 : t.mapId === n.mapId
    }
    static getRandomMapListingInCup(t) {
        return ts.getRandomElement(fe.getMapListingsWithoutEpilepsyWarning(t))
    }
    static getMapListingForTryAnotherMap(t, n) {
        const i = [];
        for (const s of Ye) {
            if (s === g.Ultrahard || s === g.Vault || s === g.Newcomer || bo.isOnlyOnWebsite(s, n))
                continue;
            const r = fe.getMapListings(s);
            for (const o of r)
                t.mapId !== o.mapId && (o.diff > t.diff + 1 || ai.doesMapNeedEpilepsyWarning(o.mapId) || i.push(o))
        }
        return i.length === 0 ? fe.getRandomMapListingInCup(t.cupId) : i[Math.floor(Math.random() * i.length)]
    }
    static getNextMapListingToPlayInCup(t, n, i) {
        const s = fe.getMapListings(t);
        for (const r of s)
            if (!(n[r.mapId].count > 0))
                return r;
        return fe.getRandomMapListingInCup(t)
    }
    static getRandomMapListing() {
        const t = ts.getRandomElement(Ye);
        return fe.getRandomMapListingInCup(t)
    }
    static getMapListings(t) {
        const n = [];
        for (const i of es.getCondensedMapListings(t))
            n.push({
                cupId: t,
                mapId: i.id,
                diff: i.diff,
                name: i.name
            });
        return n
    }
    static getMapListingsWithoutEpilepsyWarning(t) {
        return fe.getMapListings(t).filter(i=>!ai.doesMapNeedEpilepsyWarning(i.mapId))
    }
    static isValidMapId(t) {
        return !(typeof t != "string" || t.length == 0 || t.length > 50 || !fe.getAllMapIds().includes(t))
    }
    static getCompletedMapsMergedUnique(t) {
        const n = [];
        for (const i of t) {
            const s = n.find(r=>r.mapId === i.mapId);
            if (s == null) {
                n.push(i);
                continue
            }
            s.count += i.count,
            s.time = Math.min(s.time, i.time)
        }
        return n
    }
}
class Xe {
    constructor(t) {
        le(this, "bagManager");
        le(this, "isBagBlockerDetected", !1);
        this.bagManager = t
    }
    onPageLoaded() {
        this.detectBagBlocker()
    }
    async detectBagBlocker() {
        this.isBagBlockerDetected = await Xe.isUsingBagBlocker(),
        sn.green("isBagBlockerDetected: " + this.isBagBlockerDetected),
        this.isBagBlockerDetected && this.createDisableBagBlockerText()
    }
    canShowBag() {
        return !(ce.isLocalhost() || !Xe.isAiptagDefined() || this.isBagBlockerDetected)
    }
    createDisableBagBlockerText() {
        this.bagManager.verticalBagManager.deleteHideThinAdsButton();
        const t = fe.getAllMapIds().length;
        for (const n of Xe.getBagSpaces()) {
            const s = n.classList.contains("bagSpaceThin") ? "Ad-block detected. We rely on Ads to keep " + t + " levels free to play." : "We hope you are enjoying Ice Dodo! We just wanted to remind you that ads keep all " + t + " levels free to play."
              , r = "Please consider disabling Ad blocker to support our small game studio. Thank you!";
            Xe.createMemoInBagSpace(n, s, r)
        }
    }
    static createMemoInBagSpace(t, n, i) {
        const s = document.createElement("div");
        s.classList.add("bagBlockerText"),
        s.appendChild(document.createTextNode(n)),
        s.appendChild(document.createElement("br")),
        s.appendChild(document.createElement("br")),
        s.appendChild(document.createTextNode(i)),
        t.append(s)
    }
    static async isUsingBagBlocker() {
        if (ce.isLocalhost() || (await new Promise(i=>setTimeout(i, 4e3)),
        !Xe.isAiptagDefined()))
            return !0;
        const t = Array.from(document.getElementsByClassName("ad-box"));
        if (t.length !== 1)
            return !0;
        const n = t[0];
        return n.offsetWidth === 0 || window.getComputedStyle(n).display === "none"
    }
    static isAiptagDefined() {
        try {
            if (window.aiptag == null)
                throw new Error("Window Aiptag not defined");
            if (window.aipPlayer == null)
                throw new Error("AipPlayer not defined");
            if (window.aiptag.cmd == null || window.aiptag.cmd.player == null)
                throw new Error("Aiptag.cmd.player not defined");
            return !0
        } catch {
            return sn.green("Aiptag not defined"),
            !1
        }
    }
    static getBagSpaces() {
        return Array.from(document.querySelectorAll(".bagSpace"))
    }
}
class $e {
    constructor(t) {
        le(this, "bagManager");
        le(this, "thinRemovalButton", null);
        this.bagManager = t
    }
    onPageLoaded() {
        this.showWideOnly(),
        this.thinRemovalButton = this.createThinBagRemovalButton()
    }
    didRemoveThinPermanently() {
        return this.thinRemovalButton == null
    }
    hideWideOnly() {
        for (const t of $e.getWideBagSpaces())
            t.classList.add("bagSpaceHidden")
    }
    showWideOnly() {
        for (const t of $e.getWideBagSpaces())
            t.classList.remove("bagSpaceHidden")
    }
    hideThinOnly() {
        for (const t of $e.getThinBagSpaces())
            t.classList.add("bagSpaceHidden");
        this.thinRemovalButton != null && (this.thinRemovalButton.style.display = "none")
    }
    showThinOnly() {
        for (const t of $e.getThinBagSpaces())
            t.classList.remove("bagSpaceHidden");
        this.thinRemovalButton != null && (this.thinRemovalButton.style.display = "block")
    }
    removeEdgeMargins() {
        for (const t of $e.getVerticalBagSpaces())
            t.classList.add("bagSpaceNoMargin")
    }
    deleteHideThinAdsButton() {
        this.thinRemovalButton != null && (this.thinRemovalButton.remove(),
        this.thinRemovalButton = null)
    }
    createThinBagRemovalButton() {
        const t = document.getElementById("appContainer");
        if (t == null)
            throw new Error("Could not find appContainer div");
        const n = document.createElement("button");
        return n.style.position = "absolute",
        n.style.bottom = "10px",
        n.style.right = "10px",
        n.style.cursor = "pointer",
        n.style.display = "none",
        n.innerText = "Hide Ads",
        t.appendChild(n),
        n.onclick = ()=>this.hideThinPermanently(),
        n
    }
    hideThinPermanently() {
        if (!(this.thinRemovalButton == null || !window.confirm("Ice dodo is a free game. We rely on Ads. However, are the in-game Ads causing lag?"))) {
            for (const n of $e.getThinBagSpaces())
                n.innerHTML = "";
            for (const n of $e.getThinBagSpaces())
                Xe.createMemoInBagSpace(n, "Goodbye In-game Ads", "You decided to hide the in-game Ads, so less money for us (sad). But we understand. We hope the game is less laggy now.");
            this.deleteHideThinAdsButton()
        }
    }
    static getWideBagSpaces() {
        return Array.from(document.querySelectorAll(".bagSpaceWide"))
    }
    static getThinBagSpaces() {
        return Array.from(document.querySelectorAll(".bagSpaceThin"))
    }
    static getVerticalBagSpaces() {
        return Array.from(document.querySelectorAll(".bagSpaceVertical"))
    }
}
class wo {
    constructor(t) {
        le(this, "bagManager");
        le(this, "previousPrerollTimeMs", Date.now());
        le(this, "previousCreditTimeMs", 0);
        le(this, "credits", 0);
        le(this, "bagPlayer", null);
        this.bagManager = t
    }
    onPageLoaded() {
        this.createBagPlayer()
    }
    createBagPlayer() {
        ce.isLocalhost() || Xe.isAiptagDefined() && window.aiptag.cmd.player.push(()=>{
            this.bagPlayer = new window.aipPlayer({
                AIP_REWARDEDCOMPLETE: t=>{
                    switch (t) {
                    case "timeout":
                        this.onBagPlayerError("Ad timed out.");
                        break;
                    case "empty":
                        this.onBagPlayerError("Ad is empty.");
                        break;
                    case "closed":
                        this.onBagPlayerError("Ad is closed. Reward not granted.");
                        break;
                    default:
                        throw new Error("Unknown state: " + t)
                    }
                }
                ,
                AIP_REWARDEDGRANTED: ()=>this.onBagPlayerSuccess(),
                AD_WIDTH: 960,
                AD_HEIGHT: 540,
                AD_DISPLAY: "fullscreen",
                TRUSTED: !0,
                LOADING_TEXT: "loading advertisement",
                PREROLL_ELEM: ()=>document.getElementById("preroll"),
                AIP_COMPLETE: t=>this.onBagPlayerSuccess()
            })
        }
        )
    }
    onBagPlayerError(t) {
        sn.green("onBagPlayerError Error: " + t)
    }
    onBagPlayerSuccess() {
        sn.green("onBagPlayerSuccess")
    }
    startPreroll() {
        this.bagManager.blockDetector.canShowBag() && window.aiptag.cmd.player.push(()=>{
            if (this.bagPlayer == null) {
                this.onBagPlayerError("Ad could not be loaded, please disable your Ad blockers.");
                return
            }
            this.bagPlayer.startPreRoll()
        }
        )
    }
    onDeath() {
        if (ce.isExtension())
            return {
                didStartPreroll: !1
            };
        const t = Date.now();
        return t - this.previousCreditTimeMs < Yi ? {
            didStartPreroll: !1
        } : (this.previousCreditTimeMs = t,
        this.credits += 1,
        this.credits < uo ? {
            didStartPreroll: !1
        } : t - this.previousPrerollTimeMs < co ? {
            didStartPreroll: !1
        } : (this.previousPrerollTimeMs = t,
        this.credits = 0,
        this.startPreroll(),
        {
            didStartPreroll: !0
        }))
    }
    onWin() {
        if (ce.isExtension())
            return;
        const t = Date.now();
        if (t - this.previousCreditTimeMs < Yi)
            return {
                didStartPreroll: !1
            };
        this.previousCreditTimeMs = t,
        this.credits += 1
    }
}
class Ti {
    constructor(t) {
        le(this, "bagManager");
        le(this, "previousReloadTimeMs", 0);
        this.bagManager = t
    }
    onPageLoaded() {
        this.forceReloadDisplayBags(Xi),
        setInterval(()=>this.reloadDisplayBags(!1), 1e3)
    }
    reloadDisplayBags(t) {
        if (!document.hasFocus() || !t && !Ti.canReloadOnRouteAndPage() || Date.now() - this.previousReloadTimeMs < fo)
            return;
        const n = t ? [wt.LeftVerticalThin, wt.RightVerticalThin] : Xi;
        this.forceReloadDisplayBags(n)
    }
    forceReloadDisplayBags(t) {
        if (!this.bagManager.blockDetector.canShowBag())
            return;
        let n = !1;
        for (const i of t)
            (i === wt.LeftVerticalThin || i === wt.RightVerticalThin) && this.bagManager.verticalBagManager.didRemoveThinPermanently() || document.getElementById(i) == null || (window.aiptag.cmd.display.push(function() {
                window.aipDisplayTag.display(i)
            }),
            n = !0);
        n && (sn.green("Reloaded display bags. Time since last time: " + (Date.now() - this.previousReloadTimeMs) + "ms"),
        this.previousReloadTimeMs = Date.now())
    }
    static canReloadOnRouteAndPage() {
        switch (window.currentRoute) {
        case ae.Singleplayer:
            return window.currentPageId !== Ys.Game;
        case ae.Sync:
        case ae.Info:
        case ae.Boot:
            return !0;
        case ae.Crashed:
        case ae.Account:
        case ae.Multiplayer:
            return !1
        }
    }
}
class vo {
    constructor() {
        le(this, "horizontalBagManager");
        le(this, "verticalBagManager");
        le(this, "videoBagManager");
        le(this, "blockDetector");
        le(this, "reloadManager");
        this.horizontalBagManager = new go(this),
        this.verticalBagManager = new $e(this),
        this.videoBagManager = new wo(this),
        this.blockDetector = new Xe(this),
        this.reloadManager = new Ti(this)
    }
    onPageLoaded() {
        this.verticalBagManager.onPageLoaded(),
        this.horizontalBagManager.onPageLoaded(),
        this.videoBagManager.onPageLoaded(),
        this.blockDetector.onPageLoaded(),
        this.reloadManager.onPageLoaded()
    }
}
function Ci(e, t) {
    const n = Object.create(null)
      , i = e.split(",");
    for (let s = 0; s < i.length; s++)
        n[i[s]] = !0;
    return t ? s=>!!n[s.toLowerCase()] : s=>!!n[s]
}
function Pi(e) {
    if (I(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const i = e[n]
              , s = de(i) ? Co(i) : Pi(i);
            if (s)
                for (const r in s)
                    t[r] = s[r]
        }
        return t
    } else {
        if (de(e))
            return e;
        if (te(e))
            return e
    }
}
const Mo = /;(?![^(]*\))/g
  , Ro = /:([^]+)/
  , To = /\/\*.*?\*\//gs;
function Co(e) {
    const t = {};
    return e.replace(To, "").split(Mo).forEach(n=>{
        if (n) {
            const i = n.split(Ro);
            i.length > 1 && (t[i[0].trim()] = i[1].trim())
        }
    }
    ),
    t
}
function Fn(e) {
    let t = "";
    if (de(e))
        t = e;
    else if (I(e))
        for (let n = 0; n < e.length; n++) {
            const i = Fn(e[n]);
            i && (t += i + " ")
        }
    else if (te(e))
        for (const n in e)
            e[n] && (t += n + " ");
    return t.trim()
}
const Po = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly"
  , xo = Ci(Po);
function Xs(e) {
    return !!e || e === ""
}
function Ao(e, t) {
    if (e.length !== t.length)
        return !1;
    let n = !0;
    for (let i = 0; n && i < e.length; i++)
        n = hn(e[i], t[i]);
    return n
}
function hn(e, t) {
    if (e === t)
        return !0;
    let n = ns(e)
      , i = ns(t);
    if (n || i)
        return n && i ? e.getTime() === t.getTime() : !1;
    if (n = rn(e),
    i = rn(t),
    n || i)
        return e === t;
    if (n = I(e),
    i = I(t),
    n || i)
        return n && i ? Ao(e, t) : !1;
    if (n = te(e),
    i = te(t),
    n || i) {
        if (!n || !i)
            return !1;
        const s = Object.keys(e).length
          , r = Object.keys(t).length;
        if (s !== r)
            return !1;
        for (const o in e) {
            const a = e.hasOwnProperty(o)
              , l = t.hasOwnProperty(o);
            if (a && !l || !a && l || !hn(e[o], t[o]))
                return !1
        }
    }
    return String(e) === String(t)
}
function xi(e, t) {
    return e.findIndex(n=>hn(n, t))
}
const Ac = e=>de(e) ? e : e == null ? "" : I(e) || te(e) && (e.toString === er || !H(e.toString)) ? JSON.stringify(e, Zs, 2) : String(e)
  , Zs = (e,t)=>t && t.__v_isRef ? Zs(e, t.value) : It(t) ? {
    [`Map(${t.size})`]: [...t.entries()].reduce((n,[i,s])=>(n[`${i} =>`] = s,
    n), {})
} : Gt(t) ? {
    [`Set(${t.size})`]: [...t.values()]
} : te(t) && !I(t) && !tr(t) ? String(t) : t
  , ne = {}
  , Nt = []
  , ke = ()=>{}
  , So = ()=>!1
  , Do = /^on[^a-z]/
  , En = e=>Do.test(e)
  , Ai = e=>e.startsWith("onUpdate:")
  , ye = Object.assign
  , Si = (e,t)=>{
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1)
}
  , ko = Object.prototype.hasOwnProperty
  , K = (e,t)=>ko.call(e, t)
  , I = Array.isArray
  , It = e=>gn(e) === "[object Map]"
  , Gt = e=>gn(e) === "[object Set]"
  , ns = e=>gn(e) === "[object Date]"
  , H = e=>typeof e == "function"
  , de = e=>typeof e == "string"
  , rn = e=>typeof e == "symbol"
  , te = e=>e !== null && typeof e == "object"
  , Qs = e=>te(e) && H(e.then) && H(e.catch)
  , er = Object.prototype.toString
  , gn = e=>er.call(e)
  , Bo = e=>gn(e).slice(8, -1)
  , tr = e=>gn(e) === "[object Object]"
  , Di = e=>de(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e
  , Cn = Ci(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted")
  , Hn = e=>{
    const t = Object.create(null);
    return n=>t[n] || (t[n] = e(n))
}
  , Oo = /-(\w)/g
  , We = Hn(e=>e.replace(Oo, (t,n)=>n ? n.toUpperCase() : ""))
  , Lo = /\B([A-Z])/g
  , Pt = Hn(e=>e.replace(Lo, "-$1").toLowerCase())
  , Vn = Hn(e=>e.charAt(0).toUpperCase() + e.slice(1))
  , Xn = Hn(e=>e ? `on${Vn(e)}` : "")
  , on = (e,t)=>!Object.is(e, t)
  , Pn = (e,t)=>{
    for (let n = 0; n < e.length; n++)
        e[n](t)
}
  , Bn = (e,t,n)=>{
    Object.defineProperty(e, t, {
        configurable: !0,
        enumerable: !1,
        value: n
    })
}
  , an = e=>{
    const t = parseFloat(e);
    return isNaN(t) ? e : t
}
;
let is;
const No = ()=>is || (is = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
let He;
class Io {
    constructor(t=!1) {
        this.detached = t,
        this.active = !0,
        this.effects = [],
        this.cleanups = [],
        this.parent = He,
        !t && He && (this.index = (He.scopes || (He.scopes = [])).push(this) - 1)
    }
    run(t) {
        if (this.active) {
            const n = He;
            try {
                return He = this,
                t()
            } finally {
                He = n
            }
        }
    }
    on() {
        He = this
    }
    off() {
        He = this.parent
    }
    stop(t) {
        if (this.active) {
            let n, i;
            for (n = 0,
            i = this.effects.length; n < i; n++)
                this.effects[n].stop();
            for (n = 0,
            i = this.cleanups.length; n < i; n++)
                this.cleanups[n]();
            if (this.scopes)
                for (n = 0,
                i = this.scopes.length; n < i; n++)
                    this.scopes[n].stop(!0);
            if (!this.detached && this.parent && !t) {
                const s = this.parent.scopes.pop();
                s && s !== this && (this.parent.scopes[this.index] = s,
                s.index = this.index)
            }
            this.parent = void 0,
            this.active = !1
        }
    }
}
function Fo(e, t=He) {
    t && t.active && t.effects.push(e)
}
const ki = e=>{
    const t = new Set(e);
    return t.w = 0,
    t.n = 0,
    t
}
  , nr = e=>(e.w & dt) > 0
  , ir = e=>(e.n & dt) > 0
  , Eo = ({deps: e})=>{
    if (e.length)
        for (let t = 0; t < e.length; t++)
            e[t].w |= dt
}
  , Ho = e=>{
    const {deps: t} = e;
    if (t.length) {
        let n = 0;
        for (let i = 0; i < t.length; i++) {
            const s = t[i];
            nr(s) && !ir(s) ? s.delete(e) : t[n++] = s,
            s.w &= ~dt,
            s.n &= ~dt
        }
        t.length = n
    }
}
  , li = new WeakMap;
let Zt = 0
  , dt = 1;
const fi = 30;
let Se;
const Mt = Symbol("")
  , ci = Symbol("");
class Bi {
    constructor(t, n=null, i) {
        this.fn = t,
        this.scheduler = n,
        this.active = !0,
        this.deps = [],
        this.parent = void 0,
        Fo(this, i)
    }
    run() {
        if (!this.active)
            return this.fn();
        let t = Se
          , n = lt;
        for (; t; ) {
            if (t === this)
                return;
            t = t.parent
        }
        try {
            return this.parent = Se,
            Se = this,
            lt = !0,
            dt = 1 << ++Zt,
            Zt <= fi ? Eo(this) : ss(this),
            this.fn()
        } finally {
            Zt <= fi && Ho(this),
            dt = 1 << --Zt,
            Se = this.parent,
            lt = n,
            this.parent = void 0,
            this.deferStop && this.stop()
        }
    }
    stop() {
        Se === this ? this.deferStop = !0 : this.active && (ss(this),
        this.onStop && this.onStop(),
        this.active = !1)
    }
}
function ss(e) {
    const {deps: t} = e;
    if (t.length) {
        for (let n = 0; n < t.length; n++)
            t[n].delete(e);
        t.length = 0
    }
}
let lt = !0;
const sr = [];
function $t() {
    sr.push(lt),
    lt = !1
}
function Kt() {
    const e = sr.pop();
    lt = e === void 0 ? !0 : e
}
function Re(e, t, n) {
    if (lt && Se) {
        let i = li.get(e);
        i || li.set(e, i = new Map);
        let s = i.get(n);
        s || i.set(n, s = ki()),
        rr(s)
    }
}
function rr(e, t) {
    let n = !1;
    Zt <= fi ? ir(e) || (e.n |= dt,
    n = !nr(e)) : n = !e.has(Se),
    n && (e.add(Se),
    Se.deps.push(e))
}
function et(e, t, n, i, s, r) {
    const o = li.get(e);
    if (!o)
        return;
    let a = [];
    if (t === "clear")
        a = [...o.values()];
    else if (n === "length" && I(e)) {
        const l = an(i);
        o.forEach((u,c)=>{
            (c === "length" || c >= l) && a.push(u)
        }
        )
    } else
        switch (n !== void 0 && a.push(o.get(n)),
        t) {
        case "add":
            I(e) ? Di(n) && a.push(o.get("length")) : (a.push(o.get(Mt)),
            It(e) && a.push(o.get(ci)));
            break;
        case "delete":
            I(e) || (a.push(o.get(Mt)),
            It(e) && a.push(o.get(ci)));
            break;
        case "set":
            It(e) && a.push(o.get(Mt));
            break
        }
    if (a.length === 1)
        a[0] && di(a[0]);
    else {
        const l = [];
        for (const u of a)
            u && l.push(...u);
        di(ki(l))
    }
}
function di(e, t) {
    const n = I(e) ? e : [...e];
    for (const i of n)
        i.computed && rs(i);
    for (const i of n)
        i.computed || rs(i)
}
function rs(e, t) {
    (e !== Se || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
}
const Vo = Ci("__proto__,__v_isRef,__isVue")
  , or = new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e !== "arguments" && e !== "caller").map(e=>Symbol[e]).filter(rn))
  , jo = Oi()
  , zo = Oi(!1, !0)
  , Wo = Oi(!0)
  , os = Uo();
function Uo() {
    const e = {};
    return ["includes", "indexOf", "lastIndexOf"].forEach(t=>{
        e[t] = function(...n) {
            const i = q(this);
            for (let r = 0, o = this.length; r < o; r++)
                Re(i, "get", r + "");
            const s = i[t](...n);
            return s === -1 || s === !1 ? i[t](...n.map(q)) : s
        }
    }
    ),
    ["push", "pop", "shift", "unshift", "splice"].forEach(t=>{
        e[t] = function(...n) {
            $t();
            const i = q(this)[t].apply(this, n);
            return Kt(),
            i
        }
    }
    ),
    e
}
function Oi(e=!1, t=!1) {
    return function(i, s, r) {
        if (s === "__v_isReactive")
            return !e;
        if (s === "__v_isReadonly")
            return e;
        if (s === "__v_isShallow")
            return t;
        if (s === "__v_raw" && r === (e ? t ? oa : dr : t ? cr : fr).get(i))
            return i;
        const o = I(i);
        if (!e && o && K(os, s))
            return Reflect.get(os, s, r);
        const a = Reflect.get(i, s, r);
        return (rn(s) ? or.has(s) : Vo(s)) || (e || Re(i, "get", s),
        t) ? a : he(a) ? o && Di(s) ? a : a.value : te(a) ? e ? ur(a) : _n(a) : a
    }
}
const Go = ar()
  , $o = ar(!0);
function ar(e=!1) {
    return function(n, i, s, r) {
        let o = n[i];
        if (Ht(o) && he(o) && !he(s))
            return !1;
        if (!e && (!On(s) && !Ht(s) && (o = q(o),
        s = q(s)),
        !I(n) && he(o) && !he(s)))
            return o.value = s,
            !0;
        const a = I(n) && Di(i) ? Number(i) < n.length : K(n, i)
          , l = Reflect.set(n, i, s, r);
        return n === q(r) && (a ? on(s, o) && et(n, "set", i, s) : et(n, "add", i, s)),
        l
    }
}
function Ko(e, t) {
    const n = K(e, t);
    e[t];
    const i = Reflect.deleteProperty(e, t);
    return i && n && et(e, "delete", t, void 0),
    i
}
function qo(e, t) {
    const n = Reflect.has(e, t);
    return (!rn(t) || !or.has(t)) && Re(e, "has", t),
    n
}
function Jo(e) {
    return Re(e, "iterate", I(e) ? "length" : Mt),
    Reflect.ownKeys(e)
}
const lr = {
    get: jo,
    set: Go,
    deleteProperty: Ko,
    has: qo,
    ownKeys: Jo
}
  , Yo = {
    get: Wo,
    set(e, t) {
        return !0
    },
    deleteProperty(e, t) {
        return !0
    }
}
  , Xo = ye({}, lr, {
    get: zo,
    set: $o
})
  , Li = e=>e
  , jn = e=>Reflect.getPrototypeOf(e);
function bn(e, t, n=!1, i=!1) {
    e = e.__v_raw;
    const s = q(e)
      , r = q(t);
    n || (t !== r && Re(s, "get", t),
    Re(s, "get", r));
    const {has: o} = jn(s)
      , a = i ? Li : n ? Fi : ln;
    if (o.call(s, t))
        return a(e.get(t));
    if (o.call(s, r))
        return a(e.get(r));
    e !== s && e.get(t)
}
function wn(e, t=!1) {
    const n = this.__v_raw
      , i = q(n)
      , s = q(e);
    return t || (e !== s && Re(i, "has", e),
    Re(i, "has", s)),
    e === s ? n.has(e) : n.has(e) || n.has(s)
}
function vn(e, t=!1) {
    return e = e.__v_raw,
    !t && Re(q(e), "iterate", Mt),
    Reflect.get(e, "size", e)
}
function as(e) {
    e = q(e);
    const t = q(this);
    return jn(t).has.call(t, e) || (t.add(e),
    et(t, "add", e, e)),
    this
}
function ls(e, t) {
    t = q(t);
    const n = q(this)
      , {has: i, get: s} = jn(n);
    let r = i.call(n, e);
    r || (e = q(e),
    r = i.call(n, e));
    const o = s.call(n, e);
    return n.set(e, t),
    r ? on(t, o) && et(n, "set", e, t) : et(n, "add", e, t),
    this
}
function fs(e) {
    const t = q(this)
      , {has: n, get: i} = jn(t);
    let s = n.call(t, e);
    s || (e = q(e),
    s = n.call(t, e)),
    i && i.call(t, e);
    const r = t.delete(e);
    return s && et(t, "delete", e, void 0),
    r
}
function cs() {
    const e = q(this)
      , t = e.size !== 0
      , n = e.clear();
    return t && et(e, "clear", void 0, void 0),
    n
}
function Mn(e, t) {
    return function(i, s) {
        const r = this
          , o = r.__v_raw
          , a = q(o)
          , l = t ? Li : e ? Fi : ln;
        return !e && Re(a, "iterate", Mt),
        o.forEach((u,c)=>i.call(s, l(u), l(c), r))
    }
}
function Rn(e, t, n) {
    return function(...i) {
        const s = this.__v_raw
          , r = q(s)
          , o = It(r)
          , a = e === "entries" || e === Symbol.iterator && o
          , l = e === "keys" && o
          , u = s[e](...i)
          , c = n ? Li : t ? Fi : ln;
        return !t && Re(r, "iterate", l ? ci : Mt),
        {
            next() {
                const {value: p, done: m} = u.next();
                return m ? {
                    value: p,
                    done: m
                } : {
                    value: a ? [c(p[0]), c(p[1])] : c(p),
                    done: m
                }
            },
            [Symbol.iterator]() {
                return this
            }
        }
    }
}
function it(e) {
    return function(...t) {
        return e === "delete" ? !1 : this
    }
}
function Zo() {
    const e = {
        get(r) {
            return bn(this, r)
        },
        get size() {
            return vn(this)
        },
        has: wn,
        add: as,
        set: ls,
        delete: fs,
        clear: cs,
        forEach: Mn(!1, !1)
    }
      , t = {
        get(r) {
            return bn(this, r, !1, !0)
        },
        get size() {
            return vn(this)
        },
        has: wn,
        add: as,
        set: ls,
        delete: fs,
        clear: cs,
        forEach: Mn(!1, !0)
    }
      , n = {
        get(r) {
            return bn(this, r, !0)
        },
        get size() {
            return vn(this, !0)
        },
        has(r) {
            return wn.call(this, r, !0)
        },
        add: it("add"),
        set: it("set"),
        delete: it("delete"),
        clear: it("clear"),
        forEach: Mn(!0, !1)
    }
      , i = {
        get(r) {
            return bn(this, r, !0, !0)
        },
        get size() {
            return vn(this, !0)
        },
        has(r) {
            return wn.call(this, r, !0)
        },
        add: it("add"),
        set: it("set"),
        delete: it("delete"),
        clear: it("clear"),
        forEach: Mn(!0, !0)
    };
    return ["keys", "values", "entries", Symbol.iterator].forEach(r=>{
        e[r] = Rn(r, !1, !1),
        n[r] = Rn(r, !0, !1),
        t[r] = Rn(r, !1, !0),
        i[r] = Rn(r, !0, !0)
    }
    ),
    [e, n, t, i]
}
const [Qo,ea,ta,na] = Zo();
function Ni(e, t) {
    const n = t ? e ? na : ta : e ? ea : Qo;
    return (i,s,r)=>s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? i : Reflect.get(K(n, s) && s in i ? n : i, s, r)
}
const ia = {
    get: Ni(!1, !1)
}
  , sa = {
    get: Ni(!1, !0)
}
  , ra = {
    get: Ni(!0, !1)
}
  , fr = new WeakMap
  , cr = new WeakMap
  , dr = new WeakMap
  , oa = new WeakMap;
function aa(e) {
    switch (e) {
    case "Object":
    case "Array":
        return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
        return 2;
    default:
        return 0
    }
}
function la(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : aa(Bo(e))
}
function _n(e) {
    return Ht(e) ? e : Ii(e, !1, lr, ia, fr)
}
function fa(e) {
    return Ii(e, !1, Xo, sa, cr)
}
function ur(e) {
    return Ii(e, !0, Yo, ra, dr)
}
function Ii(e, t, n, i, s) {
    if (!te(e) || e.__v_raw && !(t && e.__v_isReactive))
        return e;
    const r = s.get(e);
    if (r)
        return r;
    const o = la(e);
    if (o === 0)
        return e;
    const a = new Proxy(e,o === 2 ? i : n);
    return s.set(e, a),
    a
}
function Ft(e) {
    return Ht(e) ? Ft(e.__v_raw) : !!(e && e.__v_isReactive)
}
function Ht(e) {
    return !!(e && e.__v_isReadonly)
}
function On(e) {
    return !!(e && e.__v_isShallow)
}
function pr(e) {
    return Ft(e) || Ht(e)
}
function q(e) {
    const t = e && e.__v_raw;
    return t ? q(t) : e
}
function mr(e) {
    return Bn(e, "__v_skip", !0),
    e
}
const ln = e=>te(e) ? _n(e) : e
  , Fi = e=>te(e) ? ur(e) : e;
function hr(e) {
    lt && Se && (e = q(e),
    rr(e.dep || (e.dep = ki())))
}
function gr(e, t) {
    e = q(e),
    e.dep && di(e.dep)
}
function he(e) {
    return !!(e && e.__v_isRef === !0)
}
function ca(e) {
    return _r(e, !1)
}
function da(e) {
    return _r(e, !0)
}
function _r(e, t) {
    return he(e) ? e : new ua(e,t)
}
class ua {
    constructor(t, n) {
        this.__v_isShallow = n,
        this.dep = void 0,
        this.__v_isRef = !0,
        this._rawValue = n ? t : q(t),
        this._value = n ? t : ln(t)
    }
    get value() {
        return hr(this),
        this._value
    }
    set value(t) {
        const n = this.__v_isShallow || On(t) || Ht(t);
        t = n ? t : q(t),
        on(t, this._rawValue) && (this._rawValue = t,
        this._value = n ? t : ln(t),
        gr(this))
    }
}
function Rt(e) {
    return he(e) ? e.value : e
}
const pa = {
    get: (e,t,n)=>Rt(Reflect.get(e, t, n)),
    set: (e,t,n,i)=>{
        const s = e[t];
        return he(s) && !he(n) ? (s.value = n,
        !0) : Reflect.set(e, t, n, i)
    }
};
function yr(e) {
    return Ft(e) ? e : new Proxy(e,pa)
}
var br;
class ma {
    constructor(t, n, i, s) {
        this._setter = n,
        this.dep = void 0,
        this.__v_isRef = !0,
        this[br] = !1,
        this._dirty = !0,
        this.effect = new Bi(t,()=>{
            this._dirty || (this._dirty = !0,
            gr(this))
        }
        ),
        this.effect.computed = this,
        this.effect.active = this._cacheable = !s,
        this.__v_isReadonly = i
    }
    get value() {
        const t = q(this);
        return hr(t),
        (t._dirty || !t._cacheable) && (t._dirty = !1,
        t._value = t.effect.run()),
        t._value
    }
    set value(t) {
        this._setter(t)
    }
}
br = "__v_isReadonly";
function ha(e, t, n=!1) {
    let i, s;
    const r = H(e);
    return r ? (i = e,
    s = ke) : (i = e.get,
    s = e.set),
    new ma(i,s,r || !s,n)
}
function ft(e, t, n, i) {
    let s;
    try {
        s = i ? e(...i) : e()
    } catch (r) {
        zn(r, t, n)
    }
    return s
}
function Be(e, t, n, i) {
    if (H(e)) {
        const r = ft(e, t, n, i);
        return r && Qs(r) && r.catch(o=>{
            zn(o, t, n)
        }
        ),
        r
    }
    const s = [];
    for (let r = 0; r < e.length; r++)
        s.push(Be(e[r], t, n, i));
    return s
}
function zn(e, t, n, i=!0) {
    const s = t ? t.vnode : null;
    if (t) {
        let r = t.parent;
        const o = t.proxy
          , a = n;
        for (; r; ) {
            const u = r.ec;
            if (u) {
                for (let c = 0; c < u.length; c++)
                    if (u[c](e, o, a) === !1)
                        return
            }
            r = r.parent
        }
        const l = t.appContext.config.errorHandler;
        if (l) {
            ft(l, null, 10, [e, o, a]);
            return
        }
    }
    ga(e, n, s, i)
}
function ga(e, t, n, i=!0) {
    console.error(e)
}
let fn = !1
  , ui = !1;
const me = [];
let ze = 0;
const Et = [];
let Ke = null
  , _t = 0;
const wr = Promise.resolve();
let Ei = null;
function vr(e) {
    const t = Ei || wr;
    return e ? t.then(this ? e.bind(this) : e) : t
}
function _a(e) {
    let t = ze + 1
      , n = me.length;
    for (; t < n; ) {
        const i = t + n >>> 1;
        cn(me[i]) < e ? t = i + 1 : n = i
    }
    return t
}
function Hi(e) {
    (!me.length || !me.includes(e, fn && e.allowRecurse ? ze + 1 : ze)) && (e.id == null ? me.push(e) : me.splice(_a(e.id), 0, e),
    Mr())
}
function Mr() {
    !fn && !ui && (ui = !0,
    Ei = wr.then(Tr))
}
function ya(e) {
    const t = me.indexOf(e);
    t > ze && me.splice(t, 1)
}
function ba(e) {
    I(e) ? Et.push(...e) : (!Ke || !Ke.includes(e, e.allowRecurse ? _t + 1 : _t)) && Et.push(e),
    Mr()
}
function ds(e, t=fn ? ze + 1 : 0) {
    for (; t < me.length; t++) {
        const n = me[t];
        n && n.pre && (me.splice(t, 1),
        t--,
        n())
    }
}
function Rr(e) {
    if (Et.length) {
        const t = [...new Set(Et)];
        if (Et.length = 0,
        Ke) {
            Ke.push(...t);
            return
        }
        for (Ke = t,
        Ke.sort((n,i)=>cn(n) - cn(i)),
        _t = 0; _t < Ke.length; _t++)
            Ke[_t]();
        Ke = null,
        _t = 0
    }
}
const cn = e=>e.id == null ? 1 / 0 : e.id
  , wa = (e,t)=>{
    const n = cn(e) - cn(t);
    if (n === 0) {
        if (e.pre && !t.pre)
            return -1;
        if (t.pre && !e.pre)
            return 1
    }
    return n
}
;
function Tr(e) {
    ui = !1,
    fn = !0,
    me.sort(wa);
    const t = ke;
    try {
        for (ze = 0; ze < me.length; ze++) {
            const n = me[ze];
            n && n.active !== !1 && ft(n, null, 14)
        }
    } finally {
        ze = 0,
        me.length = 0,
        Rr(),
        fn = !1,
        Ei = null,
        (me.length || Et.length) && Tr()
    }
}
function va(e, t, ...n) {
    if (e.isUnmounted)
        return;
    const i = e.vnode.props || ne;
    let s = n;
    const r = t.startsWith("update:")
      , o = r && t.slice(7);
    if (o && o in i) {
        const c = `${o === "modelValue" ? "model" : o}Modifiers`
          , {number: p, trim: m} = i[c] || ne;
        m && (s = n.map(v=>de(v) ? v.trim() : v)),
        p && (s = n.map(an))
    }
    let a, l = i[a = Xn(t)] || i[a = Xn(We(t))];
    !l && r && (l = i[a = Xn(Pt(t))]),
    l && Be(l, e, 6, s);
    const u = i[a + "Once"];
    if (u) {
        if (!e.emitted)
            e.emitted = {};
        else if (e.emitted[a])
            return;
        e.emitted[a] = !0,
        Be(u, e, 6, s)
    }
}
function Cr(e, t, n=!1) {
    const i = t.emitsCache
      , s = i.get(e);
    if (s !== void 0)
        return s;
    const r = e.emits;
    let o = {}
      , a = !1;
    if (!H(e)) {
        const l = u=>{
            const c = Cr(u, t, !0);
            c && (a = !0,
            ye(o, c))
        }
        ;
        !n && t.mixins.length && t.mixins.forEach(l),
        e.extends && l(e.extends),
        e.mixins && e.mixins.forEach(l)
    }
    return !r && !a ? (te(e) && i.set(e, null),
    null) : (I(r) ? r.forEach(l=>o[l] = null) : ye(o, r),
    te(e) && i.set(e, o),
    o)
}
function Wn(e, t) {
    return !e || !En(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""),
    K(e, t[0].toLowerCase() + t.slice(1)) || K(e, Pt(t)) || K(e, t))
}
let Ce = null
  , Un = null;
function Ln(e) {
    const t = Ce;
    return Ce = e,
    Un = e && e.type.__scopeId || null,
    t
}
function Sc(e) {
    Un = e
}
function Dc() {
    Un = null
}
function Ma(e, t=Ce, n) {
    if (!t || e._n)
        return e;
    const i = (...s)=>{
        i._d && ws(-1);
        const r = Ln(t);
        let o;
        try {
            o = e(...s)
        } finally {
            Ln(r),
            i._d && ws(1)
        }
        return o
    }
    ;
    return i._n = !0,
    i._c = !0,
    i._d = !0,
    i
}
function Zn(e) {
    const {type: t, vnode: n, proxy: i, withProxy: s, props: r, propsOptions: [o], slots: a, attrs: l, emit: u, render: c, renderCache: p, data: m, setupState: v, ctx: A, inheritAttrs: k} = e;
    let V, D;
    const E = Ln(e);
    try {
        if (n.shapeFlag & 4) {
            const J = s || i;
            V = je(c.call(J, J, p, r, v, m, A)),
            D = l
        } else {
            const J = t;
            V = je(J.length > 1 ? J(r, {
                attrs: l,
                slots: a,
                emit: u
            }) : J(r, null)),
            D = t.props ? l : Ra(l)
        }
    } catch (J) {
        en.length = 0,
        zn(J, e, 1),
        V = _e(Ct)
    }
    let N = V;
    if (D && k !== !1) {
        const J = Object.keys(D)
          , {shapeFlag: pe} = N;
        J.length && pe & 7 && (o && J.some(Ai) && (D = Ta(D, o)),
        N = Vt(N, D))
    }
    return n.dirs && (N = Vt(N),
    N.dirs = N.dirs ? N.dirs.concat(n.dirs) : n.dirs),
    n.transition && (N.transition = n.transition),
    V = N,
    Ln(E),
    V
}
const Ra = e=>{
    let t;
    for (const n in e)
        (n === "class" || n === "style" || En(n)) && ((t || (t = {}))[n] = e[n]);
    return t
}
  , Ta = (e,t)=>{
    const n = {};
    for (const i in e)
        (!Ai(i) || !(i.slice(9)in t)) && (n[i] = e[i]);
    return n
}
;
function Ca(e, t, n) {
    const {props: i, children: s, component: r} = e
      , {props: o, children: a, patchFlag: l} = t
      , u = r.emitsOptions;
    if (t.dirs || t.transition)
        return !0;
    if (n && l >= 0) {
        if (l & 1024)
            return !0;
        if (l & 16)
            return i ? us(i, o, u) : !!o;
        if (l & 8) {
            const c = t.dynamicProps;
            for (let p = 0; p < c.length; p++) {
                const m = c[p];
                if (o[m] !== i[m] && !Wn(u, m))
                    return !0
            }
        }
    } else
        return (s || a) && (!a || !a.$stable) ? !0 : i === o ? !1 : i ? o ? us(i, o, u) : !0 : !!o;
    return !1
}
function us(e, t, n) {
    const i = Object.keys(t);
    if (i.length !== Object.keys(e).length)
        return !0;
    for (let s = 0; s < i.length; s++) {
        const r = i[s];
        if (t[r] !== e[r] && !Wn(n, r))
            return !0
    }
    return !1
}
function Pa({vnode: e, parent: t}, n) {
    for (; t && t.subTree === e; )
        (e = t.vnode).el = n,
        t = t.parent
}
const xa = e=>e.__isSuspense;
function Aa(e, t) {
    t && t.pendingBranch ? I(e) ? t.effects.push(...e) : t.effects.push(e) : ba(e)
}
function xn(e, t) {
    if (ue) {
        let n = ue.provides;
        const i = ue.parent && ue.parent.provides;
        i === n && (n = ue.provides = Object.create(i)),
        n[e] = t
    }
}
function Qe(e, t, n=!1) {
    const i = ue || Ce;
    if (i) {
        const s = i.parent == null ? i.vnode.appContext && i.vnode.appContext.provides : i.parent.provides;
        if (s && e in s)
            return s[e];
        if (arguments.length > 1)
            return n && H(t) ? t.call(i.proxy) : t
    }
}
const Tn = {};
function An(e, t, n) {
    return Pr(e, t, n)
}
function Pr(e, t, {immediate: n, deep: i, flush: s, onTrack: r, onTrigger: o}=ne) {
    const a = ue;
    let l, u = !1, c = !1;
    if (he(e) ? (l = ()=>e.value,
    u = On(e)) : Ft(e) ? (l = ()=>e,
    i = !0) : I(e) ? (c = !0,
    u = e.some(N=>Ft(N) || On(N)),
    l = ()=>e.map(N=>{
        if (he(N))
            return N.value;
        if (Ft(N))
            return vt(N);
        if (H(N))
            return ft(N, a, 2)
    }
    )) : H(e) ? t ? l = ()=>ft(e, a, 2) : l = ()=>{
        if (!(a && a.isUnmounted))
            return p && p(),
            Be(e, a, 3, [m])
    }
    : l = ke,
    t && i) {
        const N = l;
        l = ()=>vt(N())
    }
    let p, m = N=>{
        p = D.onStop = ()=>{
            ft(N, a, 4)
        }
    }
    , v;
    if (un)
        if (m = ke,
        t ? n && Be(t, a, 3, [l(), c ? [] : void 0, m]) : l(),
        s === "sync") {
            const N = Tl();
            v = N.__watcherHandles || (N.__watcherHandles = [])
        } else
            return ke;
    let A = c ? new Array(e.length).fill(Tn) : Tn;
    const k = ()=>{
        if (D.active)
            if (t) {
                const N = D.run();
                (i || u || (c ? N.some((J,pe)=>on(J, A[pe])) : on(N, A))) && (p && p(),
                Be(t, a, 3, [N, A === Tn ? void 0 : c && A[0] === Tn ? [] : A, m]),
                A = N)
            } else
                D.run()
    }
    ;
    k.allowRecurse = !!t;
    let V;
    s === "sync" ? V = k : s === "post" ? V = ()=>we(k, a && a.suspense) : (k.pre = !0,
    a && (k.id = a.uid),
    V = ()=>Hi(k));
    const D = new Bi(l,V);
    t ? n ? k() : A = D.run() : s === "post" ? we(D.run.bind(D), a && a.suspense) : D.run();
    const E = ()=>{
        D.stop(),
        a && a.scope && Si(a.scope.effects, D)
    }
    ;
    return v && v.push(E),
    E
}
function Sa(e, t, n) {
    const i = this.proxy
      , s = de(e) ? e.includes(".") ? xr(i, e) : ()=>i[e] : e.bind(i, i);
    let r;
    H(t) ? r = t : (r = t.handler,
    n = t);
    const o = ue;
    jt(this);
    const a = Pr(s, r.bind(i), n);
    return o ? jt(o) : Tt(),
    a
}
function xr(e, t) {
    const n = t.split(".");
    return ()=>{
        let i = e;
        for (let s = 0; s < n.length && i; s++)
            i = i[n[s]];
        return i
    }
}
function vt(e, t) {
    if (!te(e) || e.__v_skip || (t = t || new Set,
    t.has(e)))
        return e;
    if (t.add(e),
    he(e))
        vt(e.value, t);
    else if (I(e))
        for (let n = 0; n < e.length; n++)
            vt(e[n], t);
    else if (Gt(e) || It(e))
        e.forEach(n=>{
            vt(n, t)
        }
        );
    else if (tr(e))
        for (const n in e)
            vt(e[n], t);
    return e
}
function Gn(e) {
    return H(e) ? {
        setup: e,
        name: e.name
    } : e
}
const Sn = e=>!!e.type.__asyncLoader
  , Ar = e=>e.type.__isKeepAlive;
function Da(e, t) {
    Sr(e, "a", t)
}
function ka(e, t) {
    Sr(e, "da", t)
}
function Sr(e, t, n=ue) {
    const i = e.__wdc || (e.__wdc = ()=>{
        let s = n;
        for (; s; ) {
            if (s.isDeactivated)
                return;
            s = s.parent
        }
        return e()
    }
    );
    if ($n(t, i, n),
    n) {
        let s = n.parent;
        for (; s && s.parent; )
            Ar(s.parent.vnode) && Ba(i, t, n, s),
            s = s.parent
    }
}
function Ba(e, t, n, i) {
    const s = $n(t, e, i, !0);
    Dr(()=>{
        Si(i[t], s)
    }
    , n)
}
function $n(e, t, n=ue, i=!1) {
    if (n) {
        const s = n[e] || (n[e] = [])
          , r = t.__weh || (t.__weh = (...o)=>{
            if (n.isUnmounted)
                return;
            $t(),
            jt(n);
            const a = Be(t, n, e, o);
            return Tt(),
            Kt(),
            a
        }
        );
        return i ? s.unshift(r) : s.push(r),
        r
    }
}
const tt = e=>(t,n=ue)=>(!un || e === "sp") && $n(e, (...i)=>t(...i), n)
  , Oa = tt("bm")
  , La = tt("m")
  , Na = tt("bu")
  , Ia = tt("u")
  , Fa = tt("bum")
  , Dr = tt("um")
  , Ea = tt("sp")
  , Ha = tt("rtg")
  , Va = tt("rtc");
function ja(e, t=ue) {
    $n("ec", e, t)
}
function kc(e, t) {
    const n = Ce;
    if (n === null)
        return e;
    const i = Jn(n) || n.proxy
      , s = e.dirs || (e.dirs = []);
    for (let r = 0; r < t.length; r++) {
        let[o,a,l,u=ne] = t[r];
        o && (H(o) && (o = {
            mounted: o,
            updated: o
        }),
        o.deep && vt(a),
        s.push({
            dir: o,
            instance: i,
            value: a,
            oldValue: void 0,
            arg: l,
            modifiers: u
        }))
    }
    return e
}
function mt(e, t, n, i) {
    const s = e.dirs
      , r = t && t.dirs;
    for (let o = 0; o < s.length; o++) {
        const a = s[o];
        r && (a.oldValue = r[o].value);
        let l = a.dir[i];
        l && ($t(),
        Be(l, n, 8, [e.el, a, e, t]),
        Kt())
    }
}
const kr = "components";
function Bc(e, t) {
    return Wa(kr, e, !0, t) || e
}
const za = Symbol();
function Wa(e, t, n=!0, i=!1) {
    const s = Ce || ue;
    if (s) {
        const r = s.type;
        if (e === kr) {
            const a = vl(r, !1);
            if (a && (a === t || a === We(t) || a === Vn(We(t))))
                return r
        }
        const o = ps(s[e] || r[e], t) || ps(s.appContext[e], t);
        return !o && i ? r : o
    }
}
function ps(e, t) {
    return e && (e[t] || e[We(t)] || e[Vn(We(t))])
}
function Oc(e, t, n, i) {
    let s;
    const r = n && n[i];
    if (I(e) || de(e)) {
        s = new Array(e.length);
        for (let o = 0, a = e.length; o < a; o++)
            s[o] = t(e[o], o, void 0, r && r[o])
    } else if (typeof e == "number") {
        s = new Array(e);
        for (let o = 0; o < e; o++)
            s[o] = t(o + 1, o, void 0, r && r[o])
    } else if (te(e))
        if (e[Symbol.iterator])
            s = Array.from(e, (o,a)=>t(o, a, void 0, r && r[a]));
        else {
            const o = Object.keys(e);
            s = new Array(o.length);
            for (let a = 0, l = o.length; a < l; a++) {
                const u = o[a];
                s[a] = t(e[u], u, a, r && r[a])
            }
        }
    else
        s = [];
    return n && (n[i] = s),
    s
}
const pi = e=>e ? Ur(e) ? Jn(e) || e.proxy : pi(e.parent) : null
  , Qt = ye(Object.create(null), {
    $: e=>e,
    $el: e=>e.vnode.el,
    $data: e=>e.data,
    $props: e=>e.props,
    $attrs: e=>e.attrs,
    $slots: e=>e.slots,
    $refs: e=>e.refs,
    $parent: e=>pi(e.parent),
    $root: e=>pi(e.root),
    $emit: e=>e.emit,
    $options: e=>Vi(e),
    $forceUpdate: e=>e.f || (e.f = ()=>Hi(e.update)),
    $nextTick: e=>e.n || (e.n = vr.bind(e.proxy)),
    $watch: e=>Sa.bind(e)
})
  , Qn = (e,t)=>e !== ne && !e.__isScriptSetup && K(e, t)
  , Ua = {
    get({_: e}, t) {
        const {ctx: n, setupState: i, data: s, props: r, accessCache: o, type: a, appContext: l} = e;
        let u;
        if (t[0] !== "$") {
            const v = o[t];
            if (v !== void 0)
                switch (v) {
                case 1:
                    return i[t];
                case 2:
                    return s[t];
                case 4:
                    return n[t];
                case 3:
                    return r[t]
                }
            else {
                if (Qn(i, t))
                    return o[t] = 1,
                    i[t];
                if (s !== ne && K(s, t))
                    return o[t] = 2,
                    s[t];
                if ((u = e.propsOptions[0]) && K(u, t))
                    return o[t] = 3,
                    r[t];
                if (n !== ne && K(n, t))
                    return o[t] = 4,
                    n[t];
                mi && (o[t] = 0)
            }
        }
        const c = Qt[t];
        let p, m;
        if (c)
            return t === "$attrs" && Re(e, "get", t),
            c(e);
        if ((p = a.__cssModules) && (p = p[t]))
            return p;
        if (n !== ne && K(n, t))
            return o[t] = 4,
            n[t];
        if (m = l.config.globalProperties,
        K(m, t))
            return m[t]
    },
    set({_: e}, t, n) {
        const {data: i, setupState: s, ctx: r} = e;
        return Qn(s, t) ? (s[t] = n,
        !0) : i !== ne && K(i, t) ? (i[t] = n,
        !0) : K(e.props, t) || t[0] === "$" && t.slice(1)in e ? !1 : (r[t] = n,
        !0)
    },
    has({_: {data: e, setupState: t, accessCache: n, ctx: i, appContext: s, propsOptions: r}}, o) {
        let a;
        return !!n[o] || e !== ne && K(e, o) || Qn(t, o) || (a = r[0]) && K(a, o) || K(i, o) || K(Qt, o) || K(s.config.globalProperties, o)
    },
    defineProperty(e, t, n) {
        return n.get != null ? e._.accessCache[t] = 0 : K(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
    }
};
let mi = !0;
function Ga(e) {
    const t = Vi(e)
      , n = e.proxy
      , i = e.ctx;
    mi = !1,
    t.beforeCreate && ms(t.beforeCreate, e, "bc");
    const {data: s, computed: r, methods: o, watch: a, provide: l, inject: u, created: c, beforeMount: p, mounted: m, beforeUpdate: v, updated: A, activated: k, deactivated: V, beforeDestroy: D, beforeUnmount: E, destroyed: N, unmounted: J, render: pe, renderTracked: ve, renderTriggered: Le, errorCaptured: Ue, serverPrefetch: xt, expose: Ne, inheritAttrs: nt, components: Ie, directives: At, filters: ut} = t;
    if (u && $a(u, i, null, e.appContext.config.unwrapInjectedRef),
    o)
        for (const Q in o) {
            const X = o[Q];
            H(X) && (i[Q] = X.bind(n))
        }
    if (s) {
        const Q = s.call(n, n);
        te(Q) && (e.data = _n(Q))
    }
    if (mi = !0,
    r)
        for (const Q in r) {
            const X = r[Q]
              , Pe = H(X) ? X.bind(n, n) : H(X.get) ? X.get.bind(n, n) : ke
              , pt = !H(X) && H(X.set) ? X.set.bind(n) : ke
              , xe = Te({
                get: Pe,
                set: pt
            });
            Object.defineProperty(i, Q, {
                enumerable: !0,
                configurable: !0,
                get: ()=>xe.value,
                set: be=>xe.value = be
            })
        }
    if (a)
        for (const Q in a)
            Br(a[Q], i, n, Q);
    if (l) {
        const Q = H(l) ? l.call(n) : l;
        Reflect.ownKeys(Q).forEach(X=>{
            xn(X, Q[X])
        }
        )
    }
    c && ms(c, e, "c");
    function re(Q, X) {
        I(X) ? X.forEach(Pe=>Q(Pe.bind(n))) : X && Q(X.bind(n))
    }
    if (re(Oa, p),
    re(La, m),
    re(Na, v),
    re(Ia, A),
    re(Da, k),
    re(ka, V),
    re(ja, Ue),
    re(Va, ve),
    re(Ha, Le),
    re(Fa, E),
    re(Dr, J),
    re(Ea, xt),
    I(Ne))
        if (Ne.length) {
            const Q = e.exposed || (e.exposed = {});
            Ne.forEach(X=>{
                Object.defineProperty(Q, X, {
                    get: ()=>n[X],
                    set: Pe=>n[X] = Pe
                })
            }
            )
        } else
            e.exposed || (e.exposed = {});
    pe && e.render === ke && (e.render = pe),
    nt != null && (e.inheritAttrs = nt),
    Ie && (e.components = Ie),
    At && (e.directives = At)
}
function $a(e, t, n=ke, i=!1) {
    I(e) && (e = hi(e));
    for (const s in e) {
        const r = e[s];
        let o;
        te(r) ? "default"in r ? o = Qe(r.from || s, r.default, !0) : o = Qe(r.from || s) : o = Qe(r),
        he(o) && i ? Object.defineProperty(t, s, {
            enumerable: !0,
            configurable: !0,
            get: ()=>o.value,
            set: a=>o.value = a
        }) : t[s] = o
    }
}
function ms(e, t, n) {
    Be(I(e) ? e.map(i=>i.bind(t.proxy)) : e.bind(t.proxy), t, n)
}
function Br(e, t, n, i) {
    const s = i.includes(".") ? xr(n, i) : ()=>n[i];
    if (de(e)) {
        const r = t[e];
        H(r) && An(s, r)
    } else if (H(e))
        An(s, e.bind(n));
    else if (te(e))
        if (I(e))
            e.forEach(r=>Br(r, t, n, i));
        else {
            const r = H(e.handler) ? e.handler.bind(n) : t[e.handler];
            H(r) && An(s, r, e)
        }
}
function Vi(e) {
    const t = e.type
      , {mixins: n, extends: i} = t
      , {mixins: s, optionsCache: r, config: {optionMergeStrategies: o}} = e.appContext
      , a = r.get(t);
    let l;
    return a ? l = a : !s.length && !n && !i ? l = t : (l = {},
    s.length && s.forEach(u=>Nn(l, u, o, !0)),
    Nn(l, t, o)),
    te(t) && r.set(t, l),
    l
}
function Nn(e, t, n, i=!1) {
    const {mixins: s, extends: r} = t;
    r && Nn(e, r, n, !0),
    s && s.forEach(o=>Nn(e, o, n, !0));
    for (const o in t)
        if (!(i && o === "expose")) {
            const a = Ka[o] || n && n[o];
            e[o] = a ? a(e[o], t[o]) : t[o]
        }
    return e
}
const Ka = {
    data: hs,
    props: gt,
    emits: gt,
    methods: gt,
    computed: gt,
    beforeCreate: ge,
    created: ge,
    beforeMount: ge,
    mounted: ge,
    beforeUpdate: ge,
    updated: ge,
    beforeDestroy: ge,
    beforeUnmount: ge,
    destroyed: ge,
    unmounted: ge,
    activated: ge,
    deactivated: ge,
    errorCaptured: ge,
    serverPrefetch: ge,
    components: gt,
    directives: gt,
    watch: Ja,
    provide: hs,
    inject: qa
};
function hs(e, t) {
    return t ? e ? function() {
        return ye(H(e) ? e.call(this, this) : e, H(t) ? t.call(this, this) : t)
    }
    : t : e
}
function qa(e, t) {
    return gt(hi(e), hi(t))
}
function hi(e) {
    if (I(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++)
            t[e[n]] = e[n];
        return t
    }
    return e
}
function ge(e, t) {
    return e ? [...new Set([].concat(e, t))] : t
}
function gt(e, t) {
    return e ? ye(ye(Object.create(null), e), t) : t
}
function Ja(e, t) {
    if (!e)
        return t;
    if (!t)
        return e;
    const n = ye(Object.create(null), e);
    for (const i in t)
        n[i] = ge(e[i], t[i]);
    return n
}
function Ya(e, t, n, i=!1) {
    const s = {}
      , r = {};
    Bn(r, qn, 1),
    e.propsDefaults = Object.create(null),
    Or(e, t, s, r);
    for (const o in e.propsOptions[0])
        o in s || (s[o] = void 0);
    n ? e.props = i ? s : fa(s) : e.type.props ? e.props = s : e.props = r,
    e.attrs = r
}
function Xa(e, t, n, i) {
    const {props: s, attrs: r, vnode: {patchFlag: o}} = e
      , a = q(s)
      , [l] = e.propsOptions;
    let u = !1;
    if ((i || o > 0) && !(o & 16)) {
        if (o & 8) {
            const c = e.vnode.dynamicProps;
            for (let p = 0; p < c.length; p++) {
                let m = c[p];
                if (Wn(e.emitsOptions, m))
                    continue;
                const v = t[m];
                if (l)
                    if (K(r, m))
                        v !== r[m] && (r[m] = v,
                        u = !0);
                    else {
                        const A = We(m);
                        s[A] = gi(l, a, A, v, e, !1)
                    }
                else
                    v !== r[m] && (r[m] = v,
                    u = !0)
            }
        }
    } else {
        Or(e, t, s, r) && (u = !0);
        let c;
        for (const p in a)
            (!t || !K(t, p) && ((c = Pt(p)) === p || !K(t, c))) && (l ? n && (n[p] !== void 0 || n[c] !== void 0) && (s[p] = gi(l, a, p, void 0, e, !0)) : delete s[p]);
        if (r !== a)
            for (const p in r)
                (!t || !K(t, p)) && (delete r[p],
                u = !0)
    }
    u && et(e, "set", "$attrs")
}
function Or(e, t, n, i) {
    const [s,r] = e.propsOptions;
    let o = !1, a;
    if (t)
        for (let l in t) {
            if (Cn(l))
                continue;
            const u = t[l];
            let c;
            s && K(s, c = We(l)) ? !r || !r.includes(c) ? n[c] = u : (a || (a = {}))[c] = u : Wn(e.emitsOptions, l) || (!(l in i) || u !== i[l]) && (i[l] = u,
            o = !0)
        }
    if (r) {
        const l = q(n)
          , u = a || ne;
        for (let c = 0; c < r.length; c++) {
            const p = r[c];
            n[p] = gi(s, l, p, u[p], e, !K(u, p))
        }
    }
    return o
}
function gi(e, t, n, i, s, r) {
    const o = e[n];
    if (o != null) {
        const a = K(o, "default");
        if (a && i === void 0) {
            const l = o.default;
            if (o.type !== Function && H(l)) {
                const {propsDefaults: u} = s;
                n in u ? i = u[n] : (jt(s),
                i = u[n] = l.call(null, t),
                Tt())
            } else
                i = l
        }
        o[0] && (r && !a ? i = !1 : o[1] && (i === "" || i === Pt(n)) && (i = !0))
    }
    return i
}
function Lr(e, t, n=!1) {
    const i = t.propsCache
      , s = i.get(e);
    if (s)
        return s;
    const r = e.props
      , o = {}
      , a = [];
    let l = !1;
    if (!H(e)) {
        const c = p=>{
            l = !0;
            const [m,v] = Lr(p, t, !0);
            ye(o, m),
            v && a.push(...v)
        }
        ;
        !n && t.mixins.length && t.mixins.forEach(c),
        e.extends && c(e.extends),
        e.mixins && e.mixins.forEach(c)
    }
    if (!r && !l)
        return te(e) && i.set(e, Nt),
        Nt;
    if (I(r))
        for (let c = 0; c < r.length; c++) {
            const p = We(r[c]);
            gs(p) && (o[p] = ne)
        }
    else if (r)
        for (const c in r) {
            const p = We(c);
            if (gs(p)) {
                const m = r[c]
                  , v = o[p] = I(m) || H(m) ? {
                    type: m
                } : Object.assign({}, m);
                if (v) {
                    const A = bs(Boolean, v.type)
                      , k = bs(String, v.type);
                    v[0] = A > -1,
                    v[1] = k < 0 || A < k,
                    (A > -1 || K(v, "default")) && a.push(p)
                }
            }
        }
    const u = [o, a];
    return te(e) && i.set(e, u),
    u
}
function gs(e) {
    return e[0] !== "$"
}
function _s(e) {
    const t = e && e.toString().match(/^\s*function (\w+)/);
    return t ? t[1] : e === null ? "null" : ""
}
function ys(e, t) {
    return _s(e) === _s(t)
}
function bs(e, t) {
    return I(t) ? t.findIndex(n=>ys(n, e)) : H(t) && ys(t, e) ? 0 : -1
}
const Nr = e=>e[0] === "_" || e === "$stable"
  , ji = e=>I(e) ? e.map(je) : [je(e)]
  , Za = (e,t,n)=>{
    if (t._n)
        return t;
    const i = Ma((...s)=>ji(t(...s)), n);
    return i._c = !1,
    i
}
  , Ir = (e,t,n)=>{
    const i = e._ctx;
    for (const s in e) {
        if (Nr(s))
            continue;
        const r = e[s];
        if (H(r))
            t[s] = Za(s, r, i);
        else if (r != null) {
            const o = ji(r);
            t[s] = ()=>o
        }
    }
}
  , Fr = (e,t)=>{
    const n = ji(t);
    e.slots.default = ()=>n
}
  , Qa = (e,t)=>{
    if (e.vnode.shapeFlag & 32) {
        const n = t._;
        n ? (e.slots = q(t),
        Bn(t, "_", n)) : Ir(t, e.slots = {})
    } else
        e.slots = {},
        t && Fr(e, t);
    Bn(e.slots, qn, 1)
}
  , el = (e,t,n)=>{
    const {vnode: i, slots: s} = e;
    let r = !0
      , o = ne;
    if (i.shapeFlag & 32) {
        const a = t._;
        a ? n && a === 1 ? r = !1 : (ye(s, t),
        !n && a === 1 && delete s._) : (r = !t.$stable,
        Ir(t, s)),
        o = t
    } else
        t && (Fr(e, t),
        o = {
            default: 1
        });
    if (r)
        for (const a in s)
            !Nr(a) && !(a in o) && delete s[a]
}
;
function Er() {
    return {
        app: null,
        config: {
            isNativeTag: So,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {}
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap,
        propsCache: new WeakMap,
        emitsCache: new WeakMap
    }
}
let tl = 0;
function nl(e, t) {
    return function(i, s=null) {
        H(i) || (i = Object.assign({}, i)),
        s != null && !te(s) && (s = null);
        const r = Er()
          , o = new Set;
        let a = !1;
        const l = r.app = {
            _uid: tl++,
            _component: i,
            _props: s,
            _container: null,
            _context: r,
            _instance: null,
            version: Cl,
            get config() {
                return r.config
            },
            set config(u) {},
            use(u, ...c) {
                return o.has(u) || (u && H(u.install) ? (o.add(u),
                u.install(l, ...c)) : H(u) && (o.add(u),
                u(l, ...c))),
                l
            },
            mixin(u) {
                return r.mixins.includes(u) || r.mixins.push(u),
                l
            },
            component(u, c) {
                return c ? (r.components[u] = c,
                l) : r.components[u]
            },
            directive(u, c) {
                return c ? (r.directives[u] = c,
                l) : r.directives[u]
            },
            mount(u, c, p) {
                if (!a) {
                    const m = _e(i, s);
                    return m.appContext = r,
                    c && t ? t(m, u) : e(m, u, p),
                    a = !0,
                    l._container = u,
                    u.__vue_app__ = l,
                    Jn(m.component) || m.component.proxy
                }
            },
            unmount() {
                a && (e(null, l._container),
                delete l._container.__vue_app__)
            },
            provide(u, c) {
                return r.provides[u] = c,
                l
            }
        };
        return l
    }
}
function _i(e, t, n, i, s=!1) {
    if (I(e)) {
        e.forEach((m,v)=>_i(m, t && (I(t) ? t[v] : t), n, i, s));
        return
    }
    if (Sn(i) && !s)
        return;
    const r = i.shapeFlag & 4 ? Jn(i.component) || i.component.proxy : i.el
      , o = s ? null : r
      , {i: a, r: l} = e
      , u = t && t.r
      , c = a.refs === ne ? a.refs = {} : a.refs
      , p = a.setupState;
    if (u != null && u !== l && (de(u) ? (c[u] = null,
    K(p, u) && (p[u] = null)) : he(u) && (u.value = null)),
    H(l))
        ft(l, a, 12, [o, c]);
    else {
        const m = de(l)
          , v = he(l);
        if (m || v) {
            const A = ()=>{
                if (e.f) {
                    const k = m ? K(p, l) ? p[l] : c[l] : l.value;
                    s ? I(k) && Si(k, r) : I(k) ? k.includes(r) || k.push(r) : m ? (c[l] = [r],
                    K(p, l) && (p[l] = c[l])) : (l.value = [r],
                    e.k && (c[e.k] = l.value))
                } else
                    m ? (c[l] = o,
                    K(p, l) && (p[l] = o)) : v && (l.value = o,
                    e.k && (c[e.k] = o))
            }
            ;
            o ? (A.id = -1,
            we(A, n)) : A()
        }
    }
}
const we = Aa;
function il(e) {
    return sl(e)
}
function sl(e, t) {
    const n = No();
    n.__VUE__ = !0;
    const {insert: i, remove: s, patchProp: r, createElement: o, createText: a, createComment: l, setText: u, setElementText: c, parentNode: p, nextSibling: m, setScopeId: v=ke, insertStaticContent: A} = e
      , k = (f,d,h,_=null,b=null,R=null,P=!1,M=null,T=!!d.dynamicChildren)=>{
        if (f === d)
            return;
        f && !Yt(f, d) && (_ = C(f),
        be(f, b, R, !0),
        f = null),
        d.patchFlag === -2 && (T = !1,
        d.dynamicChildren = null);
        const {type: w, ref: O, shapeFlag: S} = d;
        switch (w) {
        case Kn:
            V(f, d, h, _);
            break;
        case Ct:
            D(f, d, h, _);
            break;
        case Dn:
            f == null && E(d, h, _, P);
            break;
        case qe:
            Ie(f, d, h, _, b, R, P, M, T);
            break;
        default:
            S & 1 ? pe(f, d, h, _, b, R, P, M, T) : S & 6 ? At(f, d, h, _, b, R, P, M, T) : (S & 64 || S & 128) && w.process(f, d, h, _, b, R, P, M, T, $)
        }
        O != null && b && _i(O, f && f.ref, R, d || f, !d)
    }
      , V = (f,d,h,_)=>{
        if (f == null)
            i(d.el = a(d.children), h, _);
        else {
            const b = d.el = f.el;
            d.children !== f.children && u(b, d.children)
        }
    }
      , D = (f,d,h,_)=>{
        f == null ? i(d.el = l(d.children || ""), h, _) : d.el = f.el
    }
      , E = (f,d,h,_)=>{
        [f.el,f.anchor] = A(f.children, d, h, _, f.el, f.anchor)
    }
      , N = ({el: f, anchor: d},h,_)=>{
        let b;
        for (; f && f !== d; )
            b = m(f),
            i(f, h, _),
            f = b;
        i(d, h, _)
    }
      , J = ({el: f, anchor: d})=>{
        let h;
        for (; f && f !== d; )
            h = m(f),
            s(f),
            f = h;
        s(d)
    }
      , pe = (f,d,h,_,b,R,P,M,T)=>{
        P = P || d.type === "svg",
        f == null ? ve(d, h, _, b, R, P, M, T) : xt(f, d, b, R, P, M, T)
    }
      , ve = (f,d,h,_,b,R,P,M)=>{
        let T, w;
        const {type: O, props: S, shapeFlag: L, transition: F, dirs: W} = f;
        if (T = f.el = o(f.type, R, S && S.is, S),
        L & 8 ? c(T, f.children) : L & 16 && Ue(f.children, T, null, _, b, R && O !== "foreignObject", P, M),
        W && mt(f, null, _, "created"),
        S) {
            for (const Z in S)
                Z !== "value" && !Cn(Z) && r(T, Z, null, S[Z], R, f.children, _, b, x);
            "value"in S && r(T, "value", null, S.value),
            (w = S.onVnodeBeforeMount) && Ee(w, _, f)
        }
        Le(T, f, f.scopeId, P, _),
        W && mt(f, null, _, "beforeMount");
        const ee = (!b || b && !b.pendingBranch) && F && !F.persisted;
        ee && F.beforeEnter(T),
        i(T, d, h),
        ((w = S && S.onVnodeMounted) || ee || W) && we(()=>{
            w && Ee(w, _, f),
            ee && F.enter(T),
            W && mt(f, null, _, "mounted")
        }
        , b)
    }
      , Le = (f,d,h,_,b)=>{
        if (h && v(f, h),
        _)
            for (let R = 0; R < _.length; R++)
                v(f, _[R]);
        if (b) {
            let R = b.subTree;
            if (d === R) {
                const P = b.vnode;
                Le(f, P, P.scopeId, P.slotScopeIds, b.parent)
            }
        }
    }
      , Ue = (f,d,h,_,b,R,P,M,T=0)=>{
        for (let w = T; w < f.length; w++) {
            const O = f[w] = M ? rt(f[w]) : je(f[w]);
            k(null, O, d, h, _, b, R, P, M)
        }
    }
      , xt = (f,d,h,_,b,R,P)=>{
        const M = d.el = f.el;
        let {patchFlag: T, dynamicChildren: w, dirs: O} = d;
        T |= f.patchFlag & 16;
        const S = f.props || ne
          , L = d.props || ne;
        let F;
        h && ht(h, !1),
        (F = L.onVnodeBeforeUpdate) && Ee(F, h, d, f),
        O && mt(d, f, h, "beforeUpdate"),
        h && ht(h, !0);
        const W = b && d.type !== "foreignObject";
        if (w ? Ne(f.dynamicChildren, w, M, h, _, W, R) : P || X(f, d, M, null, h, _, W, R, !1),
        T > 0) {
            if (T & 16)
                nt(M, d, S, L, h, _, b);
            else if (T & 2 && S.class !== L.class && r(M, "class", null, L.class, b),
            T & 4 && r(M, "style", S.style, L.style, b),
            T & 8) {
                const ee = d.dynamicProps;
                for (let Z = 0; Z < ee.length; Z++) {
                    const oe = ee[Z]
                      , Ae = S[oe]
                      , Dt = L[oe];
                    (Dt !== Ae || oe === "value") && r(M, oe, Ae, Dt, b, f.children, h, _, x)
                }
            }
            T & 1 && f.children !== d.children && c(M, d.children)
        } else
            !P && w == null && nt(M, d, S, L, h, _, b);
        ((F = L.onVnodeUpdated) || O) && we(()=>{
            F && Ee(F, h, d, f),
            O && mt(d, f, h, "updated")
        }
        , _)
    }
      , Ne = (f,d,h,_,b,R,P)=>{
        for (let M = 0; M < d.length; M++) {
            const T = f[M]
              , w = d[M]
              , O = T.el && (T.type === qe || !Yt(T, w) || T.shapeFlag & 70) ? p(T.el) : h;
            k(T, w, O, null, _, b, R, P, !0)
        }
    }
      , nt = (f,d,h,_,b,R,P)=>{
        if (h !== _) {
            if (h !== ne)
                for (const M in h)
                    !Cn(M) && !(M in _) && r(f, M, h[M], null, P, d.children, b, R, x);
            for (const M in _) {
                if (Cn(M))
                    continue;
                const T = _[M]
                  , w = h[M];
                T !== w && M !== "value" && r(f, M, w, T, P, d.children, b, R, x)
            }
            "value"in _ && r(f, "value", h.value, _.value)
        }
    }
      , Ie = (f,d,h,_,b,R,P,M,T)=>{
        const w = d.el = f ? f.el : a("")
          , O = d.anchor = f ? f.anchor : a("");
        let {patchFlag: S, dynamicChildren: L, slotScopeIds: F} = d;
        F && (M = M ? M.concat(F) : F),
        f == null ? (i(w, h, _),
        i(O, h, _),
        Ue(d.children, h, O, b, R, P, M, T)) : S > 0 && S & 64 && L && f.dynamicChildren ? (Ne(f.dynamicChildren, L, h, b, R, P, M),
        (d.key != null || b && d === b.subTree) && Hr(f, d, !0)) : X(f, d, h, O, b, R, P, M, T)
    }
      , At = (f,d,h,_,b,R,P,M,T)=>{
        d.slotScopeIds = M,
        f == null ? d.shapeFlag & 512 ? b.ctx.activate(d, h, _, P, T) : ut(d, h, _, b, R, P, T) : qt(f, d, T)
    }
      , ut = (f,d,h,_,b,R,P)=>{
        const M = f.component = gl(f, _, b);
        if (Ar(f) && (M.ctx.renderer = $),
        _l(M),
        M.asyncDep) {
            if (b && b.registerDep(M, re),
            !f.el) {
                const T = M.subTree = _e(Ct);
                D(null, T, d, h)
            }
            return
        }
        re(M, f, d, h, b, R, P)
    }
      , qt = (f,d,h)=>{
        const _ = d.component = f.component;
        if (Ca(f, d, h))
            if (_.asyncDep && !_.asyncResolved) {
                Q(_, d, h);
                return
            } else
                _.next = d,
                ya(_.update),
                _.update();
        else
            d.el = f.el,
            _.vnode = d
    }
      , re = (f,d,h,_,b,R,P)=>{
        const M = ()=>{
            if (f.isMounted) {
                let {next: O, bu: S, u: L, parent: F, vnode: W} = f, ee = O, Z;
                ht(f, !1),
                O ? (O.el = W.el,
                Q(f, O, P)) : O = W,
                S && Pn(S),
                (Z = O.props && O.props.onVnodeBeforeUpdate) && Ee(Z, F, O, W),
                ht(f, !0);
                const oe = Zn(f)
                  , Ae = f.subTree;
                f.subTree = oe,
                k(Ae, oe, p(Ae.el), C(Ae), f, b, R),
                O.el = oe.el,
                ee === null && Pa(f, oe.el),
                L && we(L, b),
                (Z = O.props && O.props.onVnodeUpdated) && we(()=>Ee(Z, F, O, W), b)
            } else {
                let O;
                const {el: S, props: L} = d
                  , {bm: F, m: W, parent: ee} = f
                  , Z = Sn(d);
                if (ht(f, !1),
                F && Pn(F),
                !Z && (O = L && L.onVnodeBeforeMount) && Ee(O, ee, d),
                ht(f, !0),
                S && j) {
                    const oe = ()=>{
                        f.subTree = Zn(f),
                        j(S, f.subTree, f, b, null)
                    }
                    ;
                    Z ? d.type.__asyncLoader().then(()=>!f.isUnmounted && oe()) : oe()
                } else {
                    const oe = f.subTree = Zn(f);
                    k(null, oe, h, _, f, b, R),
                    d.el = oe.el
                }
                if (W && we(W, b),
                !Z && (O = L && L.onVnodeMounted)) {
                    const oe = d;
                    we(()=>Ee(O, ee, oe), b)
                }
                (d.shapeFlag & 256 || ee && Sn(ee.vnode) && ee.vnode.shapeFlag & 256) && f.a && we(f.a, b),
                f.isMounted = !0,
                d = h = _ = null
            }
        }
          , T = f.effect = new Bi(M,()=>Hi(w),f.scope)
          , w = f.update = ()=>T.run();
        w.id = f.uid,
        ht(f, !0),
        w()
    }
      , Q = (f,d,h)=>{
        d.component = f;
        const _ = f.vnode.props;
        f.vnode = d,
        f.next = null,
        Xa(f, d.props, _, h),
        el(f, d.children, h),
        $t(),
        ds(),
        Kt()
    }
      , X = (f,d,h,_,b,R,P,M,T=!1)=>{
        const w = f && f.children
          , O = f ? f.shapeFlag : 0
          , S = d.children
          , {patchFlag: L, shapeFlag: F} = d;
        if (L > 0) {
            if (L & 128) {
                pt(w, S, h, _, b, R, P, M, T);
                return
            } else if (L & 256) {
                Pe(w, S, h, _, b, R, P, M, T);
                return
            }
        }
        F & 8 ? (O & 16 && x(w, b, R),
        S !== w && c(h, S)) : O & 16 ? F & 16 ? pt(w, S, h, _, b, R, P, M, T) : x(w, b, R, !0) : (O & 8 && c(h, ""),
        F & 16 && Ue(S, h, _, b, R, P, M, T))
    }
      , Pe = (f,d,h,_,b,R,P,M,T)=>{
        f = f || Nt,
        d = d || Nt;
        const w = f.length
          , O = d.length
          , S = Math.min(w, O);
        let L;
        for (L = 0; L < S; L++) {
            const F = d[L] = T ? rt(d[L]) : je(d[L]);
            k(f[L], F, h, null, b, R, P, M, T)
        }
        w > O ? x(f, b, R, !0, !1, S) : Ue(d, h, _, b, R, P, M, T, S)
    }
      , pt = (f,d,h,_,b,R,P,M,T)=>{
        let w = 0;
        const O = d.length;
        let S = f.length - 1
          , L = O - 1;
        for (; w <= S && w <= L; ) {
            const F = f[w]
              , W = d[w] = T ? rt(d[w]) : je(d[w]);
            if (Yt(F, W))
                k(F, W, h, null, b, R, P, M, T);
            else
                break;
            w++
        }
        for (; w <= S && w <= L; ) {
            const F = f[S]
              , W = d[L] = T ? rt(d[L]) : je(d[L]);
            if (Yt(F, W))
                k(F, W, h, null, b, R, P, M, T);
            else
                break;
            S--,
            L--
        }
        if (w > S) {
            if (w <= L) {
                const F = L + 1
                  , W = F < O ? d[F].el : _;
                for (; w <= L; )
                    k(null, d[w] = T ? rt(d[w]) : je(d[w]), h, W, b, R, P, M, T),
                    w++
            }
        } else if (w > L)
            for (; w <= S; )
                be(f[w], b, R, !0),
                w++;
        else {
            const F = w
              , W = w
              , ee = new Map;
            for (w = W; w <= L; w++) {
                const Me = d[w] = T ? rt(d[w]) : je(d[w]);
                Me.key != null && ee.set(Me.key, w)
            }
            let Z, oe = 0;
            const Ae = L - W + 1;
            let Dt = !1
              , Ki = 0;
            const Jt = new Array(Ae);
            for (w = 0; w < Ae; w++)
                Jt[w] = 0;
            for (w = F; w <= S; w++) {
                const Me = f[w];
                if (oe >= Ae) {
                    be(Me, b, R, !0);
                    continue
                }
                let Fe;
                if (Me.key != null)
                    Fe = ee.get(Me.key);
                else
                    for (Z = W; Z <= L; Z++)
                        if (Jt[Z - W] === 0 && Yt(Me, d[Z])) {
                            Fe = Z;
                            break
                        }
                Fe === void 0 ? be(Me, b, R, !0) : (Jt[Fe - W] = w + 1,
                Fe >= Ki ? Ki = Fe : Dt = !0,
                k(Me, d[Fe], h, null, b, R, P, M, T),
                oe++)
            }
            const qi = Dt ? rl(Jt) : Nt;
            for (Z = qi.length - 1,
            w = Ae - 1; w >= 0; w--) {
                const Me = W + w
                  , Fe = d[Me]
                  , Ji = Me + 1 < O ? d[Me + 1].el : _;
                Jt[w] === 0 ? k(null, Fe, h, Ji, b, R, P, M, T) : Dt && (Z < 0 || w !== qi[Z] ? xe(Fe, h, Ji, 2) : Z--)
            }
        }
    }
      , xe = (f,d,h,_,b=null)=>{
        const {el: R, type: P, transition: M, children: T, shapeFlag: w} = f;
        if (w & 6) {
            xe(f.component.subTree, d, h, _);
            return
        }
        if (w & 128) {
            f.suspense.move(d, h, _);
            return
        }
        if (w & 64) {
            P.move(f, d, h, $);
            return
        }
        if (P === qe) {
            i(R, d, h);
            for (let S = 0; S < T.length; S++)
                xe(T[S], d, h, _);
            i(f.anchor, d, h);
            return
        }
        if (P === Dn) {
            N(f, d, h);
            return
        }
        if (_ !== 2 && w & 1 && M)
            if (_ === 0)
                M.beforeEnter(R),
                i(R, d, h),
                we(()=>M.enter(R), b);
            else {
                const {leave: S, delayLeave: L, afterLeave: F} = M
                  , W = ()=>i(R, d, h)
                  , ee = ()=>{
                    S(R, ()=>{
                        W(),
                        F && F()
                    }
                    )
                }
                ;
                L ? L(R, W, ee) : ee()
            }
        else
            i(R, d, h)
    }
      , be = (f,d,h,_=!1,b=!1)=>{
        const {type: R, props: P, ref: M, children: T, dynamicChildren: w, shapeFlag: O, patchFlag: S, dirs: L} = f;
        if (M != null && _i(M, null, h, f, !0),
        O & 256) {
            d.ctx.deactivate(f);
            return
        }
        const F = O & 1 && L
          , W = !Sn(f);
        let ee;
        if (W && (ee = P && P.onVnodeBeforeUnmount) && Ee(ee, d, f),
        O & 6)
            y(f.component, h, _);
        else {
            if (O & 128) {
                f.suspense.unmount(h, _);
                return
            }
            F && mt(f, null, d, "beforeUnmount"),
            O & 64 ? f.type.remove(f, d, h, b, $, _) : w && (R !== qe || S > 0 && S & 64) ? x(w, d, h, !1, !0) : (R === qe && S & 384 || !b && O & 16) && x(T, d, h),
            _ && St(f)
        }
        (W && (ee = P && P.onVnodeUnmounted) || F) && we(()=>{
            ee && Ee(ee, d, f),
            F && mt(f, null, d, "unmounted")
        }
        , h)
    }
      , St = f=>{
        const {type: d, el: h, anchor: _, transition: b} = f;
        if (d === qe) {
            yn(h, _);
            return
        }
        if (d === Dn) {
            J(f);
            return
        }
        const R = ()=>{
            s(h),
            b && !b.persisted && b.afterLeave && b.afterLeave()
        }
        ;
        if (f.shapeFlag & 1 && b && !b.persisted) {
            const {leave: P, delayLeave: M} = b
              , T = ()=>P(h, R);
            M ? M(f.el, R, T) : T()
        } else
            R()
    }
      , yn = (f,d)=>{
        let h;
        for (; f !== d; )
            h = m(f),
            s(f),
            f = h;
        s(d)
    }
      , y = (f,d,h)=>{
        const {bum: _, scope: b, update: R, subTree: P, um: M} = f;
        _ && Pn(_),
        b.stop(),
        R && (R.active = !1,
        be(P, f, d, h)),
        M && we(M, d),
        we(()=>{
            f.isUnmounted = !0
        }
        , d),
        d && d.pendingBranch && !d.isUnmounted && f.asyncDep && !f.asyncResolved && f.suspenseId === d.pendingId && (d.deps--,
        d.deps === 0 && d.resolve())
    }
      , x = (f,d,h,_=!1,b=!1,R=0)=>{
        for (let P = R; P < f.length; P++)
            be(f[P], d, h, _, b)
    }
      , C = f=>f.shapeFlag & 6 ? C(f.component.subTree) : f.shapeFlag & 128 ? f.suspense.next() : m(f.anchor || f.el)
      , B = (f,d,h)=>{
        f == null ? d._vnode && be(d._vnode, null, null, !0) : k(d._vnode || null, f, d, null, null, null, h),
        ds(),
        Rr(),
        d._vnode = f
    }
      , $ = {
        p: k,
        um: be,
        m: xe,
        r: St,
        mt: ut,
        mc: Ue,
        pc: X,
        pbc: Ne,
        n: C,
        o: e
    };
    let se, j;
    return t && ([se,j] = t($)),
    {
        render: B,
        hydrate: se,
        createApp: nl(B, se)
    }
}
function ht({effect: e, update: t}, n) {
    e.allowRecurse = t.allowRecurse = n
}
function Hr(e, t, n=!1) {
    const i = e.children
      , s = t.children;
    if (I(i) && I(s))
        for (let r = 0; r < i.length; r++) {
            const o = i[r];
            let a = s[r];
            a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = s[r] = rt(s[r]),
            a.el = o.el),
            n || Hr(o, a)),
            a.type === Kn && (a.el = o.el)
        }
}
function rl(e) {
    const t = e.slice()
      , n = [0];
    let i, s, r, o, a;
    const l = e.length;
    for (i = 0; i < l; i++) {
        const u = e[i];
        if (u !== 0) {
            if (s = n[n.length - 1],
            e[s] < u) {
                t[i] = s,
                n.push(i);
                continue
            }
            for (r = 0,
            o = n.length - 1; r < o; )
                a = r + o >> 1,
                e[n[a]] < u ? r = a + 1 : o = a;
            u < e[n[r]] && (r > 0 && (t[i] = n[r - 1]),
            n[r] = i)
        }
    }
    for (r = n.length,
    o = n[r - 1]; r-- > 0; )
        n[r] = o,
        o = t[o];
    return n
}
const ol = e=>e.__isTeleport
  , qe = Symbol(void 0)
  , Kn = Symbol(void 0)
  , Ct = Symbol(void 0)
  , Dn = Symbol(void 0)
  , en = [];
let De = null;
function zi(e=!1) {
    en.push(De = e ? null : [])
}
function al() {
    en.pop(),
    De = en[en.length - 1] || null
}
let dn = 1;
function ws(e) {
    dn += e
}
function Vr(e) {
    return e.dynamicChildren = dn > 0 ? De || Nt : null,
    al(),
    dn > 0 && De && De.push(e),
    e
}
function jr(e, t, n, i, s, r) {
    return Vr(Wr(e, t, n, i, s, r, !0))
}
function ll(e, t, n, i, s) {
    return Vr(_e(e, t, n, i, s, !0))
}
function yi(e) {
    return e ? e.__v_isVNode === !0 : !1
}
function Yt(e, t) {
    return e.type === t.type && e.key === t.key
}
const qn = "__vInternal"
  , zr = ({key: e})=>e ?? null
  , kn = ({ref: e, ref_key: t, ref_for: n})=>e != null ? de(e) || he(e) || H(e) ? {
    i: Ce,
    r: e,
    k: t,
    f: !!n
} : e : null;
function Wr(e, t=null, n=null, i=0, s=null, r=e === qe ? 0 : 1, o=!1, a=!1) {
    const l = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && zr(t),
        ref: t && kn(t),
        scopeId: Un,
        slotScopeIds: null,
        children: n,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: r,
        patchFlag: i,
        dynamicProps: s,
        dynamicChildren: null,
        appContext: null,
        ctx: Ce
    };
    return a ? (Wi(l, n),
    r & 128 && e.normalize(l)) : n && (l.shapeFlag |= de(n) ? 8 : 16),
    dn > 0 && !o && De && (l.patchFlag > 0 || r & 6) && l.patchFlag !== 32 && De.push(l),
    l
}
const _e = fl;
function fl(e, t=null, n=null, i=0, s=null, r=!1) {
    if ((!e || e === za) && (e = Ct),
    yi(e)) {
        const a = Vt(e, t, !0);
        return n && Wi(a, n),
        dn > 0 && !r && De && (a.shapeFlag & 6 ? De[De.indexOf(e)] = a : De.push(a)),
        a.patchFlag |= -2,
        a
    }
    if (Ml(e) && (e = e.__vccOpts),
    t) {
        t = cl(t);
        let {class: a, style: l} = t;
        a && !de(a) && (t.class = Fn(a)),
        te(l) && (pr(l) && !I(l) && (l = ye({}, l)),
        t.style = Pi(l))
    }
    const o = de(e) ? 1 : xa(e) ? 128 : ol(e) ? 64 : te(e) ? 4 : H(e) ? 2 : 0;
    return Wr(e, t, n, i, s, o, r, !0)
}
function cl(e) {
    return e ? pr(e) || qn in e ? ye({}, e) : e : null
}
function Vt(e, t, n=!1) {
    const {props: i, ref: s, patchFlag: r, children: o} = e
      , a = t ? pl(i || {}, t) : i;
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: a,
        key: a && zr(a),
        ref: t && t.ref ? n && s ? I(s) ? s.concat(kn(t)) : [s, kn(t)] : kn(t) : s,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: o,
        target: e.target,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== qe ? r === -1 ? 16 : r | 16 : r,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: e.transition,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && Vt(e.ssContent),
        ssFallback: e.ssFallback && Vt(e.ssFallback),
        el: e.el,
        anchor: e.anchor,
        ctx: e.ctx
    }
}
function dl(e=" ", t=0) {
    return _e(Kn, null, e, t)
}
function ul(e, t) {
    const n = _e(Dn, null, e);
    return n.staticCount = t,
    n
}
function Lc(e="", t=!1) {
    return t ? (zi(),
    ll(Ct, null, e)) : _e(Ct, null, e)
}
function je(e) {
    return e == null || typeof e == "boolean" ? _e(Ct) : I(e) ? _e(qe, null, e.slice()) : typeof e == "object" ? rt(e) : _e(Kn, null, String(e))
}
function rt(e) {
    return e.el === null && e.patchFlag !== -1 || e.memo ? e : Vt(e)
}
function Wi(e, t) {
    let n = 0;
    const {shapeFlag: i} = e;
    if (t == null)
        t = null;
    else if (I(t))
        n = 16;
    else if (typeof t == "object")
        if (i & 65) {
            const s = t.default;
            s && (s._c && (s._d = !1),
            Wi(e, s()),
            s._c && (s._d = !0));
            return
        } else {
            n = 32;
            const s = t._;
            !s && !(qn in t) ? t._ctx = Ce : s === 3 && Ce && (Ce.slots._ === 1 ? t._ = 1 : (t._ = 2,
            e.patchFlag |= 1024))
        }
    else
        H(t) ? (t = {
            default: t,
            _ctx: Ce
        },
        n = 32) : (t = String(t),
        i & 64 ? (n = 16,
        t = [dl(t)]) : n = 8);
    e.children = t,
    e.shapeFlag |= n
}
function pl(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
        const i = e[n];
        for (const s in i)
            if (s === "class")
                t.class !== i.class && (t.class = Fn([t.class, i.class]));
            else if (s === "style")
                t.style = Pi([t.style, i.style]);
            else if (En(s)) {
                const r = t[s]
                  , o = i[s];
                o && r !== o && !(I(r) && r.includes(o)) && (t[s] = r ? [].concat(r, o) : o)
            } else
                s !== "" && (t[s] = i[s])
    }
    return t
}
function Ee(e, t, n, i=null) {
    Be(e, t, 7, [n, i])
}
const ml = Er();
let hl = 0;
function gl(e, t, n) {
    const i = e.type
      , s = (t ? t.appContext : e.appContext) || ml
      , r = {
        uid: hl++,
        vnode: e,
        type: i,
        parent: t,
        appContext: s,
        root: null,
        next: null,
        subTree: null,
        effect: null,
        update: null,
        scope: new Io(!0),
        render: null,
        proxy: null,
        exposed: null,
        exposeProxy: null,
        withProxy: null,
        provides: t ? t.provides : Object.create(s.provides),
        accessCache: null,
        renderCache: [],
        components: null,
        directives: null,
        propsOptions: Lr(i, s),
        emitsOptions: Cr(i, s),
        emit: null,
        emitted: null,
        propsDefaults: ne,
        inheritAttrs: i.inheritAttrs,
        ctx: ne,
        data: ne,
        props: ne,
        attrs: ne,
        slots: ne,
        refs: ne,
        setupState: ne,
        setupContext: null,
        suspense: n,
        suspenseId: n ? n.pendingId : 0,
        asyncDep: null,
        asyncResolved: !1,
        isMounted: !1,
        isUnmounted: !1,
        isDeactivated: !1,
        bc: null,
        c: null,
        bm: null,
        m: null,
        bu: null,
        u: null,
        um: null,
        bum: null,
        da: null,
        a: null,
        rtg: null,
        rtc: null,
        ec: null,
        sp: null
    };
    return r.ctx = {
        _: r
    },
    r.root = t ? t.root : r,
    r.emit = va.bind(null, r),
    e.ce && e.ce(r),
    r
}
let ue = null;
const jt = e=>{
    ue = e,
    e.scope.on()
}
  , Tt = ()=>{
    ue && ue.scope.off(),
    ue = null
}
;
function Ur(e) {
    return e.vnode.shapeFlag & 4
}
let un = !1;
function _l(e, t=!1) {
    un = t;
    const {props: n, children: i} = e.vnode
      , s = Ur(e);
    Ya(e, n, s, t),
    Qa(e, i);
    const r = s ? yl(e, t) : void 0;
    return un = !1,
    r
}
function yl(e, t) {
    const n = e.type;
    e.accessCache = Object.create(null),
    e.proxy = mr(new Proxy(e.ctx,Ua));
    const {setup: i} = n;
    if (i) {
        const s = e.setupContext = i.length > 1 ? wl(e) : null;
        jt(e),
        $t();
        const r = ft(i, e, 0, [e.props, s]);
        if (Kt(),
        Tt(),
        Qs(r)) {
            if (r.then(Tt, Tt),
            t)
                return r.then(o=>{
                    vs(e, o, t)
                }
                ).catch(o=>{
                    zn(o, e, 0)
                }
                );
            e.asyncDep = r
        } else
            vs(e, r, t)
    } else
        Gr(e, t)
}
function vs(e, t, n) {
    H(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : te(t) && (e.setupState = yr(t)),
    Gr(e, n)
}
let Ms;
function Gr(e, t, n) {
    const i = e.type;
    if (!e.render) {
        if (!t && Ms && !i.render) {
            const s = i.template || Vi(e).template;
            if (s) {
                const {isCustomElement: r, compilerOptions: o} = e.appContext.config
                  , {delimiters: a, compilerOptions: l} = i
                  , u = ye(ye({
                    isCustomElement: r,
                    delimiters: a
                }, o), l);
                i.render = Ms(s, u)
            }
        }
        e.render = i.render || ke
    }
    jt(e),
    $t(),
    Ga(e),
    Kt(),
    Tt()
}
function bl(e) {
    return new Proxy(e.attrs,{
        get(t, n) {
            return Re(e, "get", "$attrs"),
            t[n]
        }
    })
}
function wl(e) {
    const t = i=>{
        e.exposed = i || {}
    }
    ;
    let n;
    return {
        get attrs() {
            return n || (n = bl(e))
        },
        slots: e.slots,
        emit: e.emit,
        expose: t
    }
}
function Jn(e) {
    if (e.exposed)
        return e.exposeProxy || (e.exposeProxy = new Proxy(yr(mr(e.exposed)),{
            get(t, n) {
                if (n in t)
                    return t[n];
                if (n in Qt)
                    return Qt[n](e)
            },
            has(t, n) {
                return n in t || n in Qt
            }
        }))
}
function vl(e, t=!0) {
    return H(e) ? e.displayName || e.name : e.name || t && e.__name
}
function Ml(e) {
    return H(e) && "__vccOpts"in e
}
const Te = (e,t)=>ha(e, t, un);
function $r(e, t, n) {
    const i = arguments.length;
    return i === 2 ? te(t) && !I(t) ? yi(t) ? _e(e, null, [t]) : _e(e, t) : _e(e, null, t) : (i > 3 ? n = Array.prototype.slice.call(arguments, 2) : i === 3 && yi(n) && (n = [n]),
    _e(e, t, n))
}
const Rl = Symbol("")
  , Tl = ()=>Qe(Rl)
  , Cl = "3.2.45"
  , Pl = "http://www.w3.org/2000/svg"
  , yt = typeof document < "u" ? document : null
  , Rs = yt && yt.createElement("template")
  , xl = {
    insert: (e,t,n)=>{
        t.insertBefore(e, n || null)
    }
    ,
    remove: e=>{
        const t = e.parentNode;
        t && t.removeChild(e)
    }
    ,
    createElement: (e,t,n,i)=>{
        const s = t ? yt.createElementNS(Pl, e) : yt.createElement(e, n ? {
            is: n
        } : void 0);
        return e === "select" && i && i.multiple != null && s.setAttribute("multiple", i.multiple),
        s
    }
    ,
    createText: e=>yt.createTextNode(e),
    createComment: e=>yt.createComment(e),
    setText: (e,t)=>{
        e.nodeValue = t
    }
    ,
    setElementText: (e,t)=>{
        e.textContent = t
    }
    ,
    parentNode: e=>e.parentNode,
    nextSibling: e=>e.nextSibling,
    querySelector: e=>yt.querySelector(e),
    setScopeId(e, t) {
        e.setAttribute(t, "")
    },
    insertStaticContent(e, t, n, i, s, r) {
        const o = n ? n.previousSibling : t.lastChild;
        if (s && (s === r || s.nextSibling))
            for (; t.insertBefore(s.cloneNode(!0), n),
            !(s === r || !(s = s.nextSibling)); )
                ;
        else {
            Rs.innerHTML = i ? `<svg>${e}</svg>` : e;
            const a = Rs.content;
            if (i) {
                const l = a.firstChild;
                for (; l.firstChild; )
                    a.appendChild(l.firstChild);
                a.removeChild(l)
            }
            t.insertBefore(a, n)
        }
        return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
    }
};
function Al(e, t, n) {
    const i = e._vtc;
    i && (t = (t ? [t, ...i] : [...i]).join(" ")),
    t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t
}
function Sl(e, t, n) {
    const i = e.style
      , s = de(n);
    if (n && !s) {
        for (const r in n)
            bi(i, r, n[r]);
        if (t && !de(t))
            for (const r in t)
                n[r] == null && bi(i, r, "")
    } else {
        const r = i.display;
        s ? t !== n && (i.cssText = n) : t && e.removeAttribute("style"),
        "_vod"in e && (i.display = r)
    }
}
const Ts = /\s*!important$/;
function bi(e, t, n) {
    if (I(n))
        n.forEach(i=>bi(e, t, i));
    else if (n == null && (n = ""),
    t.startsWith("--"))
        e.setProperty(t, n);
    else {
        const i = Dl(e, t);
        Ts.test(n) ? e.setProperty(Pt(i), n.replace(Ts, ""), "important") : e[i] = n
    }
}
const Cs = ["Webkit", "Moz", "ms"]
  , ei = {};
function Dl(e, t) {
    const n = ei[t];
    if (n)
        return n;
    let i = We(t);
    if (i !== "filter" && i in e)
        return ei[t] = i;
    i = Vn(i);
    for (let s = 0; s < Cs.length; s++) {
        const r = Cs[s] + i;
        if (r in e)
            return ei[t] = r
    }
    return t
}
const Ps = "http://www.w3.org/1999/xlink";
function kl(e, t, n, i, s) {
    if (i && t.startsWith("xlink:"))
        n == null ? e.removeAttributeNS(Ps, t.slice(6, t.length)) : e.setAttributeNS(Ps, t, n);
    else {
        const r = xo(t);
        n == null || r && !Xs(n) ? e.removeAttribute(t) : e.setAttribute(t, r ? "" : n)
    }
}
function Bl(e, t, n, i, s, r, o) {
    if (t === "innerHTML" || t === "textContent") {
        i && o(i, s, r),
        e[t] = n ?? "";
        return
    }
    if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
        e._value = n;
        const l = n ?? "";
        (e.value !== l || e.tagName === "OPTION") && (e.value = l),
        n == null && e.removeAttribute(t);
        return
    }
    let a = !1;
    if (n === "" || n == null) {
        const l = typeof e[t];
        l === "boolean" ? n = Xs(n) : n == null && l === "string" ? (n = "",
        a = !0) : l === "number" && (n = 0,
        a = !0)
    }
    try {
        e[t] = n
    } catch {}
    a && e.removeAttribute(t)
}
function at(e, t, n, i) {
    e.addEventListener(t, n, i)
}
function Ol(e, t, n, i) {
    e.removeEventListener(t, n, i)
}
function Ll(e, t, n, i, s=null) {
    const r = e._vei || (e._vei = {})
      , o = r[t];
    if (i && o)
        o.value = i;
    else {
        const [a,l] = Nl(t);
        if (i) {
            const u = r[t] = El(i, s);
            at(e, a, u, l)
        } else
            o && (Ol(e, a, o, l),
            r[t] = void 0)
    }
}
const xs = /(?:Once|Passive|Capture)$/;
function Nl(e) {
    let t;
    if (xs.test(e)) {
        t = {};
        let i;
        for (; i = e.match(xs); )
            e = e.slice(0, e.length - i[0].length),
            t[i[0].toLowerCase()] = !0
    }
    return [e[2] === ":" ? e.slice(3) : Pt(e.slice(2)), t]
}
let ti = 0;
const Il = Promise.resolve()
  , Fl = ()=>ti || (Il.then(()=>ti = 0),
ti = Date.now());
function El(e, t) {
    const n = i=>{
        if (!i._vts)
            i._vts = Date.now();
        else if (i._vts <= n.attached)
            return;
        Be(Hl(i, n.value), t, 5, [i])
    }
    ;
    return n.value = e,
    n.attached = Fl(),
    n
}
function Hl(e, t) {
    if (I(t)) {
        const n = e.stopImmediatePropagation;
        return e.stopImmediatePropagation = ()=>{
            n.call(e),
            e._stopped = !0
        }
        ,
        t.map(i=>s=>!s._stopped && i && i(s))
    } else
        return t
}
const As = /^on[a-z]/
  , Vl = (e,t,n,i,s=!1,r,o,a,l)=>{
    t === "class" ? Al(e, i, s) : t === "style" ? Sl(e, n, i) : En(t) ? Ai(t) || Ll(e, t, n, i, o) : (t[0] === "." ? (t = t.slice(1),
    !0) : t[0] === "^" ? (t = t.slice(1),
    !1) : jl(e, t, i, s)) ? Bl(e, t, i, r, o, a, l) : (t === "true-value" ? e._trueValue = i : t === "false-value" && (e._falseValue = i),
    kl(e, t, i, s))
}
;
function jl(e, t, n, i) {
    return i ? !!(t === "innerHTML" || t === "textContent" || t in e && As.test(t) && H(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || As.test(t) && de(n) ? !1 : t in e
}
const zt = e=>{
    const t = e.props["onUpdate:modelValue"] || !1;
    return I(t) ? n=>Pn(t, n) : t
}
;
function zl(e) {
    e.target.composing = !0
}
function Ss(e) {
    const t = e.target;
    t.composing && (t.composing = !1,
    t.dispatchEvent(new Event("input")))
}
const Nc = {
    created(e, {modifiers: {lazy: t, trim: n, number: i}}, s) {
        e._assign = zt(s);
        const r = i || s.props && s.props.type === "number";
        at(e, t ? "change" : "input", o=>{
            if (o.target.composing)
                return;
            let a = e.value;
            n && (a = a.trim()),
            r && (a = an(a)),
            e._assign(a)
        }
        ),
        n && at(e, "change", ()=>{
            e.value = e.value.trim()
        }
        ),
        t || (at(e, "compositionstart", zl),
        at(e, "compositionend", Ss),
        at(e, "change", Ss))
    },
    mounted(e, {value: t}) {
        e.value = t ?? ""
    },
    beforeUpdate(e, {value: t, modifiers: {lazy: n, trim: i, number: s}}, r) {
        if (e._assign = zt(r),
        e.composing || document.activeElement === e && e.type !== "range" && (n || i && e.value.trim() === t || (s || e.type === "number") && an(e.value) === t))
            return;
        const o = t ?? "";
        e.value !== o && (e.value = o)
    }
}
  , Ic = {
    deep: !0,
    created(e, t, n) {
        e._assign = zt(n),
        at(e, "change", ()=>{
            const i = e._modelValue
              , s = pn(e)
              , r = e.checked
              , o = e._assign;
            if (I(i)) {
                const a = xi(i, s)
                  , l = a !== -1;
                if (r && !l)
                    o(i.concat(s));
                else if (!r && l) {
                    const u = [...i];
                    u.splice(a, 1),
                    o(u)
                }
            } else if (Gt(i)) {
                const a = new Set(i);
                r ? a.add(s) : a.delete(s),
                o(a)
            } else
                o(Kr(e, r))
        }
        )
    },
    mounted: Ds,
    beforeUpdate(e, t, n) {
        e._assign = zt(n),
        Ds(e, t, n)
    }
};
function Ds(e, {value: t, oldValue: n}, i) {
    e._modelValue = t,
    I(t) ? e.checked = xi(t, i.props.value) > -1 : Gt(t) ? e.checked = t.has(i.props.value) : t !== n && (e.checked = hn(t, Kr(e, !0)))
}
const Fc = {
    deep: !0,
    created(e, {value: t, modifiers: {number: n}}, i) {
        const s = Gt(t);
        at(e, "change", ()=>{
            const r = Array.prototype.filter.call(e.options, o=>o.selected).map(o=>n ? an(pn(o)) : pn(o));
            e._assign(e.multiple ? s ? new Set(r) : r : r[0])
        }
        ),
        e._assign = zt(i)
    },
    mounted(e, {value: t}) {
        ks(e, t)
    },
    beforeUpdate(e, t, n) {
        e._assign = zt(n)
    },
    updated(e, {value: t}) {
        ks(e, t)
    }
};
function ks(e, t) {
    const n = e.multiple;
    if (!(n && !I(t) && !Gt(t))) {
        for (let i = 0, s = e.options.length; i < s; i++) {
            const r = e.options[i]
              , o = pn(r);
            if (n)
                I(t) ? r.selected = xi(t, o) > -1 : r.selected = t.has(o);
            else if (hn(pn(r), t)) {
                e.selectedIndex !== i && (e.selectedIndex = i);
                return
            }
        }
        !n && e.selectedIndex !== -1 && (e.selectedIndex = -1)
    }
}
function pn(e) {
    return "_value"in e ? e._value : e.value
}
function Kr(e, t) {
    const n = t ? "_trueValue" : "_falseValue";
    return n in e ? e[n] : t
}
const Wl = {
    esc: "escape",
    space: " ",
    up: "arrow-up",
    left: "arrow-left",
    right: "arrow-right",
    down: "arrow-down",
    delete: "backspace"
}
  , Ec = (e,t)=>n=>{
    if (!("key"in n))
        return;
    const i = Pt(n.key);
    if (t.some(s=>s === i || Wl[s] === i))
        return e(n)
}
  , Ul = ye({
    patchProp: Vl
}, xl);
let Bs;
function Gl() {
    return Bs || (Bs = il(Ul))
}
const $l = (...e)=>{
    const t = Gl().createApp(...e)
      , {mount: n} = t;
    return t.mount = i=>{
        const s = Kl(i);
        if (!s)
            return;
        const r = t._component;
        !H(r) && !r.render && !r.template && (r.template = s.innerHTML),
        s.innerHTML = "";
        const o = n(s, !1, s instanceof SVGElement);
        return s instanceof Element && (s.removeAttribute("v-cloak"),
        s.setAttribute("data-v-app", "")),
        o
    }
    ,
    t
}
;
function Kl(e) {
    return de(e) ? document.querySelector(e) : e
}
/*!
  * vue-router v4.1.6
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */
const Ot = typeof window < "u";
function ql(e) {
    return e.__esModule || e[Symbol.toStringTag] === "Module"
}
const Y = Object.assign;
function ni(e, t) {
    const n = {};
    for (const i in t) {
        const s = t[i];
        n[i] = Oe(s) ? s.map(e) : e(s)
    }
    return n
}
const tn = ()=>{}
  , Oe = Array.isArray
  , Jl = /\/$/
  , Yl = e=>e.replace(Jl, "");
function ii(e, t, n="/") {
    let i, s = {}, r = "", o = "";
    const a = t.indexOf("#");
    let l = t.indexOf("?");
    return a < l && a >= 0 && (l = -1),
    l > -1 && (i = t.slice(0, l),
    r = t.slice(l + 1, a > -1 ? a : t.length),
    s = e(r)),
    a > -1 && (i = i || t.slice(0, a),
    o = t.slice(a, t.length)),
    i = ef(i ?? t, n),
    {
        fullPath: i + (r && "?") + r + o,
        path: i,
        query: s,
        hash: o
    }
}
function Xl(e, t) {
    const n = t.query ? e(t.query) : "";
    return t.path + (n && "?") + n + (t.hash || "")
}
function Os(e, t) {
    return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/"
}
function Zl(e, t, n) {
    const i = t.matched.length - 1
      , s = n.matched.length - 1;
    return i > -1 && i === s && Wt(t.matched[i], n.matched[s]) && qr(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash
}
function Wt(e, t) {
    return (e.aliasOf || e) === (t.aliasOf || t)
}
function qr(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length)
        return !1;
    for (const n in e)
        if (!Ql(e[n], t[n]))
            return !1;
    return !0
}
function Ql(e, t) {
    return Oe(e) ? Ls(e, t) : Oe(t) ? Ls(t, e) : e === t
}
function Ls(e, t) {
    return Oe(t) ? e.length === t.length && e.every((n,i)=>n === t[i]) : e.length === 1 && e[0] === t
}
function ef(e, t) {
    if (e.startsWith("/"))
        return e;
    if (!e)
        return t;
    const n = t.split("/")
      , i = e.split("/");
    let s = n.length - 1, r, o;
    for (r = 0; r < i.length; r++)
        if (o = i[r],
        o !== ".")
            if (o === "..")
                s > 1 && s--;
            else
                break;
    return n.slice(0, s).join("/") + "/" + i.slice(r - (r === i.length ? 1 : 0)).join("/")
}
var mn;
(function(e) {
    e.pop = "pop",
    e.push = "push"
}
)(mn || (mn = {}));
var nn;
(function(e) {
    e.back = "back",
    e.forward = "forward",
    e.unknown = ""
}
)(nn || (nn = {}));
function tf(e) {
    if (!e)
        if (Ot) {
            const t = document.querySelector("base");
            e = t && t.getAttribute("href") || "/",
            e = e.replace(/^\w+:\/\/[^\/]+/, "")
        } else
            e = "/";
    return e[0] !== "/" && e[0] !== "#" && (e = "/" + e),
    Yl(e)
}
const nf = /^[^#]+#/;
function sf(e, t) {
    return e.replace(nf, "#") + t
}
function rf(e, t) {
    const n = document.documentElement.getBoundingClientRect()
      , i = e.getBoundingClientRect();
    return {
        behavior: t.behavior,
        left: i.left - n.left - (t.left || 0),
        top: i.top - n.top - (t.top || 0)
    }
}
const Yn = ()=>({
    left: window.pageXOffset,
    top: window.pageYOffset
});
function of(e) {
    let t;
    if ("el"in e) {
        const n = e.el
          , i = typeof n == "string" && n.startsWith("#")
          , s = typeof n == "string" ? i ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
        if (!s)
            return;
        t = rf(s, e)
    } else
        t = e;
    "scrollBehavior"in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.pageXOffset, t.top != null ? t.top : window.pageYOffset)
}
function Ns(e, t) {
    return (history.state ? history.state.position - t : -1) + e
}
const wi = new Map;
function af(e, t) {
    wi.set(e, t)
}
function lf(e) {
    const t = wi.get(e);
    return wi.delete(e),
    t
}
let ff = ()=>location.protocol + "//" + location.host;
function Jr(e, t) {
    const {pathname: n, search: i, hash: s} = t
      , r = e.indexOf("#");
    if (r > -1) {
        let a = s.includes(e.slice(r)) ? e.slice(r).length : 1
          , l = s.slice(a);
        return l[0] !== "/" && (l = "/" + l),
        Os(l, "")
    }
    return Os(n, e) + i + s
}
function cf(e, t, n, i) {
    let s = []
      , r = []
      , o = null;
    const a = ({state: m})=>{
        const v = Jr(e, location)
          , A = n.value
          , k = t.value;
        let V = 0;
        if (m) {
            if (n.value = v,
            t.value = m,
            o && o === A) {
                o = null;
                return
            }
            V = k ? m.position - k.position : 0
        } else
            i(v);
        s.forEach(D=>{
            D(n.value, A, {
                delta: V,
                type: mn.pop,
                direction: V ? V > 0 ? nn.forward : nn.back : nn.unknown
            })
        }
        )
    }
    ;
    function l() {
        o = n.value
    }
    function u(m) {
        s.push(m);
        const v = ()=>{
            const A = s.indexOf(m);
            A > -1 && s.splice(A, 1)
        }
        ;
        return r.push(v),
        v
    }
    function c() {
        const {history: m} = window;
        m.state && m.replaceState(Y({}, m.state, {
            scroll: Yn()
        }), "")
    }
    function p() {
        for (const m of r)
            m();
        r = [],
        window.removeEventListener("popstate", a),
        window.removeEventListener("beforeunload", c)
    }
    return window.addEventListener("popstate", a),
    window.addEventListener("beforeunload", c),
    {
        pauseListeners: l,
        listen: u,
        destroy: p
    }
}
function Is(e, t, n, i=!1, s=!1) {
    return {
        back: e,
        current: t,
        forward: n,
        replaced: i,
        position: window.history.length,
        scroll: s ? Yn() : null
    }
}
function df(e) {
    const {history: t, location: n} = window
      , i = {
        value: Jr(e, n)
    }
      , s = {
        value: t.state
    };
    s.value || r(i.value, {
        back: null,
        current: i.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null
    }, !0);
    function r(l, u, c) {
        const p = e.indexOf("#")
          , m = p > -1 ? (n.host && document.querySelector("base") ? e : e.slice(p)) + l : ff() + e + l;
        try {
            t[c ? "replaceState" : "pushState"](u, "", m),
            s.value = u
        } catch (v) {
            console.error(v),
            n[c ? "replace" : "assign"](m)
        }
    }
    function o(l, u) {
        const c = Y({}, t.state, Is(s.value.back, l, s.value.forward, !0), u, {
            position: s.value.position
        });
        r(l, c, !0),
        i.value = l
    }
    function a(l, u) {
        const c = Y({}, s.value, t.state, {
            forward: l,
            scroll: Yn()
        });
        r(c.current, c, !0);
        const p = Y({}, Is(i.value, l, null), {
            position: c.position + 1
        }, u);
        r(l, p, !1),
        i.value = l
    }
    return {
        location: i,
        state: s,
        push: a,
        replace: o
    }
}
function uf(e) {
    e = tf(e);
    const t = df(e)
      , n = cf(e, t.state, t.location, t.replace);
    function i(r, o=!0) {
        o || n.pauseListeners(),
        history.go(r)
    }
    const s = Y({
        location: "",
        base: e,
        go: i,
        createHref: sf.bind(null, e)
    }, t, n);
    return Object.defineProperty(s, "location", {
        enumerable: !0,
        get: ()=>t.location.value
    }),
    Object.defineProperty(s, "state", {
        enumerable: !0,
        get: ()=>t.state.value
    }),
    s
}
function pf(e) {
    return typeof e == "string" || e && typeof e == "object"
}
function Yr(e) {
    return typeof e == "string" || typeof e == "symbol"
}
const st = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0
}
  , Xr = Symbol("");
var Fs;
(function(e) {
    e[e.aborted = 4] = "aborted",
    e[e.cancelled = 8] = "cancelled",
    e[e.duplicated = 16] = "duplicated"
}
)(Fs || (Fs = {}));
function Ut(e, t) {
    return Y(new Error, {
        type: e,
        [Xr]: !0
    }, t)
}
function Ge(e, t) {
    return e instanceof Error && Xr in e && (t == null || !!(e.type & t))
}
const Es = "[^/]+?"
  , mf = {
    sensitive: !1,
    strict: !1,
    start: !0,
    end: !0
}
  , hf = /[.+*?^${}()[\]/\\]/g;
function gf(e, t) {
    const n = Y({}, mf, t)
      , i = [];
    let s = n.start ? "^" : "";
    const r = [];
    for (const u of e) {
        const c = u.length ? [] : [90];
        n.strict && !u.length && (s += "/");
        for (let p = 0; p < u.length; p++) {
            const m = u[p];
            let v = 40 + (n.sensitive ? .25 : 0);
            if (m.type === 0)
                p || (s += "/"),
                s += m.value.replace(hf, "\\$&"),
                v += 40;
            else if (m.type === 1) {
                const {value: A, repeatable: k, optional: V, regexp: D} = m;
                r.push({
                    name: A,
                    repeatable: k,
                    optional: V
                });
                const E = D || Es;
                if (E !== Es) {
                    v += 10;
                    try {
                        new RegExp(`(${E})`)
                    } catch (J) {
                        throw new Error(`Invalid custom RegExp for param "${A}" (${E}): ` + J.message)
                    }
                }
                let N = k ? `((?:${E})(?:/(?:${E}))*)` : `(${E})`;
                p || (N = V && u.length < 2 ? `(?:/${N})` : "/" + N),
                V && (N += "?"),
                s += N,
                v += 20,
                V && (v += -8),
                k && (v += -20),
                E === ".*" && (v += -50)
            }
            c.push(v)
        }
        i.push(c)
    }
    if (n.strict && n.end) {
        const u = i.length - 1;
        i[u][i[u].length - 1] += .7000000000000001
    }
    n.strict || (s += "/?"),
    n.end ? s += "$" : n.strict && (s += "(?:/|$)");
    const o = new RegExp(s,n.sensitive ? "" : "i");
    function a(u) {
        const c = u.match(o)
          , p = {};
        if (!c)
            return null;
        for (let m = 1; m < c.length; m++) {
            const v = c[m] || ""
              , A = r[m - 1];
            p[A.name] = v && A.repeatable ? v.split("/") : v
        }
        return p
    }
    function l(u) {
        let c = ""
          , p = !1;
        for (const m of e) {
            (!p || !c.endsWith("/")) && (c += "/"),
            p = !1;
            for (const v of m)
                if (v.type === 0)
                    c += v.value;
                else if (v.type === 1) {
                    const {value: A, repeatable: k, optional: V} = v
                      , D = A in u ? u[A] : "";
                    if (Oe(D) && !k)
                        throw new Error(`Provided param "${A}" is an array but it is not repeatable (* or + modifiers)`);
                    const E = Oe(D) ? D.join("/") : D;
                    if (!E)
                        if (V)
                            m.length < 2 && (c.endsWith("/") ? c = c.slice(0, -1) : p = !0);
                        else
                            throw new Error(`Missing required param "${A}"`);
                    c += E
                }
        }
        return c || "/"
    }
    return {
        re: o,
        score: i,
        keys: r,
        parse: a,
        stringify: l
    }
}
function _f(e, t) {
    let n = 0;
    for (; n < e.length && n < t.length; ) {
        const i = t[n] - e[n];
        if (i)
            return i;
        n++
    }
    return e.length < t.length ? e.length === 1 && e[0] === 40 + 40 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 40 + 40 ? 1 : -1 : 0
}
function yf(e, t) {
    let n = 0;
    const i = e.score
      , s = t.score;
    for (; n < i.length && n < s.length; ) {
        const r = _f(i[n], s[n]);
        if (r)
            return r;
        n++
    }
    if (Math.abs(s.length - i.length) === 1) {
        if (Hs(i))
            return 1;
        if (Hs(s))
            return -1
    }
    return s.length - i.length
}
function Hs(e) {
    const t = e[e.length - 1];
    return e.length > 0 && t[t.length - 1] < 0
}
const bf = {
    type: 0,
    value: ""
}
  , wf = /[a-zA-Z0-9_]/;
function vf(e) {
    if (!e)
        return [[]];
    if (e === "/")
        return [[bf]];
    if (!e.startsWith("/"))
        throw new Error(`Invalid path "${e}"`);
    function t(v) {
        throw new Error(`ERR (${n})/"${u}": ${v}`)
    }
    let n = 0
      , i = n;
    const s = [];
    let r;
    function o() {
        r && s.push(r),
        r = []
    }
    let a = 0, l, u = "", c = "";
    function p() {
        u && (n === 0 ? r.push({
            type: 0,
            value: u
        }) : n === 1 || n === 2 || n === 3 ? (r.length > 1 && (l === "*" || l === "+") && t(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`),
        r.push({
            type: 1,
            value: u,
            regexp: c,
            repeatable: l === "*" || l === "+",
            optional: l === "*" || l === "?"
        })) : t("Invalid state to consume buffer"),
        u = "")
    }
    function m() {
        u += l
    }
    for (; a < e.length; ) {
        if (l = e[a++],
        l === "\\" && n !== 2) {
            i = n,
            n = 4;
            continue
        }
        switch (n) {
        case 0:
            l === "/" ? (u && p(),
            o()) : l === ":" ? (p(),
            n = 1) : m();
            break;
        case 4:
            m(),
            n = i;
            break;
        case 1:
            l === "(" ? n = 2 : wf.test(l) ? m() : (p(),
            n = 0,
            l !== "*" && l !== "?" && l !== "+" && a--);
            break;
        case 2:
            l === ")" ? c[c.length - 1] == "\\" ? c = c.slice(0, -1) + l : n = 3 : c += l;
            break;
        case 3:
            p(),
            n = 0,
            l !== "*" && l !== "?" && l !== "+" && a--,
            c = "";
            break;
        default:
            t("Unknown state");
            break
        }
    }
    return n === 2 && t(`Unfinished custom RegExp for param "${u}"`),
    p(),
    o(),
    s
}
function Mf(e, t, n) {
    const i = gf(vf(e.path), n)
      , s = Y(i, {
        record: e,
        parent: t,
        children: [],
        alias: []
    });
    return t && !s.record.aliasOf == !t.record.aliasOf && t.children.push(s),
    s
}
function Rf(e, t) {
    const n = []
      , i = new Map;
    t = zs({
        strict: !1,
        end: !0,
        sensitive: !1
    }, t);
    function s(c) {
        return i.get(c)
    }
    function r(c, p, m) {
        const v = !m
          , A = Tf(c);
        A.aliasOf = m && m.record;
        const k = zs(t, c)
          , V = [A];
        if ("alias"in c) {
            const N = typeof c.alias == "string" ? [c.alias] : c.alias;
            for (const J of N)
                V.push(Y({}, A, {
                    components: m ? m.record.components : A.components,
                    path: J,
                    aliasOf: m ? m.record : A
                }))
        }
        let D, E;
        for (const N of V) {
            const {path: J} = N;
            if (p && J[0] !== "/") {
                const pe = p.record.path
                  , ve = pe[pe.length - 1] === "/" ? "" : "/";
                N.path = p.record.path + (J && ve + J)
            }
            if (D = Mf(N, p, k),
            m ? m.alias.push(D) : (E = E || D,
            E !== D && E.alias.push(D),
            v && c.name && !js(D) && o(c.name)),
            A.children) {
                const pe = A.children;
                for (let ve = 0; ve < pe.length; ve++)
                    r(pe[ve], D, m && m.children[ve])
            }
            m = m || D,
            (D.record.components && Object.keys(D.record.components).length || D.record.name || D.record.redirect) && l(D)
        }
        return E ? ()=>{
            o(E)
        }
        : tn
    }
    function o(c) {
        if (Yr(c)) {
            const p = i.get(c);
            p && (i.delete(c),
            n.splice(n.indexOf(p), 1),
            p.children.forEach(o),
            p.alias.forEach(o))
        } else {
            const p = n.indexOf(c);
            p > -1 && (n.splice(p, 1),
            c.record.name && i.delete(c.record.name),
            c.children.forEach(o),
            c.alias.forEach(o))
        }
    }
    function a() {
        return n
    }
    function l(c) {
        let p = 0;
        for (; p < n.length && yf(c, n[p]) >= 0 && (c.record.path !== n[p].record.path || !Zr(c, n[p])); )
            p++;
        n.splice(p, 0, c),
        c.record.name && !js(c) && i.set(c.record.name, c)
    }
    function u(c, p) {
        let m, v = {}, A, k;
        if ("name"in c && c.name) {
            if (m = i.get(c.name),
            !m)
                throw Ut(1, {
                    location: c
                });
            k = m.record.name,
            v = Y(Vs(p.params, m.keys.filter(E=>!E.optional).map(E=>E.name)), c.params && Vs(c.params, m.keys.map(E=>E.name))),
            A = m.stringify(v)
        } else if ("path"in c)
            A = c.path,
            m = n.find(E=>E.re.test(A)),
            m && (v = m.parse(A),
            k = m.record.name);
        else {
            if (m = p.name ? i.get(p.name) : n.find(E=>E.re.test(p.path)),
            !m)
                throw Ut(1, {
                    location: c,
                    currentLocation: p
                });
            k = m.record.name,
            v = Y({}, p.params, c.params),
            A = m.stringify(v)
        }
        const V = [];
        let D = m;
        for (; D; )
            V.unshift(D.record),
            D = D.parent;
        return {
            name: k,
            path: A,
            params: v,
            matched: V,
            meta: Pf(V)
        }
    }
    return e.forEach(c=>r(c)),
    {
        addRoute: r,
        resolve: u,
        removeRoute: o,
        getRoutes: a,
        getRecordMatcher: s
    }
}
function Vs(e, t) {
    const n = {};
    for (const i of t)
        i in e && (n[i] = e[i]);
    return n
}
function Tf(e) {
    return {
        path: e.path,
        redirect: e.redirect,
        name: e.name,
        meta: e.meta || {},
        aliasOf: void 0,
        beforeEnter: e.beforeEnter,
        props: Cf(e),
        children: e.children || [],
        instances: {},
        leaveGuards: new Set,
        updateGuards: new Set,
        enterCallbacks: {},
        components: "components"in e ? e.components || null : e.component && {
            default: e.component
        }
    }
}
function Cf(e) {
    const t = {}
      , n = e.props || !1;
    if ("component"in e)
        t.default = n;
    else
        for (const i in e.components)
            t[i] = typeof n == "boolean" ? n : n[i];
    return t
}
function js(e) {
    for (; e; ) {
        if (e.record.aliasOf)
            return !0;
        e = e.parent
    }
    return !1
}
function Pf(e) {
    return e.reduce((t,n)=>Y(t, n.meta), {})
}
function zs(e, t) {
    const n = {};
    for (const i in e)
        n[i] = i in t ? t[i] : e[i];
    return n
}
function Zr(e, t) {
    return t.children.some(n=>n === e || Zr(e, n))
}
const Qr = /#/g
  , xf = /&/g
  , Af = /\//g
  , Sf = /=/g
  , Df = /\?/g
  , eo = /\+/g
  , kf = /%5B/g
  , Bf = /%5D/g
  , to = /%5E/g
  , Of = /%60/g
  , no = /%7B/g
  , Lf = /%7C/g
  , io = /%7D/g
  , Nf = /%20/g;
function Ui(e) {
    return encodeURI("" + e).replace(Lf, "|").replace(kf, "[").replace(Bf, "]")
}
function If(e) {
    return Ui(e).replace(no, "{").replace(io, "}").replace(to, "^")
}
function vi(e) {
    return Ui(e).replace(eo, "%2B").replace(Nf, "+").replace(Qr, "%23").replace(xf, "%26").replace(Of, "`").replace(no, "{").replace(io, "}").replace(to, "^")
}
function Ff(e) {
    return vi(e).replace(Sf, "%3D")
}
function Ef(e) {
    return Ui(e).replace(Qr, "%23").replace(Df, "%3F")
}
function Hf(e) {
    return e == null ? "" : Ef(e).replace(Af, "%2F")
}
function In(e) {
    try {
        return decodeURIComponent("" + e)
    } catch {}
    return "" + e
}
function Vf(e) {
    const t = {};
    if (e === "" || e === "?")
        return t;
    const i = (e[0] === "?" ? e.slice(1) : e).split("&");
    for (let s = 0; s < i.length; ++s) {
        const r = i[s].replace(eo, " ")
          , o = r.indexOf("=")
          , a = In(o < 0 ? r : r.slice(0, o))
          , l = o < 0 ? null : In(r.slice(o + 1));
        if (a in t) {
            let u = t[a];
            Oe(u) || (u = t[a] = [u]),
            u.push(l)
        } else
            t[a] = l
    }
    return t
}
function Ws(e) {
    let t = "";
    for (let n in e) {
        const i = e[n];
        if (n = Ff(n),
        i == null) {
            i !== void 0 && (t += (t.length ? "&" : "") + n);
            continue
        }
        (Oe(i) ? i.map(r=>r && vi(r)) : [i && vi(i)]).forEach(r=>{
            r !== void 0 && (t += (t.length ? "&" : "") + n,
            r != null && (t += "=" + r))
        }
        )
    }
    return t
}
function jf(e) {
    const t = {};
    for (const n in e) {
        const i = e[n];
        i !== void 0 && (t[n] = Oe(i) ? i.map(s=>s == null ? null : "" + s) : i == null ? i : "" + i)
    }
    return t
}
const zf = Symbol("")
  , Us = Symbol("")
  , Gi = Symbol("")
  , so = Symbol("")
  , Mi = Symbol("");
function Xt() {
    let e = [];
    function t(i) {
        return e.push(i),
        ()=>{
            const s = e.indexOf(i);
            s > -1 && e.splice(s, 1)
        }
    }
    function n() {
        e = []
    }
    return {
        add: t,
        list: ()=>e,
        reset: n
    }
}
function ot(e, t, n, i, s) {
    const r = i && (i.enterCallbacks[s] = i.enterCallbacks[s] || []);
    return ()=>new Promise((o,a)=>{
        const l = p=>{
            p === !1 ? a(Ut(4, {
                from: n,
                to: t
            })) : p instanceof Error ? a(p) : pf(p) ? a(Ut(2, {
                from: t,
                to: p
            })) : (r && i.enterCallbacks[s] === r && typeof p == "function" && r.push(p),
            o())
        }
          , u = e.call(i && i.instances[s], t, n, l);
        let c = Promise.resolve(u);
        e.length < 3 && (c = c.then(l)),
        c.catch(p=>a(p))
    }
    )
}
function si(e, t, n, i) {
    const s = [];
    for (const r of e)
        for (const o in r.components) {
            let a = r.components[o];
            if (!(t !== "beforeRouteEnter" && !r.instances[o]))
                if (Wf(a)) {
                    const u = (a.__vccOpts || a)[t];
                    u && s.push(ot(u, n, i, r, o))
                } else {
                    let l = a();
                    s.push(()=>l.then(u=>{
                        if (!u)
                            return Promise.reject(new Error(`Couldn't resolve component "${o}" at "${r.path}"`));
                        const c = ql(u) ? u.default : u;
                        r.components[o] = c;
                        const m = (c.__vccOpts || c)[t];
                        return m && ot(m, n, i, r, o)()
                    }
                    ))
                }
        }
    return s
}
function Wf(e) {
    return typeof e == "object" || "displayName"in e || "props"in e || "__vccOpts"in e
}
function Gs(e) {
    const t = Qe(Gi)
      , n = Qe(so)
      , i = Te(()=>t.resolve(Rt(e.to)))
      , s = Te(()=>{
        const {matched: l} = i.value
          , {length: u} = l
          , c = l[u - 1]
          , p = n.matched;
        if (!c || !p.length)
            return -1;
        const m = p.findIndex(Wt.bind(null, c));
        if (m > -1)
            return m;
        const v = $s(l[u - 2]);
        return u > 1 && $s(c) === v && p[p.length - 1].path !== v ? p.findIndex(Wt.bind(null, l[u - 2])) : m
    }
    )
      , r = Te(()=>s.value > -1 && Kf(n.params, i.value.params))
      , o = Te(()=>s.value > -1 && s.value === n.matched.length - 1 && qr(n.params, i.value.params));
    function a(l={}) {
        return $f(l) ? t[Rt(e.replace) ? "replace" : "push"](Rt(e.to)).catch(tn) : Promise.resolve()
    }
    return {
        route: i,
        href: Te(()=>i.value.href),
        isActive: r,
        isExactActive: o,
        navigate: a
    }
}
const Uf = Gn({
    name: "RouterLink",
    compatConfig: {
        MODE: 3
    },
    props: {
        to: {
            type: [String, Object],
            required: !0
        },
        replace: Boolean,
        activeClass: String,
        exactActiveClass: String,
        custom: Boolean,
        ariaCurrentValue: {
            type: String,
            default: "page"
        }
    },
    useLink: Gs,
    setup(e, {slots: t}) {
        const n = _n(Gs(e))
          , {options: i} = Qe(Gi)
          , s = Te(()=>({
            [Ks(e.activeClass, i.linkActiveClass, "router-link-active")]: n.isActive,
            [Ks(e.exactActiveClass, i.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
        }));
        return ()=>{
            const r = t.default && t.default(n);
            return e.custom ? r : $r("a", {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: s.value
            }, r)
        }
    }
})
  , Gf = Uf;
function $f(e) {
    if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
        if (e.currentTarget && e.currentTarget.getAttribute) {
            const t = e.currentTarget.getAttribute("target");
            if (/\b_blank\b/i.test(t))
                return
        }
        return e.preventDefault && e.preventDefault(),
        !0
    }
}
function Kf(e, t) {
    for (const n in t) {
        const i = t[n]
          , s = e[n];
        if (typeof i == "string") {
            if (i !== s)
                return !1
        } else if (!Oe(s) || s.length !== i.length || i.some((r,o)=>r !== s[o]))
            return !1
    }
    return !0
}
function $s(e) {
    return e ? e.aliasOf ? e.aliasOf.path : e.path : ""
}
const Ks = (e,t,n)=>e ?? t ?? n
  , qf = Gn({
    name: "RouterView",
    inheritAttrs: !1,
    props: {
        name: {
            type: String,
            default: "default"
        },
        route: Object
    },
    compatConfig: {
        MODE: 3
    },
    setup(e, {attrs: t, slots: n}) {
        const i = Qe(Mi)
          , s = Te(()=>e.route || i.value)
          , r = Qe(Us, 0)
          , o = Te(()=>{
            let u = Rt(r);
            const {matched: c} = s.value;
            let p;
            for (; (p = c[u]) && !p.components; )
                u++;
            return u
        }
        )
          , a = Te(()=>s.value.matched[o.value]);
        xn(Us, Te(()=>o.value + 1)),
        xn(zf, a),
        xn(Mi, s);
        const l = ca();
        return An(()=>[l.value, a.value, e.name], ([u,c,p],[m,v,A])=>{
            c && (c.instances[p] = u,
            v && v !== c && u && u === m && (c.leaveGuards.size || (c.leaveGuards = v.leaveGuards),
            c.updateGuards.size || (c.updateGuards = v.updateGuards))),
            u && c && (!v || !Wt(c, v) || !m) && (c.enterCallbacks[p] || []).forEach(k=>k(u))
        }
        , {
            flush: "post"
        }),
        ()=>{
            const u = s.value
              , c = e.name
              , p = a.value
              , m = p && p.components[c];
            if (!m)
                return qs(n.default, {
                    Component: m,
                    route: u
                });
            const v = p.props[c]
              , A = v ? v === !0 ? u.params : typeof v == "function" ? v(u) : v : null
              , V = $r(m, Y({}, A, t, {
                onVnodeUnmounted: D=>{
                    D.component.isUnmounted && (p.instances[c] = null)
                }
                ,
                ref: l
            }));
            return qs(n.default, {
                Component: V,
                route: u
            }) || V
        }
    }
});
function qs(e, t) {
    if (!e)
        return null;
    const n = e(t);
    return n.length === 1 ? n[0] : n
}
const ro = qf;
function Jf(e) {
    const t = Rf(e.routes, e)
      , n = e.parseQuery || Vf
      , i = e.stringifyQuery || Ws
      , s = e.history
      , r = Xt()
      , o = Xt()
      , a = Xt()
      , l = da(st);
    let u = st;
    Ot && e.scrollBehavior && "scrollRestoration"in history && (history.scrollRestoration = "manual");
    const c = ni.bind(null, y=>"" + y)
      , p = ni.bind(null, Hf)
      , m = ni.bind(null, In);
    function v(y, x) {
        let C, B;
        return Yr(y) ? (C = t.getRecordMatcher(y),
        B = x) : B = y,
        t.addRoute(B, C)
    }
    function A(y) {
        const x = t.getRecordMatcher(y);
        x && t.removeRoute(x)
    }
    function k() {
        return t.getRoutes().map(y=>y.record)
    }
    function V(y) {
        return !!t.getRecordMatcher(y)
    }
    function D(y, x) {
        if (x = Y({}, x || l.value),
        typeof y == "string") {
            const f = ii(n, y, x.path)
              , d = t.resolve({
                path: f.path
            }, x)
              , h = s.createHref(f.fullPath);
            return Y(f, d, {
                params: m(d.params),
                hash: In(f.hash),
                redirectedFrom: void 0,
                href: h
            })
        }
        let C;
        if ("path"in y)
            C = Y({}, y, {
                path: ii(n, y.path, x.path).path
            });
        else {
            const f = Y({}, y.params);
            for (const d in f)
                f[d] == null && delete f[d];
            C = Y({}, y, {
                params: p(y.params)
            }),
            x.params = p(x.params)
        }
        const B = t.resolve(C, x)
          , $ = y.hash || "";
        B.params = c(m(B.params));
        const se = Xl(i, Y({}, y, {
            hash: If($),
            path: B.path
        }))
          , j = s.createHref(se);
        return Y({
            fullPath: se,
            hash: $,
            query: i === Ws ? jf(y.query) : y.query || {}
        }, B, {
            redirectedFrom: void 0,
            href: j
        })
    }
    function E(y) {
        return typeof y == "string" ? ii(n, y, l.value.path) : Y({}, y)
    }
    function N(y, x) {
        if (u !== y)
            return Ut(8, {
                from: x,
                to: y
            })
    }
    function J(y) {
        return Le(y)
    }
    function pe(y) {
        return J(Y(E(y), {
            replace: !0
        }))
    }
    function ve(y) {
        const x = y.matched[y.matched.length - 1];
        if (x && x.redirect) {
            const {redirect: C} = x;
            let B = typeof C == "function" ? C(y) : C;
            return typeof B == "string" && (B = B.includes("?") || B.includes("#") ? B = E(B) : {
                path: B
            },
            B.params = {}),
            Y({
                query: y.query,
                hash: y.hash,
                params: "path"in B ? {} : y.params
            }, B)
        }
    }
    function Le(y, x) {
        const C = u = D(y)
          , B = l.value
          , $ = y.state
          , se = y.force
          , j = y.replace === !0
          , f = ve(C);
        if (f)
            return Le(Y(E(f), {
                state: typeof f == "object" ? Y({}, $, f.state) : $,
                force: se,
                replace: j
            }), x || C);
        const d = C;
        d.redirectedFrom = x;
        let h;
        return !se && Zl(i, B, C) && (h = Ut(16, {
            to: d,
            from: B
        }),
        pt(B, B, !0, !1)),
        (h ? Promise.resolve(h) : xt(d, B)).catch(_=>Ge(_) ? Ge(_, 2) ? _ : Pe(_) : Q(_, d, B)).then(_=>{
            if (_) {
                if (Ge(_, 2))
                    return Le(Y({
                        replace: j
                    }, E(_.to), {
                        state: typeof _.to == "object" ? Y({}, $, _.to.state) : $,
                        force: se
                    }), x || d)
            } else
                _ = nt(d, B, !0, j, $);
            return Ne(d, B, _),
            _
        }
        )
    }
    function Ue(y, x) {
        const C = N(y, x);
        return C ? Promise.reject(C) : Promise.resolve()
    }
    function xt(y, x) {
        let C;
        const [B,$,se] = Yf(y, x);
        C = si(B.reverse(), "beforeRouteLeave", y, x);
        for (const f of B)
            f.leaveGuards.forEach(d=>{
                C.push(ot(d, y, x))
            }
            );
        const j = Ue.bind(null, y, x);
        return C.push(j),
        kt(C).then(()=>{
            C = [];
            for (const f of r.list())
                C.push(ot(f, y, x));
            return C.push(j),
            kt(C)
        }
        ).then(()=>{
            C = si($, "beforeRouteUpdate", y, x);
            for (const f of $)
                f.updateGuards.forEach(d=>{
                    C.push(ot(d, y, x))
                }
                );
            return C.push(j),
            kt(C)
        }
        ).then(()=>{
            C = [];
            for (const f of y.matched)
                if (f.beforeEnter && !x.matched.includes(f))
                    if (Oe(f.beforeEnter))
                        for (const d of f.beforeEnter)
                            C.push(ot(d, y, x));
                    else
                        C.push(ot(f.beforeEnter, y, x));
            return C.push(j),
            kt(C)
        }
        ).then(()=>(y.matched.forEach(f=>f.enterCallbacks = {}),
        C = si(se, "beforeRouteEnter", y, x),
        C.push(j),
        kt(C))).then(()=>{
            C = [];
            for (const f of o.list())
                C.push(ot(f, y, x));
            return C.push(j),
            kt(C)
        }
        ).catch(f=>Ge(f, 8) ? f : Promise.reject(f))
    }
    function Ne(y, x, C) {
        for (const B of a.list())
            B(y, x, C)
    }
    function nt(y, x, C, B, $) {
        const se = N(y, x);
        if (se)
            return se;
        const j = x === st
          , f = Ot ? history.state : {};
        C && (B || j ? s.replace(y.fullPath, Y({
            scroll: j && f && f.scroll
        }, $)) : s.push(y.fullPath, $)),
        l.value = y,
        pt(y, x, C, j),
        Pe()
    }
    let Ie;
    function At() {
        Ie || (Ie = s.listen((y,x,C)=>{
            if (!yn.listening)
                return;
            const B = D(y)
              , $ = ve(B);
            if ($) {
                Le(Y($, {
                    replace: !0
                }), B).catch(tn);
                return
            }
            u = B;
            const se = l.value;
            Ot && af(Ns(se.fullPath, C.delta), Yn()),
            xt(B, se).catch(j=>Ge(j, 12) ? j : Ge(j, 2) ? (Le(j.to, B).then(f=>{
                Ge(f, 20) && !C.delta && C.type === mn.pop && s.go(-1, !1)
            }
            ).catch(tn),
            Promise.reject()) : (C.delta && s.go(-C.delta, !1),
            Q(j, B, se))).then(j=>{
                j = j || nt(B, se, !1),
                j && (C.delta && !Ge(j, 8) ? s.go(-C.delta, !1) : C.type === mn.pop && Ge(j, 20) && s.go(-1, !1)),
                Ne(B, se, j)
            }
            ).catch(tn)
        }
        ))
    }
    let ut = Xt(), qt = Xt(), re;
    function Q(y, x, C) {
        Pe(y);
        const B = qt.list();
        return B.length ? B.forEach($=>$(y, x, C)) : console.error(y),
        Promise.reject(y)
    }
    function X() {
        return re && l.value !== st ? Promise.resolve() : new Promise((y,x)=>{
            ut.add([y, x])
        }
        )
    }
    function Pe(y) {
        return re || (re = !y,
        At(),
        ut.list().forEach(([x,C])=>y ? C(y) : x()),
        ut.reset()),
        y
    }
    function pt(y, x, C, B) {
        const {scrollBehavior: $} = e;
        if (!Ot || !$)
            return Promise.resolve();
        const se = !C && lf(Ns(y.fullPath, 0)) || (B || !C) && history.state && history.state.scroll || null;
        return vr().then(()=>$(y, x, se)).then(j=>j && of(j)).catch(j=>Q(j, y, x))
    }
    const xe = y=>s.go(y);
    let be;
    const St = new Set
      , yn = {
        currentRoute: l,
        listening: !0,
        addRoute: v,
        removeRoute: A,
        hasRoute: V,
        getRoutes: k,
        resolve: D,
        options: e,
        push: J,
        replace: pe,
        go: xe,
        back: ()=>xe(-1),
        forward: ()=>xe(1),
        beforeEach: r.add,
        beforeResolve: o.add,
        afterEach: a.add,
        onError: qt.add,
        isReady: X,
        install(y) {
            const x = this;
            y.component("RouterLink", Gf),
            y.component("RouterView", ro),
            y.config.globalProperties.$router = x,
            Object.defineProperty(y.config.globalProperties, "$route", {
                enumerable: !0,
                get: ()=>Rt(l)
            }),
            Ot && !be && l.value === st && (be = !0,
            J(s.location).catch($=>{}
            ));
            const C = {};
            for (const $ in st)
                C[$] = Te(()=>l.value[$]);
            y.provide(Gi, x),
            y.provide(so, _n(C)),
            y.provide(Mi, l);
            const B = y.unmount;
            St.add(y),
            y.unmount = function() {
                St.delete(y),
                St.size < 1 && (u = st,
                Ie && Ie(),
                Ie = null,
                l.value = st,
                be = !1,
                re = !1),
                B()
            }
        }
    };
    return yn
}
function kt(e) {
    return e.reduce((t,n)=>t.then(()=>n()), Promise.resolve())
}
function Yf(e, t) {
    const n = []
      , i = []
      , s = []
      , r = Math.max(t.matched.length, e.matched.length);
    for (let o = 0; o < r; o++) {
        const a = t.matched[o];
        a && (e.matched.find(u=>Wt(u, a)) ? i.push(a) : n.push(a));
        const l = e.matched[o];
        l && (t.matched.find(u=>Wt(u, l)) || s.push(l))
    }
    return [n, i, s]
}
const Xf = {
    class: "appMain"
}
  , Zf = Gn({
    __name: "App",
    setup(e) {
        return (t,n)=>(zi(),
        jr("main", Xf, [_e(Rt(ro), {
            class: "routerView"
        })]))
    }
});
const oo = (e,t)=>{
    const n = e.__vccOpts || e;
    for (const [i,s] of t)
        n[i] = s;
    return n
}
  , Qf = oo(Zf, [["__scopeId", "data-v-89c65bae"]])
  , ec = "modulepreload"
  , tc = function(e) {
    return "/" + e
}
  , Js = {}
  , Bt = function(t, n, i) {
    if (!n || n.length === 0)
        return t();
    const s = document.getElementsByTagName("link");
    return Promise.all(n.map(r=>{
        if (r = tc(r),
        r in Js)
            return;
        Js[r] = !0;
        const o = r.endsWith(".css")
          , a = o ? '[rel="stylesheet"]' : "";
        if (!!i)
            for (let c = s.length - 1; c >= 0; c--) {
                const p = s[c];
                if (p.href === r && (!o || p.rel === "stylesheet"))
                    return
            }
        else if (document.querySelector(`link[href="${r}"]${a}`))
            return;
        const u = document.createElement("link");
        if (u.rel = o ? "stylesheet" : ec,
        o || (u.as = "script",
        u.crossOrigin = ""),
        u.href = r,
        document.head.appendChild(u),
        o)
            return new Promise((c,p)=>{
                u.addEventListener("load", c),
                u.addEventListener("error", ()=>p(new Error(`Unable to preload CSS for ${r}`)))
            }
            )
    }
    )).then(()=>t())
}
  , nc = Gn({
    data() {
        return {
            isExtension: ce.isExtension()
        }
    },
    methods: {},
    mounted() {}
});
const ic = ul('<div class="bootContents" data-v-4be08e94><p class="textSmall colorGray2" data-v-4be08e94>Onionfist Studio</p><h1 class="textLarge colorPinkDark" data-v-4be08e94>ICE DODO</h1><p class="textSmall" data-v-4be08e94>Loading game ...</p><p class="textSmall colorGray2" data-v-4be08e94>Version 0.175</p></div>', 1)
  , sc = [ic];
function rc(e, t, n, i, s, r) {
    return zi(),
    jr("main", {
        class: Fn(["bootMain", {
            bootMainExtension: e.isExtension,
            bootMainWebsite: !e.isExtension
        }])
    }, sc, 2)
}
const oc = oo(nc, [["render", rc], ["__scopeId", "data-v-4be08e94"]]);
function ac() {
    const e = [{
        path: "/",
        component: oc
    }, {
        path: ae.Singleplayer,
        component: ()=>Bt(()=>import("./VSingleplayer-5b0937ce.js"), ["assets/VSingleplayer-5b0937ce.js", "assets/CompletedMapUtils-7d481307.js", "assets/SkinUtils-f9a379f3.js", "assets/drift_enabled-5ab2ce45.js", "assets/ApiEndpoints-6ecf6ed0.js", "assets/back_arrow-cfdf76e9.js", "assets/VSingleplayer-84f28d66.css"])
    }];
    return [{
        path: ae.Multiplayer,
        component: ()=>Bt(()=>import("./VMultiplayer-91c76825.js"), ["assets/VMultiplayer-91c76825.js", "assets/drift_enabled-5ab2ce45.js", "assets/SkinUtils-f9a379f3.js", "assets/TimeUtils-13df9327.js", "assets/back_arrow-cfdf76e9.js", "assets/VMultiplayer-dd84093a.css"])
    }, {
        path: ae.Sync,
        component: ()=>Bt(()=>import("./VSync-0d3d4375.js"), ["assets/VSync-0d3d4375.js", "assets/TimeUtils-13df9327.js", "assets/CompletedMapUtils-7d481307.js", "assets/ApiEndpoints-6ecf6ed0.js", "assets/AuthUtils-dcb8bfc4.js", "assets/FAuthManager-f1b02e5c.js", "assets/back_arrow-cfdf76e9.js", "assets/VSync-ca4e9070.css"])
    }, {
        path: ae.Info,
        component: ()=>Bt(()=>import("./VInfo-7c281241.js"), ["assets/VInfo-7c281241.js", "assets/ApiEndpoints-6ecf6ed0.js", "assets/back_arrow-cfdf76e9.js", "assets/SkinUtils-f9a379f3.js", "assets/AuthUtils-dcb8bfc4.js", "assets/FAuthManager-f1b02e5c.js", "assets/VInfo-e8f7ee53.css"])
    }, {
        path: ae.Account,
        component: ()=>Bt(()=>import("./VAccount-78b230d6.js"), ["assets/VAccount-78b230d6.js", "assets/FAuthManager-f1b02e5c.js", "assets/back_arrow-cfdf76e9.js", "assets/VAccount-7ed10dac.css"])
    }, {
        path: ae.Crashed,
        component: ()=>Bt(()=>import("./VCrashed-c03ca40f.js"), ["assets/VCrashed-c03ca40f.js", "assets/VCrashed-7348fa66.css"])
    }, ...e]
}
const ri = Jf({
    history: uf("/"),
    routes: ac()
});
class ie {
    static async getString(t) {
        return ce.isExtension() ? new Promise(n=>{
            window.chrome.storage.local.get(t, function(s) {
                n(s[t] ?? null)
            })
        }
        ) : localStorage.getItem(t) ?? null
    }
    static async getInteger(t) {
        const n = await ie.getString(t);
        return n == null ? null : parseInt(n, 10)
    }
    static async set(t, n) {
        if (!ce.isExtension()) {
            localStorage.setItem(t, n);
            return
        }
        return new Promise(i=>{
            const s = {
                [t]: n
            };
            window.chrome.storage.local.set(s, function() {
                i()
            })
        }
        )
    }
    static async setIfGetStringIsNull(t, n) {
        await ie.getString(t) == null && await ie.set(t, n)
    }
    static async destroy(t) {
        if (localStorage.removeItem(t),
        !!ce.isExtension())
            return new Promise(n=>{
                window.chrome.storage.local.remove(t, function() {
                    n()
                })
            }
            )
    }
    static async destroyEverything() {
        if (localStorage.clear(),
        !!ce.isExtension())
            return new Promise(t=>{
                const n = window.chrome;
                n.storage.local.clear(function() {
                    n.storage.sync.clear(function() {
                        t()
                    })
                })
            }
            )
    }
}
class Lt {
    static async onBoot() {
        for (const t of Lt.getAllSettingsItems()) {
            await Lt.getIsCurrentSettingValid(t) || await ie.set(t.storageKey, t.defaultStorageValue);
            const i = await ie.getString(t.storageKey);
            Lt.setSettingsItemGlobalVariable(t, i)
        }
    }
    static setSettingsItemGlobalVariable(t, n) {
        switch (t.storageKey) {
        case G.BaseTexture:
            window.settings.baseTexture = n;
            break;
        case G.FovLevel:
            window.settings.fovLevel = n;
            break;
        case G.IsSkyboxOn:
            window.settings.skyboxEnabled = n;
            break;
        case G.ScreenResolution:
            window.settings.screenRes = n;
            break;
        case G.RenderLoop:
            window.settings.renderLoop = n;
            break
        }
    }
    static async getIsCurrentSettingValid(t) {
        const n = await ie.getString(t.storageKey);
        return !(n == null || !t.storageValues.includes(n))
    }
    static getAllSettingsItemsExceptResolutionIfExtension() {
        const t = Lt.getAllSettingsItems();
        return ce.isExtension() ? t.filter(n=>n.storageKey !== G.ScreenResolution) : t
    }
    static getAllSettingsItems() {
        return [{
            name: "Sound",
            storageKey: G.IsSoundOn,
            storageValues: [U.On, U.Off],
            defaultStorageValue: U.On
        }, {
            name: "Auto Restart",
            storageKey: G.IsAutoRestartOn,
            storageValues: [U.On, U.Off],
            defaultStorageValue: U.Off
        }, {
            name: "Render Loop",
            storageKey: G.RenderLoop,
            storageValues: [U.Vsync, U.Fixed],
            defaultStorageValue: U.Vsync
        }, {
            name: "Texture",
            storageKey: G.BaseTexture,
            storageValues: [U.Bright, U.Dark],
            defaultStorageValue: U.Bright
        }, {
            name: "Fov Level",
            storageKey: G.FovLevel,
            storageValues: [U.X1, U.X2, U.X3],
            defaultStorageValue: U.X1
        }, {
            name: "Galaxy",
            storageKey: G.IsSkyboxOn,
            storageValues: [U.On, U.Off],
            defaultStorageValue: U.Off
        }, {
            name: "Resolution",
            storageKey: G.ScreenResolution,
            storageValues: [U.Resolution400, U.Resolution600, U.Resolution900],
            defaultStorageValue: U.Resolution600
        }, {
            name: "Song",
            storageKey: G.SelectedSoundtrack,
            storageValues: [U.MusicDefault, U.Music1, U.Music2, U.Music3, U.Music4],
            defaultStorageValue: U.MusicDefault
        }]
    }
}
class lc {
    constructor(t) {
        le(this, "world");
        this.world = t,
        this.setValuesOnGameLoaded()
    }
    setValuesOnGameLoaded() {
        window.alive = !1,
        window.score = 0,
        window.deployment = {
            is_chrome_ext: ce.isExtension()
        },
        window.controls = {
            left: !1,
            right: !1,
            space: !1,
            down: !1
        },
        window.tsTriggers = {
            onMapLoaded: ()=>{}
            ,
            onDeath: t=>this.world.endingManager.onDeath(t),
            onWin: ()=>this.world.endingManager.onWin(),
            onFrame: ()=>this.world.onFrame(),
            setInGameMessage: t=>this.world.overlayManager.setInGameMessage(t),
            hideInGameMessage: ()=>this.world.overlayManager.hideInGameMessage(),
            setJumpEnabledSignVisibility: t=>this.world.overlayManager.setJumpEnabledSignVisibility(t),
            setControlsReversedSignVisibility: t=>this.world.overlayManager.setControlsReversedSignVisibility(t),
            setDriftEnabledSignVisibility: t=>this.world.overlayManager.setDriftEnabledSignVisibility(t),
            getRotationAdjustment: ()=>this.world.playerManager.getRotationAdjustment(),
            getPositionAdjustment: ()=>this.world.playerManager.getPositionAdjustment(),
            onEngineFailed: ()=>this.world.displayEngineFailedPopup()
        }
    }
    static onBoot() {
        window.settings = {}
    }
}
const fc = 10
  , cc = 35;
class Ve {
    static async onBoot() {
        const t = fe.getAllMapIds();
        if (await ie.setIfGetStringIsNull(G.LastVersionText, ce.getIcedodoVersionText()),
        await ie.setIfGetStringIsNull(G.AddedMapIds, JSON.stringify([])),
        await ie.setIfGetStringIsNull(G.LastMapIds, JSON.stringify(t)),
        !await Ve.isNewVersion())
            return;
        const i = await Ve.getMapIdsFromStorageKey(G.LastMapIds)
          , s = Ve.getAddedMapIds(i, t);
        await ie.set(G.LastVersionText, ce.getIcedodoVersionText()),
        await ie.set(G.LastMapIds, JSON.stringify(t)),
        await Ve.appendAddedMapIds(s)
    }
    static async getRecentMapListings() {
        return Ve.getMapListingsFromStorageKey(G.AddedMapIds)
    }
    static async getFavoriteMapListings() {
        return Ve.getMapListingsFromStorageKey(G.FavoriteMapIds)
    }
    static async getMapListingsFromStorageKey(t) {
        const n = await Ve.getMapIdsFromStorageKey(t)
          , i = [];
        for (const r of Ye) {
            const o = fe.getMapListings(r);
            for (const a of o)
                n.includes(a.mapId) && (fe.doesContain(i, a) || i.push(a))
        }
        return i.sort((r,o)=>{
            const a = n.indexOf(r.mapId)
              , l = n.indexOf(o.mapId);
            return a - l
        }
        )
    }
    static async isNewVersion() {
        const t = await ie.getString(G.LastVersionText);
        return t == null ? !1 : t !== ce.getIcedodoVersionText()
    }
    static getAddedMapIds(t, n) {
        const i = [];
        for (const s of n)
            t.includes(s) || i.push(s);
        return i
    }
    static async getMapIdsFromStorageKey(t) {
        const n = await ie.getString(t);
        return n == null ? [] : JSON.parse(n)
    }
    static async appendAddedMapIds(t) {
        const n = await Ve.getMapIdsFromStorageKey(G.AddedMapIds)
          , i = [];
        for (const s of t) {
            if (i.length >= cc)
                break;
            i.push(s)
        }
        for (const s of n)
            if (!i.includes(s)) {
                if (i.length >= fc)
                    break;
                i.push(s)
            }
        await ie.set(G.AddedMapIds, JSON.stringify(i))
    }
}
const oi = "jhidcpailhmpjpbdbhceiaeeggkalgmd";
class dc {
    static async onBoot() {
        if (ce.isExtension() || await ie.getString(G.DeviceId) != null)
            return;
        const n = "device" + Date.now() + Math.random().toString().replace("0.", "");
        await ie.set(G.DeviceId, n)
    }
    static hasExtension() {
        return !(chrome == null || chrome.runtime == null)
    }
    static async getRemoteCompletedMapsFromExtension(t) {
        return new Promise(n=>{
            const i = {
                code: "sync_extension_and_website",
                payload: JSON.stringify(t)
            };
            chrome.runtime.sendMessage(oi, i, s=>{
                const r = chrome.runtime.lastError;
                if (r != null)
                    console.log("getRemoteCompletedMapsFromExtension err"),
                    console.error(r),
                    n({
                        remoteCompletedMaps: [],
                        hasError: !0
                    });
                else {
                    const o = JSON.parse(s);
                    n({
                        remoteCompletedMaps: o
                    })
                }
            }
            )
        }
        )
    }
    static async setCloudCompletedMapsOnExtension(t) {
        return new Promise(n=>{
            const i = {
                code: "set_cloud_completed_maps",
                payload: JSON.stringify(t)
            };
            chrome.runtime.sendMessage(oi, i, s=>{
                const r = chrome.runtime.lastError;
                r != null && (console.log("setCloudCompletedMapsOnExtension err"),
                console.error(r)),
                n(null)
            }
            ),
            setTimeout(()=>{
                n(null)
            }
            , 1500)
        }
        )
    }
    static async setFavoriteMapsOnExtension(t) {
        return new Promise(n=>{
            const i = {
                code: "set_favorite_map_ids",
                payload: JSON.stringify(t)
            };
            chrome.runtime.sendMessage(oi, i, s=>{
                const r = chrome.runtime.lastError;
                r != null && (console.log("setFavoriteMapsOnExtension err"),
                console.error(r)),
                n(null)
            }
            ),
            setTimeout(()=>{
                n(null)
            }
            , 1500)
        }
        )
    }
    static getCompletionCount(t) {
        let n = 0;
        for (const i of t)
            n += i.count;
        return n
    }
}
class Ze {
    static getRouteNameOrCrash() {
        const t = location.href.split("/")
          , s = "/" + t[t.length - 1].split("?")[0].split("#")[0].split("&")[0].trim();
        return Ze.isValidRoute(s) || Ze.crash("Invalid route: " + s),
        console.log("route", s),
        s
    }
    static getQueryValue(t) {
        return new URLSearchParams(window.location.search).get(t)
    }
    static getQueryDict() {
        const t = {}
          , n = ct.getStringEnumValues(Je);
        for (const i of n) {
            const s = Ze.getQueryValue(i);
            s != null && (t[i] = s)
        }
        return t
    }
    static isValidRoute(t) {
        return ct.getStringEnumValues(ae).includes(t)
    }
    static crash(t) {
        console.log("crash", t);
        const n = t ?? "Unknown error"
          , i = `?crashedText=${n}`;
        throw Ze.goToRoute(ae.Crashed, i),
        new Error(n)
    }
    static goToRoute(t, n="") {
        ce.isExtension() ? window.open(po + t + n, "_blank") : window.location.href = t + n
    }
}
class bt {
    static async onBoot(t) {
        await bt.resetStorageIfNewcomer(),
        await bt.graduateNewcomerIfOpeningNonFeaturedMap(t)
    }
    static async graduateNewcomerIfOpeningNonFeaturedMap(t) {
        t[Je.MapId] != null && (bt.isMapInFeaturedCup(t[Je.MapId]) || await ie.set(G.IsNewcomer, U.No))
    }
    static async resetStorageIfNewcomer() {
        await bt.didNewcomerGraduateInStorage() || ie.set(G.LastOpenedCupId, g.Newcomer)
    }
    static isMapInFeaturedCup(t) {
        for (const n of fe.getMapListings(g.Newcomer))
            if (n.mapId === t)
                return !0;
        return !1
    }
    static async didNewcomerGraduateInStorage() {
        return await ie.getString(G.IsNewcomer) === U.No
    }
    static async isNewcomer(t) {
        if (await bt.didNewcomerGraduateInStorage())
            return !1;
        const n = t.overallProgress.completedMaps < Qi;
        return n || await ie.set(G.IsNewcomer, U.No),
        n
    }
    static createNewcomerHelpPopupItem(t) {
        return {
            title: "Help",
            bodyAsHtml: `
                Welcome to the Ice Dodo!
                <br><br>
                Use the arrow keys to move.
                Hit the green portal to win.
                Do not fall off or hit the spikes.
                <br><br>
                Complete ${Qi - t.overallProgress.completedMaps} more maps to unlock the full game!
            `,
            buttons: []
        }
    }
}
class uc {
    static async onBoot() {
        await ie.setIfGetStringIsNull(G.DoesUserHaveEpilepsy, U.Maybe)
    }
    static async shouldDisplayEpilepsyWarning(t) {
        return await ie.getString(G.DoesUserHaveEpilepsy) === U.No ? !1 : ai.doesMapNeedEpilepsyWarning(t)
    }
}
class $i {
    static async init() {
        const t = Ze.getQueryDict();
        window.currentRoute = $i.getCurrentRoute(t);
        const n = $l(Qf);
        if (n.use(ri),
        n.mount("#app"),
        ri.push("/"),
        console.log("Ice dodo version: " + ce.getIcedodoVersionText()),
        t[Je.MapUrl] != null && t[Je.MapCodeVersion] !== Zi) {
            alert("Please upgrade the blender compiler code to the latest version: " + Zi);
            return
        }
        lc.onBoot(),
        await bt.onBoot(t),
        await Ve.onBoot(),
        await dc.onBoot(),
        await Lt.onBoot(),
        await uc.onBoot(),
        await ie.setIfGetStringIsNull(G.SelectedSkinId, Ri.Default),
        ri.push({
            path: window.currentRoute,
            query: t
        })
    }
    static getCurrentRoute(t) {
        if (ce.isExtension())
            return ae.Singleplayer;
        if (t[Je.IsMultiplayer] === "yes")
            return ae.Multiplayer;
        if (t[Je.FirstRoute] != null) {
            const i = "/" + t[Je.FirstRoute];
            return Ze.isValidRoute(i) || Ze.crash("Invalid route: " + i),
            i
        }
        const n = Ze.getRouteNameOrCrash();
        return n === ae.Boot ? ae.Singleplayer : n
    }
}
$i.init();
window.bagManager = new vo;
export {wc as $, Ye as A, Lt as B, g as C, ce as D, Pi as E, ie as F, _c as G, Ve as H, kc as I, Nc as J, Ec as K, mo as L, fe as M, bt as N, Ri as O, Ys as P, Je as Q, ae as R, G as S, Zi as T, gc as U, Cc as V, po as W, sn as X, ts as Y, mc as Z, oo as _, hc as a, yo as a0, bc as a1, vc as a2, Mc as a3, Rc as a4, Fc as a5, _o as a6, dc as a7, Pc as a8, xc as a9, dl as aa, Ic as ab, Tc as b, ct as c, yc as d, U as e, Qi as f, ho as g, z as h, Ze as i, lc as j, Gn as k, jr as l, Wr as m, Lc as n, ul as o, zi as p, Sc as q, Dc as r, bo as s, uc as t, Ac as u, Fn as v, qe as w, Oc as x, _e as y, Bc as z};
