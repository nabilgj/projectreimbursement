package com.revature.service;

import com.revature.dao.IUserDao;
import com.revature.exceptions.LoginInfoIncorrectException;
import com.revature.models.LoginObject;
import com.revature.models.User;
import com.revature.services.UserService;
import org.junit.*;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class UserServiceTest {

    @Before
    public void setupBeforeMethods(){
        System.out.println("This runs once before each method in this class");
        MockitoAnnotations.openMocks(this);
    }

    @Mock
    static IUserDao ud;
    //We also have to use inject mocks, because UserService depends on UserDao
    @InjectMocks
    static UserService us;

    //Lets first test UserServer.requestUser

    @Test
    public void registerCreatesNewUser(){

        //When the dao is supposed to return a value, we can overide the actual functionality
        //And just return whatever we want

        doNothing().when(ud).createUser(any());
        //Now we have overriden the dao funcationality, we call the actual method we are testing
        us.registerUser("myusername", "firstName", "lastName", "email@email.com", "passwword", 2);


        //Since this doesn't return anything, it just calls the dao to save to the db, we want to be sure
        //The dao method was called successfully

        //Verify that the user service called UserDao.createUser()
        verify(ud).createUser(any());

    }

    //Lets test a positive login case
    @Test
    public void validLoginCredentialsTest() throws LoginInfoIncorrectException {
        User u = new User("username123", "John", "Doe", "test@mail.com", "password",2);

        //When our dao method gets called, instead of searching the database for a user, we will
        //return the precreated user above
        when(ud.getUserByEmailOrUsername(any())).thenReturn(u);

        LoginObject lo = new LoginObject("username123", "password");
        User loggedIn = us.loginUser(lo);
        verify(ud).getUserByEmailOrUsername(any());

        //AssertEquals takes in three values
        //Messsage, Expected, Actual
        assertEquals("The first name should be User", "John", loggedIn.getFirstName());
        //Then we could write more assertEquals for each of our user properties of our User
    }

    @Test(expected=LoginInfoIncorrectException.class)
    public void LoginWrongUsername() throws LoginInfoIncorrectException{
        User u = null;

        when(ud.getUserByEmailOrUsername(any())).thenReturn(u);

        User loggedIn = us.loginUser(new LoginObject("wrong", "password"));
    }

    @Test(expected=LoginInfoIncorrectException.class)
    public void LoginWrongPassword() throws LoginInfoIncorrectException {
        User u = new User("test", "John", "Doe", "test@mail.com", "password",2);

        when(ud.getUserByEmailOrUsername(any())).thenReturn(u);

        User loggedIn = us.loginUser(new LoginObject("test", "wrong"));
    }

    @Test
    public void getUserByEmailOrUsername(){

        User u = new User("username123", "John", "Doe", "test@mail.com", "password",2);

        when(ud.getUserByEmailOrUsername(any())).thenReturn(u);

        User returnedUser = us.getUserByEmailOrUsername(u.getUsername());

        assertEquals(u, returnedUser);
    }

    @Test
    public void UpdateUserTest(){
        User u = new User("test", "John", "Doe", "test@mail.com", "password",2);

        when(ud.updateUser(u)).thenReturn(u);

        User updatedUser = us.updateUserInfo(u);

        assertEquals(u.getUsername(), updatedUser.getUsername());
    }

    @Test
    public void getAllUsersTest(){
        List<User> userList = new ArrayList<>();
        userList.add(new User("test", "John", "Doe", "test@mail.com", "password",2));
        userList.add(new User("test2", "Jane", "Doe", "JDoe@email.com", "mypassword",1));

        when(ud.getAllUsers()).thenReturn(userList);

        List<User> returnedList = us.getAllUsers();

        assertEquals(userList, returnedList);
    }

    @Test
    public void DeleteUserTest(){


        doNothing().when(ud).deleteUserByEmailOrUsername(any());

        us.deleteUser("test");

        verify(ud).deleteUserByEmailOrUsername(any());
    }

}