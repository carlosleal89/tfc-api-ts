import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

// import { team, teams } from '../mocks/Teams.mock';
import SequelizeUsers from '../database/models/SequelizeUsers';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de Users', () => {
  afterEach(sinon.restore);
  it('Testa se o endpoint /login faz login com sucesso.', async function () {
    // sinon.stub(SequelizeUsers, 'findAll').resolves(teams as any);
    
    const { body, status } = await chai.request(app).get('/login');       
    
    expect(status).to.be.equal(200);    
  });

  it('Testa se o endpoint /login retorna as mensagens de erro esperadas ao não informar email ou senha.', async function () {
    // sinon.stub(SequelizeUsers, 'findOne').resolves(team as any);
    
    const { body, status } = await chai.request(app).get('/login');       
    
    expect(status).to.be.equal(400);
  });

  it('Testa se o endpoint /login retorna as mensagens de erro esperadas informar email ou senha invalido.', async function () {
    // sinon.stub(SequelizeUsers, 'findOne').resolves(team as any);
    
    const { body, status } = await chai.request(app).get('/login');       
    
    expect(status).to.be.equal(401);
  });
});
