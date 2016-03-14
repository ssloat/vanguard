from mysite import app, db

from flask import jsonify, render_template

from mysite.vanguard import models, analysis

import collections
import numpy
import pandas
import datetime

@app.template_filter('money')
def money_filter(s):
    return "${:,.2f}".format(s)                                   

@app.route('/rest/vanguard/v1.0/funds', methods=['GET'])
def rest_vanguard_funds():
    funds = db.session.query(models.VanguardFund).all()
    return jsonify({'funds': [x.json() for x in funds]})

@app.route('/rest/vanguard/v1.0/prices/<ticker>', methods=['GET'])
def rest_vanguard_prices(ticker):
    fund = db.session.query(models.VanguardFund).filter(
        models.VanguardFund.ticker==ticker
    ).first()

    return jsonify({'prices': [x.json() for x in fund.prices]})


@app.route('/rest/vanguard/v1.0/dividends/<ticker>', methods=['GET'])
def rest_vanguard_dividends(ticker):
    fund = db.session.query(models.VanguardFund).filter(
        models.VanguardFund.ticker==ticker
    ).first()

    return jsonify({'dividends': [x.json() for x in fund.dividends]})

@app.route('/vanguard/funds', methods=['GET'])
def vanguard_funds():
    funds = db.session.query(models.VanguardFund).order_by(
        models.VanguardFund.asset_class,
        models.VanguardFund.category,
        models.VanguardFund.name,
    ).all()

    results = collections.defaultdict(dict)
    for fund in funds:
        if fund.category not in results[fund.asset_class]:
            results[fund.asset_class][fund.category] = []

        results[fund.asset_class][fund.category].append(fund)

    return render_template('vanguard/funds.html', results=results)

@app.route('/vanguard/rolling_graph/<ticker>', methods=['GET'])
def vanguard_rolling_graph(ticker):
    results = [
        [_format(x) for x in row]
        for row in analysis.rolling_table(ticker)
    ]

    return render_template('vanguard/rolling_graph.html', results=results)

def _format(x):
    if isinstance(x, numpy.float64):
        return 'null' if numpy.isnan(x) else x

    if isinstance(x, pandas.tslib.Timestamp):
        y, m, d = map(int, x.strftime('%Y-%m-%d').split('-'))
        return "new Date(%d, %d, %d)" % (y, m, d)

    if isinstance(x, datetime.date):
        return "new Date(%d, %d, %d)" % (x.year, x.month, x.day)

    return x

