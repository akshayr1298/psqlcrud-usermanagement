import * as HttpStatus from 'http-status-codes';

const statusCodes = {
    CREATED: HttpStatus.CREATED, // 201
    SUCCESS: HttpStatus.OK, // 200
    ACCEPTED: HttpStatus.ACCEPTED, // 202
    BAD_REQUEST: HttpStatus.BAD_REQUEST, // 400
    UNAUTHORIZED: HttpStatus.UNAUTHORIZED, // 401
    SERVER_ERROR: HttpStatus.INTERNAL_SERVER_ERROR, // 500
    FORBIDDEN: HttpStatus.FORBIDDEN, // 403
    NOT_FOUND: HttpStatus.NOT_FOUND, // 404
    CONFLICT: HttpStatus.CONFLICT, // 409
    NOT_IMPLEMENTED: HttpStatus.NOT_IMPLEMENTED, // 501
    SERVICE_UNAVAILABLE: HttpStatus.SERVICE_UNAVAILABLE // 503
    };
    
  
  
  export default statusCodes