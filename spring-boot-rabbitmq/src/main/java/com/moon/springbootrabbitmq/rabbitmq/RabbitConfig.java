package com.moon.springbootrabbitmq.rabbitmq;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {

    @Bean
    public Queue helloQueue() {
        return new Queue("hello");
    }

    @Bean
    public Queue moonQueue() {
        return new Queue("moon");
    }

    @Bean
    public Queue objectQueue() {
        return new Queue("object");
    }
}
