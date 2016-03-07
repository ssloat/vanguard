from mysite import db

from mysite.vanguard import models

import pandas
import numpy
import datetime


def rolling_table(ticker):

    fund = db.session.query(models.VanguardFund).filter(
        models.VanguardFund.ticker==ticker
    ).first()

    ts = pandas.Series(
        [x.price for x in fund.prices], 
        index=pandas.to_datetime([x.date for x in fund.prices]),
    )

    x = pandas.concat(
        [
            ts, 
            pandas.rolling_mean(ts, 30), 
            pandas.rolling_mean(ts, 90),
            pandas.rolling_mean(ts, 180)
        ],
        axis=1
    )

    return [
        (
            _to_date(d), _to_float(x[0][d]), _to_float(x[1][d]), 
            _to_float(x[2][d]), _to_float(x[3][d])
        )
        for d in x.index
    ]

def _to_float(pd_float):
    return None if numpy.isnan(pd_float) else pd_float

def _to_date(pd_date):
    y, m, d = map(int, pd_date.strftime('%Y-%m-%d').split('-'))
    return datetime.date(y, m, d)

