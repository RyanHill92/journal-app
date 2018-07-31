const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Memory} = require('./../db/models/memory');

describe('POST /memories', ()=> {
  it('should return a memory object and store to DB', (done) => {
    let sampleMemory = {
      date: [1992, 9, 1],
      location: 'Nashville, TN, 37215',
      text: 'I remember being born',
      tags: ['origins', 'family']
    };
    request(app)
      .post('/memories')
      .send(sampleMemory)
      .expect(200)
      .expect((res) => {
        expect(typeof res.body).toBe('object');
        expect(typeof res.body.date).toBe('string');
        expect(res.body.tags).toContain('family');
      })
      .end((err, res) => {
        if (err) return done(err);
        Memory.findOne({text: sampleMemory.text}).then((doc) => {
          expect(doc).toHaveProperty('_id');
          done();
        }).catch((err) => {
          done(err);
        });
      });
  });
});
