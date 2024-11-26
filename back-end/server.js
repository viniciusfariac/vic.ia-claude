import { GoogleGenerativeAI } from '@google/generative-ai';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { marked } from 'marked';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

marked.setOptions({
    breaks: true,
    mangle: false,
    headerIds: false,
    gfm: true, // GitHub Flavored Markdown
    // Personalizar as classes dos elementos
    renderer: new marked.Renderer(),
    highlight: function(code, language) {
        return `<pre class="language-${language}"><code>${code}</code></pre>`;
    }
});

// Se necessário, você pode personalizar ainda mais o renderer
const renderer = new marked.Renderer();

renderer.link = function(href, title, text) {
    return `<a href="${href}" title="${title || ''}" target="_blank" rel="noopener noreferrer">${text}</a>`;
};

renderer.image = function(href, title, text) {
    return `<img src="${href}" alt="${text}" title="${title || ''}" style="max-width: 100%; height: auto;">`;
};

renderer.table = function(header, body) {
    return `<div class="table-container"><table>${header}${body}</table></div>`;
};

marked.setOptions({ renderer });

const genAI = new GoogleGenerativeAI(process.env.API_KEY); // IA
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); // Model.

// Router
app.post('/generate-content', async (req, res) => {
    try {
        const { text, image, contextHistory } = req.body;

        // Configure headers for streaming.
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        
        // If the text is not sent.
        if (!text) {
            return res.status(400).json({ erro: "Texto Obrigatório!" });
        }

        const result = await model.startChat({ history: contextHistory }).sendMessageStream(text);
            
        let completeText = '';
        for await (const chunk of result.stream) {
            completeText += chunk.text();
            const htmlContent = marked(completeText);

            // Send the HTML as an SSE (Server-Sent Events) event
            res.write(`data: ${JSON.stringify({ html: htmlContent })}\n\n`);
        }
        // End the stream
        res.write('data: [DONE]\n\n');
        res.end();

        console.log(`Text: ${text}`);
        console.log(`Response: \n${completeText}`);
    } catch (err) {
        res.write(`data: ${JSON.stringify({ error: "Erro ao processar a requisição." })}\n\n`);
        console.error(`Erro: ${err}`);
        res.end();
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
});
