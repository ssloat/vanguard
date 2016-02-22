from mysite import db


class Fund(db.Model):
    __tablename__ = 'funds'

    id = db.Column(db.Integer, primary_key=True)
    fund_type = db.Column(db.String(64), nullable=False)
    name = db.Column(db.String(64), nullable=False)
    ticker = db.Column(db.String(64), nullable=False)
    asset_class = db.Column(db.String(64), nullable=False)
    exp_ratio = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(64), nullable=True)
    minimum = db.Column(db.Integer, nullable=True)

    def __init__(self, id, fund_type, name, ticker, asset_class, exp_ratio, category=None):
        self.id = id
        self.fund_type = fund_type
        self.name = name
        self.ticker = ticker
        self.asset_class = asset_class
        self.exp_ratio = exp_ratio
        self.category = category

    @property
    def overview_url(self):
        return "https://personal.vanguard.com/us/funds/snapshot?FundIntExt=INT&FundId=%04d#tab=0" % self.id

    @property
    def dividend_url(self):
        return "https://personal.vanguard.com/us/funds/snapshot?FundIntExt=INT&FundId=%04d#tab=4" % self.id

    def lookup_overview(self, driver):
        trs = driver.find_elements_by_xpath('//*[@id="fundFactsTable"]/tbody/tr')
        self.category = trs[1].find_elements_by_xpath('td')[1].get_attribute('innerHTML')
        self.minimum = float(
            trs[3].find_elements_by_xpath('td')[1].get_attribute('innerHTML')[1:].replace(',', '')
        )

class FundPrice(db.Model):
    __tablename__ = "fund_prices"

    id = db.Column(db.Integer, primary_key=True)
    fund_id = db.Column(db.Integer, db.ForeignKey('funds.id'))
    date = db.Column(db.Date, nullable=False)
    price = db.Column(db.Float, nullable=False)

    fund = db.relationship("Fund")

    def __init__(self, fund, date, price):
        self.fund = fund
        self.date = date
        self.price = price

class FundDividend(db.Model):
    __tablename__ = "fund_dividends"

    id = db.Column(db.Integer, primary_key=True)
    fund_id = db.Column(db.Integer, db.ForeignKey('funds.id'))
    date = db.Column(db.Date, nullable=False)
    dividend = db.Column(db.Float, nullable=False)

    fund = db.relationship("Fund")

    def __init__(self, fund, date, price):
        self.fund = fund
        self.date = date
        self.price = price


