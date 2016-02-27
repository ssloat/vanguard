import re
import time

from pyvirtualdisplay import Display
from selenium import webdriver
from selenium.webdriver.common.by import By
import selenium.common.exceptions

from mysite import db, models

if __name__ == '__main__':
    display = None
    driver = None
    try:
        display = Display(visible=0, size=(800, 600))
        display.start()

        driver = webdriver.Firefox()
        driver.get('https://investor.vanguard.com/mutual-funds/list#/mutual-funds/asset-class/month-end-returns')

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

        for fund in funds:
            fund.parse_overview(driver)
            db.session.add(fund)

            for _ in range(2):
                try:
                    fund.parse_market_data(driver)
                except selenium.common.exceptions.StaleElementReferenceException:
                    print "stale record."
                    continue

                break


            db.session.commit()
            time.sleep(5)

    finally:
        if driver:
            driver.quit()

        if display:
            display.stop()

        db.session.commit()
