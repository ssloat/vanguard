import os
import unittest
import datetime 

from mysite import app, db, models

from pyvirtualdisplay import Display
from selenium import webdriver

from mysite import db, models
from config import basedir

from mock import patch, PropertyMock

class TestCase(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.app = app.test_client()
        db.create_all()

        self.display = Display(visible=0, size=(800, 600))
        self.display.start()
        self.driver = webdriver.Firefox()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

        self.driver.quit()
        self.display.stop()

    def test_market_data(self):

        with patch('__main__.models.Fund.market_data_url', new_callable=PropertyMock) as mock_fund:
            mock_fund.return_value = 'file:///%s/t/test_files/advisors.html' % basedir

            fund = models.Fund(1, 'Test Type', 'Test Name', 'TEST', 'Test Class', 0.15)
            fund.category = 'Test Category'
            fund.minimum = 1000.0

            db.session.add(fund)

            fund.parse_market_data(self.driver)
            prices = db.session.query(models.FundPrice).all()
            self.assertEqual(len(prices), 10)

            fund.parse_market_data(self.driver)
            prices = db.session.query(models.FundPrice).all()
            self.assertEqual(len(prices), 10)

            self.assertEqual(len(fund.prices), 10)

            price = db.session.query(models.FundPrice).filter(
                models.FundPrice.fund==fund,
                models.FundPrice.date==datetime.date(2016, 2, 25),
            ).first()

            self.assertEqual(price.price, 180.64)

    def test_overview(self):

        with patch('__main__.models.Fund.overview_url', new_callable=PropertyMock) as mock_fund:
            mock_fund.return_value = 'file:///%s/t/test_files/personal.html' % basedir

            fund = models.Fund(1, 'Test Type', 'Test Name', 'TEST', 'Test Class', 0.15)
            fund.parse_overview(self.driver)

            self.assertEqual(fund.category, 'Taxable Money Market')
            self.assertEqual(fund.minimum, 3000.0)

if __name__ == '__main__':
    unittest.main()

