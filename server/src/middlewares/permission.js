import jwt from "jsonwebtoken";

const permission = (...allowedRoles) => {
  return (req, res, next) => {
    const token = req.cookies["_user_"];

    if (!token) return res.sendStatus(401);

    if (token) {
      let decodedData;

      decodedData = jwt.verify(token, process.env.SECRET_KEY);

      const rolesArray = [decodedData.user.role];
      const result = rolesArray
        .map((role) => allowedRoles.includes(role))
        .find((val) => val === true);
  
      if (!result) return res.sendStatus(401);

      next();
    }
  };
};

export default permission;