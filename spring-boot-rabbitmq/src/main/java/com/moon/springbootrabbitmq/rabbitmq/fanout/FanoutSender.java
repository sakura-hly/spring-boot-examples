package com.moon.springbootrabbitmq.rabbitmq.fanout;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class FanoutSender {

    @Autowired
    private AmqpTemplate rabbitTemplate;

    public void send() {
        String context = "hi, fanout msg ";
        System.out.println("Sender : " + context);
        //Fanout交换机 发送端的routing_key写任何字符都会被忽略
        this.rabbitTemplate.convertAndSend("fanoutExchange", "", context);
    }
}
