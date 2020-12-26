@echo off 

rem start python TransFile.py
set d=%USERPROFILE%\Desktop
set zipName=bank-of-Beijing
set delay=5
echo *****************************************
echo                Æô¶¯ÖÐ£¬ÇëÉÔºó...
echo *****************************************

if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" ( 

  cd "C:\Program Files (x86)\Google\Chrome\Application\" 

  choice /t %delay% /d y /n >nul

  start chrome.exe  %d%\%zipName%\index.html

) else (

if exist "%localAppData%\Google\Chrome\Application\chrome.exe" ( 

  cd "%localAppData%\Google\Chrome\Application\" 

    choice /t %delay% /d y /n >nul

    start chrome.exe %d%\%zipName%\index.html

  ) else (

    choice /t %delay% /d y /n >nul

    start iexplore.exe %d%\%zipName%\index.html

  )

)



