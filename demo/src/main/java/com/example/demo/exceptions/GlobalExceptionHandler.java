package com.example.demo.exceptions;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.demo.dto.request.ErrorResponse;
import com.example.demo.dto.response.AuthResponse;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {
    
        @ExceptionHandler(ConflictHappensException.class)
        public ResponseEntity<AuthResponse> handleUserAlreadyExists(ConflictHappensException ex) {

        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(new AuthResponse(409, ex.getMessage()));
        }
    
        @ExceptionHandler(BadGateWayException.class)
        public ResponseEntity<AuthResponse> handleBadGateWayException(BadGateWayException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_GATEWAY)
                .body(new AuthResponse(502, ex.getMessage()));
        }

        @ExceptionHandler(ResourceNotFoundException.class)
        public ResponseEntity<AuthResponse> handleResourceNotFound(ResourceNotFoundException ex) {

            return ResponseEntity
                .status(404)
                .body(new AuthResponse(404, ex.getMessage()));
        }

        @ExceptionHandler(InvalidInputsException.class)
        public ResponseEntity<AuthResponse> handleBadRequest(InvalidInputsException ex) {

            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new AuthResponse(400, ex.getMessage()));
        }

        @ExceptionHandler(AccessDeniedException.class)
        public ResponseEntity<AuthResponse> handleForbedin(AccessDeniedException ex) {

            return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(new AuthResponse(403, ex.getMessage()));
        }

        @ExceptionHandler(Exception.class)
        public ResponseEntity<ErrorResponse> handleGenericException(
                Exception ex,
                HttpServletRequest request
        ) {

            ErrorResponse error = new ErrorResponse(
                LocalDateTime.now(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI()
            );

            return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }

}
