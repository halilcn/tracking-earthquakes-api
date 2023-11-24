const MESSAGE_OWNERS = { user: "user", ai: "ai" };

const MESSAGE_TYPES = {
  general: "general",
  earthquake: "earthquake",
};

const DEFAULT_MESSAGE_LIMITS = {
  [MESSAGE_TYPES.general]: 5,
  [MESSAGE_TYPES.earthquake]: 2,
};

const mappingLimitTypesFromTypes = {
  [MESSAGE_TYPES.general]: "generalMessageLimit",
  [MESSAGE_TYPES.earthquake]: "earthquakeMessageLimit",
};

module.exports = {
  MESSAGE_OWNERS,
  MESSAGE_TYPES,
  DEFAULT_MESSAGE_LIMITS,
  mappingLimitTypesFromTypes,
};
