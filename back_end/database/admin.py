from django.contrib import admin
from . models import cs1Grade, CurrentGrade, Student,StudentForm,MainData

@admin.register(Student)
class databaseAdmin(admin.ModelAdmin):
    list_display = ['id','studentNum','firstName','lastName']

@admin.register(CurrentGrade)
class database_currentgrade(admin.ModelAdmin):
    list_display = ['id','test1','test2','assignment1','assignment2','assignment3','assignment4','assignment5','assignment6']
    
@admin.register(cs1Grade)
class database_cs1grade(admin.ModelAdmin):
    list_display = ['id','test1','test2','assignment1','assignment2','assignment3','assignment4','assignment5','assignment6']

@admin.register(StudentForm)
class studentFormAdmin(admin.ModelAdmin):
    list_display = ['id','requesttype','file','motivation','datefrom','dateTo']

@admin.register(MainData)
class mainAdmin(admin.ModelAdmin):
    list_display = ['id','file']

