package com.moon.mapper;

import com.moon.entity.UserEntity;
import com.moon.enums.UserSexEnum;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface UserMapper {

    @Select("select * from users")
    @Results({
            @Result(property = "userSex", column = "user_sex", javaType = UserSexEnum.class),
            @Result(property = "nickName", column = "nick_name")
    })
    List<UserEntity> getAll();

    @Select("select * from users where id = #{id}")
    @Results({
            /*
             * @Result 修饰返回的结果集，关联实体类属性和数据库字段一一对应，
             * 如果实体类属性和数据库属性名保持一致，就不需要这个属性来修饰。
             */
            @Result(property = "userSex", column = "user_sex", javaType = UserSexEnum.class),
            @Result(property = "nickName", column = "nick_name")
    })
    UserEntity getOne(Long id);

    @Insert("INSERT INTO users(userName,passWord,user_sex) VALUES(#{userName}, #{passWord}, #{userSex})")
    void insert(UserEntity user);

    @Update("UPDATE users SET userName=#{userName},nick_name=#{nickName} WHERE id =#{id}")
    void update(UserEntity user);

    @Delete("DELETE FROM users WHERE id =#{id}")
    void delete(Long id);
}
