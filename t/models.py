import os
import unittest
import datetime 

from mysite import app, db, models

from pyvirtualdisplay import Display
from selenium import webdriver

from mysite import db, models

from mock import patch, PropertyMock

class TestCase(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.app = app.test_client()
        db.create_all()

        self.path = os.path.dirname(os.path.abspath(__file__))

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_market_data(self):
        display = Display(visible=0, size=(800, 600))
        display.start()
        driver = webdriver.Firefox()

        with patch('__main__.models.Fund.market_data_url', new_callable=PropertyMock) as mock_fund:
            mock_fund.return_value = 'file:///%s/test_files/advisors.html' % self.path

            fund = models.Fund(1, 'Test Type', 'Test Name', 'TEST', 'Test Class', 0.15)
            fund.category = 'Test Category'
            fund.minimum = 1000.0

            db.session.add(fund)

            fund.parse_market_data(driver)
            prices = db.session.query(models.FundPrice).all()
            self.assertEqual(len(prices), 10)

            fund.parse_market_data(driver)
            prices = db.session.query(models.FundPrice).all()
            self.assertEqual(len(prices), 10)

            self.assertEqual(len(fund.prices), 10)

            price = db.session.query(models.FundPrice).filter(
                models.FundPrice.fund==fund,
                models.FundPrice.date==datetime.date(2016, 2, 25),
            ).first()

            self.assertEqual(price.price, 180.64)

        driver.quit()
        display.stop()

if __name__ == '__main__':
    unittest.main()

