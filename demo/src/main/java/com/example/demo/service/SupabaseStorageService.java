package com.example.demo.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import com.example.demo.exceptions.BadGateWayException;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

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
    
    public String uploadProfilePic(MultipartFile file, String profileUrl) {
        
        try {

            if(profileUrl != null) {
                String filePathToDelete = profileUrl.substring(profileUrl.indexOf("/public/booking_system_user_profile/") + "/public/booking_system_user_profile/".length());
                webClient.delete()
                    .uri(supabaseUrl + "/storage/v1/object/" + buketName + "/" + filePathToDelete)
                    .header("Authorization", "Bearer " + supabaseSecretRoleKey)
                    .header("apiKey", supabaseSecretRoleKey)
                    .retrieve()
                    .onStatus(status -> status.isError(),
                        cleintResponse -> cleintResponse.bodyToMono(String.class)
                        .flatMap(errorBody -> 
                            Mono.error(new RuntimeException(errorBody))
                        )
                    )
                    .bodyToMono(String.class)
                    .block();
            }
            
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

    public String uploadBusinessLogo(MultipartFile file, String bucketName) {

        try {

            String fileName = UUID.randomUUID() + "-" + file.getOriginalFilename();

            String url = supabaseUrl + "/storage/v1/object/" + bucketName + "/" + fileName;

            webClient.post()
                    .uri(url)
                    .header("Authorization", "Bearer " + supabaseSecretRoleKey)
                    .header("apiKey", supabaseSecretRoleKey)
                    .contentType(MediaType.parseMediaType(file.getContentType()))
                    .bodyValue(file.getBytes())
                    .retrieve()
                    .toBodilessEntity()
                    .block();

            return supabaseUrl + "/storage/v1/object/public/" + bucketName + "/" + fileName;

        } catch (Exception e) {
            throw new BadGateWayException("Failed to upload file to Supabase");
        }
        
    }

    public String uploadProfilePicOfStaff(MultipartFile file, String bucketName, UUID userId) {
       
        try {

            String fileName = String.join("_", userId.toString(), file.getOriginalFilename());

            String url = supabaseUrl + "/storage/v1/object/" + bucketName + "/" + fileName;

            webClient.post()
                    .uri(url)
                    .header("Authorization", "Bearer " + supabaseSecretRoleKey)
                    .header("apiKey", supabaseSecretRoleKey)
                    .contentType(MediaType.parseMediaType(file.getContentType()))
                    .bodyValue(file.getBytes())
                    .retrieve()
                    .toBodilessEntity()
                    .block();

            return fileName; 

        } catch (Exception e) {
            e.printStackTrace();
            throw new BadGateWayException("Failed to upload file to Supabase");
        }

    }

    public byte[] getStaffProfilePic(String userId, String fileName, String bucketName) {
        String url = supabaseUrl + "/storage/v1/object/" + bucketName + "/" + userId + "_" + fileName;
      
        try {
            return  webClient.get()
                    .uri(url)
                    .header("Authorization", "Bearer " + supabaseSecretRoleKey)
                    .header("apiKey", supabaseSecretRoleKey)
                    .retrieve()
                    .bodyToMono(byte[].class)
                    .block();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        
    }

}
