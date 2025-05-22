import { ObjectId } from 'mongodb';

import db from "../db/conn.mjs";

const collection = () => db.collection("trainers");

export async function index(_req, res) {
  /*
    #swagger.description = 'Endpoint to list all trainers.'
    #swagger.tags = ['Trainers']
  */
  let results = await collection().find({}).toArray();

  res.status(200).send(results);
}

export async function show(req, res) {
  /*
    #swagger.description = 'Endpoint to fetch a trainer by ID.'
    #swagger.tags = ['Trainers']
  */
  const query  = {_id: new ObjectId(req.params.id)};
  const result = await collection().findOne(query);

  if (!result) {
    res.status(404).send({ errors: "Not found" });
  } else {
    res.status(200).send(result);
  }
}

export async function create(req, res) {
  /*
    #swagger.description = 'Register a new trainer'
    #swagger.tags = ['Trainers']
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      description: 'Trainer data',
      schema: {
        $firstName: 'Ashe',
        $lastName: 'Ketchum',
        $age: 10,
        $region: 'Kanto',
        $gender: 'male'
      }
    }
  */
  const { firstName, lastName, age, gender, region } = req.body;
  const createAttrs = { firstName, lastName, age, gender, region };

  try {
    const result = await collection().insertOne(createAttrs);

    res.status(200).send({ _id: result.insertedId });
  } catch(e) {
    res.status(422).send({ errors: `An errors occurred while creating the pokemon: ${e}` })
  }
}

export async function update(req, res) {
  /*
    #swagger.description = 'Update a trainer'
    #swagger.tags = ['Trainers']
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Trainer data',
      schema: {
        $firstName: 'Ashe',
        $lastName: 'Ketchum',
        $age: 10,
        $region: 'Kanto',
        $gender: 'male'
      }
    }
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID of the trainer',
      required: true,
      type: 'string',
      example: '60c72b2f5f1b2c001f5a1e9d'
    }
  */
  const filter = { _id: new ObjectId(req.params.id) };

  const { firstName, lastName, age, gender, region } = req.body;
  const updateAttrs = { firstName, lastName, age, gender, region };

  try {
    const result = await collection().updateOne(filter, { $set: updateAttrs });

    res.status(200).send({ success: result.acknowledged });
  } catch(e) {
    res.status(400).send({ errors: `An errors occurred while updating the pokemon: ${e}` });
  }
}

export async function destroy(req, res) {
  /*
    #swagger.description = 'Endpoint to delete a trainer.'
    #swagger.tags = ['Trainers']
  */
  const filter = { _id: new ObjectId(req.params.id) };

  try {
    const result = await collection().deleteOne(filter);

    res.status(200).send({ success: result.acknowledged });
  } catch(e) {
    res.status(400).send({ errors: `An errors occurred while deleting the pokemon: ${e}` });
  }
}
