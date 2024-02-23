package com.example;

import com.example.biz.model.entity.User;
import com.example.biz.service.IUserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class DemoApplicationTests {
    @Autowired
    private IUserService IUserService;

//    @Test
//    void contextLoads() {
//        for (int i = 0; i < 100; i++) {
//            System.out.println(new Random().nextInt(4));
//        }
//    }

    @Test
    void saveBatch() {
        List<User> list = new ArrayList<>(1000);
        long start = System.currentTimeMillis();
        for (int i = 1; i < 100000; i++) {
            list.add(new User().setUsername("user" + i).setPassword("123_" + i).setBalance(1000));
            if (i % 1000 == 0) {
                IUserService.saveBatch(list);
                list.clear();
            }
        }
        long end = System.currentTimeMillis();
        System.out.println("耗时：" + (end - start) + "ms");
    }
}

