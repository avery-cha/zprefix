/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE items CASCADE')
  await knex('items').del()
  await knex('items').insert([
    {UserId: 1, Name: 'squat rack', Description: 'Large metal frame used for compound lifts. Does not come with the plates.', Quantity: 1},
    {UserId: 1, Name: '45lb plate', Description: 'Olympic sized plate weighing 45lbs. Compatible with standard olympic barbell. Good for stacking, thin width.', Quantity: 6},
    {UserId: 1, Name: 'barbell', Description: 'Standard olympic barbell weighing 45lbs.', Quantity: 2},
    {UserId: 2, Name: 'headphones', Description: 'Great quality, noise cancelling.', Quantity: 3},
    {UserId: 2, Name: 'speakers', Description: 'Bass thumping', Quantity: 2},
    {UserId: 2, Name: 'beat machine', Description: 'Excellent machine with a large variety of beats and tempos to mix excellent songs', Quantity: 1},
    {UserId: 3, Name: 'notebook', Description: 'standard leather notebook with college ruled paper, around 250 pages and an envelop on each cover', Quantity: 5},
    {UserId: 3, Name: 'pen', Description: '0.7mm blue ink pen with ribbed grip', Quantity: 20},
    {UserId: 3, Name: 'voice recorder', Description: 'Portable voice recorder to capture sessions and playback easily', Quantity: 1},

  ]);
};
