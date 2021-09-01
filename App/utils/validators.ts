export const emailValidator = (text: string) => {
  const emailValitionRegex = /^[\w\+\.]+@\w+\.\w{2,253}(?:\.?)[\w]{0,2}$/;
  return emailValitionRegex.test(text);
};

export const passValidator = (text: string) => text.trim().length >= 6;

export const confirmPassValidator = (text: string, otherText: string) =>
  text === otherText;

export const isNotEmptyValidator = (text: string) => text.trim() !== "";
