import {i as s, Z as f} from "./index-4aa39886.js";
class P {
    static fetch(a, _, c=!1) {
        return new Promise(t=>{
            const l = f + a
              , w = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(_)
            };
            fetch(l, w).then(async function(r) {
                const o = await r.json();
                if (r.status === 200) {
                    t(o);
                    return
                }
                c ? t(null) : s.crash("Fetch request error: " + r.status + ". Specifically: " + o.error)
            }).catch(function(r) {
                c ? t(null) : s.crash("Fetch connect error: " + r.message)
            })
        }
        )
    }
}
var h;
(e=>{
    (a=>{
        a.Path = "/api/news"
    }
    )(e.GetNews || (e.GetNews = {})),
    (a=>{
        a.Path = "/api/sticky"
    }
    )(e.GetSticky || (e.GetSticky = {})),
    (a=>{
        a.Path = "/api/map_info"
    }
    )(e.GetMapInfo || (e.GetMapInfo = {})),
    (a=>{
        a.Path = "/api/brew_listings"
    }
    )(e.GetBrewListings || (e.GetBrewListings = {})),
    (a=>{
        a.Path = "/api/create_review"
    }
    )(e.CreateReview || (e.CreateReview = {})),
    (a=>{
        a.Path = "/api/delete_review"
    }
    )(e.DeleteReview || (e.DeleteReview = {})),
    (a=>{
        a.Path = "/api/get_reviews"
    }
    )(e.GetReviews || (e.GetReviews = {})),
    (a=>{
        a.Path = "/api/sync_to_cloud"
    }
    )(e.SyncToCloud || (e.SyncToCloud = {})),
    (a=>{
        a.Path = "/api/get_map_leaderboard"
    }
    )(e.GetMapLeaderboard || (e.GetMapLeaderboard = {})),
    (a=>{
        a.Path = "/api/hide_user_from_map_leaderboard"
    }
    )(e.HideUserFromMapLeaderboard || (e.HideUserFromMapLeaderboard = {})),
    (a=>{
        a.Path = "/api/ban_user_from_review"
    }
    )(e.BanUserFromReview || (e.BanUserFromReview = {})),
    (a=>{
        a.Path = "/api/get_is_moderator"
    }
    )(e.GetIsModerator || (e.GetIsModerator = {})),
    (a=>{
        a.Path = "/api/ban_user_from_leaderboard"
    }
    )(e.BanUserFromLeaderboard || (e.BanUserFromLeaderboard = {}))
}
)(h || (h = {}));
export {h as A, P as F};
