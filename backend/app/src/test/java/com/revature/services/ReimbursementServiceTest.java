package com.revature.services;

import com.revature.dao.IReimbursementDao;
import com.revature.dao.IUserDao;
import com.revature.exceptions.InvalidAmountException;
import com.revature.models.Reimbursement;
import com.revature.models.ReimbursementCreator;
import com.revature.models.ReimbursementResolver;
import com.revature.models.User;
import com.revature.services.ReimbursementService;
import com.revature.services.UserService;
import org.junit.*;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import java.sql.Date;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

public class ReimbursementServiceTest {

    Date d = new Date(Instant.now().toEpochMilli());

    @Before
    public void setupBeforeMethods(){
        System.out.println("This runs once before each method in this class");
        MockitoAnnotations.openMocks(this);
    }

    @Mock
    static IReimbursementDao rd;
    //We also have to use inject mocks, because UserService depends on UserDao
    @InjectMocks
    static ReimbursementService rs;

    @Test
    public void createReimbursementTestSuccess() throws InvalidAmountException {

        doNothing().when(rd).createReimbursement(any());

        ReimbursementCreator rc = new ReimbursementCreator(100,"Hotel room", 3);

        rs.createReimbursement(rc, 1);

        verify(rd).createReimbursement(any());

    }

    @Test(expected = InvalidAmountException.class)
    public void createReimbursementInvalidAmount() throws InvalidAmountException {
        ReimbursementCreator rc = new ReimbursementCreator(-500,"Hotel room", 3);

        doNothing().when(rd).createReimbursement(any());

        rs.createReimbursement(rc, 1);
    }

    @Test
    public void getAllPendingRequests(){

        List<Reimbursement> pendingList = new ArrayList<>();
        pendingList.add(new Reimbursement(100, d, "Hotel room", 1, 1, 3));

        when(rd.getAllPendingReimbursements()).thenReturn(pendingList);

        List<Reimbursement> returnedList = rs.getAllPendingRequests();

        assertEquals(pendingList, returnedList);

    }

    @Test
    public void getAllResolvedRequests(){

        List<Reimbursement> resolvedList = new ArrayList<>();
        resolvedList.add(new Reimbursement(100, d, "Hotel room", 1, 2, 3));

        when(rd.getAllResolvedReimbursements()).thenReturn(resolvedList);

        List<Reimbursement> returnedList = rs.getAllResolvedRequests();

        assertEquals(resolvedList, returnedList);

    }

    @Test
    public void getAllReimbursementsByEmployee(){
        List<Reimbursement> employeeReimbursements = new ArrayList<>();
        employeeReimbursements.add(new Reimbursement(100, d, "Hotel room", 1, 1, 3));

        when(rd.getAllReimbursementsByEmployee(1)).thenReturn(employeeReimbursements);

        int id = 1;

        List<Reimbursement> returnedList = rs.getAllReimbursementsByEmployee(id);

        assertEquals(employeeReimbursements, returnedList);
    }

    @Test
    public void getAllPendingByUserTest(){
        List<Reimbursement> pendingList = new ArrayList<>();
        pendingList.add(new Reimbursement(100, d, "Hotel room", 1, 1, 3));

        when(rd.getAllPendingRequestsByEmployee(1)).thenReturn(pendingList);

        List<Reimbursement> returnedList = rs.getAllPendingByUser(1);

        assertEquals(pendingList, returnedList);
    }

    @Test
    public void getAllResolvedByUserTest(){
        List<Reimbursement> resolvedList = new ArrayList<>();
        resolvedList.add(new Reimbursement(100, d, "Hotel room", 1, 2, 3));

        when(rd.getAllResolvedRequestsByEmployee(1)).thenReturn(resolvedList);

        List<Reimbursement> returnedList = rs.getAllResolvedByUser(1);

        assertEquals(resolvedList, returnedList);
    }

    @Test
    public void updateReimbursementTest(){

        Reimbursement r = new Reimbursement(1000, d, "Bought a thing", 1, 1, 4);

        when(rd.updateReimbursement(any())).thenReturn(r);

        Reimbursement updatedReimbursement = rs.updateReimbursement(r);

        assertEquals(r, updatedReimbursement);

    }

    @Test
    public void resolveReimbursementTest(){

        doNothing().when(rd).resolveReimbursement(any());

        ReimbursementResolver rr = new ReimbursementResolver(1,2);
        rr.setResolverId(1);

        rs.resolveReimbursement(rr);

        verify(rd).resolveReimbursement(any());
    }

    @Test
    public void deleteReimbursementTest(){

        doNothing().when(rd).deleteReimbursement(1);

        rs.deleteReimbursement(1);

        verify(rd).deleteReimbursement(1);

    }

}
