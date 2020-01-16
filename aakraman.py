import os
import sys

try:
    image_path = sys.argv[1] 
    image_name = image_path.split('.')[0]
    os.system('node index.js ' + image_path + ' ' + image_name)
    print('DONE')
except:
    print('ERROR: PASS AN IMAGE')