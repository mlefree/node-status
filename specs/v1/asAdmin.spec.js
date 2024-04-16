const chai = require('chai');
chai.use(require('chai-as-promised'));
const assert = chai['assert'];
const should = chai.should();
const {promisify} = require('util');
const sleep = promisify(setTimeout);


const {
  $app,
  request,
} = require('../helper');
const {expect} = require('chai');

describe('as Technical Administrator', () => {


  before(async () => {
  });

  it('should (get) status', async () => {
    const res = await request(await $app)
      .get('/v1/status')
      .expect('Content-Type', /application\/json/).expect(200);

    expect(res.body.version).to.contain('1.');
    expect(res.body.env).to.eq('test');
    expect(res.body.ok).to.eq(true);
    expect(JSON.stringify(res.body.os)).to.contain('cpu', JSON.stringify(res.body));
    expect(JSON.stringify(res.body.os)).to.contain('mem', JSON.stringify(res.body));
    expect(JSON.stringify(res.body.os)).to.contain('disk', JSON.stringify(res.body));
  });

});
