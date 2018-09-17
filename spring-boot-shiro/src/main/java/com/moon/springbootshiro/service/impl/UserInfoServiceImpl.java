package com.moon.springbootshiro.service.impl;

import com.moon.springbootshiro.dao.UserInfoDao;
import com.moon.springbootshiro.entity.UserInfo;
import com.moon.springbootshiro.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserInfoServiceImpl implements UserInfoService {

    @Autowired
    private UserInfoDao userInfoDao;

    @Override
    public UserInfo findByUserName(String username) {
        System.out.println("UserInfoServiceImpl.findByUsername()");
        return userInfoDao.findByUsername(username);
    }
}
