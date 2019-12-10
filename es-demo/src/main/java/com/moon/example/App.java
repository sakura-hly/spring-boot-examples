package com.moon.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.concurrent.atomic.AtomicInteger;

@RestController
@SpringBootApplication
public class App {

    private AtomicInteger id = new AtomicInteger(1);

    @Autowired
    private BookRepository bookRepository;

    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }

    @RequestMapping("/save")
    public String save() {
        Book book = new Book(String.valueOf(id.getAndIncrement()), "book" + id, "author" + id,
                new Date().toString());
        return bookRepository.save(book).toString();
    }
}
