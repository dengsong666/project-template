package com.example.demo.controller;

import com.example.demo.pojo.Result;
import com.example.demo.utils.AliyunOssUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class UploadController {
    @Autowired
    private AliyunOssUtils aliyunOssUtils;

    @PostMapping("/upload")
    public Result<?> upload(MultipartFile file) throws IOException {
        String url = aliyunOssUtils.upload(file);
        return Result.success(url);
    }
}
