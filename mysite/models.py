from mysite import db

import datetime
import time
import os

from selenium.webdriver.common.by import By
import selenium.common.exceptions

class Fund(db.Model):
    __tablename__ = 'funds'

    id = db.Column(db.Integer, primary_key=True)
    fund_type = db.Column(db.String(64), nullable=False)
    name = db.Column(db.String(64), nullable=False)
    ticker = db.Column(db.String(64), nullable=False)
    asset_class = db.Column(db.String(64), nullable=False)
    exp_ratio = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(64), nullable=False)
    minimum = db.Column(db.Integer, nullable=False)

    prices = db.relationship('FundPrice', backref='fund')
    dividends = db.relationship('FundDividend', backref='fund')

    def __init__(self, id, fund_type, name, ticker, asset_class, exp_ratio):
        self.id = id
        self.fund_type = fund_type
        self.name = name
        self.ticker = ticker
        self.asset_class = asset_class
        self.exp_ratio = exp_ratio

    def __repr__(self):
        return "<Fund(%d, '%s', '%s')>" % ((self.id or 0), self.name, self.ticker)

    @property
    def overview_url(self):
        return "https://personal.vanguard.com/us/funds/snapshot?FundIntExt=INT&FundId=%04d#tab=0" % self.id

    def parse_overview(self, driver):
        print self.overview_url

        table = _web_lookup(self.overview_url, driver, "//table[@id='fundFactsTable']")[0]

        trs = [
            x for x in table.find_elements_by_xpath("tbody/tr")
            if len(x.find_elements_by_xpath('td')) > 1
        ]

        self.category = trs[1].find_elements_by_xpath('td')[1].text
        self.minimum = float(
            trs[3].find_elements_by_xpath('td')[1].text[1:].replace(',', '')
        )

    @property
    def market_data_url(self):
        return "https://advisors.vanguard.com/VGApp/iip/site/advisor/investments/price?fundId=%04d" % self.id

    def parse_market_data(self, driver):
        print self.market_data_url

        prices_table, dividends_table = _web_lookup(
            self.market_data_url, 
            driver, 
            '//table[@id="priceForm:historicalPricesTable"]',
            '//table[@id="priceForm:priceDistributionsTable"]',
        )

        trs = prices_table.find_elements_by_xpath('tbody/tr')
        for tr in trs[1:]:
            tds = tr.find_elements_by_xpath('td')
            date = datetime.datetime.strptime(tds[0].text, "%m/%d/%Y").date()
            price = float(tds[1].text[1:].replace(",", ""))
            
            self.add_price(date, price)

        trs = dividends_table.find_elements(By.TAG_NAME, 'tr')
        for tr in trs[1:]:
            tds = tr.find_elements(By.TAG_NAME, 'td')
            if not tds or len(tds) < 5:
                continue

            dividend_type = tds[0].text
            price_per_share = float(tds[1].text[1:].replace(",", ""))
            payable_date = datetime.datetime.strptime(tds[2].text, "%m/%d/%Y").date()
            record_date = datetime.datetime.strptime(tds[3].text, "%m/%d/%Y").date()
            reinvest_date = datetime.datetime.strptime(tds[4].text, "%m/%d/%Y").date()
            reinvest_price = float(tds[1].text[5:].replace(",", ""))

            self.add_dividend(
                dividend_type, price_per_share, payable_date, record_date, 
                reinvest_date, reinvest_price
            )

    def add_dividend(self, dividend_type, price_per_share, payable_date, record_date, 
        reinvest_date, reinvest_price
    ):
        fd = [
            fd for fd in self.dividends
            if fd.payable_date == payable_date and fd.dividend_type == dividend_type
        ]

        if fd:
            fd = fd[0]
            fd.price_per_share = price_per_share
            fd.record_date = record_date
            fd.reinvest_date = reinvest_date
            fd.reinvest_price = reinvest_price

        else:
            fd = FundDividend(
                self, dividend_type, price_per_share, payable_date, record_date, 
                reinvest_date, reinvest_price
            )

        print fd
        db.session.add(fd)

    def add_price(self, date, price):
        fp = [fp for fp in self.prices if fp.date == date]
        if fp:
            fp = fp[0]
            fp.price = price
        else:
            fp = FundPrice(self, date, price)

        print fp
        db.session.add(fp)

    def historical_prices(self, driver, directory):
        print self.market_data_url
        (button,) = _web_lookup(
            self.market_data_url, driver, "//*[@id='priceForm:sinceInceptionLink']"
        )
        button.click()

        filename = os.listdir(directory)[0]
        fh = open("%s/%s" % (directory, filename), 'r')
        for line in fh.read().splitlines()[2:-1]:
            data = line.split(',')
            try:
                date = datetime.datetime.strptime(data[0], '%m/%d/%Y').date()
                self.add_price(date, float(data[1][1:].replace(',', '')))
            except ValueError:
                pass

        os.remove("%s/%s" % (directory, filename))

    def historical_dividends(self, driver):
        pass


