import os
import sys
#import cv2
import json

try:
    image_path = sys.argv[1] 
    image_name = image_path.split('.')[0]
    os.system('node index.js ' + image_path + ' ' + image_name)
    print('POSE DETECTION DONE')
except:
    print('ERROR: PASS AN IMAGE')
    sys.exit()

try:  
    if sys.argv[2] == 'draw':
        joints = json.loads(open(image_name + '.json').read())
        image = cv2.imread(image_path)
        for person in range(len(joints)):
            #PERSON
            for index in range(17):
                cv2.circle(image, (values[person]['keypoints'][index]['position']['x'], values[person]['keypoints'][index]['position']['x']), 2, (0, 255, 0), 2)

        print('DONE DRAWING')
except:
    print('DONE')
