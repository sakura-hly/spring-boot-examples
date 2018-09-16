package com.moon.springbootrabbitmq.rabbitmq;

import com.moon.springbootrabbitmq.rabbitmq.many.MoonSender1;
import com.moon.springbootrabbitmq.rabbitmq.many.MoonSender2;
import net.bytebuddy.asm.Advice;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ManyTest {

    @Autowired
    private MoonSender1 moonSender1;

    @Autowired
    private MoonSender2 moonSender2;

    @Test
    public void oneToMany() throws Exception{
        for (int i = 0; i < 100; i++){
            moonSender1.send(i);
        }
    }

    @Test
    public void manyToMany() throws Exception{
        for (int i = 0; i < 100; i++){
            moonSender1.send(i);
            moonSender2.send(i);
        }
    }
}