def _web_lookup(url, driver, *items):
    for _ in range(1, 4):
        try:
            if _ > 1:
                print "download attempt %d" % _

            driver.get(url)
            return [driver.find_element_by_xpath(x) for x in items]

        except selenium.common.exceptions.NoSuchElementException as e:
            print "error downloading page."
            if _ < 3:
                time.sleep(3)
            else:
                raise e


class FundPrice(db.Model):
    __tablename__ = "fund_prices"

    id = db.Column(db.Integer, primary_key=True)
    fund_id = db.Column(db.Integer, db.ForeignKey('funds.id'))
    date = db.Column(db.Date, nullable=False)
    price = db.Column(db.Float, nullable=False)
    
    __table_args__ = (
        db.UniqueConstraint('fund_id', 'date', name='_unq_fund_price'),
    )

    def __init__(self, fund, date, price):
        self.fund = fund
        self.date = date
        self.price = price

    def __repr__(self):
        return "<FundPrice(%d, '%s', '%s', %f)>" % (
            (self.id or 0), self.fund.ticker, self.date, self.price
        )

class FundDividend(db.Model):
    __tablename__ = "fund_dividends"

    id = db.Column(db.Integer, primary_key=True)
    fund_id = db.Column(db.Integer, db.ForeignKey('funds.id'))
    dividend_type = db.Column(db.String, nullable=False)
    price_per_share = db.Column(db.Float, nullable=False)
    payable_date = db.Column(db.Date, nullable=False)
    record_date = db.Column(db.Date, nullable=False)
    reinvest_date = db.Column(db.Date, nullable=False)
    reinvest_price = db.Column(db.Float, nullable=False)

    __table_args__ = (
        db.UniqueConstraint('fund_id', 'dividend_type', 'payable_date', 
            name='_unq_fund_dividend'
        ),
    )

    def __init__(
        self, fund, dividend_type, price_per_share, payable_date, record_date, 
        reinvest_date, reinvest_price
    ):

        self.fund = fund
        self.dividend_type = dividend_type
        self.price_per_share = price_per_share
        self.payable_date = payable_date
        self.record_date = record_date
        self.reinvest_date = reinvest_date
        self.reinvest_price = reinvest_price

    def __repr__(self):
        return "<FundDividend(%d, '%s', '%s', %f)>" % (
            (self.id or 0), self.fund.ticker, self.payable_date, self.price_per_share
        )

class FundFees(db.Model):
    __tablename__ = "fund_fees"

    id = db.Column(db.Integer, primary_key=True)
    fund_id = db.Column(db.Integer, db.ForeignKey('funds.id'))
    fee_type = db.Column(db.String, nullable=False)
    fee = db.Column(db.Float, nullable=False)

    fund = db.relationship("Fund")

    def __init__(self, fund, fee_type, fee):
        self.fund = fund
        self.fee_type = fee_type
        self.fee = fee


