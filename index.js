const moment = require('moment')
const puppeteer = require('puppeteer')
const Discord = require('discord-webhook-node')
var Instances = [
  {
    "Mail": process.env.Mail,
    "Password": process.env.Password
  }
]
const Options = require('./config_LootTV.json')
const sleep = (ms) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
}
const Chrome = "./opt/google/chrome/chrome"
const Webhook_URL = process.env.Webhook_URL
const Def_Speed = Options.Def_Speed
const Hidden = Options.Hidden
var Check_Time = Options.Check_Time
const First_Video = process.env.First_Video
var Not_Work = Options["Instances_Don\'t_Work"]
var Max_Time_Video = Options.Max_Time_Video
var Max_Time_Reload = Options.Max_Time_Reload
var Add_Speed = Options.Add_Speed
var Remove_Speed = Options.Remove_Speed
var Video_to_Speed = Options.Video_to_Speed
const Time = new Map()
const x = new Map()
const y = new Map()
const w = new Map()
const z = new Map()
const Reward = new Map()
const gain = new Map()
const Closed = new Map()
const Speed = new Map()
const Mail = new Map()
const Password = new Map()
const Webhooks = new Map()
const Colors = new Map()
const Videos = new Map()
const Daily = new Map()
var Test = {
    "num": 0,
    "time": moment(),
    "list": []
};
var Active = 0;
var f = 0;
var crash = 0
var Maximum = {
    "dollar": 0,
    "speed": 0,
    "money": 999
};
var Total = {
    "points": 0,
    "monthly": 0,
    "tv": 0,
    "video": 0
}
/**
 * 
 * @param {Map} map 
 * @param {String} key 
 * @param {String} value 
 */
const Change = (map,key,value) => map.set(key, map.get(key) + value)
const Settings = (N) => {
    return new Promise (async (resolve,reject) => {
    function Set_1(cat,num){
        if(Number(`${cat}`) == (null || undefined) || Number(`${cat}`) <= 0){
            if(process.env[`${Object.keys({cat})[0]}`] !== (null || undefined) || process.env[`${Object.keys({cat})[0]}`] <= 0) Check_Time = process.env[`${Object.keys({cat})[0]}`]
            else cat = num
        }
    }
    await Set_1(Check_Time,10)
    await Set_1(Not_Work,0)
    await Set_1(Max_Time_Reload,5)
    await Set_1(Max_Time_Video,15)
    await Set_1(Add_Speed,0.01)
    await Set_1(Remove_Speed,0.01)
    await Set_1(Video_to_Speed,5)
    /*if(Instances[N].Colour_TV !== (null || undefined)) await db.set(`Color_TV_${N}`,Instances[N].Colour_TV)
    else if(Colour_TV !== (null || undefined)) await db.set(`Color_TV_${N}`,Colour_TV)
    else await db.set(`Color_TV_${N}`,"#300faa")*/
    x.set(N,0)
    Reward.set(N,0)
    z.set(N,0)
    w.set(N,0)
    //TV.set(N,0)
    y.set(`log_${N}`, 0)
    y.set(`login_${N}`, 0)
    y.set(`point_${N}`, 0)
    y.set(`page_${N}`, 0)
    gain.set(`video_${N}`, 0)
    gain.set(`tv_${N}`, 0)
    gain.set(`unknown_${N}`, 0)
    gain.set(`daily_${N}`, 0)
    Time.set(N,moment())
    Closed.set(N,0)
    if(Maximum.speed == 0) {
        if(Def_Speed >= 1 && Def_Speed !== (null || undefined)) Speed.set(N,Def_Speed)
        else Speed.set(N,1)
    }
    else Speed.set(N,Maximum.speed)
    Videos.set(N,[])
    let set = new Map()
    set.set("Mail",Mail)
    set.set("Password",Password)
    set.forEach(async (map,key) => {
        if(process.env[key] !== (null || undefined)) await map.set(N,process.env[key])
        else if(process.env[`${key}_${N}`] !== (null || undefined)) await map.set(N,process.env[`${key}_${N}`])
        else if(JSON.parse(JSON.stringify(Instances[N]))[key] !== (null || undefined)) await map.set(N,JSON.parse(JSON.stringify(Instances[N]))[key])
        else return reject(`${key} ${N} est vide`)
    })
    if(process.env[`Webhook_${N}`] !== (null || undefined) && process.env[`Webhook_${N}`].startsWith("http")) await Webhooks.set(N,process.env[`Webhook_${N}`])
    else if(Instances[N].Webhook !== (null || undefined)) await Webhooks.set(N,Instances[N].Webhook)
    else if(Webhook_URL !== (null || undefined)) await Webhooks.set(N,Webhook_URL)
    else return reject(`Webhook ${N} est vide`)
    async function Set_Color(cat,def) {
        if(JSON.parse(JSON.stringify(Instances[N]))[cat] !== (null || undefined)) Colors.set(`${cat}_${N}`,JSON.parse(JSON.stringify(Instances[N]))[cat])
        else await Colors.set(`${cat}_${N}`,def)
    }
    await Set_Color("Color","#00ff0a")
    await Set_Color("Color_TV","#300faa")
    await Set_Color("Color_Daily","#300faa")
    if(First_Video == (null || undefined) || !First_Video.startsWith("http")){
        if(process.env.First_Video !== (null || undefined) || !process.env.First_Video.startsWith("http")) First_Video = process.env.First_Video
        else return reject("Pas de vidéo de départ")
    }
    resolve("finish")
})
}
/**
 * @param {puppeteer.ElementHandle} el 
 * @param {String} text 
 * @param {puppeteer.Page} page 
 */
