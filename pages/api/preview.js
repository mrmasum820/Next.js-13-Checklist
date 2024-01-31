export default function handler(req, res) {
  res.setPreviewData({ user: "MR Masum" });
  res.redirect(req.query.redirect);
}
