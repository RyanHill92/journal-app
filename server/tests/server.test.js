const expect = require('expect');
const request = require('supertest');
const {ObjectId} = require('mongodb');

const {app} = require('./../server');
const {Memory} = require('./../db/models/memory');
const {testMemories, populateMemories} = require('./seed');

beforeEach(populateMemories);

describe('GET /memories', () => {
  it('should return a list of all memories', (done) => {
    request(app)
      .get('/memories')
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBe(2);
        expect(res.body[0]).toHaveProperty('text', 'I remember the day I was born.');
        expect(res.body[1].tags.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /memories/:tag', () => {
  it('should return an array of memories whose tag arrays include the tag', (done) => {
    let tag = testMemories[0].tags[1];
    request(app)
      .get(`/memories/${tag}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBe(2);
        expect(res.body[0]).toHaveProperty('location', 'Pittsburgh, PA');
        //Deep referencing with an array.
        expect(res.body[1]).toHaveProperty(['tags', 0], 'childhood');
      })
      .end(done);
  });
});

describe('POST /memories', ()=> {
  it('should return a memory object and store to DB', (done) => {
    let sampleMemory = {
      date: [1993, 4, 13],
      location: 'Greeley, CO, 80543',
      text: 'Anna remembers being born.',
      tags: ['origins', 'family']
    };
    request(app)
      .post('/memories')
      .send(sampleMemory)
      .expect(200)
      .expect((res) => {
        expect(typeof res.body).toBe('object');
        expect(/Apr 13th/.test(res.body.date)).toBeTruthy();
        expect(res.body.tags).toContain('family');
      })
      .end((err, res) => {
        if (err) return done(err);
        Memory.findOne({text: sampleMemory.text}).then((doc) => {
          expect(doc._id).toBeTruthy();
          done();
        }).catch((err) => {
          done(err);
        });
      });
  });
});
