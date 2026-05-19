package com.aihr;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * AIHR智聘
 * 
 * @author AIHR
 * @since 1.0.0
 */
@EnableAsync
@EnableScheduling
@SpringBootApplication
public class AIHRApplication {

    public static void main(String[] args) {
        SpringApplication.run(AIHRApplication.class, args);
        System.out.println("""
            
             ___    ___  __  __  ____    
            / _ |  / _/ / / / / / __ \   
           / __ | _\ \ / /_/ / / /_/ /   
          /_/ |_|/___/ \____/  \____/    
            
            AIHR智聘启动成功!
            API文档: http://localhost:8080/doc.html
            """);
    }
}
