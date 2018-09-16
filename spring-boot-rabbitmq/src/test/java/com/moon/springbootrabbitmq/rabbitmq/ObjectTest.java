package com.moon.springbootrabbitmq.rabbitmq;

import com.moon.springbootrabbitmq.model.User;
import com.moon.springbootrabbitmq.rabbitmq.object.ObjectSender;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ObjectTest {

    @Autowired
    private ObjectSender objectSender;

    @Test
    public void sendObject() throws Exception {
        User user=new User();
        user.setName("neo");
        user.setPass("123456");
        objectSender.send(user);
    }
}
