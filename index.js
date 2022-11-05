const moment = require('moment')
const puppeteer = require('puppeteer')
const Discord = require('discord-webhook-node')
var Instances = [
  {
    "Mail": process.env.Mail,
    "Password": process.env.password
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
const Webhook_URL = process.env.Webhook_URL
const Colour = Options.Color
const Colour_TV = Options.Colour_TV
const Def_Speed = Options.Def_Speed
const Hidden = Options.Hidden
const Check_Time = Options.Check_Time
const First_Video = process.env.First_Video
const Not_Work = Options["Instances_Don\'t_Work"]
var Active = 0;
var f = 0;
var Maximum = {
    "dollar": 0,
    "speed": 0
};
var Total = {
    "points": 0,
    "monthly": {
        "int": [],
        "total": 0
    },
    "tv": 0,
    "video": 0
}
async function Typing(el,text,page){
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
async function login(page,N) {
    return new Promise(async resolve => {
        async function Go(){
            try {
            await page.goto(`https://loot.tv`)
            await sleep(5000)
            try {await page.click("#qc-cmp2-ui > div.qc-cmp2-footer.qc-cmp2-footer-overlay.qc-cmp2-footer-scrolled > div > button.css-k8o10q")} catch {}
            await sleep(1000)
            await page.waitForXPath('//*[@id="__next"]/div/div[1]/div[5]/div/a[1]/button')
            .then(el => el.click())
            await sleep(1000)
            if((await page.url() == "https://loot.tv/")) return Go()
            var test = await new Promise(async resolve => {
                async function Restart() {
                    try {
                        await sleep(3000)
                await page.waitForSelector("#__next > div > div._app_mainWrappr__G3eiJ > div._app_contentWrapper__KFde2 > div > div > div.AccountForm_accountFormFields__1zE8S > div:nth-child(1) > input[type=email]")
                .then(async el => await Typing(el,(Mail),page))
                await sleep(2000)
                await page.waitForSelector("#__next > div > div._app_mainWrappr__G3eiJ > div._app_contentWrapper__KFde2 > div > div > div.AccountForm_accountFormFields__1zE8S > div:nth-child(2) > input[type=password]")
                .then(async el => await Typing(el,(Paswword),page))
                await sleep(2000)
                await page.click("#__next > div > div._app_mainWrappr__G3eiJ > div._app_contentWrapper__KFde2 > div > div > div.AccountForm_accountFormButtonWrapper__9nGTl > button")
                await sleep(3000)
                if(String(await page.url()) == 'https://loot.tv/account/login'){
                    y.log++
                    await page.reload()
                    await page.reload()
                    await sleep(4000)
                    if(y.log <=5) Restart()
                    else resolve("Bug")
                } else resolve()
            } catch {
                resolve("Bug")
            }
            }
                Restart()
        })
            await sleep(5000)
            resolve(test || "")
        } catch {
            console.log(`Fail Login, restarting.. `)
            if(String(await page.url()) == ('https://loot.tv/account/login'|| 'https://loot.tv'))Go()
            else resolve()
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
    var Mail = Instances[N].Mail
    var Password = Instances[N].Password
    var Color = ""
    var Color_TV = ""
    var Webhook = ""
    if(Instances[N].Webhook !== (null || undefined)) Webhook = Instances[N].Webhook
    else Webhook = Webhook_URL
    if(Instances[N].Colour !== (null || undefined)) Color = Instances[N].Colour
    else if(Colour !== (null || undefined)) Color = Colour
    else Color = "#00ff0a"
    if(Instances[N].Colour_TV !== (null || undefined)) Color_TV = Instances[N].Colour_TV
    else if(Colour_TV !== (null || undefined)) Color_TV = Colour_TV
    else Color_TV = "#300faa"
    var x = Reward = z = w = tv = time = 0
    var y = {
        "log": 0,
        "login": 0,
        "point": 0,
        "page": 0
    }
    var gain = {
        "video": 0,
        "tv": 0,
        "unknown": 0,
        "daily": 0
    }
    if(Maximum.speed == 0) {
        if(Def_Speed >= 1) Speed = Def_Speed
        else Speed = 1
    }
    else Speed = Maximum.speed
    if(Active <= N) Active = N
    if(String(Mail) == ('' || null || undefined) || !String(Mail).includes("@") || !String(Mail).includes(".")) return console.log(`Fail Mail Instance : ${N}`)
    if(String(Password) == ('' || null || undefined)) return console.log(`Fail Password Instance : ${N}`)
    if(String(Webhook) == ('' || null || undefined) || !String(Webhook).startsWith("https")) return console.log(`Fail Webhook Instance : ${N}`)
    const LootTv = new Discord.Webhook(Webhook)
return new Promise(async resolve => {
    const page = (await browser.pages())[0]
    page.setDefaultTimeout(20000)
    async function Close(reason) {
        await browser.close()
        if(reason == "12min écoulées") f++
        json = {
            "Video": w,
            "Point": (Reward)+2.5,
            "Time (en min)": Time/60,
            "Gain": gain,
            "Maximum": Maximum
        }
        console.log(`Close et restart pour l'instance ${N}, raison : ${reason} `+JSON.stringify(json))
        LootTv.send(`Close et restart pour l'instance ${N}, raison : ${reason} `+JSON.stringify(json))
        resolve()
    }
        if(N == 0) console.log("Connexion en cours..")
        var Restart_Login = await new Promise(resolve => {
            async function Login() {
                var Test_Login = await login(page,N)
                if(Test_Login == "Bug"){
                    if(y.login < 5) {
                    Login()
                    y.login = 0
                } else resolve("Bug de connexion")
            }
                else {
                    await sleep(3000)
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
        if(N == 0) console.log("Chargement")
        async function Farm_TV(TV){
            try{
                await TV.bringToFront()
                await TV.click("#cmpwelcomebtnyes > a")
            } catch {
                if(TV.url() == "https://loot.tv/account/login") await Restart_TV()
            }
                    try {
                        await TV.bringToFront()
            if(await TV.evaluate(() => document.getElementsByClassName("svg-inline--fa fa-play fa-w-14 ").length) !== 1) await TV.click("#__next > div > div._app_mainWrappr__G3eiJ > div._app_contentWrapper__KFde2 > div > div > div.rewardedtv_adInPlayWrapper__Jj0GC > div.rewardedtv_videoDisplayWrapper__Viymb > div > div.rewardedtv_playButtonWrapper__JPHsP > svg > path")
            await page.bringToFront()
            await sleep(5000)
            Farm_TV(TV)
        } catch (e) {
            if(`${e}`.includes("#__next")) return Close("Problème TV")
            console.log(`Error TV ${e}`)
        }
        }
        async function Farm(){
        if((await browser.pages()).length == (null || undefined || 0)) return Close()
        const Embed = new Discord.MessageBuilder()
        Embed.setColor(Color)
        try {
            if(y.point == 72*10/Check_Time) return Close("12min écoulées")
            var Point = await page.evaluate(el => Number(el.textContent.replace(',','.').replace(/\s/g, '').replace("Points",'')),await page.waitForXPath('//*[@id="__next"]/div/div[1]/div[5]/div/a[1]/div/span'))
            if(x != Point) {
                if(x !== 0){
                    var reason = [];
                    var Gain = Point - x
                    if(w == 0) {
                        const TV = await browser.newPage()
                        await new Promise(async resolve => {async function Rew(){try{await TV.goto(`https://loot.tv/rewardedtv`);resolve()} catch {Rew()}}Rew()})
                        await TV.setDefaultTimeout(1000)
                        Farm_TV(TV)
                        if(Number((Gain).toFixed(2)) < 2.5) return setTimeout(() => Farm(),10000)
                        console.log(`Farm débute à ${moment().format('H:mm:ss')} pour Instance : ${N}`)
                        Embed.setTitle(`Farm débute à ${moment().format('H:mm:ss')} pour Instance : ${N}`)
                    } else Reward += Gain
                    var views = await new Promise(async resolve => {
                        var watch = 0
                        var spreaded = 0
                        var R = Number((Gain).toFixed(2))
                    async function Spread(Res) {
                        var Remainder = Number(Res)
                        var t = Remainder
                        spreaded++
                    if(Number((Remainder).toFixed(2)) >= 5) {
                        var num = Number((Remainder/5).toString().split(".")[0])
                        gain.daily += num*5
                        Total.points += num*5
                        Remainder -= num*5
                        reason.push("aux points quotidient")
                    }
                    if(Number((Remainder).toFixed(1).split(".")[1]) == (5||6)){
                        var num  = Number((Remainder/2.5).toString().split(".")[0])
                        Remainder -= num*2.5
                        gain.video += num*2.5
                        Total.points += num*2.5
                        Total.video++
                        watch += num
                        reason.push(`à ${num} vidéo`)
                        y.point = 0
                    }
                    if(Number((Remainder).toFixed(2)) <= 1){
                        var num  = Number((Remainder/0.05).toString().split(".")[0])
                        if(num !== 0){
                            Remainder -= num
                            Total.points += num*0.05
                            Total.tv++
                            reason.push(`à ${num} Rewarded TV`)
                            tv += num
                            gain.tv += num*0.05
                        }
                    }
                    if(t == Remainder && spreaded == 5) {
                        reason.push(`à ${t} points inconnus`)
                        gain.unknown += t
                    } else if(Remainder > 0 && spreaded != 5) Spread(Number(Number(Remainder).toFixed(2)))
                    else resolve(watch)
                }
                Spread(R)
            })
            w += views
                    var s_time = Time
                    Total.monthly.int.push((Reward) / ((s_time / 60) * 8 / 10000 * 60 * 24 *30.4375))
                    Total.monthly.total = (Total.monthly.int.reduce((partialSum, a) => partialSum + a, 0)/(Total.monthly.int.length*(Active+1)))
                    if(reason.length == 1 && reason[0] == "à 1 Rewarded TV"){
                        Embed.setColor(Color_TV)
                        console.log(`Tu as gagné ${(Gain).toFixed(2)} pts grâce ${reason.join(" et ")} ! pour Instance : ${N} (Points totaux : ${Point})`)
                        Embed.setTitle(`Gagné ${(Gain).toFixed(2)} pts grâce ${reason.join(" et ")} pour Instance : ${N}`)
                        .addField("Points totaux / Total",`${Point} / ${Total.points.toFixed(2)}`)
                        .addField("Dollar par mois / Total par mois",`${(((Reward) / ((s_time / 60))) * 8 / 10000 * 60 * 24 * 30.4375).toFixed(2)} / ${Total.monthly.total.toFixed(2)}`)
                    } else {
                        if((((Reward) / ((s_time / 60))) * 8 / 10000 * 60 * 24 *30.4375).toFixed(2) > Maximum.dollar){
                            Maximum.dollar = (((Reward) / ((s_time / 60))) * 8 / 10000 * 60 * 24 *30.4375).toFixed(2)
                            Maximum.speed = (Speed)
                        }
                        console.log(`Tu as gagné ${(Gain).toFixed(2)} pts grâce ${reason.join(" et ")} ! pour Instance : ${N} (Vidéos vues : ${w} ; Points totaux : ${Point} ; ${((s_time / 60) / (w-1)).toFixed(2)}min/vid donc ${(((Reward) / ((s_time / 60))) * 8 / 10000 * 60 * 24 *30.4375).toFixed(2)}$/mois)`)
                        Embed.setTitle(`Gagné ${(Gain).toFixed(2)} pts grâce ${reason.join(" et ")} pour Instance : ${N}`)
                        .addField("Vidéo vues / TV vues / Total_video / Total TV",`${w} et ${tv} / ${Total.video} et ${Total.tv}`)
                        .addField("Points totaux / Total",`${Point} / ${Total.points.toFixed(2)}`)
                        .addField("Vitesse / Max",`${Speed} / ${Maximum.speed} (${Maximum.dollar})`)
                        .addField(`Minutes par vidéo`,`${(s_time / 60) / (w-1)}`)
                        .addField("Dollar par mois / Total par mois",`${(((Reward) / ((s_time / 60))) * 8 / 10000 * 60 * 24 * 30.4375).toFixed(2)} / ${Total.monthly.total.toFixed(2)}`)
                }
                        if(views > 0 && f != 3){
                        if(Number((s_time / 60) / (w-1)) !== (Infinity || NaN || 0) && (s_time / 60) / (w-1) < 5) speed += 0.01
                        else Speed -= 0.01
                    }
                    x = Point
                } else {
                    x = Point
                    console.log(`Tu commence avec ${Point} pts avec ${Speed} de vitesse pour Instance : ${N}`)
                    Embed.setTitle(`Tu commence avec ${Point} pts avec ${Speed} de vitesse pour Instance : ${N}`)
                }
                LootTv.send(Embed)
            } y.point++
            y.page++
        } catch (e){
            if(`${e}`.includes('.//*[@id="__next"]/div/div[1]/div[5]/div/a[1]/div/span')) return Close("Bug de Point")
            else {
                console.log(`Erreur Point ${e}`)
                console.error(e)
            }
        }
        try{
            await page.mouse.move(1000,Math.random(20)+500)
            await page.mouse.move(1000,Math.random(20)+500)
            if(page.url() !== First_Video){
            await sleep(1000)
            var Set;
            var Vids = await page.evaluate(() => {
                return new Promise(resolve => {
                    var Spans = document.querySelectorAll('cnx-span')
                    var List = []
                    for(let i;i<Spans.length;i++){
                        var el = Spans.item(i)
                    if(el.innerHTML.length == 5 && el.innerHTML.includes(":")) {
                        var Split = el.textContent.split(":")
                        List.push(Split[0]*60 + Split[1])
                    }
                    }
                    resolve(List)
                })
            })
            await sleep(2000)
            if((await Vids.length) == (2 || 3)){
            if((await Vids.length) == 3) Vids.shift()
            var Point_Video = await page.evaluate((Speed) => {
                return new Promise(resolve => {
                for(let i;i<document.querySelectorAll('video').length;i++){
                    var vid = document.querySelectorAll('video').item(i)
                    if(vid.className.includes("cnx-video-tag")) resolve({
                        "bool": true,
                        "play": vid.playbackRate
                    })
                    else {
                        vid.playbackRate = Speed
                        resolve({
                            "bool": false,
                            "play": 1
                        })
                    }
                }
            })
            },Speed)
            if(Point_Video.bool == true){
                var Current = Vids[0]
                var Max = Vids[1]
                var Percent = Max/Current
                if(Percent > Speed*2){
                    var Splice = `${Percent.toFixed()}`
                    Percent = Percent/(Math.pow(10,Splice.length))
                }
                if(Current + (5*(Point_Video.play.toFixed(1)+1 || Speed)) >= Max) Set = 0.8
                else Set = Percent*Speed+Speed
            } else Set = Speed
            if(Set > Speed) Set = Speed-0.1
            await page.evaluate(S => {
                return new Promise(resolve => {
                    for(let i;i<document.querySelectorAll('video').length;i++){
                        var vid = document.querySelectorAll('video').item(i)
                        if(vid.className.includes("cnx-video-tag")) vid.playbackRate = S
                    }
                    resolve()
                })
            }, Set)
            console.log(`Video Speed set to ${Set}`)
        }
        }
        } catch (err){
            console.log(`Erreur time speed ${err}`)
            if(3 >= w-z) Speed -= 0.01
            z = w
        }
        try{
            if((await page.$x('//*[@id="__next"]/div/div[2]/div[2]/div/div/div[2]/div[2]/cnx/cnx/cnx[2]/cnx/cnx[3]/cnx[1]/cnx[1]/cnx[1]/cnx[2]/cnx/cnx-span')
            || (await page.$x('//*[@id="id_807c75746d6f426c82c1eaac3ffc46ea"]/cnx[7]/cnx[1]/cnx-span/cnx/cnx-span')) == (null || undefined))) {
                if(y.page == 12*10/Check_Time) await page.reload()
            }
            else y.page++
        } catch {
            console.log("Erreur time video")
        }
        try {
            if(Boolean(Math.round(Math.random()))) await page.mouse.wheel({deltaY: -5})
            else await page.mouse.wheel({deltaY: 5})
            await page.waitForSelector("#__next > div > div.Topnav_topnavWrapper__wsiGh > div.Topnav_searchBarWrapper__7Z4vM > div > div.Topnav_inputWrapper__cIwcM > input")
            .then((el) => el.type('b'))
            if(Boolean(Math.round(Math.random()))) await page.waitForSelector("#__next > div > div.Topnav_topnavWrapper__wsiGh > div.Topnav_searchBarWrapper__7Z4vM > div > div.Topnav_inputWrapper__cIwcM > input")
            .then(async() => await page.keyboard.press('Delete'))
            if(!(await page.url()).includes("https://loot.tv/video/")) return Close("Ne charges pas de vidéo")
            else {
                if(N == 0) Time += Check_Time
                setTimeout(() => Farm(),Check_Time*1000)
            }
        } catch (e){
            console.log(`Erreur Final Step ${e}`)
            setTimeout(() => Farm(),Check_Time*1000)
        }
    }
    Farm()
})
}
(async () => {
  var RES = require('path').resolve;
  const Chromium = require('chromium');
  await Chromium.install().then(async () => {
var options = {headless: true,executablePath: RES(Chromium.path), args: ['--no-sandbox', '--disable-setuid-sandbox']}
if(Hidden == false) options.headless = false
async function restart(n){await launch(n,(await puppeteer.launch(options))).then(() => restart(n))}
for(var i = 0;i+Not_Work<Instances.length;i++){restart(i)}
})
})()
