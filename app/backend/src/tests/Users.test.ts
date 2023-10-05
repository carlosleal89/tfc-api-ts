import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import * as jwt from 'jsonwebtoken';

import { Response } from 'superagent';

import { token, jwtPayload } from '../mocks/Users.mock';

import envArgs from '../utils/envArgs';

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
    expect(response.body).to.haveOwnProperty('token');
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
      password: '092898',
    }

    const errorMsg = {
      "message": "Invalid email or password"
    }
    
    const { body, status } = await chai.request(app).post('/login').send(bodyInvalidEmail);       
    
    expect(status).to.be.equal(401);
    expect(body).to.deep.equal(errorMsg);
  });

  it('Testa se o endpoint get /role retorna a mensagen de erro esperada ao não informar um token válido.', async function () {    
    const { status, body } = await chai.request(app).get('/login/role').set('Authorization', 'invalidToken');
        
    expect(status).to.be.equal(401);
    expect(body).to.deep.equal({ message: 'Token must be a valid token' });
  });

  it('Testa se o endpoint get /role retorna o role do user ao informar um token válido.', async function () {   
    const validToken = jwt.sign(jwtPayload, envArgs.jwtSecret);    
    
    const { status, body } = await chai.request(app).get('/login/role').set('Authorization', `Bearer ${validToken}`);    
        
    expect(status).to.be.equal(200);
    expect(body).to.deep.equal({
      role: "admin"
    });
  });

  it('Testa se o endpoint get /role retorna a mensagem esperada ao não informar um token.', async function () { 
    
    const { status, body } = await chai.request(app).get('/login/role');    
        
    expect(status).to.be.equal(401);
    expect(body).to.deep.equal({
      message: "Token not found"
    });
  });
});