const Typing = (el,text,page) => {
    return new Promise(async resolve => {
        await el.type("a")
        await page.keyboard.down('ControlLeft')
        await page.keyboard.press('A')
        await page.keyboard.up('ControlLeft')
        await page.keyboard.press('Delete')
        for(var i = 0;i<text.length;i++){
            var letter = text.charAt(i)
            await el.type(letter)
            await sleep(200)
        }
        resolve()
    })
}
/**
 * @param {puppeteer.Page} page
 * @param {Number} N
 */
const login = (page,N) => {
    return new Promise(async resolve => {
        async function Remove() {
            try {await page.click("#qc-cmp2-ui > div.qc-cmp2-footer.qc-cmp2-footer-overlay.qc-cmp2-footer-scrolled > div > button.css-k8o10q")} catch {}
        }
        async function Go(){
            try {
                await page.goto(`https://loot.tv`, {waitUntil: 'domcontentloaded'})
                await sleep(3000)
                await Remove()
                await sleep(1000)
                await page.waitForXPath('//*[@id="__next"]/div/div[1]/div[5]/div/a[1]/button')
                .then(el => el.click())
                await sleep(1000)
                if((await page.url() == "https://loot.tv/")) return Go()
                var test = await new Promise(async resolve => {
                    async function Restart() {
                        try {
                            await Remove()
                    await page.waitForSelector("#__next > div > div._app_mainWrappr__G3eiJ > div._app_contentWrapper__KFde2 > div > div > div.AccountForm_accountFormFields__1zE8S > div:nth-child(1) > input[type=email]")
                    .then(async el => await Typing(el,await Mail.get(N),page))
                    await sleep(1000)
                    await page.waitForSelector("#__next > div > div._app_mainWrappr__G3eiJ > div._app_contentWrapper__KFde2 > div > div > div.AccountForm_accountFormFields__1zE8S > div:nth-child(2) > input[type=password]")
                    .then(async el => await Typing(el,await Password.get(N),page))
                    await sleep(1000)
                    await page.evaluate(() => {
                        document.querySelectorAll("iframe").forEach(el => {
                            if(el.title.includes("re") || el.id.includes("re")) el.remove()
                        })
                    })
                    await page.click("#__next > div > div._app_mainWrappr__G3eiJ > div._app_contentWrapper__KFde2 > div > div > div.AccountForm_accountFormButtonWrapper__9nGTl > button", {clickCount: 2})
                    console.log("En cours de check")
                    await sleep(18000)
                    if(page.url() == 'https://loot.tv/account/login'){
                        await Change(y,`log_${N}`,1)
                        if(y.get(`log_${N}`) >=5) return resolve("Bug")
                        await page.reload({waitUntil: 'networkidle2'})
                        await page.reload({waitUntil: 'networkidle2'})
                        await sleep(2000)
                        Restart()
                    } else return resolve()
                    } catch (e){
                        console.log(`Bug Restart login ${e}`)
                        return resolve("Bug")
                    }
                    }
                        Restart()
                })
                    await sleep(1000)
                    resolve(test || "")
                
            } catch (e){
                if(String(e).includes("Session closed")) return resolve("Bug")
                console.log(`Fail Login, restarting.. ${e}`)
                await Change(y,`log_${N}`,1)
                if(y.get(`log_${N}`) >= 5) return resolve("Bug")
                if(String(await page.url()) == ('https://loot.tv/account/login'|| 'https://loot.tv'))Go()
                else return resolve()
            }
        }
            Go()
    })
}
/**
 * @param {Number} N The Number of Instance
 * @param {puppeteer.Browser} browser The Browser
 */

