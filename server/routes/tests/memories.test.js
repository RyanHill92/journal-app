const expect = require('expect');
const request = require('supertest');
const validator = require('validator');
const moment = require('moment');
const {ObjectId} = require('mongodb');

const {app} = require('./../../server');
const {Memory} = require('./../../db/models/memory');
const {testMemories, populateMemories} = require('./seed');

beforeEach(populateMemories);

describe('GET /memories', () => {
  it('should return a list of all memories', (done) => {
    request(app)
      .get('/api/memories')
      .expect(200)
      .expect((res) => {
        expect(res.body.memories.length).toBe(2);
        expect(res.body.memories[0]).toHaveProperty('text', 'I remember the day I was born.');
        expect(res.body.memories[1].tags.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /memories/:tag', () => {
  it('should return an array of memories whose tag arrays include the tag', (done) => {
    let tag = testMemories[0].tags[1];
    request(app)
      .get(`/api/memories/${tag}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.memories.length).toBe(2);
        expect(res.body.memories[0]).toHaveProperty('location', 'Pittsburgh, PA');
        //Deep referencing with an array.
        expect(res.body.memories[1]).toHaveProperty(['tags', 0], 'childhood');
      })
      .end(done);
  });

  it('should return a 404 if tag does not match any memories', (done) => {
    request(app)
      .get('/api/memories/foo')
      .expect(404)
      .expect((res) => {
        expect(res.body.message.slice(0, 14)).toBe('Unable to find');
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
      .post('/api/memories')
      .send(sampleMemory)
      .expect(200)
      .expect((res) => {
        expect(typeof res.body).toBe('object');
        expect(/Apr 13th/.test(res.body.memory.date)).toBeTruthy();
        expect(res.body.memory.tags).toContain('family');
        expect(res.body.memory.placeId).toBeTruthy();
      })
      .end(err => {
        if (err) return done(err);
        Memory.findOne({text: sampleMemory.text}).then(doc => {
          expect(validator.isMongoId(doc._id.toHexString())).toBe(true);
          expect(doc.placeId).toBeTruthy();
          done();
        }).catch(err => {
          done(err);
        });
      });
  });

  //Swap out missing fields to test for each one's validator.
  it('should return a 400 for missing text or tags', (done) => {
    let badMemory = {
      text: 'Test',
      date: [2018],
      location: 'Nashville',
      tags: []
    };
    request(app)
      .post('/api/memories')
      .send(badMemory)
      .expect(400)
      .expect((res) => {
        expect(res.body.errorMessage).toBeTruthy();
        //Swap out between 'text:' and 'tags:'.
        expect(validator.isIn('tags:', res.body.errorMessage.split(' '))).toBe(true);
      })
      .end(done);
  });

  it('should set default date to present day if not passed date', (done) => {
    let datelessMemory = {
      text: 'Test',
      date: [],
      location: 'Nashville',
      tags: ['Tennessee']
    };
    request(app)
      .post('/api/memories')
      .send(datelessMemory)
      .expect(200)
      .expect(res => {
        expect(res.body.memory.date).toBe(moment().format("ddd, MMM Do, YYYY"));
        expect(res.body.memory.text).toBe(datelessMemory.text);
        expect(res.body.memory.placeId).toBeTruthy();
      })
      .end((err, res) => {
        if (err) return done(err);
        Memory.findOne({text: res.body.memory.text}).then(memory => {
          expect(validator.isMongoId(memory._id.toHexString()));
          expect(memory.date).toBe(moment().format("ddd, MMM Do, YYYY"));
          done();
        }).catch(err => {
          done(err);
        });
      });
  });
});
