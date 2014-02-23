import json
import random
import time

def strTimeProp(start, end, format, prop):
    """Get a time at a proportion of a range of two formatted times.

    start and end should be strings specifying times formated in the
    given format (strftime-style), giving an interval [start, end].
    prop specifies how a proportion of the interval to be taken after
    start.  The returned time will be in the specified format.
    """

    stime = time.mktime(time.strptime(start, format))
    etime = time.mktime(time.strptime(end, format))

    ptime = stime + prop * (etime - stime)

    return time.strftime(format, time.localtime(ptime))


def randomDate(start, end, prop):
    return strTimeProp(start, end, '%m/%d/%Y %H:%M:%S', prop)


devices = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]
deviceType = ["iPhone 5", "iPhone 5", "iPhone 4s", "iPhone 4", "iPhone 5", "iPhone 4s", "iPhone 5", "iPhone 5", "iPhone 5s", "iPhone 5s"]
deviceOS = ["iOS 7.0.2", "iOS 7.0.2", "iOS 7.0.2", "iOS 7.0", "iOS 7.0", "iOS 7.0.2", "iOS 7.0", "iOS 7.0.1", "iOS 7.0.4", "iOS 7.0.2"]
cities = ["San Francisco", "Detroit", "Toronto", "London", "Leeds", "Hong Kong", "Hong Kong", "Hong Kong", "Shanghai", "Beijing"]
countries = ["US", "US", "CA", "GB", "GB", "CN", "CN", "CN", "CN", "CN"]
latitude = ["37.75", "37.75", "37.75", "37.75", "37.75", "22.28", "22.28", "22.28", "22.28", "22.28"]
longitude = ["122.68", "122.68", "122.68", "122.68", "122.68", "114.15", "114.15", "114.15", "114.15", "114.15"]
numDevices = len(devices)
numSessions = 200
numInteractions = 10

