package com.unipath.config;

import com.mongodb.ConnectionString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class StartupConfigLogger implements ApplicationRunner {

    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;

    @Value("${app.mail.enabled}")
    private boolean mailEnabled;

    @Value("${spring.mail.username:}")
    private String mailUsername;

    @Override
    public void run(ApplicationArguments args) {
        ConnectionString connectionString = new ConnectionString(mongoUri);
        String databaseFromUri = connectionString.getDatabase();

        log.info("UniPath MongoDB database: {}", databaseFromUri);
        log.info("UniPath MongoDB hosts: {}", connectionString.getHosts());
        log.info("UniPath mail enabled: {}, username configured: {}", mailEnabled, mailUsername != null && !mailUsername.isBlank());
    }
}
