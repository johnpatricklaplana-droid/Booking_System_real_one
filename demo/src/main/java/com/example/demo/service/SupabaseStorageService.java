package com.example.demo.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class SupabaseStorageService {

    @Value("${supabase.url}")
    private String supabaseUrl;

    @Value("${supabase.secret.service-key}")
    private String supabaseSecretRoleKey;

    @Value("${supabase.bucket-name}")
    private String buketName;

    private final WebClient webClient;

    public SupabaseStorageService(WebClient.Builder builder) {
        this.webClient = builder.build();
    }
    
    public String uploadProfilePic(MultipartFile file) {
        
        try {
            
            String fileName = UUID.randomUUID() + "-" + file.getOriginalFilename();

            String url = supabaseUrl + "/storage/v1/object/" + buketName + "/" +fileName;

            webClient.post()
                .uri(url)
                .header("Authorization", "Bearer " + supabaseSecretRoleKey)
                .header("apiKey", supabaseSecretRoleKey)
                .contentType(MediaType.parseMediaType(file.getContentType()))
                .bodyValue(file.getBytes())
                .retrieve()
                .toBodilessEntity()
                .block();

            return supabaseUrl + "/storage/v1/object/public/" + buketName + "/" + fileName;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }

}
