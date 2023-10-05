import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

import * as jwt from 'jsonwebtoken';

import envArgs from '../utils/envArgs';
import { jwtPayload } from '../mocks/Users.mock';

import SequelizeMatch from '../database/models/SequelizeMatch';

import { match, matches, matchInProgress, matchesInProgress, matchesFinished } from '../mocks/Matches.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de rota Match', () => {
  afterEach(sinon.restore);
  it('Testa se o endpoint get /matches retorna todas as matches em filtro.', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matches as any);
    
    const { body, status } = await chai.request(app).get('/matches');       
    
    expect(status).to.be.equal(200);
    expect(body).to.deep.equal(matches);
  });

  it('Testa se o endpoint get /matches?inProgress=true retorna todas as matches em progresso.', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesInProgress as any);
    
    const { body, status } = await chai.request(app).get('/matches?inProgress=true');       
    
    expect(status).to.be.equal(200);
    expect(body).to.deep.equal(matchesInProgress);
  });

  it('Testa se o endpoint get /matches?inProgress=false retorna todas as matches em progresso.', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesFinished as any);
    
    const { body, status } = await chai.request(app).get('/matches?inProgress=false');       
    
    expect(status).to.be.equal(200);
    expect(body).to.deep.equal(matchesFinished);
  });

  it('Testa se o endpoint patch /matches/id/finish finaliza uma match com sucesso.', async function () {   
    const validToken = jwt.sign(jwtPayload, envArgs.jwtSecret);    
    
    const { status, body } = await chai.request(app).patch('/matches/43/finish').set('Authorization', `Bearer ${validToken}`);    
        
    expect(status).to.be.equal(200);
    expect(body).to.deep.equal({
      message: "Finished"
    });
  });

  it('Testa se o endpoint patch /matches/id/finish retorna a mensagem esperada ao não informar um token.', async function () {
    const { status, body } = await chai.request(app).patch('/matches/43/finish');    
        
    expect(status).to.be.equal(401);
    expect(body).to.deep.equal({
      message: "Token not found"
    });
  });
});
