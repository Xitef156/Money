const moment = require('moment')
const puppeteer = require('puppeteer')
const Discord = require('discord-webhook-node')
const Chromium = require('chromium')
const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
}
const Chrome = Chromium.path
const Webhook_URL = process.env.Webhook
const Colour = "#00ff0a"
const Def_Speed = 1
const Hidden = true
const Check_Time = 10
var Instances = [
    {
        "Mail": process.env.Mail,
        "Password": process.env.Password
    }
]
const First_Video = "https://loot.tv/video/671725"
var Earn = []
async function Typing(el,text){
    return new Promise(async (resolve) => {
        for(var i = 0;i<text.length;i++){
            var letter = text.charAt(i)
            await el.type(letter)
            await sleep(200)
        }
        resolve()
    })
}
async function login(page,Mail,Password) {
    return new Promise(async (resolve) => {
        async function Go(){
            try {
            await page.goto(`https://loot.tv`)
            await sleep(5000)
            if((await page.$("#qc-cmp2-ui > div.qc-cmp2-footer.qc-cmp2-footer-overlay.qc-cmp2-footer-scrolled > div > button.css-k8o10q")) !== (null || undefined))await page.click("#qc-cmp2-ui > div.qc-cmp2-footer.qc-cmp2-footer-overlay.qc-cmp2-footer-scrolled > div > button.css-k8o10q")
            await sleep(1000)
            await page.waitForXPath('//*[@id="__next"]/div/div[1]/div[5]/div/a[1]/button')
            .then(el => el.click())
            await sleep(1000)
            if((await page.url() == "https://loot.tv/")) return Go()
            var test = await new Promise(async (resolve) => {
                async function Restart() {
                    try {
                        await sleep(3000)
                await page.waitForSelector("#__next > div > div._app_mainWrappr__G3eiJ > div._app_contentWrapper__KFde2 > div > div > div.AccountForm_accountFormFields__1zE8S > div:nth-child(1) > input[type=email]")
                .then(async el => {
                    await Typing(el,Mail)
                })
                await sleep(2000)
                await page.waitForSelector("#__next > div > div._app_mainWrappr__G3eiJ > div._app_contentWrapper__KFde2 > div > div > div.AccountForm_accountFormFields__1zE8S > div:nth-child(2) > input[type=password]")
                .then(async el => await Typing(el,Password))
                await sleep(2000)
                await page.click("#__next > div > div._app_mainWrappr__G3eiJ > div._app_contentWrapper__KFde2 > div > div > div.AccountForm_accountFormButtonWrapper__9nGTl > button")
                await sleep(3000)
                if(String(await page.url()) == 'https://loot.tv/account/login'){
                    y.log++
                    await page.reload()
                    await sleep(4000)
                    if(y.log <=5) Restart()
                    else resolve("Bug")
                } else resolve()
            } catch {
                if(String(await page.url()) == 'https://loot.tv/account/login') Restart()
                else resolve()
            }
            }
                Restart()
        })
            await sleep(5000)
            resolve(test || "")
        } catch {
            console.log("Fail Login, restarting..")
            if(String(await page.url()) == ('https://loot.tv/account/login'|| 'https://loot.tv'))Go()
            else resolve()
        }
        }
            Go()
    })
}

