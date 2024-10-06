import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  // Get token from the Authorization header
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information to request object
    req.user = decoded; // { userId: user._id, ... }

    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};
