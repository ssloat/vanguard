import os
from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object('config')

db = SQLAlchemy(app)

from mysite.views import vanguard as vanguard_views
from mysite.models import vanguard as vanguard_models
