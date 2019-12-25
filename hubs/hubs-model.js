const db = require('../data/dbConfig.js')
const { myLogger } = require('../myLogger');

module.exports = {
  find,
  findById,
  add,
  remove,
  update,
  findHubMessages
};

function find(query) {
  let { page = 1, limit = 5, sortby = 'id', sortdir = 'asc' } = query;
  const offset = limit * (page - 1);

  let rows = db('hubs')
    .orderBy(sortby, sortdir)
    .limit(limit)
    .offset(offset);

  return rows;
}

function findById(id) {
  return db('hubs')
    .where({ id })
    .first();
}

async function add(hub) {
  const [id] = await db('hubs').insert(hub);

  return findById(id);
}

function remove(id) {
  return db('hubs')
    .where({ id })
    .del();
}

async function update(id, changes) {
  myLogger([changes]);
  await db('hubs')
    .where({ id })
    .update(changes, '*');

  return findById(id);
}

function findHubMessages(hubId) {
  return db('messages as m')
    .join('hubs as h', 'm.hub_id', 'h.id')
    .select('m.id', 'm.text', 'm.sender', 'h.id as hubId', 'h.name as hub')
    .where({ hub_id: hubId });
}
