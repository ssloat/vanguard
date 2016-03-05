from . import app, db

from flask import render_template, redirect, url_for, jsonify

from mysite.models.vanguard import VanguardFund, VanguardPrice, VanguardDividend


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/rest/vanguard/v1.0/funds', methods=['GET'])
def vanguard_funds():
    resp = [
        {
            'id': x.id,
            'name': x.name,
            'fund_type': x.fund_type,
            'ticker': x.ticker,
            'asset_class': x.asset_class,
            'exp_ratio': x.exp_ratio,
            'category': x.category,
            'minimum': x.minimum,
        }
        for x in db.session.query(VanguardFund).all()
    ]

    return jsonify({'funds': resp})

@app.route('/rest/vanguard/v1.0/prices/<ticker>', methods=['GET'])
def vanguard_prices(ticker):
    resp = [
        { 'date': x.date.strftime('%Y-%m-%d'), 'price': x.price }
        for x in db.session.query(VanguardFund).filter(
            VanguardFund.ticker==ticker
        ).first().prices
    ]

    return jsonify({'prices': resp})

@app.route('/rest/vanguard/v1.0/dividends/<ticker>', methods=['GET'])
def vanguard_dividends(ticker):
    resp = [
        { 
            'dividend_type': x.dividend_type,
            'price_per_share': x.price_per_share,
            'payable_date': x.payable_date.strftime('%Y-%m-%d'),
            'record_date': x.record_date.strftime('%Y-%m-%d'),
            'reinvest_date': x.reinvest_date.strftime('%Y-%m-%d'),
            'reinvest_price': x.reinvest_price,
        }
        for x in db.session.query(VanguardFund).filter(
            VanguardFund.ticker==ticker
        ).first().dividends
    ]

    return jsonify({'dividends': resp})
