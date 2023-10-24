const puppeteer = require('puppeteer')

const run = async () => {
  let browser = null

  try {
    browser = await puppeteer.launch({ headless: "new" })
    const page = await browser.newPage()

    await page.goto('https://ufostorekh.com/product-category/anker/')

    const productsSelector = '.woo-product-info';
    await page.waitForSelector(productsSelector)
    const elements = await page.$$(productsSelector)

    for(let i = 0; i < elements.length; i += 1) {
      const element = elements[i]
      const titleElement = await element.$('.title')
      const categoryElement = await element.$('.category')
      const priceElement = await element.$('.price-wrap')

      const name = await titleElement.evaluate(e => e.textContent)
      const price = await priceElement.evaluate(e => e.textContent)
      const category = await categoryElement.evaluate(e => e.textContent)

      console.log({ name, price, category })
    }
  } catch (err) {
    console.error(err)
  } finally {
    if (browser) await browser.close()
  }
}

run()
