const puppeteer = require('puppeteer')

async function scrapChannel(url) {


  let browser

  try {
    browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.goto(url)


    const [el] = await page.$x('/html/body/ytd-app/div/ytd-page-manager/ytd-browse/div[3]/ytd-c4-tabbed-header-renderer/app-header-layout/div/app-header/div[2]/div[2]/div/div[1]/div/div[1]/ytd-channel-name/div/div/yt-formatted-string')
    const text = await el.getProperty('textContent')
    const name = await text.jsonValue()

    const [el2] = await page.$x('/html/body/ytd-app/div/ytd-page-manager/ytd-browse/div[3]/ytd-c4-tabbed-header-renderer/app-header-layout/div/app-header/div[2]/div[2]/div/div[1]/yt-img-shadow/img')
    const src = await el2.getProperty('src')
    const avatarURL = await src.jsonValue()

    await browser.close()

    return { name, avatarURL }
  } catch (error) {
    console.log('solar');
  }
  await browser.close()


}

module.exports = {
  scrapChannel
}