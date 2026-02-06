import createError from "../utils/createError.js";
export const verifyToken = async (req,res, next) => {
    const token = req.cookies.accessToken;
        if(!token) return next(createError(401, "User is not authenticated."));

         jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
              if(err) return next(createError(403, "Invalid token."))
              req.userId = payload.id;
              req.isSeller = payload.isSeller;
              next(); // we need the next middleware to run.
            });
}