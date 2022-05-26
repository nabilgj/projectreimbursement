package com.revature.services;

import com.revature.dao.IUserDao;
import com.revature.exceptions.LoginInfoIncorrectException;
import com.revature.models.LoginObject;
import com.revature.models.User;
import com.revature.utils.LoggingUtil;

import java.util.List;

public class UserService {

    private IUserDao ud;

    public UserService(IUserDao uDao) {
        this.ud = uDao;
    }

    public void registerUser(String username, String firstName, String lastName, String email, String password, int role_id){
        User register = new User(username, firstName, lastName, email, password, role_id);
        ud.createUser(register);
        LoggingUtil.logger.info("User " + register.getUsername() + " has registered an account");
    }

    public User loginUser(LoginObject lo) throws LoginInfoIncorrectException {
        User u = ud.getUserByEmailOrUsername(lo.getEmailOrUsername());

        if (u == null || !lo.getPassword().equals(u.getPassword())) {
            LoggingUtil.logger.warn("User login attempt failed");
            throw new LoginInfoIncorrectException();
        } else {
            LoggingUtil.logger.info("User " + u.getUsername() + " was logged in");
            return u;
        }
    }

    public User getUserByEmailOrUsername(String emailOrUsername){
        return ud.getUserByEmailOrUsername(emailOrUsername);
    }

    public User updateUserInfo(User u){
        return ud.updateUser(u);
    }

    public List<User> getAllUsers(){
        return ud.getAllUsers();
    }

    public void deleteUser(String usernameOrEmail){
        ud.deleteUserByEmailOrUsername(usernameOrEmail);
    }

}
