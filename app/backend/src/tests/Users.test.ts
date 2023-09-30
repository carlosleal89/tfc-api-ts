import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

import token from '../mocks/Users.mock';

import SequelizeUsers from '../database/models/SequelizeUsers';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de Users', () => {
  afterEach(sinon.restore);
  it('Testa se o endpoint /login faz login com sucesso.', async function () {
    const body = {
      email: 'user@user.com',
      password: 'secret_user',
    }

    const response = await chai.request(app).post('/login').send(body);       
    
    expect(response.status).to.be.equal(200);    
  });

  it('Testa se o endpoint /login retorna a mensagen de erro esperada ao informar email ou senha invalidos.', async function () {
    const bodyInvalidEmail = {
      email: '@user.com',
      password: 'secret_user',
    }

    const errorMsg = {
      "message": "Invalid email or password"
    };

    const res = await chai.request(app).post('/login').send(bodyInvalidEmail);       
    
    expect(res.status).to.be.equal(401);
    expect(res.body).to.be.deep.equal(errorMsg);
  });

  it('Testa se o endpoint /login retorna a mensagen de erro esperada ao informar um email inexistente.', async function () {
    sinon.stub(SequelizeUsers, 'findOne').resolves(null as any);

    const bodyInvalidEmail = {
      email: 'jill.valentine@user.com',
      password: 'nemesis',
    }

    const errorMsg = {
      "message": "Invalid email or password"
    }
    
    const { body, status } = await chai.request(app).post('/login').send(bodyInvalidEmail);       
    
    expect(status).to.be.equal(401);
    expect(body).to.deep.equal(errorMsg);
  });
});
