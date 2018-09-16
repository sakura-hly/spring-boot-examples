package com.moon.springbootrabbitmq.rabbitmq.topic;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TopicSender {

    @Autowired
    private AmqpTemplate rabbitTemplate;

    public void sender() {
        String context = "hi, i am message all";
        System.out.println("Sender : " + context);
        /**
         * param
         * s: exchange
         * s1: routingKey
         * ...
         */
        this.rabbitTemplate.convertAndSend("topicExchange", "topic.1", context);
    }

    public void sender1() {
        String context = "hi, i am message 1";
        System.out.println("Sender : " + context);
        this.rabbitTemplate.convertAndSend("topicExchange", "topic.message", context);
    }

    public void sender2() {
        String context = "hi, i am message 2";
        System.out.println("Sender : " + context);
        this.rabbitTemplate.convertAndSend("topicExchange", "topic.messages", context);
    }
}
