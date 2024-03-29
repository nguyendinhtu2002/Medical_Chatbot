import dotenv from "dotenv";
dotenv.config();
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

exports.summaryController = async (req, res) => {
    try {
        const { text } = req.body;
        // New
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ "role": "user", "content": "Hello!" }],
        });
        if (chatCompletion) {
            return res.status(200).json(chatCompletion.choices[0].message);

        }
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            message: err.message,
        });
    }
};
exports.paragraphController = async (req, res) => {
    try {
        const { text } = req.body;
        const { data } = await openai.chat.completions.create({
            model: "text-davinci-003",
            prompt: `write a detail paragraph about \n${text}`,
            max_tokens: 500,
            temperature: 0.5,
        });
        if (data) {
            if (data.choices[0].text) {
                return res.status(200).json(data.choices[0].text);
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            message: err.message,
        });
    }
};
exports.chatbotController = async (req, res) => {
    try {
        const { text } = req.body;
        const { data } = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${text}`,
            max_tokens: 300,
            temperature: 0.7,
        });
        if (data) {
            if (data.choices[0].text) {
                return res.status(200).json(data.choices[0].text);
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            message: err.message,
        });
    }
};
exports.jsconverterController = async (req, res) => {
    try {
        const { text } = req.body;
        const { data } = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: `/* convert these instructions into javascript code \n${text}`,
            max_tokens: 400,
            temperature: 0.25,
        });
        if (data) {
            if (data.choices[0].text) {
                return res.status(200).json(data.choices[0].text);
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            message: err.message,
        });
    }
};
exports.scifiImageController = async (req, res) => {
    try {
        const { text } = req.body;
        const { data } = await openai.createImage({
            prompt: `generate a scifi image of ${text}`,
            n: 1,
            size: "512x512",
        });
        if (data) {
            if (data.data[0].url) {
                return res.status(200).json(data.data[0].url);
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            message: err.message,
        });
    }
};