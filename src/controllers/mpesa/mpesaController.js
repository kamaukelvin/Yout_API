const axios = require('axios').default;
require('dotenv').config();
const datetime = require('node-datetime');

const passkey = process.env.lipa_na_mpesa_passkey;
const bs_short_code = process.env.lipa_na_mpesa_shortcode;
const consumer_key = process.env.consumer_key;
const consumer_secret = process.env.consumer_secret;

const dt = datetime.create();
const formated = dt.format('YmdHMS');
console.log(formated);

// const newPassword = () => {
//   const passString = bs_short_code + passkey + formated;
//   const base64EncodedPassword = Buffer.from(passString).toString('base64');

//   return base64EncodedPassword;
// };

// const newPassword = Buffer.from(
//   `${bs_short_code}${passkey}${formated}}`
// ).toString('base64');

const newPassword = (timeStamp) => {
  // const passString = bs_short_code + passkey + formated;
  // const base64EncodedPassword = Buffer.from(passString).toString('base64');

  const password = Buffer.from(
    `${bs_short_code}${passkey}${timeStamp}`
  ).toString('base64');

  return password;
};

exports.token = (req, res, next) => {
  const url = process.env.oauth_token_url;
  const auth =
    'Basic ' +
    Buffer.from(consumer_key + ':' + consumer_secret).toString('base64');

  const headers = {
    Authorization: auth,
  };

  axios
    .get(url, {
      headers: headers,
    })
    .then((response) => {
      let data = response.data;
      let access_token = data.access_token;
      req.token = access_token;
      next();
      console.log(access_token);
    })
    .catch((err) => console.log(err));
};

exports.mpesaPassword = (req, res) => {
  res.send(newPassword);
  // res.send(newPassword());
};

exports.stkPush = (req, res) => {
  const token = req.token;

  const headers = {
    Authorization: 'Bearer ' + token,
  };

  const stkURL = process.env.lipa_na_mpesa_url;

  // let data = {
  //   BusinessShortCode: bs_short_code,
  //   Password: newPassword(),
  //   Timestamp: formated,
  //   TransactionType: 'CustomerPayBillOnline',
  //   Amount: '10',
  //   PartyA: '254710530530',
  //   PartyB: bs_short_code,
  //   PhoneNumber: '254710530530',
  //   CallBackURL: 'https://42e994f87712.ngrok.io/api/mpesa/stk/push',
  //   AccountReference: 'Olive & Basil Vegan Plant Based',
  //   TransactionDesc: 'lipa na mpesa',
  // };

  // axios
  //   .post(stkURL, data, { headers: headers })
  //   .then(function (response) {
  //     console.log(response.data);
  //     res.send(response.data);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  const timeStamp = new Date()
    .toISOString()
    .replace(/[^0-9]/g, '')
    .slice(0, -3);

  var data = {
    BusinessShortCode: bs_short_code,
    Password: newPassword(timeStamp),
    Timestamp: timeStamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: req.body.amount,
    PartyA: req.body.phoneNumber,
    PartyB: bs_short_code,
    PhoneNumber: req.body.phoneNumber,
    CallBackURL: req.body.url,
    AccountReference: 'Olive and Basil',
    TransactionDesc: 'Payment of X',
  };

  var config = {
    headers: headers,
  };

  axios
    .post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      data,
      config
    )
    .then((response) => {
      res.json();
      console.log(response.data);
      console.log(data);
    })
    .catch((error) => console.log(error.response));
};

exports.callback = (req, res) => {
  console.log('------STK------');
  console.log(req.body);
  res.send({ status: 'success' });
};
