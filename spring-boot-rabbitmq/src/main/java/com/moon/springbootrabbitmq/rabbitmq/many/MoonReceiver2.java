package com.moon.springbootrabbitmq.rabbitmq.many;

import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RabbitListener(queues = "moon")
public class MoonReceiver2 {

    @RabbitHandler
    public void process(String message){
        System.out.println("Receiver 2: " + message);
    }
}
