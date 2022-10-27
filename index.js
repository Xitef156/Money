const moment = require('moment')
const puppeteer = require('puppeteer')
const Discord = require('discord.js')
const Chrome = require('chromium')
const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
}

const Webhook_URL = "https://discord.com/api/webhooks/1033417167049347204/LSlbtI04j0fIUVRZ9j00Kc3uQ3DQcU6gkLXSynu5XT6r8OYkNNylBi8PbH2I9WtTZYpW"
const Colour = "#00ff0a"
const Default_Speed = 1
const Hidden = true
var Instances = [
    {
        "Mail": "alexiswiiu@gmail.com",
        "Password": "bellot99"
    }
]
const First_Video = "https://loot.tv/video/671725"
var x = 0
var y = {
    "log": 0,
    "page": 0,
    "point": 0,
}
var z = 0;
var w = -1
var gain = {
    "video": 0,
    "daily": 0,
    "tv": 0
}
var Time
var Reward
var Active = 0;
var Earn = []
var Speed = (Default_Speed || 1)
async function Typing(el,text = ""){
    for(var i = 0;i<text;i++){
        var letter = text.charAt(i)
        await el.type(letter)
        await sleep(200)
    }
}
async function Try_Login(page,Mail,Password) {
    return new Promise(async (resolve) => {
        async function Restart() {
            try {
                await sleep(3000)
        await page.waitForSelector("#__next > div > div._app_mainWrappr__G3eiJ > div._app_contentWrapper__KFde2 > div > div > div.AccountForm_accountFormFields__1zE8S > div:nth-child(1) > input[type=email]")
        .then(el => Typing(el,Mail))
        await sleep(2000)
        await page.waitForSelector("#__next > div > div._app_mainWrappr__G3eiJ > div._app_contentWrapper__KFde2 > div > div > div.AccountForm_accountFormFields__1zE8S > div:nth-child(2) > input[type=password]")
        .then(el => Typing(el,Password))
        await sleep(2000)
        await page.waitForSelector("#__next > div > div._app_mainWrappr__G3eiJ > div._app_contentWrapper__KFde2 > div > div > div.AccountForm_accountFormButtonWrapper__9nGTl > button")
        .then(el => el.click())
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
}
async function login(page,Mail,Password) {
    return new Promise(async (resolve) => {
        async function Go(){
            try {
            await page.goto(`https://loot.tv`)
            await sleep(5000)
            if((await page.$("#qc-cmp2-ui > div.qc-cmp2-footer.qc-cmp2-footer-overlay.qc-cmp2-footer-scrolled > div > button.css-k8o10q")) !== (null || undefined))await page.waitForSelector("#qc-cmp2-ui > div.qc-cmp2-footer.qc-cmp2-footer-overlay.qc-cmp2-footer-scrolled > div > button.css-k8o10q").then(el => el.click())
            await sleep(1000)
            await page.waitForXPath('//*[@id="__next"]/div/div[1]/div[5]/div/a[1]/button')
            .then(el => el.click())
            await sleep(1000)
            if((await page.url() == "https://loot.tv/")) return Go()
            var test = await Try_Login(page,Mail,Password)
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
    if(Active <= N) Active = N
    if(Mail == ('' || null || undefined) || !String(Mail).includes("@") || !String(Mail).includes(".")) return console.log(`Fail Mail Instance : ${N}`)
    if(Password == ('' || null || undefined)) return console.log(`Fail Password Instance : ${N}`)
    if(Webhook == ('' || null || undefined) || !String(Webhook).startsWith("https")) return console.log(`Fail Webhook Instance : ${N}`)
    const LootTv = new Discord.WebhookClient({url: Webhook})
    var options = {headless: true, defaultViewport: {width:1920,height:1080}, executablePath: Chrome.path, args: ['--no-sandbox']}
    if(Hidden == false) options.headless = false
    const browser = await puppeteer.launch(options);
    await sleep(1000)
    const page = (await browser.pages())[0]
    await page.setDefaultTimeout(0)
    await sleep(5000)
    async function Close(reason) {
        await browser.close()
        Speed = Default_Speed
        json = {
            "Video": w,
            "Point": Reward,
            "Time (en min)": Number(moment.duration(moment().diff(Time)))/1000/60,
            "Gain": gain
        }
        Earn.push(json)
        y.page = y.point = y.log = Reward = x = 0
        w = -1
        console.log(`Close et restart pour l'instance ${N}, raison : ${reason} `+JSON.stringify(json))
        LootTv.send(`Close et restart pour l'instance ${N}, raison : ${reason} `+JSON.stringify(json))
        resolve()
    }
        if(N == 0) console.log("Connexion en cours..")
        var Test_Login = await login(page,Mail,Password)
        if(Test_Login == "Bug") return Close(`Bug de connexion`)
        await page.goto(First_Video)
        if(N == 0) console.log("Chargement")
        async function Farm(){
        if((await browser.pages()).length == (null || undefined || 0)) return Close()
        const Embed = new Discord.EmbedBuilder()
        Embed.setColor(Color)
        try {
            if(N == 0 && Webhook == (Instances[0].Webhook || Webhook_URL)){
            if(y.point == 72) return Close("12min écoulées")
        if((await page.$x('//*[@id="__next"]/div/div[1]/div[5]/div/a[1]/div/span')) == (null || undefined)) return console.log('No Point')
        Point = await page.evaluate(el => Number(el.textContent.replace(',','.').replace(/\s/g, '').replace("Points",'')),(await page.waitForXPath('//*[@id="__next"]/div/div[1]/div[5]/div/a[1]/div/span')))
        if(x != Point) {
            if(x !== 0){
                w++
                var reason = "";
                if(w == 0) {
                    Time = moment()
                    console.log(`Farm débute à ${Time.format('H:mm:ss')}`)
                    Embed.setTitle(`Farm débute à ${Time.format('H:mm:ss')}`)
                    w++
                    Reward -= Point - x
                }
                Reward += Point - x
                if(Point - x == (5 || 10 || 15 || 20)) {
                    gain.daily += Point - x
                    w--
                    reason = "aux points quotidient"
                } else if(Point - x == 2.5 ){
                    gain.video += Point - x
                    reason = "à une vidéo"
                } else if(Point - x == 2.55){
                    reason = "à une vidéo et Rewarded TV"
                    gain.video += 2.5
                    gain.tv += 0.05
                } else if(Point - x == 0.05){
                    w--
                    reason = "à Rewarded TV"
                    gain.tv += Point - x
                } else {
                    reason = "Inconnu"
                    w--
                }
                var ms_time = Number(moment.duration(moment().diff(Time)))
                console.log(`Tu as gagné ${(Point - x).toFixed(2)} pts grâce ${reason} ! (Vidéos vues : ${w} ; Points totaux : ${Point} ;  ${gain.video/(w-1)}pts/vid et ${(ms_time /1000 / 60) / (w-1)}min/vid donc ${((gain.video/(w-1)) / ((ms_time /1000 / 60) / (w-1))) * 8 / 10000 * 60 * 24 *30.45083333333334}$/mois)`)
                Embed.setTitle(`Gagné ${(Point - x).toFixed(2)} pts grâce ${reason} pour Instance : ${N}`)
                Embed.addFields(
                    {name: "Vidéo vues", value: `${w}`},
                    {name: "Points totaux", value: `${Point}`},
                    {name: "Vitesse", value: `${Speed}`},
                    {name: `Points par vidéo pour ${Active+1} Instances`, value: `${gain.video/(w-1)}`},
                    {name: `Minutes par vidéo pour ${Active+1} Instances`, value: `${(ms_time /1000 / 60) / (w-1)}`},
                    {name: "Dollar par mois", value: `${((gain.video/(w-1)) / ((ms_time /1000 / 60) / (w-1))) * 8 / 10000 * 60 * 24 * 30.45083333333334}`},
                )
                x = Point
                y.point = 0
            }else {
                console.log(`Tu commence avec ${Point} pts avec ${Speed} de vitesse`)
                Embed.setTitle(`Tu commence avec ${Point} pts avec ${Speed} de vitesse`)
                x = Point
            }
            LootTv.send({embeds: [Embed]})
        } else y.point++
    }
    } catch (e){
        console.log(`Erreur Point ${e}`)
    }
        y.page++
        try{
            await page.mouse.move(1000,Math.random(20)+500)
            await page.mouse.move(1000,Math.random(20)+500)
            if(!(await page.url()).includes(First_Video)){
                await sleep(1000)
                async function Fast(Speed){
                    var Vids = [];
                    var Percent;
                    var Set;
                    document.querySelectorAll('cnx-span').forEach(async el => {
                        if(el.innerHTML.length == 5 && el.innerHTML.includes(":")) {
                            var Split = el.textContent.split(":")
                            Vids.push(Split[0]*60 + Split[1])
                        }
                    })
                    if((await Vids.length) == (2 || 3)) {
                    if((await Vids.length) == 3) Vids.shift()
                    document.querySelectorAll('video').forEach(async vid => {
                        vid.playbackRate = Speed
                        if(vid.className.includes("cnx-video-tag")) {
                        var Current = Vids[0]
                        var Max = Vids[1]
                        Percent = Max/Current
                        if(Percent > Speed*2){
                            var Splice = `${Percent.toFixed()}`
                            Percent = Percent/(Math.pow(10,Splice.length))
                        }
                        if(Current + (5*(vid.playbackRate.toFixed(1)+1 || Speed)) >= Max) Set = 0.8
                        else Set = Percent*Speed+Speed
                        if(Set > Speed) Set = Speed-0.1
                        vid.playbackRate = Set
                        }
                    })
                }
                }
                await page.addScriptTag({content: `${Fast}`})
            await page.evaluate((Sp) => Fast(Sp),Speed)
        }
        } catch (e){
            console.log(`Erreur time speed ${e}`)
            if(3 >= w-z) Speed -= 0.01
            z = w
        }
        try{
        if((await page.$x('//*[@id="__next"]/div/div[2]/div[2]/div/div/div[2]/div[2]/cnx/cnx/cnx[2]/cnx/cnx[3]/cnx[1]/cnx[1]/cnx[1]/cnx[2]/cnx/cnx-span')
        || (await page.$x('//*[@id="id_807c75746d6f426c82c1eaac3ffc46ea"]/cnx[7]/cnx[1]/cnx-span/cnx/cnx-span')) == (null || undefined))) {
            if(y.page == 12) await page.reload()
        }
        else y.page = 0
    } catch {
        console.log("Erreur time video")
    }
        if(Boolean(Math.round(Math.random()))) await page.mouse.wheel({deltaY: -5})
        else await page.mouse.wheel({deltaY: 5})
        await page.waitForSelector("#__next > div > div.Topnav_topnavWrapper__wsiGh > div.Topnav_searchBarWrapper__7Z4vM > div > div.Topnav_inputWrapper__cIwcM > input")
        .then((el) => el.type('b'))
        if(Boolean(Math.round(Math.random()))) await page.waitForSelector("#__next > div > div.Topnav_topnavWrapper__wsiGh > div.Topnav_searchBarWrapper__7Z4vM > div > div.Topnav_inputWrapper__cIwcM > input")
        .then(async() => await page.keyboard.press('Delete'))
        if(!(await page.url()).includes("https://loot.tv/video/")) return Close("Ne charges pas de vidéo")
        else setTimeout(() => Farm(),10000)
    }
    Farm()
})
}
async function restart(n){
    await launch(n).then(() => restart(n))
}
restart(0)
