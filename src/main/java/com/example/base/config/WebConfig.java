package com.example.base.config;

import com.example.base.interceptor.AuthInterceptor;
import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Autowired
    private AuthInterceptor authInterceptor;


    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        List<String> ignorePath = new ArrayList<>();
        // swagger
        ignorePath.add("/swagger-resources/**");
        ignorePath.add("/doc.html");
//        ignorePath.add("/favicon.ico");
        ignorePath.add("/v3/**");
        ignorePath.add("/webjars/**");
        ignorePath.add("/springdoc/**");
        ignorePath.add("/static/**");
        ignorePath.add("/templates/**");
        ignorePath.add("/error");
        ignorePath.add("/cipher/check");
        ignorePath.add("/manager/login");
        ignorePath.add("/swagger-ui.html");
        ignorePath.add("/user/login");
        ignorePath.add("/user/register");
        registry.addInterceptor(authInterceptor).addPathPatterns("/**").excludePathPatterns(ignorePath);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("doc.html")
                .addResourceLocations("classpath:/META-INF/resources/");
        registry.addResourceHandler("swagger-ui.html")
                .addResourceLocations("classpath:/META-INF/resources/");
        registry.addResourceHandler("/webjars/**")
                .addResourceLocations("classpath:/META-INF/resources/webjars/");
    }
    @Bean
    public GroupedOpenApi adminApi() {
        return GroupedOpenApi.builder()
                .group("管理端")
                .pathsToMatch("/admin/**")
                .build();
    }

    @Bean
    public GroupedOpenApi userApi() {
        return GroupedOpenApi.builder()
                .group("用户端")
                .pathsToMatch("/user/**")
                .build();
    }
//    注解使用：https://blog.csdn.net/N_007/article/details/131188656
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
//                .components(
//                        new Components().addSecuritySchemes(config.getTokenHeader(),
//                                new SecurityScheme()
//                                        .type(SecurityScheme.Type.APIKEY)
//                                        // 这里配置 bearer 后，你的请求里会自动在 token 前加上 Bearer
//                                        .scheme("bearer")
//                                        .bearerFormat("JWT")
//                        ).addParameters(config.getTokenHeader(),
//                                new Parameter()
//                                        .in("header")
//                                        .schema(new StringSchema())
//                                        .name(tokenHeader)
//                        ))
                .info(
                        new Info()
                                .title("文档标题")
                                .description("文档描述")
                                .contact(new Contact().name("中微子").email("dengsong2022@gmail.com").url("可以写你的博客地址或不填"))
                                // 参考 Apache 2.0 许可及地址，你可以不配此项
                                .license(new License().name("Apache 2.0").url("https://www.apache.org/licenses/LICENSE-2.0.html"))
                                .version("0.1")
                )
                // 引入外部的文档，我这里引得是 springdoc 官方文档地址，你可以不配此项
                .externalDocs(new ExternalDocumentation()
                        .description("SpringDoc 文档")
                        .url("https://springdoc.org/")
                );

    }

}
