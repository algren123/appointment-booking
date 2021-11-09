import { table, minifyRecords } from './utils/Airtable';

export default async (req, res) => {
  const { date, time, name, status } = req.body;
  try {
    const createdRecords = await table.create([
      {
        fields: {
          date,
          time,
          name,
          status,
        },
      },
    ]);
    const createdRecord = {
      id: createdRecords[0].id,
      fields: createdRecords[0].fields,
    };
    res.statusCode = 200;
    res.json(createdRecord);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.json({ msg: 'Something went wrong' });
  }
};
