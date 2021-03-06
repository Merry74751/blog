package io.github.yu.blog.model;

import io.github.yu.common.handler.TimeBean;
import io.github.yu.common.handler.TimeField;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 用户登录记录
 * table: login_history
 */
@Data
@TimeBean
public class LoginHistory {
    // 主键id
    private Long id;
    // 用户id
    private Long userId;
    // 用户账号
    private String userAccount;
    // 用户名
    private String username;
    // 登录时间
    @TimeField(type = LocalDateTime.class)
    private LocalDateTime loginTime;
    // 登录ip
    private String loginIp;
    // 登录地点
    private String loginSite;
    // 浏览器名称
    private String browserName;
}
