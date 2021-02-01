const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setViewport({
        width: 1519,
        height: 3000,
        deviceScaleFactor: 1,
    });
    await page.goto('https://www.amazon.com');
    // await page.screenshot({path : 'amazon1.jpg'});
    await page.type('#twotabsearchtextbox','eagle eyes');
    // await page.screenshot({path : 'amazon2.jpg'});
    await page.click('.nav-search-submit input')
    await page.waitForSelector('[data-component-type=s-search-result]')
    await page.waitForTimeout(2000);
    // await page.screenshot({path : 'amazon3.jpg'});
    const enlaces = await page.evaluate(() => {
        const elements = document.querySelectorAll('[data-component-type=s-search-result] h2 a')

        const links = []
        for (let element of elements) {
            links.push(element.href)
        }
        return links
    });

    const books = [];
    for (let enlace of enlaces) {
        await page.goto(enlace);
        await page.waitForTimeout(1000)

        const book = await page.evaluate(() => {
            const tmp = {}; 
            if (document.querySelector('#title #productTitle') != null && document.querySelector('.author .a-declarative .a-link-normal')) {
                tmp.title = document.querySelector('#title #productTitle').innerText;
                tmp.author = document.querySelector('.author .a-declarative .a-link-normal').innerText;
            }else{
                tmp.title = "nombre"
                tmp.author = "vendedor"
            }
            return tmp
        })
    books.push(book)}
    console.log(books)

    console.log(enlaces.length)
    
    await browser.close();
    
})();






// PDF
// const puppeteer = require('puppeteer');
// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
//   await page.pdf({path: 'hn.pdf', format: 'A4'});

//   await browser.close();
// })()