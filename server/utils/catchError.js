export const catchError = (func) => async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
    }
};