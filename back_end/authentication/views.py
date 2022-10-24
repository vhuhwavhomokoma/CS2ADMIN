from urllib import response
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.auth import AuthToken
from .serializers import RegisterSerializer
from django.core.mail import send_mail

class Authentications:

    # creates a registration form then user log in credentials are sent to the user
    def home(request):
        if request.method=='POST':

            password = request.POST['password']
            password2= request.POST['password2']
            
            serializer = RegisterSerializer(data={"username":request.POST['username'],"first_name":request.POST['first_name'],"last_name":request.POST['last_name'],'email':request.POST['email'],"password":request.POST['password']})
            if serializer.is_valid(raise_exception=True) and password==password2:
                serializer.save()

                send_mail('Registration Complete',
                "Dear "+str(request.POST['first_name'])+"\n\nYou have successfully created a Profile, your log in credentials are:\nUsername: "+str(request.POST['username'])+"\nPassword: "+str(password2)+"\n\nKind regards\nComputer Science Department",
                'donotreply.cs2admin@uct.ac.za',recipient_list=[request.POST['email']],fail_silently=False)

                return render(request,'done.html')
    
        return render(request, "registration.html")

    
  

    @api_view(['POST'])
    def login(request):
        serializer = AuthTokenSerializer(data=request.data)
    
        #exception is raised if user and password incorrect

        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        _, token = AuthToken.objects.create(user)

        #return user details if true and token
        return Response({
            'user_data': User.serialize_user(user),
            'token': token
        })

    #verifies if user token hasnt expired to keep the user in the system
    @api_view(['GET'])
    def verify(request):
        if request.method=='GET':
            data = request.data['username']
            
            if AuthToken.objects.all().exists():
                for i in AuthToken.objects.all():
                    if str(i.user).lower()==data.lower():
                        return Response({"status":str(i.user)==data})
    
            return Response({'status':False})

    @api_view(['POST'])
    def logout(request):
        
        if request.method=='POST':
            data = request.data['username']

            #delete user token
            for i in AuthToken.objects.all():
                if str(i.user).lower()==data.lower():
                    i.delete()

            return JsonResponse('successfully logged out',safe=False)
        return JsonResponse('unsuccessfully logged out',safe=False)
        
            

    @api_view(['POST'])
    def register(request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            _, token = AuthToken.objects.create(user)
            return Response({
                "user_info": User.serialize_user(user),
                "token": token
            })

    #returns user details
    @api_view(['GET'])
    def get_user(request):
        user = request.user
        if user.is_authenticated:
            return Response({
                'user_data': User.serialize_user(user)
            })
        return Response({'status':"user not authenticated"})


class User:
    
    #used to ensure that data passed from the front end is python readable
      def serialize_user(user):
        return {
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name
        }

