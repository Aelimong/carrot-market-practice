export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_MIN_LENGTH_ERROR =
  "비밀번호는 최소 4글자 이상 입력해주세요.";
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);
export const PASSWORD_REGEX_ERROR =
  "비밀번호는 반드시 최소한 하나의 대문자, 소문자, 숫자, 그리고 특수문자(#?!@$%^&*- 중 하나)를 포함해야 합니다.";
