
from django.db import models #contains the base class models
from django.contrib.auth.models import User
import datetime

class Student(models.Model):
    studentNum = models.CharField(max_length=9,blank=False)
    firstName = models.CharField(max_length=20,blank=False)
    lastName = models.CharField(max_length=20,blank=False)

    def __str__(self):
        return f"Student: {self.studentNum}"

class CurrentGrade(models.Model):

    student = models.ForeignKey(Student,on_delete=models.CASCADE,related_name='student_current')
    test1 = models.IntegerField(blank=True)
    test2 = models.IntegerField(blank=True)

    assignment1 = models.IntegerField(blank=True)
    assignment2 = models.IntegerField(blank=True)
    assignment3 = models.IntegerField(blank=True)
    assignment4 = models.IntegerField(blank=True)
    assignment5 = models.IntegerField(blank=True)
    assignment6 = models.IntegerField(blank=True)

    def __str__(self):
        return f"CurrentGrade: {self.student.studentNum}"

    
class cs1Grade(models.Model):

    student0 = models.ForeignKey(Student,on_delete=models.CASCADE,related_name='student_current_cs1')
    test1 = models.IntegerField(blank=True)
    test2 = models.IntegerField(blank=True)

    assignment1 = models.IntegerField(blank=True)
    assignment2 = models.IntegerField(blank=True)
    assignment3 = models.IntegerField(blank=True)
    assignment4 = models.IntegerField(blank=True)
    assignment5 = models.IntegerField(blank=True)
    assignment6 = models.IntegerField(blank=True)

    def __str__(self):
        return f"CS1Grades: {self.student0.studentNum}"


class StudentForm(models.Model):

    studentNum = models.CharField(max_length=9,blank=False)
    requesttype = models.CharField(max_length=50, default ="",blank=True)
    file = models.FileField() # for creating file input
    motivation = models.CharField(max_length=120,default="") # Text for motivating reasons
    datefrom = models.DateTimeField(default=datetime.datetime.now)
    created = models.DateTimeField(default=datetime.datetime.now)
    dateTo = models.DateTimeField(default=datetime.datetime.now)
    status = models.CharField(max_length=30,default="Pending") #status request
    reason = models.CharField(max_length=120,default="")

    def __str__(self):
        return f"StudentForm: {self.studentNum}"


class MainData(models.Model):
    file = models.FileField(upload_to='admin_data')








