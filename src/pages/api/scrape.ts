import type { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer'

async function scrapeDetails(url: string){
  //Launch the browser
  const browser = await puppeteer.launch();

  //Make a new page
  const page = await browser.newPage();

  //Go to the url using the page made
  await page.goto(url);

  let array = []

  //Get the title of the page
    array = await page.evaluate(() => {
      
      let tempArr = []
      for(let i = 0; i < 249; i++){
        
        tempArr.push(document.querySelectorAll("tbody a")[i]?.textContent);
      }
      return tempArr;
    })


  
  

  //Close the browser
  await browser.close();

  return array;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const text = await scrapeDetails("https://open5e.com/monsters");
  console.log(text);
  res.status(200).json({"title": text});

}