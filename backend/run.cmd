@echo off
cd /d "D:\Projetos\member-management\backend"
SET "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.19.10-hotspot"
SET "PATH=%JAVA_HOME%\bin;%PATH%"
echo Iniciando backend...
"%JAVA_HOME%\bin\java.exe" -classpath ".mvn\wrapper\maven-wrapper.jar" -Dmaven.multiModuleProjectDirectory=. org.apache.maven.wrapper.MavenWrapperMain spring-boot:run
pause
