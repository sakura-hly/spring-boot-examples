package com.moon.springbootrabbitmq.rabbitmq.many;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MoonSender2 {

    @Autowired
    private AmqpTemplate rabbitTemplate;

    public void send(int i) {
        String context = "spring boot moon queue" + " ****** " + i;
        System.out.println("Sender2: " + context);
        this.rabbitTemplate.convertAndSend("moon", context);
    }
}
