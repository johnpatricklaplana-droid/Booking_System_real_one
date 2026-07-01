package com.example.demo.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.example.demo.dto.request.MailSniperResponseDto;

@Service
public class EmailVerifications {

    @Value("${mail.sniper.api.key}")
    private String apiKey;

    private final WebClient webClient;

    public EmailVerifications(WebClient.Builder builder) {
        this.webClient = builder.build();
    }
    
    public boolean isEmailValid(String email) {

        String url = "https://api.mailsniperapp.com/v1/verify/email/" + email;
        MailSniperResponseDto response = webClient.get()
            .uri(url)
            .header("Authorization", "Bearer " + apiKey)
            .retrieve()
            .bodyToMono(MailSniperResponseDto.class)
            .block();

        return response != null && response.isValid() && !response.isDisposable() && response.getRisk() < 30;
    }

}
