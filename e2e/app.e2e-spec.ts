import { AppPage, MainArea } from './app.po';
import { browser, by, element } from 'protractor';

describe('wetter App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Wetter-Rückblick');
  });

  it('should have stations and years', async () => {

    const main = new MainArea();
    await main.navigateTo();
    browser.waitForAngular();

    expect( await element.all(by.xpath('//select[@id="selS"]/option')).count()).toBeGreaterThan(1);
    expect(await element.all(by.xpath('//select[@id="selY"]/option')).count()).toBeGreaterThan(0);

    element(by.cssContainingText('option', 'Stuttgart')).click();

    expect(await element.all(by.xpath('//select[@id="selY"]/option')).count()).toBeGreaterThan(10);

    // check Aktuell list (latest 8 entries + 2 other elements = 10)
    expect(element.all(by.className('wettertab')).count()).toEqual(10);
});

it('should show diagrams for a year', async () => {

  const main = new MainArea();
  await main.navigateTo();
  browser.waitForAngular();

  await element(by.cssContainingText('option', '###')).click();
  await element(by.cssContainingText('option', '2018')).click();

  await element(by.id('yu')).click();
  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(13);
  expect(element.all(by.tagName('h2')).get(1).getText()).toContain('Jahresverlauf 2018');

  await element(by.cssContainingText('option', 'Stuttgart')).click();
  await element(by.cssContainingText('option', '2017')).click();

  for (const id of ['yt', 'yw', 'si', 'yp', 'sc', 'ys']) { // diagrams
    await element(by.id(id)).click();
    expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(13);
    expect(element.all(by.tagName('h2')).get(1).getText()).toContain('Jahresverlauf 2017');
  }

  await element(by.id('yl')).click();  // list
  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(12);

  await element(by.cssContainingText('option', '2013')).click();
  expect(element.all(by.tagName('h2')).get(1).getText()).toContain('Jahresverlauf 2013');

  await element(by.id('yi')).click();  // list
  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(13);
  expect(element.all(by.tagName('h2')).get(1).getText()).toContain('Niederschlag im Jahresverlauf 2013');

});

it('should show diagrams for a month', async () => {

  const main = new MainArea();
  await main.navigateTo();
  browser.waitForAngular();

  await element(by.cssContainingText('option', 'Stuttgart')).click();
  await element(by.cssContainingText('option', '2016')).click();

  await element(by.id('yp')).click();

  expect(element.all(by.xpath('//*[@sel="link"]')).count()).toEqual(12);
  await element.all(by.xpath('//*[@sel="link"]')).get(6).click(); // July: 31 days plus 1 gives 32

  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(32);

  await element(by.id('sw')).click();

  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(32);

  expect(element.all(by.tagName('h2')).get(1).getText()).toContain('Monatsverlauf 7.2016');

  await element(by.id('si')).click();
  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(32);

  await element(by.id('sh')).click();
  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(32);

  await element(by.id('sl')).click();
  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(31);
  expect(element.all(by.tagName('h2')).get(1).getText()).toContain('Monat');

  await element(by.cssContainingText('option', '2017')).click();
  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(31);
  expect(element.all(by.tagName('h2')).get(1).getText()).toContain('Monatsverlauf 7.2017');

});


it('shows diagrams for a day', async () => {

  const main = new MainArea();
  await main.navigateTo();
  browser.waitForAngular();

  await element(by.cssContainingText('option', 'Stuttgart')).click();
  await element(by.cssContainingText('option', '2016')).click();

  await element(by.id('yp')).click();

  element.all(by.xpath('//*[@sel="link"]')).get(6).click(); // July: 31 days plus 1 gives 32

  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(32);
  expect(element.all(by.tagName('h2')).get(1).getText()).toContain('Monatsverlauf 7.2016');

  element.all(by.xpath('//*[@sel="link"]')).get(19).click(); // July, 20th

  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(25);
  expect(element.all(by.tagName('h2')).get(1).getText()).toContain('Tagesverlauf 20.7.2016');

  await element(by.id('sw')).click();

  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(25);

  await element(by.cssContainingText('option', '2017')).click();

  expect(element.all(by.tagName('h2')).get(1).getText()).toContain('Tagesverlauf 20.7.2017');

  await element(by.id('si')).click();
  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(25);

  await element(by.id('sl')).click(); // list
  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(24);
  expect(element.all(by.tagName('h2')).get(1).getText()).toContain('Tagesverlauf 20.7.2017');

});

