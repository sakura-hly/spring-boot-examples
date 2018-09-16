package com.moon.bootdemo.domain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

//dao只要继承JpaRepository类就可以
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUserName(String userName);

    User findByUserNameOrEmail(String username, String email);

    Page<User> findAll(Pageable pageable);

    Page<User> findByUserName(String userName, Pageable pageable);

    @Modifying
    @Query("update User u set u.userName = ?1 where u.id = ?2")
    int modifyByIdAndUserId(String userName, int id);

    @Transactional
    @Modifying
    @Query("delete from User u where u.id = ?1")
    void deleteUserById(Long id);

    @Transactional(timeout = 10)
    @Query(value = "select * from User u where u.emailAddress = ?1", nativeQuery = true)
    User findByEmailAddress(String emailAddress);
}
