import re
import time
import logging
import sys
import urllib3

from bs4 import BeautifulSoup

from pyvirtualdisplay import Display
from selenium import webdriver
from selenium.webdriver.common.by import By
import selenium.common.exceptions

from mysite import db
from mysite.vanguard.models import VanguardFund, VanguardPrice, VanguardDividend

def extract_funds(http): 
    url = 'https://investor.vanguard.com/mutual-funds/list#/mutual-funds/asset-class/month-end-returns' 
    logging.debug(url)
    r = http.urlopen('GET', url)

    print r.data
    soup = BeautifulSoup(r.data, 'html5lib')

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

        fund = db.session.query(VanguardFund).filter(VanguardFund.id==fund_id).first()
        if not fund:
            ticker = tds[2].text
            asset_class = tds[3].text
            exp_ratio = float(tds[4].text[:-1])

            fund = VanguardFund(
                fund_id, 'Mutual Fund', fund_name, ticker, asset_class, exp_ratio
            ) 

        funds.append(fund)

    return funds

class DailyExtract:
    def run(self):
        funds = db.session.query(VanguardFund).all()

        http = urllib3.PoolManager()
        for fund in funds:
            logging.info('Processing %d' % fund.id)
            fund.parse_market_data(http)

        db.session.commit()
        time.sleep(5)


class HistoricalExtract(DailyExtract):
    def process_data(self, fund, driver):
        sleep = False
        
        extracts = [
            (VanguardPrice, fund.historical_prices),
            (VanguardDividend, fund.historical_dividends),
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
