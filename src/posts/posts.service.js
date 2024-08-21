const knex = require("../db/connection");

function create(postData) {
    return knex("posts")
        .insert(postData)
        .returning("*")  // Ensure all columns of the newly created row are returned
        .then(rows => rows[0]);  // Grab the first row from the returned array
}

function read(postId) {
  return knex("posts").select("*").where({ post_id: postId }).first();
}

function update(post) {
  return knex("posts")
    .where('post_id', post.post_id)
    .update({post_body: post.post_body,post_title: post.post_title})
    .returning("*") 
    .then(rows => rows[0]); 
}

function destroy(postId) {
  return knex("posts")
    .where('post_id', postId) 
    .del();  
}

module.exports = {
  create,
  read,
  update,
  delete: destroy,
};
