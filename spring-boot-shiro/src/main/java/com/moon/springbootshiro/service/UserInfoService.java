package com.moon.springbootshiro.service;

import com.moon.springbootshiro.entity.UserInfo;

public interface UserInfoService {
    /**通过username查找用户信息;*/
    public UserInfo findByUserName(String username);
}
