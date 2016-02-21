from . import app, db

from flask import render_template, redirect, url_for
from flask.ext.login import login_user, logout_user, current_user


@app.route('/')
def index():
    return render_template('index.html')

