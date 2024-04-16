/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {First: 'Taylor', Last: 'Wong', Username: 'trwong', Password: 'please'},
    {First: 'Aaron', Last: 'Strauli', Username: 'strauliberry', Password: 'opensesame'},
    {First: 'Stephen', Last: 'Cha', Username:'chaaa', Password: 'haha'}
  ]);
};
