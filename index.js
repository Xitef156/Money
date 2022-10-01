const moment = require('moment')
const puppeteer = require('puppeteer')
const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
}

const Mail = 'alexiswiiu@gmail.com'
const Password = 'bellot99'
var x = 0;
var y = 0;
async function Try_Login(page,mail,password) {
    return new Promise(async (resolve) => {
        async function Restart() {
        await page.waitForSelector("#__next > div > div._app_mainWrappr__G3eiJ > div._app_contentWrapper__KFde2 > div > div > div.AccountForm_accountFormFields__1zE8S > div:nth-child(1) > input[type=email]")
        .then(el => el.type(mail))
        await sleep(1000)
        await page.waitForSelector("#__next > div > div._app_mainWrappr__G3eiJ > div._app_contentWrapper__KFde2 > div > div > div.AccountForm_accountFormFields__1zE8S > div:nth-child(2) > input[type=password]")
        .then(el => el.type(password))
        await sleep(1000)
        await page.waitForSelector("#__next > div > div._app_mainWrappr__G3eiJ > div._app_contentWrapper__KFde2 > div > div > div.AccountForm_accountFormButtonWrapper__9nGTl > button")
        .then(el => el.click())
        await sleep(3000)
        if(String(await page.url()) == 'https://loot.tv/account/login'){
            await page.reload()
            await sleep(2000)
            Restart()
        } else resolve()
    }
        Restart()
})
}
async function login(page,mail,password) {
    return new Promise(async (resolve) => {
        await page.goto('https://loot.tv')
        await sleep(2000)
        await page.waitForSelector("#qc-cmp2-ui > div.qc-cmp2-footer.qc-cmp2-footer-overlay.qc-cmp2-footer-scrolled > div > button.css-k8o10q").then(el => el.click())
        await sleep(1000)
        await page.waitForSelector("#__next > div > div.Topnav_topnavWrapper__wsiGh > div.Topnav_rightSideWrapper__gCpY1 > div > a.Topnav_loginButtonWrapper__KKPO1")
        .then(el => el.click())
        await sleep(1000)
        await Try_Login(page,mail,password)
        await sleep(5000)
        await resolve()
    })
}
async function launch(Instances, mail=Mail, password=Password) {
    var M;
    var P;
    for (let y = 0; y < Instances; y++) {
        if(typeof mail == Object) M = mail[Instances]
        else M = mail
        if(typeof password == Object) P = password[Instances]
        else P = password
        if(M == ('' || null || undefined)) return console.log('Fail Mail ',y)
        if(P == ('' || null || undefined)) return console.log('Fail Password ',y)
        const browser = await puppeteer.launch({headless: true, defaultViewport: {width:1920,height:1080}, executablePath: "./Chrome/chrome.exe"});
        await sleep(1000)
        const page = (await browser.pages())[0]
        await sleep(5000)
        async function Close() {
            await browser.close()
            console.log(`Error Browser ${y}`)
            launch(y,M,P)
            return
        }
        try {
            await login(page,M,P)
            await page.goto("https://loot.tv/video/672625")
            setInterval(async() => {
                if(!(await page.url()).includes('https://loot.tv/video/')) Close()
            }, 30000);
        } catch {
            Close()
        }
    }
}
(async () => {
    const browser = await puppeteer.launch({headless: true, defaultViewport: {width:1920,height:1080}, executablePath: "./Chrome/chrome.exe"});
    await sleep(1000)
    const page = (await browser.pages())[0]
    await sleep(5000)
        try {
            await login(page,Mail,Password)
            await sleep(5000)
            await page.goto("https://loot.tv/redeem")
            var First_Time = moment()
            await sleep(100000)
            y = 0
            setInterval(async () => {
                await page.reload()
                await sleep(2500)
                if((await page.$("#__next > div > div._app_mainWrappr__G3eiJ > div._app_contentWrapper__KFde2 > div > div > div.redeem_redeemPointsSectionWrapper__jSQP4 > div.redeem_pointCountColumn__6YFbX > div.redeem_balanceBox__2CzFs > div.redeem_boxBody___fUA3 > div.redeem_pointCountWrapper__PIz0q > span.redeem_pointCount__4mJEg")) == (null || undefined)) return console.log('No Point')
                Point = await page.evaluate(el => el.textContent.replace(',','.'),await page.waitForSelector("#__next > div > div._app_mainWrappr__G3eiJ > div._app_contentWrapper__KFde2 > div > div > div.redeem_redeemPointsSectionWrapper__jSQP4 > div.redeem_pointCountColumn__6YFbX > div.redeem_balanceBox__2CzFs > div.redeem_boxBody___fUA3 > div.redeem_pointCountWrapper__PIz0q > span.redeem_pointCount__4mJEg"))
                if(x != Point) {
                    console.log(`Tu as gagné ${Number(Point) - x} pts ! (${Point})`)
                    x = Point
                    y = 0
                } else y++
                if (y == 60) {
                    var ms = moment.duration(moment().diff(First_Time));
                    var d = new Date(1000*Math.round(ms/1000)); // round to nearest second
                    function pad(i) { return ('0'+i).slice(-2); }
                    var str = d.getUTCHours() + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds());
                    console.log(`Plus de points depuis 10min (Farm depuis ${str})`)
                }
        },10000)
    } catch{
        console.log('Erreur pour capter les points')
    }
})()
launch(2)
