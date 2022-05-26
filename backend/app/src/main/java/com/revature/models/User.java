package com.revature.models;

public class User {
    private int user_id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private int role_id;
    private String role;

    public User(){}


    public User(String username, String firstName, String lastName, String email, String password, int role_id) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role_id=role_id;
        if(this.role_id == 1){
            this.role = "FinanceManager";
        }
        if(this.role_id == 2){
            this.role = "Employee";
        }
    }

    public User(int user_id, String username, String firstName, String lastName, String email, String password, int role_id) {
        this.user_id = user_id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role_id = role_id;
        if(this.role_id == 1){
            this.role = "FinanceManager";
        }
        if(this.role_id == 2){
            this.role = "Employee";
        }
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getRole_id() {
        return role_id;
    }

    public void setRole_id(int role_id) {
        this.role_id = role_id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "User{" +
                "user_id=" + user_id +
                ", username='" + username + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", role_id=" + role_id +
                ", role='" + role + '\'' +
                '}';
    }
}