print "["
for num in range(1,numSessions):
	print "{"

	curDevice = random.randint(0,numDevices-1)
	startDate = randomDate("1/1/2014 1:30:00", "2/23/2014 16:50:00", random.random())
	startDateSplit = startDate.split(' ')
	startDay = startDateSplit[0]
	startTime = startDateSplit[1]
	curInteractions = random.randint(1,numInteractions)

	print "\"sessionID\": " + str(num) + ","
	print "\"deviceID\": \"" + devices[curDevice] + "\","
	print "\"deviceType\": \"" + deviceType[curDevice] + "\","
	print "\"deviceOS\": \"" + deviceOS[curDevice] + "\","
	print "\"city\": \"" + cities[curDevice] + "\","
	print "\"country\": \"" + countries[curDevice] + "\","
	print "\"location\": { \"lat\": " + latitude[curDevice] + ", \"lon\": " + longitude[curDevice] + "},"
	print "\"date\": \"" + startDay + "\","
	print "\"interactions\": ["

	sessionTime = 0
	randomInteraction = 0
	for interactions in range(0,curInteractions):
		#create an interaction
		sessionTime += 3
		lastRandomInteraction = randomInteraction
		randomInteraction = random.randint(1,6)
		while randomInteraction == lastRandomInteraction:
			randomInteraction = random.randint(1,6)

		if randomInteraction == 1: # Logout Button
			print "{"
			print "\"time\": " + str(sessionTime) + ","
			print "\"object\": \"" + "UIView" + "\","
			print "\"page\": \"" + "UserLog" + "\","
			print "\"type\": \"" + "tap" + "\""
			print "},"
			sessionTime += 3

			print "{"
			print "\"time\": " + str(sessionTime) + ","
			print "\"object\": \"" + "UIButton" + "\","
			print "\"page\": \"" + "UserLog" + "\","
			print "\"type\": \"" + "tap" + "\","
			print "\"name\": \"" + "Logout" + "\""
			interactions = curInteractions - 1
			if interactions == curInteractions - 1:
				print "}"
				pass
			else:
				print "},"
			break
		if randomInteraction == 2: # Fitness Log Scroll Down
			print "{"
			print "\"time\": " + str(sessionTime) + ","
			print "\"object\": \"" + "UIView" + "\","
			print "\"page\": \"" + "FitnessLog" + "\","
			print "\"type\": \"" + "tap" + "\""
			print "},"
			sessionTime += 3

			print "{"
			print "\"time\": " + str(sessionTime) + ","
			print "\"object\": \"" + "UIScrollView" + "\","
			print "\"page\": \"" + "FitnessLog" + "\","
			print "\"type\": \"" + "swipeDown" + "\""
			if interactions == curInteractions - 1:
				print "}"
				pass
			else:
				print "},"
		if randomInteraction == 3: # Measurement Log Scroll Up
			print "{"
			print "\"time\": " + str(sessionTime) + ","
			print "\"object\": \"" + "UIView" + "\","
			print "\"page\": \"" + "MeasurementLog" + "\","
			print "\"type\": \"" + "tap" + "\""
			print "},"
			sessionTime += 3
			
			print "{"
			print "\"time\": " + str(sessionTime) + ","
			print "\"object\": \"" + "UIScrollView" + "\","
			print "\"page\": \"" + "MeasurementLog" + "\","
			print "\"type\": \"" + "swipeUp" + "\""
			if interactions == curInteractions - 1:
				print "}"
				pass
			else:
				print "},"
		if randomInteraction == 4: # Food Log Scroll Up
			print "{"
			print "\"time\": " + str(sessionTime) + ","
			print "\"object\": \"" + "UIView" + "\","
			print "\"page\": \"" + "FoodLog" + "\","
			print "\"type\": \"" + "tap" + "\""
			print "},"
			sessionTime += 3
			
			print "{"
			print "\"time\": " + str(sessionTime) + ","
			print "\"object\": \"" + "UIScrollView" + "\","
			print "\"page\": \"" + "FoodLog" + "\","
			print "\"type\": \"" + "swipeUp" + "\""
			if interactions == curInteractions - 1:
				print "}"
				pass
			else:
				print "},"
		if randomInteraction == 5: # Food Log Add Food
			print "{"
			print "\"time\": " + str(sessionTime) + ","
			print "\"object\": \"" + "UIView" + "\","
			print "\"page\": \"" + "FoodLog" + "\","
			print "\"type\": \"" + "tap" + "\""
			print "},"
			sessionTime += 3
			
			print "{"
			print "\"time\": " + str(sessionTime) + ","
			print "\"object\": \"" + "UIScrollView" + "\","
			print "\"page\": \"" + "FoodLog" + "\","
			print "\"type\": \"" + "swipeUp" + "\""
			print "},"
			sessionTime += 3
			
			print "{"
			print "\"time\": " + str(sessionTime) + ","
			print "\"object\": \"" + "UIButton" + "\","
			print "\"page\": \"" + "FoodLog" + "\","
			print "\"type\": \"" + "tap" + "\","
			print "\"name\": \"" + "Add Food" + "\""
			print "},"
			sessionTime += 3
			
			print "{"
			print "\"time\": " + str(sessionTime) + ","
			print "\"object\": \"" + "UIButton" + "\","
			print "\"page\": \"" + "AddFoodLog" + "\","
			print "\"type\": \"" + "tap" + "\","
			print "\"name\": \"" + "Confirm" + "\""
			if interactions == curInteractions - 1:
				print "}"
				pass
			else:
				print "},"
		if randomInteraction == 6: # Food Log Add Food
			print "{"
			print "\"time\": " + str(sessionTime) + ","
			print "\"object\": \"" + "UIView" + "\","
			print "\"page\": \"" + "FoodLog" + "\","
			print "\"type\": \"" + "tap" + "\""
			print "},"
			sessionTime += 3

			print "{"
			print "\"time\": " + str(sessionTime) + ","
			print "\"object\": \"" + "UIButton" + "\","
			print "\"page\": \"" + "FoodLog" + "\","
			print "\"type\": \"" + "tap" + "\","
			print "\"name\": \"" + "Add Food" + "\""
			print "},"
			sessionTime += 3
			
			print "{"
			print "\"time\": " + str(sessionTime) + ","
			print "\"object\": \"" + "UIButton" + "\","
			print "\"page\": \"" + "AddFoodLog" + "\","
			print "\"type\": \"" + "tap" + "\","
			print "\"name\": \"" + "Cancel" + "\""
			if interactions == curInteractions - 1:
				print "}"
				pass
			else:
				print "},"

	print "],"
	print "\"time\": " + str(sessionTime)

	if num == numSessions - 1:
		print "}"
		pass
	else:
		print "},"

print "]"