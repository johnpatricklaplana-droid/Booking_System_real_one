package com.example.demo.config;

import java.time.Duration;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class RateLimitInterceptor implements HandlerInterceptor {

    private final Cache<String, Bucket> buckets = Caffeine.newBuilder()
        .expireAfterAccess(1, TimeUnit.HOURS)
        .maximumSize(50_000)
        .build();

    private enum Policy {
        AUTH(5, Duration.ofMinutes(15)),
        LIST_GET(60, Duration.ofMinutes(1)),
        ANALYTICS_GET(20, Duration.ofMinutes(1)),
        PUBLIC_GET(30, Duration.ofMinutes(1)),
        WRITE(20, Duration.ofMinutes(1));    


        final int capacity;
        final Duration window;
        Policy(int capacity, Duration window) {
            this.capacity = capacity;
            this.window = window;
        }
    }

    private record RouteRule(String method, String prefix, Policy policy) {}

    private static final List<RouteRule> ROUTE_POLICIES = List.of(
    new RouteRule("POST", "/api/auth", Policy.AUTH),
    new RouteRule("GET",  "/api/business", Policy.LIST_GET),
    new RouteRule("POST", "/api/business", Policy.WRITE),      // separate, stricter policy
    new RouteRule("PUT",  "/api/business", Policy.WRITE),
    new RouteRule("DELETE","/api/business", Policy.WRITE),
    new RouteRule("GET",  "/api/services", Policy.LIST_GET),
    new RouteRule("POST",  "/api/services", Policy.WRITE),
    new RouteRule("PUT",  "/api/services", Policy.WRITE),
    new RouteRule("DELETE",  "/api/services", Policy.WRITE),
    new RouteRule("GET",  "/api/appointments", Policy.LIST_GET),
    new RouteRule("POST", "/api/appointments", Policy.WRITE),
    new RouteRule("PUT", "/api/appointments", Policy.WRITE),
    new RouteRule("GET",  "/api/analytics", Policy.ANALYTICS_GET),
    new RouteRule("GET",  "/api/schedule", Policy.LIST_GET),
    new RouteRule("POST",  "/api/schedule", Policy.WRITE),
    new RouteRule("UPDATE",  "/api/schedule", Policy.WRITE),
    new RouteRule("DELETE",  "/api/schedule", Policy.WRITE)
);


    private Bucket newBucket(Policy policy) {
        return Bucket.builder()
            .addLimit(Bandwidth.builder()
                .capacity(policy.capacity)
                .refillIntervally(policy.capacity, policy.window)
                .build())
            .build();
    }

    private Policy resolvePolicy(String uri, String method) {
        return ROUTE_POLICIES.stream()
            .filter(e -> uri.startsWith(e.prefix) && method.equalsIgnoreCase(e.method))
            .findFirst()
            .map(e -> e.policy)
            .orElse(Policy.PUBLIC_GET);
    }

    private String resolveKey(HttpServletRequest request) {
        
        UUID userId = (UUID) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (userId != null) {
            return "user:" + userId;
        }
        String ip = Optional.ofNullable(request.getHeader("X-Forwarded-For"))
            .map(h -> h.split(",")[0].trim())
            .orElse(request.getRemoteAddr());
        return "ip:" + ip;
    }

    @Override
    public boolean preHandle(HttpServletRequest request,
                              HttpServletResponse response,
                              Object handler) throws Exception {
        Policy policy = resolvePolicy(request.getRequestURI(), request.getMethod());
        String key = policy.name() + ":" + resolveKey(request);

        Bucket bucket = buckets.get(key, k -> newBucket(policy));

        if (!bucket.tryConsume(1)) {
            response.setStatus(429);
            response.setHeader("Retry-After", "60");
            response.getWriter().write("Too many requests. Try again later.");
            return false;
        }
        return true;
    }

}