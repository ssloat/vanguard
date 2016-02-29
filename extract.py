import re
import time
import logging
import sys

from pyvirtualdisplay import Display
from selenium import webdriver
from selenium.webdriver.common.by import By
import selenium.common.exceptions

from mysite import db, models

def extract_funds(driver): 
    url = 'https://investor.vanguard.com/mutual-funds/list#/mutual-funds/asset-class/month-end-returns' 
    logging.debug(url)
    driver.get(url)

    funds = []
    elems = driver.find_elements_by_xpath('//*[@class="productEntry"]')
    for elem in elems:
        tds = elem.find_elements(By.TAG_NAME, 'td')
        if len(tds) < 4 or tds[2].text == "":
            continue
 
        a = tds[1].find_element(By.TAG_NAME, 'a')
        span = a.find_element(By.TAG_NAME, 'span')
        fund_name = span.get_attribute('innerHTML')
        fund_id = int(re.match(r'.*FundId=(\d+)', a.get_attribute('href')).group(1))

        fund = db.session.query(models.Fund).filter(models.Fund.id==fund_id).first()
        if not fund:
            ticker = tds[2].text
            asset_class = tds[3].text
            exp_ratio = float(tds[4].text[:-1])

            fund = models.Fund(
                fund_id, 'Mutual Fund', fund_name, ticker, asset_class, exp_ratio
            ) 

        funds.append(fund)

    return funds

class DailyExtract:
    def run(self):
        display = None
        driver = None
        try:
            display = Display(visible=0, size=(800, 600))
            display.start()

            driver = webdriver.Firefox()
            funds = extract_funds(driver)

            for fund in funds:
                logging.info('Processing %d' % fund.id)
                sleep = False
                for _ in range(2):
                    try:

                        if not db.session.query(models.Fund).filter(models.Fund.id==fund.id).first():
                            fund.parse_overview(driver)
                            if fund.minimum == 'closed':
                                break

                            db.session.add(fund)
                            sleep = True

                        sleep = sleep or self.process_data(fund, driver)

                        break

                    except selenium.common.exceptions.StaleElementReferenceException:
                        logging.warn( "stale record." )

                    db.session.commit()
                    if sleep:
                        time.sleep(5)

        finally:
            if driver:
                driver.quit()

            if display:
                display.stop()

            db.session.commit()

    def process_data(self, fund, driver):
        fund.parse_market_data(driver)
        return True

class HistoricalExtract(DailyExtract):
    def process_data(self, fund, driver):
        sleep = False
        
        extracts = [
            (models.FundPrice, fund.historical_prices),
            (models.FundDividend, fund.historical_dividends),
        ]
        for model, cb in extracts:
            values = db.session.query(model).filter(
                model.fund_id==fund.id
            ).all()

            if not values or len(prices) < 11:
                cb(driver, '/tmp/mozilla_stephen0')
                sleep = True

        return sleep

if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)

    if len(sys.argv) > 1 and sys.argv[1].lower() == 'historical':
        HistoricalExtract().run()

    else:
        DailyExtract().run()
