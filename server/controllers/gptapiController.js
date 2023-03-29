const { Configuration, OpenAIApi } = require('openai');
const OPENAI_API_KEY = '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';

const gptapiController = {};
gptapiController.genLyrics = async (req, res, next) => {
  try {
    const { lyrics, artist, songname, trackId } = res.locals;
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
          content: ` Completely Creatively rewrite these lyrics  for me : ${lyrics} but don't use the song title`,
        },
      ],
    });
    console.log(completion.data);
    const response = completion.data.choices[0].message.content;

    res.locals.response = response;
    res.locals.artist = artist;
    res.locals.songname = songname;
    res.locals.trackId = trackId;
    return next();
  } catch (error) {
    // Handle error
    console.error('Error generating lyrics', error);
    return res.status(500).json({ error: 'Failed to generate Lyrics' });
  }
};
module.exports = gptapiController;
