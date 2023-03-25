const { Configuration, OpenAIApi } = require('openai');
const OPENAI_API_KEY = '';

const genLyrics = async (req, res, next) => {
  try {
    const { song } = req.body;
    const configuration = new Configuration({
      apiKey: OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      temperature: 1,
      max_tokens: 800,
      messages: [
        {
          role: 'user',
          content: `Rewrite this ${song} for me`,
        },
      ],
    });
    console.log(completion.data);
    const response = completion.data.choices[0].message.content;

    res.locals.response = response;
    return next();
  } catch (error) {
    // Handle error
    console.error('', error);
    return res.status(500).json({ error: '' });
  }
};
module.exports = {
  genLyrics,
};