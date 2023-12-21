import fs from "node:fs/promises";
import http from "node:http";
import open from "open";

const interpolate = (html, data) => {
  // {{ name }} -> data.name
  return html.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, placeholder) => {
    return data[placeholder] || "";
  });
};

const formatNotes = (notes) => {
  return notes
    .map(
      (note) => `
        <div class="note"> 
            <h1>${note.content}</h1>
            <span
            style="display: flex; flex-direction: column; justify-content: space-between; align-items: center;"
            >
               ${note.tags.map((tag) => `<span >${tag}</span>`)} 
            </span>
        </div>`
    )
    .join("\n");
};

const createServer = (notes) => {
  return http.createServer(async (req, res) => {
    const HTML_PATH = "./src/template.html";
    const template = await fs.readFile(HTML_PATH, "utf-8");
    const html = interpolate(template, {
      notes: formatNotes(notes),
    });
    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    res.end(html);
  });
};

export const startServer = (notes) => {
  const server = createServer(notes);
  server.listen(7777, () => {
    console.log("Server is running on port 7777");
    open("http://localhost:7777");
  });
};
