module.exports =
  (controllerFn) =>
  async (...payload) => {
    try {
      await controllerFn(...payload);
    } catch (err) {
      const next = payload[payload.length - 1];
      next(err);
    }
  };
