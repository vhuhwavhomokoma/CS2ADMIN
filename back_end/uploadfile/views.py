import io
from rest_framework.views import APIView
from database.models import StudentForm
from django.http import JsonResponse
from rest_framework.response import Response
from database.serializer import FormSerializer,MainDataSerializer
from rest_framework.decorators import api_view
from .read import ReadFiles
from django.http.response import HttpResponse
import xlsxwriter
from django.core.mail import send_mail

#this class is for a studentView where they make new requests and displayed on their screen
class StudentUploads(APIView):    
    serializer_class = FormSerializer   
  
    #allows the student to make a request: post data
    def post(self, request):

        serializer = FormSerializer(data=request.data)

        #verify the data uploaded by the student before is it saved.
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return  Response({"status":"Upload succesful!"})
        return  Response({'status':"Please resubmit your request!"})

    def get(self, request):
        studentNum= request.GET['username']
        #get the data of the student in the database to display in student's view
        requestsMade = StudentForm.objects.filter(studentNum=studentNum)
        
        requests = []
        #append all requests of the student to the list
        for studentRequest in requestsMade:

            #filepath
            filepath  = '/media/' + studentRequest.file.name
            
            #return a json path to the front end
            requests.append({'filepath':filepath,'id':studentRequest.id, 'created':studentRequest.created, 'type':studentRequest.requesttype, 'fromDate':studentRequest.datefrom, 'toDate':studentRequest.dateTo, 'motivation':studentRequest.motivation, 'studentNum':studentRequest.studentNum,'comment':studentRequest.reason, 'status':studentRequest.status})
        return JsonResponse(requests,safe = False)

class RequestsView(APIView):
    
    #get all the requests made
    def get(self, request):
            requests = StudentForm.objects.all()
            student = []

            for eachStudent in requests:
                filepath  = '/media/' + eachStudent.file.name
                student.append({'filepath':filepath,'id':eachStudent.id, 'created':eachStudent.created, 'type':eachStudent.requesttype, 'fromDate':eachStudent.datefrom, 'toDate':eachStudent.dateTo, 'motivation':eachStudent.motivation, 'studentNum':eachStudent.studentNum,'comment':eachStudent.reason, 'status':eachStudent.status})
            return JsonResponse(student,safe = False)

    #the admin view --request status is updated using id
    def post(self,request,*args,**kwargs):

        if request.method=='POST':

            data = request.data

            StudentForm.objects.filter(id=data["id"]).update(status=data['status'],reason=data['reason'])


        return JsonResponse({'status':'status updated'})
    
    #used to delete a requests using request id
    @api_view(['POST'])
    def deleteRequest(request):
        if request.method=='POST':
            data = request.data
            StudentForm.objects.filter(id=data['id']).delete()

            return JsonResponse("status"":request deleted",safe=False)
        return JsonResponse("status"":request deleted fail",safe=False)
    
    #filter students requests based on status
    @api_view(['GET'])
    def get_filter(request):
            requests = StudentForm.objects.filter(status=request.GET['status'])
            student = []

            for eachStudent in requests:
                filepath  = '/media/' + eachStudent.file.name
                student.append({'filepath':filepath,'id':eachStudent.id, 'created':eachStudent.created, 'type':eachStudent.requesttype, 'fromDate':eachStudent.datefrom, 'toDate':eachStudent.dateTo, 'motivation':eachStudent.motivation, 'studentNum':eachStudent.studentNum, 'status':eachStudent.status})
            return JsonResponse(student,safe = False)  

    #this creates a speadsheet of students who need adjusting
    @api_view(['GET'])
    def needAdjustment(request):

        output = io.BytesIO()
        workbook = xlsxwriter.Workbook(output)
        worksheet = workbook.add_worksheet()

        requests = StudentForm.objects.filter(status='Approved')
        if requests.exists():

      
            worksheet.write(0,0,"request id")
            worksheet.write(0,1,"Student Number")
            worksheet.write(0,2,"Request Type")
            worksheet.write(0,3,"status")
            worksheet.write(0,4,"comment")
            worksheet.write(0,5,"date created")

            
            row=1
            for i in requests:

                worksheet.write(row,0,i.id)
                worksheet.write(row,1,i.studentNum)
                worksheet.write(row,2,i.requesttype)
                worksheet.write(row,3,i.status)
                worksheet.write(row,4,i.reason)
                worksheet.write(row,5,str(i.created)[:10])
                row+=1 

        workbook.close()
        #moves the point to the firstline to create filename
        output.seek(0)
        filename = 'Requests_to_Adjustments.xlsx'
        
        #creates http response so that the file is readable in the front-end
        response = HttpResponse(
        output,
        content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
        response['Content-Disposition'] = 'attachment; filename=%s' % filename

        return response 


class LoadFiles():

    #adds students into the students database
    @api_view(['POST'])
    def addstudents(request):

        serialiser = MainDataSerializer(data =request.data)
        if serialiser.is_valid(raise_exception=True):
            serialiser.save()
            ReadFiles.viewfile()
            return  Response({"status":"Students add is successful!"})
        return  Response({'status':"students have have been added already, file discarded"})
    

    #loads the current grades into the database
    @api_view(['POST'])
    def loadCurrentGrades(request):
        serialiser = MainDataSerializer(data =request.data)
        if serialiser.is_valid(raise_exception=True):
            serialiser.save()
            ReadFiles.loadmarks()
            return JsonResponse({'status':"load successful"})
    
    #loads the cs1 grades into the database
    @api_view(['POST'])
    def loadCS1Grades(request):
        serialiser = MainDataSerializer(data =request.data)
        if serialiser.is_valid(raise_exception=True):
            serialiser.save()
            ReadFiles.loadcs1marks()
            return JsonResponse({'status':'load successful'})
    
    #reads the StudentForm that contains all the queries and get those still pending
    #send an email with the count of each type of request
    @api_view(['GET'])
    def generateReport(request):
        obj = StudentForm.objects.filter(status='Pending')
        leave =0
        extension =0
        exception = 0
        for i in obj:
            if i.requesttype =='Short Leave':
                leave+=1
            elif i.requesttype=='Extension':
                extension+=1
            else:
                exception+=1

        #an email is sent to uct.capstone@gmail.com containing all the requests pending
        send_mail('Pending Requests',
               'Good day,\nPlease attend the following:\n\nShort Leave: '+str(leave)+'\nExtension: '+str(extension)+"\nException: "+str(exception),
                'CSC2ADMIN NOTIFICATION',recipient_list=['uct.capstone@gmail.com'],fail_silently=False)

        return Response("done")
            











            

  

        
