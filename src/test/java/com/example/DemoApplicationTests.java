package com.example;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Random;

@SpringBootTest
class DemoApplicationTests {

    @Test
    void contextLoads() {
        for (int i = 0; i < 100; i++) {
            System.out.println(new Random().nextInt(4));
        }
    }


}

