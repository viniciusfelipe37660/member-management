@REM ----------------------------------------------------------------------------
@REM Licensed to the Apache Software Foundation (ASF) under one
@REM or more contributor license agreements.  See the NOTICE file
@REM distributed with this work for additional information
@REM regarding copyright ownership.  The ASF licenses this file
@REM to you under the Apache License, Version 2.0 (the
@REM "License"); you may not use this file except in compliance
@REM with the License.  You may obtain a copy of the License at
@REM
@REM    http://www.apache.org/licenses/LICENSE-2.0
@REM
@REM Unless required by applicable law or agreed to in writing,
@REM software distributed under the License is distributed on an
@REM "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
@REM KIND, either express or implied.  See the License for the
@REM specific language governing permissions and limitations
@REM under the License.
@REM ----------------------------------------------------------------------------

@REM ----------------------------------------------------------------------------
@REM Apache Maven Wrapper startup batch script
@REM ----------------------------------------------------------------------------

@IF "%__MVNW_ARG0_NAME__%"=="" (SET "BASE_DIR=%~dp0")
@IF NOT "%__MVNW_ARG0_NAME__%"=="" (SET "BASE_DIR=%%~dp%__MVNW_ARG0_NAME__%")

@SET MAVEN_PROJECTBASEDIR=%BASE_DIR%
@SET WRAPPER_DIR=%MAVEN_PROJECTBASEDIR%.mvn\wrapper

@SET WRAPPER_JAR=%WRAPPER_DIR%\maven-wrapper.jar
@SET WRAPPER_LAUNCHER=org.apache.maven.wrapper.MavenWrapperMain

@SET DOWNLOAD_URL="https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar"

FOR /F "usebackq tokens=1,2 delims==" %%A IN ("%WRAPPER_DIR%\maven-wrapper.properties") DO (
    IF "%%A"=="wrapperUrl" SET DOWNLOAD_URL=%%B
)

@IF EXIST "%WRAPPER_JAR%" (
    @IF "%MVNW_VERBOSE%" == "true" (
        @echo Found %WRAPPER_JAR%
    )
) ELSE (
    @IF NOT "%MVNW_REPOURL%" == "" (
        SET DOWNLOAD_URL="%MVNW_REPOURL%/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar"
    )
    @IF "%MVNW_VERBOSE%" == "true" (
        @echo Downloading from: %DOWNLOAD_URL%
    )
    powershell -Command "&{"^
        "$webclient = new-object System.Net.WebClient;"^
        "if (-not ([string]::IsNullOrEmpty('%MVNW_USERNAME%') -and [string]::IsNullOrEmpty('%MVNW_PASSWORD%'))) {"^
        "$webclient.Credentials = new-object System.Net.NetworkCredential('%MVNW_USERNAME%', '%MVNW_PASSWORD%');"^
        "}"^
        "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; $webclient.DownloadFile('%DOWNLOAD_URL%', '%WRAPPER_JAR%')"^
        "}"
    IF "%ERRORLEVEL%"=="0" (
        @IF "%MVNW_VERBOSE%" == "true" (
            @echo Finished downloading %WRAPPER_JAR%
        )
    ) ELSE (
        @echo ERROR: Failed to download %WRAPPER_JAR% >&2
        exit /b 1
    )
)

@SET MAVEN_JAVA_EXE="%JAVA_HOME%\bin\java.exe"
@SET JAVA_CMD=%MAVEN_JAVA_EXE%

@IF NOT "%JAVA_HOME%" == "" @IF NOT EXIST %MAVEN_JAVA_EXE% (
    @echo ERROR: JAVA_HOME is set to an invalid directory. >&2
    @echo JAVA_HOME = "%JAVA_HOME%" >&2
    @echo Please set the JAVA_HOME variable in your environment to match the >&2
    @echo location of your Java installation. >&2
    exit /b 1
)

@SET WRAPPER_LAUNCHER=org.apache.maven.wrapper.MavenWrapperMain

@SET WRAPPER_URL="https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar"

%JAVA_CMD% ^
  %JVM_CONFIG_MAVEN_PROPS% ^
  %MAVEN_OPTS% ^
  %MAVEN_DEBUG_OPTS% ^
  -classpath "%WRAPPER_JAR%" ^
  "-Dmaven.multiModuleProjectDirectory=%MAVEN_PROJECTBASEDIR%" ^
  %WRAPPER_LAUNCHER% %MAVEN_CONFIG% %*
