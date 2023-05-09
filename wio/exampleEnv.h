/**
Hey team!

This file contains example environmental variables that you need to set before using the 
wio-side code. Environmental variables are used for keeping sensitive information (like 
passwords, API keys, server addresses, etc) private.

To use these environmental variables in this project, you must copy this file and rename the 
copy as 'myEnv.h' for yourself, and then fill in the values that apply to you. You might need 
to save the file.

Very Important: The 'myEnv.h' file should not be shared or committed to Git, as it contains 
sensitive information that should not be shared publicly. This file was already added to our
.gitignore file, but for the sake of your data safety, always ensure that this is the case.

You can fill-in either the MOBILE or the HOME variant of the wifi details, there's no need to
put both.

For the Communication variables: if you don't know what to fill, check with another member of 
the team.

*/

//Personal variables:

#define SSID_MOBILE ""
#define PASSWORD_MOBILE ""
#define SSID_HOME ""
#define PASSWORD_HOME ""

//Communication variables:

#define MQTT_SERVER ""
#define TOPIC_MOTION ""
#define TOPIC_BUTTON ""
#define TOPIC_LED_GREEN ""
#define TOPIC_LED_RED ""
#define TOPIC_ANGLE ""
#define TOPIC_SPEAKER ""
#define TOPIC_ALARM_STATUS ""
#define TOPIC_ALARM_ACTIVATION ""




