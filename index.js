const puppeteer = require('puppeteer');

const getSold = async(item) => {   
    let result   
    const browser = await puppeteer.launch({headless: false});
    try {
        const page = await browser.newPage();
        await page.goto(item.url,{ timeout: 60000, waitUntil: 'networkidle2' });
        await page.setViewport({width: 1000, height: 500})       
        result = await page.evaluate(() => {
            let sold = document.querySelector('.srp-controls__control.srp-controls__count > h1 > span:nth-child(1)').innerText;
            let title = document.querySelector('.srp-controls__control.srp-controls__count > h1 > span:nth-child(2)').innerText;
            
            return {
                title,
                sold
            }

        });
    } catch (error) {
        console.log(error)
    }
       
    browser.close();
    return result
  }
  
  const items = [
      {
          title: 'PS5',
          url: 'https://www.ebay.com/sch/i.html?_from=R40&_nkw=ps5&_sacat=0&LH_TitleDesc=0&_fsrp=1&_sop=10&_oaa=1&Model=Sony%2520PlayStation%25205&_dcat=139971&rt=nc&LH_Sold=1&LH_Complete=1'
      },
      {
          title: 'Xbox',
          url: 'https://www.ebay.com/sch/i.html?_from=R40&_nkw=Xbox&_sacat=0&LH_TitleDesc=0&_fsrp=1&_sop=10&LH_Complete=1&LH_Sold=1&rt=nc&Model=Microsoft%2520Xbox%2520Series%2520X&_dcat=139971'
      }
  ]
 items.forEach(product =>{
     getSold(product).then(e =>{
         console.log(e);
     })

 })