from database.models import Student, CurrentGrade,cs1Grade
from django.core.management import BaseCommand
from pytz import UTC

class Command(BaseCommand):

    def handle(self,*args,**options):

        #if(Tutor.objects.exists() or Student.objects.exists()):
         #   print("Student / Tutor data already loaded...existing")
         #   return

        print("Loading student data for students available into the database")
        file = open("./students.txt")
        for row in file:
            student = Student()
            data = row.split(" ")
            student.studentNum=data[0]
            student.firstName = data[1]
            student.lastName = data[2][:-1]
            student.save()
        
        file  = open("./cs1marks.txt")
        

        for row in file:

            grades = cs1Grade()
            data = row.split(" ")

            grades.studentNum = data[0]
            grades.test1 = data[1]
            grades.test2 = data[2]

            grades.assignment1 = data[3]
            grades.assignment2 = data[4]
            grades.assignment3 = data[5]
            grades.assignment4 = data[6]
            grades.assignment5 = data[7]
            grades.assignment6 = data[8]
            grades.save()
            
        file  = open("./studentgrades.txt")
        
        for row in file:

            grades = CurrentGrade()
            data = row.split(" ")

            grades.studentNum = data[0]
            grades.test1 = data[1]
            grades.test2 = data[2]

            grades.assignment1 = data[3]
            grades.assignment2 = data[4]
            grades.assignment3 = data[5]
            grades.assignment4 = data[6]
            grades.assignment5 = data[7]
            grades.assignment6 = data[8]
            grades.save()
        


            

        

        

