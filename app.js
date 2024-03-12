/*
 * Copyright 2022 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { GoogleAuth } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const { geRedeemMoneyClassId, reedemMoneyOfferclass, redeemMoneyOfferObject } = require('./pass_classes/redeem_offer.js');
// TODO: Define Issuer ID
const issuerId = '3388000000022317399';

// TODO: Define Class ID
const classId = `${issuerId}.codelab_class`;

const baseUrl = 'https://walletobjects.googleapis.com/walletobjects/v1';

const credentials = require('./key.json');

const httpClient = new GoogleAuth({
  credentials: credentials,
  scopes: 'https://www.googleapis.com/auth/wallet_object.issuer'
});

async function createPassClass(req, res) {
  // TODO: Create a Generic pass class
  let genericClass = reedemMoneyOfferclass(issuerId);
  let classId = geRedeemMoneyClassId(issuerId);
  let response;
  try {
    // Check if the class exists already
    response = await httpClient.request({
      url: `${baseUrl}/genericClass/${classId}`,
      method: 'GET'
    });

    console.log('Class already exists');
    console.log(response);
  } catch (err) {
    if (err.response && err.response.status === 404) {
      // Class does not exist
      // Create it now
      response = await httpClient.request({
        url: `${baseUrl}/genericClass`,
        method: 'POST',
        data: genericClass
      });

      console.log('Class insert response');
      console.log(response);
    } else {
      // Something else went wrong
      console.log(err);
      res.send('Something went wrong...check the console logs!');
    }
  }

}

async function createPassObject(req, res) {
  let amount = req.query.amount;
  let code = req.query.code;
  // TODO: Create a new Generic pass for the user
  let genericObject = redeemMoneyOfferObject(issuerId, amount, code);

  // TODO: Create the signed JWT and link
  const claims = {
    iss: credentials.client_email,
    aud: 'google',
    origins: [],
    typ: 'savetowallet',
    payload: {
      genericObjects: [
        genericObject
      ]
    }
  };


  const token = jwt.sign(claims, credentials.private_key, { algorithm: 'RS256' });
  const saveUrl = `https://pay.google.com/gp/v/save/${token}`;

  res.send(saveUrl);

}

const app = express();

app.get('/token', async (req, res) => {
  await createPassObject(req, res);
});
app.listen(3000);