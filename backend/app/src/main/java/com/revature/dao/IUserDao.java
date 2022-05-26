package com.revature.dao;

import com.revature.models.User;

import java.util.List;

public interface IUserDao {

    //create
    void createUser(User u);

    //read
    List<User> getAllUsers();
    User getUserByEmailOrUsername(String emailOrUsername);


    //update
    User updateUser(User u);

    //delete
    void deleteUserByEmailOrUsername(String emailOrUsername);

}
