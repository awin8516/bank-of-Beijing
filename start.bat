@echo off 

rem start python TransFile.py
set d=%USERPROFILE%\Desktop
echo %d%

if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" ( 

 cd "C:\Program Files (x86)\Google\Chrome\Application\" 

 start chrome.exe %d%\bank-of-Beijing\index.html

) else (

if exist "%localAppData%\Google\Chrome\Application\chrome.exe" ( 

  cd "%localAppData%\Google\Chrome\Application\" 

  start chrome.exe %d%\bank-of-Beijing\index.html

  ) else (

   start iexplore.exe %d%\bank-of-Beijing\index.html

  )

)



