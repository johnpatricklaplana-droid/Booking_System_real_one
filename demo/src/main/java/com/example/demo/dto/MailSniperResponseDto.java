package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MailSniperResponseDto {
    
    @JsonProperty("is_valid")
    private boolean isValid;

    @JsonProperty("is_disposable")
    private boolean disposable;

    @JsonProperty("is_spam")
    private boolean spam;

    @JsonProperty("risk")
    private int risk;

}