async function launch(N,browser) {
    await Settings(N).then(async res => {
        if(res !== (null || undefined || "finish")) return console.error(res)
    }).catch(r => process.exit(r))
    await sleep(2000)
    if(Mail.get(N) == ('' || null || undefined) || !Mail.get(N).includes("@") || !Mail.get(N).includes(".")) return console.log(`Fail Mail Instance : ${N}`)
    if(Password.get(N) == ('' || null || undefined)) return console.log(`Fail Password Instance : ${N}`)
    if(Webhooks.get(N) == ('' || null || undefined) || !Webhooks.get(N).startsWith("https")) return console.log(`Fail Webhook Instance : ${N}`)
    const LootTv = new Discord.Webhook(Webhooks.get(N))
return new Promise(async resolve => {
    const page = (await browser.pages())[0]
    await page.setDefaultTimeout(40000)
    /**
     * 
     * @param {String} reason Raison
     * @returns nothing
     */
    async function Close(reason) {
        await browser.close()
        if(reason.includes("écoulées")) f++
        await Change(Closed,N,1)
        if(w.get(N) != 0) await Change(Reward,N,2.5)
        json = {
            "Video": w.get(N),
            "Point": Reward.get(N),
            "Time (en min)": moment().diff(Time.get(N), 'minutes'),
            "Gain": {
            "video": gain.get(`video_${N}`),
                //"tv": gain.get(`tv_${N}`),
                "unknown": gain.get(`unknown_${N}`),
                "daily": gain.get(`daily_${N}`)
            },
            "Maximum": Maximum,
            "Close": Closed.get(N)
        }
        console.log(`Close et restart pour l'instance ${N}, raison : ${reason} `+JSON.stringify(json))
        LootTv.send(`Close et restart pour l'instance ${N}, raison : ${reason} `+JSON.stringify(json))
        if(Closed.get(N) > 15) return process.exit(0)
        return resolve()
    }   
        console.log("Connexion en cours..")
        var Restart_Login = await new Promise(resolve => {
            async function Login() {
                var Test_Login = await login(page,N)
                if(Test_Login == "Bug"){
                    if(y.get(`login_${N}`) < 5) {
                        await Change(y,`login_${N}`)
                        Login()
                    } else {
                        try {
                            await page.waitForSelector("#__next > div > div.Topnav_topnavWrapper__wsiGh > div.Topnav_rightSideWrapper__gCpY1 > div > a.Topnav_balanceDisplayWrapper__S58IN > div > span")
                        }
                        catch {
                            resolve("Bug de connexion")
                        }
                    }
                }
                else {
                    await sleep(1000)
                    try{
                        await page.waitForXPath('//*[@id="__next"]/div/div[1]/div[5]/div/a[1]/div/span')
                        resolve()
                    } catch {
                        Login()
                    }
                }
            }
            Login()
    })
    if(Restart_Login !== (null || undefined)) return Close("Bug de connexion")
    await new Promise(async resolve => {async function Goto() {try {await page.goto(First_Video);resolve()} catch {Goto()}}Goto()})
        console.log("Chargement")
        /*
        async function Farm_TV(TV){
            try{
                await TV.bringToFront()
                await TV.click("#cmpwelcomebtnyes > a")
            } catch {
                if(TV.url() == "https://loot.tv/account/login") await Restart_TV()
            }
                    try {
            if(await TV.evaluate(() => document.getElementsByClassName("svg-inline--fa fa-play fa-w-14 ").length) !== 1) await TV.click("#__next > div > div._app_mainWrappr__G3eiJ > div._app_contentWrapper__KFde2 > div > div > div.rewardedtv_adInPlayWrapper__Jj0GC > div.rewardedtv_videoDisplayWrapper__Viymb > div > div.rewardedtv_playButtonWrapper__JPHsP > svg > path")
            await page.bringToFront()
            await sleep(5000)
            Farm_TV(TV)
        } catch (e) {
            if(String(e).includes("#__next")) return Close("Problème TV")
            await page.bringToFront()
            await sleep(5000)
            console.log(`Error TV ${e}`)
        }
        }*/
        async function Farm(){
            if(browser.process().killed || (await browser.pages()).length == 0) return Close("Pas de page disponible")
            const Embed = new Discord.MessageBuilder()
            Embed.setColor(Colors.get(`Color_${N}`))
            try {
                if(y.get(`point_${N}`) == Max_Time_Video*60/Check_Time) return Close(`${Max_Time_Video}min écoulées`)
                var Info = await page.evaluate(() => JSON.parse(document.querySelector("#__NEXT_DATA__").textContent).props)
                var User_Info = Info.initialState.user
                var Point = Math.round(User_Info.balance*1000)/1000
                var Time_Watched = User_Info.dailyReward.secondsWatched/3600
                Daily.set(N,Math.round(Time_Watched)*5+5)
                if(x.get(N) !== Point) {
                    if(String(Point) == "NaN") return Close(`Bug de point`)
                    else if(x.get(N)!== 0){
                        var reason = [];
                        var Gain = Point - x.get(N)
                        if(w.get(N) == 0) {/*
                            const TV = await browser.newPage()
                            await new Promise(async resolve => {async function Rew(){try{await TV.goto(`https://loot.tv/rewardedtv`);resolve()} catch {Rew()}}Rew()})
                            await TV.setDefaultTimeout(1000)
                            Farm_TV(TV)*/
                            if(Active < N+1) Active = (N+1)
                            Time.set(N,moment())
                            console.log(`Farm débute à ${moment().format('H:mm:ss')} pour Instance : ${N}`)
                            Embed.setTitle(`Farm débute à ${moment().format('H:mm:ss')} pour Instance : ${N}`)
                        } else await Change(Reward,N,Gain)
                        if(Number(moment().format("HH")) == 0 && Daily.get(N) != 5) Daily.set(N,5)
                        var views = await new Promise(async resolve => {
                            var watch = 0
                            var spreaded = 0
                            var R = Math.round(Gain*100)/100
                            async function Spread(Res) {
                                var Remainder = Number(Res)
                                var t = Remainder
                                spreaded++
                                if(Math.round(Remainder*100)/100 >= 5) {
                                    var num = Number((Remainder/5).toString().split(".")[0])
                                    if(num*5 >= Daily.get(N)){
                                        await Change(gain,`daily_${N}`,num*5)
                                        await Embed.setColor(Colors.get(`Color_Daily_${N}`))
                                        Total.points += num*5
                                        Remainder -= num*5
                                        reason.push("aux points quotidient")
                                    }
                                }
                                if(Number((Remainder).toFixed(1).split(".")[1]) == (5||6)){
                                    var num  = Number((Remainder/2.5).toString().split(".")[0])
                                    Remainder -= num*2.5
                                    await Change(gain,`video_${N}`,num*2.5)
                                    Total.points += num*2.5
                                    Total.video++
                                    watch += num
                                    reason.push(`à ${num} vidéo`)
                                    y.set(`point_${N}`,0)
                                }/*
                                if(Number((Remainder)*100)/100 <= 1){
                                    var num  = Number((Remainder/0.05).toString().split(".")[0])
                                    if(num !== 0){
                                        Remainder -= num
                                        Total.points += num*0.05
                                        Total.tv++
                                        reason.push(`à ${num} Rewarded TV`)
                                        await db.set(`TV_${N}`,(await db.get(`TV_${N}`)) + num)
                                        await db.set(`gain_tv_${N}`,(await db.get(`gain_tv_${N}`) + num*0.05))
                                    }
                                }*/
                                if(t == Remainder && spreaded == 5) {
                                    reason.push(`à ${t} points inconnus`)
                                    await Change(gain,`unknown_${N}`,t)
                                } else if(Remainder > 0 && spreaded != 5) Spread(Number(Math.round(Remainder*100)/100))
                                else resolve(watch)
                            }
                            Spread(R)
                        })
                        await Change(w,N,views)
                        y.set(`page_${N}`,0)
                        crash = 0
                        var s_time = moment().diff(Time.get(N), 'seconds')/*
                        if(reason.length == 1 && reason[0].includes("Rewarded TV")){
                            Embed.setColor(await db.get(`Color_TV_${N}`))
                            console.log(`Tu as gagné ${(Gain).toFixed(2)} pts grâce ${reason.join(" et ")} ! pour Instance : ${N} (Points totaux : ${Point})`)
                            Embed.setTitle(`Gagné ${(Gain).toFixed(2)} pts grâce ${reason.join(" et ")} pour Instance : ${N}`)
                            .addField("Points totaux / Total",`${Point} / ${Total.points.toFixed(2)}`)
                            .addField("Dollar par mois / Total par mois",`${((Reward.get(N) / (s_time / 60)) * 8 / 10000 * 60 * 24 * 30.4375).toFixed(2)} / ${Total.monthly.toFixed(2)}`)
                        } else {
                            */
                            var c = 0
                            for(let i = 0;i<Active;i++) c += Reward.get(i)
                            Total.monthly = c/Active
                            if((reason.join(" et ").includes("vidéo") && Math.round((s_time / 60) / (w.get(N)-1)*100)/100 < Maximum.money) || (w.get(N) <= Video_to_Speed)){
                                Maximum.dollar = ((((await Reward.get(N))-(await gain.get(`daily_${N}`))) / ((s_time / 60))) * 8 / 10000 * 60 * 24 *30.4375).toFixed(2)
                                Maximum.speed = Speed.get(N)
                                Maximum.money = Math.round((s_time / 60) / (w.get(N)-1)*100)/100
                            }
                            console.log(`Tu as gagné ${(Gain).toFixed(2)} pts grâce ${reason.join(" et ")} ! pour Instance : ${N} (Vidéos vues : ${w.get(N)} ; Vidéos : ${Videos.get(N).length} (Gain Speed : ${(Test.time.add(Test.num,'seconds').diff(moment(),'seconds'))}s ; ${Test.num}) ; Points totaux : ${Point} ; ${((s_time / 60) / (w.get(N)-1)).toFixed(2)}min/vid donc ${((Reward.get(N) / ((s_time / 60))) * 8 / 10000 * 60 * 24 *30.4375).toFixed(2)}$/mois)`)
                            Embed.setTitle(`Gagné ${(Gain).toFixed(2)} pts grâce ${reason.join(" et ")} pour Instance : ${N}`)
                            .addField("Vidéo vues / Vidéos",`${w.get(N)} / ${Videos.get(N).length}`)
                            .addField("Points totaux / Total",`${Point} / ${Total.points.toFixed(2)}`)
                            .addField("Vitesse / Max",`${Speed.get(N)} / ${Maximum.speed} (${Maximum.dollar} ; ${Maximum.money})`)
                            .addField(`Minutes par vidéo`,`${(s_time / 60) / (w.get(N)-1)}`)
                            .addField("Dollar par mois / Total par mois",`${((Reward.get(N) / ((s_time / 60))) * 8 / 10000 * 60 * 24 * 30.4375).toFixed(2)} / ${Total.monthly.toFixed(2)}`)
                        //}
                        if(views > 0 && f != 3 && w.get(N) >= Video_to_Speed){
                            if(Number((s_time / 60) / (w.get(N)-1)) !== (Infinity || NaN || 0)) await Change(Speed,N,Add_Speed)
                            else await Change(Speed,N,- Remove_Speed)
                        }
                        Test.num = 0
                    } else {
                        console.log(`Tu commence avec ${Point} pts avec ${Speed.get(N)} de vitesse pour Instance : ${N}`)
                        Embed.setTitle(`Tu commence avec ${Point} pts avec ${Speed.get(N)} de vitesse pour Instance : ${N}`)
                    }
                    x.set(N,Point)
                    LootTv.send(Embed)
                } else await Change(y,`point_${N}`,1)
                await Change(y,`page_${N}`,1)
        } catch (e){
                if(String(e).includes('#__next') || String(e).includes('textContent')){
                    if(crash == 3) return Close("Bug de Point")
                    else crash++
                }
                else if(!String(e).includes("navigation")){
                    console.log(`Erreur Point ${e}`)
                    console.error(e)
                }
            }
            try{
                await page.evaluate(async () => {
                    let Videos = await document.querySelectorAll("video")
                    let count = 0
                    let t = false
                    let id = 0
                    await Videos.forEach(async (vid,index) => {
                        if(!vid.paused) count++
                        if(vid.className.includes("cnx-video-tag")){
                            id = index
                            if(!vid.paused) {
                                t = true
                            }
                        }
                    })
                    if(count >= 2 && t) Videos.item(id).pause()
                    else if(!t && count == 0)Videos.item(id).play()
                })
            } catch (e){
                if(!String(e).includes("navigation") && !String(e).includes("play")) console.log(`Erreur active video : ${e}`)
            }
            try {
                let url = page.url()
                let List = Videos.get(N)
                let time = await page.evaluate(() => {
                    return new Promise(resolve => {
                        document.querySelectorAll("video").forEach(vid => {
                            if(vid.className.includes("cnx-video-tag")) return resolve({
                                "current": vid.currentTime,
                                "duration": vid.duration
                            })
                        })
                        resolve("nothing")
                    })
                })
                if(time != "nothing"){
                    if(url !== First_Video && time.current > 2){
                        if(!List.some(item => item.url === url)) {
                            List.push({
                            "url": url,
                            "duration": time.duration
                            })
                            if(List.length % 2) await page.reload()
                        }
                        else List[List.length - 1].duration = time.duration
                    }
                }
            } catch (e){
                console.log(`Erreur comptage ${e}`)
            }/*
            try{
                await page.mouse.move(850,450) // document.querySelector("#id_fe9e0e7c44ce457cbf606b513e4e3232 > cnx.cnx-ui-buttons.cnx-ui-bar.cnx-lock-bar-on-hover > cnx:nth-child(2) > cnx > cnx.cnx-btn-container > cnx.cnx-pause-icon > svg > path")
                await page.mouse.move(850+1,450+1)
                await sleep(1000)
                var Set = 0;
                await page.evaluate(async () => {
                    return await new Promise(async resolve => {
                        var List = []
                        var Videos = document.querySelectorAll('video')
                        if(Videos.length !== 0){
                            for(var vid = Videos.item(0),i = 0;i<Videos.length;i++,vid = Videos.item(i)){
                                if(String(vid.duration) !== "NaN") {
                                    if(vid.className.includes("cnx-video-tag")) {
                                        if(vid.playbackRate) List.push({
                                            "play": vid.playbackRate,
                                            "index": i,
                                            "min": vid.currentTime,
                                            "max": vid.duration
                                        })
                                        else resolve(List)
                                    }
                                    else List.push({
                                            "index": i,
                                            "min": vid.currentTime,
                                            "max": vid.duration
                                    })
                                }
                            }
                        }
                        resolve(List)
                    })
                }).then(async Point_Video => {
                    await sleep(2000)
                    if(Point_Video.length !== 0){
                        for(let i = 0;i<Point_Video.length;i++){
                            var Current = Point_Video[i].min
                            var Max = Point_Video[i].max
                            var Percent = (Max-Current)/Max
                            if((Test.list.includes(page.url()) || Test.num == 0) && page.url() !== First_Video){
                                Test.num = Max
                                Test.time = moment().subtract(Current,'seconds')
                                Test.list.push(page.url())
                            }
                            if(Point_Video[i].play !== (null || undefined)){
                                if(Max - Current <= Check_Time*Point_Video[i].play*4) Set = 0.8
                                else Set = 2//(Percent/Speed.get(N))+0.8
                            } else Set = 3*((Percent/Speed.get(N))+1)
                            if(Set < 0.8) Set = 0.8
                            if(Set !== Point_Video[i].play) await page.evaluate(async (Set,Index) => {
                                await new Promise(resolve => {
                                    document.querySelectorAll('video').item(Index).playbackRate = Set
                                    console.log(`Set = ${Set}`)
                                    resolve()
                                })
                            }, Set, Point_Video[i].index)
                        }
                    }
                })
            } catch (e){
                if(String(e).includes("navigation") == false && String(e).includes("Evaluation") == false) console.log(`Erreur time speed ${e}`)
                if(3 >= w.get(N)-(z.get(N)) && w.get(N) >= Max_Time_Video) Speed.set(N, Speed.get(N)- Remove_Speed)
                await z.set(N,w.get(N))
            }*/
            try {
                var error = false
                error = await page.evaluate(() => {
                    return new Promise(resolve => {
                        if(document.querySelector("#__next > div > div._app_mainWrappr__G3eiJ > div._app_sidenavClosed__EhKlt._app_contentWrapper__KFde2 > div > span") !== null) {
                            resolve(true)
                        } else resolve(false)
                    })
                })
                if(error) await page.reload()
            } catch (e) {
                console.log(`Error load page ${e}`)
            }
            try {
                if(Math.random() < 0.5) await page.mouse.wheel({deltaY: -5})
                else await page.mouse.wheel({deltaY: 5})
                await page.waitForSelector("#__next > div > div.Topnav_topnavWrapper__wsiGh > div.Topnav_searchBarWrapper__7Z4vM > div > div.Topnav_inputWrapper__cIwcM > input")
                .then((el) => el.type('b'))
                if(Math.random() < 0.5) await page.waitForSelector("#__next > div > div.Topnav_topnavWrapper__wsiGh > div.Topnav_searchBarWrapper__7Z4vM > div > div.Topnav_inputWrapper__cIwcM > input")
                .then(async() => {
                    await page.keyboard.down('ControlLeft')
                    await page.keyboard.press('A')
                    await page.keyboard.up('ControlLeft')
                    await page.keyboard.press('Delete')
                })
                if(!(await page.url()).includes("https://loot.tv/video/")) return Close("Ne charges pas de vidéo")
                else setTimeout(() => Farm(),Check_Time*1000)
            } catch (e){
                console.log(`Erreur Final Step ${e}`)
                setTimeout(() => Farm(),(moment().diff(Time.get(N), 'seconds') % Check_Time)*1000)
            }
        }
        Farm()
})
}
(async () => {
    var options = {headless: true, defaultViewport: {width:1920,height:1080},executablePath: Chrome, args: ['--no-sandbox', '--disable-setuid-sandbox','--disable-web-security',]}
    if(Hidden == false) options.headless = false
    async function restart(n){
        await Settings(n).then(async res => {
            if(res !== (null || undefined || "finish")) return console.error(res)
            else await launch(n,(await puppeteer.launch(options))).then(() =>  restart(n))
        }).catch(r => process.exit(r))
    }
    for(var N = 0;N+Not_Work<Instances.length;N++){
        await w.set(N,0)
        restart(N)
        await new Promise(async resolve => {
            async function Wait(){
                if(w.get(N) !== 0) resolve()
                else {
                    await sleep(1000)
                    Wait()
                }
            }
            await Wait()
        })
    }
})()
