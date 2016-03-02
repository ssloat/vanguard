import os
import unittest
import datetime 

from mysite import app, db

from pyvirtualdisplay import Display
from selenium import webdriver

from config import basedir

from extract import extract_funds

from mock import patch

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

    def test_extract_funds(self):
        funds = extract_funds(
            # some javascript going on that I can't figure out how to mock
            #'file:///%s/t/test_files/list_mutual_funds.html' % basedir,

            self.driver
        )

        self.assertEqual(len(funds), 124)



if __name__ == '__main__':
    unittest.main()

