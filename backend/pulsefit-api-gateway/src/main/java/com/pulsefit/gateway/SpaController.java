package com.pulsefit.gateway;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SpaController {

    private ResponseEntity<Resource> index() {
        Resource resource = new ClassPathResource("static/index.html");

        return ResponseEntity.ok()
                .contentType(MediaType.TEXT_HTML)
                .body(resource);
    }

    @GetMapping(value = "/dashboard", produces = MediaType.TEXT_HTML_VALUE)
    public ResponseEntity<Resource> dashboard() {
        return index();
    }

    @GetMapping(value = "/membership", produces = MediaType.TEXT_HTML_VALUE)
    public ResponseEntity<Resource> membership() {
        return index();
    }

    @GetMapping(value = "/facilities", produces = MediaType.TEXT_HTML_VALUE)
    public ResponseEntity<Resource> facilities() {
        return index();
    }

    @GetMapping(value = "/subscription", produces = MediaType.TEXT_HTML_VALUE)
    public ResponseEntity<Resource> subscription() {
        return index();
    }

    @GetMapping(value = "/profile", produces = MediaType.TEXT_HTML_VALUE)
    public ResponseEntity<Resource> profile() {
        return index();
    }

    @GetMapping(value = "/admin", produces = MediaType.TEXT_HTML_VALUE)
    public ResponseEntity<Resource> admin() {
        return index();
    }
}