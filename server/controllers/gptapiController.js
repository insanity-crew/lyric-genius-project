const { Configuration, OpenAIApi } = require('openai');
const OPENAI_API_KEY = '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';

const gptapiController = {};
gptapiController.genLyrics = async (req, res, next) => {
  try {
    const { lyrics, artist, songname } = res.locals;
    const configuration = new Configuration({
      apiKey: OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      temperature: 1.4,
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: ` Completely Creatively rewrite these lyrics  for me : ${lyrics}. Make sure it is very diffrent from the song but still unique.`,
        },
      ],
    });
    console.log(completion.data);
    const response = completion.data.choices[0].message.content;

    res.locals.response = response;
    res.locals.artist = artist;
    res.locals.songname = songname;
    return next();
  } catch (error) {
    // Handle error
    console.error('Error generating lyrics', error);
    return res.status(500).json({ error: 'Failed to generate Lyrics' });
  }
};
module.exports = gptapiController;
