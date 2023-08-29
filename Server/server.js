import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
import OpenAI  from "openai";

dotenv.config();

const openai = new OpenAI({
    apikey: process.env.OPENAI_API_KEY,
});



const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'What up '
    })
});

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const response = await 	openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: `${prompt}`}],
            temperature: 0.5,
            max_tokens: 1024,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        
        
        res.status(200).send({
            bot: response.choices[0].message.content
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error })
    }
});

app.listen(5000, () => console.log('server is running '));
