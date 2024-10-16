const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0, httpOnly: true });
    res.status(200).json({ message: "logout" });
  } catch (error) {
    console.error("Error in logout:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { logout };
