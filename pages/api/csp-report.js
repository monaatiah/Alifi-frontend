export default async function handler(req, res) {
  try {
    const report = req.body || {};
    // اطبع في اللوج – هتشوف السكربت المسبب والـ stack تقريبًا
    console.log("CSP report:", JSON.stringify(report, null, 2));
  } catch (e) {
    console.error(e);
  }
  res.status(204).end(); // لا ترجع جسم
}

export const config = {
  api: {
    bodyParser: { type: ["application/json", "application/csp-report"] },
  },
};
