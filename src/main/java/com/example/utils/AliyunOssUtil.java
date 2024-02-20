package com.example.utils;

import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.example.config.AliyunOssConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;
import java.util.regex.Pattern;

@Component
public class AliyunOssUtil {

    @Autowired
    private AliyunOssConfig aliyunOssConfig;

    public String upload(MultipartFile file) throws IOException {
        String endpoint = aliyunOssConfig.getEndpoint();
        String accessKeyId = aliyunOssConfig.getAccessKeyId();
        String accessKeySecret = aliyunOssConfig.getAccessKeySecret();
        String bucketName = aliyunOssConfig.getBucketName();

        InputStream inputStream = file.getInputStream();
        String originalFilename = file.getOriginalFilename();
        String newFileName = UUID.randomUUID().toString() + originalFilename.substring(originalFilename.lastIndexOf("."));
        // 创建OSSClient实例。
        OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);
        ossClient.putObject(bucketName, newFileName, inputStream);
        String url = Pattern.compile("//").matcher(endpoint).replaceFirst("//" + bucketName + ".") + "/" + newFileName;
        ossClient.shutdown();
        return url;
    }
}
