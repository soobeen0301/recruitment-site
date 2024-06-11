import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/messages.constant.js';
import { REFRESH_TOKEN_SECRET } from '../constants/env.constant.js';
import { prisma } from '../utils/prisma.util.js';

export const requireRefreshToken = async (req, res, next) => {
  try {
    // 인증 정보 파싱
    const authorization = req.headers.authorization;

    // Authorization이 없는 경우
    if (!authorization) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        status: HTTP_STATUS.UNAUTHORIZED,
        messages: MESSAGES.USER.COMMON.JWT.NO_TOKEN,
      });
    }

    // JWT 표준 인증 형태와 일치하지 않는 경우
    const [type, refreshToken] = authorization.split(' ');

    if (type !== 'Bearer') {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        status: HTTP_STATUS.UNAUTHORIZED,
        messages: MESSAGES.USER.COMMON.JWT.NOT_SUPPORTED_TYPE,
      });
    }

    // RefreshToken 없는 경우
    if (!refreshToken) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        status: HTTP_STATUS.UNAUTHORIZED,
        messages: MESSAGES.USER.COMMON.JWT.NO_TOKEN,
      });
    }

    let payload;
    try {
      payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    } catch (error) {
      // RefreshToken 유효기간이 지난 경우
      if (error.name === 'TokenExpiredError') {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: HTTP_STATUS.UNAUTHORIZED,
          messages: MESSAGES.USER.COMMON.JWT.EXPIRED,
        });
      }
      // 그 밖의 RefreshToken 검증에 실패한 경우
      else {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: HTTP_STATUS.UNAUTHORIZED,
          messages: MESSAGES.USER.COMMON.JWT.INVALID,
        });
      }
    }

    const { id } = payload;

    // DB에서 RefreshToken 조회
    const isExistRefreshToken = await prisma.refreshToken.findUnique({
      where: { userId: id },
    });

    //넘겨 받은 RefreshToken과 비교
    const isValidRefreshToken =
      isExistRefreshToken?.refreshToken &&
      bcrypt.compareSync(refreshToken, isExistRefreshToken.refreshToken);

    if (!isValidRefreshToken) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        status: HTTP_STATUS.UNAUTHORIZED,
        messages: MESSAGES.USER.COMMON.JWT.DISCARDED_TOKEN,
      });
    }

    // Payload에 담긴 사용자 ID와 일치하는 사용자가 없는 경우
    const user = await prisma.user.findUnique({
      where: { id },
      omit: { password: true },
    });

    if (!user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        status: HTTP_STATUS.UNAUTHORIZED,
        messages: MESSAGES.USER.COMMON.JWT.NO_USER,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
