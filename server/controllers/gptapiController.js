const { Configuration, OpenAIApi } = require('openai');
const OPENAI_API_KEY = process.env.SLAVA_OPENAI_KEY;

const gptapiController = {};
gptapiController.genLyrics = async (req, res, next) => {
  try {
    const { lyrics, artist, songname, trackId } = res.locals;

    if (lyrics.length < 1)
      return next({
        log:
          'Invalid lyrics param in gptapiController.genLyrics middleware function',
        status: 400,
        message: {
          err:
            ' Invalid lyrics param in gptapiController.genLyrics middleware function',
        },
      });
    if (artist.length < 1)
      return next({
        log:
          'Invalid artist param in gptapiController.genLyrics middleware function',
        status: 400,
        message: {
          err:
            ' Invalid artist param in gptapiController.genLyrics middleware function',
        },
      });
    if (typeof trackId === 'number')
      return next({
        log:
          'Invalid trackid param in gptapiController.genLyrics middleware function',
        status: 400,
        message: {
          err:
            'Invalid trackid param in gptapiController.genLyrics middleware function',
        },
      });
    if (songname.length < 1)
      return next({
        log:
          'Invalid songnmae param in gptapiController.genLyrics middleware function',
        status: 400,
        message: {
          err:
            'Invalid songname param in gptapiController.genLyrics middleware function',
        },
      });

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
    const response = completion.data.choices[0].message.content;

    res.locals.lyrics = response;
    res.locals.artist = artist;
    res.locals.title = songname;
    res.locals.trackId = trackId;
    return next();
  } catch (error) {
    // Handle error
    return next({
      log:
        'Error occured in gptapiController.genLyrics - could not generate lyrics',
      status: 400,
      message: {
        err:
          'Error occured in gptapiController.genLyrics - could not generate lyrics',
      },
    });
  }
};
module.exports = gptapiController;