async function launch(N) {
return new Promise(async (resolve) => {
    var Mail = Instances[N].Mail
    var Password = Instances[N].Password
    var Webhook = (Instances[N].Webhook || Webhook_URL)
    var Color = (Instances[N].Colour || Colour || "#00ff0a")
    var x = Reward = Active = z = w = 0
    var y = {
        "log": 0,
        "page": 0,
        "point": 0,
    }
    var gain = {
        "video": 0,
        "daily": 0,
        "tv": 0,
        "unknown": 0
    }
    var Time
    var Speed = (Def_Speed || 1)
    if(Active <= N) Active = N
    if(Mail == ('' || null || undefined) || !String(Mail).includes("@") || !String(Mail).includes(".")) return console.log(`Fail Mail Instance : ${N}`)
    if(Password == ('' || null || undefined)) return console.log(`Fail Password Instance : ${N}`)
    if(Webhook == ('' || null || undefined) || !String(Webhook).startsWith("https")) return console.log(`Fail Webhook Instance : ${N}`)
    const LootTv = new Discord.Webhook(Webhook)
    var options = {headless: true, defaultViewport: {width:1920,height:1080},executablePath: Chrome, args: ['--no-sandbox', '--disable-setuid-sandbox']}
    if(Hidden == false) options.headless = false
    const browser = await puppeteer.launch(options);
    const browser_2 = await puppeteer.launch(options);
    await sleep(1000)
    const page = (await browser.pages())[0]
    const TV = (await browser_2.pages())[0]
await page.setDefaultNavigationTimeout(120000)
await TV.setDefaultNavigationTimeout(120000)
    await sleep(5000)
    async function Close(reason) {
        await browser.close()
        await browser_2.close()
        json = {
            "Video": w,
            "Point": Reward,
            "Time (en min)": Number(moment.duration(moment().diff(Time)))/1000/60,
            "Gain": gain
        }
        Earn.push(json)
        Time = null
        Speed = ((Speed-1)/2)+1
        y.page = y.point = y.log = Reward = x = gain.video = gain.tv = gain.unknow = w = 0
        console.log(`Close et restart pour l'instance ${N}, raison : ${reason} `+JSON.stringify(json))
        LootTv.send(`Close et restart pour l'instance ${N}, raison : ${reason} `+JSON.stringify(json))
        resolve()
    }
        if(N == 0) console.log("Connexion en cours..")
        var Test_Login = await login(page,Mail,Password)
        if(Test_Login == "Bug") return Close(`Bug de connexion`)
        await new Promise((resolve) => {
            async function Login_TV() {
                var Test_Login_TV = await login(TV,Mail,Password)
                if(Test_Login_TV == "Bug") Login_TV()
                else resolve()
            }
            Login_TV()
    })
        await page.goto(First_Video)
        await TV.goto(`https://loot.tv/rewardedtv`)
        if(N == 0) console.log("Chargement")
        async function Farm_TV(){
            try{
                await TV.click("#cmpwelcomebtnyes > a")
            } catch {}
                    try {
            if(await TV.evaluate(() => document.getElementsByClassName("svg-inline--fa fa-play fa-w-14 ").length) !== 1) await TV.click("#__next > div > div._app_mainWrappr__G3eiJ > div._app_contentWrapper__KFde2 > div > div > div.rewardedtv_adInPlayWrapper__Jj0GC > div.rewardedtv_videoDisplayWrapper__Viymb > div > div.rewardedtv_playButtonWrapper__JPHsP > svg > path")
            else {
                await sleep(1000)
                Farm_TV()
            }
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
            if(N == 0 && Webhook == (Instances[0].Webhook || Webhook_URL)){
            if(y.point == 72*10/Check_Time) return Close("12min écoulées")
            var Point = await page.evaluate(el => Number(el.textContent.replace(',','.').replace(/\s/g, '').replace("Points",'')),(await page.waitForXPath('//*[@id="__next"]/div/div[1]/div[5]/div/a[1]/div/span')))
            if(x != Point) {
                if(x !== 0){
                    if(Time !== (null || undefined)) w++
                    var reason = [];
                    var Gain = Point - x
                    Farm_TV()
                    if(w == 0) {
                        if(Number((Gain).toFixed(2)) < 2.5) return setTimeout(() => Farm(),10000)
                        Time = moment()
                        console.log(`Farm débute à ${Time.format('H:mm:ss')}`)
                        Embed.setTitle(`Farm débute à ${Time.format('H:mm:ss')}`)
                        w++
                        Reward -= Gain
                    }
                    Reward += Gain
                    var views = await new Promise((resolve) => {
                        var watch = 0
                        var Remainder = Number((Gain).toFixed(2))
                    async function Spread() {
                        var t = Remainder
                    if(Number((Remainder).toFixed(2)) >= 5) {
                        var num = Number((Remainder/5).toString().split(".")[0])
                        gain.daily += num*5
                        Remainder -= num*5
                        reason.push("aux points quotidient")
                    }
                    if(Number((Remainder).toFixed(1).split(".")[1]) == (5||6)){
                        var num  = Number((Remainder/2.5).toString().split(".")[0])
                        Remainder -= num*2.5
                        gain.video += num*2.5
                        watch += num
                        reason.push(`à ${num} vidéo`)
                        y.point = 0
                    }
                    if(Number((Remainder).toFixed(2)) <= 1){
                        var num  = Number((Remainder/0.05).toString().split(".")[0])
                        if(num !== 0){
                            Remainder -= num
                            reason.push(`à ${num} Rewarded TV`)
                            gain.tv += num*0.05
                        }
                    }
                    if(t == Remainder) {
                        reason.push(`à ${t} points inconnus`)
                        gain.unknown += t
                    }
                    if(Remainder > 0 && t !== Remainder) Spread()
                    else resolve(watch)
                }
                Spread()
            })
            w += views - 1
                    var ms_time = Number(moment.duration(moment().diff(Time)))
                    console.log(`Tu as gagné ${(Gain).toFixed(2)} pts grâce ${reason.join(" et ")} ! (Vidéos vues : ${w} ; Points totaux : ${Point} ;  ${gain.video/w}pts/vid et ${(ms_time /1000 / 60) / (w-1)}min/vid donc ${(Reward / ((ms_time /1000 / 60))) * 8 / 10000 * 60 * 24 *30.4375}$/mois)`)
                    Embed.setTitle(`Gagné ${(Gain).toFixed(2)} pts grâce ${reason.join(" et ")} pour Instance : ${N}`)
                    .addField("Vidéo vues",`${w}`)
                    .addField("Points totaux",`${Point}`)
                    .addField("Vitesse",`${Speed}`)
                    .addField(`Points par vidéo pour ${Active+1} Instances`,`${gain.video/w}`)
                    .addField(`Minutes par vidéo pour ${Active+1} Instances`,`${(ms_time /1000 / 60) / (w-1)}`)
                    .addField("Dollar par mois",`${((Reward) / ((ms_time /1000 / 60))) * 8 / 10000 * 60 * 24 * 30.4375}`)
                    x = Point
                    if(views > 0){
                        if(Number((ms_time /1000 / 60) / (w-1)) !== (Infinity || 0) && (ms_time /1000 / 60) / (w-1) < 5) Speed += 0.01
                        else Speed -= 0.01
                    }
                } else {
                    x = Point
                    console.log(`Tu commence avec ${Point} pts avec ${Speed} de vitesse`)
                    Embed.setTitle(`Tu commence avec ${Point} pts avec ${Speed} de vitesse`)
                }
                LootTv.send(Embed)
            } else y.point++
            y.page++
        }
        } catch (e){
            if(`${e}`.includes('.//*[@id="__next"]/div/div[1]/div[5]/div/a[1]/div/span')) return Close("Bug de Point")
            else console.log(`Erreur Point ${e}`)
        }
        try{
            await page.mouse.move(1000,Math.random(20)+500)
            await page.mouse.move(1000,Math.random(20)+500)
            if(await page.url() !== First_Video){
            await sleep(1000)
            var Set;
            var Vids = []
            Vids = await page.evaluate(async (List) => {
                for(let i;i<document.querySelectorAll('cnx-span');i++){
                    var el = document.querySelectorAll('cnx-span').item(i)
                if(el.innerHTML.length == 5 && el.innerHTML.includes(":")) {
                    var Split = el.textContent.split(":")
                    List.push(Split[0]*60 + Split[1])
                }
                }
                return List
            },Vids)
            await sleep(1000)
            if((await Vids.length) == (2 || 3)){
            if((await Vids.length) == 3) Vids.shift()
            var Point_Video = await page.evaluate((Speed) => {
                for(let i;i<document.querySelectorAll('video').length;i++){
                    var vid = document.querySelectorAll('video').item(i)
                    if(vid.className.includes("cnx-video-tag")) return {
                        "bool": true,
                        "play": vid.playbackRate
                    }
                    else {
                        vid.playbackRate = Speed
                        return {
                            "bool": false,
                            "play": 1
                        }
                    }
                }
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
            await page.evaluate((S) => {
                for(let i;i<document.querySelectorAll('video').length;i++){
                    var vid = document.querySelectorAll('video').item(i)
                    if(vid.className.includes("cnx-video-tag")) vid.playbackRate = S
                }
            }, Set)
            console.log(`Video Speed set to ${Set}`)
        }
        }
        } catch (err){
            if (typeof err === 'object') {
                if (err.message) {
                    console.log(`Erreur time speed ${err.message}`)
                }
                if (err.stack) {
                  console.log(err.stack);
                }
              } else console.log(`Erreur time speed ${err}`)
            if(3 >= w-z) Speed -= 0.01
            z = w
        }
        try{
            if((await page.$x('//*[@id="__next"]/div/div[2]/div[2]/div/div/div[2]/div[2]/cnx/cnx/cnx[2]/cnx/cnx[3]/cnx[1]/cnx[1]/cnx[1]/cnx[2]/cnx/cnx-span')
            || (await page.$x('//*[@id="id_807c75746d6f426c82c1eaac3ffc46ea"]/cnx[7]/cnx[1]/cnx-span/cnx/cnx-span')) == (null || undefined))) {
                if(y.page == 12*10/Check_Time) await page.reload()
            }
            else y.page = 0
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
            else setTimeout(() => Farm(),Check_Time*1000)
        } catch (e){
            console.log(`Erreur Final Step ${e}`)
            setTimeout(() => Farm(),Check_Time*1000)
        }
    }
    Farm()
})
}
async function restart(n){
    await launch(n).then(() => restart(n))
}
restart(0)
