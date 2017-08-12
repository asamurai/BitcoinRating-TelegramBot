# BitcoinRating-TelegramBot
![N|Solid](https://www.sendowl.com/blog/images/bitcoin-exchange-rates.png)
---
[Bitcoin rating bot for telegram](https://t.me/BitcoinRaitingBot). You can get official price for bitcoin for any date and any currency.
---
# Bot command list: 
  - ``/start`` - Information about Bot.
  - ``/commands`` - Available options and commands for bot.
  - ``/today`` - Shows you bitcoin price for today. Default currency is USD.
  - ``/yesterday`` - Shows you bitcoin price for yesterday. Default currency is USD.
  - ``/start=YYYY-MM-DD /end=YYYY-MM-DD`` - Shows you bitcoin price for yesterday. Default currency is USD.
  - ``/currency=<CURRENCY>`` - Shows you bitcoin price for selected currency. Just put your currency insted of '<CURRENCY>'. You can combine this option with other any date option. Default date is today date.

## Examples

#### Demo 1
``/currency=EUR`` or ``/today /currency=EUR`` - Shows you bitcoin price for today, currency is euro.
#### Output:
``For today the bitcoin price is 3125 EUR.``

#### Demo 2
``/yesterday /currency=UAH`` - Shows you bitcoin price for yesterday, currency is ukrainian hryvna.
#### Output:
``For yesterday the bitcoin price was 94024 UAH.``

#### Demo 2
``/start=2017-03-03 /end=2017-03-05 /currency=USD`` - Shows you bitcoin rating for period from 2017-03-03 to 2017-03-05, currency is USD.
#### Output:
``Bitcoin rate for period:``
``Mar 3rd 17 - 1291 USD``
``Mar 4th 17 - 1268 USD``
``Mar 5th 17 - 1278 USD``

---
Join Telegram: [@BitcoinRaitingBot](https://t.me/BitcoinRaitingBot)
---
#### LICENSE

ISC