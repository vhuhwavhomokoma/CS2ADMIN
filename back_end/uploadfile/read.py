from urllib import response
from database.models import *
from django.core.mail import send_mail
from django.utils.safestring import mark_safe
import xlrd
from rest_framework.decorators import api_view
from django.http import JsonResponse

"""this whole class is used to ensure that files uploaded are txt or xlsx readable
so that they are loaded into the database"""
class ReadFiles():

    def viewfile():
        my_file=MainData.objects.last()
        #print(my_file.file)
        path = './uploadfile/static/media/' + str(my_file.file)
        

        if path.__contains__('txt'):
            openFile = open(path, 'r')
            if Student.objects.exists():
                return
            
            for row in openFile:
                student = Student()
                data = row.split(" ")
        
                student.studentNum=data[0]
                student.firstName = data[1]
                student.lastName = data[2][:-1]
                student.save()
        elif path.__contains__('xlsx'):
            book = xlrd.open_workbook(path)
            sheet = book.sheet_by_index(0)
            if Student.objects.exists():
                return

            for row in range(1,sheet.nrows):
                student = Student()
                student.studentNum = sheet.cell_value(row,0)
                student.firstName = sheet.cell_value(row,1)
                student.lastName = sheet.cell_value(row,2)
                student.save()


    def loadmarks():
        my_file=MainData.objects.last()
        #print(my_file.file)
        path = './uploadfile/static/media/' + str(my_file.file)
    
        if path.__contains__('txt'):
            openFile = open(path, 'r')

            for row in openFile:
                data = row.split(" ")
                for i in Student.objects.all():
                    if  data[0]==i.studentNum:
                
                        grades =CurrentGrade.objects.create(
                        student=i,
                        test1 = data[1],
                        test2 = data[2],
                        assignment1 = data[3],
                        assignment2 = data[4],
                        assignment3 = data[5],
                        assignment4 = data[6],
                        assignment5 = data[7],
                        assignment6 = data[8])
                        grades.save()
        elif path.__contains__('xlsx'):
            book = xlrd.open_workbook(path)
            sheet = book.sheet_by_index(0)
            if CurrentGrade.objects.exists():
                return

            for row in range(1,sheet.nrows):
                for i in Student.objects.all():
                    if sheet.cell_value(row,0)==i.studentNum:
                       
                
                        grades =CurrentGrade.objects.create(
                        student=i,
                        test1 = sheet.cell_value(row,1),
                        test2 =sheet.cell_value(row,2),
                        assignment1 = sheet.cell_value(row,3),
                        assignment2 = sheet.cell_value(row,4),
                        assignment3 = sheet.cell_value(row,5),
                        assignment4 = sheet.cell_value(row,6),
                        assignment5 = sheet.cell_value(row,7),
                        assignment6 = sheet.cell_value(row,8))
                        grades.save()


    def loadcs1marks():
        my_file=MainData.objects.last()
        #print(my_file.file)
        path = './uploadfile/static/media/' + str(my_file.file)
       
        if path.__contains__('txt'):
            openFile = open(path, 'r')

            for row in openFile:
                data = row.split(" ")
                for i in Student.objects.all():
                    if  data[0]==i.studentNum:
                
                        grades =cs1Grade.objects.create(
                        student0=i,
                        test1 = data[1],
                        test2 = data[2],
                        assignment1 = data[3],
                        assignment2 = data[4],
                        assignment3 = data[5],
                        assignment4 = data[6],
                        assignment5 = data[7],
                        assignment6 = data[8])
                        grades.save()
        elif path.__contains__('xlsx'):
            book = xlrd.open_workbook(path)
            sheet = book.sheet_by_index(0)
            if cs1Grade.objects.exists():
                return

            for row in range(1,sheet.nrows):
                for i in Student.objects.all():
                    if  sheet.cell_value(row,0)==i.studentNum:
                        print(sheet.cell_value(row,0))
                
                        grades =cs1Grade.objects.create(
                        student0=i,
                        test1 = sheet.cell_value(row,1),
                        test2 =sheet.cell_value(row,2),
                        assignment1 = sheet.cell_value(row,3),
                        assignment2 = sheet.cell_value(row,4),
                        assignment3 = sheet.cell_value(row,5),
                        assignment4 = sheet.cell_value(row,6),
                        assignment5 = sheet.cell_value(row,7),
                        assignment6 = sheet.cell_value(row,8))
                        grades.save()
            else:
                print("unable to readfile")
