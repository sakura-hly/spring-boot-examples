package com.moon.bootdemo.domain;

import org.springframework.data.jpa.repository.JpaRepository;

//dao只要继承JpaRepository类就可以
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUserName(String userName);

    User findByUserNameOrEmail(String username, String email);
}
