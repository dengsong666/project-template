package com.example.biz.controller;

import com.example.base.model.Result;
import com.example.base.utils.AliyunOssUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class UploadController {
    @Autowired
    private AliyunOssUtil aliyunOssUtil;

    @PostMapping("/upload")
    public Result<?> upload(MultipartFile file) throws IOException {
        String url = aliyunOssUtil.upload(file);
        return Result.success(url);
    }
}
