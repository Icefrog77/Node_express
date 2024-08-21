const service = require("./posts.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function postExists(req, res, next) {
  const { postId } = req.params;
  const post = await service.read(postId);
  if (post) {
    res.locals.post = post;
    return next();
  }
  return next({ status: 404, message: `Post cannot be found.` });
}

async function create(req, res) {
    const post =  req.body.data;
    const newPost = await service.create(post);
    res.status(201).json({ data: newPost }); 
};

async function update(req, res) {
    const post=req.body.data;
    const updatedPost = await service.update(post);
    res.status(200).json({ data: updatedPost }); 
}

async function destroy(req, res, next) {
    const { postId } = req.params;  
    await service.delete(postId); 
    res.status(204).end();  
}

module.exports = {
  create: asyncErrorBoundary(create),
  update: [asyncErrorBoundary(postExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(postExists), asyncErrorBoundary(destroy)]
};
