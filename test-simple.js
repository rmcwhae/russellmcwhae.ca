// Simple test to check if the application loads
const { chromium } = require('playwright');

async function runSimpleTest() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    console.log('Testing homepage load...');
    await page.goto('http://localhost:4000');
    
    console.log('Checking page title...');
    const title = await page.title();
    console.log('Page title:', title);
    
    console.log('Checking if logo exists...');
    const logo = await page.locator('#logo');
    const logoVisible = await logo.isVisible();
    console.log('Logo visible:', logoVisible);
    
    console.log('Checking if navigation exists...');
    const nav = await page.locator('nav');
    const navVisible = await nav.isVisible();
    console.log('Navigation visible:', navVisible);
    
    console.log('Checking if toggle exists...');
    const toggle = await page.locator('#toggle');
    const toggleVisible = await toggle.isVisible();
    console.log('Toggle visible:', toggleVisible);
    
    console.log('All basic checks passed!');
    
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await browser.close();
  }
}

runSimpleTest();