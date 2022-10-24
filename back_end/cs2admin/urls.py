from django.contrib import admin
from django.urls import path, include


from database import views as base
from analysis.views import *
from authentication.views import *
from analysis.views import *
from knox import views as knox_views
from django.conf import settings 
from uploadfile.views import *
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),

    #authentication
    path('api/', include('authentication.urls')),
    path('user/', Authentications.get_user),
    path('login/', Authentications.login),
    path('register/', Authentications.register),
    path('logout/', Authentications.logout, name='knox_logout'),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'), 
    path('verifystatus/',Authentications.verify),
    path('home/',Authentications.home,name = 'home'),


    #student View
    path('student-dp/',Analysis.studentDP),
    path('request/',StudentUploads.as_view()),
   
   #view uploaded files-requests
   path('request-view/',RequestsView.as_view()),
   path('request-filter',RequestsView.get_filter,name='filter by status'),
 


   #course convenor view
   path('addstudents/',LoadFiles.addstudents,name='add students'),
   path('loadcurrentgrades/',LoadFiles.loadCurrentGrades,name='load current grades'),
   path('loadcs1grades/',LoadFiles.loadCS1Grades,name='load cs1 grades'),
   path('searchstudent/',Analysis.searchStudent,name='search student and return grades'),
   path('allstudents/',Analysis.allGrades,name='search student and return grades'),


   #spreadsheets
   path('needsupport/',Analysis.needSupport,name='spreadsheet of students in need of support'),
   path('releasedp/',Analysis.releaseDp,name='spreadsheet of dps'),
   path('adjustment/',RequestsView.needAdjustment,name='spreadsheet of extesions'),
   path('deleteRequest/',RequestsView.deleteRequest,name='delete a request'),
   path('report/',LoadFiles.generateReport,name='generate report'),


]

if settings.DEBUG:     
    urlpatterns += static(                            # add this
            settings.STATIC_URL, 
document_root=settings.STATIC_ROOT
          )   
    urlpatterns += static(                            # add this
            settings.MEDIA_URL,         document_root=settings.MEDIA_ROOT)
