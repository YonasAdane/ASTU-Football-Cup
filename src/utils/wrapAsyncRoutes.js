import asyncHandler from "./asyncHandler.js";

const wrapAsyncRoutes = (router) => {
  router.stack.forEach(layer => {
    if (layer.route) {
      layer.route.stack.forEach(route => {
        route.handle = asyncHandler(route.handle);
      });
    }
  });
  return router;
};

export { wrapAsyncRoutes };
