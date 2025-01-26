async function logOutUser(req, res, next) {
  try {
    req.headers.authorization = null;
    res.status(200).json({ message: "Logout exitoso" });
  } catch (error) {}
}

export { logOutUser };
