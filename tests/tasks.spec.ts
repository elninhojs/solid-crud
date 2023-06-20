import { test, expect } from '@playwright/test';
import { writeFileSync, readFileSync } from 'fs';


test.describe("Interactions with fresh data", ()=>{
  test.beforeEach(async ({ page }, testInfo) => {
    writeFileSync('test-db.json', JSON.stringify({task:[]}))
  });
  
  test('open page', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page).toHaveTitle(/Solid demo/);
  });
  
  test('adding tasks using Enter or Btn click - POST', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(1000)
    await expect(await page.locator('div[aria-label="task record row"]').count()).toEqual(0);
    await page.type('input[aria-label="task input text"]', 'Prepare the soil (added using Enter)', {delay:100})
    await page.press('input[aria-label="task input text"]', 'Enter')
    await page.waitForTimeout(1000)
    await page.type('input[aria-label="task input text"]', 'Plant bananas (added using Click)', {delay:100})
    await page.click('button[type=submit]')
    await page.waitForTimeout(1000)
    await expect(await page.locator('div[aria-label="task record row"]').count()).toEqual(2);
    await expect(await page.locator('div[aria-label="task text"]').nth(0).textContent()).toEqual("Prepare the soil (added using Enter)");
    await expect(await page.locator('div[aria-label="task text"]').nth(1).textContent()).toEqual("Plant bananas (added using Click)");
  
  });
  
  test('checking fresh added tasks - PUT', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(1000)
    await expect(await page.locator('div[aria-label="task record row"]').count()).toEqual(0);
    
    await page.type('input[aria-label="task input text"]', 'Task to be solved', {delay:100})
    await page.press('input[aria-label="task input text"]', 'Enter')
    await page.waitForTimeout(1000)
    
    await page.type('input[aria-label="task input text"]', 'Task to be solved/unsolved', {delay:100})
    await page.press('input[aria-label="task input text"]', 'Enter')
    await page.waitForTimeout(1000)
    
    await expect(await page.locator('div[aria-label="task record row"]').count()).toEqual(2);
    
    await expect(await page.locator('div[aria-label="task text"]').nth(0).textContent()).toEqual("Task to be solved");
    await expect(await page.locator('div[aria-label="task text"]').nth(1).textContent()).toEqual("Task to be solved/unsolved");
    
    await expect(await page.locator('*[aria-label="task complete checkbox"]').nth(0).isChecked()).toBeFalsy();
    await expect(await page.locator('*[aria-label="task complete checkbox"]').nth(1).isChecked()).toBeFalsy();
    
    await page.locator('*[aria-label="task complete checkbox"]').nth(0).click()
    await page.waitForTimeout(2000)
    await expect(await page.locator('*[aria-label="task complete checkbox"]').nth(0).isChecked()).toBeTruthy();
    
    
    await page.locator('*[aria-label="task complete checkbox"]').nth(1).click()
    await page.waitForTimeout(2000)
    await expect(await page.locator('*[aria-label="task complete checkbox"]').nth(1).isChecked()).toBeTruthy();
    
    await page.locator('*[aria-label="task complete checkbox"]').nth(1).click()
    await page.waitForTimeout(2000)
    await expect(await page.locator('*[aria-label="task complete checkbox"]').nth(1).isChecked()).toBeFalsy();
  
  });
  
  test('removing fresh added tasks - DELETE', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(1000)
    await expect(await page.locator('div[aria-label="task record row"]').count()).toEqual(0);
    
    await page.type('input[aria-label="task input text"]', 'Task to remove', {delay:100})
    await page.press('input[aria-label="task input text"]', 'Enter')
    await page.waitForTimeout(1000)
    
    await page.type('input[aria-label="task input text"]', 'Task to keep', {delay:100})
    await page.press('input[aria-label="task input text"]', 'Enter')
    await page.waitForTimeout(1000)
    
    await expect(await page.locator('div[aria-label="task record row"]').count()).toEqual(2);
    
    await expect(await page.locator('div[aria-label="task text"]').nth(0).textContent()).toEqual("Task to remove");
    await expect(await page.locator('div[aria-label="task text"]').nth(1).textContent()).toEqual("Task to keep");
    
    await page.locator('*[aria-label="remove task button"]').nth(0).click()
    await page.waitForTimeout(1000)
    await expect(await page.locator('div[aria-label="task record row"]').count()).toEqual(1);
    await expect(await page.locator('div[aria-label="task text"]').nth(0).textContent()).toEqual("Task to keep");
  });
})


test.describe("Interactions with pre existing data", ()=>{
  test.beforeEach(async ({ page }, testInfo) => {

    const task = [
      {id:123, text: "First pre existent task", completed: false},
      {id:123, text: "Second pre existent task", completed: true},
      {id:123, text: "Third pre existent task", completed: true}
    ]

    writeFileSync('test-db.json', JSON.stringify({task}))
  });
  
  test('open page', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page).toHaveTitle(/Solid demo/);
    await page.waitForTimeout(1200)
    await expect(await page.locator('div[aria-label="task record row"]').count()).toEqual(3);
    await page.waitForTimeout(1200)

  });
  
  test('adding more using Enter or Btn click - POST', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(1000)
    await expect(await page.locator('div[aria-label="task record row"]').count()).toEqual(3);
    await page.type('input[aria-label="task input text"]', 'Prepare the soil (added using Enter)', {delay:100})
    await page.press('input[aria-label="task input text"]', 'Enter')
    await page.waitForTimeout(1000)
    await page.type('input[aria-label="task input text"]', 'Plant bananas (added using Click)', {delay:100})
    await page.click('button[type=submit]')
    await page.waitForTimeout(1000)
    await expect(await page.locator('div[aria-label="task record row"]').count()).toEqual(5);
    await expect(await page.locator('div[aria-label="task text"]').nth(3).textContent()).toEqual("Prepare the soil (added using Enter)");
    await expect(await page.locator('div[aria-label="task text"]').nth(4).textContent()).toEqual("Plant bananas (added using Click)");
  
    const dbContent = JSON.parse(readFileSync('test-db.json').toString())
    expect(dbContent.task.length).toEqual(5)
    expect(dbContent.task.filter((t:any)=>t.text==='Plant bananas (added using Click)').length).toBe(1)
    expect(dbContent.task.filter((t:any)=>t.text==='Prepare the soil (added using Enter)').length).toBe(1)
  });
})

