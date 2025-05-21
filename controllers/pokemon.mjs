import { ObjectId } from 'mongodb';

import db from "../db/conn.mjs";

const collection = () => db.collection("pokemon");

export async function index(_req, res) {
  /* #swagger.description = 'Endpoint to list all pokemon.' */
  let results = await collection().find({}).toArray();

  res.status(200).send(results);
}

export async function show(req, res) {
  /* #swagger.description = 'Endpoint to fetch a pokemon by ID.' */
  const query  = {_id: new ObjectId(req.params.id)};
  const result = await collection().findOne(query);

  if (!result) {
    res.status(404).send({ errors: "Not found" });
  } else {
    res.status(200).send(result);
  }
}

/**
 *
 * @param {*} req
 * @param {*} res
 *
 * @returns {string} the new pokemon id
 */
export async function create(req, res) {
  /* #swagger.description = 'Endpoint to create a pokemon.' */
  try {
    const result = await collection().insertOne(createAttrs);

    res.status(200).send({ _id: result.insertedId });
  } catch(e) {
    res.status(422).send({ errors: `An errors occurred while creating the pokemon: ${e}` })
  }
}

export async function update(req, res) {
  /* #swagger.description = 'Endpoint to update a pokemon.' */
  const filter = { _id: new ObjectId(req.params.id) };

  const { name, type, weakness, caughtAt } = req.body;

  const allowedAttrs = { name, type, weakness, caughtAt };
  const updateAttrs  = Object.keys(allowedAttrs).reduce((acc, key) => {
    if (!isEmpty(allowedAttrs[key])) {
      acc[key] = allowedAttrs[key];
    }

    return acc;
  }, {})

  try {
    const result = await collection().updateOne(filter, { $set: updateAttrs });

    res.status(200).send({ success: result.acknowledged });
  } catch(e) {
    res.status(400).send({ errors: `An errors occurred while updating the pokemon: ${e}` });
  }
}

export async function destroy(req, res) {
  /* #swagger.description = 'Endpoint to delete a pokemon.' */
  const filter = { _id: new ObjectId(req.params.id) };

  try {
    const result = await collection().deleteOne(filter);

    res.status(200).send({ success: result.acknowledged });
  } catch(e) {
    res.status(400).send({ errors: `An errors occurred while deleting the pokemon: ${e}` });
  }
}
