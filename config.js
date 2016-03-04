var config = {}

// Version numbers for both config and program, do not touch
config.configVersion = '0.0.4'
config.programVersion = '0.3.9'

/*
Error (4) - Log things when the system is in distress, will affect users.
Warn  (3) - Something seems phishy, we'll log it to make sure.
Info  (2) - Helpful things that you might want to know, will be high volume.
Debug (1) - Just about everything, will be extremely high volume.
Trace (0) - A fly moves a couple of centimeters in Africa, you'll know about it.
*/

config.loggingLevel = 'info'

// Indent size for file name
config.printingSize = 7

// Port that program should run on
config.port = 3000

// Passwords are stored as MD5 Hashes
// http://www.md5.cz/
config.users = [
  {user: "Popey", password: "5f4dcc3b5aa765d61d8327deb882cf99"}, //password
  {user: "Gunstar", password: "14a88b9d2f52c55b5fbcf9c5d9c11875"}, //newPassword
  {user: "UnSeen", password: "f21a15f48c1143fd04b2f8e6e29192cd"} //uniquePassword
]

// For the moment only absolutely paths are accepted
// E.G. C:/exampleBat.bat
config.batFiles = [
  {path: "C:\\exampleBat.bat", name: "Bat File 1"},
  {path: "C:\\exampleBat.bat", name: "Bat File 2"}, 
  {path: "C:\\exampleBat.bat", name: "Bat File 3"}, 
  {path: "C:\\exampleBat.bat", name: "Bat File 4"}
]

/*
PROD - Production server, tests are not initially run and messages are piped to file.
DEV  - Development server, tests are run and messages are displayed to default out.
*/

config.environment = "PROD"

module.exports = config
