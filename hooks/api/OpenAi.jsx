import axios from "axios";

export const OpenAi = () => {
  const Ask = async (messages) => {
    const OPENAI_API_KEY = import.meta.env.VITE_OPEN_AI_URL;

    try {
      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o",
          messages,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      return res.data.choices[0].message.content;
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      return null;
    }
  };

  return { Ask };
};