it('should have working navigation (1)', async () => {

  const main = new MainArea();
  await main.navigateTo();
  browser.waitForAngular();

  await element(by.cssContainingText('option', 'Stuttgart')).click();
  await element(by.cssContainingText('option', '2016')).click();

  await element(by.id('yp')).click();

  await element.all(by.xpath('//*[@sel="link"]')).get(6).click(); // July: 31 days plus 1 gives 32

  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(32);

  await element.all(by.xpath('//*[@sel="link"]')).get(19).click(); // July, 20th

  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(25);

  await browser.refresh();

  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(25);
  expect(element.all(by.tagName('h2')).get(1).getText()).toContain('Tagesverlauf 20.7.2016');

  await element(by.id('tpp')).click(); // next day, 21th

  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(25);
  expect(element.all(by.tagName('h2')).get(1).getText()).toContain('Tagesverlauf 21.7.2016');

  await element(by.id('tpl')).click(); // previous day, 20th

  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(25);
  expect(element.all(by.tagName('h2')).get(1).getText()).toContain('Tagesverlauf 20.7.2016');

  await element(by.id('sp')).click(); // pres, hours  #1

  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(25);

  expect(element.all(by.tagName('h2')).get(1).getText()).toContain('Tagesverlauf');

  await element(by.id('tp3')).click(); // #2

  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(25);

  expect(element.all(by.tagName('h2')).get(1).getText()).toContain('dreier');

  await element(by.cssContainingText('option', 'Frankfurt')).click(); // #3

  expect(element.all(by.tagName('h2')).get(1).getText()).toContain('dreier Tage');

  await element(by.id('tpm')).click(); // #4

  expect(element.all(by.tagName('h2')).get(1).getText()).toContain('Monatsverlauf 7.2016');

  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(32);

  await element(by.id('tpl')).click(); // June #5

  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(31); // #3

  browser.navigate().back();  // #4

  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(32);

  browser.navigate().back(); // #3

  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(25);

  browser.navigate().back(); // #2
  browser.navigate().back(); // #1

  expect(element.all(by.tagName('h2')).get(1).getText()).toContain('Tagesverlauf 20.7.2016');

  browser.refresh();

  expect(element.all(by.tagName('h2')).get(1).getText()).toContain('Tagesverlauf 20.7.2016');


});


it('should have working navigation (2)', async () => {

  const main = new MainArea();
  await main.navigateTo();
  browser.waitForAngular();

  await element(by.cssContainingText('option', 'Stuttgart')).click();
  await element(by.cssContainingText('option', '1999')).click();

  await element(by.id('ys')).click();

  await element.all(by.xpath('//*[@sel="link"]')).get(7).click(); // Aug: 31 days plus 1 gives 32

  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(32);

  await element.all(by.xpath('//*[@sel="link"]')).get(10).click(); // Aug, 11th

  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(25);
  expect(element.all(by.tagName('h2')).get(1).getText()).toContain('Tagesverlauf 11.8.1999');

  await element(by.id('trp')).click(); // next day, 12th

  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(25);
  expect(element.all(by.tagName('h2')).get(1).getText()).toContain('Tagesverlauf 12.8.1999');

  await element(by.id('trl')).click(); // previous day, 11th

  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(25);
  expect(element.all(by.tagName('h2')).get(1).getText()).toContain('Tagesverlauf 11.8.1999');

  await element(by.id('sw')).click(); // wind  #1

  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(25);

  expect(element.all(by.tagName('h2')).get(1).getText()).toContain('Tagesverlauf 11.8.1999');

  await element(by.cssContainingText('option', 'Hamburg')).click(); // #2

  // this only works if Hamburg has data starting in 2016 before August.
  expect(element.all(by.tagName('h2')).get(1).getText()).toContain('Tagesverlauf 11.8.2016');

  await element(by.id('tfm')).click(); // #3

  expect(element.all(by.tagName('h2')).get(1).getText()).toContain('Monatsverlauf 8.2016');

  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(32);

  await element(by.id('tfl')).click(); // Jul  #4
  await element(by.id('tfl')).click(); // Jun  #5

  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(31);

  browser.navigate().back();  // #4

  expect(element.all(by.xpath('//*[@sel="test"]')).count()).toEqual(32);

  browser.navigate().back(); // #3

  expect(element.all(by.tagName('h2')).get(1).getText()).toContain('Monatsverlauf 8.2016');

  browser.navigate().back(); // #2
  expect(element.all(by.tagName('h2')).get(1).getText()).toContain('Tagesverlauf 11.8.2016');

  browser.navigate().back(); // #1
  expect(element.all(by.tagName('h2')).get(1).getText()).toContain('Tagesverlauf 11.8.1999');

  browser.refresh();

  expect(element.all(by.tagName('h2')).get(1).getText()).toContain('Tagesverlauf 11.8.1999');


});

});
