/* eslint-disable no-shadow */
/* eslint-disable max-classes-per-file */
import { Response } from "express";

enum success {
  SUCCESS = "true",
  FAILURE = "false",
}

enum ResponseStatus {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
  UNPROCESSABLE_ENTRY = 422,
}

abstract class ApiResponse {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    protected success: success,
    protected status: ResponseStatus,
    protected message: string
  ) {}

  protected prepare<T extends ApiResponse>(
    res: Response,
    response: T
  ): Response {
    return res.status(this.status).json(ApiResponse.sanitize(response));
  }

  public send(res: Response): Response {
    return this.prepare<ApiResponse>(res, this);
  }

  private static sanitize<T extends ApiResponse>(response: T): T {
    const clone: T = {} as T;
    Object.assign(clone, response);
    delete clone.status;
    // eslint-disable-next-line no-restricted-syntax
    for (const i in clone) if (typeof clone[i] === "undefined") delete clone[i];
    return clone;
  }
}

export class AuthFailureResponse<T> extends ApiResponse {
  constructor(message = "Authentication Failure", private data: T) {
    super(success.FAILURE, ResponseStatus.UNAUTHORIZED, message);
  }
}

export class UnprocessableEntry<T> extends ApiResponse {
  constructor(message = "Unprocessable Entry", private data: T) {
    super(success.FAILURE, ResponseStatus.UNPROCESSABLE_ENTRY, message);
  }
}

export class NotFoundResponse<T> extends ApiResponse {
  private url: string;

  constructor(message = "Not Found", private data: T) {
    super(success.FAILURE, ResponseStatus.NOT_FOUND, message);
  }

  send(res: Response): Response {
    this.url = res.req.originalUrl;
    return super.prepare<NotFoundResponse<T>>(res, this);
  }
}

export class ForbiddenResponse<T> extends ApiResponse {
  constructor(message = "Forbidden", private data: T) {
    super(success.FAILURE, ResponseStatus.FORBIDDEN, message);
  }
}

export class BadRequestResponse<T> extends ApiResponse {
  constructor(message = "Bad Parameters", private data: T) {
    super(success.FAILURE, ResponseStatus.BAD_REQUEST, message);
  }
}

export class InternalErrorResponse<T> extends ApiResponse {
  constructor(message = "Internal Error", private data: T) {
    super(success.FAILURE, ResponseStatus.INTERNAL_ERROR, message);
  }
}

export class FailureMsgResponse<T> extends ApiResponse {
  constructor(message: string, private data: T) {
    super(success.FAILURE, ResponseStatus.SUCCESS, message);
  }
}

export class SuccessResponse<T> extends ApiResponse {
  constructor(message: string, private data: T) {
    super(success.SUCCESS, ResponseStatus.SUCCESS, message);
  }

  send(res: Response): Response {
    return super.prepare<SuccessResponse<T>>(res, this);
  }
}
