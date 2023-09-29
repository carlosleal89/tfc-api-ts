import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

import { team, teams } from '../mocks/Teams.mock';
import SequelizeTeam from '../database/models/SequelizeTeam';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de Teams', () => {
  afterEach(sinon.restore);
  it('Testa se o /teams retorna uma lista com os times.', async function () {
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);
    
    const { body, status } = await chai.request(app).get('/teams');       
    
    expect(status).to.be.equal(200);
    expect(body).to.deep.equal(teams);
  });

  it('Testa se o /teams:id retorna o time esperado.', async function () {
    sinon.stub(SequelizeTeam, 'findOne').resolves(team as any);
    
    const { body, status } = await chai.request(app).get('/teams/1');       
    
    expect(status).to.be.equal(200);
    expect(body).to.deep.equal(team);
  });

  it('Testa se o /teams:id retorna a mensagem esperado ao não encontrar um id.', async function () {
    sinon.stub(SequelizeTeam, 'findOne').resolves(null as any);

    const errorMsg = {
      "message": "Team not found"
    }

    const { body, status } = await chai.request(app).get('/teams/66');       
    
    expect(status).to.be.equal(404);
    expect(body).to.deep.equal(errorMsg);
  });
});
