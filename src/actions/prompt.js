export const toggleLoginPrompt = (payload) => {
  return {
    type: "TOGGLE_LOGIN_PROMPT",
    payload,
  };
};

export const toggleRegisterPrompt = (payload) => {
  return {
    type: "TOGGLE_REGISTER_PROMPT",
    payload,
  };
};

export const toggleDetailsPrompt = (payload) => {
  return {
    type: "TOGGLE_DETAILS_PROMPT",
    payload,
  };
};
