from statistics import mean
from django.http import JsonResponse
from database.models import Student,CurrentGrade,cs1Grade
from rest_framework.views import APIView
from rest_framework.decorators import api_view
import io
from django.views.decorators.csrf import csrf_exempt
import xlsxwriter
from django.http.response import HttpResponse
from django.contrib.auth.models import User 

student = Student.objects.all()
cs1marks = cs1Grade.objects.all()
current  = CurrentGrade.objects.all()


"""this class focueses on analysing the grades overall and create spreadsheets"""

class Analysis(APIView):


    @api_view(['GET'])
    def allAverage(request):
      grades = CurrentGrade.objects.all()

      Critical=0
      Good=0
      Excellent=0

      for i in grades:

        A = [i.assignment1,i.assignment2,i.assignment3,i.assignment4,i.assignment5,i.assignment6]
        dp = round(mean(A),2)
        if dp <=45:
          Critical+=1
        elif 45<dp<61:
          Good+=1
        else:
          Excellent+=1
      return JsonResponse({"critical":Critical,"good":Good,"excellent":Excellent})

    #dispay grades and perfomance status on student's view
    @api_view(['GET'])
    def studentDP(request):

      if request.method=='GET':

        status = ''
        dp = 0
        message = ''

        name = request.GET['username'].upper()

        marks ={"status":'','dp':0,'message':''}

        if CurrentGrade.objects.filter(student__studentNum=name).exists():
          grades = CurrentGrade.objects.filter(student__studentNum=name)
          A = [grades[0].assignment1,grades[0].assignment2,grades[0].assignment3,grades[0].assignment4,grades[0].assignment5,grades[0].assignment6]
          
          dp = round(mean(A),2)  
          if dp <=45:
            marks.update({'dp':dp})
            marks.update({'status':'Critical'})
            marks.update({'message':'Please visit the Course Convenor to discuss support plan, ASAP.'})

          elif 45<dp<=60:
            marks.update({'dp':dp})
            marks.update({"status":'Good'})
            marks.update({"message":'You can visit the Course Convenor for support.'})

          else:
            marks.update({'dp':dp})
            marks.update({"status":'Excellent'})
            marks.update({"message":'Impressive, Keep up the good work.'})
            
          return JsonResponse(marks)
      return JsonResponse({'dp':'-1','status':'data not found','message':"Contact Admin"})
  
  #search student by username and return their grades
    @api_view(['GET'])
    def searchStudent(request):
      name = request.GET['username'].upper()
      cs1 = cs1Grade.objects.all()

      for i in cs1:
        list = {}
        if (i.student0.studentNum.upper()==name):
          cs2  = CurrentGrade.objects.filter(student__studentNum=name)[0]
          list.update({'cs2grades':{'test1':cs2.test1,'test2':cs2.test2,'assignment1':cs2.assignment1,'assignment2':cs2.assignment2,'assignment3':cs2.assignment3,'assignment4':cs2.assignment4}})

          list.update({'cs1grades':{'test1':i.test1,'test2':i.test2,'assignment1':i.assignment1,'assignment2':i.assignment2,'assignment3':i.assignment3,'assignment4':i.assignment4,'assignment5':i.assignment5,'assignment6':i.assignment6}})

       
          return JsonResponse(list)
      return JsonResponse({'status':'student not found'})
      
    #filters the students based on their performed and return all grades per catergory 
    @api_view(['GET'])
    def allGrades(request):
  
      cs1 = cs1Grade.objects.all()
      cs2= CurrentGrade.objects.all()

      list = []
      critical=[]
      good = []
      excellent = []
      for i in cs1:
        
        studentNum1 = (i.student0.studentNum)
        
        for j in Student.objects.all():
          if studentNum1.lower()==j.studentNum.lower():

            #cs1grades = {'first_name':i.student0.firstName,'last_name':i.student0.lastName,'studentNum':studentNum1,'test1':i.test1,'test2':i.test2,'assignment1':i.assignment1,'assignment2':i.assignment2,'assignment3':i.assignment3,'assignment4':i.assignment4,'assignment5':i.assignment5,'assignment6':i.assignment6}
            cs2  = CurrentGrade.objects.filter(student__studentNum=studentNum1)[0]
          
            A = [cs2.assignment1,cs2.assignment2,cs2.assignment3,cs2.assignment4,cs2.assignment5,cs2.assignment6]
            dp = round(mean(A),2)

            if 0<=dp <=45:
              critical.append({"dp":dp,"lastName":j.lastName,"firstName":j.firstName,"studentNum":studentNum1,"email":studentNum1+"@myuct.ac.za"})
          
            elif 45<dp<61:
              good.append({"dp":dp,"lastName":j.lastName,"firstName":j.firstName,"studentNum":studentNum1,"email":studentNum1+"@myuct.ac.za"})
            elif 61<=dp<101:
              excellent.append({"dp":dp,"lastName":j.lastName,"firstName":j.firstName,"studentNum":studentNum1,"email":studentNum1+"@myuct.ac.za"})
      list.append(excellent)
      list.append(good)
      list.append(critical)
      return JsonResponse(list,safe=False)
           

        
    #This function genenates a spreedsheet of students who need support
    @csrf_exempt
    @api_view(['GET'])
    def needSupport(request):

        output = io.BytesIO()
        workbook = xlsxwriter.Workbook(output)
        worksheet = workbook.add_worksheet()
        worksheet.write(0,0,"Student Number")
        worksheet.write(0,1,"CS1 Assign Average")
        worksheet.write(0,2,"CS2 Assign Average")
        worksheet.write(0,3,"CS2 Status")

        cs1 = cs1Grade.objects.all()
        cs2 = CurrentGrade.objects.all()
        
        row=1
        list =  []
        for i in cs1:
  
            studentNum1 = (i.student0.studentNum)
            cs1 = [i.test1,i.test2,i.assignment1,i.assignment2,i.assignment3,i.assignment4,i.assignment5,i.assignment6]
            cs2  = CurrentGrade.objects.filter(student__studentNum=studentNum1)[0]

            cs1_a=round(mean(cs1[2:]),2)
            cs2 = [cs2.test1,cs2.test2,cs2.assignment1,cs2.assignment2,cs2.assignment3,cs2.assignment4,cs2.assignment5,cs2.assignment6]
            
            cs2_a=round(mean(cs2[2:]),2)
            if 30<cs2_a<45:
              worksheet.write(row,0,studentNum1)
              worksheet.write(row,1,cs1_a)
              worksheet.write(row,2,cs2_a)
              worksheet.write(row,3,'Critical')
              #list.append({"stu":studentNum1,"cs1":cs1_a,"cs2":cs2_a,"status":'critical'})
              row+=1
            elif cs2_a<30:
                worksheet.write(row,0,studentNum1)
                worksheet.write(row,1,cs1_a)
                worksheet.write(row,2,cs2_a)
                worksheet.write(row,3,'Urgent help')
                #list.append({"stu":studentNum1,"cs1":cs1_a,"cs2":cs2_a,"status":'Urgebt help'})
                row+=1   
        #return JsonResponse(list,safe=False)         

        workbook.close()
        workbook.close()
        output.seek(0)
        filename = 'NeedSupport.xlsx'
        response = HttpResponse(
          output,
          content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
        response['Content-Disposition'] = 'attachment; filename=%s' % filename

        return response 

    #generates dp spreadsheet
    @api_view(['GET'])
    def releaseDp(request):

        output = io.BytesIO()
        workbook = xlsxwriter.Workbook(output)
        worksheet = workbook.add_worksheet()
        worksheet.write(0,0,"Student Number")
        worksheet.write(0,1,"CS1 Assign Average")
        worksheet.write(0,2,"CS2 Assign Average")
        worksheet.write(0,3,"CS2 Status")

        cs1 = cs1Grade.objects.all()
        cs2 = CurrentGrade.objects.all()
        
        row=1
        list =  []
        for i in cs1:
  
            studentNum1 = (i.student0.studentNum)
            cs1 = [i.test1,i.test2,i.assignment1,i.assignment2,i.assignment3,i.assignment4,i.assignment5,i.assignment6]
            cs2  = CurrentGrade.objects.filter(student__studentNum=studentNum1)[0]

            cs1_a=round(mean(cs1[2:]),2)
            cs2 = [cs2.test1,cs2.test2,cs2.assignment1,cs2.assignment2,cs2.assignment3,cs2.assignment4,cs2.assignment5,cs2.assignment6]
            
            cs2_a=round(mean(cs2[2:]),2)
            if cs2_a<45:
              worksheet.write(row,0,studentNum1)
              worksheet.write(row,1,cs1_a)
              worksheet.write(row,2,cs2_a)
              worksheet.write(row,3,'DPR')
              
              row+=1
            else:
                worksheet.write(row,0,studentNum1)
                worksheet.write(row,1,cs1_a)
                worksheet.write(row,2,cs2_a)
                worksheet.write(row,3,'DP')
                
                row+=1   
            

        workbook.close()
        workbook.close()
        output.seek(0)
        filename = 'dplist.xlsx'
        response = HttpResponse(
          output,
          content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
        response['Content-Disposition'] = 'attachment; filename=%s' % filename

        return response 
    
