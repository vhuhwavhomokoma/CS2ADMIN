from dataclasses import field, fields
from rest_framework import serializers
from .models import Student,cs1Grade,CurrentGrade,StudentForm,MainData

class CurrentGradesSerializer(serializers.Serializer):

    class Meta:
        model = CurrentGrade

        fields = "__all__"

class cs1GradesSerializer(serializers.Serializer):

    class Meta:
        model = cs1Grade

        fields = "__all__"



class StudentSerializer(serializers.Serializer):

    class Meta:
        model = Student

        fields = '__all__'

class FormSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentForm
        fields = '__all__'
class MainDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = MainData
        
        fields = '__all__'

