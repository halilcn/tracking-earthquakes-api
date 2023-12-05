const functionNames = {
  handlePastEarthquakeQuestion: "handlePastEarthquakeQuestion",
};

exports.getGeneralMessagePrompt = () =>
  "you are a earthquake helpful system. If a user wants to ask a questions about past earthquake and if they provide you a earthquake date, please us functions";
exports.getEarthquakeMessagePrompt = (earthquakes) =>
  `you have earthquake list as an array. Please ask the question according to the list. Earthquakes:${earthquakes}`;

exports.getGeneralMessagePromptFunctions = () => [
  {
    name: functionNames.handlePastEarthquakeQuestion,
    description:
      "if there is a need related to past earthquake and there is a date, use this function. please pass the date object as DD/MM/YYYY.",
    parameters: {
      type: "object",
      properties: {
        date: {
          type: "string",
        },
      },
    },
  },
];
