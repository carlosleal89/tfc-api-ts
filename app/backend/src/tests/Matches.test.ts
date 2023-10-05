import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

import { token } from '../mocks/Users.mock';

import SequelizeMatch from '../database/models/SequelizeMatch';

import { match, matches } from '../mocks/Matches.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de rota Match', () => {
  afterEach(sinon.restore);
  it('Testa se o endpoint get /matches retorna todas as matches em filtro.', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matches as any);
    
    const { body, status } = await chai.request(app).get('/matches');       
    
    expect(status).to.be.equal(200);
    expect(body).to.deep.equal(matches);
  })
});
