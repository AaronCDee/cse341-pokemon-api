import { ObjectId } from 'mongodb';

import db from "../db/conn.mjs";

const collection = () => db.collection("pokemon");

export async function index(_req, res) {
  /*
    #swagger.description = 'Endpoint to list all pokemon.'
    #swagger.tags = ['Pokemon']
  */
  let results = await collection().find({}).toArray();

  try {
    res.status(200).send(results);
  } catch (e) {
    res.status(500).send({ errors: e });
  }
}

export async function show(req, res) {
  /*
    #swagger.description = 'Endpoint to fetch a pokemon by ID.'
    #swagger.tags = ['Pokemon']
  */
  const query  = {_id: new ObjectId(req.params.id)};
  const result = await collection().findOne(query);

  try{
    if (!result) {
      res.status(404).send({ errors: "Not found" });
    } else {
      res.status(200).send(result);
    }
  } catch (e) {
    res.status(500).send({ errors: e });
  }
}

export async function create(req, res) {
  /*
    #swagger.description = 'Register a new Pokemon to the Pokedex'
    #swagger.tags = ['Pokemon']
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      description: 'Pokemon data',
      schema: {
        $name: 'Pikachu',
        $type: 'Electric',
        $weakness: 'Ground',
        $caughtAt: '2025-05-21T10:00:00.000Z',
        $trainer: 'Ash',
        $level: 32,
        $abilities: ["Thunderbolt", "Quick Attack", "Iron Tail"]
      }
    }
  */
  const { name, type, weakness, caughtAt, abilities, trainer, level } = req.body;
  const createAttrs = { name, type, weakness, caughtAt, abilities, trainer, level };

  try {
    const result = await collection().insertOne(createAttrs);

    res.status(200).send({ _id: result.insertedId });
  } catch(e) {
    res.status(422).send({ errors: `An errors occurred while creating the pokemon: ${e}` })
  }
}

export async function update(req, res) {
  /*
    #swagger.description = 'Update a Pokemon in the Pokedex'
    #swagger.tags = ['Pokemon']
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Pokemon data',
      schema: {
        $name: 'Pikachu',
        $type: 'Electric',
        $weakness: 'Ground',
        $caughtAt: '2025-05-21T10:00:00.000Z',
        $trainer: 'Ash',
        $level: 32,
        $abilities: ["Thunderbolt", "Quick Attack", "Iron Tail"]
      }
    }
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID of the Pokemon',
      required: true,
      type: 'string',
      example: '60c72b2f5f1b2c001f5a1e9d'
    }
  */
  const filter = { _id: new ObjectId(req.params.id) };

  const { name, type, weakness, caughtAt, abilities, trainer, level } = req.body;
  const updateAttrs = { name, type, weakness, caughtAt, abilities, trainer, level };

  try {
    const result = await collection().updateOne(filter, { $set: updateAttrs });

    res.status(200).send({ success: result.acknowledged });
  } catch(e) {
    res.status(400).send({ errors: `An errors occurred while updating the pokemon: ${e}` });
  }
}

export async function destroy(req, res) {
  /*
    #swagger.description = 'Endpoint to delete a pokemon.'
    #swagger.tags = ['Pokemon']
  */
  const filter = { _id: new ObjectId(req.params.id) };

  try {
    const result = await collection().deleteOne(filter);

    res.status(200).send({ success: result.acknowledged });
  } catch(e) {
    res.status(400).send({ errors: `An errors occurred while deleting the pokemon: ${e}` });
  }
}
