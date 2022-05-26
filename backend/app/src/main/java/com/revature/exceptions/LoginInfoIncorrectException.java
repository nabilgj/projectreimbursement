package com.revature.exceptions;

public class LoginInfoIncorrectException extends Exception{

    //We typically create at least two constructors
    public LoginInfoIncorrectException(){
        super("Login information incorrect");
    }

    public LoginInfoIncorrectException(String message){
        super(message);
    }

}
