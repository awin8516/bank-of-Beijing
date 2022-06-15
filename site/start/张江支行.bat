@echo off 

set delay=1
set url=http://lina007.com/site/?siteid=16

echo          988888807                        8                  888               8                 757               
echo       58888888888880                  87  88          117711888887985987     7888828888888888   7888888  888888887 
echo     888888851728888888           6888888  88888882   8888888811488888888  7888888888885777885    18888888888888888 
echo   788884          188885         8888888  88888886    7788888888888886    888888887 88888888                       
echo   8888  888888887   88886         888888  887            888555542888       7888977 88877888     888888888888888888
echo  8888  788888888888  48887           788  88            7888602569887       8888881 8888880      888748800278887887
echo 8888    886688888888  8888       729988858881    88     8888888884888       868859  81 8588          88      88    
echo 8888            1888  8888      1888888888888888888    18862  87 898884      18888888888888881   788888      88    
echo 8888    888888888887  7888       8888887  188888888    888887 88 888888      889  8888888748887  88888       88    
echo 8888   788888888888888  88                  777               87    77             17       7                48    
echo  8888   888888888888888                                                                                            
echo   8888            888887         88787  78   987  8 587 88     8118  68778   18178 785 82 88  788 785 88  56 78778 
echo    888887         88888          88 88  881  7888 8 58607     88  88 98741   78608  88717 88   88 785 888177789  7 
echo     088888888888888888           88 88 4188  77 888 78888    788  48 1818     89781 8887  88   88  81 0 188768  781
echo       78888888888887             88 0870  88 75  68 18  88    78  81 58      787 87 81 76 88 8788 781 8   8  88 78 

echo *******************************************************************************************************************
echo *                                                                                                                 *
echo *                                             北京银行触屏系统                                                    *
echo *                                                                                                                 *
echo *                                              启动中，请稍后...                                                  *
echo *                                                                                                                 *
echo *******************************************************************************************************************


if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" ( 

    cd "C:\Program Files (x86)\Google\Chrome\Application\" 

    choice /t %delay% /d y /n >nul

    echo start chrome.exe "%url%"

    start chrome.exe --app="%url%" --start-maximized

) else if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" ( 

    cd "C:\Program Files\Google\Chrome\Application\" 

    choice /t %delay% /d y /n >nul

    start chrome.exe --app="%url%" --start-maximized

) else if exist "%localAppData%\Google\Chrome\Application\chrome.exe" ( 

    cd "%localAppData%\Google\Chrome\Application\" 

    choice /t %delay% /d y /n >nul

    start chrome.exe --app="%url%" --start-maximized

) else (

    choice /t %delay% /d y /n >nul

    start iexplore.exe "%url%"

)




