import axios from 'axios';

export const getYoutubeTranscript = async (videoId: string): Promise<string> => {
  const apiKey = process.env.SUPADATA_API_KEY;

  if (!apiKey) {
    throw new Error("SUPADATA_API_KEY is not set in .env");
  }

//   console.log("Fetching transcript for videoId:", videoId);

  const response = await axios.get('https://api.supadata.ai/v1/youtube/transcript', {
    params: {
      videoId,
      lang: 'en',
      text: true, // returns plain text instead of segments
    },
    headers: {
      'x-api-key': apiKey,
    },
  });

  const transcript = response.data?.content;
//   console.log("Transcript length:", transcript?.length);

  if (!transcript) {
    throw new Error("No transcript available for this video.");
  }

  return transcript;
};
