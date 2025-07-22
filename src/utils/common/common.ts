export function UUID4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const getDecodedParam = (key: string = "id"): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  const encodedValue = urlParams.get(key);

  if (!encodedValue) return null;

  try {
    const decoded = atob(encodedValue); // Base64 decode
    return decoded;
  } catch (error) {
    console.error("Base64 decoding failed:", error);
    return null;
  }
};

export const emailValidation = (requiredMsg = "Email is required") => ({
  required: requiredMsg,
  pattern: {
    value:  /^(?!.*\.\.)(?!^[.])(?!.*\.$)(?!.*\.@)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Invalid email format",
  },
});


