const { db } = require("./connection.js");
const jwt = require("jsonwebtoken");

const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).json({ error: "Internal server error" });

    return res.status(200).json(data);
  });
};

const getPost = (req, res) => {
  const q =
    "SELECT p.id, u.username, p.title, p.desc, p.img, u.img AS userImg, p.cat, p.date FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json({ error: "Internal server error" });

    if (!data.length) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.status(200).json(data[0]);
  });
};

const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json({ error: "Invalid token" });

    const q =
      "INSERT INTO posts (title, `desc`, img, cat, `date`, uid) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json({ error: "Internal server error" });

      return res.status(201).json({ message: "Post created successfully" });
    });
  });
};

const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json({ error: "Invalid token" });

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE id = ? AND uid = ?";
    const values = [postId, userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json({ error: "Internal server error" });

      if (!data.affectedRows) {
        return res.status(404).json({ error: "Post not found or not authorized" });
      }

      return res.status(200).json({ message: "Post deleted successfully" });
    });
  });
};

const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json({ error: "Invalid token" });

    const postId = req.params.id;
    const q =
      "UPDATE posts SET title=?, `desc`=?, img=?, cat=? WHERE id = ? AND uid = ?";
    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      postId,
      userInfo.id,
    ];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json({ error: "Internal server error" });

      if (!data.affectedRows) {
        return res.status(404).json({ error: "Post not found or not authorized" });
      }

      return res.status(200).json({ message: "Post updated successfully" });
    });
  });
};

module.exports = { getPosts, getPost, addPost, deletePost, updatePost };
