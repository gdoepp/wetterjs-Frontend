import { AppPage, MainArea } from './app.po';
import { browser, by, element } from 'protractor';

describe('wetter App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Wetter-Rückblick');
  });

  it('should have stations and years', async () => {

    const main = new MainArea();
    await main.navigateTo();
    browser.waitForAngular();
  expect( await element.all(by.xpath('//select[@id="selS"]/option')).count()).toBeGreaterThan(1);
  expect(await element.all(by.xpath('//select[@id="selY"]/option')).count()).toBeGreaterThan(0);

  const select = element(by.xpath('//select[@id="selS"]'));
  await select.$('[value="1: 04928"]').click();

  expect(await element.all(by.xpath('//select[@id="selY"]/option')).count()).toBeGreaterThan(10);

  // check Auswahl list (latest 10 entries)
  expect(element.all(by.className('wettertab')).count()).toEqual(10);

});

it('should show diagrams for a year', async () => {

  const main = new MainArea();
  await main.navigateTo();
  browser.waitForAngular();

  let select = element(by.xpath('//select[@id="selS"]'));
  await select.$('[value="1: 04928"]').click();

  select = element(by.xpath('//select[@id="selY"]'));
  await select.$('[value="1: 2017"]').click();


  for (const id of ['yt', 'yw', 'si', 'yp', 'sc']) {
    await element(by.id(id)).click();
    expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(13);
    expect(element.all(by.tagName('h2')).get(1).getText()).toContain('Jahresverlauf');
  }

  await element(by.id('yl')).click();
  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(12);

});

it('should show diagrams for a month', async () => {

  const main = new MainArea();
  await main.navigateTo();
  browser.waitForAngular();

  let select = element(by.xpath('//select[@id="selS"]'));
  await select.$('[value="1: 04928"]').click();

  select = element(by.xpath('//select[@id="selY"]'));
  await select.$('[value="2: 2016"]').click();

  await element(by.id('yp')).click();

  element.all(by.xpath('//*[@sel="link"]')).get(6).click(); // July: 31 days plus 1 gives 32

  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(32);

  await element(by.id('sw')).click();

  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(32);

  expect(element.all(by.tagName('h2')).get(1).getText()).toContain('Monatsverlauf');

  await element(by.id('si')).click();
  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(32);

  await element(by.id('sh')).click();
  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(32);

  await element(by.id('sl')).click();
  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(31);
  expect(element.all(by.tagName('h2')).get(1).getText()).toContain('Monat');

});


it('shows diagram for a day', async () => {

  const main = new MainArea();
  await main.navigateTo();
  browser.waitForAngular();

  let select = element(by.xpath('//select[@id="selS"]'));
  await select.$('[value="1: 04928"]').click();

  select = element(by.xpath('//select[@id="selY"]'));
  await select.$('[value="2: 2016"]').click();

  await element(by.id('yp')).click();

  element.all(by.xpath('//*[@sel="link"]')).get(6).click(); // July: 31 days plus 1 gives 32

  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(32);

  element.all(by.xpath('//*[@sel="link"]')).get(19).click(); // July, 20th

  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(25);

  await element(by.id('sw')).click();

  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(25);

  expect(element.all(by.tagName('h2')).get(1).getText()).toContain('Tagesverlauf');

  await element(by.id('si')).click();
  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(25);

  await element(by.id('sl')).click();
  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(24);
  expect(element.all(by.tagName('h2')).get(1).getText()).toContain('Tagesverlauf');

});


it('check navigation', async () => {

  const main = new MainArea();
  await main.navigateTo();
  browser.waitForAngular();

  let select = element(by.xpath('//select[@id="selS"]'));
  await select.$('[value="1: 04928"]').click();

  select = element(by.xpath('//select[@id="selY"]'));
  await select.$('[value="2: 2016"]').click();

  await element(by.id('yp')).click();

  element.all(by.xpath('//*[@sel="link"]')).get(6).click(); // July: 31 days plus 1 gives 32

  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(32);

  element.all(by.xpath('//*[@sel="link"]')).get(19).click(); // July, 20th

  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(25);

  await element(by.id('tpp')).click(); // next day

  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(25);

  await element(by.id('tpl')).click(); // previous day

  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(25);

  await element(by.id('sp')).click(); // pres, hours

  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(25);

  expect(element.all(by.tagName('h2')).get(1).getText()).toContain('Tagesverlauf');

  await element(by.id('tp3')).click();

  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(25);

  expect(element.all(by.tagName('h2')).get(1).getText()).toContain('dreier');

  await element(by.id('tpm')).click();

  expect(element.all(by.tagName('h2')).get(1).getText()).toContain('Monatsverlauf');

  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(32);

  await element(by.id('tpl')).click(); // June

  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(31);

});


});
