import {b as p, F as u, S as s, O as a, s as r, C as e} from "./index-4aa39886.js";
class o {
    static getSkinIdsSorted(c) {
        return p.sort((t,n)=>c[n].percent - c[t].percent)
    }
    static async getSkinStateDictionary(c) {
        const t = {};
        for (const n of p)
            t[n] = await o.getSkinState(n, c);
        return t
    }
    static async unlockPuzzleSkin(c) {
        const t = await o.getUnlockedSkinIds();
        t.includes(c) || (t.push(c),
        await u.set(s.UnlockedPuzzleSkinIds, t.join(",")))
    }
    static getSkinImageSrc(c) {
        return c == null ? o.getSkinImageSrc(a.Default) : `/assets/skins/${a[c].toLowerCase()}.png`
    }
    static getPercent(c) {
        return c.completedMaps / c.totalMaps
    }
    static async getPuzzlePercent(c) {
        return (await o.getUnlockedSkinIds()).includes(c) ? 1 : 0
    }
    static async getUnlockedSkinIds() {
        const c = await u.getString(s.UnlockedPuzzleSkinIds);
        return c == null ? [] : c.split(",").map(t=>parseInt(t.trim(), 10))
    }
    static clampPercentBetween0and1(c) {
        return c <= 0 ? 0 : c >= 1 ? 1 : c
    }
    static async getSkinState(c, t) {
        const n = await o.getRawSkinState(c, t);
        return n.percent = o.clampPercentBetween0and1(n.percent),
        n
    }
    static isPuzzleSkin(c) {
        switch (c) {
        case a.PuzzleA:
            return !0;
        default:
            return !1
        }
    }
    static async getRawSkinState(c, t) {
        switch (c) {
        case a.Default:
            return {
                name: "Default",
                percent: 1,
                howToGet: "Open your eyes"
            };
        case a.Newcomer:
            return {
                name: r.getShortCupName(e.Newcomer),
                percent: o.getPercent(t.cupProgressDictionary[e.Newcomer]),
                howToGet: `Finish all ${r.getCupName(e.Newcomer)} maps`
            };
        case a.Pilot:
            return {
                name: r.getShortCupName(e.Pilot),
                percent: o.getPercent(t.cupProgressDictionary[e.Pilot]),
                howToGet: `Finish all ${r.getCupName(e.Pilot)} maps`
            };
        case a.Carrot:
            return {
                name: r.getShortCupName(e.Carrot),
                percent: o.getPercent(t.cupProgressDictionary[e.Carrot]),
                howToGet: `Finish all ${r.getCupName(e.Carrot)} maps`
            };
        case a.Rocky:
            return {
                name: r.getShortCupName(e.Rocky),
                percent: o.getPercent(t.cupProgressDictionary[e.Rocky]),
                howToGet: `Finish all ${r.getCupName(e.Rocky)} maps`
            };
        case a.Dodo:
            return {
                name: r.getShortCupName(e.Dodo),
                percent: o.getPercent(t.cupProgressDictionary[e.Dodo]),
                howToGet: `Finish all ${r.getCupName(e.Dodo)} maps`
            };
        case a.Skilled:
            return {
                name: r.getShortCupName(e.Skilled),
                percent: o.getPercent(t.cupProgressDictionary[e.Skilled]),
                howToGet: `Finish all ${r.getCupName(e.Skilled)} maps`
            };
        case a.Furby:
            return {
                name: r.getShortCupName(e.Furby),
                percent: o.getPercent(t.cupProgressDictionary[e.Furby]),
                howToGet: `Finish all ${r.getCupName(e.Furby)} maps`
            };
        case a.Doom:
            return {
                name: r.getShortCupName(e.Doom),
                percent: o.getPercent(t.cupProgressDictionary[e.Doom]),
                howToGet: `Finish all ${r.getCupName(e.Doom)} maps`
            };
        case a.Kazil:
            return {
                name: r.getShortCupName(e.Kazil),
                percent: o.getPercent(t.cupProgressDictionary[e.Kazil]),
                howToGet: `Finish all ${r.getCupName(e.Kazil)} maps`
            };
        case a.Zhou:
            return {
                name: r.getShortCupName(e.Zhou),
                percent: o.getPercent(t.cupProgressDictionary[e.Zhou]),
                howToGet: `Finish all ${r.getCupName(e.Zhou)} maps`
            };
        case a.Moosh:
            return {
                name: r.getShortCupName(e.Moosh),
                percent: o.getPercent(t.cupProgressDictionary[e.Moosh]),
                howToGet: `Finish all ${r.getCupName(e.Moosh)} maps`
            };
        case a.Awehero:
            return {
                name: r.getShortCupName(e.Awehero),
                percent: o.getPercent(t.cupProgressDictionary[e.Awehero]),
                howToGet: `Finish all ${r.getCupName(e.Awehero)} maps`
            };
        case a.Ye:
            return {
                name: r.getShortCupName(e.Ye),
                percent: o.getPercent(t.cupProgressDictionary[e.Ye]),
                howToGet: `Finish all ${r.getCupName(e.Ye)} maps`
            };
        case a.Tim:
            return {
                name: r.getShortCupName(e.Tim),
                percent: o.getPercent(t.cupProgressDictionary[e.Tim]),
                howToGet: `Finish all ${r.getCupName(e.Tim)} maps`
            };
        case a.Ghoul:
            return {
                name: r.getShortCupName(e.Ghoul),
                percent: o.getPercent(t.cupProgressDictionary[e.Ghoul]),
                howToGet: `Finish all ${r.getCupName(e.Ghoul)} maps`
            };
        case a.Abc:
            return {
                name: r.getShortCupName(e.Abc),
                percent: o.getPercent(t.cupProgressDictionary[e.Abc]),
                howToGet: `Finish all ${r.getCupName(e.Abc)} maps`
            };
        case a.Rytai:
            return {
                name: r.getShortCupName(e.Rytai),
                percent: o.getPercent(t.cupProgressDictionary[e.Rytai]),
                howToGet: `Finish all ${r.getCupName(e.Rytai)} maps`
            };
        case a.Jay:
            return {
                name: r.getShortCupName(e.Jay),
                percent: o.getPercent(t.cupProgressDictionary[e.Jay]),
                howToGet: `Finish all ${r.getCupName(e.Jay)} maps`
            };
        case a.Golden:
            return {
                name: r.getShortCupName(e.Golden),
                percent: o.getPercent(t.cupProgressDictionary[e.Golden]),
                howToGet: `Finish all ${r.getCupName(e.Golden)} maps`
            };
        case a.Bean:
            return {
                name: r.getShortCupName(e.Bean),
                percent: o.getPercent(t.cupProgressDictionary[e.Bean]),
                howToGet: `Finish all ${r.getCupName(e.Bean)} maps`
            };
        case a.Fish:
            return {
                name: r.getShortCupName(e.Fish),
                percent: o.getPercent(t.cupProgressDictionary[e.Fish]),
                howToGet: `Finish all ${r.getCupName(e.Fish)} maps`
            };
        case a.Dark:
            return {
                name: r.getShortCupName(e.Dark),
                percent: o.getPercent(t.cupProgressDictionary[e.Dark]),
                howToGet: `Finish all ${r.getCupName(e.Dark)} maps`
            };
        case a.Thero:
            return {
                name: r.getShortCupName(e.Thero),
                percent: o.getPercent(t.cupProgressDictionary[e.Thero]),
                howToGet: `Finish all ${r.getCupName(e.Thero)} maps`
            };
        case a.Crazy:
            return {
                name: r.getShortCupName(e.Crazy),
                percent: o.getPercent(t.cupProgressDictionary[e.Crazy]),
                howToGet: `Finish all ${r.getCupName(e.Crazy)} maps`
            };
        case a.June:
            return {
                name: r.getShortCupName(e.June),
                percent: o.getPercent(t.cupProgressDictionary[e.June]),
                howToGet: `Finish all ${r.getCupName(e.June)} maps`
            };
        case a.Sleepy:
            return {
                name: r.getShortCupName(e.Sleepy),
                percent: o.getPercent(t.cupProgressDictionary[e.Sleepy]),
                howToGet: `Finish all ${r.getCupName(e.Sleepy)} maps`
            };
        case a.Mango:
            return {
                name: r.getShortCupName(e.Mango),
                percent: o.getPercent(t.cupProgressDictionary[e.Mango]),
                howToGet: `Finish all ${r.getCupName(e.Mango)} maps`
            };
        case a.Squirrel:
            return {
                name: r.getShortCupName(e.Squirrel),
                percent: o.getPercent(t.cupProgressDictionary[e.Squirrel]),
                howToGet: `Finish all ${r.getCupName(e.Squirrel)} maps`
            };
        case a.Insolence:
            return {
                name: r.getShortCupName(e.Insolence),
                percent: o.getPercent(t.cupProgressDictionary[e.Insolence]),
                howToGet: `Finish all ${r.getCupName(e.Insolence)} maps`
            };
        case a.Modded:
            return {
                name: r.getShortCupName(e.Modded),
                percent: o.getPercent(t.cupProgressDictionary[e.Modded]),
                howToGet: `Finish all ${r.getCupName(e.Modded)} maps`
            };
        case a.Collab:
            return {
                name: r.getShortCupName(e.Collab),
                percent: o.getPercent(t.cupProgressDictionary[e.Collab]),
                howToGet: `Finish all ${r.getCupName(e.Collab)} maps`
            };
        case a.Og:
            return {
                name: r.getShortCupName(e.Og),
                percent: o.getPercent(t.cupProgressDictionary[e.Og]),
                howToGet: `Finish all ${r.getCupName(e.Og)} maps`
            };
        case a.Ultrahard:
            return {
                name: r.getShortCupName(e.Ultrahard),
                percent: o.getPercent(t.cupProgressDictionary[e.Ultrahard]),
                howToGet: `Finish all ${r.getCupName(e.Ultrahard)} maps`
            };
        case a.Diff1:
            return {
                name: "Diff 1",
                percent: o.getPercent(t.diffProgressDictionary[1]),
                howToGet: "Finish all difficulty 1 maps"
            };
        case a.Diff2:
            return {
                name: "Diff 2",
                percent: o.getPercent(t.diffProgressDictionary[2]),
                howToGet: "Finish all difficulty 2 maps"
            };
        case a.Diff3:
            return {
                name: "Diff 3",
                percent: o.getPercent(t.diffProgressDictionary[3]),
                howToGet: "Finish all difficulty 3 maps"
            };
        case a.Diff4:
            return {
                name: "Diff 4",
                percent: o.getPercent(t.diffProgressDictionary[4]),
                howToGet: "Finish all difficulty 4 maps"
            };
        case a.Diff5:
            return {
                name: "Diff 5",
                percent: o.getPercent(t.diffProgressDictionary[5]),
                howToGet: "Finish all difficulty 5 maps"
            };
        case a.Diff6:
            return {
                name: "Diff 6",
                percent: o.getPercent(t.diffProgressDictionary[6]),
                howToGet: "Finish all difficulty 6 maps"
            };
        case a.Diff7:
            return {
                name: "Diff 7",
                percent: o.getPercent(t.diffProgressDictionary[7]),
                howToGet: "Finish all difficulty 7 maps"
            };
        case a.Diff8:
            return {
                name: "Diff 8",
                percent: o.getPercent(t.diffProgressDictionary[8]),
                howToGet: "Finish all difficulty 8 maps"
            };
        case a.Diff9:
            return {
                name: "Diff 9",
                percent: o.getPercent(t.diffProgressDictionary[9]),
                howToGet: "Finish all difficulty 9 maps"
            };
        case a.Diff10:
            return {
                name: "Diff 10",
                percent: o.getPercent(t.diffProgressDictionary[10]),
                howToGet: "Finish all difficulty 1 maps"
            };
        case a.Diff11:
            return {
                name: "Diff 11",
                percent: o.getPercent(t.diffProgressDictionary[11]),
                howToGet: "Finish all difficulty 1 maps"
            };
        case a.PointsA:
            return {
                name: "20pt",
                percent: t.overallProgress.totalPoints / 20,
                howToGet: "Get 20pt overall"
            };
        case a.PointsB:
            return {
                name: "100pt",
                percent: t.overallProgress.totalPoints / 100,
                howToGet: "Get 100pt overall"
            };
        case a.PointsC:
            return {
                name: "200pt",
                percent: t.overallProgress.totalPoints / 200,
                howToGet: "Get 200pt overall"
            };
        case a.PointsD:
            return {
                name: "500pt",
                percent: t.overallProgress.totalPoints / 500,
                howToGet: "Get 500pt overall"
            };
        case a.PointsE:
            return {
                name: "1000pt",
                percent: t.overallProgress.totalPoints / 1e3,
                howToGet: "Get 1000pt overall"
            };
        case a.PointsF:
            return {
                name: "2000pt",
                percent: t.overallProgress.totalPoints / 2e3,
                howToGet: "Get 2000pt overall"
            };
        case a.PercentA:
            return {
                name: "20%",
                percent: o.getPercent(t.overallProgress) / .2,
                howToGet: "Beat 20% of all the maps"
            };
        case a.PercentB:
            return {
                name: "40%",
                percent: o.getPercent(t.overallProgress) / .4,
                howToGet: "Beat 40% of all the maps"
            };
        case a.PercentC:
            return {
                name: "60%",
                percent: o.getPercent(t.overallProgress) / .6,
                howToGet: "Beat 60% of all the maps"
            };
        case a.PercentD:
            return {
                name: "80%",
                percent: o.getPercent(t.overallProgress) / .8,
                howToGet: "Beat 80% of all the maps"
            };
        case a.PercentE:
            return {
                name: "100%",
                percent: o.getPercent(t.overallProgress),
                howToGet: "Beat 100% of all the maps"
            };
        case a.PuzzleA:
            return {
                name: "Dog?",
                percent: await o.getPuzzlePercent(c),
                howToGet: "Guess a secret word. See the creator's first instagram post for a hint."
            }
        }
    }
}
export {o as S};
