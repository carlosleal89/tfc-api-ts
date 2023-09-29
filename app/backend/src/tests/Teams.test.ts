import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de Teams', () => {
  afterEach(sinon.restore);
  it('Testa se o /teams retornar uma lista com os times.', async function () {
    
    const data = await chai.request(app).get('/teams');
    console.log(data);
    
    // expect(status).to.be.equal(200);
  });
});
