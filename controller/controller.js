const fs = require('fs');
const { PdfReader } = require('pdfreader');
const path = require('path');

let lines = [];

function getLastJobInfo(lines) {
  for (let i = 0; i < lines.length - 3; i++) {
    const jobTitle = lines[i].trim();
    const companyRaw = lines[i + 3].trim();

    if (jobTitle === "Software Engineer" && companyRaw.includes("Aquarius Systems Inc.")) {
      const companyName = companyRaw.split("|")[0].trim();
      return { jobTitle, companyName };
    }
  }
  return null;
}

function handleResumeQuestion(req, res) {
  const question = req.query.q;

  if (!question || !question.toLowerCase().includes("role")) {
    return res.status(400).send("Please ask about your role.");
  }

  lines = [];

  fs.readFile(path.join(__dirname, '../MendozaResume.pdf'), (err, pdfBuffer) => {
    if (err) {
      return res.status(500).send("Error reading resume.");
    }

    new PdfReader().parseBuffer(pdfBuffer, (err, item) => {
      if (err) {
        return res.status(500).send("Error parsing PDF.");
      } else if (!item) {
        const result = getLastJobInfo(lines);
        if (result) {
          return res.send(`Your last role was ${result.jobTitle} at ${result.companyName}.`);
        } else {
          return res.send("Sorry, I couldn't find your last role.");
        }
      } else if (item.text) {
        lines.push(item.text);
      }
    });
  });
}

module.exports = {
  handleResumeQuestion
};
