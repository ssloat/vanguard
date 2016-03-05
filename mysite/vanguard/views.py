from mysite import app, db

from flask import jsonify

from mysite.vanguard.models import VanguardFund, VanguardPrice, VanguardDividend


@app.route('/rest/vanguard/v1.0/funds', methods=['GET'])
def vanguard_funds():
    return jsonify({'funds': [x.json() for x in db.session.query(VanguardFund).all()]})

@app.route('/rest/vanguard/v1.0/prices/<ticker>', methods=['GET'])
def vanguard_prices(ticker):
    prices = db.session.query(VanguardFund).filter(
        VanguardFund.ticker==ticker
    ).first().prices

    return jsonify({'prices': [x.json() for x in prices]})

@app.route('/rest/vanguard/v1.0/dividends/<ticker>', methods=['GET'])
def vanguard_dividends(ticker):
    prices = db.session.query(VanguardFund).filter(
        VanguardFund.ticker==ticker
    ).first().dividends

    return jsonify({'dividends': [x.json() for x in dividends]})
