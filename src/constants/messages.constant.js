import { MIN_PASSWORD_LENGTH } from '../constants/auth.constant.js';

export const MESSAGES = {
  USER: {
    COMMON: {
      EMAIL: {
        REQUIRED: '이메일을 입력해 주세요.',
        INVALID_FORMAT: '이메일 형식이 올바르지 않습니다.',
        DUPLICATED: '이미 가입 된 사용자 입니다.',
      },
      PASSWORD: {
        REQUIRED: '비밀번호를 입력해주세요.',
        MIN_LENGTH: `비밀번호는 ${MIN_PASSWORD_LENGTH}자리 이상이어야 합니다.`,
      },
      PASSWORD_CONFIRM: {
        REQUIRED: '비밀번호 확인을 입력해주세요.',
        NOT_MACHTED_WITH_PASSWORD: '입력 한 두 비밀번호가 일치하지 않습니다.',
      },
      NAME: { REQUIRED: '이름을 입력해주세요.' },

      UNAUTHORIZED: '인증 정보가 유효하지 않습니다.',

      JWT: {
        NO_TOKEN: '인증 정보가 없습니다.',
        NOT_SUPPORTED_TYPE: '지원하지 않는 인증 방식입니다.',
        EXPIRED: '인증 정보가 만료되었습니다.',
        NO_USER: '인증 정보와 일치하는 사용자가 없습니다.',
        INVALID: '인증 정보가 유효하지 않습니다.',
      },
    },
    SIGN_UP: {
      SUCCEED: '회원가입 성공했습니다.',
    },
    SIGN_IN: {
      SUCCEED: '로그인에 성공했습니다.',
    },
  },
};
